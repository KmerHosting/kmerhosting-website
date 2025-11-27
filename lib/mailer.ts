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
    address: process.env.MAILTRAP_EMAIL_INFO || "hello@kmerhosting.com",
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: white padding: 10px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>Thank you for your interest in KmerHosting! We have received your request for demo access.</p>
              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                Our team is preparing your demo credentials and will send them to you very soon. This typically takes less than 24 hours.
              </p>
              <p>In the meantime, you can explore our:</p>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;">✓ Shared Hosting Plans</li>
                <li style="margin: 8px 0;">✓ VPS Servers</li>
                <li style="margin: 8px 0;">✓ Reseller Hosting</li>
                <li style="margin: 8px 0;">✓ Dedicated Servers</li>
              </ul>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Best regards,<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: white padding: 10px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p><strong>Customer Details:</strong></p>
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Full Name:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">
                    <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Request Time:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
                <strong>Action Required:</strong> Please prepare and send demo credentials to the customer email address above as soon as possible.
              </p>
              <p style="margin: 15px 0;">Status: Confirmation email has been sent to the customer.</p>
              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                <strong>Quick Action:</strong><br/>
                • <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">Reply to Customer</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: white; padding: 10px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>Thank you for reaching out to KmerHosting! We have received your message and it has been forwarded to our <strong>${departmentName}</strong> team.</p>
              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <strong>What's Next?</strong><br/>
                Your inquiry is being processed and escalated to the appropriate team member. We will get back to you with a response as soon as possible, typically within 24 hours during business hours.
              </p>
              <p style="margin: 20px 0; font-size: 14px;"><strong>Message Reference:</strong><br/>
                Department: ${departmentName}<br/>
                Received: ${new Date().toLocaleString()}
              </p>
              <p style="margin-top: 20px;">In the meantime, you can:</p>
              <ul style="list-style: none; padding: 0; margin: 10px 0;">
                <li style="margin: 8px 0;">✓ Check our <a href="https://kmerhosting.com/faq" style="color: #128C7E; text-decoration: none;">FAQ</a> for quick answers</li>
              </ul>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Best regards,<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available<br/>
                <a href="https://kmerhosting.com" style="color: #128C7E; text-decoration: none;">kmerhosting.com</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: white padding: 10px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p><strong>New Contact Request - ${departmentName} Department</strong></p>
              
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
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Department:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${departmentName}</td>
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
                <strong>Action Required:</strong> Please route this to the appropriate ${departmentName} team and respond to the customer as soon as possible. They are expecting a response within 24 hours.
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>Thank you for your interest in KmerHosting! We have received your sales inquiry and will respond soon.</p>
              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <strong>What's Next?</strong><br/>
                Our sales team will review your request and get back to you shortly with the best solutions tailored to your needs. You can expect a response within 24 hours.
              </p>
              <p style="margin: 20px 0; font-size: 14px;"><strong>Your Inquiry Details:</strong><br/>
                Subject: ${subject}<br/>
                Received: ${new Date().toLocaleString()}
              </p>
              <p style="margin-top: 20px;">In the meantime, you can:</p>
              <ul style="list-style: none; padding: 0; margin: 10px 0;">
                <li style="margin: 8px 0;">✓ Explore our <a href="https://kmerhosting.com/shared-hosting" style="color: #128C7E; text-decoration: none;">Hosting Plans</a></li>
                <li style="margin: 8px 0;">✓ Check our <a href="https://kmerhosting.com/faq" style="color: #128C7E; text-decoration: none;">FAQ</a> for quick answers</li>
                <li style="margin: 8px 0;">✓ Call us for urgent matters</li>
              </ul>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Best regards,<br/>
                <strong>KmerHosting Sales Team</strong><br/>
                24/7 Support Available<br/>
                <a href="https://kmerhosting.com" style="color: #128C7E; text-decoration: none;">kmerhosting.com</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>We have successfully received your payment proof! Thank you for submitting the required documentation.</p>
              
              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <strong>Order Details:</strong><br/>
                Plan: ${orderDetails.planName}<br/>
                Amount: XAF ${orderDetails.planPrice.toLocaleString()}<br/>
                Order ID: ${orderDetails.orderId}
              </p>

              <p style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
                <strong>What's Next?</strong><br/>
                Our payment verification team is reviewing your proof. You will receive a confirmation email within 24 hours. Your service will be activated immediately upon approval.
              </p>

              <p>You can track your order status in your <a href="https://kmerhosting.com/dashboard" style="color: #128C7E; text-decoration: none;">KmerHosting Dashboard</a>.</p>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Best regards,<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available<br/>
                <a href="https://kmerhosting.com" style="color: #128C7E; text-decoration: none;">kmerhosting.com</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p><strong>Payment Proof Submitted - Action Required</strong></p>
              
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold; width: 30%;">Customer Name:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">
                    <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Order ID:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${orderDetails.orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Plan:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${orderDetails.planName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Amount:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">XAF ${orderDetails.planPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Images Submitted:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${imageCount} image(s)</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Submission Time:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <p style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <strong>Payment Details:</strong><br/>
                ${description.replace(/\n/g, "<br/>")}
              </p>

              <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
                <strong>Action Required:</strong> Please verify the payment proof and approve or reject the order. The customer is waiting for confirmation to activate their services.
              </p>

              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                <strong>Quick Actions:</strong><br/>
                • <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">Contact Customer</a><br/>
                • <a href="https://d3.my-control-panel.com" style="color: #128C7E; text-decoration: none;">Control Panel</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <h2 style="color: #128C7E; margin-top: 0;">Verify Your Email</h2>
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>Thank you for signing up with KmerHosting! To complete your registration, please verify your email address by clicking the button below.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" style="background: #128C7E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Verify Email
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Or copy this link:<br/><code style="background: #e8e8e8; padding: 5px 10px; border-radius: 3px;">${verifyUrl}</code></p>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                This link expires in 24 hours. If you didn't request this email, you can safely ignore it.
              </p>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Best regards,<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <h2 style="color: #128C7E; margin-top: 0;">New User Registration</h2>
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
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Signup Time:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${signupTime}</td>
                </tr>
              </table>
              <p style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
                A new user has registered. Verification email has been sent to them.
              </p>
            </div>
          </div>
        </div>
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
    await transport.sendMail({
      from: emailConfig.noreply,
      to: userEmail,
      subject: "Welcome to KmerHosting!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <h2 style="color: #128C7E; margin-top: 0;">Welcome to KmerHosting!</h2>
              <p>Hello <strong>${username}</strong>,</p>
              <p>Your email has been verified and your account is now active. You can now access all KmerHosting services.</p>
              <div style="background: white; padding: 15px; border-left: 4px solid #128C7E; margin: 20px 0;">
                <p><strong>Your account details:</strong></p>
                <p>Username: <strong>${username}</strong><br/>Email: <strong>${userEmail}</strong></p>
              </div>
              <p>You can now:</p>
              <ul style="list-style: none; padding: 0; margin: 10px 0;">
                <li style="margin: 8px 0;">✓ Login to your <a href="https://kmerhosting.com/dashboard" style="color: #128C7E; text-decoration: none;">Dashboard</a></li>
                <li style="margin: 8px 0;">✓ Browse our <a href="https://kmerhosting.com/shared-hosting" style="color: #128C7E; text-decoration: none;">Hosting Plans</a></li>
                <li style="margin: 8px 0;">✓ Contact our <a href="https://kmerhosting.com#contact" style="color: #128C7E; text-decoration: none;">Support Team</a></li>
              </ul>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                If you have any questions, feel free to contact us.<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available<br/>
                <a href="https://kmerhosting.com" style="color: #128C7E; text-decoration: none;">kmerhosting.com</a>
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <h2 style="color: #128C7E; margin-top: 0;">Plan Selected Successfully</h2>
              <p>Hello <strong>${username}</strong>,</p>
              <p>Thank you for selecting a hosting plan with KmerHosting!</p>
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold; width: 40%;">Plan Name:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${planName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Price:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">XAF ${planPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Billing Cycle:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${billingCycle}</td>
                </tr>
              </table>
              <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
                <strong>Next Step:</strong> Please proceed to payment to activate your hosting service. Follow the payment instructions sent in your next email.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://kmerhosting.com/get-pay" style="background: #128C7E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Proceed to Payment
                </a>
              </div>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                If you need any assistance, contact our support team.<br/>
                <strong>KmerHosting Team</strong><br/>
                24/7 Support Available
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #128C7E 0%, #0a6f62 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <h2 style="color: #128C7E; margin-top: 0;">New Plan Selection</h2>
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold; width: 30%;">Username:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${username}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">
                    <a href="mailto:${userEmail}" style="color: #128C7E; text-decoration: none;">${userEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Plan Name:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${planName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Price:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">XAF ${planPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Billing Cycle:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${billingCycle}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd; font-weight: bold;">Selection Time:</td>
                  <td style="padding: 10px; background: white; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <p style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
                Customer is waiting for payment. Confirm once payment is received.
              </p>
            </div>
          </div>
        </div>
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

