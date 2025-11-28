import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendWelcomeEmail } from "@/lib/mailer"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { token, username, password, confirmPassword, subscribeNewsletter } = await req.json()

    // Validation
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    // Verify token first
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret")
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Check verification token exists and not expired
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken || verificationToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 400 }
      )
    }

    // If username/password are not provided, token is valid - return success for now
    if (!username || !password || !confirmPassword) {
      return NextResponse.json({
        success: true,
        message: "Token verified. Please provide username and password.",
        email: decoded.email,
        readyToComplete: true,
      })
    }

    // Validate username and passwords
    if (!username.trim() || username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Check if username is available
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: decoded.email,
        username,
        passwordHash,
        isEmailVerified: true,
      },
    })

    // Delete verification token
    await prisma.verificationToken.delete({
      where: { token },
    })

    // Send welcome email
    const welcomeEmailResult = await sendWelcomeEmail(user.email, user.username || user.email)
    if (!welcomeEmailResult.success) {
      console.error("Failed to send welcome email:", welcomeEmailResult.error)
      // Don't fail the request if welcome email fails
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      email: user.email,
      userId: user.id,
      username: user.username,
    })
  } catch (error) {
    console.error("Verify email error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 }
    )
  }
}
