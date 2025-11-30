import { prisma as prismaClient } from "@/lib/prisma"

const prisma = prismaClient as any

/**
 * Calculates renewal date (now + 365 days)
 */
export function calculateNextRenewalDate(): Date {
  const renewalDate = new Date()
  renewalDate.setDate(renewalDate.getDate() + 365)
  return renewalDate
}

/**
 * Creates a new Service with automatic nextRenewalDate calculation
 */
export async function createService(data: {
  userId: string
  planType: string
  panelType: string
  planName: string
  planPrice: number
  features?: string | Record<string, any>[]
  planStatus?: string
}) {
  // Normalize features if it's an object array
  const features = typeof data.features === "string" 
    ? data.features 
    : JSON.stringify(data.features || [])

  return prisma.service.create({
    data: {
      userId: data.userId,
      planType: data.planType,
      panelType: data.panelType,
      planName: data.planName,
      planPrice: data.planPrice,
      features: features,
      planStatus: data.planStatus || "active",
      nextRenewalDate: calculateNextRenewalDate(), // Sets to now + 365 days
    },
  })
}

/**
 * Updates Service renewal date (adds 365 days from current date or custom days)
 */
export async function renewService(serviceId: string, daysToAdd: number = 365) {
  const renewalDate = new Date()
  renewalDate.setDate(renewalDate.getDate() + daysToAdd)

  return prisma.service.update({
    where: { id: serviceId },
    data: { nextRenewalDate: renewalDate },
  })
}

/**
 * Batch create multiple services
 */
export async function createServices(
  servicesData: Array<{
    userId: string
    planType: string
    panelType: string
    planName: string
    planPrice: number
    features?: string | Record<string, any>[]
    planStatus?: string
  }>
) {
  const services = servicesData.map((data) => ({
    userId: data.userId,
    planType: data.planType,
    panelType: data.panelType,
    planName: data.planName,
    planPrice: data.planPrice,
    features: typeof data.features === "string" 
      ? data.features 
      : JSON.stringify(data.features || []),
    planStatus: data.planStatus || "active",
    nextRenewalDate: calculateNextRenewalDate(),
  }))

  return prisma.service.createMany({
    data: services,
  })
}
