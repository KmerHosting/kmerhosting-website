import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string)?.trim() || null;
    const whatsapp = (formData.get("whatsapp") as string)?.trim() || null;
    const city = (formData.get("city") as string)?.trim() || null;
    const address = (formData.get("address") as string)?.trim() || null;
    const country = ((formData.get("country") as string)?.trim() || "Cameroon");
    const birthDate = (formData.get("birthDate") as string)?.trim() || null;
    const companyName = (formData.get("companyName") as string)?.trim() || null;
    const jobTitle = (formData.get("jobTitle") as string)?.trim() || null;
    const profilePictureFile = formData.get("profilePicture") as File | null;

    // Validate email exists
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate required fields - phone, whatsapp, city, and address must be provided
    if (!phone || !whatsapp || !city || !address) {
      return NextResponse.json(
        { error: "Phone, WhatsApp, city, and address are required" },
        { status: 400 }
      );
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

    // Update user profile - only include fields that are provided
    const updateData: any = {
      isProfileComplete: true,
    };

    // Add each field if it was provided, even if empty
    if (phone !== undefined) updateData.phone = phone || null;
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp || null;
    if (city !== undefined) updateData.city = city || null;
    if (address !== undefined) updateData.address = address || null;
    if (country !== undefined) updateData.country = country;
    if (birthDate !== undefined) updateData.birthDate = birthDate ? new Date(birthDate) : null;
    if (companyName !== undefined) updateData.companyName = companyName || null;
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle || null;
    if (profilePicturePath) updateData.profilePicture = profilePicturePath;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
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
