import { NextRequest, NextResponse } from "next/server";
import { sendCreditRequestConfirmationEmail, sendCreditRequestAdminNotification } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookie
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    let userId: string;
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      userId = verified.payload.userId as string;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { amount, reason } = body;

    // Validate input
    if (!amount || !reason) {
      return NextResponse.json(
        { error: "Amount and reason are required" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    if (typeof reason !== "string" || reason.trim().length === 0) {
      return NextResponse.json(
        { error: "Reason is required" },
        { status: 400 }
      );
    }

    if (reason.length > 500) {
      return NextResponse.json(
        { error: "Reason must be less than 500 characters" },
        { status: 400 }
      );
    }

    try {
      // Send confirmation email to user
      await sendCreditRequestConfirmationEmail(
        user.email,
        user.fullName,
        amount,
        reason
      );

      // Send admin notification
      await sendCreditRequestAdminNotification(
        user.fullName,
        user.email,
        user.id,
        amount,
        reason
      );

      return NextResponse.json(
        {
          success: true,
          message: "Credit request submitted successfully. Our team will review and contact you within 24-48 hours.",
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Still return success as request was made
      return NextResponse.json(
        {
          success: true,
          message: "Credit request submitted. You will be contacted by our team soon.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Credit request error:", error);
    return NextResponse.json(
      { error: "Failed to submit credit request" },
      { status: 500 }
    );
  }
}
