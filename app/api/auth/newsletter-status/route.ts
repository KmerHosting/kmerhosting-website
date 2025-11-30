import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { sendAdminNotificationEmail } from "@/lib/mailer"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // Get JWT token from httpOnly cookie
    const token = req.cookies.get("authToken")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify JWT
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { email: true, username: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get newsletter subscription status
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email: user.email },
    })

    return NextResponse.json({
      success: true,
      isSubscribed: subscription ? subscription.status === "active" : false,
    })
  } catch (error) {
    console.error("Get newsletter status error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch newsletter status" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get JWT token from httpOnly cookie
    const token = req.cookies.get("authToken")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify JWT
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get request body
    const { subscribe } = await req.json()

    if (typeof subscribe !== "boolean") {
      return NextResponse.json(
        { error: "Subscribe parameter must be a boolean" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { email: true, username: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find or create newsletter subscription
    let subscription = await prisma.newsletterSubscription.findUnique({
      where: { email: user.email },
    })

    if (!subscription) {
      subscription = await prisma.newsletterSubscription.create({
        data: {
          email: user.email,
          status: subscribe ? "active" : "unsubscribed",
          confirmedAt: subscribe ? new Date() : null,
        },
      })
    } else {
      subscription = await prisma.newsletterSubscription.update({
        where: { email: user.email },
        data: {
          status: subscribe ? "active" : "unsubscribed",
          confirmedAt: subscribe ? new Date() : null,
          updatedAt: new Date(),
        },
      })
    }

    // Send notifications
    const userEmailContent = `
Hi ${user.username || user.email},

Your KmerHosting newsletter subscription status has been changed to: ${subscribe ? "SUBSCRIBED" : "UNSUBSCRIBED"}

If you did not make this change, please contact our security team immediately at security@kmerhosting.com to secure your account.

KmerHosting Team
    `.trim()

    const adminEmailContent = `
Account Settings Change: Newsletter Subscription

User: ${user.email}
Username: ${user.username || "N/A"}
Timestamp: ${new Date().toLocaleString()}
Action: Newsletter ${subscribe ? "subscribed" : "unsubscribed"}

If this is suspicious, please investigate.
    `.trim()

    // Send user notification
    await sendAdminNotificationEmail(
      user.email,
      "KmerHosting Newsletter Subscription Updated",
      userEmailContent
    )

    // Send admin notification
    await sendAdminNotificationEmail(
      "admin@kmerhosting.com",
      "Account Settings Change: Newsletter Subscription",
      adminEmailContent
    )

    return NextResponse.json({
      success: true,
      message: `${subscribe ? "Subscribed to" : "Unsubscribed from"} newsletter successfully`,
      isSubscribed: subscribe,
    })
  } catch (error) {
    console.error("Update newsletter subscription error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update newsletter subscription" },
      { status: 500 }
    )
  }
}
