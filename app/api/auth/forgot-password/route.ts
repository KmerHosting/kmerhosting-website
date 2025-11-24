import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import crypto from "crypto";

const prisma = new PrismaClient();

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not defined in environment variables");
}

// Email transporter configuration using Mailtrap
const transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user exists (but don't reveal if they do)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always respond the same way for security
    const response = {
      message: "If an account exists with this email, a password reset link has been sent",
    };

    if (!user) {
      return NextResponse.json(response, { status: 200 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: resetTokenHash,
        resetTokenExpiry,
      },
    });

    // Send email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `KmerHosting <noreply@kmerhosting.com>`,
      to: email,
      subject: "Password Reset Request - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #128C7E; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background-color: #128C7E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
              .warning { background-color: #fef3c7; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hello ${user.fullName || "User"},</p>
                
                <p>We received a request to reset the password associated with your KmerHosting account. If you did not make this request, you can safely ignore this email.</p>
                
                <p>To reset your password, click the button below:</p>
                
                <center>
                  <a href="${resetLink}" class="button">Reset Your Password</a>
                </center>
                
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px; font-size: 12px;">
                  ${resetLink}
                </p>
                
                <div class="warning">
                  <strong>⚠️ Important:</strong> This reset link will expire in 1 hour. If you need to reset your password after this time, please request a new reset link.
                </div>
                
                <p style="font-size: 14px; color: #666;">
                  If you did not request a password reset, please ignore this email or contact our support team immediately at support@kmerhosting.com.
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} KmerHosting. All rights reserved.</p>
                <p>This is an automated message, please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
