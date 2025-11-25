import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateOTP, getOTPExpiration, generateReferralCode } from "@/lib/auth";
import { generatePinCode } from "@/lib/verification";
import { sendOTPEmail } from "@/lib/mailer";

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

    // Check if user was deleted recently (within 60 days)
    if (existingUser && existingUser.deletedAt) {
      const daysSinceDeletion = Math.floor(
        (Date.now() - existingUser.deletedAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceDeletion < 60) {
        return NextResponse.json(
          {
            error: `This email was deleted ${daysSinceDeletion} days ago. You can reuse this email in ${60 - daysSinceDeletion} days.`,
          },
          { status: 403 }
        );
      }

      // If 60+ days have passed, allow reuse
      // Delete the old record to clear the data per policy
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
    }

    // Generate OTP (allow resend for unverified users)
    const otp = generateOTP();
    const otpExpiresAt = getOTPExpiration();
    const pinCode = generatePinCode(); // Generate 5-digit PIN
    const referralCode = generateReferralCode(); // Generate 8-char referral code

    // Create or update user with OTP, PIN, and referral code
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
        pinCode, // Store PIN in plain text (user will see it once)
        referralCode, // Generate unique referral code
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
