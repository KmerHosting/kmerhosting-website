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

// Email configurations for different purposes
const emailConfig = {
  noreply: {
    address: process.env.MAILTRAP_EMAIL_NOREPLY || "noreply@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_NOREPLY || "KmerHosting",
  },
  billing: {
    address: process.env.MAILTRAP_EMAIL_BILLING || "billing@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_BILLING || "KmerHosting Billing",
  },
  sales: {
    address: process.env.MAILTRAP_EMAIL_SALES || "sales@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_SALES || "KmerHosting Sales",
  },
  support: {
    address: process.env.MAILTRAP_EMAIL_SUPPORT || "support@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_SUPPORT || "KmerHosting Support",
  },
  admin: {
    address: process.env.MAILTRAP_EMAIL_ADMIN || "admin@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_ADMIN || "KmerHosting Admin",
  },
};

export async function sendOTPEmail(
  recipientEmail: string,
  recipientName: string,
  otp: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: emailConfig.noreply,
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
      from: emailConfig.noreply,
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

// Example function for sending billing emails
export async function sendBillingEmail(
  recipientEmail: string,
  recipientName: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: emailConfig.billing,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      category: "Billing",
    });
  } catch (error) {
    console.error("Failed to send billing email:", error);
    throw new Error("Failed to send billing email");
  }
}

// Example function for sending support emails
export async function sendSupportEmail(
  recipientEmail: string,
  recipientName: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: emailConfig.support,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      category: "Support",
    });
  } catch (error) {
    console.error("Failed to send support email:", error);
    throw new Error("Failed to send support email");
  }
}

// Example function for sending sales emails
export async function sendSalesEmail(
  recipientEmail: string,
  recipientName: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: emailConfig.sales,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      category: "Sales",
    });
  } catch (error) {
    console.error("Failed to send sales email:", error);
    throw new Error("Failed to send sales email");
  }
}
