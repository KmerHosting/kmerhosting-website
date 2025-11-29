import { sendContactConfirmation, notifyDepartmentContact } from "@/lib/mailer";

// Department mapping
const departments: Record<
  string,
  { name: string; email: string }
> = {
  sales: { name: "Sales", email: "sales@kmerhosting.com" },
  support: { name: "Support", email: "support@kmerhosting.com" },
  billing: { name: "Billing", email: "billing@kmerhosting.com" },
  info: { name: "General Inquiries", email: "support@kmerhosting.com" },
  security: { name: "Security", email: "security@kmerhosting.com" },
  migrations: { name: "Migrations", email: "migrations@kmerhosting.com" },
};

export async function POST(request: Request) {
  try {
    const { departmentId, fullName, email, message } = await request.json();

    // Validate inputs
    if (!departmentId || !fullName || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate department exists
    if (!departments[departmentId]) {
      return Response.json(
        { error: "Invalid department selected" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return Response.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    const dept = departments[departmentId];

    // Send confirmation email to user
    const userEmailResult = await sendContactConfirmation(
      email,
      fullName,
      dept.name
    );
    if (!userEmailResult.success) {
      throw new Error(
        userEmailResult.error || "Failed to send confirmation email"
      );
    }

    // Notify department about the contact request
    const deptNotificationResult = await notifyDepartmentContact(
      email,
      fullName,
      message,
      dept.email,
      dept.name
    );
    if (!deptNotificationResult.success) {
      console.error("Failed to notify department:", deptNotificationResult.error);
      // Don't fail the request if department notification fails
      // The user confirmation was sent successfully
    }

    return Response.json(
      {
        success: true,
        message: "Your message has been received and forwarded to the appropriate team.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact request error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to process contact request",
      },
      { status: 500 }
    );
  }
}
