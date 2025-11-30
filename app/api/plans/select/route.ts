import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sendPlanSelectionEmail, notifyAdminPlanSelection } from "@/lib/mailer"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { planType, planName, planPrice, fullName, email, domain, billingCycle } =
      await req.json()

    // Validation
    if (!planType || !planName || !planPrice || !fullName || !email || !domain) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Validate domain
    if (domain.trim().length === 0) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      )
    }

    // Check if user is authenticated and get userId from JWT
    let userId: string | undefined
    const token = req.cookies.get("authToken")?.value
    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default-secret")
        userId = decoded.userId
      } catch (err) {
        console.warn("Invalid or expired JWT token in order creation")
      }
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        planType,
        planName,
        planPrice,
        fullName,
        email,
        desiredDomain: domain,
        status: "pending",
      },
    })

    // Get or find user by email to get username for emails
    let username = fullName.split(" ")[0] // fallback to first name
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      username = existingUser.username
    }

    // Send confirmation email to user
    const userEmailResult = await sendPlanSelectionEmail(
      email,
      username,
      planName,
      planPrice,
      billingCycle || "yearly"
    )
    if (!userEmailResult.success) {
      console.error("Failed to send user confirmation email:", userEmailResult.error)
      // Don't fail the request
    }

    // Notify admin about plan selection
    const adminNotificationResult = await notifyAdminPlanSelection(
      email,
      username,
      planName,
      planPrice,
      billingCycle || "yearly"
    )
    if (!adminNotificationResult.success) {
      console.error("Failed to send admin notification:", adminNotificationResult.error)
      // Don't fail the request
    }

    return NextResponse.json({
      success: true,
      message: "Plan selected successfully. Check your email for next steps.",
      orderId: order.id,
    })
  } catch (error) {
    console.error("Plan selection error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process order" },
      { status: 500 }
    )
  }
}
