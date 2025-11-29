import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { sendAdminNewsletterNotificationEmail } from "@/lib/mailer"

const prisma = new PrismaClient()
const ADMIN_EMAIL = "admin@kmerhosting.com"

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { error: "Confirmation token is required" },
        { status: 400 }
      )
    }

    // Verify JWT token
    let decoded: any
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default-secret"
      )
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired confirmation link" },
        { status: 401 }
      )
    }

    const email = decoded.email

    // Find subscription
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      )
    }

    // Verify token matches
    if (subscription.token !== token) {
      return NextResponse.json(
        { error: "Invalid confirmation token" },
        { status: 401 }
      )
    }

    // Update subscription to active
    await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        status: "active",
        confirmedAt: new Date(),
        token: null, // Clear the token after confirmation
      },
    })
    
    // Notify admin of confirmed subscription
    await sendAdminNewsletterNotificationEmail(
      ADMIN_EMAIL,
      `Newsletter Subscription Confirmed - ${email}`,
      `A new subscriber has confirmed their email:\n\nEmail: ${email}\nStatus: Active\nConfirmed At: ${new Date().toLocaleString()}\n\nThey are now subscribed and will receive newsletter updates.`
    )

    return NextResponse.json({
      success: true,
      message: "Email confirmed successfully! You're now subscribed to our newsletter.",
    })
  } catch (error) {
    console.error("Newsletter confirmation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Confirmation failed" },
      { status: 500 }
    )
  }
}
