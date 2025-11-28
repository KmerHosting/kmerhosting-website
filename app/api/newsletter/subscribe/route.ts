import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

    // Check if already subscribed
    let subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (subscription) {
      // Update status to active if it was unsubscribed
      if (subscription.status === "unsubscribed") {
        subscription = await prisma.newsletterSubscription.update({
          where: { email },
          data: { status: "active" },
        })
      }
    } else {
      // Create new subscription
      subscription = await prisma.newsletterSubscription.create({
        data: {
          email,
          status: "active",
        },
      })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed to newsletter",
        subscription 
      },
      { status: 200 }
    )
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
