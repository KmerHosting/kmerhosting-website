"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertCircle, Loader2, Sun, Moon, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Request failed")
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Theme Toggle Button */}
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
      </button>

      {/* Logo */}
      <Link href="/" className="mb-8">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
          alt="KmerHosting"
          className="h-24"
        />
      </Link>

      <div className="w-full max-w-sm">
        {isSuccess ? (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#128C7E" }} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              If the email address you entered matches a KmerHosting account, you will receive a password reset link shortly.
            </p>
            <p className="text-slate-500 dark:text-slate-500 mb-6 text-xs">
              Please check your inbox and spam folder. The link will expire in 1 hour.
            </p>
            <Link
              href="/login"
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm inline-block"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Reset your password
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Enter your email address and we'll send you a link to reset your password
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {error && (
                <div className="p-2 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs flex gap-2">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded font-medium text-white transition-all text-sm cursor-pointer"
                style={{ backgroundColor: isLoading ? "#999" : "#128C7E" }}
                onMouseEnter={(e) =>
                  !isLoading && (e.currentTarget.style.backgroundColor = "#0a6f62")
                }
                onMouseLeave={(e) =>
                  !isLoading && (e.currentTarget.style.backgroundColor = "#128C7E")
                }
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="text-center text-slate-600 dark:text-slate-400 mt-4 text-sm">
              Remember your password?{" "}
              <Link href="/login" className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
