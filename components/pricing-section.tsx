"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("shared-cpanel")
  const [resellerBilling, setResellerBilling] = useState<"monthly" | "quarterly" | "semi-annual" | "annual">("monthly")

  const sharedHostingCPanelPlans = [
    {
      name: "Bronze",
      price: "13,000",
      description: "Getting started",
      currency: "FCFA",
      billing: "/year",
      freeDomain: false,
      controlPanel: "cPanel",
      features: ["1 Website", "50 GB Storage", "100 GB Bandwidth", "10 Email Accounts", "Basic Support", "Free SSL Certificate"],
      highlighted: false,
    },
    {
      name: "Silver",
      price: "15,000",
      description: "Small business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "cPanel",
      features: [
        "5 Websites",
        "100 GB Storage",
        "Unlimited Bandwidth",
        "25 Email Accounts",
        "Priority Support",
        "Free SSL Certificate",
        "Free .com Domain",
      ],
      highlighted: true,
    },
    {
      name: "Gold",
      price: "25,000",
      description: "Growing business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "cPanel",
      features: [
        "20 Websites",
        "250 GB Storage",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Premium Support",
        "Free SSL Certificate",
        "Free .com Domain",
        "Advanced Security",
      ],
      highlighted: false,
    },
    {
      name: "Platinum",
      price: "40,000",
      description: "Enterprise solution",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "cPanel",
      features: [
        "Unlimited Websites",
        "Unlimited Storage",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Dedicated Support",
        "Free SSL Certificate",
        "Free .com Domain",
        "Enterprise Security",
        "Daily Backups",
      ],
      highlighted: false,
    },
  ]

  const sharedHostingDAPlans = [
    {
      name: "Bronze",
      price: "13,000",
      description: "Getting started",
      currency: "FCFA",
      billing: "/year",
      freeDomain: false,
      controlPanel: "DirectAdmin",
      features: ["1 Website", "50 GB Storage", "100 GB Bandwidth", "10 Email Accounts", "Basic Support", "Free SSL Certificate"],
      highlighted: false,
    },
    {
      name: "Silver",
      price: "15,000",
      description: "Small business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "DirectAdmin",
      features: [
        "5 Websites",
        "100 GB Storage",
        "Unlimited Bandwidth",
        "25 Email Accounts",
        "Priority Support",
        "Free SSL Certificate",
        "Free .com Domain",
      ],
      highlighted: true,
    },
    {
      name: "Gold",
      price: "25,000",
      description: "Growing business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "DirectAdmin",
      features: [
        "20 Websites",
        "250 GB Storage",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Premium Support",
        "Free SSL Certificate",
        "Free .com Domain",
        "Advanced Security",
      ],
      highlighted: false,
    },
    {
      name: "Platinum",
      price: "40,000",
      description: "Enterprise solution",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      controlPanel: "DirectAdmin",
      features: [
        "Unlimited Websites",
        "Unlimited Storage",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Dedicated Support",
        "Free SSL Certificate",
        "Free .com Domain",
        "Enterprise Security",
        "Daily Backups",
      ],
      highlighted: false,
    },
  ]

  const getResellerPrice = (monthly: number) => {
    switch (resellerBilling) {
      case "monthly":
        return { price: monthly.toLocaleString(), billing: "/month" }
      case "quarterly":
        return { price: (monthly * 3).toLocaleString(), billing: "/3 months" }
      case "semi-annual":
        return { price: (monthly * 6).toLocaleString(), billing: "/6 months" }
      case "annual":
        return { price: (monthly * 12).toLocaleString(), billing: "/year" }
    }
  }

  const resellerHostingPlans = [
    {
      name: "Bronze",
      monthlyPrice: 3000,
      description: "Start your journey",
      currency: "FCFA",
      controlPanel: "cPanel",
      baseFeatures: [
        "5 cPanel Accounts",
        "20 GB Storage",
        "Unlimited Bandwidth",
        "Basic Support",
        "Free SSL Certificate",
        "WHM & cPanel Access",
      ],
      highlighted: false,
    },
    {
      name: "Silver",
      monthlyPrice: 5000,
      description: "Start reselling",
      currency: "FCFA",
      controlPanel: "cPanel",
      baseFeatures: [
        "15 cPanel Accounts",
        "50 GB Storage",
        "Unlimited Bandwidth",
        "Priority Support",
        "Free SSL Certificate",
        "WHM & cPanel Access",
      ],
      highlighted: true,
    },
    {
      name: "Gold",
      monthlyPrice: 15000,
      description: "Scale your business",
      currency: "FCFA",
      controlPanel: "cPanel",
      baseFeatures: [
        "50 cPanel Accounts",
        "150 GB Storage",
        "Unlimited Bandwidth",
        "24/7 Premium Support",
        "Free SSL Certificate",
        "WHM & cPanel Access",
        "Advanced Security",
      ],
      highlighted: false,
    },
    {
      name: "Platinum",
      monthlyPrice: 30000,
      description: "Enterprise reseller",
      currency: "FCFA",
      controlPanel: "cPanel",
      baseFeatures: [
        "Unlimited cPanel Accounts",
        "Unlimited Storage",
        "Unlimited Bandwidth",
        "24/7 Dedicated Support",
        "Free SSL Certificate",
        "WHM & cPanel Access",
        "Enterprise Security",
        "Priority Network",
      ],
      highlighted: false,
    },
  ]

  const getResellerPlansWithPricing = () => {
    return resellerHostingPlans.map((plan) => {
      const pricing = getResellerPrice(plan.monthlyPrice)
      const freeDomain = resellerBilling === "annual"
      return {
        name: plan.name,
        price: pricing.price,
        description: plan.description,
        currency: plan.currency,
        billing: pricing.billing,
        freeDomain: freeDomain,
        controlPanel: plan.controlPanel,
        features: freeDomain ? ["Free .com Domain", ...plan.baseFeatures] : plan.baseFeatures,
        highlighted: plan.highlighted,
      }
    })
  }

  const getPlansList = () => {
    if (activeTab === "shared-cpanel") return sharedHostingCPanelPlans
    if (activeTab === "shared-da") return sharedHostingDAPlans
    return getResellerPlansWithPricing()
  }

  const plans = getPlansList()

  return (
    <section id="pricing" className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hosting Plans</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Choose the perfect plan. Shared hosting prices are yearly. Reseller hosting: flexible billing options. Free domain with annual billing.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab("shared-cpanel")}
            className={`px-5 py-2 rounded-lg font-medium transition-all text-sm ${
              activeTab === "shared-cpanel"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            style={activeTab === "shared-cpanel" ? { backgroundColor: "#128C7E" } : {}}
          >
            Shared - cPanel
          </button>
          <button
            onClick={() => setActiveTab("shared-da")}
            className={`px-5 py-2 rounded-lg font-medium transition-all text-sm ${
              activeTab === "shared-da"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            style={activeTab === "shared-da" ? { backgroundColor: "#128C7E" } : {}}
          >
            Shared - DirectAdmin
          </button>
          <button
            onClick={() => setActiveTab("reseller")}
            className={`px-5 py-2 rounded-lg font-medium transition-all text-sm ${
              activeTab === "reseller"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            style={activeTab === "reseller" ? { backgroundColor: "#128C7E" } : {}}
          >
            Reseller Hosting
          </button>
        </div>

        {/* Reseller Billing Period Toggle */}
        {activeTab === "reseller" && (
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            <button
              onClick={() => setResellerBilling("monthly")}
              className={`px-4 py-1.5 rounded-md font-medium transition-all text-xs ${
                resellerBilling === "monthly"
                  ? "text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={resellerBilling === "monthly" ? { backgroundColor: "#128C7E" } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setResellerBilling("quarterly")}
              className={`px-4 py-1.5 rounded-md font-medium transition-all text-xs ${
                resellerBilling === "quarterly"
                  ? "text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={resellerBilling === "quarterly" ? { backgroundColor: "#128C7E" } : {}}
            >
              Quarterly
            </button>
            <button
              onClick={() => setResellerBilling("semi-annual")}
              className={`px-4 py-1.5 rounded-md font-medium transition-all text-xs ${
                resellerBilling === "semi-annual"
                  ? "text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={resellerBilling === "semi-annual" ? { backgroundColor: "#128C7E" } : {}}
            >
              Semi-Annual
            </button>
            <button
              onClick={() => setResellerBilling("annual")}
              className={`px-4 py-1.5 rounded-md font-medium transition-all text-xs relative ${
                resellerBilling === "annual"
                  ? "text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={resellerBilling === "annual" ? { backgroundColor: "#128C7E" } : {}}
            >
              Annual
              <span className="ml-1 text-xs font-semibold">🎁</span>
            </button>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 flex flex-col border transition-all duration-300 hover:shadow-lg ${
                plan.highlighted
                  ? "border-primary shadow-md bg-slate-50 dark:bg-slate-800"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              }`}
            >
              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-primary text-xs font-semibold rounded-md" style={{ backgroundColor: "#128C7E20" }}>
                    POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>{plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">{plan.currency}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{plan.billing}</p>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 mb-5 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#128C7E" }}></div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{plan.controlPanel}</span>
                </div>
                {plan.freeDomain && (
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: "#128C7E" }} />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Free .com Domain</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a href={`https://kmerhosting.com/customers/store/${activeTab === "shared-cpanel" ? "cpanel-shared-hosting" : activeTab === "shared-da" ? "directadmin-shared-hosting" : "cpanel-reseller-hosting"}`} className="w-full">
                <Button className="w-full mb-5 font-semibold py-2 text-white text-sm hover:opacity-90" style={{ backgroundColor: "#128C7E" }}>
                  Get Started
                </Button>
              </a>

              {/* Features List */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Includes:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
