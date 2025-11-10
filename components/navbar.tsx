"use client"

import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch: only render theme-dependent UI after mount
  useEffect(() => setMounted(true), [])

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
              alt="KmerHosting"
              className="h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors">
              FAQ
            </Link>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>

            <a href="https://kmerhosting.com/customers/clientarea.php" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Client Area
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#pricing" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2">
              Pricing
            </Link>
            <Link href="/about" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2">
              About Us
            </Link>
            <Link href="/faq" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2">
              FAQ
            </Link>

            <div className="flex items-center gap-3">
              {/* Mobile theme toggle */}
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
              </button>

              <a href="https://kmerhosting.com/customers/clientarea.php" className="w-full px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-center">
                Client Area
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
