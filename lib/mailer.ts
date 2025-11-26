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
            <div style="background: white padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
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
            <div style="background: white padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
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
            <div style="background: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
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
      to: departmentEmail,
      cc: emailConfig.admin.address,
      subject: `New Contact Request - ${departmentName} Department`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Logo Header Bar -->
            <div style="background: white padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png" alt="KmerHosting" style="height: 40px; display: inline-block;" />
            </div>
            <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p><strong>New Contact Request for ${departmentName} Department</strong></p>
              
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
                <strong>Action Required:</strong> Please respond to this customer inquiry as soon as possible. They are expecting a response within 24 hours.
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

    console.log("Department notification sent to:", departmentEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending department notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}
