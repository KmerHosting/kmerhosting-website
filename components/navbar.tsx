"use client"

import Link from "next/link"
import { Menu, X, Sun, Moon, Zap, User, LogOut, LayoutDashboard } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ContactDepartmentDialog from "./contact-department-dialog"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [userInfo, setUserInfo] = useState<{ username?: string; email?: string } | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Avoid hydration mismatch: only render theme-dependent UI after mount
  useEffect(() => setMounted(true), [])

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated && data.user) {
            setIsAuthenticated(true)
            setUserInfo(data.user)
          }
        }
      } catch (err) {
        console.error("Auth check error:", err)
      } finally {
        setIsLoadingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        toast.success("Logged out successfully!", { duration: 5000 })
        setIsAuthenticated(false)
        setUserInfo(null)
        setShowUserMenu(false)
        setTimeout(() => {
          router.push("/")
        }, 500)
      }
    } catch (err) {
      console.error("Logout error:", err)
      toast.error("Logout failed", { duration: 5000 })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
              alt="KmerHosting"
              className="h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              Pricing
            </Link>
            <Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              About Us
            </Link>
            <Link href="/faq" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              FAQ
            </Link>
            <button onClick={() => setShowContactDialog(true)} className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              Contact
            </button>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>

            {/* User dropdown or CTA Button */}
            {isLoadingAuth ? (
              // Skeleton loader while checking auth
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            ) : isAuthenticated && userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">
                        {userInfo.username || "User"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {userInfo.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : !isLoadingAuth ? (
              <Link href="/signup" className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium border-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" style={{ borderColor: "#128C7E", color: "#128C7E" }}>
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#pricing" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              Pricing
            </Link>
            <Link href="/about" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              About Us
            </Link>
            <Link href="/faq" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              FAQ
            </Link>
            <button onClick={() => { setShowContactDialog(true); setIsOpen(false); }} className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              Contact
            </button>

            <div className="flex flex-col gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              {/* Mobile theme toggle */}
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
              </button>

              {/* Mobile User Menu */}
              {isLoadingAuth ? (
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated && userInfo ? (
                <>
                  <div className="px-2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {userInfo.username || "User"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {userInfo.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : !isLoadingAuth ? (
                <Link href="/signup" className="flex items-center justify-center gap-2 w-full px-6 py-2 rounded-lg font-medium border-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" style={{ borderColor: "#128C7E", color: "#128C7E" }}>
                  <Zap className="w-4 h-4" />
                  Get Started
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <ContactDepartmentDialog isOpen={showContactDialog} onClose={() => setShowContactDialog(false)} />
    </nav>
  ) 
}
