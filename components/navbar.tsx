"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
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
          <div className="hidden md:flex items-center gap-8">
            <Link href="#pricing" className="text-slate-700 hover:text-primary font-medium transition-colors">
              Pricing
            </Link>
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Client Area
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#pricing" className="block text-slate-700 hover:text-primary font-medium py-2">
              Pricing
            </Link>
            <button className="w-full px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Client Area
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
