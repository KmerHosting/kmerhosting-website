import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// Helper to verify user token
async function verifyUserToken(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = await jwtVerify(token, JWT_SECRET);
    return decoded.payload.userId;
  } catch (error) {
    return null;
  }
}

// GET user's domains
export async function GET(request: NextRequest) {
  try {
    const userId = await verifyUserToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const domains = await prisma.domain.findMany({
      where: { userId: userId as string },
      include: {
        service: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(domains, { status: 200 });
  } catch (error) {
    console.error("Get user domains error:", error);
    return NextResponse.json(
      { error: "Failed to fetch domains" },
      { status: 500 }
    );
  }
}
