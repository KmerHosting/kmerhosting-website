import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sendNewsletterSubscriptionRequestConfirmationEmail, sendAdminNewsletterNotificationEmail } from "@/lib/mailer"
import { prisma } from "@/lib/prisma"

const ADMIN_EMAIL = "admin@kmerhosting.com"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Security: Always return success message to prevent email enumeration
    const successResponse = {
      success: true,
      message: "Your request has been received. Please check your email inbox for further instructions.",
    }

    // Check if already subscribed
    let subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (subscription) {
      if (subscription.status === "active") {
        // Already subscribed - return success
        console.log("Email already subscribed:", email)
        return NextResponse.json(successResponse)
      } else if (subscription.status === "unsubscribed") {
        // Resubscribe - set to pending
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { status: "pending", subscribedAt: new Date() },
        })
      }
      // If pending, we'll resend the confirmation link below
    } else {
      // Create new subscription with pending status
      subscription = await prisma.newsletterSubscription.create({
        data: {
          email,
          status: "pending",
        },
      })
    }

    // Generate confirmation token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "7d" }
    )

    // Update subscription with token
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { token },
    })

    // Generate confirmation URL
    const confirmUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/newsletter/confirm?token=${token}`

    // Send confirmation email
    const emailResult = await sendNewsletterSubscriptionRequestConfirmationEmail(email, confirmUrl)
    if (!emailResult.success) {
      console.error("Failed to send confirmation email:", emailResult.error)
      // Don't fail the request if email sending fails
    }
    
    // Notify admin of new subscription request
    await sendAdminNewsletterNotificationEmail(
      ADMIN_EMAIL,
      `New Newsletter Subscription Request - ${email}`,
      `A new user has requested to subscribe to the newsletter:\n\nEmail: ${email}\nStatus: Pending Confirmation\nSubscription Date: ${new Date().toLocaleString()}\n\nThe user will need to confirm their email to activate the subscription.`
    )

    return NextResponse.json(successResponse)
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
