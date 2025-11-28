"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Copy, Check, Sun, Moon } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [stage, setStage] = useState<"verify" | "complete" | "success" | "error">("verify")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [lastValidationCheck, setLastValidationCheck] = useState<number>(0)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!token) {
      setStage("error")
      setError("Invalid or missing token")
    } else {
      // Verify the token on initial load
      verifyTokenInitially(token)
    }
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
      toast.success("✓ Passwords match!", { duration: 2000 })
    } else if (confirmPassword.length > 0) {
      toast.error("✗ Passwords do not match", { duration: 2000 })
    }
  }, [confirmPassword])

  const verifyTokenInitially = async (verificationToken: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token: verificationToken, 
          username: "", 
          password: "", 
          confirmPassword: "" 
        }),
      })

      const data = await response.json()

      if (response.ok && data.readyToComplete) {
        // Token is valid, proceed to form to enter username and password
        setStage("complete")
      } else {
        // Token is invalid or expired
        setStage("error")
        setError(data.error || "Token verification failed")
      }
    } catch (err) {
      setStage("error")
      setError("An error occurred. Please try again.")
    }
  }

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Username is required")
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

    // Get user email from token verification or set a default
    setUserEmail(username + "@kmerhosting.com") // Placeholder - will be set from token data
    setAcceptTerms(false)
    setShowConfirmModal(true)
  }

  const handleConfirmSignup = async () => {
    if (!acceptTerms) {
      toast.error("You must accept the terms to continue", { duration: 3000 })
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          username, 
          password, 
          confirmPassword,
          subscribeNewsletter
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Verification failed")
        setLoading(false)
        setShowConfirmModal(false)
        return
      }

      // Subscribe to newsletter if opted in
      if (subscribeNewsletter && data.email) {
        try {
          await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
          })
        } catch (err) {
          console.error("Newsletter subscription error:", err)
        }
      }

      toast.success("Account created successfully!", { duration: 5000 })
      setShowConfirmModal(false)
      setStage("success")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
      setShowConfirmModal(false)
    }
  }

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

  // Check if password meets requirements in real-time
  const getPasswordStrength = () => {
    if (!password) return { level: 0, color: "", text: "" }
    const validation = validatePassword(password)
    if (validation.valid) {
      return { level: 3, color: "text-green-600", text: "Strong" }
    }
    return { level: 1, color: "text-red-600", text: "Weak" }
  }

  // Generate sample password
  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    // Ensure we have exactly 1 of each required character type
    const chars = [
      uppercase[Math.floor(Math.random() * uppercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      special[Math.floor(Math.random() * special.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)]
    ]
    
    // Shuffle the array
    const shuffled = chars.sort(() => Math.random() - 0.5)
    const newPassword = shuffled.join("")
    setPassword(newPassword)
    setConfirmPassword(newPassword)
  }

  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopiedPassword(true)
    setTimeout(() => setCopiedPassword(false), 2000)
    toast.success("Password copied!", { duration: 2000 })
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
        {stage === "verify" && (
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#128c7e] border-r-[#128c7e] animate-spin"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Verifying your email...</p>
          </div>
        )}

        {stage === "complete" && (
          <>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Complete Your Registration
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Set up your KmerHosting account
            </p>

            <form onSubmit={handleCompleteSignup} className="space-y-3">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password - Min 6 chars, 1 uppercase, 1 lowercase, 1 special character</label>
                <div className="flex items-center justify-end mb-2">
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    Generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars, 1 upper, 1 lower, 1 special, 1 num"
                    required
                    className="w-full px-3 py-2 pr-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full px-3 py-2 pr-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
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
                disabled={loading || !validatePassword(password).valid || password !== confirmPassword}
                className="w-full py-2 rounded font-medium text-white transition-all text-sm cursor-pointer"
                style={{ backgroundColor: (loading || !validatePassword(password).valid || password !== confirmPassword) ? "#999" : "#128C7E" }}
                onMouseEnter={(e) => !(loading || !validatePassword(password).valid || password !== confirmPassword) && (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => !(loading || !validatePassword(password).valid || password !== confirmPassword) && (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Complete Signup"
                )}
              </button>
            </form>
          </>
        )}

        {stage === "success" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#128C7E" }} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Account Created!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Your KmerHosting account is ready. You can now log in and start ordering hosting plans.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 rounded font-medium text-white text-sm"
              style={{ backgroundColor: "#128C7E" }}
            >
              Go to Login
            </Link>
          </div>
        )}

        {stage === "error" && (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Error
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              {error || "Something went wrong. Please try signing up again."}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded font-medium text-white text-sm"
              style={{ backgroundColor: "#128C7E" }}
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Confirm Account Creation
            </h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {/* Terms of Service */}
              <div className="border border-slate-300 dark:border-slate-700 rounded p-3 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Terms of Service
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">
                  By creating an account, you agree to our Terms of Service which outline your rights and responsibilities as a customer.
                </p>
                <Link href="/legal/terms-of-service" target="_blank" className="text-teal-600 dark:text-teal-400 hover:underline text-xs font-medium">
                  Read Terms of Service →
                </Link>
              </div>

              {/* Privacy Policy */}
              <div className="border border-slate-300 dark:border-slate-700 rounded p-3 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Privacy Policy
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">
                  We protect your data and respect your privacy. Read our privacy policy to understand how we collect and use your information.
                </p>
                <Link href="/legal/privacy-policy" target="_blank" className="text-teal-600 dark:text-teal-400 hover:underline text-xs font-medium">
                  Read Privacy Policy →
                </Link>
              </div>

              {/* Refund Policy */}
              <div className="border border-slate-300 dark:border-slate-700 rounded p-3 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Refund Policy
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">
                  We offer a 30-day money-back guarantee on all hosting plans. Read our refund policy for more details.
                </p>
                <Link href="/legal/refund-policy" target="_blank" className="text-teal-600 dark:text-teal-400 hover:underline text-xs font-medium">
                  Read Refund Policy →
                </Link>
              </div>
            </div>

            {/* Acceptance Checkbox */}
            <div className="mb-6 border-t border-slate-300 dark:border-slate-700 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-teal-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  I have read and accept the Terms of Service, Privacy Policy, and Refund Policy
                </span>
              </label>
            </div>

            {/* Newsletter Subscription */}
            <div className="mb-6 pb-4 border-b border-slate-300 dark:border-slate-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-teal-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Subscribe to our newsletter for updates and offers
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignup}
                disabled={!acceptTerms || loading}
                className="flex-1 px-4 py-2 rounded font-medium text-white transition-all text-sm"
                style={{ 
                  backgroundColor: (!acceptTerms || loading) ? "#999" : "#128C7E"
                }}
                onMouseEnter={(e) => !acceptTerms && !loading && (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => !acceptTerms && !loading && (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <Link href="/" className="mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
            alt="KmerHosting"
            className="h-8"
          />
        </Link>
        <div className="w-full max-w-sm">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#128c7e] border-r-[#128c7e] animate-spin"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
