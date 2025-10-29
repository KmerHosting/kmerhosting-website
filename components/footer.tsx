"use client"

import type React from "react"

import Link from "next/link"
import { ArrowUp, Mail, Ticket, Slack, Twitter, Facebook, Linkedin, Github, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function Footer() {const [showBackToTop, setShowBackToTop] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      
      // Show button when user has scrolled past 70% of the page
      const scrollPercentage = scrollY / (documentHeight - windowHeight)
      setShowBackToTop(scrollPercentage > 0.7)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <>
      <footer className="border-t bg-muted/30">
        {/* Newsletter Bar */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">Join the KmerHosting universe</h3>
                <p className="text-sm text-muted-foreground">Subscribe to keep up with everything happening on KmerHosting,<br className="hidden sm:block" /> from deals and promotions to product launches.</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2 relative">
                <div className="relative w-full md:w-80">
                  <Input
                    type="email"
                    placeholder="Enter your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/50 border-border text-foreground w-full pr-12 h-12 rounded-full focus-visible:ring-2 focus-visible:ring-primary"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">{"Company"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    {"About Us"}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-accent transition-colors">
                    {"Support"}
                  </Link>
                </li>
                <li>
                  <Link href="/support/live-chat" className="hover:text-accent transition-colors">
                    {"Live Chat"}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-accent transition-colors">
                    {"FAQ"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hosting Products */}
            <div>
              <h4 className="font-semibold mb-4">{"Hosting"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/pricing" className="hover:text-accent transition-colors">
                    {"Shared Hosting"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/reseller/cpanel/reseller" className="hover:text-accent transition-colors">
                    {"Reseller Hosting"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/vps/managed" className="hover:text-accent transition-colors">
                    {"Cloud VPS"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/dedicated-vps/managed" className="hover:text-accent transition-colors">
                    {"Dedicated VPS"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/dedicated-servers/managed" className="hover:text-accent transition-colors">
                    {"Bare Metal Servers"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/n8n" className="hover:text-accent transition-colors">
                    {"Self-hosted n8n"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* AI & Services */}
            <div>
              <h4 className="font-semibold mb-4">{"AI & Tools"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products/ai/website-builder" className="hover:text-accent transition-colors">
                    {"AI Website Builder"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/ai/free/llama" className="hover:text-accent transition-colors">
                    {"Free AI Access"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/ai/paid/gpt" className="hover:text-accent transition-colors">
                    {"Paid AI Access"}
                  </Link>
                </li>
                <li>
                  <Link href="/domain-search" className="hover:text-accent transition-colors">
                    {"Domain Search"}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/whois-lookup" className="hover:text-accent transition-colors">
                    {"WHOIS Lookup"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Extra Services */}
            <div>
              <h4 className="font-semibold mb-4">{"Extra Services"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products/ssl-certificates" className="hover:text-accent transition-colors">
                    {"SSL Certificates"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/email-hosting" className="hover:text-accent transition-colors">
                    {"Email Hosting"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/database-hosting" className="hover:text-accent transition-colors">
                    {"Database Hosting"}
                  </Link>
                </li>
                <li>
                  <Link href="/products/free-static-hosting" className="hover:text-accent transition-colors">
                    {"Free Static Hosting"}
                  </Link>
                </li>
                <li>
                  <Link href="/free-hosting" className="hover:text-accent transition-colors">
                    {"Free Hosting Plan"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Link */}
            <div>
              <h4 className="font-semibold mb-4">{"Resources"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    {"Products"}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-accent transition-colors">
                    {"Pricing"}
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="hover:text-accent transition-colors">
                    {"Affiliate Program"}
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-accent transition-colors">
                    {"Documentation"}
                  </Link>
                </li>
                <li>
                  <Link href="/knowledgebase" className="hover:text-accent transition-colors">
                    {"Knowledge Base"}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-accent transition-colors">
                    {"Blog"}
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:text-accent transition-colors">
                    {"Community"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('showCookieBanner'))}
                    className="hover:text-accent transition-colors text-left cursor-pointer"
                  >
                    {"Manage Cookies"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">{"Legal"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    {"Terms of Service"}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    {"Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-accent transition-colors">
                    {"Cookie Policy"}
                  </Link>
                </li>
                <li>
                  <Link href="/refunds" className="hover:text-accent transition-colors">
                    {"Refund Policy"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{"Contact Us"}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:sales@kmerhosting.com" className="hover:text-accent transition-colors">
                    sales@kmerhosting.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <Link href="/support" className="hover:text-accent transition-colors">
                    Open Ticket
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between mb-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://slack.kmerhosting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Join our Slack community"
                >
                  <Slack className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View our GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@kmerhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[#07C983] dark:text-[#07C983] font-medium">
                  {"Service status"}
                </span>
              </div>
            </div>

            {/* Centered Copyright */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                KmerHosting &copy; 2019-{new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full z-50"
          aria-label={"Back to top"}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
