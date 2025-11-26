import { sendDemoRequestConfirmation, notifyAdminDemoRequest } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json();

    // Validate inputs
    if (!email || !fullName) {
      return Response.json(
        { error: "Email and full name are required" },
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

    // Send confirmation email to user
    const userEmailResult = await sendDemoRequestConfirmation(email, fullName);
    if (!userEmailResult.success) {
      throw new Error(userEmailResult.error || "Failed to send user confirmation email");
    }

    // Notify admin about the demo request
    const adminNotificationResult = await notifyAdminDemoRequest(email, fullName);
    if (!adminNotificationResult.success) {
      console.error("Failed to notify admin:", adminNotificationResult.error);
      // Log more details for debugging
      console.warn(`Admin notification failed for demo request from ${fullName} (${email})`);
      // Don't fail the request if admin notification fails
      // The user confirmation was sent successfully
    } else {
      console.log(`Admin notification sent successfully for demo request from ${fullName}`);
    }

    return Response.json(
      {
        success: true,
        message: "Demo request received. Check your email for confirmation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Demo request error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to process demo request",
      },
      { status: 500 }
    );
  }
}
