import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";

// GET - List all API keys for the user
export async function GET(request: NextRequest) {
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

    const apiKeys = await prisma.aPIKey.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        isActive: true,
        createdAt: true,
        expiresAt: true,
        lastUsedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ apiKeys }, { status: 200 });
  } catch (error) {
    console.error("GET /api/auth/api-keys error:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// POST - Generate a new API key
export async function POST(request: NextRequest) {
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

    // Check if user already has 20 API keys
    const keyCount = await prisma.aPIKey.count({
      where: { userId: user.id, isActive: true },
    });

    if (keyCount >= 20) {
      return NextResponse.json(
        { error: "Maximum of 20 active API keys allowed" },
        { status: 400 }
      );
    }

    // Parse request body
    const { name } = await request.json();

    if (!name || typeof name !== "string" || name.length < 3 || name.length > 50) {
      return NextResponse.json(
        { error: "Name must be between 3 and 50 characters" },
        { status: 400 }
      );
    }

    // Generate a new API key (32 random bytes = 64 hex chars)
    const rawKey = crypto.randomBytes(32).toString("hex");
    const hashedKey = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");
    const keyPrefix = rawKey.substring(0, 8);

    // Store in database (only the hash)
    const apiKey = await prisma.aPIKey.create({
      data: {
        userId: user.id,
        name,
        key: hashedKey,
        keyPrefix,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Return the raw key only once (must be saved by user)
    return NextResponse.json(
      {
        message: "API key generated successfully. Save this key in a safe place - you won't be able to see it again!",
        apiKey: {
          ...apiKey,
          secretKey: `${keyPrefix}...${rawKey.substring(rawKey.length - 8)}`, // Show format but hide actual key
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/auth/api-keys error:", error);
    return NextResponse.json(
      { error: "Failed to generate API key" },
      { status: 500 }
    );
  }
}
