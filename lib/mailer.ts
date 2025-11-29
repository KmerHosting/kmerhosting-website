import nodemailer from "nodemailer";
// @ts-ignore
import { MailtrapTransport } from "./mailtrap-transport.js";

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
    address: process.env.MAILTRAP_EMAIL_INFO || "support@kmerhosting.com",
    name: process.env.MAILTRAP_NAME_INFO || "KmerHosting Info",
  },
};

// Function to send demo request confirmation to user
export async function sendDemoRequestConfirmation(
  userEmail: string,
  fullName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Demo Access Request Received - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .highlight { background: #f9f9f9; padding: 20px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .highlight p { color: #1a1a1a; margin: 0; }
            .feature-list { margin: 24px 0; padding-left: 0; list-style: none; }
            .feature-list li { padding: 8px 0; color: #666; font-size: 15px; }
            .feature-list li:before { content: "✓ "; color: #128C7E; font-weight: bold; margin-right: 8px; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">Demo Access Request Received</h1>
              <p class="text">Hello ${fullName},</p>
              <p class="text">Thank you for your interest in KmerHosting! We've received your request for demo access and our team is working on it.</p>
              
              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <p>Our team is preparing your demo credentials and will send them to you within 15 minutes. You'll receive instructions on how to access and explore our services.</p>
              </div>

              <p class="text"><strong>In the meantime, you can explore our hosting options:</strong></p>
              <ul class="feature-list">
                <li>Shared Hosting Plans</li>
                <li>VPS Servers</li>
                <li>Reseller Hosting</li>
                <li>Dedicated Servers</li>
              </ul>

              <div class="divider"></div>

              <p class="text">If you have any questions before your demo access is ready, feel free to contact us at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>

              <p class="text">Best regards,<br><strong>KmerHosting Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Demo confirmation email sent successfully to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending demo confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify admin about demo request
export async function notifyAdminDemoRequest(
  userEmail: string,
  fullName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminEmail = emailConfig.admin.address;
    
    if (!adminEmail) {
      console.error("Admin email not configured");
      return {
        success: false,
        error: "Admin email address not configured",
      };
    }

    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: adminEmail,
      subject: `New Demo Access Request - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 12px; border: 1px solid #f0f0f0; }
            .info-table .label { background: #f9f9f9; font-weight: 500; color: #1a1a1a; width: 25%; }
            .info-table .value { color: #666; }
            .alert { background: #fffbea; padding: 16px; border-left: 3px solid #ffc107; margin: 20px 0; }
            .alert-title { color: #1a1a1a; font-weight: 600; margin: 0 0 8px 0; }
            .alert p { color: #666; margin: 0; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 style="color: #1a1a1a; margin-top: 0;">New Demo Access Request</h1>
              
              <table class="info-table">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${fullName}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Request Time:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div class="alert">
                <p class="alert-title">Action Required</p>
                <p>Please prepare and send demo credentials to the customer email address above as soon as possible.</p>
              </div>

              <p style="color: #666;">A confirmation email has been sent to the customer. Please respond within 15 minutes to maintain service excellence.</p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin notification sent successfully to:", adminEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send contact form confirmation to user
export async function sendContactConfirmation(
  userEmail: string,
  fullName: string,
  departmentName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "We Received Your Message - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .highlight { background: #f9f9f9; padding: 20px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .highlight p { color: #1a1a1a; margin: 0; line-height: 1.6; }
            .info-box { background: #f9f9f9; padding: 16px; margin: 20px 0; border-radius: 4px; }
            .info-box strong { color: #1a1a1a; display: block; margin-bottom: 4px; }
            .info-box span { color: #666; font-size: 14px; }
            .feature-list { margin: 24px 0; padding-left: 0; list-style: none; }
            .feature-list li { padding: 8px 0; color: #666; font-size: 15px; }
            .feature-list li:before { content: "✓ "; color: #128C7E; font-weight: bold; margin-right: 8px; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">We Received Your Message</h1>
              <p class="text">Hello ${fullName},</p>
              <p class="text">Thank you for reaching out to KmerHosting! We have received your message and forwarded it to our <strong>${departmentName}</strong> team.</p>
              
              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <p>Your inquiry is being processed and will be handled by the appropriate team member. We typically respond within 15 minutes during business hours.</p>
              </div>

              <div class="info-box">
                <strong>Message Reference</strong>
                <span>Department: ${departmentName}</span>
                <span>Received: ${new Date().toLocaleString()}</span>
              </div>

              <p class="text"><strong>In the meantime:</strong></p>
              <ul class="feature-list">
                <li>Check our <a href="https://kmerhosting.com/faq" style="color: #128C7E; text-decoration: none;">FAQ</a> for quick answers</li>
                <li>Explore our <a href="https://kmerhosting.com" style="color: #128C7E; text-decoration: none;">services</a> and hosting options</li>
                <li>Browse our <a href="https://kmerhosting.com/about" style="color: #128C7E; text-decoration: none;">about page</a></li>
              </ul>

              <div class="divider"></div>

              <p class="text">Best regards,<br><strong>KmerHosting Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Contact confirmation email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify specific department about contact request
export async function notifyDepartmentContact(
  userEmail: string,
  fullName: string,
  message: string,
  departmentEmail: string,
  departmentName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: emailConfig.admin.address,
      subject: `New Contact Request - ${departmentName} Department from ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 12px; border: 1px solid #f0f0f0; }
            .info-table .label { background: #f9f9f9; font-weight: 500; color: #1a1a1a; width: 25%; }
            .info-table .value { color: #666; }
            .message-box { background: #f9f9f9; padding: 16px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .message-box strong { color: #1a1a1a; display: block; margin-bottom: 8px; }
            .message-box p { color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap; }
            .alert { background: #fffbea; padding: 16px; border-left: 3px solid #ffc107; margin: 20px 0; }
            .alert-title { color: #1a1a1a; font-weight: 600; margin: 0 0 8px 0; }
            .alert p { color: #666; margin: 0; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 style="color: #1a1a1a; margin-top: 0;">New Contact Request</h1>
              <p style="color: #666; font-size: 15px; margin-bottom: 20px;">Department: <strong>${departmentName}</strong></p>
              
              <table class="info-table">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${fullName}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Department:</td>
                  <td class="value">${departmentName}</td>
                </tr>
                <tr>
                  <td class="label">Received:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div class="message-box">
                <strong>Customer Message:</strong>
                <p>${message.replace(/\n/g, "<br/>")} </p>
              </div>

              <div class="alert">
                <p class="alert-title">Action Required</p>
                <p>Please route this inquiry to the appropriate ${departmentName} team and respond to the customer within 15 minutes.</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Department contact notification sent to admin");
    return { success: true };
  } catch (error) {
    console.error("Error sending department contact notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send sales contact confirmation to user
export async function sendSalesContactConfirmation(
  userEmail: string,
  fullName: string,
  subject: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "We Received Your Sales Inquiry - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .highlight { background: #f9f9f9; padding: 20px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .highlight p { color: #1a1a1a; margin: 0; line-height: 1.6; }
            .info-box { background: #f9f9f9; padding: 16px; margin: 20px 0; border-radius: 4px; }
            .info-box strong { color: #1a1a1a; display: block; margin-bottom: 4px; }
            .info-box span { color: #666; font-size: 14px; display: block; line-height: 1.6; }
            .feature-list { margin: 24px 0; padding-left: 0; list-style: none; }
            .feature-list li { padding: 8px 0; color: #666; font-size: 15px; }
            .feature-list li:before { content: "✓ "; color: #128C7E; font-weight: bold; margin-right: 8px; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">We Received Your Sales Inquiry</h1>
              <p class="text">Hello ${fullName},</p>
              <p class="text">Thank you for your interest in KmerHosting! We have received your sales inquiry and our team is reviewing it.</p>
              
              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <p>Our sales team will tailor the best solutions for your needs and contact you within 15 minutes with personalized recommendations.</p>
              </div>

              <div class="info-box">
                <strong>Your Inquiry</strong>
                <span>Subject: ${subject}</span>
                <span>Received: ${new Date().toLocaleString()}</span>
              </div>

              <p class="text"><strong>In the meantime, explore our hosting options:</strong></p>
              <ul class="feature-list">
                <li>Shared Hosting Plans</li>
                <li>VPS Servers</li>
                <li>Reseller Hosting</li>
                <li>Dedicated Servers</li>
              </ul>

              <div class="divider"></div>

              <p class="text">For urgent matters, you can reach us immediately at <a href="mailto:sales@kmerhosting.com" style="color: #128C7E; text-decoration: none;">sales@kmerhosting.com</a></p>

              <p class="text">Best regards,<br><strong>KmerHosting Sales Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Sales contact confirmation email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending sales contact confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify admin about sales contact
export async function notifySalesContact(
  userEmail: string,
  fullName: string,
  subject: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminEmail = emailConfig.admin.address;
    
    if (!adminEmail) {
      console.error("Admin email not configured");
      return {
        success: false,
        error: "Admin email address not configured",
      };
    }

    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: adminEmail,
      subject: `New Sales Inquiry - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p><strong>New Sales Inquiry - Action Required</strong></p>
              
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold; width: 30%;">Full Name:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">
                    <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Received:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <strong>Customer Message:</strong><br/>
                ${message.replace(/\n/g, "<br/>")}
              </p>

              <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
                <strong>Action Required:</strong> Please contact the sales team or respond directly to this inquiry as soon as possible. The customer is waiting for your response.
              </p>

              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                <strong>Quick Actions:</strong><br/>
                • <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">Reply to Customer</a><br/>
                • <a href="https://d3.my-control-panel.com" style="color: #128C7E; text-decoration: none;">Control Panel</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Sales inquiry notification sent to admin");
    return { success: true };
  } catch (error) {
    console.error("Error sending sales inquiry notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send payment proof submission confirmation to user
export async function sendPaymentProofConfirmation(
  userEmail: string,
  fullName: string,
  orderDetails: {
    planName: string;
    planPrice: number;
    orderId: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Payment Proof Received - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .order-details { background: #f9f9f9; padding: 20px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .order-details-row { display: flex; justify-content: space-between; padding: 8px 0; color: #666; font-size: 14px; }
            .order-details-label { font-weight: 500; color: #1a1a1a; }
            .highlight { background: #e8f5e9; padding: 20px; border-left: 3px solid #4caf50; margin: 20px 0; }
            .highlight p { color: #1a1a1a; margin: 0; line-height: 1.6; }
            .button-section { text-align: center; margin: 32px 0; }
            .button { display: inline-block; padding: 12px 32px; background: #128C7E; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 500; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">Payment Proof Received</h1>
              <p class="text">Hello ${fullName},</p>
              <p class="text">We have successfully received your payment proof! Thank you for submitting the required documentation.</p>
              
              <div class="order-details">
                <div class="order-details-row">
                  <span class="order-details-label">Plan:</span>
                  <span>${orderDetails.planName}</span>
                </div>
                <div class="order-details-row">
                  <span class="order-details-label">Amount:</span>
                  <span>XAF ${orderDetails.planPrice.toLocaleString()}</span>
                </div>
                <div class="order-details-row">
                  <span class="order-details-label">Order ID:</span>
                  <span><strong>${orderDetails.orderId}</strong></span>
                </div>
              </div>

              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <p>Our payment verification team is reviewing your proof. You'll receive a confirmation email within 15 minutes. Your service will be activated immediately upon approval.</p>
              </div>

              <div class="button-section">
                <a href="https://kmerhosting.com/customers/dashboard" class="button">View in Dashboard</a>
              </div>

              <div class="divider"></div>

              <p class="text">If you have any questions about your order, contact us at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>

              <p class="text">Best regards,<br><strong>KmerHosting Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Payment proof confirmation email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending payment proof confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify admin about payment proof submission
export async function notifyAdminPaymentProofSubmitted(
  userEmail: string,
  fullName: string,
  orderDetails: {
    planName: string;
    planPrice: number;
    orderId: string;
  },
  description: string,
  imageCount: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminEmail = emailConfig.admin.address;
    
    if (!adminEmail) {
      console.error("Admin email not configured");
      return {
        success: false,
        error: "Admin email address not configured",
      };
    }

    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: adminEmail,
      subject: `Payment Proof Submitted - ${fullName} (Order #${orderDetails.orderId})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 12px; border: 1px solid #f0f0f0; }
            .info-table .label { background: #f9f9f9; font-weight: 500; color: #1a1a1a; width: 25%; }
            .info-table .value { color: #666; }
            .message-box { background: #f9f9f9; padding: 16px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .message-box strong { color: #1a1a1a; display: block; margin-bottom: 8px; }
            .message-box p { color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap; }
            .alert { background: #fffbea; padding: 16px; border-left: 3px solid #ffc107; margin: 20px 0; }
            .alert-title { color: #1a1a1a; font-weight: 600; margin: 0 0 8px 0; }
            .alert p { color: #666; margin: 0; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 style="color: #1a1a1a; margin-top: 0;">Payment Proof Submitted</h1>
              
              <table class="info-table">
                <tr>
                  <td class="label">Customer:</td>
                  <td class="value">${fullName}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Order ID:</td>
                  <td class="value">${orderDetails.orderId}</td>
                </tr>
                <tr>
                  <td class="label">Plan:</td>
                  <td class="value">${orderDetails.planName}</td>
                </tr>
                <tr>
                  <td class="label">Amount:</td>
                  <td class="value">XAF ${orderDetails.planPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td class="label">Images:</td>
                  <td class="value">${imageCount} image(s)</td>
                </tr>
                <tr>
                  <td class="label">Submitted:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div class="message-box">
                <strong>Payment Details:</strong>
                <p>${description.replace(/\n/g, "<br/>")} </p>
              </div>

              <div class="alert">
                <p class="alert-title">Action Required</p>
                <p>Please verify the payment proof and approve or reject the order. The customer is waiting for confirmation to activate their services.</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin payment proof notification sent to:", adminEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin payment proof notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send email verification link during signup
export async function sendVerificationEmail(
  userEmail: string,
  fullName: string,
  verifyUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Verify Your Email - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .content h1 { color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0; }
            .content p { color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; }
            .cta-button { display: inline-block; background: #128C7E; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 500; margin: 24px 0; }
            .code-box { background: #f5f5f5; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #333; word-break: break-all; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1>Verify Your Email</h1>
              <p>Hello ${fullName},</p>
              <p>Thank you for creating a KmerHosting account. Please verify your email address to get started.</p>
              <div style="text-align: center;">
                <a href="${verifyUrl}" class="cta-button">Verify Email</a>
              </div>
              <p style="color: #999; font-size: 13px;">Or copy and paste this link:</p>
              <div class="code-box">${verifyUrl}</div>
              <p style="color: #999; font-size: 13px; margin-top: 24px;">This link expires in 15 minutes. If you didn't create this account, you can ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
              <p>If you have any questions, contact us at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Verification email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify admin about new user signup
export async function notifyAdminNewUser(
  userEmail: string,
  fullName: string,
  signupTime: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.noreply,
      to: emailConfig.admin.address,
      subject: `New User Signup - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .content h1 { color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 12px; border: 1px solid #f0f0f0; }
            .info-table .label { background: #f9f9f9; font-weight: 500; color: #1a1a1a; width: 25%; }
            .info-table .value { color: #666; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1>New User Registration</h1>
              <table class="info-table">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${fullName}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Signup Time:</td>
                  <td class="value">${signupTime}</td>
                </tr>
              </table>
              <p style="color: #666; font-size: 14px;">A new user has registered. Verification email has been sent to them.</p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin notification sent for new user:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send welcome email after email verification
export async function sendWelcomeEmail(
  userEmail: string,
  username: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/customers/dashboard`;

    await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Welcome to KmerHosting!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .features { margin: 32px 0; }
            .feature-item { padding: 16px; background: #f9f9f9; border-left: 3px solid #128C7E; margin: 12px 0; }
            .feature-item strong { color: #1a1a1a; display: block; margin-bottom: 4px; }
            .feature-item span { color: #666; font-size: 14px; }
            .button-section { text-align: center; margin: 32px 0; }
            .button { display: inline-block; padding: 12px 32px; background: #128C7E; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 500; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">Welcome to KmerHosting, ${username}!</h1>
              <p class="text">Thank you for joining us. Your email has been verified, and your account is now active.</p>
              
              <div class="features">
                <div class="feature-item">
                  <strong>📊 Dashboard</strong>
                  <span>Manage your services, view billing, and track your account activity</span>
                </div>
                <div class="feature-item">
                  <strong>🖥️ Hosting Services</strong>
                  <span>Explore our shared hosting, VPS, dedicated servers, and reseller hosting options</span>
                </div>
                <div class="feature-item">
                  <strong>💰 Flexible Plans</strong>
                  <span>Choose from various pricing tiers to match your needs and budget</span>
                </div>
                <div class="feature-item">
                  <strong>🆘 24/7 Support</strong>
                  <span>Our support team is always ready to help you with any questions</span>
                </div>
              </div>

              <div class="button-section">
                <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
              </div>

              <div class="divider"></div>

              <p class="text">If you need any assistance, our support team is available 24/7. Feel free to reach out at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>

              <p class="text">Best regards,<br><strong>KmerHosting Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to send plan selection confirmation
export async function sendPlanSelectionEmail(
  userEmail: string,
  username: string,
  planName: string,
  planPrice: number,
  billingCycle: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.billing,
      to: userEmail,
      subject: `Plan Selected - ${planName} Plan - KmerHosting`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .greeting { color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }
            .text { color: #666; font-size: 15px; line-height: 1.6; margin: 16px 0; }
            .plan-details { background: #f9f9f9; padding: 20px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .plan-details-row { display: flex; justify-content: space-between; padding: 8px 0; color: #666; font-size: 14px; }
            .plan-details-label { font-weight: 500; color: #1a1a1a; }
            .alert { background: #fffbea; padding: 16px; border-left: 3px solid #ffc107; margin: 20px 0; }
            .alert-title { color: #1a1a1a; font-weight: 600; margin: 0 0 8px 0; }
            .alert p { color: #666; margin: 0; }
            .button-section { text-align: center; margin: 32px 0; }
            .button { display: inline-block; padding: 12px 32px; background: #128C7E; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 500; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .divider { height: 1px; background: #f0f0f0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 class="greeting">Plan Selected Successfully</h1>
              <p class="text">Hello ${username},</p>
              <p class="text">Thank you for selecting a hosting plan with KmerHosting! Here are your plan details:</p>
              
              <div class="plan-details">
                <div class="plan-details-row">
                  <span class="plan-details-label">Plan:</span>
                  <span>${planName}</span>
                </div>
                <div class="plan-details-row">
                  <span class="plan-details-label">Price:</span>
                  <span>XAF ${planPrice.toLocaleString()}</span>
                </div>
                <div class="plan-details-row">
                  <span class="plan-details-label">Billing Cycle:</span>
                  <span>${billingCycle}</span>
                </div>
              </div>

              <div class="alert">
                <p class="alert-title">Next Step</p>
                <p>Please proceed to payment to activate your hosting service. Follow the payment instructions to complete your order.</p>
              </div>

              <div class="button-section">
                <a href="https://kmerhosting.com/get-pay" class="button">Proceed to Payment</a>
              </div>

              <div class="divider"></div>

              <p class="text">If you have any questions about your plan, please contact our support team at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>

              <p class="text">Best regards,<br><strong>KmerHosting Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Plan selection email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending plan selection email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to notify admin about new plan selection
export async function notifyAdminPlanSelection(
  userEmail: string,
  username: string,
  planName: string,
  planPrice: number,
  billingCycle: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.billing,
      to: emailConfig.admin.address,
      subject: `New Plan Selected - ${username}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 12px; border: 1px solid #f0f0f0; }
            .info-table .label { background: #f9f9f9; font-weight: 500; color: #1a1a1a; width: 25%; }
            .info-table .value { color: #666; }
            .highlight { background: #e8f5e9; padding: 16px; border-left: 3px solid #4caf50; margin: 20px 0; }
            .highlight p { color: #1a1a1a; margin: 0; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 style="color: #1a1a1a; margin-top: 0;">New Plan Selection</h1>
              
              <table class="info-table">
                <tr>
                  <td class="label">Username:</td>
                  <td class="value">${username}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Plan:</td>
                  <td class="value">${planName}</td>
                </tr>
                <tr>
                  <td class="label">Price:</td>
                  <td class="value">XAF ${planPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td class="label">Billing Cycle:</td>
                  <td class="value">${billingCycle}</td>
                </tr>
                <tr>
                  <td class="label">Selected At:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div class="highlight">
                <p>Customer is awaiting payment confirmation. Monitor for payment submission.</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin plan selection notification sent");
    return { success: true };
  } catch (error) {
    console.error("Error sending admin plan selection notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

// Function to send password reset link
export async function sendPasswordResetEmail(
  userEmail: string,
  fullName: string,
  resetUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.security,
      to: userEmail,
      subject: "Reset Your KmerHosting Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .content h1 { color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0; }
            .content p { color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; }
            .cta-button { display: inline-block; background: #128C7E; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 500; margin: 24px 0; }
            .code-box { background: #f5f5f5; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #333; word-break: break-all; }
            .warning-box { background: #fff3cd; padding: 16px; border-left: 3px solid #ffc107; margin: 20px 0; }
            .warning-box strong { color: #1a1a1a; display: block; margin-bottom: 8px; }
            .warning-box p { color: #666; margin: 0; font-size: 13px; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1>Reset Your Password</h1>
              <p>Hello ${fullName},</p>
              <p>We received a request to reset your KmerHosting password. Click the button below to create a new password.</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="cta-button">Reset Password</a>
              </div>
              <p style="color: #999; font-size: 13px;">Or copy and paste this link:</p>
              <div class="code-box">${resetUrl}</div>
              
              <div class="warning-box">
                <strong>Security Notice:</strong>
                <p>This link will expire in 1 hour. If you didn't request a password reset, you can ignore this email or let us know at <a href="mailto:security@kmerhosting.com" style="color: #128C7E; text-decoration: none;">security@kmerhosting.com</a></p>
              </div>

              <p style="color: #666; font-size: 13px; margin-top: 24px;">For your security, never share this link with anyone. KmerHosting team members will never ask for your password.</p>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
              <p>If you have any questions, contact us at <a href="mailto:support@kmerhosting.com" style="color: #128C7E; text-decoration: none;">support@kmerhosting.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Password reset email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to send newsletter confirmation email
export async function sendNewsletterSubscriptionRequestConfirmationEmail(
  userEmail: string,
  confirmUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Confirm Your Newsletter Subscription - KmerHosting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .content h1 { color: #1a1a1a; font-size: 24px; margin: 0 0 16px 0; }
            .content p { color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; }
            .cta-button { display: inline-block; background: #128C7E; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 500; margin: 24px 0; }
            .code-box { background: #f5f5f5; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #333; word-break: break-all; }
            .highlight { background: #f9f9f9; padding: 16px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .highlight p { color: #666; margin: 0; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1>Confirm Your Newsletter Subscription</h1>
              <p>Thanks for showing interest in KmerHosting! We're excited to have you on our mailing list.</p>
              
              <div class="highlight">
                <p>Click the button below to confirm your subscription and start receiving updates about our hosting solutions, tips, and exclusive offers.</p>
              </div>

              <div style="text-align: center;">
                <a href="${confirmUrl}" class="cta-button">Confirm Subscription</a>
              </div>
              
              <p style="color: #999; font-size: 13px;">Or copy and paste this link:</p>
              <div class="code-box">${confirmUrl}</div>

              <p style="color: #666; font-size: 13px; margin-top: 24px;">This confirmation link will expire in 7 days. If you didn't request this subscription, you can ignore this email.</p>
              
              <p style="color: #666; font-size: 13px; margin-top: 16px;">You'll receive updates about:</p>
              <ul style="color: #666; font-size: 13px; margin-left: 20px;">
                <li>New hosting features and services</li>
                <li>Industry news and trends</li>
                <li>Exclusive promotions and offers</li>
                <li>Tips for web hosting and domain management</li>
                <li>Important service updates</li>
              </ul>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
              <p>You're receiving this email because you requested to subscribe to our newsletter.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Newsletter confirmation email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending newsletter confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Function to send generic admin notification email
export async function sendAdminNotificationEmail(
  adminEmail: string,
  subject: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await transport.sendMail({
      from: emailConfig.noreply,
      to: adminEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #fff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .logo { height: 32px; display: inline-block; }
            .content { padding: 40px 20px; }
            .message-box { background: #f9f9f9; padding: 16px; border-left: 3px solid #128C7E; margin: 20px 0; }
            .message-box p { color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap; }
            .footer { background: #f9f9f9; padding: 24px 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" class="logo" />
            </div>
            <div class="content">
              <h1 style="color: #1a1a1a; margin-top: 0;">${subject}</h1>
              
              <div class="message-box">
                <p>${message.replace(/\n/g, "<br/>")}</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2025 KmerHosting. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin notification email sent to:", adminEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Explicit alias for newsletter-specific admin notifications
export async function sendAdminNewsletterNotificationEmail(
  adminEmail: string,
  subject: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  return sendAdminNotificationEmail(adminEmail, subject, message);
}

