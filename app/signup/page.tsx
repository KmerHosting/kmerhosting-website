"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Join KmerHosting today
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Check Your Email
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                We've sent a verification link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Click the link in the email to complete your registration.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
                className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
              >
                Back to signup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg font-medium text-white transition-all cursor-pointer"
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
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Verification Email"
                )}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
