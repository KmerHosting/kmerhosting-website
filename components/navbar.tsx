"use client"

import Link from "next/link"
import { Menu, X, Sun, Moon, ChevronDown, ShoppingCart, LogIn, UserPlus } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showServicesMenu, setShowServicesMenu] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const services = [
    { label: "Shared Hosting", href: "#" },
    { label: "Reseller Hosting", href: "#" },
    { label: "VPS Servers", href: "#" },
    { label: "Cloud VDS", href: "#" },
    { label: "Dedicated Servers", href: "#" },
    { label: "Student Hosting", href: "#" },
    { label: "Email Hosting", href: "#" },
    { label: "WordPress Hosting", href: "#" },
    { label: "Laravel Hosting", href: "#" },
    { label: "LLM & AI Hosting", href: "#" },
  ]

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
            <div className="relative group">
              <button
                onClick={() => setShowServicesMenu(!showServicesMenu)}
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer"
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Services Dropdown */}
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {services.map((service, idx) => (
                  <Link
                    key={idx}
                    href={service.href}
                    className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="#" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              Pricing
            </Link>
            <Link href="#" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              About Us
            </Link>
            <Link href="#" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              FAQ
            </Link>
            <Link href="#" className="text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer">
              Contact
            </Link>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer hover:shadow-sm"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>

            {/* Cart Button */}
            <Link href="/cart" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex gap-3 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              <Link href="/login" className="flex items-center gap-1 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium transition-colors cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link href="/register" className="flex items-center gap-1 px-4 py-2 text-white font-medium rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: "#128C7E" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f6d60")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}>
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <div>
              <button
                onClick={() => setShowServicesMenu(!showServicesMenu)}
                className="w-full text-left text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer flex items-center justify-between"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} />
              </button>
              {showServicesMenu && (
                <div className="pl-4 space-y-2 mt-2 border-l border-slate-200 dark:border-slate-700">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="block text-slate-600 dark:text-slate-400 hover:text-primary text-sm py-1 cursor-pointer"
                      onClick={() => {
                        setIsOpen(false)
                        setShowServicesMenu(false)
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="#" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              Pricing
            </Link>
            <Link href="#" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              About Us
            </Link>
            <Link href="#" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer">
              FAQ
            </Link>
            <Link href="/" className="block text-slate-700 dark:text-slate-300 hover:text-primary font-medium py-2 cursor-pointer" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="flex flex-col gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              {/* Mobile theme toggle */}
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left flex items-center gap-2 cursor-pointer hover:shadow-sm"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
                <span className="text-slate-700 dark:text-slate-300 font-medium">Theme</span>
              </button>

              {/* Mobile Cart */}
              <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium cursor-pointer hover:shadow-sm">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>

              {/* Mobile Auth Buttons */}
              <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 hover:shadow-sm">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg transition-all cursor-pointer hover:shadow-md" style={{ backgroundColor: "#128C7E" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f6d60")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}>
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  ) 
}
