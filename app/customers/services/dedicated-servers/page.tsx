"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Eye, EyeOff, Check, Server, AlertCircle, Sun, Moon, Cpu, Phone } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import ContactDepartmentDialog from "@/components/contact-department-dialog"

interface DedicatedService {
  id: string
  name: string
  price: string
  status: "Active" | "Pending" | "Suspended"
  suspendReason?: string
  startDate: string
  expiryDate: string
  cpu: string
  ram: string
  storage: string
  bandwidth: string
  os: string
  ipAddresses: string
  panelUrl: string
  username: string
  password: string
}

export default function DedicatedServersPage() {
  const [showServices, setShowServices] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const dedicatedServices: DedicatedService[] = [
    {
      id: "1",
      name: "Enterprise Server",
      price: "99,000",
      status: "Active",
      startDate: "Feb 20, 2024",
      expiryDate: "Feb 20, 2025",
      cpu: "16 vCPU (E5-2680)",
      ram: "64 GB DDR4",
      storage: "2 TB SSD RAID 1",
      bandwidth: "1 Gbps Unlimited",
      os: "CentOS 7",
      ipAddresses: "5 IPs",
      panelUrl: "https://dedicated.kmerhosting.com:2087",
      username: "dedicated_root",
      password: "DedicatedPass789!",
    },
  ]

  useEffect(() => setMounted(true), [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!", { duration: 2000 })
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const togglePasswordVisibility = (id: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Dedicated Servers</h1>
            <button
              onClick={() => setShowServices(!showServices)}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: "#128C7E" }}
            >
              {showServices ? "Empty View" : "View Services"}
            </button>
          </div>
        </div>

        {/* Empty State */}
        {!showServices && (
          <div className="text-center py-16">
            <div className="mb-4 flex justify-center">
              <Cpu className="w-16 h-16 text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Dedicated Server Services</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Get enterprise-grade hosting with dedicated resources</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#128C7E" }}
              >
                Contact Sales
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                View Features
              </button>
            </div>
          </div>
        )}

        {/* Services View */}
        {showServices && (
          <div className="space-y-6">
            {dedicatedServices.map((service) => (
              <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Service Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            service.status === "Active"
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                              : service.status === "Pending"
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                      {service.suspendReason && (
                        <div className="flex items-start gap-2 mt-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">Suspension Reason</p>
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
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{service.price} FCFA</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">/month</p>
                    </div>
                  </div>
                </div>

                {/* Service Info Grid */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Period</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Started: <span className="text-slate-600 dark:text-slate-400">{service.startDate}</span></p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Expires: <span className="text-slate-600 dark:text-slate-400">{service.expiryDate}</span></p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">Hardware Specs</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">CPU:</span> <span className="font-medium text-slate-900 dark:text-white">{service.cpu}</span></li>
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">RAM:</span> <span className="font-medium text-slate-900 dark:text-white">{service.ram}</span></li>
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Storage:</span> <span className="font-medium text-slate-900 dark:text-white">{service.storage}</span></li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">Network & OS</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Bandwidth:</span> <span className="font-medium text-slate-900 dark:text-white">{service.bandwidth}</span></li>
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">OS:</span> <span className="font-medium text-slate-900 dark:text-white">{service.os}</span></li>
                        <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">IPs:</span> <span className="font-medium text-slate-900 dark:text-white">{service.ipAddresses}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Control Panel Access */}
                <div className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Server Management Access</h4>

                  <div className="space-y-4">
                    {/* Panel URL */}
                    <div>
                      <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Management Panel URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={service.panelUrl}
                          readOnly
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg"
                        />
                        <button
                          onClick={() => copyToClipboard(service.panelUrl, `url-${service.id}`)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                        >
                          {copiedField === `url-${service.id}` ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Username */}
                    <div>
                      <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Username</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={service.username}
                          readOnly
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg"
                        />
                        <button
                          onClick={() => copyToClipboard(service.username, `username-${service.id}`)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                        >
                          {copiedField === `username-${service.id}` ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Password</label>
                      <div className="flex gap-2">
                        <input
                          type={showPassword[`${service.id}`] ? "text" : "password"}
                          value={service.password}
                          readOnly
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg"
                        />
                        <button
                          onClick={() => togglePasswordVisibility(service.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                        >
                          {showPassword[`${service.id}`] ? (
                            <EyeOff className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(service.password, `password-${service.id}`)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                        >
                          {copiedField === `password-${service.id}` ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Login Button */}
                    <button
                      onClick={() => window.open(service.panelUrl, "_blank")}
                      className="w-full mt-4 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                      style={{ backgroundColor: "#128C7E" }}
                      disabled={service.status !== "Active"}
                    >
                      Access Management Panel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ContactDepartmentDialog isOpen={contactDialogOpen} onClose={() => setContactDialogOpen(false)} />
    </main>
  )
}
