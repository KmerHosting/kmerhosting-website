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

// GET all invoices
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      include: {
        user: true,
        service: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    console.error("Get invoices error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// POST create invoice
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, serviceId, domainId, amount, isFinal = false, dueDate } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: userId, amount. At least one of serviceId or domainId must be provided." },
        { status: 400 }
      );
    }

    // At least one of serviceId or domainId must be provided
    if (!serviceId && !domainId) {
      return NextResponse.json(
        { error: "At least one of serviceId or domainId must be provided" },
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

    // Verify service exists if provided
    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
      }
    }

    // Verify domain exists if provided
    if (domainId) {
      const domain = await prisma.domain.findUnique({
        where: { id: domainId },
      });

      if (!domain) {
        return NextResponse.json({ error: "Domain not found" }, { status: 404 });
      }
    }

    // Generate invoice number
    const invoiceCount = await prisma.invoice.count({
      where: { userId },
    });
    const invoiceNumber = `INV-${Date.now()}-${invoiceCount + 1}`;

    // Determine status: if isFinal is true, always set to "paid"
    const status = isFinal ? "paid" : "pending";

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        ...(serviceId && { serviceId }),
        ...(domainId && { domainId }),
        amount: parseFloat(amount),
        status,
        isFinal,
        invoiceNumber,
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now if not provided
      },
      include: {
        user: true,
        service: true,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Create invoice error:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
