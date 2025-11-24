import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// Helper to verify admin token
async function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  
  if (!token) {
    return null;
  }

  try {
    const decoded = await jwtVerify(token, JWT_SECRET);
    if (decoded.payload.role === "admin") {
      return decoded.payload;
    }
  } catch (error) {
    return null;
  }

  return null;
}

// GET all services
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      include: {
        user: true,
        domains: true,
        invoices: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST create service
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, name, price, features, type, url, username, password, serverIp, startDate } = await request.json();

    if (!userId || !name || !price || !type || !url || !username || !password || !serverIp || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields: userId, name, price, type, url, username, password, serverIp, startDate" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate end date (1 year from start date)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);

    const service = await prisma.service.create({
      data: {
        userId,
        name,
        price: parseFloat(price),
        features: JSON.stringify(features || []),
        type,
        url,
        username,
        password,
        serverIp,
        startDate: start,
        endDate: end,
      },
      include: {
        domains: true,
        invoices: true,
        user: true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
