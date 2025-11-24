import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateOTP, getOTPExpiration } from "@/lib/auth";
import { sendOTPEmail } from "@/lib/mailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Email and full name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        { error: "This email is already registered. Please log in instead." },
        { status: 409 }
      );
    }

    // Generate OTP (allow resend for unverified users)
    const otp = generateOTP();
    const otpExpiresAt = getOTPExpiration();

    // Create or update user with OTP
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        fullName,
        verificationOTP: otp,
        otpExpiresAt,
      },
      create: {
        email,
        fullName,
        verificationOTP: otp,
        otpExpiresAt,
      },
    });

    // Send OTP email
    await sendOTPEmail(email, fullName, otp);

    return NextResponse.json(
      {
        message: "OTP sent to your email",
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup request" },
      { status: 500 }
    );
  }
}
