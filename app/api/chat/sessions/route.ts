import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionId = params.id;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Check if session exists
    const session = await prisma.liveChatSession.findUnique({
      where: { id: sessionId },
      include: {
        department: true,
        agent: true,
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    // Get all messages for the session
    const messages = await prisma.liveChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        session: {
          id: session.id,
          visitorName: session.visitorName,
          visitorEmail: session.visitorEmail,
          department: session.department,
          agent: session.agent,
          status: session.status,
          subject: session.subject,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
        },
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
