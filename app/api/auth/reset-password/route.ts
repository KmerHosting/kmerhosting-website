import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    // Validation
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
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
        { error: "Invalid or expired reset token" },
        { status: 401 }
      )
    }

    // Check if reset token exists in database
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: "Reset token not found" },
        { status: 404 }
      )
    }

    // Check if token has expired
    if (new Date() > resetToken.expiresAt) {
      // Delete expired token
      await prisma.passwordReset.delete({
        where: { token },
      })
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 401 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword },
    })

    // Delete the reset token
    await prisma.passwordReset.delete({
      where: { token },
    })

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Password reset failed" },
      { status: 500 }
    )
  }
}
