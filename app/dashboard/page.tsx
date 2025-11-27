"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication server-side via API (httpOnly cookie)
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
          }
        }
      } catch (err) {
        console.error("Error checking auth:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Authentication Required
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You must be logged in to access the dashboard.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 rounded-lg font-medium text-white transition-all"
              style={{ backgroundColor: "#128C7E" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Dashboard
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Your KmerHosting Account!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Your hosting services and account details will appear here once your payment is verified.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                Active Orders
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your pending orders will be displayed here.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">
                Active Services
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200">
                Once payment is verified, your hosting service will appear here.
              </p>
            </div>
          </div>

          <Link
            href="/get-pay"
            className="inline-block mt-6 px-6 py-2 rounded-lg font-medium text-white transition-all"
            style={{ backgroundColor: "#128C7E" }}
          >
            Submit Payment Proof
          </Link>
        </div>
      </div>
    </main>
  )
}
