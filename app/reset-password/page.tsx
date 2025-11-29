"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, Loader2, Sun, Moon, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function ResetPasswordPage() {
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
      toast.success("✓ Passwords match!", { duration: 2000, id: "confirm-validation" })
    } else if (confirmPassword.length > 0) {
      toast.error("✗ Passwords do not match", { duration: 2000, id: "confirm-validation" })
    }
  }, [confirmPassword])

  // Validate password requirements
  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) {
      return { valid: false, message: "Password must be at least 6 characters" }
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one lowercase letter" }
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" }
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one number" }
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one special character" }
    }
    return { valid: true, message: "" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    // Validate password requirements
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Password reset failed")
        setIsLoading(false)
        return
      }

      toast.success("Password reset successfully!", { duration: 5000 })
      setIsSuccess(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Validating reset link...</p>
        </div>
      </main>
    )
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
        {!isTokenValid ? (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              The password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm inline-block"
            >
              Request new reset link
            </Link>
          </div>
        ) : isSuccess ? (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#128C7E" }} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Password Reset Successfully
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Your password has been reset. You can now log in with your new password.
            </p>
            <Link
              href="/login"
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm inline-block"
            >
              Go to login
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Reset your password
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Enter your new password below
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password (min. 6 characters)"
                    required
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
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
