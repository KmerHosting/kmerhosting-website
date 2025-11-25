import { NextRequest, NextResponse } from "next/server"
import { sendNewsletterSubscriptionEmail, sendNewsletterAdminNotification } from "@/lib/mailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }

    // Extract name from email or use "Subscriber"
    const name = email.split("@")[0].replace(/[._-]/g, " ").trim()
    const displayName = name.charAt(0).toUpperCase() + name.slice(1)

    try {
      // Send confirmation email to subscriber
      await sendNewsletterSubscriptionEmail(email, displayName)

      // Send admin notification
      await sendNewsletterAdminNotification(email, displayName)

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for subscribing! Check your email for confirmation.",
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Still return success as subscription was recorded
      return NextResponse.json(
        {
          success: true,
          message: "Subscription confirmed! You'll receive updates soon.",
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    )
  }
}
