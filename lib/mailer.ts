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
  security: {
    address: process.env.MAILTRAP_EMAIL_SECURITY || "security@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_SECURITY || "KmerHosting Security",
  },
  abuse: {
    address: process.env.MAILTRAP_EMAIL_ABUSE || "abuse@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_ABUSE || "KmerHosting Abuse",
  },
  noc: {
    address: process.env.MAILTRAP_EMAIL_NOC || "noc@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_NOC || "KmerHosting NOC",
  },
  migrations: {
    address: process.env.MAILTRAP_EMAIL_MIGRATIONS || "migrations@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_MIGRATIONS || "KmerHosting Migrations",
  },
  info: {
    address: process.env.MAILTRAP_EMAIL_INFO || "info@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_INFO || "KmerHosting Info",
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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification - KmerHosting</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <!-- White Header with Centered Logo -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
            </div>
            
            <!-- Main Content -->
            <div style="max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <!-- Title -->
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
                Verify Your Email
              </h1>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 30px 0; line-height: 1.5;">
                Hi ${recipientName}, use this code to verify your email address and complete your signup.
              </p>
              
              <!-- OTP Code - Large & Centered -->
              <div style="background-color: #ffffff; border: 2px solid #128C7E; padding: 40px 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Verification Code</p>
                <h2 style="color: #128C7E; font-size: 56px; letter-spacing: 6px; margin: 0; font-weight: 700; font-family: 'Courier New', 'Monaco', monospace;">${otp}</h2>
              </div>
              
              <!-- Security Warning -->
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #991b1b; font-size: 13px; margin: 0; line-height: 1.5;">
                  <strong></strong> Never share this code with anyone, not even KmerHosting staff. Our team members will never ask for your verification code.
                </p>
              </div>
              
              <!-- Info -->
              <p style="color: #6b7280; font-size: 13px; text-align: center; margin: 25px 0;">
                This code expires in <strong>15 minutes</strong>
              </p>
              
              <!-- Info: Didn't request? -->
              <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 15px 0 0 0; line-height: 1.5;">
                If you did not request this verification code, please ignore this email. Your email will not be verified and no account will be created.
              </p>
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">
              
              <!-- Footer -->
              <div style="text-align: center;">
                <p style="color: #374151; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">
                  KmerHosting
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 15px 0;">
                  Shared Hosting • Reseller Hosting • VPS • Dedicated Servers
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
                  NKOABANG, Yaoundé, Cameroon
                </p>
                <p style="color: #9ca3af; font-size: 11px; margin: 20px 0 0 0;">
                  © 2025 KmerHosting. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kmerhosting.com";
    await transport.sendMail({
      from: emailConfig.noreply,
      to: recipientEmail,
      subject: "Welcome to KmerHosting!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to KmerHosting</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <!-- White Header with Centered Logo -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
            </div>
            
            <!-- Main Content -->
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Greeting -->
              <h1 style="color: #1f2937; font-size: 28px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                Welcome to KmerHosting, ${recipientName}!
              </h1>
              
              <!-- Message -->
              <div style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                <p style="margin: 0 0 15px 0;">Your account has been successfully created and verified! Welcome to KmerHosting.</p>
                
                <p style="margin: 0 0 20px 0;"><strong style="color: #1f2937;">Next Step: Complete Your Account Information</strong></p>
                
                <p style="margin: 0 0 20px 0;">To unlock all features and get started with your hosting services, please log in to your dashboard and complete your profile by providing:</p>
                
                <ul style="margin: 0 0 25px 20px; padding: 0; color: #6b7280;">
                  <li style="margin: 0 0 8px 0;">Complete contact information</li>
                  <li style="margin: 0 0 8px 0;">Billing and payment information</li>
                  <li style="margin: 0 0 8px 0;">Address and phone number</li>
                </ul>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 40px;">
                <a href="${appUrl}/dashboard" style="display: inline-block; padding: 14px 40px; background-color: #128C7E; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background-color 0.3s ease;">
                  Complete Your Profile
                </a>
              </div>
              
              <!-- Important Box -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 10px 0;">Important</p>
                <p style="color: #92400e; font-size: 14px; margin: 0;">Completing your account information is required to activate services and process transactions. Your data is protected and used only for account management.</p>
              </div>
              
              <!-- Additional Info -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;"><strong>Need help?</strong></p>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">Our support team is available 24/7. Visit our <a href="${appUrl}/support" style="color: #128C7E; text-decoration: none;">support center</a> or email us at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>
              </div>
              
              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <!-- Footer -->
              <div style="color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.6;">
                <p style="margin: 0 0 10px 0;">© 2025 KmerHosting. All rights reserved.</p>
                <p style="margin: 0;">
                  <a href="${appUrl}/legal/privacy-policy" style="color: #9ca3af; text-decoration: none; margin-right: 15px;">Privacy Policy</a>
                  <a href="${appUrl}/legal/terms-of-service" style="color: #9ca3af; text-decoration: none;">Terms of Service</a>
                </p>
              </div>
            </div>
          </body>
        </html>
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

// Email verification confirmed
export async function sendEmailVerificationConfirmationEmail(
  recipientEmail: string,
  recipientName: string
): Promise<void> {
  try {
    await transport.sendMail({
      from: emailConfig.noreply,
      to: recipientEmail,
      subject: "Email Verified - Account Activated",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verified - KmerHosting</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <!-- White Header with Centered Logo -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
            </div>
            
            <!-- Main Content -->
            <div style="max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
                ✓ Email Verified
              </h1>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 30px 0; line-height: 1.5;">
                Hi ${recipientName}, your email has been successfully verified and your account is now active!
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #166534; font-size: 14px; margin: 0; line-height: 1.5;">
                  Your account is ready to use. You can now log in and access all KmerHosting services.
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <div style="text-align: center;">
                <p style="color: #374151; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">
                  KmerHosting
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  © 2025 KmerHosting. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      category: "Account Verification",
    });
  } catch (error) {
    console.error("Failed to send email verification confirmation:", error);
  }
}

// Security alert for password change
export async function sendPasswordChangeSecurityAlert(
  recipientEmail: string,
  recipientName: string
): Promise<void> {
  try {
    const timestamp = new Date().toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    await transport.sendMail({
      from: emailConfig.security,
      to: recipientEmail,
      subject: "Security Alert: Password Changed",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed - KmerHosting</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <!-- White Header with Centered Logo -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
            </div>
            
            <!-- Main Content -->
            <div style="max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
                🔐 Password Changed
              </h1>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 30px 0; line-height: 1.5;">
                Your KmerHosting account password was successfully changed.
              </p>
              
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; margin: 0 0 10px 0; font-weight: 600;">Activity Details</p>
                <p style="color: #1f2937; font-size: 14px; margin: 0 0 5px 0;"><strong>Action:</strong> Password changed</p>
                <p style="color: #1f2937; font-size: 14px; margin: 0;"><strong>Time:</strong> ${timestamp}</p>
              </div>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #991b1b; font-size: 13px; margin: 0; line-height: 1.5;">
                  <strong>Did not authorize this change?</strong> Contact our security team immediately at <a href="mailto:security@kmerhosting.com" style="color: #dc2626; text-decoration: underline;">security@kmerhosting.com</a>
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <div style="text-align: center;">
                <p style="color: #374151; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">
                  KmerHosting Security Team
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  © 2025 KmerHosting. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      category: "Security Alert",
    });
  } catch (error) {
    console.error("Failed to send password change security alert:", error);
  }
}

// Security alert for account information update
export async function sendAccountInfoUpdateSecurityAlert(
  recipientEmail: string,
  recipientName: string
): Promise<void> {
  try {
    const timestamp = new Date().toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    await transport.sendMail({
      from: emailConfig.security,
      to: recipientEmail,
      subject: "Security Alert: Account Information Updated",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Updated - KmerHosting</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <!-- White Header with Centered Logo -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="max-width: 180px; height: auto; display: inline-block;">
            </div>
            
            <!-- Main Content -->
            <div style="max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
                🔔 Account Information Updated
              </h1>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 30px 0; line-height: 1.5;">
                Your KmerHosting account information has been successfully updated.
              </p>
              
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; margin: 0 0 10px 0; font-weight: 600;">Activity Details</p>
                <p style="color: #1f2937; font-size: 14px; margin: 0 0 5px 0;"><strong>Action:</strong> Account information modified</p>
                <p style="color: #1f2937; font-size: 14px; margin: 0;"><strong>Time:</strong> ${timestamp}</p>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
                  <strong>Did not make this change?</strong> Your account may be compromised. Contact us immediately at <a href="mailto:security@kmerhosting.com" style="color: #f59e0b; text-decoration: underline;">security@kmerhosting.com</a>
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <div style="text-align: center;">
                <p style="color: #374151; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">
                  KmerHosting Security Team
                </p>
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  © 2025 KmerHosting. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      category: "Security Alert",
    });
  } catch (error) {
    console.error("Failed to send account info update security alert:", error);
  }
}

