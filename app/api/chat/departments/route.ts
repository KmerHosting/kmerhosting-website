import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get all active departments
    const departments = await prisma.liveChatDepartment.findMany({
      where: {
        agents: {
          some: {
            isActive: true,
          },
        },
      },
      include: {
        agents: {
          where: { isActive: true },
        },
      },
    });

    // If no active departments, return all departments
    if (departments.length === 0) {
      const allDepartments = await prisma.liveChatDepartment.findMany({
        include: {
          agents: true,
        },
      });

      return NextResponse.json({
        success: true,
        departments: allDepartments,
      });
    }

    return NextResponse.json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
