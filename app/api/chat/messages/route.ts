import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ChatMessageRequest {
  sessionId: string;
  message: string;
  senderType: "visitor" | "agent";
  senderName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatMessageRequest = await request.json();

    const { sessionId, message, senderType, senderName } = body;

    // Validate required fields
    if (!sessionId || !message || !senderType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate message isn't empty or too long
    if (message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 1 and 5000 characters" },
        { status: 400 }
      );
    }

    // Check if session exists
    const session = await prisma.liveChatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    // Don't allow messages in closed sessions
    if (session.status === "closed") {
      return NextResponse.json(
        { error: "Chat session is closed" },
        { status: 400 }
      );
    }

    // Create message
    const chatMessage = await prisma.liveChatMessage.create({
      data: {
        sessionId,
        message: message.trim(),
        senderType,
        senderName: senderName || (senderType === "visitor" ? session.visitorName : "Agent"),
        agentId: senderType === "agent" ? undefined : null,
      },
    });

    // Update session status to active if it was waiting and this is an agent message
    if (session.status === "waiting" && senderType === "agent") {
      await prisma.liveChatSession.update({
        where: { id: sessionId },
        data: { status: "active", agentId: undefined },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: chatMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
