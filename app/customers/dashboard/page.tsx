"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle, Package, Server, RefreshCw, LogOut, Menu, X, Settings, Home, User, FileText, Code, Sun, Moon, Bell, ChevronDown, CreditCard, Zap, MessageSquare, BookOpen, Users, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import ContactDepartmentDialog from "@/components/contact-department-dialog"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<{ username?: string; email?: string } | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const [isContactDepartmentOpen, setIsContactDepartmentOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Check authentication server-side via API (httpOnly cookie)
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
        console.error("Error checking auth:", err)
      } finally {
        setIsLoading(false)
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
        setTimeout(() => {
          router.push("/")
        }, 500)
      }
    } catch (err) {
      console.error("Logout error:", err)
      toast.error("Logout failed", { duration: 5000 })
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Authentication Required
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            You must be logged in to access your dashboard
          </p>

          <Link
            href="/login"
            className="w-full px-4 py-2 rounded-md font-medium text-white text-sm transition-colors block text-center"
            style={{ backgroundColor: "#128C7E" }}
          >
            Go to Login
          </Link>

          <p className="text-slate-600 dark:text-slate-400 text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium hover:underline" style={{ color: "#128C7E" }}>
              Sign up
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
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

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notification Icon */}
              <button
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              )}

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors font-semibold"
                  title={userInfo?.username || userInfo?.email}
                >
                  {(userInfo?.username || userInfo?.email)?.[0]?.toUpperCase()}
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                      {userInfo?.username || userInfo?.email}
                    </div>
                    <Link
                      href="/customers/profile"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/customers/settings"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      href="/docs"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      Docs
                    </Link>
                    <Link
                      href="/api-references"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <Code className="w-4 h-4" />
                      API References
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsUserDropdownOpen(false)
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
              <div className="py-3 px-2 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                Welcome, <span className="font-semibold">{userInfo?.username || userInfo?.email}</span>
              </div>
              <Link
                href="/customers/profile"
                className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/customers/settings"
                className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-4 h-4" />
                Docs
              </Link>
              <Link
                href="/api-references"
                className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Code className="w-4 h-4" />
                API References
              </Link>
              <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200 dark:border-slate-800 mt-2">
                {mounted && (
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 px-2 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4 text-yellow-500" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-slate-700" />
                        Dark Mode
                      </>
                    )}
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-sm font-medium mt-2 border-t border-slate-200 dark:border-slate-800"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Quick Actions and Home Button */}
        <div className="flex items-center justify-between gap-4 mb-12">
          {/* Quick Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>Quick Actions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isQuickActionsOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Quick Actions Dropdown */}
            {isQuickActionsOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                <Link
                  href="/get-pay"
                  className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => setIsQuickActionsOpen(false)}
                >
                  <CreditCard className="w-4 h-4" />
                  Submit a Payment Proof
                </Link>
                <button
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => setIsQuickActionsOpen(false)}
                >
                  <Zap className="w-4 h-4" />
                  Use KmerHosting AI
                </button>
                <button
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => {
                    setIsQuickActionsOpen(false)
                    setIsContactDepartmentOpen(true)
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Talk to Support
                </button>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => setIsQuickActionsOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  Read KmerHosting Documentation
                </Link>
                <Link
                  href="/customers/chat"
                  className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => setIsQuickActionsOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  Join Chat Room
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  onClick={() => setIsQuickActionsOpen(false)}
                >
                  <FileText className="w-4 h-4" />
                  Visit Blog
                </Link>
              </div>
            )}
          </div>

          {/* Minimal Home Button - Far Right */}
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            title="Back to Home"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Shared Hosting Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow relative">
            {/* Most Popular Ribbon */}
            <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Most popular
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                Active Services: 0
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Shared Hosting
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Affordable hosting for websites and small businesses with cPanel or DirectAdmin.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div>✓ Unlimited Bandwidth</div>
              <div>✓ Free SSL Certificate</div>
              <div>✓ 24/7 Support</div>
            </div>
            <Link
              href="/customers/services/shared-hosting"
              className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm"
            >
              View →
            </Link>
          </div>

          {/* VPS Hosting Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                Active Services: 0
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              VPS Hosting
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Powerful virtual private servers with full root access for maximum control.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div>✓ Full Root Access</div>
              <div>✓ SSD Storage</div>
              <div>✓ DDoS Protection</div>
            </div>
            <Link
              href="/customers/services/vps-hosting"
              className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm"
            >
              View Orders →
            </Link>
          </div>

          {/* Dedicated Server Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded">
                Active Services: 0
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Dedicated Server
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Entire server dedicated to your applications with enterprise-grade performance.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div>✓ Enterprise Performance</div>
              <div>✓ 24/7 Monitoring</div>
              <div>✓ Redundant Power</div>
            </div>
            <Link
              href="/customers/services/dedicated-servers"
              className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm"
            >
              View Orders →
            </Link>
          </div>

          {/* Reseller Hosting Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow relative">
            {/* Most Popular Ribbon */}
            <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Most popular
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                Active Services: 0
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Reseller Hosting
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Start your hosting business with our white-label reseller solutions.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div>✓ White Label</div>
              <div>✓ Unlimited Accounts</div>
              <div>✓ Full Control Panel</div>
            </div>
            <Link
              href="/customers/services/reseller-hosting"
              className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm"
            >
              View →
            </Link>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">0</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Active Services</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Pending Orders</div>
          </div>
        </div>

        {/* Contact Department Modal */}
        <ContactDepartmentDialog
          isOpen={isContactDepartmentOpen}
          onClose={() => setIsContactDepartmentOpen(false)}
        />
      </main>
    </div>
  )
}
