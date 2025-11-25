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

// PUT update invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, status, isFinal, dueDate } = await request.json();
    const { id } = await params;

    // Build update data
    const updateData: any = {
      ...(amount !== undefined && { amount: parseFloat(amount) }),
      ...(isFinal !== undefined && { isFinal }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
    };

    // Handle status: if isFinal is being set to true, override status to "paid"
    if (isFinal === true) {
      updateData.status = "paid";
    } else if (status) {
      updateData.status = status;
    }

    const invoice = await prisma.invoice.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        service: true,
      },
    });

    return NextResponse.json(invoice, { status: 200 });
  } catch (error) {
    console.error("Update invoice error:", error);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 }
    );
  }
}

// DELETE invoice
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

    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Invoice deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete invoice error:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
