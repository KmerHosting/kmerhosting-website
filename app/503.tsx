"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ServiceUnavailablePage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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
        {/* Error Display */}
        <div className="text-center mb-6">
          <h1 className="text-9xl font-bold text-slate-900 dark:text-white mb-2">
            503
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Service unavailable
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 text-center">
          Service Unavailable
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 text-center">
          Our service is temporarily unavailable. We're working to get back online as soon as possible.
        </p>

        {/* Action Buttons */}
        <Link
          href="/"
          className="w-full px-4 py-2 rounded-md font-medium text-white text-sm transition-colors block text-center mb-2"
          style={{ backgroundColor: "#128C7E" }}
        >
          Go Back Home
        </Link>

        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 rounded-md font-medium text-sm transition-colors block text-center border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          Try Again
        </button>
      </div>
    </main>
  )
}
