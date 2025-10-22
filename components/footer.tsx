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
      {/* Structured Data for Newsletter */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "KmerHosting",
            "url": "https://kmerhosting.site",
            "potentialAction": {
              "@type": "SubscribeAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://kmerhosting.site/#newsletter"
              }
            }
          })
        }}
      />

      <footer className="border-t bg-muted/30">
        {/* Newsletter Section - Simple & Transparent */}
        <section 
          id="newsletter"
          className="border-b"
          aria-labelledby="newsletter-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl">
              <h3 
                id="newsletter-heading"
                className="text-lg font-semibold mb-4"
              >
                Subscribe to Our Newsletter
              </h3>
              
              <form 
                onSubmit={handleNewsletterSubmit} 
                className="flex flex-col sm:flex-row gap-2 max-w-md mb-3"
                method="post"
                action="#newsletter"
              >
                <Input
                  type="email"
                  name="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                  aria-label="Email address for newsletter"
                  autoComplete="email"
                />
                <Button 
                  type="submit" 
                  variant="default"
                >
                  {t("footer.subscribe")}
                </Button>
              </form>
              
              <p className="text-muted-foreground text-xs">
                Unsubscribe anytime. By subscribing, you agree to our{" "}
                <Link href="/terms" className="underline" title="Read our Terms of Service">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="underline" title="Read our Privacy Policy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Main Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.company.title")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    {t("footer.company.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    {t("footer.company.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-accent transition-colors">
                    {t("footer.company.support")}
                  </Link>
                </li>
                <li>
                  <Link href="/support/live-chat" className="hover:text-accent transition-colors">
                    {t("footer.company.liveChat")}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-accent transition-colors">
                    {t("footer.company.faq")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.products.title")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products/shared" className="hover:text-accent transition-colors">
                    {t("hosting.shared.title")}
                  </Link>
                </li>
                <li>
                  <Link href="/products/wordpress" className="hover:text-accent transition-colors">
                    {t("hosting.wordpress.title")}
                  </Link>
                </li>
                <li>
                  <Link href="/products/vps" className="hover:text-accent transition-colors">
                    {t("hosting.vps.title")}
                  </Link>
                </li>
                <li>
                  <Link href="/products/reseller" className="hover:text-accent transition-colors">
                    {t("hosting.reseller.title")}
                  </Link>
                </li>
                <li>
                  <Link href="/products/n8n" className="hover:text-accent transition-colors">
                    {t("hosting.n8n.title")}
                  </Link>
                </li>
                <li>
                  <Link href="/products/llm" className="hover:text-accent transition-colors">
                    {t("hosting.llm.title")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Link */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.quickLink.title")}</h4>
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
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.legal.title")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    {t("footer.legal.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    {t("footer.legal.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-accent transition-colors">
                    {t("footer.legal.cookies")}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('showCookieBanner'))}
                    className="hover:text-accent transition-colors text-left cursor-pointer"
                  >
                    {t("footer.manageCookies")}
                  </button>
                </li>
                <li>
                  <Link href="/refunds" className="hover:text-accent transition-colors">
                    {t("footer.legal.refunds")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.contact.title")}</h4>
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

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-3 order-1 sm:order-1">
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
              <div className="flex items-center gap-2 text-sm order-2 sm:order-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {t("footer.status")}
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
          aria-label={t("footer.backToTop")}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
