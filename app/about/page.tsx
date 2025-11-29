"use client"

import Link from "next/link"
import { ArrowRight, Check, Globe, Zap, Shield, Headphones, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import ContactDepartmentDialog from "@/components/contact-department-dialog"

export default function AboutPage() {
  const [showContactDialog, setShowContactDialog] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Industry-leading security with free SSL, DDoS protection, and regular updates"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "SSD storage and optimized infrastructure for superior performance"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert support team available around the clock in French and English"
    },
    {
      icon: Globe,
      title: "Local Expert",
      description: "Cameroon-focused hosting solutions tailored for local businesses"
    }
  ]

  const stats = [
    { number: "3500+", label: "Happy Clients" },
    { number: "99.9%", label: "Uptime Guaranteed" },
    { number: "8000+", label: "Websites Hosted" },
    { number: "5+", label: "Years Experience" }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent dark:from-slate-800/50 dark:to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Empowering <span style={{ color: "#128C7E" }}>Cameroon's</span> Digital Future
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              We provide reliable, secure, and affordable web hosting solutions designed specifically for Cameroon's businesses and entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold" style={{ color: "#128C7E" }}>
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                To provide reliable, affordable, and secure web hosting solutions tailored specifically for Cameroon's businesses and individuals, empowering them to establish and grow their online presence.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                To become the leading web hosting provider in Cameroon, known for exceptional service, local expertise, and unwavering commitment to our clients' success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              KmerHosting was founded with a clear vision: to make professional web hosting accessible and affordable for everyone in Cameroon. We understand the unique challenges that local businesses and individuals face when establishing their online presence.
            </p>
            <p>
              Starting as a small team of passionate technology enthusiasts, we've grown into a trusted hosting provider serving hundreds of satisfied customers across Cameroon. Our commitment to quality, reliability, and exceptional customer service has been the cornerstone of our success.
            </p>
            <p>
              We offer a comprehensive range of hosting solutions, from shared hosting perfect for beginners to powerful reseller packages for entrepreneurs looking to start their own hosting business. With both cPanel and DirectAdmin control panel options, we give you the flexibility to choose the tools that work best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Our Core Values</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            These principles guide everything we do at KmerHosting
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Why Choose KmerHosting?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-3xl font-bold" style={{ color: "#128C7E" }}>01</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Locally Focused</h3>
            <p className="text-slate-600 dark:text-slate-400">
              We understand Cameroon's market and provide solutions tailored to local businesses' unique needs and challenges.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-3xl font-bold" style={{ color: "#128C7E" }}>02</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Competitive Pricing</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Premium hosting quality without premium pricing. We believe professional hosting should be accessible to all.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-3xl font-bold" style={{ color: "#128C7E" }}>03</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Reliable Support</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Our expert team is available 24/7 to ensure your hosting runs smoothly and any issues are resolved quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Hosting Solutions */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Hosting Solutions</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Comprehensive solutions for every stage of your online journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/shared-hosting" className="group p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Shared Hosting</h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" style={{ color: "#128C7E" }} />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Perfect for beginners and small businesses starting their online presence.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Free SSL & Domain
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Unlimited Bandwidth
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  cPanel/DirectAdmin
                </li>
              </ul>
              <p className="mt-6 font-semibold" style={{ color: "#128C7E" }}>From 14,000 FCFA/year</p>
            </Link>
            
            <Link href="/reseller-hosting" className="group p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reseller Hosting</h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" style={{ color: "#128C7E" }} />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Start your own hosting business and build revenue streams.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  WHM & cPanel Access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  White Label Ready
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Flexible Billing
                </li>
              </ul>
              <p className="mt-6 font-semibold" style={{ color: "#128C7E" }}>From 36,000 FCFA/year</p>
            </Link>
            
            <Link href="/vps-hosting" className="group p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">VPS Servers</h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" style={{ color: "#128C7E" }} />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Virtual private server with dedicated resources and full control.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Full Root Access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Dedicated Resources
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Scalable & Flexible
                </li>
              </ul>
              <p className="mt-6 font-semibold" style={{ color: "#128C7E" }}>Contact for pricing</p>
            </Link>
            
            <Link href="/dedicated-servers" className="group p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dedicated Servers</h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" style={{ color: "#128C7E" }} />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Entire physical server dedicated exclusively to your business.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Complete Ownership
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Maximum Performance
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: "#128C7E" }} />
                  Enhanced Security
                </li>
              </ul>
              <p className="mt-6 font-semibold" style={{ color: "#128C7E" }}>Contact for pricing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#128C7E" }}>
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </div>
          <blockquote className="text-2xl font-medium text-slate-900 dark:text-white mb-6 italic">
            "At KmerHosting, we're committed to empowering Cameroon's businesses with reliable, affordable hosting. Quality shouldn't be a luxury—it should be accessible to everyone."
          </blockquote>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Toscani TENEKEU MODJOU</p>
            <p className="text-slate-600 dark:text-slate-400">Chief Executive Officer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-transparent dark:from-slate-800/50 dark:to-transparent border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Cameroon businesses already hosting with KmerHosting. Let's build your online presence today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 rounded-lg font-semibold transition-all cursor-pointer text-white"
              style={{ backgroundColor: "#128C7E" }}
            >
              Get Started Now
            </Link>
            <button
              onClick={() => setShowContactDialog(true)}
              className="px-8 py-3 rounded-lg font-semibold border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <ContactDepartmentDialog isOpen={showContactDialog} onClose={() => setShowContactDialog(false)} />
    </main>
  )
}
