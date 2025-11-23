import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateJWT, setAuthCookie } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/mailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if OTP is valid
    if (user.verificationOTP !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check if OTP expired
    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Update user as verified
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationOTP: null,
        otpExpiresAt: null,
      },
    });

    // Generate JWT token
    const token = await generateJWT(user.id, user.email, user.fullName);

    // Set auth cookie
    await setAuthCookie(token);

    // Send welcome email
    await sendWelcomeEmail(email, user.fullName);

    // Create response
    const response = NextResponse.json(
      {
        message: "Email verified successfully",
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          fullName: updatedUser.fullName,
        },
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
