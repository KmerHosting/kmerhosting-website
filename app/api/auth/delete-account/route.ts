import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/auth/delete-account: Starting");

    // Get the token from cookies
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const { email, reason } = await request.json();

    // Verify the email matches the token
    if (email !== payload.email) {
      return NextResponse.json(
        { error: "Email does not match your account" },
        { status: 400 }
      );
    }

    // Check if user updated profile within last 60 days
    const user = await prisma.user.findUnique({
      where: { email },
      select: { updatedAt: true, isProfileComplete: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deletion if profile was updated in last 60 days
    const daysSinceProfileUpdate = Math.floor(
      (Date.now() - user.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (user.isProfileComplete && daysSinceProfileUpdate < 60) {
      return NextResponse.json(
        {
          error: `Your profile was updated ${daysSinceProfileUpdate} days ago. You must wait ${60 - daysSinceProfileUpdate} more days before deleting your account.`,
        },
        { status: 403 }
      );
    }

    // Mark account as deleted instead of actually deleting (soft delete)
    await prisma.user.update({
      where: { email },
      data: {
        deletedAt: new Date(),
        // Clear sensitive data but keep for 1 year
        password: null,
        verificationOTP: null,
        profilePicture: null,
      },
    });

    console.log("POST /api/auth/delete-account: Account marked as deleted");

    // Create response to clear auth cookie
    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );

    response.cookies.delete("auth_token");

    return response;
  } catch (error) {
    console.error("POST /api/auth/delete-account: Error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
