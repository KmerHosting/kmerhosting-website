import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendLiveChatNotification } from "@/lib/mailer";

interface ChatSessionRequest {
  visitorEmail: string;
  visitorName: string;
  visitorPhone?: string;
  departmentId: string;
  subject?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatSessionRequest = await request.json();

    const {
      visitorEmail,
      visitorName,
      visitorPhone,
      departmentId,
      subject,
    } = body;

    // Validate required fields
    if (!visitorEmail || !visitorName || !departmentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(visitorEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if department exists
    const department = await prisma.liveChatDepartment.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    // Create a new chat session
    const session = await prisma.liveChatSession.create({
      data: {
        visitorEmail,
        visitorName,
        visitorPhone: visitorPhone || null,
        departmentId,
        subject: subject || "General Inquiry",
        status: "waiting",
      },
      include: {
        department: true,
      },
    });

    // Send admin notification email
    try {
      await sendLiveChatNotification(
        visitorEmail,
        visitorName,
        department.name,
        subject
      );
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Don't fail the request if email fails
    }

    // Add welcome message
    await prisma.liveChatMessage.create({
      data: {
        sessionId: session.id,
        senderType: "agent",
        senderName: department.name,
        message: `Welcome to ${department.name} support! Please wait while we connect you with an available team member.`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        message: "Chat session started successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}
