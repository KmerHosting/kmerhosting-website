import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { sendVerificationEmail, notifyAdminNewUser } from "@/lib/mailer"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, fullName } = await req.json()

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!fullName || fullName.trim().length === 0) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Generate verification token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "24h" }
    )

    // Create verification token record
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })

    // Generate verification URL
    const verifyUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/verify-email?token=${token}`

    // Send verification email to user
    const userEmailResult = await sendVerificationEmail(email, fullName, verifyUrl)
    if (!userEmailResult.success) {
      throw new Error(userEmailResult.error || "Failed to send verification email")
    }

    // Notify admin about new signup
    const adminNotificationResult = await notifyAdminNewUser(
      email,
      fullName,
      new Date().toLocaleString()
    )
    if (!adminNotificationResult.success) {
      console.error("Failed to notify admin:", adminNotificationResult.error)
      // Don't fail the request if admin notification fails
    }

    return NextResponse.json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 500 }
    )
  }
}
