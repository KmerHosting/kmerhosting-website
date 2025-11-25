"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Process unsubscribe
    const handleUnsubscribe = async () => {
      if (!email) {
        setStatus("error")
        setMessage("No email address provided")
        return
      }

      try {
        // Call unsubscribe API
        const response = await fetch("/api/newsletter/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (!response.ok) {
          setStatus("error")
          setMessage(data.error || "Failed to unsubscribe")
          return
        }

        setStatus("success")
        setMessage(`You have been successfully unsubscribed from the KmerHosting newsletter.`)
      } catch (error) {
        setStatus("error")
        setMessage("Failed to process unsubscription. Please try again later.")
      }
    }

    handleUnsubscribe()
  }, [email])

  return (
    <div className="max-w-md w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex mb-6">
          <Image
            src="/logo-white1.png"
            alt="KmerHosting"
            width={160}
            height={50}
            className="h-auto"
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
        {status === "loading" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Processing Your Request
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Removing you from the newsletter...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Unsubscribed
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {message}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
              Email: <span className="font-mono text-xs">{email}</span>
            </p>
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                We're sorry to see you go. You can always resubscribe later.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2 rounded-lg font-semibold transition-all"
                style={{ backgroundColor: "#128C7E", color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                Return to Home
              </a>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Error
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {message}
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 rounded-lg font-semibold transition-all"
              style={{ backgroundColor: "#128C7E", color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a6f62")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
            >
              Back to Home
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
        <p>© 2025 KmerHosting. All rights reserved.</p>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-20">
      <Suspense
        fallback={
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex mb-6">
                <Image
                  src="/logo-white1.png"
                  alt="KmerHosting"
                  width={160}
                  height={50}
                  className="h-auto"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Loading
                </h1>
              </div>
            </div>
          </div>
        }
      >
        <UnsubscribeContent />
      </Suspense>
    </main>
  )
}

