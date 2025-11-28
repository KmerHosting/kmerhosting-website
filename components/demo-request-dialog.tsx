"use client"

import { useState, useEffect } from "react"
import { X, Loader2, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DemoRequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoRequestDialog({ isOpen, onClose }: DemoRequestDialogProps) {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
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
      setEmail("")
      setFullName("")
      setCaptchaAnswer("")
      setIsSuccess(false)
      setError("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate fields
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!email.trim()) {
      setError("Please enter your email address")
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
      const response = await fetch("/api/demo/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          fullName: fullName.trim(),
        }),
      })

      if (response.ok) {
        toast.success("Demo request submitted successfully!", { duration: 5000 })
        setIsSuccess(true)
        setEmail("")
        setFullName("")
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 5000)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to submit demo request. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.error("Demo request error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-md w-full mx-4 pointer-events-auto overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Try for Free
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Get instant demo access to KmerHosting
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
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
                Request Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We'll send your demo credentials to <strong>{email}</strong> within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Full Name
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
                  Email Address
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

              {/* Math CAPTCHA */}
              {captcha && (
                <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                      Security Question: What is {captcha.num1} + {captcha.num2}?
                    </p>
                  </div>
                  <input
                    id="captcha"
                    type="number"
                    placeholder="Your answer"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-1.5 rounded-md border border-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-blue-500 dark:placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all text-sm font-medium"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get Demo Access"
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
