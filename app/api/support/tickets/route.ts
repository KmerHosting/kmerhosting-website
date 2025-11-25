import { getCurrentUser } from "@/lib/auth";
import { sendSupportEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Parse form data
    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const subject = formData.get("subject") as string;
    const department = formData.get("department") as string;
    const content = formData.get("content") as string;
    const serviceId = formData.get("serviceId") as string | null;

    // Validate required fields
    if (!email || !fullName || !subject || !department || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate department
    const validDepartments = [
      "support",
      "billing",
      "sales",
      "noc",
      "security",
      "abuse",
      "info",
      "migrations",
    ];
    if (!validDepartments.includes(department)) {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 400 }
      );
    }

    // Get current user (if authenticated)
    let userId: string | null = null;
    try {
      const user = await getCurrentUser();
      if (user) {
        userId = user.userId;
      }
    } catch (err) {
      // User not authenticated, which is fine
    }

    // Create ticket in database
    const ticket = await prisma.ticket.create({
      data: {
        userId: userId || undefined,
        subject,
        department,
        content,
        serviceId: (serviceId && serviceId !== "null") ? serviceId : undefined,
        status: "open",
      },
    });

    // Handle file uploads (up to 5 images)
    const uploadDir = path.join(process.cwd(), "public/uploads/tickets");
    await mkdir(uploadDir, { recursive: true });

    const imageFiles: File[] = [];
    const entries = formData.entries();
    for (const [key, value] of entries) {
      if (key === "images" && value instanceof File) {
        imageFiles.push(value);
      }
    }

    if (imageFiles.length > 5) {
      await prisma.ticket.delete({ where: { id: ticket.id } });
      return NextResponse.json(
        { error: "Maximum 5 images allowed" },
        { status: 400 }
      );
    }

    // Process each image
    const images: any[] = [];
    for (const imageFile of imageFiles) {
      try {
        if (!imageFile.type.startsWith("image/")) {
          continue;
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate file size (5MB max per file)
        if (buffer.length > 5 * 1024 * 1024) {
          continue;
        }

        // Generate unique filename
        const ext = imageFile.name.split(".").pop();
        const filename = `${ticket.id}-${randomBytes(8).toString("hex")}.${ext}`;
        const filepath = path.join(uploadDir, filename);

        // Write file
        await writeFile(filepath, buffer);

        // Store image metadata in DB
        const ticketImage = await prisma.ticketImage.create({
          data: {
            ticketId: ticket.id,
            url: `/uploads/tickets/${filename}`,
            fileName: imageFile.name,
            mimeType: imageFile.type,
            size: buffer.length,
          },
        });

        images.push(ticketImage);
      } catch (imageError) {
        console.error("Error processing image:", imageError);
        // Continue with other images if one fails
      }
    }

    // Email configuration for departments
    const departmentEmails: Record<string, string> = {
      support: process.env.MAILTRAP_EMAIL_SUPPORT || "support@kmerhosting.com",
      billing: process.env.MAILTRAP_EMAIL_BILLING || "billing@kmerhosting.com",
      sales: process.env.MAILTRAP_EMAIL_SALES || "sales@kmerhosting.com",
      noc: process.env.MAILTRAP_EMAIL_NOC || "noc@kmerhosting.com",
      security: process.env.MAILTRAP_EMAIL_SECURITY || "security@kmerhosting.com",
      abuse: process.env.MAILTRAP_EMAIL_ABUSE || "abuse@kmerhosting.com",
      info: process.env.MAILTRAP_EMAIL_INFO || "info@kmerhosting.com",
      migrations: process.env.MAILTRAP_EMAIL_MIGRATIONS || "migrations@kmerhosting.com",
    };

    const departmentEmail =
      departmentEmails[department] || "support@kmerhosting.com";

    // Send confirmation email to user
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kmerhosting.com";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ticket Received - KmerHosting</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
          <!-- White Header with Centered Logo -->
          <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
          </div>
          
          <!-- Main Content -->
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
              Thank You for Contacting Us
            </h1>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 30px 0; line-height: 1.5;">
              Hi ${fullName}, we have received your support ticket and will respond to you soon.
            </p>
            
            <!-- Ticket Details -->
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 6px; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; margin: 0 0 15px 0; font-weight: 600;">Ticket Details</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0 0 8px 0;"><strong>Ticket ID:</strong> ${ticket.id}</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0 0 8px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0 0 8px 0;"><strong>Department:</strong> ${department.charAt(0).toUpperCase() + department.slice(1)}</p>
              <p style="color: #1f2937; font-size: 14px; margin: 0;"><strong>Status:</strong> Open</p>
            </div>
            
            <!-- Message Info -->
            <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin: 30px 0; border-radius: 4px;">
              <p style="color: #0c4a6e; font-size: 14px; margin: 0; line-height: 1.5;">
                ${userId ? "Our support team is looking for an available member and will respond to you in your KmerHosting dashboard notifications shortly." : "We will respond to your email shortly. We recommend creating a KmerHosting account for faster and more efficient support."}
              </p>
            </div>
            
            <!-- CTA Button (for registered users) -->
            ${
              userId
                ? `
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${appUrl}/dashboard" style="display: inline-block; padding: 12px 30px; background-color: #128C7E; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Check Your Dashboard
                </a>
              </div>
            `
                : ""
            }
            
            <!-- Support Info -->
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 30px 0; border: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px 0;"><strong>Need immediate assistance?</strong></p>
              <p style="color: #6b7280; font-size: 13px; margin: 0;">Our support team is available 24/7. Contact us at <a href="mailto:${departmentEmail}" style="color: #128C7E; text-decoration: none;">${departmentEmail}</a></p>
            </div>
            
            <!-- Divider -->
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <!-- Footer -->
            <div style="color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.6;">
              <p style="margin: 0 0 10px 0;">© 2025 KmerHosting. All rights reserved.</p>
              <p style="margin: 0;">
                <a href="${appUrl}/legal/privacy-policy" style="color: #9ca3af; text-decoration: none; margin-right: 10px;">Privacy Policy</a>
                <a href="${appUrl}/legal/terms-of-service" style="color: #9ca3af; text-decoration: none;">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to user
    try {
      await sendSupportEmail(
        email,
        fullName,
        `Support Ticket Received - ${ticket.id}`,
        htmlContent
      );
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the ticket creation if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ticket submitted successfully",
        ticketId: ticket.id,
        userId: userId || null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
