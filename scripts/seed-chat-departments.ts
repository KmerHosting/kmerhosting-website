import prisma from "@/lib/prisma";

async function seedChatDepartments() {
  try {
    console.log("Starting chat department seeding...");

    // Check if departments already exist
    const existingDepartments = await prisma.liveChatDepartment.findMany();

    if (existingDepartments.length > 0) {
      console.log(`Found ${existingDepartments.length} existing departments. Skipping seed.`);
      return;
    }

    // Create departments
    const departments = await Promise.all([
      prisma.liveChatDepartment.create({
        data: {
          name: "Sales",
          description: "Get help with selecting hosting plans and pricing",
          icon: "shopping-cart",
          color: "#3b82f6",
        },
      }),
      prisma.liveChatDepartment.create({
        data: {
          name: "Technical Support",
          description: "Get technical assistance and troubleshooting help",
          icon: "headset",
          color: "#ef4444",
        },
      }),
      prisma.liveChatDepartment.create({
        data: {
          name: "Billing",
          description: "Questions about invoices, payments, and subscriptions",
          icon: "credit-card",
          color: "#10b981",
        },
      }),
      prisma.liveChatDepartment.create({
        data: {
          name: "Account Management",
          description: "Help with account settings and management",
          icon: "user-circle",
          color: "#f59e0b",
        },
      }),
    ]);

    console.log(`✅ Created ${departments.length} departments`);

    // Create sample agents for each department
    const agents = await Promise.all([
      prisma.liveChatAgent.create({
        data: {
          departmentId: departments[0].id,
          name: "Sales Team",
          email: "sales@kmerhosting.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sales",
          status: "online",
          isActive: true,
        },
      }),
      prisma.liveChatAgent.create({
        data: {
          departmentId: departments[1].id,
          name: "Tech Support Team",
          email: "support@kmerhosting.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=support",
          status: "online",
          isActive: true,
        },
      }),
      prisma.liveChatAgent.create({
        data: {
          departmentId: departments[2].id,
          name: "Billing Team",
          email: "billing@kmerhosting.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=billing",
          status: "online",
          isActive: true,
        },
      }),
      prisma.liveChatAgent.create({
        data: {
          departmentId: departments[3].id,
          name: "Account Manager",
          email: "accounts@kmerhosting.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=accounts",
          status: "online",
          isActive: true,
        },
      }),
    ]);

    console.log(`✅ Created ${agents.length} agents`);
    console.log("✅ Chat department seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding chat departments:", error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedChatDepartments()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default seedChatDepartments;
