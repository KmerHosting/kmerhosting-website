import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import {
  sendPaymentProofConfirmation,
  notifyAdminPaymentProofSubmitted,
} from "@/lib/mailer"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("authToken")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Verify token
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret")
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const { images, description } = await req.json()

    if (!images || images.length === 0 || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // TODO: Upload images to cloud storage (e.g., AWS S3, Vercel Blob)
    // For now, we'll store the base64 data directly (not recommended for production)
    
    // Get user's latest order
    const order = await prisma.order.findFirst({
      where: {
        email: decoded.email,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: "No order found" },
        { status: 404 }
      )
    }

    // Create payment proof record
    await prisma.paymentProof.create({
      data: {
        orderId: order.id,
        userId: decoded.userId,
        imageUrls: JSON.stringify(images),
        description,
        status: "pending",
      },
    })

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "verified" },
    })

    // Get user info for emails
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (user) {
      // Send confirmation to user
      await sendPaymentProofConfirmation(user.email, user.username || user.email, {
        planName: order.planName,
        planPrice: order.planPrice,
        orderId: order.id,
      })

      // Notify admin about submission
      await notifyAdminPaymentProofSubmitted(
        user.email,
        order.fullName,
        {
          planName: order.planName,
          planPrice: order.planPrice,
          orderId: order.id,
        },
        description,
        images.length
      )
    }

    return NextResponse.json({
      message: "Payment proof submitted successfully",
    })
  } catch (error) {
    console.error("Payment proof error:", error)
    return NextResponse.json(
      { error: "Failed to submit proof" },
      { status: 500 }
    )
  }
}
