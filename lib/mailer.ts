import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not defined in environment variables");
}

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: process.env.MAILTRAP_EMAIL || "hello@kmerhosting.com",
  name: process.env.MAILTRAP_NAME || "KmerHosting",
};

export async function sendOTPEmail(
  recipientEmail: string,
  recipientName: string,
  otp: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: sender,
      to: recipientEmail,
      subject: "Your KmerHosting Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #128C7E;">Welcome to KmerHosting, ${recipientName}!</h2>
          <p>Your email verification code is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #128C7E; letter-spacing: 2px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666;">This code will expire in 15 minutes.</p>
          <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">© 2025 KmerHosting. All rights reserved.</p>
        </div>
      `,
      category: "Email Verification",
    });
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendWelcomeEmail(
  recipientEmail: string,
  recipientName: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: sender,
      to: recipientEmail,
      subject: "Welcome to KmerHosting!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #128C7E;">Welcome to KmerHosting, ${recipientName}!</h2>
          <p>Your account has been successfully created and verified.</p>
          <p>You can now log in to your dashboard and start managing your hosting services.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #128C7E; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Go to Dashboard
          </a>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">© 2025 KmerHosting. All rights reserved.</p>
        </div>
      `,
      category: "Welcome Email",
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Don't throw here as account is already created
  }
}
