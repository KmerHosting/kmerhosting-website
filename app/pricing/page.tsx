"use client"

import { Check, ShoppingCart, Share2, Server, Cloud, HardDrive, BookOpen, Mail, Code, Zap, CodeIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Shared Hosting",
      icon: Code,
      tiers: [
        {
          name: "Bronze",
          price: 1100,
          features: ["10 GB SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "5 Databases"],
        },
        {
          name: "Silver",
          price: 1250,
          features: ["30 GB SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "8 Databases", "WordPress Pre-installed"],
        },
        {
          name: "Gold",
          price: 1408,
          popular: true,
          features: ["80 GB SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "15 Databases", "Priority Support", "Automatic Backups", "Cloudflare CDN"],
        },
        {
          name: "Platinum",
          price: 2083,
          popular: true,
          features: ["120 GB SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "20 Email Accounts", "50 Databases", "Priority Support", "Daily Backups", "Cloudflare CDN"],
        },
        {
          name: "Platinum Infinity",
          price: 5000,
          features: ["Unlimited SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "Unlimited Email Accounts", "Unlimited Databases", "24/7 Priority Support", "Hourly Backups", "Cloudflare CDN"],
        },
      ],
    },
    {
      name: "Reseller Hosting",
      icon: Share2,
      tiers: [
        {
          name: "Bronze",
          price: 4000,
          features: ["15 cPanel Accounts", "10 GB Total Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "WHM Panel", "White Label", "Unlimited Email Accounts", "Unlimited Databases", "Private Nameservers"],
        },
        {
          name: "Silver",
          price: 6000,
          features: ["20 cPanel Accounts", "30 GB Total Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "WHM Panel", "White Label", "Unlimited Email Accounts", "Unlimited Databases", "Private Nameservers"],
        },
        {
          name: "Gold",
          price: 9900,
          popular: true,
          features: ["50 cPanel Accounts", "80 GB Total Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "WHM Panel", "White Label", "Unlimited Email Accounts", "Unlimited Databases", "Priority Support", "Cloudflare CDN", "Private Nameservers"],
        },
        {
          name: "Platinum",
          price: 13500,
          popular: true,
          features: ["100 cPanel Accounts", "120 GB Total Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "WHM Panel", "White Label", "Unlimited Email Accounts", "Unlimited Databases", "24/7 Support", "Cloudflare CDN", "Private Nameservers"],
        },
        {
          name: "Platinum Infinity",
          price: 30000,
          features: ["Unlimited cPanel Accounts", "Unlimited Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "WHM Panel", "White Label", "Unlimited Email Accounts", "Unlimited Databases", "24/7 VIP Support", "Cloudflare CDN", "Private Nameservers"],
        },
      ],
    },
    {
      name: "VPS Servers",
      icon: Server,
      tiers: [
        {
          name: "Bronze",
          price: 1900,
          features: ["1 vCPU", "1 GB RAM DDR4", "25 GB SSD NVMe", "Linux OS", "200 Mbit/s Port", "Root Access", "1 Dedicated IPv4", "Unlimited Traffic"],
        },
        {
          name: "Silver",
          price: 4000,
          popular: true,
          features: ["4 vCPU AMD EPYC", "8 GB RAM DDR4", "120 GB SSD", "1 Dedicated IPv4 + IPv6", "Linux OS", "200 Mbit/s Port", "Root Access", "Unlimited Traffic", "DDoS Protection"],
        },
        {
          name: "Gold",
          price: 9000,
          popular: true,
          features: ["8 vCPU AMD EPYC", "24 GB RAM DDR4", "400 GB SSD", "Linux OS", "600 Mbit/s Port", "1 Dedicated IPv4 + IPv6", "Root Access", "Unlimited Traffic", "DDoS Protection"],
        },
        {
          name: "Platinum",
          price: 16000,
          features: ["12 vCPU AMD EPYC", "48 GB RAM DDR4", "500 GB SSD", "Linux OS", "800 Mbit/s Port", "1 Dedicated IPv4 + IPv6", "Root Access", "Unlimited Traffic", "DDoS Protection", "Priority Support"],
        },
      ],
    },
    {
      name: "Cloud VDS",
      icon: Cloud,
      tiers: [
        {
          name: "Bronze",
          price: 23000,
          features: ["3 Physical Cores AMD EPYC 7282 2.8 GHz", "24 GB RAM", "180 GB NVMe", "250 Mbit/s Port", "Unlimited Traffic", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
        {
          name: "Silver",
          price: 39000,
          popular: true,
          features: ["6 Physical Cores AMD EPYC 7282 2.8 GHz", "48 GB RAM", "360 GB NVMe", "750 Mbit/s Port", "Unlimited Traffic", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
        {
          name: "Gold",
          price: 55000,
          popular: true,
          features: ["8 Physical Cores AMD EPYC 7282 2.8 GHz", "64 GB RAM", "480 GB NVMe", "1 Gbit/s Port", "Unlimited Traffic", "1 Dedicated IPv4 + IPv6", "Linux OS", "DDoS Protection"],
        },
        {
          name: "Platinum",
          price: 90000,
          features: ["12 Physical Cores AMD EPYC 7282 2.8 GHz", "96 GB RAM", "720 GB NVMe", "1 Gbit/s Port", "Unlimited Traffic", "1 Dedicated IPv4 + IPv6", "Linux OS", "DDoS Protection", "Priority Support"],
        },
      ],
    },
    {
      name: "Dedicated Servers",
      icon: HardDrive,
      tiers: [
        {
          name: "Bronze",
          price: 70000,
          features: ["12 x 3.70 GHz AMD Ryzen 9 7900", "128 GB RAM", "2 TB NVMe", "Unlimited Traffic", "1 Gbit/s Port", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
        {
          name: "Silver",
          price: 115000,
          features: ["24 x 2.50 GHz (3.70 max) AMD EPYC 9224", "128 GB REG ECC", "2 x 1 TB SSD", "Unlimited Traffic", "1 Gbit/s Port", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
        {
          name: "Gold",
          price: 180000,
          popular: true,
          features: ["32 x 3.55 GHz (4.20 max) AMD EPYC 9355P", "128 GB RAM", "2 x 1 TB NVMe", "Unlimited Traffic", "1 Gbit/s Port", "10 Gbit/s Port available", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
        {
          name: "Platinum",
          price: 400000,
          popular: true,
          features: ["64 x 3.20 GHz (4.20 max) AMD EPYC 9555P", "192 GB RAM", "2 x 1 TB NVMe", "Unlimited Traffic", "1 Gbit/s Port", "10 Gbit/s Port available", "1 Dedicated IPv4 + IPv6", "Linux OS"],
        },
      ],
    },
    {
      name: "Student Hosting",
      icon: BookOpen,
      tiers: [
        {
          name: "Student Plan",
          price: 900,
          features: ["20 GB SSD Storage", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "2 Databases", "2 Pro Email Accounts", "Priority Support"],
        },
      ],
    },
    {
      name: "Email Hosting",
      icon: Mail,
      tiers: [
        {
          name: "Bronze",
          price: 700,
          features: ["25 Email Accounts", "50 GB Storage per Account", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Webmail"],
        },
        {
          name: "Silver",
          price: 900,
          features: ["50 Email Accounts", "100 GB Storage per Account", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Webmail", "Spam Protection"],
        },
        {
          name: "Gold",
          price: 1300,
          popular: true,
          features: ["100 Email Accounts", "200 GB Storage per Account", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Webmail", "Spam Protection", "Email Forwarding"],
        },
        {
          name: "Platinum",
          price: 1500,
          popular: true,
          features: ["200 Email Accounts", "500 GB Storage per Account", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Webmail", "Spam Protection", "Email Forwarding"],
        },
        {
          name: "Platinum Infinity",
          price: 2000,
          features: ["Unlimited Email Accounts", "Unlimited Storage per Account", "Unlimited Bandwidth", "1 Free Domain .com (Annual billing)", "Webmail", "Spam Protection", "Email Forwarding", "API"],
        },
      ],
    },
    {
      name: "WordPress Hosting",
      icon: CodeIcon,
      tiers: [
        {
          name: "Bronze",
          price: 1090,
          features: ["10 GB SSD", "Unlimited Bandwidth", "WordPress Pre-installed", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "5 Databases"],
        },
        {
          name: "Silver",
          price: 1416,
          features: ["30 GB SSD", "Unlimited Bandwidth", "WordPress Pre-installed", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "8 Databases", "Caching"],
        },
        {
          name: "Gold",
          price: 1500,
          popular: true,
          features: ["80 GB SSD", "Unlimited Bandwidth", "WordPress Pre-installed", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "10 Email Accounts", "15 Databases", "Caching", "Cloudflare CDN"],
        },
        {
          name: "Platinum",
          price: 1750,
          popular: true,
          features: ["120 GB SSD", "Unlimited Bandwidth", "WordPress Pre-installed", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "20 Email Accounts", "50 Databases", "Caching", "Cloudflare CDN", "Weekly Backups"],
        },
        {
          name: "Platinum Infinity",
          price: 2900,
          features: ["Unlimited SSD", "Unlimited Bandwidth", "WordPress Pre-installed", "Free SSL Let's Encrypt", "cPanel or DirectAdmin", "Unlimited Email Accounts", "Unlimited Databases", "Caching", "Cloudflare CDN", "Daily Backups", "24/7 Support"],
        },
      ],
    },
    {
      name: "Laravel Hosting",
      icon: Code,
      tiers: [
        {
          name: "Bronze",
          price: 1200,
          features: ["10 GB SSD", "Laravel Pre-installed", "PHP Selector (7.x, 8.x)", "Composer", "Unlimited Bandwidth", "Free SSL Let's Encrypt", "1 Free Domain .com (Annual billing)", "cPanel or DirectAdmin", "10 Email Accounts", "5 Databases", "Cloudflare CDN"],
        },
        {
          name: "Silver",
          price: 1475,
          features: ["30 GB SSD", "Laravel Pre-installed", "PHP Selector (7.x, 8.x)", "Composer", "Unlimited Bandwidth", "Free SSL Let's Encrypt", "1 Free Domain .com (Annual billing)", "cPanel or DirectAdmin", "10 Email Accounts", "8 Databases", "Cloudflare CDN"],
        },
        {
          name: "Gold",
          price: 1600,
          popular: true,
          features: ["80 GB SSD", "Laravel Pre-installed", "PHP Selector (7.x, 8.x)", "Composer", "Unlimited Bandwidth", "Free SSL Let's Encrypt", "1 Free Domain .com (Annual billing)", "cPanel or DirectAdmin", "10 Email Accounts", "15 Databases", "Node.js", "Cloudflare CDN"],
        },
        {
          name: "Platinum",
          price: 1800,
          popular: true,
          features: ["120 GB SSD", "Laravel Pre-installed", "PHP Selector (7.x, 8.x)", "Composer", "Unlimited Bandwidth", "Free SSL Let's Encrypt", "1 Free Domain .com (Annual billing)", "cPanel or DirectAdmin", "20 Email Accounts", "50 Databases", "Node.js", "Cloudflare CDN"],
        },
        {
          name: "Platinum Infinity",
          price: 3000,
          features: ["Unlimited SSD", "Laravel Pre-installed", "PHP Selector (7.x, 8.x)", "Composer", "Unlimited Bandwidth", "Free SSL Let's Encrypt", "1 Free Domain .com (Annual billing)", "cPanel or DirectAdmin", "Unlimited Email Accounts", "Unlimited Databases", "Node.js", "24/7 Support", "Cloudflare CDN"],
        },
      ],
    },
    {
      name: "LLM & AI Hosting",
      icon: Zap,
      tiers: [
        {
          name: "Bronze",
          price: 20000,
          features: ["GPU Access", "4 vCPU", "8 GB RAM", "100 GB SSD", "CUDA"],
        },
        {
          name: "Silver",
          price: 30000,
          features: ["GPU Access", "8 vCPU", "16 GB RAM", "200 GB SSD", "CUDA", "TensorFlow"],
        },
        {
          name: "Gold",
          price: 40000,
          popular: true,
          features: ["GPU Access", "12 vCPU", "24 GB RAM", "300 GB SSD", "CUDA", "TensorFlow", "PyTorch", "Cloudflare CDN"],
        },
        {
          name: "Platinum",
          price: 55000,
          popular: true,
          features: ["GPU Access", "16 vCPU", "32 GB RAM", "500 GB SSD", "CUDA", "TensorFlow", "PyTorch", "Jupyter", "Cloudflare CDN"],
        },
        {
          name: "Platinum Infinity",
          price: 80000,
          features: ["GPU Access", "24 vCPU", "48 GB RAM", "1 TB SSD", "CUDA", "TensorFlow", "PyTorch", "Jupyter", "VIP Support", "Cloudflare CDN"],
        },
      ],
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-900 px-4 py-20 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
            <span className="block" style={{ color: "#128C7E" }}>
              in FCFA
            </span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            All prices are per month. Choose the perfect plan for your needs.
          </p>
        </div>

        {/* Pricing Services */}
        <div className="space-y-16">
          {pricingPlans.map((service, serviceIdx) => {
            const IconComponent = service.icon
            return (
            <div key={serviceIdx} className="space-y-6" id={slugify(service.name)}>
              {/* Service Title */}
              <div className="flex items-center gap-3 mb-8">
                {IconComponent && <IconComponent className="w-8 h-8" style={{ color: "#128C7E" }} />}
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {service.name}
                </h2>
              </div>

              {/* Tiers Grid */}
              <div className={`grid gap-4 ${service.tiers.length === 1 ? 'max-w-sm' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'}`}>
                {service.tiers.map((tier, tierIdx) => (
                  <div
                    key={tierIdx}
                    className={`rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-all duration-300 p-5 flex flex-col relative overflow-hidden ${tier.popular ? 'ring-2 ring-[#128C7E]' : ''}`}
                  >
                    {/* Popular Ribbon */}
                    {tier.popular && (
                      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                        <div className="absolute top-2 right-[-8px] w-32 h-8 bg-[#128C7E] text-white text-xs font-bold text-center leading-8 transform rotate-45 shadow-lg">
                          POPULAR
                        </div>
                      </div>
                    )}

                    {/* Tier Name */}
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {formatPrice(tier.price)}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-xs">
                          FCFA/mois
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/checkout" className="mb-5">
                      <button className="w-full font-medium cursor-pointer transition-all text-sm h-9 flex items-center justify-center gap-2 text-[#128C7E] dark:text-[#128C7E] rounded-lg px-3 py-2 group hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-125" />
                        Add to cart
                      </button>
                    </Link>

                    {/* Features */}
                    <div className="space-y-2 flex-1">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                          <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Questions?
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I upgrade or downgrade?",
                a: "Yes! Change your tier anytime. We'll adjust your billing accordingly.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. Start immediately after signup.",
              },
              {
                q: "Do you offer refunds?",
                a: "30-day money-back guarantee on all plans.",
              },
              {
                q: "What payment methods?",
                a: "Credit card, Mobile Money, and Bank Transfer accepted.",
              },
              {
                q: "Can I buy a second domain if I already have a plan?",
                a: "Yes! Please contact our support team with your Customer ID (available in your customer dashboard) along with your domain request.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-800/50 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

