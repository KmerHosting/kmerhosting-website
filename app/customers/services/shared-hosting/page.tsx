"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Copy, Check, AlertCircle, Package, Clock, CheckCircle, Lock, Phone, Sun, Moon } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import ContactDepartmentDialog from "@/components/contact-department-dialog"

interface Service {
  id: string
  planName: string
  price: number
  startDate: string
  expDate: string
  status: "Active" | "Pending" | "Suspended"
  suspendReason?: string
  features: string[]
  domainsAssociated: number
  domainsList: string[]
  hostingType: "cPanel" | "DirectAdmin"
  panelUrl: string
  username: string
  password: string
}

export default function SharedHostingPage() {
  const [showEmpty, setShowEmpty] = useState(true)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      planName: "Silver",
      price: 14000,
      startDate: "2024-01-15",
      expDate: "2025-01-15",
      status: "Suspended",
      suspendReason: "Payment overdue - Please contact billing to resolve this issue and reactivate your account.",
      features: ["Unlimited Bandwidth", "Free SSL Certificate", "24/7 Support", "2 Websites"],
      domainsAssociated: 2,
      domainsList: ["example.com", "example.net"],
      hostingType: "cPanel",
      panelUrl: "https://cp.kmerhosting.com:2083",
      username: "user_silver",
      password: "SecurePass123!",
    },
  ])
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!", { duration: 2000 })
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
      case "Pending":
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
      case "Suspended":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      case "Suspended":
        return <Lock className="w-4 h-4 text-red-600 dark:text-red-400" />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Shared Hosting</h1>
          </div>
          <div className="flex gap-2 items-center">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>
            <button
              onClick={() => setShowEmpty(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${showEmpty ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              Empty View
            </button>
            <button
              onClick={() => setShowEmpty(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${!showEmpty ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              With Services
            </button>
          </div>
        </div>

        {showEmpty ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Package className="w-12 h-12 text-slate-400 dark:text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Services Yet</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-8">
              You don't have any Shared Hosting plans yet. Get started with our affordable hosting solutions.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-md mb-8">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What is Shared Hosting?</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                Shared Hosting is perfect for beginners and small businesses. Your website is hosted on a shared server with other websites, making it affordable while still providing reliable performance, free SSL certificates, and 24/7 support.
              </p>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Starting from <span style={{ color: "#128C7E" }}>14,000 FCFA/year</span></p>
            </div>
            <Link
              href="/#pricing"
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              View Plans
            </Link>
          </div>
        ) : (
          // Services List
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`border-2 rounded-xl p-8 transition-all ${
                  service.status === "Suspended"
                    ? `${getStatusColor(service.status)} opacity-60`
                    : getStatusColor(service.status)
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{service.planName}</h2>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            service.status === "Active"
                              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                              : service.status === "Pending"
                              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                              : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                    </div>
                    {service.status === "Suspended" && service.suspendReason && (
                      <div className="flex items-start gap-2 mt-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3">Suspension Reason</p>
                          <p className="text-sm text-red-700 dark:text-red-300 mb-3">{service.suspendReason}</p>
                          <button
                            onClick={() => setContactDialogOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Contact Billing Support
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: "#128C7E" }}>
                      {service.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">FCFA/year</p>
                  </div>
                </div>

                {/* Main Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Hosting Type</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{service.hostingType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Start Date</p>
                      <p className="text-slate-900 dark:text-white">{new Date(service.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Expiration Date</p>
                      <p className="text-slate-900 dark:text-white">{new Date(service.expDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2">Domains Associated</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{service.domainsAssociated}</p>
                      <div className="space-y-2">
                        {service.domainsList.map((domain, idx) => (
                          <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#128C7E" }} />
                            {domain}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <p className="text-sm text-slate-600 dark:text-slate-400 uppercase font-semibold mb-3">Features Included</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: "#128C7E" }} />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel Access */}
                {service.status !== "Suspended" && (
                  <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white mb-4">Control Panel Access</p>

                    {/* Panel URL */}
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">Panel URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={service.panelUrl}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-mono"
                        />
                        <button
                          onClick={() => handleCopy(service.panelUrl, "url")}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {copiedField === "url" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    {/* Username */}
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">Username</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={service.username}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-mono"
                        />
                        <button
                          onClick={() => handleCopy(service.username, "username")}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {copiedField === "username" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">Password</label>
                      <div className="flex gap-2">
                        <input
                          type={showPassword === service.id ? "text" : "password"}
                          value={service.password}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-mono"
                        />
                        <button
                          onClick={() => setShowPassword(showPassword === service.id ? null : service.id)}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {showPassword === service.id ? <EyeOff className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                        </button>
                        <button
                          onClick={() => handleCopy(service.password, "password")}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {copiedField === "password" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    {/* Login Button */}
                    <a
                      href={service.panelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-block px-4 py-2 rounded-lg font-semibold text-white text-center transition-all cursor-pointer mt-4"
                      style={{ backgroundColor: "#128C7E" }}
                    >
                      Login to Control Panel
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ContactDepartmentDialog isOpen={contactDialogOpen} onClose={() => setContactDialogOpen(false)} />
    </main>
  )
}
