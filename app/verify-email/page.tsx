"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [stage, setStage] = useState<"verify" | "complete" | "success" | "error">("verify")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setStage("error")
      setError("Invalid or missing token")
    }
  }, [token])

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username.trim()) {
      setError("Username is required")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, username, password, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Verification failed")
        setLoading(false)
        return
      }

      setStage("success")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Complete Your Registration
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Set up your KmerHosting account
          </p>
        </div>

        {/* Stages */}
        {stage === "verify" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" style={{ color: "#128C7E" }} />
            <p className="text-slate-600 dark:text-slate-400">Verifying your email...</p>
          </div>
        )}

        {stage === "complete" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                disabled={loading}
                className="w-full py-2 rounded-lg font-medium text-white transition-all cursor-pointer"
                style={{ backgroundColor: loading ? "#999" : "#128C7E" }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                {loading ? "Creating account..." : "Complete Signup"}
              </button>
            </form>
          </div>
        )}

        {stage === "success" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#128C7E" }} />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Account Created!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your KmerHosting account is ready. You can now log in and start ordering hosting plans.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 rounded-lg font-medium text-white"
              style={{ backgroundColor: "#128C7E" }}
            >
              Go to Login
            </Link>
          </div>
        )}

        {stage === "error" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Error
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error || "Something went wrong. Please try signing up again."}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded-lg font-medium text-white"
              style={{ backgroundColor: "#128C7E" }}
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
