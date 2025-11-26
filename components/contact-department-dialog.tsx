"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactDepartmentDialogProps {
  isOpen: boolean
  onClose: () => void
}

const departments = [
  {
    id: "sales",
    name: "Sales",
    email: "sales@kmerhosting.com",
    description: "For hosting plans and pricing inquiries",
  },
  {
    id: "support",
    name: "Support",
    email: "support@kmerhosting.com",
    description: "For technical support and issues",
  },
  {
    id: "billing",
    name: "Billing",
    email: "billing@kmerhosting.com",
    description: "For billing and payment inquiries",
  },
  {
    id: "info",
    name: "General Inquiries",
    email: "hello@kmerhosting.com",
    description: "For general questions about KmerHosting",
  },
  {
    id: "security",
    name: "Security",
    email: "security@kmerhosting.com",
    description: "For security concerns and reports",
  },
  {
    id: "migrations",
    name: "Migrations",
    email: "migrations@kmerhosting.com",
    description: "For website migration assistance",
  },
]

export default function ContactDepartmentDialog({ isOpen, onClose }: ContactDepartmentDialogProps) {
  const [selectedDept, setSelectedDept] = useState<string>("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departmentId: selectedDept,
          fullName,
          email,
          message,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFullName("")
        setEmail("")
        setMessage("")
        setSelectedDept("")
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 3000)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to submit contact form. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.error("Contact form error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedDepartment = departments.find((d) => d.id === selectedDept)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full mx-4 pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with Logo */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
                alt="KmerHosting"
                className="h-8"
              />
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Contact Our Team
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Reach out to the right department for your needs
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#128C7E" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Request Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Thank you for contacting <strong>{selectedDepartment?.name}</strong> team.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We're processing your request and will get back to you at <strong>{email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
                  Select Department *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setSelectedDept(dept.id)}
                      className="p-4 rounded-lg border-2 transition-all text-left hover:shadow-md"
                      style={{
                        borderColor: selectedDept === dept.id ? "#128C7E" : "#e2e8f0",
                        backgroundColor:
                          selectedDept === dept.id
                            ? "rgba(18, 140, 126, 0.05)"
                            : "transparent",
                      }}
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {dept.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {dept.description}
                      </div>
                    </button>
                  ))}
                </div>
                {!selectedDept && error.includes("Department") && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 resize-none transition-all"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Info Message */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Your message will be sent to the selected department. We typically respond within 24 hours during business hours.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#128C7E", color: "white" }}
                  disabled={isLoading || !selectedDept}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
