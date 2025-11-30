import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendAdminNotificationEmail } from "@/lib/mailer"

const prisma = new PrismaClient()

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
    const { currentPassword, newPassword } = await req.json()

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Validate new password requirements
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    if (!/[a-z]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter" },
        { status: 400 }
      )
    }

    if (!/[A-Z]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter" },
        { status: 400 }
      )
    }

    if (!/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one number" },
        { status: 400 }
      )
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one special character" },
        { status: 400 }
      )
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash },
    })

    // Send notification emails
    const userEmailContent = `
Hi ${user.username || user.email},

Your KmerHosting account password has been successfully changed.

If you did not make this change, please contact our security team immediately at security@kmerhosting.com to secure your account.

Security Team
KmerHosting
    `.trim()

    const adminEmailContent = `
Account Security Alert: Password Change

User: ${user.email}
Username: ${user.username || "N/A"}
Timestamp: ${new Date().toLocaleString()}
Action: Password changed

If this is suspicious, please investigate.
    `.trim()

    // Send user notification
    await sendAdminNotificationEmail(
      user.email,
      "KmerHosting Account Password Changed",
      userEmailContent
    )

    // Send admin notification
    await sendAdminNotificationEmail(
      "admin@kmerhosting.com",
      "Account Security Alert: Password Change",
      adminEmailContent
    )

    return NextResponse.json({
      success: true,
      message: "Password changed successfully. Verification emails sent.",
    })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to change password" },
      { status: 500 }
    )
  }
}
