"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated && data.user) {
            setIsAuthenticated(true)
            setEmail(data.user.email || "")
            setUsername(data.user.username || "")
            setUsernameInput(data.user.username || "")
          } else {
            router.push("/login")
          }
        } else {
          router.push("/login")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSaveUsername = async () => {
    if (!usernameInput.trim()) {
      toast.error("Username cannot be empty")
      return
    }

    if (usernameInput === username) {
      toast.info("No changes to save")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch("/api/auth/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput.trim() }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setUsername(usernameInput.trim())
        toast.success("Username updated successfully!")
      } else {
        toast.error(data.error || "Failed to update username")
        setUsernameInput(username)
      }
    } catch (err) {
      console.error("Update error:", err)
      toast.error("Failed to update username")
      setUsernameInput(username)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-400"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/customers/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition"
          >
            {mounted &&
              (resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              ))}
          </button>
        </div>

        {/* Profile Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Manage your account settings
            </p>
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-900 dark:text-white">{email}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Contact support to change your email</p>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter your username"
              disabled={isSaving}
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 disabled:opacity-50 transition"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveUsername}
            disabled={isSaving || usernameInput === username}
            className="w-full px-4 py-2 bg-teal-600 dark:bg-teal-600 hover:bg-teal-700 dark:hover:bg-teal-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Username"}
          </button>
        </div>
      </div>
    </main>
  )
}
