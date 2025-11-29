"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [username, setUsername] = useState("toscani_tenekeu")
  const [usernameInput, setUsernameInput] = useState("toscani_tenekeu")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleUsernameChange = (newUsername: string) => {
    setUsernameInput(newUsername)
    setHasChanges(newUsername !== username)
  }

  const handleSaveChanges = () => {
    if (!usernameInput.trim()) {
      toast.error("Username cannot be empty", { duration: 2000 })
      return
    }

    setUsername(usernameInput)
    setHasChanges(false)
    toast.success("Username updated successfully!", { duration: 2000 })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Profile</h1>
          </div>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 space-y-6">
          {/* Username Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase mb-3">
              <User className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field (Read-only) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase mb-3">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <div className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-between">
              <span>toscani@kmerhosting.com</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">To change your email, please contact support</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#128C7E" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  )
}
