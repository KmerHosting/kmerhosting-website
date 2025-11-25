import { NextRequest, NextResponse } from "next/server";
import { generateJWT, getAuthCookieOptions } from "@/lib/auth";
import { verifyOTP, isOTPExpired } from "@/lib/two-factor-auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { otp, email } = await request.json();

    if (!otp || !email) {
      return NextResponse.json(
        { error: "OTP and email are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    // Check if user has pending OTP
    if (!user.twoFactorOTP || !user.twoFactorOTPExpiry) {
      return NextResponse.json(
        { error: "No active 2FA session. Please log in again." },
        { status: 401 }
      );
    }

    // Check if OTP has expired
    if (isOTPExpired(user.twoFactorOTPExpiry)) {
      // Clear expired OTP
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorOTP: null,
          twoFactorOTPExpiry: null,
        },
      });

      return NextResponse.json(
        { error: "OTP has expired. Please log in again." },
        { status: 401 }
      );
    }

    // Verify OTP
    const isOTPValid = verifyOTP(otp, user.twoFactorOTP);
    if (!isOTPValid) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 401 }
      );
    }

    // Clear OTP from database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorOTP: null,
        twoFactorOTPExpiry: null,
      },
    });

    // Generate JWT token
    const token = await generateJWT(user.id, user.email, user.fullName);

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "2FA verification successful",
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

    return response;
  } catch (error) {
    console.error("POST /api/auth/verify-2fa: Error:", error);
    return NextResponse.json(
      { error: "Failed to verify 2FA code" },
      { status: 500 }
    );
  }
}
