"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, Loader2, Sun, Moon, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [lastValidationCheck, setLastValidationCheck] = useState<number>(0)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    // Validate token on page load
    if (!token) {
      setError("Invalid or missing reset token")
      setIsValidating(false)
      return
    }
    setIsTokenValid(true)
    setIsValidating(false)
  }, [token])

  // Monitor password changes and show validation toasts
  useEffect(() => {
    if (!password) return

    // Throttle to avoid too many toasts (debounce with 1.5s delay)
    const now = Date.now()
    if (now - lastValidationCheck < 1500) return
    setLastValidationCheck(now)

    const hasMinLength = password.length >= 6
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    const allValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial

    if (allValid) {
      toast.success(
        "✓ All requirements met!\n✓ At least 6 characters\n✓ One uppercase letter\n✓ One lowercase letter\n✓ One number\n✓ One special character",
        { duration: 3000, id: "password-validation" }
      )
    } else {
      const missing = []
      if (!hasMinLength) missing.push("6+ characters")
      if (!hasUppercase) missing.push("uppercase letter")
      if (!hasLowercase) missing.push("lowercase letter")
      if (!hasNumber) missing.push("number")
      if (!hasSpecial) missing.push("special character")
      
      toast.loading(
        `Missing: ${missing.join(", ")}`,
        { id: "password-validation" }
      )
    }
  }, [password, lastValidationCheck])

  // Monitor confirm password
  useEffect(() => {
    if (!password || !confirmPassword) return
    
    if (password === confirmPassword) {
      toast.success("Passwords match!", { id: "password-match", duration: 2000 })
    } else {
      toast.error("Passwords do not match", { id: "password-match" })
    }
  }, [confirmPassword, password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const hasMinLength = password.length >= 6
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError("Password does not meet all requirements")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to reset password")
      }

      setIsSuccess(true)
      toast.success("Password reset successfully!", { duration: 5000 })
      setTimeout(() => {
        window.location.href = "/login"
      }, 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      {/* Theme Toggle */}
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Container */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block mb-8 text-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
            alt="KmerHosting"
            className="h-16 mx-auto"
          />
        </Link>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          {isSuccess ? (
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Password Reset Successful!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Your password has been reset successfully. Redirecting to login...
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: "#128C7E" }}
              >
                Go to Login
              </Link>
            </div>
          ) : isValidating ? (
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-400">Validating reset link...</p>
            </div>
          ) : !isTokenValid ? (
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Invalid Reset Link
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block px-6 py-2 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: "#128C7E" }}
              >
                Request New Link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Reset Your Password
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Enter your new password below
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Must contain: 6+ chars, uppercase, lowercase, number, special character
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isLoading ? "#999" : "#128C7E",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Remembered your password?{" "}
                  <Link href="/login" className="font-medium hover:underline" style={{ color: "#128C7E" }}>
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordContent
