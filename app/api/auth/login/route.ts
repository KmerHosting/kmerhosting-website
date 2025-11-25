import { NextRequest, NextResponse } from "next/server";
import { generateJWT, verifyPassword, getAuthCookieOptions } from "@/lib/auth";
import { generateOTP, getOTPExpiry, hashOTP, generateOTPSessionToken } from "@/lib/two-factor-auth";
import { send2FAOTP } from "@/lib/mailer";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log("POST /api/auth/login: Email:", email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("POST /api/auth/login: User found:", user ? "yes" : "no");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if account was deleted
    if (user.deletedAt) {
      const daysSinceDeletion = Math.floor(
        (Date.now() - user.deletedAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceDeletion < 60) {
        return NextResponse.json(
          {
            error: `This account was deleted ${daysSinceDeletion} days ago. You can create a new account with this email in ${60 - daysSinceDeletion} days.`,
          },
          { status: 403 }
        );
      }
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email first" },
        { status: 403 }
      );
    }

    if (!user.isPasswordSet || !user.password) {
      return NextResponse.json(
        { error: "Please complete your account setup by setting a password" },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user has 2FA enabled
    if (user.twoFactorEnabled) {
      try {
        // Generate OTP
        const otp = generateOTP();
        const hashedOTP = hashOTP(otp);
        const otpExpiry = getOTPExpiry();
        const sessionToken = generateOTPSessionToken(user.id);

        // Store OTP in database
        await prisma.user.update({
          where: { id: user.id },
          data: {
            twoFactorOTP: hashedOTP,
            twoFactorOTPExpiry: otpExpiry,
          },
        });

        // Send OTP email
        await send2FAOTP(user.email, user.fullName, otp);

        console.log("POST /api/auth/login: 2FA OTP sent to", user.email);

        // Return 2FA required response with session token
        return NextResponse.json(
          {
            requiresTwoFactor: true,
            sessionToken: sessionToken,
            message: "2FA code sent to your email",
          },
          { status: 200 }
        );
      } catch (error) {
        console.error("Failed to send 2FA OTP:", error);
        return NextResponse.json(
          { error: "Failed to send 2FA code. Please try again." },
          { status: 500 }
        );
      }
    }

    // Generate JWT token
    const token = await generateJWT(user.id, user.email, user.fullName);
    console.log("POST /api/auth/login: JWT token generated");

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 200 }
    );

    // Add auth cookie to response
    response.cookies.set("auth_token", token, getAuthCookieOptions());
    console.log("POST /api/auth/login: Auth cookie set in response");

    return response;
  } catch (error) {
    console.error("POST /api/auth/login: Error:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}