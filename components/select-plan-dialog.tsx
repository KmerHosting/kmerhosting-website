"use client"

import { useState, useEffect } from "react"
import { X, Loader2, CheckCircle2, Lock } from "lucide-react"

interface SelectPlanDialogProps {
  isOpen: boolean
  onClose: () => void
  planType: "shared" | "reseller"
  planName: string
  planPrice: number
}

export default function SelectPlanDialog({
  isOpen,
  onClose,
  planType,
  planName,
  planPrice,
}: SelectPlanDialogProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [domain, setDomain] = useState("")
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number; answer: number } | null>(null)

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setCaptchaAnswer("")
  }

  useEffect(() => {
    if (isOpen) {
      generateCaptcha()
      setFullName("")
      setEmail("")
      setDomain("")
      setCaptchaAnswer("")
      setError("")
      setIsSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    if (!domain.trim()) {
      setError("Please enter your desired domain name")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!captchaAnswer) {
      setError("Please answer the security question")
      return
    }

    if (parseInt(captchaAnswer) !== captcha?.answer) {
      setError("Incorrect answer. Please try again.")
      generateCaptcha()
      setCaptchaAnswer("")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/plans/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          planName,
          planPrice,
          fullName: fullName.trim(),
          email: email.trim(),
          domain: domain.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to submit order")
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full mx-4 pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Get Started with {planName}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Price: {planPrice.toLocaleString()} FCFA/year
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#128C7E" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Order Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                We'll contact you soon at {email}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                To speed up the process, create a KmerHosting account if you haven't already.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 h-9 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 h-9 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
              </div>

              {/* Domain */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Desired Domain Name *
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-3 py-2 h-9 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              {/* Security Question */}
              {captcha && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4" style={{ color: "#128C7E" }} />
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      Security Question *
                    </label>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    What is {captcha.num1} + {captcha.num2}?
                  </p>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Answer"
                    className="w-full px-3 py-2 h-9 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg font-medium text-white transition-all cursor-pointer text-sm"
                style={{
                  backgroundColor: isLoading ? "#999" : "#128C7E",
                }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Continue to Payment"
                )}
              </button>

              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                We recommend creating a KmerHosting account to speed up the process.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
