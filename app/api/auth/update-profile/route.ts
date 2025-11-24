import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || null;
    const whatsapp = (formData.get("whatsapp") as string) || null;
    const city = (formData.get("city") as string) || null;
    const address = (formData.get("address") as string) || null;
    const country = (formData.get("country") as string) || "Cameroon";
    const birthDate = (formData.get("birthDate") as string) || null;
    const companyName = (formData.get("companyName") as string) || null;
    const jobTitle = (formData.get("jobTitle") as string) || null;
    const newsletter = formData.get("newsletter") === "true";
    const profilePictureFile = formData.get("profilePicture") as File | null;

    // Validate email exists
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate required fields
    if (!phone || !whatsapp || !city || !address) {
      return NextResponse.json({ error: "Phone, WhatsApp, city, and address are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let profilePicturePath: string | null = null;

    // Handle profile picture upload
    if (profilePictureFile) {
      try {
        const bytes = await profilePictureFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const ext = profilePictureFile.name.split(".").pop();
        const filename = `${user.id}-${randomBytes(8).toString("hex")}.${ext}`;
        const uploadDir = path.join(process.cwd(), "public/uploads/profiles");

        // Create directory if it doesn't exist
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        profilePicturePath = `/uploads/profiles/${filename}`;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        // Continue without profile picture if upload fails
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        phone: phone || undefined,
        whatsapp: whatsapp || undefined,
        city: city || undefined,
        address: address || undefined,
        country,
        birthDate: birthDate ? new Date(birthDate) : null,
        companyName: companyName || undefined,
        jobTitle: jobTitle || undefined,
        newsletter,
        profilePicture: profilePicturePath || undefined,
        isProfileComplete: true,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          fullName: updatedUser.fullName,
          isProfileComplete: updatedUser.isProfileComplete,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
