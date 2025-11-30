const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  try {
    // Create first service with cPanel
    const service1 = await prisma.service.create({
      data: {
        userId: "cmijn7cd50001whj40v094m1d",
        planType: "Shared",
        panelType: "cPanel",
        planName: "Shared Hosting Pro",
        planPrice: 4.99,
        planStatus: "active",
        features: JSON.stringify([
          "Unlimited Bandwidth",
          "Free SSL Certificate",
          "24/7 Support",
          "2 Websites",
          "50 GB SSD Storage",
          "Unlimited Email Accounts",
        ]),
        nextRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
    })

    // Create second service with DirectAdmin
    const service2 = await prisma.service.create({
      data: {
        userId: "cmijn7cd50001whj40v094m1d",
        planType: "Shared",
        panelType: "DirectAdmin",
        planName: "Shared Hosting Standard",
        planPrice: 3.99,
        planStatus: "active",
        features: JSON.stringify([
          "Unlimited Bandwidth",
          "Free SSL Certificate",
          "24/7 Support",
          "1 Website",
          "25 GB SSD Storage",
          "100 Email Accounts",
        ]),
        nextRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
    })

    // Add domains to service 1
    await prisma.serviceDomain.createMany({
      data: [
        {
          serviceId: service1.id,
          domainName: "mywebsite.cm",
          domainStatus: "active",
          purchasePrice: 12.99,
          renewalPrice: 12.99,
          ns1: "ns1.kmerhosting.com",
          ns2: "ns2.kmerhosting.com",
          nextRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
        {
          serviceId: service1.id,
          domainName: "mybusiness.cm",
          domainStatus: "active",
          purchasePrice: 12.99,
          renewalPrice: 12.99,
          ns1: "ns1.kmerhosting.com",
          ns2: "ns2.kmerhosting.com",
          nextRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
      ],
    })

    // Add domain to service 2
    await prisma.serviceDomain.create({
      data: {
        serviceId: service2.id,
        domainName: "testsite.cm",
        domainStatus: "active",
        purchasePrice: 12.99,
        renewalPrice: 12.99,
        ns1: "ns1.kmerhosting.com",
        ns2: "ns2.kmerhosting.com",
        nextRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
    })

    console.log("✅ Test data inserted successfully!")
    console.log("Service 1 (cPanel):", service1.id)
    console.log("Service 2 (DirectAdmin):", service2.id)
  } catch (error) {
    console.error("Error inserting test data:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
