"use client"

import type React from "react"

import Link from "next/link"
import { ArrowUp, Mail, Phone, Slack, Twitter, Facebook, Linkedin, Github, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"

export function Footer() {
  const { t } = useLanguage()
  const [showBackToTop, setShowBackToTop] = useState(false)
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
        <div className="border-b bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">{t("footer.newsletter")}</h3>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
                <Input
                  type="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground text-foreground w-full md:w-64"
                  required
                />
                <Button type="submit" variant="secondary">
                  {t("footer.subscribe")}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">KmerHosting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-accent transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products/shared" className="hover:text-accent transition-colors">
                    Shared Web Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/wordpress" className="hover:text-accent transition-colors">
                    WordPress Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/vps" className="hover:text-accent transition-colors">
                    Cloud VPS Hosting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold mb-4">Others</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/pricing" className="hover:text-accent transition-colors">
                    {t("nav.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/domain-search" className="hover:text-accent transition-colors">
                    {t("nav.domainSearch")}
                  </Link>
                </li>
                <li>
                  <Link href="/free-hosting" className="hover:text-accent transition-colors">
                    {t("nav.freeHosting")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-accent transition-colors">
                    {t("nav.blog")}
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:text-accent transition-colors">
                    {t("nav.forum")}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('showCookieBanner'))}
                    className="hover:text-accent transition-colors text-left"
                  >
                    {t("footer.manageCookies")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-accent transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:hello@kmerhosting.site" className="hover:text-accent transition-colors">
                    hello@kmerhosting.site
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="https://wa.me/237694193493" className="hover:text-accent transition-colors">
                    +237 6 94 19 34 93
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="https://wa.me/237652903110" className="hover:text-accent transition-colors">
                    +237 6 52 90 31 10
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="https://wa.me/237671498025" className="hover:text-accent transition-colors">
                    +237 6 71 49 80 25
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-8 flex justify-end">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {t("footer.status")}
              </span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
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

              {/* Copyright */}
              <div className="text-sm text-muted-foreground">
                <p>
                  KmerHosting &copy; 2023-{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg z-50"
          aria-label={t("footer.backToTop")}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
