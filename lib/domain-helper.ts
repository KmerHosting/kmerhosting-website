import { prisma as prismaClient } from "@/lib/prisma"

const prisma = prismaClient as any

/**
 * Calculates domain renewal date (createdAt + 365 days)
 */
export function calculateDomainRenewalDate(createdAt?: Date): Date {
  const baseDate = createdAt || new Date()
  const renewalDate = new Date(baseDate)
  renewalDate.setDate(renewalDate.getDate() + 365)
  return renewalDate
}

/**
 * Creates a new ServiceDomain with automatic nextRenewalDate calculation
 */
export async function createServiceDomain(data: {
  serviceId: string
  domainName: string
  purchasePrice: number
  renewalPrice: number
  domainStatus?: string
  ns1?: string
  ns2?: string
  createdAt?: Date
}) {
  const createdAt = data.createdAt || new Date()
  const nextRenewalDate = calculateDomainRenewalDate(createdAt)

  return prisma.serviceDomain.create({
    data: {
      serviceId: data.serviceId,
      domainName: data.domainName,
      purchasePrice: data.purchasePrice,
      renewalPrice: data.renewalPrice,
      domainStatus: data.domainStatus || "active",
      ns1: data.ns1 || "ns1.kmerhosting.com",
      ns2: data.ns2 || "ns2.kmerhosting.com",
      nextRenewalDate: nextRenewalDate,
      createdAt: createdAt,
    },
  })
}

/**
 * Updates domain renewal date (adds 365 days from current date or custom days)
 */
export async function renewDomain(domainId: string, daysToAdd: number = 365) {
  const renewalDate = new Date()
  renewalDate.setDate(renewalDate.getDate() + daysToAdd)

  return prisma.serviceDomain.update({
    where: { id: domainId },
    data: { nextRenewalDate: renewalDate },
  })
}

/**
 * Batch create multiple domains for a service
 */
export async function createServiceDomains(
  domainsData: Array<{
    serviceId: string
    domainName: string
    purchasePrice: number
    renewalPrice: number
    domainStatus?: string
    ns1?: string
    ns2?: string
    createdAt?: Date
  }>
) {
  const domains = domainsData.map((data) => {
    const createdAt = data.createdAt || new Date()
    const nextRenewalDate = calculateDomainRenewalDate(createdAt)

    return {
      serviceId: data.serviceId,
      domainName: data.domainName,
      purchasePrice: data.purchasePrice,
      renewalPrice: data.renewalPrice,
      domainStatus: data.domainStatus || "active",
      ns1: data.ns1 || "ns1.kmerhosting.com",
      ns2: data.ns2 || "ns2.kmerhosting.com",
      nextRenewalDate: nextRenewalDate,
      createdAt: createdAt,
    }
  })

  return prisma.serviceDomain.createMany({
    data: domains,
  })
}

/**
 * Calculate days remaining for domain renewal
 */
export function calculateDomainDaysRemaining(renewalDate: Date | string): number {
  const renewal = new Date(renewalDate)
  const today = new Date()
  const diffTime = renewal.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Calculate renewal progress percentage for domain
 */
export function calculateDomainRenewalProgress(
  createdAt: Date | string,
  renewalDate: Date | string
): number {
  const created = new Date(createdAt)
  const renewal = new Date(renewalDate)
  const today = new Date()

  const totalTime = renewal.getTime() - created.getTime()
  const elapsedTime = today.getTime() - created.getTime()

  if (totalTime <= 0) return 0
  const progress = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100))
  return Math.round(progress)
}
