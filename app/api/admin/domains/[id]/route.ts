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

// PUT update domain
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, serviceId, purchasedPrice, hasRenewalPrice, renewalPrice, startDate } = await request.json();
    const { id } = await params;

    // Build update data
    const updateData: any = {
      ...(name && { name }),
      ...(serviceId && { serviceId }),
      ...(purchasedPrice !== undefined && { purchasedPrice: purchasedPrice ? parseFloat(purchasedPrice) : null }),
      ...(hasRenewalPrice !== undefined && { hasRenewalPrice }),
      ...(renewalPrice !== undefined && { renewalPrice: renewalPrice ? parseFloat(renewalPrice) : null }),
    };

    // If startDate is provided, recalculate endDate
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setFullYear(end.getFullYear() + 1);
      updateData.startDate = start;
      updateData.endDate = end;
    }

    const domain = await prisma.domain.update({
      where: { id },
      data: updateData,
      include: {
        service: true,
        user: true,
      },
    });

    return NextResponse.json(domain, { status: 200 });
  } catch (error) {
    console.error("Update domain error:", error);
    return NextResponse.json(
      { error: "Failed to update domain" },
      { status: 500 }
    );
  }
}

// DELETE domain
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.domain.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Domain deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete domain error:", error);
    return NextResponse.json(
      { error: "Failed to delete domain" },
      { status: 500 }
    );
  }
}
