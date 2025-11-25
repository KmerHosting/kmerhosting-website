import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CloseSessionRequest {
  notes?: string;
}

export async function PUT(
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

    const body: CloseSessionRequest = await request.json().catch(() => ({}));

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

    // Close the session
    const updatedSession = await prisma.liveChatSession.update({
      where: { id: sessionId },
      data: {
        status: "closed",
        notes: body.notes ? session.notes + "\n" + body.notes : session.notes,
        closedAt: new Date(),
      },
      include: {
        department: true,
        agent: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chat session closed successfully",
        session: updatedSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error closing session:", error);
    return NextResponse.json(
      { error: "Failed to close session" },
      { status: 500 }
    );
  }
}
