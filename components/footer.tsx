"use client"

import { CheckCircle2, Mail, Send, Facebook, Twitter, Instagram, Linkedin, Cookie, Youtube, Github } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useCookieBanner } from "@/lib/cookie-context"
import ContactDepartmentDialog from "@/components/contact-department-dialog"

export default function Footer() {
  const { showCookieBanner } = useCookieBanner()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 5000)
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const services = [
    { name: "Web Servers", status: "Operational" },
    { name: "Email Services", status: "Operational" },
    { name: "Database Servers", status: "Operational" },
    { name: "API Services", status: "Operational" },
  ]

  return (
    <footer className="text-slate-900 dark:text-white">
      {/* Newsletter Section */}
      <div className="py-6 px-4 border-b border-slate-200 dark:border-slate-700 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold">Join the KmerHosting Universe</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Subscribe to keep up with everything happening on KmerHosting
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full sm:w-auto flex-shrink-0">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 sm:flex-none px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-full border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all text-sm w-full sm:w-56 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-full font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-2 text-green-600 dark:text-green-400 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thanks for subscribing!</span>
            </div>
          )}
        </div>
      </div>

      <div className="py-16 px-4 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Services Status Section */}
          <div className="mb-12 pb-12 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-6">
              Service Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3"
                >
                  <div className="flex-shrink-0 animate-pulse">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {service.name}
                    </p>
                    <p className="text-xs text-green-400 font-semibold">
                      {service.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Image
                src="/logo-white1.png"
                alt="KmerHosting Logo"
                width={180}
                height={50}
                className="h-auto"
              />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">The best web hosting solution in Cameroon with world-class support and competitive pricing.</p>
          </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-400">
                <li>
                  <a href="/shared-hosting" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Shared Hosting
                  </a>
                </li>
                <li>
                  <a href="/reseller-hosting" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Reseller Hosting
                  </a>
                </li>
                <li>
                  <a href="/vps-hosting" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    VPS Servers
                  </a>
                </li>
                <li>
                  <a href="/dedicated-servers" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Dedicated Servers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-400">
                <li>
                  <a href="/about" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="https://blog.kmerhosting.com" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://forum.kmerhosting.com" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Forum
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowContactDialog(true)}
                    className="hover:text-slate-900 dark:hover:text-teal-400 transition cursor-pointer font-normal text-left"
                  >
                    Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-400">
                <li>
                  <a href="/legal/privacy-policy" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/terms-of-service" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/legal/cookies-policy" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Cookies Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/refund-policy" className="hover:text-slate-900 dark:hover:text-teal-400 transition">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "#128C7E" }} />
                  <a href="mailto:support@kmerhosting.com" className="hover:text-slate-900 dark:hover:text-teal-400 transition cursor-pointer">
                    support@kmerhosting.com
                  </a>
                </li>
                <li>10ème arrêt Nkoabang,<br />Yaoundé, Cameroon</li>
                <li className="pt-2 font-semibold text-teal-400">24/7 Support Available</li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="Facebook">
                    <Facebook className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-teal-400" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="Twitter">
                    <Twitter className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-blue-400 dark:hover:text-teal-400" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="Instagram">
                    <Instagram className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-pink-600 dark:hover:text-teal-400" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="LinkedIn">
                    <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-blue-700 dark:hover:text-teal-400" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="YouTube">
                    <Youtube className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-red-600 dark:hover:text-teal-400" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="GitHub">
                    <Github className="w-5 h-5 text-slate-700 dark:text-slate-400 hover:text-gray-900 dark:hover:text-teal-400" />
                  </a>
                </div>
              </div>
              <button
                onClick={showCookieBanner}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-900 dark:text-slate-200 cursor-pointer"
              >
                <Cookie className="w-4 h-4" />
                Manage Cookies
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <p>© 2025 KmerHosting. All rights reserved.</p>
            <p>Proudly serving Cameroon with enterprise-grade hosting solutions.</p>
          </div>
        </div>
      </div>

      <ContactDepartmentDialog isOpen={showContactDialog} onClose={() => setShowContactDialog(false)} />
    </footer>
  )
}
