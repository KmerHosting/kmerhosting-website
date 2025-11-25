import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateJWT, setAuthCookie } from "@/lib/auth";
import { sendWelcomeEmail, sendPasswordChangeSecurityAlert } from "@/lib/mailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, confirmPassword } = await request.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Email, password, and confirm password are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
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

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Email not verified yet" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Update user with password
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        isPasswordSet: true,
      },
    });

    // Generate JWT token
    const token = await generateJWT(user.id, user.email, user.fullName);

    // Set auth cookie
    await setAuthCookie(token);

    // Send welcome email with logo
    await sendWelcomeEmail(email, user.fullName);

    // Send security alert for password change
    await sendPasswordChangeSecurityAlert(email, user.fullName);

    // Create response
    const response = NextResponse.json(
      {
        message: "Password set successfully",
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
    console.error("Set password error:", error);
    return NextResponse.json(
      { error: "Failed to set password" },
      { status: 500 }
    );
  }
}
