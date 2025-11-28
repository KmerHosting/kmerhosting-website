"use client"

import { useState, useEffect } from "react"
import { X, Loader2, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number; answer: number } | null>(null)

  // Generate random math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setCaptchaAnswer("")
  }

  // Initialize CAPTCHA when dialog opens
  useEffect(() => {
    if (isOpen) {
      generateCaptcha()
      setSelectedDept("")
      setFullName("")
      setEmail("")
      setMessage("")
      setCaptchaAnswer("")
      setIsSuccess(false)
      setError("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate fields
    if (!selectedDept) {
      setError("Please select a department")
      return
    }
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }
    if (!message.trim()) {
      setError("Please enter a message")
      return
    }
    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters")
      return
    }
    if (!captchaAnswer) {
      setError("Please answer the security question")
      return
    }
    if (parseInt(captchaAnswer) !== captcha?.answer) {
      setError("Incorrect answer to the security question. Please try again.")
      generateCaptcha()
      setCaptchaAnswer("")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departmentId: selectedDept,
          fullName: fullName.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })

      if (response.ok) {
        toast.success("Message sent successfully!", { duration: 5000 })
        setIsSuccess(true)
        setFullName("")
        setEmail("")
        setMessage("")
        setSelectedDept("")
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 5000)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-3xl w-full mx-4 pointer-events-auto overflow-hidden max-h-[85vh] overflow-y-auto"
        style={{
          maxWidth: "100%",
          width: "calc(100% - 32px)",
          boxSizing: "border-box"
        }}
      >
        <div className="p-4">
          {/* Header with Logo */}
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Contact Our Team
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Select a department and let us know how we can help
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0 cursor-pointer"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <CheckCircle2 className="w-6 h-6" style={{ color: "#128C7E" }} />
                </div>
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                Request Received!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Thank you for contacting <strong>{selectedDepartment?.name}</strong> team.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We'll respond to <strong>{email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Department Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-900 dark:text-white mb-2">
                  Select Department *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setSelectedDept(dept.id)}
                      className="p-2 rounded-md border-2 transition-all text-left hover:shadow-md cursor-pointer"
                      style={{
                        borderColor: selectedDept === dept.id ? "#128C7E" : "#e2e8f0",
                        backgroundColor:
                          selectedDept === dept.id
                            ? "rgba(18, 140, 126, 0.05)"
                            : "transparent",
                      }}
                    >
                      <div className="font-semibold text-sm text-slate-900 dark:text-white">
                        {dept.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {dept.description}
                      </div>
                    </button>
                  ))}
                </div>
                {!selectedDept && error.includes("Department") && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-slate-900 dark:text-white mb-1">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Your name"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all text-sm h-8"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-900 dark:text-white mb-1">
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
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all text-sm h-8"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-900 dark:text-white mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Tell us more about your inquiry..."
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 resize-none transition-all text-sm"
                />
              </div>

              {/* Math CAPTCHA */}
              {captcha && (
                <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-2 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                      Security: What is {captcha.num1} + {captcha.num2}?
                    </p>
                  </div>
                  <input
                    id="captcha"
                    type="number"
                    placeholder="Answer"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-1.5 rounded-md border border-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-blue-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all text-sm font-medium"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 cursor-pointer h-8 text-sm"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 h-8 text-sm"
                  style={{ backgroundColor: "#128C7E", color: "white" }}
                  disabled={isLoading || !selectedDept}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
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
