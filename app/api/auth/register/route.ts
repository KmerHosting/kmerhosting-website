import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { sendVerificationEmail, notifyAdminNewUser } from "@/lib/mailer"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    // Security: Always return success message regardless of whether email exists
    // This prevents user enumeration attacks
    const successResponse = {
      success: true,
      message: "If this email address is not already registered, you will receive a verification email shortly.",
    }

    if (existingUser) {
      // Email already exists - don't send email but still return success message
      console.log("User attempted to register with existing email:", email)
      return NextResponse.json(successResponse)
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

    // Send verification email to user (use email as display name if fullName not provided)
    const displayName = email.split("@")[0] || email
    const userEmailResult = await sendVerificationEmail(email, displayName, verifyUrl)
    if (!userEmailResult.success) {
      throw new Error(userEmailResult.error || "Failed to send verification email")
    }

    // Notify admin about new signup
    const adminNotificationResult = await notifyAdminNewUser(
      email,
      displayName,
      new Date().toLocaleString()
    )
    if (!adminNotificationResult.success) {
      console.error("Failed to notify admin:", adminNotificationResult.error)
      // Don't fail the request if admin notification fails
    }

    return NextResponse.json(successResponse)
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 500 }
    )
  }
}
