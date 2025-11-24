"use client"

import Link from "next/link"
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard, ShoppingCart, Globe, FileText, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
import { NavbarSkeleton } from "@/components/navbar-skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, isAuthenticated, loading, logout } = useAuth()

  // Avoid hydration mismatch: only render theme-dependent UI after mount
  useEffect(() => setMounted(true), [])

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

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>

            {/* Auth buttons or user menu */}
            {loading ? (
              <NavbarSkeleton />
            ) : !isAuthenticated ? (
              <>
                <Link href="/auth/login" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <User className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/auth/signup" className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium border-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" style={{ borderColor: "#128C7E", color: "#128C7E" }}>
                  <Zap className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback style={{ backgroundColor: "#128C7E", color: "white" }}>
                        {user.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      My Services
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/domains" className="cursor-pointer">
                      <Globe className="w-4 h-4 mr-2" />
                      My Domains
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/invoices" className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      My Invoices
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

            <div className="flex flex-col gap-3 pt-3">
              {/* Mobile theme toggle */}
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
              </button>

              {/* Mobile auth buttons or user menu */}
              {!loading && !isAuthenticated ? (
                <>
                  <Link href="/auth/login" className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link href="/auth/signup" className="flex items-center justify-center gap-2 w-full px-6 py-2 rounded-lg font-medium border-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" style={{ borderColor: "#128C7E", color: "#128C7E" }}>
                    <Zap className="w-4 h-4" />
                    Sign Up
                  </Link>
                </>
              ) : !loading && isAuthenticated && user ? (
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 px-2">{user.fullName}</p>
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link href="/services" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <ShoppingCart className="w-4 h-4" />
                    My Services
                  </Link>
                  <Link href="/domains" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <Globe className="w-4 h-4" />
                    My Domains
                  </Link>
                  <Link href="/invoices" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <FileText className="w-4 h-4" />
                    My Invoices
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
