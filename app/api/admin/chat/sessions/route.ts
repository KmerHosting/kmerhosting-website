import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminId = await verifyAdminToken(request);
    if (!adminId) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "waiting,active";
    const departmentId = searchParams.get("departmentId");

    // Build filter conditions
    const statusList = status.split(",");
    const where: any = {
      status: {
        in: statusList,
      },
    };

    if (departmentId) {
      where.departmentId = departmentId;
    }

    // Get all active sessions with related data
    const sessions = await prisma.liveChatSession.findMany({
      where,
      include: {
        department: true,
        agent: true,
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Format response with message count
    const formattedSessions = await Promise.all(
      sessions.map(async (session) => {
        const messageCount = await prisma.liveChatMessage.count({
          where: { sessionId: session.id },
        });

        return {
          ...session,
          messageCount,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        total: formattedSessions.length,
        sessions: formattedSessions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
