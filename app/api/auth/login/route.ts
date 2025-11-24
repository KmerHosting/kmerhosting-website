import { NextRequest, NextResponse } from "next/server";
import { generateJWT, verifyPassword, getAuthCookieOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log("POST /api/auth/login: Email:", email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("POST /api/auth/login: User found:", user ? "yes" : "no");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email first" },
        { status: 403 }
      );
    }

    if (!user.isPasswordSet || !user.password) {
      return NextResponse.json(
        { error: "Please complete your account setup by setting a password" },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await generateJWT(user.id, user.email, user.fullName);
    console.log("POST /api/auth/login: JWT token generated");

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 200 }
    );

    // Add auth cookie to response
    response.cookies.set("auth_token", token, getAuthCookieOptions());
    console.log("POST /api/auth/login: Auth cookie set in response");

    return response;
  } catch (error) {
    console.error("POST /api/auth/login: Error:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}