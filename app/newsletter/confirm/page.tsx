"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle2, AlertCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

function NewsletterConfirmContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(10)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid or missing confirmation link")
      return
    }

    // Confirm newsletter subscription
    const confirmSubscription = async () => {
      try {
        const response = await fetch("/api/newsletter/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Email confirmed successfully!")
          
          // Auto redirect after 10 seconds
          const timer = setInterval(() => {
            setAutoRedirectCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer)
                window.location.href = "/"
                return 0
              }
              return prev - 1
            })
          }, 1000)
          
          return () => clearInterval(timer)
        } else {
          setStatus("error")
          setMessage(data.error || "Failed to confirm subscription")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An error occurred. Please try again.")
      }
    }

    confirmSubscription()
  }, [token])

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
        {status === "loading" && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Confirming your subscription...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#128C7E" }} />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Request Processed
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
              Your email verification has been completed. Your account details have been recorded in our system. You may receive communications at this email address.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <span className="font-semibold">Important:</span> If you did not subscribe to this newsletter or believe this is an error, please contact our support team. We respect your privacy and will handle your request promptly.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs mb-4">
              Redirecting to home in {autoRedirectCountdown} seconds...
            </p>
            <Link
              href="/"
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm inline-block"
            >
              or click here to return now
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600 dark:text-red-400" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Confirmation Failed
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              {message}
            </p>
            <div className="space-y-3">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Please try subscribing again from the newsletter form.
              </p>
              <Link
                href="/"
                className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm inline-block"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function NewsletterConfirmPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    }>
      <NewsletterConfirmContent />
    </Suspense>
  )
}
