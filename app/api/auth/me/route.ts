import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/auth/me: Starting");
    const token = request.cookies.get("auth_token")?.value;
    console.log("GET /api/auth/me: Token from cookies:", token ? "found" : "not found");

    if (!token) {
      console.log("GET /api/auth/me: No token found, returning 401");
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = await verifyJWT(token);
    console.log("GET /api/auth/me: Token verification:", payload ? "success" : "failed");

    if (!payload) {
      console.log("GET /api/auth/me: Token verification failed, returning 401");
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Fetch user profile completion status from database
    console.log("GET /api/auth/me: Fetching user profile from database, email:", payload.email);
    const dbUser = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        fullName: true,
        isProfileComplete: true,
      },
    });

    console.log("GET /api/auth/me: Database user found:", dbUser ? "yes" : "no");

    if (!dbUser) {
      console.log("GET /api/auth/me: User not found in database, returning 401");
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          userId: dbUser.id,
          email: dbUser.email,
          fullName: dbUser.fullName,
          isProfileComplete: dbUser.isProfileComplete,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/auth/me: Error:", error);
    return NextResponse.json(
      { error: "Failed to get user" },
      { status: 500 }
    );
  }
}
