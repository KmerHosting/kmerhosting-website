import { NextRequest, NextResponse } from "next/server";
import { generateOTP, getOTPExpiry, hashOTP } from "@/lib/two-factor-auth";
import { send2FAOTP } from "@/lib/mailer";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: "2FA is not enabled for this account" },
        { status: 400 }
      );
    }

    try {
      // Generate new OTP
      const otp = generateOTP();
      const hashedOTP = hashOTP(otp);
      const otpExpiry = getOTPExpiry();

      // Update OTP in database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorOTP: hashedOTP,
          twoFactorOTPExpiry: otpExpiry,
        },
      });

      // Send OTP email
      await send2FAOTP(user.email, user.fullName, otp);

      return NextResponse.json(
        { message: "2FA code resent to your email" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Failed to resend 2FA OTP:", error);
      return NextResponse.json(
        { error: "Failed to send 2FA code. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/auth/resend-2fa: Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
