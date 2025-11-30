import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

// Helper function to generate API key
function generateApiKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let key = "kh-"
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

export async function GET(req: NextRequest) {
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

    // Get API keys for user from database
    try {
      const apiKeys = await prisma.apiKey.findMany({
        where: { userId: decoded.userId },
        select: {
          id: true,
          name: true,
          key: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      })

      return NextResponse.json({
        success: true,
        apiKeys: apiKeys.map((k) => ({
          id: k.id,
          name: k.name,
          key: k.key,
          created: k.createdAt,
        })),
      })
    } catch (dbError) {
      console.error("Database error fetching API keys:", dbError)
      // Return empty array if table doesn't exist yet
      return NextResponse.json({
        success: true,
        apiKeys: [],
      })
    }
  } catch (error) {
    console.error("Get API keys error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch API keys" },
      { status: 500 }
    )
  }
}

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
    const { name } = await req.json()

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "API key name is required" }, { status: 400 })
    }

    if (name.trim().length > 50) {
      return NextResponse.json({ error: "API key name must be less than 50 characters" }, { status: 400 })
    }

    // Check if API key name already exists for this user
    const duplicateName = await prisma.apiKey.findFirst({
      where: {
        userId: decoded.userId,
        name: name.trim(),
      },
    })

    if (duplicateName) {
      return NextResponse.json(
        { error: `API key name "${name.trim()}" already exists` },
        { status: 400 }
      )
    }

    // Check max 10 API keys per user
    const existingKeys = await prisma.apiKey.count({
      where: { userId: decoded.userId },
    })

    if (existingKeys >= 10) {
      return NextResponse.json(
        { error: "Maximum 10 API keys allowed per account" },
        { status: 400 }
      )
    }

    // Generate API key
    const apiKey = generateApiKey()

    // Create API key in database
    try {
      const newKey = await prisma.apiKey.create({
        data: {
          userId: decoded.userId,
          name: name.trim(),
          key: apiKey,
        },
        select: {
          id: true,
          name: true,
          key: true,
          createdAt: true,
        },
      })

      return NextResponse.json({
        success: true,
        message: "API key generated successfully",
        apiKey: {
          id: newKey.id,
          name: newKey.name,
          key: newKey.key,
          created: newKey.createdAt,
        },
      })
    } catch (dbError) {
      console.error("Database error creating API key:", dbError)
      throw dbError
    }
  } catch (error) {
    console.error("Generate API key error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate API key" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
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

    // Get key ID from query params
    const keyId = req.nextUrl.searchParams.get("id")

    if (!keyId) {
      return NextResponse.json({ error: "API key ID is required" }, { status: 400 })
    }

    // Verify key belongs to user
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: keyId },
    })

    if (!apiKey || apiKey.userId !== decoded.userId) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 })
    }

    // Delete API key
    await prisma.apiKey.delete({
      where: { id: keyId },
    })

    return NextResponse.json({
      success: true,
      message: "API key deleted successfully",
    })
  } catch (error) {
    console.error("Delete API key error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete API key" },
      { status: 500 }
    )
  }
}
