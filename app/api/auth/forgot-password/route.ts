import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sendPasswordResetEmail } from "@/lib/mailer"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Security: Always return success message regardless of whether email exists
    // This prevents user enumeration attacks
    const successResponse = {
      success: true,
      message: "If this email address matches a KmerHosting account, you will receive a password reset link shortly.",
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Email doesn't exist - don't send email but still return success message
      console.log("Forgot password attempt with non-existent email:", email)
      return NextResponse.json(successResponse)
    }

    // Delete any existing reset tokens for this email
    await prisma.passwordReset.deleteMany({
      where: { email },
    })

    // Generate password reset token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "1h" }
    )

    // Create password reset token record
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    })

    // Generate reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/reset-password?token=${token}`

    // Send password reset email
    const displayName = user.username || email.split("@")[0] || email
    const emailResult = await sendPasswordResetEmail(email, displayName, resetUrl)
    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send password reset email")
    }

    return NextResponse.json(successResponse)
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 }
    )
  }
}
