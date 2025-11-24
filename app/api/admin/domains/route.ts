import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

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

// GET all domains
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const domains = await prisma.domain.findMany({
      include: {
        service: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(domains, { status: 200 });
  } catch (error) {
    console.error("Get domains error:", error);
    return NextResponse.json(
      { error: "Failed to fetch domains" },
      { status: 500 }
    );
  }
}

// POST create domain
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, serviceId, name, purchasedPrice, hasRenewalPrice, renewalPrice, startDate } = await request.json();

    if (!userId || !serviceId || !name || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields: userId, serviceId, name, startDate" },
        { status: 400 }
      );
    }

    // Verify user and service exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Check if domain already exists
    const existingDomain = await prisma.domain.findFirst({
      where: { name },
    });

    if (existingDomain) {
      return NextResponse.json(
        { error: "Domain name already exists" },
        { status: 400 }
      );
    }

    // Calculate end date (1 year from start date)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);

    const domain = await prisma.domain.create({
      data: {
        userId,
        serviceId,
        name,
        purchasedPrice: purchasedPrice ? parseFloat(purchasedPrice) : null,
        hasRenewalPrice: hasRenewalPrice || false,
        renewalPrice: hasRenewalPrice && renewalPrice ? parseFloat(renewalPrice) : null,
        startDate: start,
        endDate: end,
      },
      include: {
        service: true,
        user: true,
      },
    });

    return NextResponse.json(domain, { status: 201 });
  } catch (error) {
    console.error("Create domain error:", error);
    return NextResponse.json(
      { error: "Failed to create domain" },
      { status: 500 }
    );
  }
}
