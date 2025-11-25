import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { id } = await params;

    // Verify that the API key belongs to this user
    const apiKey = await prisma.aPIKey.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    if (apiKey.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete the API key (soft delete by setting isActive to false)
    await prisma.aPIKey.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: "API key revoked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/auth/api-keys/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to revoke API key" },
      { status: 500 }
    );
  }
}
