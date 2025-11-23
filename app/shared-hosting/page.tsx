"use client"

import Link from "next/link"
import { Check, ArrowRight, Users, Zap, Shield, Clock, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SharedHostingPage() {
  const features = [
    {
      icon: Users,
      title: "User-Friendly Control Panels",
      description: "Choose between cPanel or DirectAdmin - both industry-leading control panels with intuitive interfaces for easy website management.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Performance",
      description: "SSD storage and optimized server configurations ensure your website loads quickly for the best user experience.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Free SSL certificates, daily backups, and DDoS protection keep your website safe and secure 24/7.",
    },
    {
      icon: Clock,
      title: "99.9% Uptime Guarantee",
      description: "Reliable infrastructure and redundant systems ensure your website stays online when your visitors need it.",
    },
  ]

  const plans = [
    {
      name: "Bronze",
      price: "14,000 FCFA/year",
      features: ["2 Website", "10 GB SSD NVMe Storage ", "100 GB Bandwidth", "10 Email Accounts", "Basic Support", "Free SSL Certificate"],
    },
    {
      name: "Silver",
      price: "16,900 FCFA/year",
      popular: true,
      features: ["5 Websites", "50 GB SSD NVMe Storage ", "Unlimited Bandwidth", "25 Email Accounts", "Priority Support", "Free SSL Certificate", "Free .com Domain"],
    },
    {
      name: "Gold",
      price: "25,000 FCFA/year",
      features: ["20 Websites", "150 GB SSD NVMe Storage ", "Unlimited Bandwidth", "Unlimited Email Accounts", "24/7 Premium Support", "Free SSL Certificate", "Free .com Domain", "Advanced Security"],
    },
    {
      name: "Platinum",
      price: "40,000 FCFA/year",
      features: ["Unlimited Websites", "Unlimited Storage", "Unlimited Bandwidth", "Unlimited Email Accounts", "24/7 Dedicated Support", "Free SSL Certificate", "Free .com Domain", "Enterprise Security", "Daily Backups"],
    },
  ]

  const idealFor = [
    "Personal blogs and portfolios",
    "Small business websites",
    "WordPress and CMS-based sites",
    "Landing pages and brochure sites",
    "E-commerce stores (small to medium)",
    "Educational and community websites",
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#128C7E] transition-colors mb-8 cursor-pointer">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
            <Users className="w-5 h-5" style={{ color: "#128C7E" }} />
            <span className="text-sm font-semibold" style={{ color: "#128C7E" }}>SHARED HOSTING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Perfect for Personal Websites & Small Businesses
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Get your website online quickly with our reliable and affordable shared hosting. Perfect for beginners and small businesses looking for an easy-to-use hosting solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="https://kmerhosting.com/customers/store/cpanel-shared-hosting">
                Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer hover:bg-[#128C7E] hover:text-white transition-all"
              style={{ color: "#128C7E", borderColor: "#128C7E" }}
            >
              <Link href="/#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Shared Hosting */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">What is Shared Hosting?</h2>
          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              Shared hosting is the most popular and cost-effective way to host your website. In this hosting environment, your website shares server resources (CPU, RAM, and disk space) with other websites. This makes it an affordable option while still providing all the features you need to run a successful website.
            </p>
            <p>
              Our shared hosting plans come with everything you need to get started: easy-to-use control panels (cPanel or DirectAdmin), one-click application installers, free SSL certificates, and professional email accounts. Whether you're launching your first blog or building a small business website, shared hosting provides the perfect balance of affordability and functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Features List */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Everything You Need Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "cPanel or DirectAdmin control panel",
              "Free SSL certificates (HTTPS)",
              "One-click app installer (WordPress, Joomla, etc.)",
              "Professional email accounts",
              "Website builder tools",
              "MySQL databases",
              "PHP, Python, and Perl support",
              "FTP access",
              "File manager",
              "Cron jobs for automation",
              "Hotlink protection",
              "Password-protected directories",
              "Custom error pages",
              "Web statistics and analytics",
              "Spam protection",
              "Daily automatic backups",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Ideal For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {idealFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#128C7E" }}></div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Overview */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Choose Your Plan</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">All plans include free SSL, 24/7 support, and 99.9% uptime guarantee</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-all overflow-hidden">
                {plan.popular && (
                  <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xl font-bold mb-4" style={{ color: "#128C7E" }}>{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Launch your website today with our reliable shared hosting. Choose your control panel and get online in minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="https://kmerhosting.com/customers/store/cpanel-shared-hosting">
                Order cPanel Hosting <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="https://kmerhosting.com/customers/store/directadmin-shared-hosting">
                Order DirectAdmin Hosting <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
