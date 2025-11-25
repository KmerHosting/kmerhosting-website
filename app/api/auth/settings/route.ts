import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { action, oldPassword, newPassword, newsletter, username, isProfilePublic, twoFactorEnabled } = body;

    const updateData: any = {};

    // Change password
    if (action === "changePassword") {
      if (!oldPassword || !newPassword) {
        return NextResponse.json(
          { error: "Old and new password are required" },
          { status: 400 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: "New password must be at least 8 characters" },
          { status: 400 }
        );
      }

      // Verify old password
      const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { password: true },
      });

      if (!dbUser?.password) {
        return NextResponse.json(
          { error: "Password not set" },
          { status: 400 }
        );
      }

      const { verifyPassword } = await import("@/lib/auth");
      const isPasswordValid = await verifyPassword(oldPassword, dbUser.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Old password is incorrect" },
          { status: 401 }
        );
      }

      updateData.password = await hashPassword(newPassword);
    }

    // Update newsletter preference
    if (action === "updateNewsletter") {
      if (typeof newsletter !== "boolean") {
        return NextResponse.json(
          { error: "Newsletter must be boolean" },
          { status: 400 }
        );
      }
      updateData.newsletter = newsletter;
    }

    // Update username
    if (action === "updateUsername") {
      if (!username || username.length < 3 || username.length > 20) {
        return NextResponse.json(
          { error: "Username must be 3-20 characters" },
          { status: 400 }
        );
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return NextResponse.json(
          { error: "Username can only contain letters, numbers, underscore, and hyphen" },
          { status: 400 }
        );
      }

      // Check if username is already taken
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== user.userId) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }

      updateData.username = username;
    }

    // Update profile visibility
    if (action === "updateProfileVisibility") {
      if (typeof isProfilePublic !== "boolean") {
        return NextResponse.json(
          { error: "isProfilePublic must be boolean" },
          { status: 400 }
        );
      }
      updateData.isProfilePublic = isProfilePublic;
    }

    // Enable/Disable 2FA (in production, would generate secret and require verification)
    if (action === "toggle2FA") {
      if (typeof twoFactorEnabled !== "boolean") {
        return NextResponse.json(
          { error: "twoFactorEnabled must be boolean" },
          { status: 400 }
        );
      }

      // TODO: In production, generate TOTP secret and QR code
      // For now, just toggle the flag
      updateData.twoFactorEnabled = twoFactorEnabled;
      if (!twoFactorEnabled) {
        updateData.twoFactorSecret = null;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No update action specified" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: updateData,
      select: {
        email: true,
        fullName: true,
        newsletter: true,
        username: true,
        isProfilePublic: true,
        twoFactorEnabled: true,
        referralCode: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
