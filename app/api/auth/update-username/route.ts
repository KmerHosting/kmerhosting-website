import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

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
    const { username } = await req.json()

    // Validation
    if (!username || !username.trim()) {
      return NextResponse.json({ error: "Username cannot be empty" }, { status: 400 })
    }

    if (username.trim().length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
    }

    if (username.trim().length > 30) {
      return NextResponse.json({ error: "Username must be less than 30 characters" }, { status: 400 })
    }

    // Check if new username is already taken (excluding current user)
    const existingUser = await prisma.user.findUnique({
      where: { username: username.trim() },
    })

    if (existingUser && existingUser.id !== decoded.userId) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Update user username
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { username: username.trim() },
      select: { id: true, email: true, username: true },
    })

    return NextResponse.json({
      success: true,
      message: "Username updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Update username error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update username" },
      { status: 500 }
    )
  }
}
