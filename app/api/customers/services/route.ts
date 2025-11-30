import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

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

    // Get query parameters for filtering
    const planType = req.nextUrl.searchParams.get("planType")

    // Build where clause
    const whereClause: any = {
      userId: decoded.userId,
    }

    if (planType) {
      whereClause.planType = planType
    }

    // Fetch services with associated domains
    const services = await prisma.service.findMany({
      where: whereClause,
      include: {
        associatedDomains: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      services,
    })
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch services" },
      { status: 500 }
    )
  }
}
