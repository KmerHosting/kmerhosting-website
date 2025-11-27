import { sendSalesContactConfirmation, notifySalesContact } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, subject, message } = await request.json();

    // Validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    const userEmailResult = await sendSalesContactConfirmation(
      email.trim(),
      fullName.trim(),
      subject.trim()
    );

    if (!userEmailResult.success) {
      console.error("Failed to send user confirmation email:", userEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email. Please try again." },
        { status: 500 }
      );
    }

    // Send notification to sales team and admin
    const salesNotificationResult = await notifySalesContact(
      email.trim(),
      fullName.trim(),
      subject.trim(),
      message.trim()
    );

    if (!salesNotificationResult.success) {
      // Log error but don't fail the request to user
      console.error("Failed to send sales notification:", salesNotificationResult.error);
    }

    return NextResponse.json(
      { success: true, message: "Your inquiry has been sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing sales contact request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
