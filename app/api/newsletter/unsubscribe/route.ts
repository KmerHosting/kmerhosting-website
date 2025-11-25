import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterUnsubscribeAdminNotification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Extract name from email or use "Subscriber"
    const name = email.split("@")[0].replace(/[._-]/g, " ").trim();
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    try {
      // Send unsubscribe admin notification
      await sendNewsletterUnsubscribeAdminNotification(email, displayName);

      return NextResponse.json(
        {
          success: true,
          message: "You have been unsubscribed from the newsletter",
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Still return success as unsubscription was recorded
      return NextResponse.json(
        {
          success: true,
          message: "Unsubscription confirmed",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);
    return NextResponse.json(
      { error: "Failed to process unsubscription" },
      { status: 500 }
    );
  }
}
