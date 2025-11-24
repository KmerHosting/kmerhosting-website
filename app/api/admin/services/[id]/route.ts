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

// PUT update service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, price, features, type, url, username, password, serverIp, startDate } = await request.json();
    const { id } = params;

    // If startDate is provided, recalculate endDate
    let updateData: any = {
      ...(name && { name }),
      ...(price && { price: parseFloat(price) }),
      ...(features && { features: JSON.stringify(features) }),
      ...(type && { type }),
      ...(url !== undefined && { url }),
      ...(username !== undefined && { username }),
      ...(password !== undefined && { password }),
      ...(serverIp !== undefined && { serverIp }),
    };

    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setFullYear(end.getFullYear() + 1);
      updateData.startDate = start;
      updateData.endDate = end;
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        domains: true,
        invoices: true,
        user: true,
      },
    });

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
