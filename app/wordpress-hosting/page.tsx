"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Globe, Zap, Shield, TrendingUp, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function WordPressHostingPage() {
  const { addItem } = useCart()
  const [addedItem, setAddedItem] = useState<string | null>(null)

  const handleSelectPlan = (planName: string, price: string) => {
    addItem({
      planType: "wordpress",
      planName: `WordPress Hosting - ${planName}`,
      planPrice: price,
      quantity: 1,
    })
    setAddedItem(planName)
    setTimeout(() => setAddedItem(null), 2000)
  }

  const features = [
    {
      icon: Globe,
      title: "WordPress Optimized",
      description: "Pre-configured servers optimized for WordPress with automatic updates and caching.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Performance",
      description: "Advanced caching, CDN integration, and optimized database for maximum speed.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Daily backups, malware scanning, security updates, and DDoS protection.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Automatically scales with your traffic to handle growth without downtime.",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "12,500 FCFA/year",
      features: ["1 WordPress Site", "25 GB Storage", "Unlimited Bandwidth", "Auto Updates", "Daily Backups", "Free SSL Let's Encrypt", "Email Support"],
    },
    {
      name: "Professional",
      price: "22,500 FCFA/year",
      popular: true,
      features: ["5 WordPress Sites", "100 GB Storage", "Unlimited Bandwidth", "Auto Updates", "Daily Backups", "Free SSL Let's Encrypt", "Priority Support", "CDN Included"],
    },
    {
      name: "Business",
      price: "45,000 FCFA/year",
      features: ["Unlimited WordPress Sites", "500 GB Storage", "Unlimited Bandwidth", "Auto Updates", "Hourly Backups", "Free SSL Let's Encrypt", "24/7 Premium Support", "CDN Included"],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-slate-900 dark:text-white hover:text-primary transition-colors">
            ← Back
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">WordPress Hosting</h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Specialized hosting optimized for WordPress with automatic updates and premium performance.
          </p>
          <Button className="gap-2" size="lg">
            Choose Your Plan <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our WordPress Hosting?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Choose Your WordPress Plan</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">All plans include WordPress optimization, automatic backups, and 24/7 support</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md transition-all overflow-hidden">
                {plan.popular && (
                  <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity ${
                    addedItem === plan.name ? "bg-green-600" : ""
                  }`}
                  style={{ backgroundColor: addedItem === plan.name ? "#16a34a" : "#128C7E" }}
                  onClick={() => handleSelectPlan(plan.name, plan.price)}
                >
                  {addedItem === plan.name ? (
                    <>
                      <ShoppingCart className="inline mr-2 w-4 h-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      Add to Cart <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
