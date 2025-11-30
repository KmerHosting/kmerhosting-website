"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Server, Globe, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ServiceDomain {
  id: string
  domainName: string
  domainStatus: string
  purchasePrice: number
  renewalPrice: number
  ns1: string
  ns2: string
  nextRenewalDate: string
  createdAt: string
}

interface Service {
  id: string
  planType: string
  panelType: string
  planName: string
  planPrice: number
  planStatus: string
  features: string
  nextRenewalDate: string
  associatedDomains: ServiceDomain[]
  createdAt: string
}

export default function SharedHostingPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [expandedService, setExpandedService] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  // Check authentication and load services
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            await loadServices()
          } else {
            router.push("/login")
          }
        } else {
          router.push("/login")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const loadServices = async () => {
    try {
      const res = await fetch("/api/customers/services?planType=Shared")
      if (res.ok) {
        const data = await res.json()
        setServices(data.services || [])
      } else {
        toast.error("Failed to load services")
      }
    } catch (err) {
      console.error("Error loading services:", err)
      toast.error("Failed to load services")
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await loadServices()
    setIsLoading(false)
    toast.success("Services refreshed")
  }

  // Calculate renewal progress percentage
  const calculateRenewalProgress = (createdAt: string, nextRenewalDate: string): number => {
    const created = new Date(createdAt).getTime()
    const renewal = new Date(nextRenewalDate).getTime()
    const now = Date.now()
    
    const total = renewal - created
    const elapsed = now - created
    const percentage = Math.min(Math.round((elapsed / total) * 100), 100)
    
    return percentage
  }

  // Calculate days remaining
  const calculateDaysRemaining = (nextRenewalDate: string): number => {
    const renewal = new Date(nextRenewalDate).getTime()
    const now = Date.now()
    const daysRemaining = Math.ceil((renewal - now) / (1000 * 60 * 60 * 24))
    
    return Math.max(daysRemaining, 0)
  }

  // Calculate domain renewal progress
  const calculateDomainRenewalProgress = (createdAt: string, nextRenewalDate: string): number => {
    return calculateRenewalProgress(createdAt, nextRenewalDate)
  }

  // Calculate domain days remaining
  const calculateDomainDaysRemaining = (nextRenewalDate: string): number => {
    return calculateDaysRemaining(nextRenewalDate)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-400"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/customers/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition disabled:opacity-50"
            title="Refresh services"
          >
            <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Shared Hosting Services</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Manage your shared hosting accounts and domains</p>

        {/* Services List */}
        {services.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <Server className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No shared hosting services found</p>
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {services.map((service) => {
              const renewalProgress = calculateRenewalProgress(service.createdAt, service.nextRenewalDate)
              const daysRemaining = calculateDaysRemaining(service.nextRenewalDate)
              const features = JSON.parse(service.features || "[]")

              return (
                <div
                  key={service.id}
                  className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  {/* Service Header */}
                  <button
                    onClick={() =>
                      setExpandedService(expandedService === service.id ? null : service.id)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                        <Server className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {service.planName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {service.panelType} • {service.associatedDomains.length} domain
                          {service.associatedDomains.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          ${service.planPrice}/mo
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            service.planStatus === "active"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {service.planStatus}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          expandedService === service.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedService === service.id && (
                    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <div className="px-6 py-6 space-y-6">
                        {/* Service Info Grid */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                              Created
                            </p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {new Date(service.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                              Renewal Date
                            </p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {new Date(service.nextRenewalDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                              Days Remaining
                            </p>
                            <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                              {daysRemaining} days
                            </p>
                          </div>
                        </div>

                        {/* Renewal Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">
                              Renewal Progress
                            </p>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">
                              {renewalProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${renewalProgress}%` }}
                            />
                          </div>
                        </div>

                        {/* Features */}
                        {features.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                              Included Features
                            </p>
                            <div className="grid md:grid-cols-2 gap-2">
                              {features.map((feature: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Associated Domains */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                            Associated Domains ({service.associatedDomains.length})
                          </h4>

                          {service.associatedDomains.length === 0 ? (
                            <p className="text-sm text-slate-600 dark:text-slate-400">No domains found</p>
                          ) : (
                            <div className="space-y-3">
                              {service.associatedDomains.map((domain) => {
                                const domainDaysRemaining = calculateDomainDaysRemaining(domain.nextRenewalDate)
                                const domainRenewalProgress = calculateDomainRenewalProgress(domain.createdAt, domain.nextRenewalDate)

                                return (
                                  <div
                                    key={domain.id}
                                    className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 p-4"
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                                          {domain.domainName}
                                        </span>
                                      </div>
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                                          domain.domainStatus === "active"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                            : domain.domainStatus === "pending"
                                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                        }`}
                                      >
                                        {domain.domainStatus}
                                      </span>
                                    </div>

                                    {/* Domain Dates & Renewal Info */}
                                    <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                                      <div>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs">Created</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                          {new Date(domain.createdAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs">Renews On</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                          {new Date(domain.nextRenewalDate).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs">Days Left</p>
                                        <p className="font-semibold text-teal-600 dark:text-teal-400">
                                          {domainDaysRemaining} days
                                        </p>
                                      </div>
                                    </div>

                                    {/* Renewal Progress Bar */}
                                    <div className="mb-4">
                                      <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                                          Renewal Progress
                                        </p>
                                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                          {domainRenewalProgress}%
                                        </span>
                                      </div>
                                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                                        <div
                                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all"
                                          style={{ width: `${domainRenewalProgress}%` }}
                                        />
                                      </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                      <div>
                                        <p className="text-slate-600 dark:text-slate-400">Purchase Price</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                          ${domain.purchasePrice.toFixed(2)}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-slate-600 dark:text-slate-400">Renewal Price</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                          ${domain.renewalPrice.toFixed(2)}/yr
                                        </p>
                                      </div>
                                    </div>

                                    {/* Nameservers */}
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-3 text-sm">
                                      <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                                        Nameservers
                                      </p>
                                      <div className="space-y-1 font-mono text-slate-900 dark:text-white">
                                        <p>NS1: {domain.ns1}</p>
                                        <p>NS2: {domain.ns2}</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* DNS Configuration Footer Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">DNS Configuration</p>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              To change your DNS settings (Nameservers), please contact our support team at{" "}
              <a href="mailto:support@kmerhosting.com" className="font-semibold hover:underline">
                support@kmerhosting.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
