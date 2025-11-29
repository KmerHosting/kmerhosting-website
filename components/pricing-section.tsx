"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Lightbulb } from "lucide-react"
import { useState } from "react"
import { SalesContactDialog } from "@/components/sales-contact-dialog"
import SelectPlanDialog from "@/components/select-plan-dialog"

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<"shared" | "reseller">("shared")
  const [sharedControlPanel, setSharedControlPanel] = useState<"cpanel" | "directadmin">("cpanel")
  const [showSalesDialog, setShowSalesDialog] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    planType: "shared" | "reseller"
    planName: string
    planPrice: number
  }>({ planType: "shared", planName: "", planPrice: 0 })

  const sharedHostingCPanelPlans = [
    {
      name: "Bronze",
      price: "17,000",
      description: "Getting started",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: ".com",
      controlPanel: "cPanel",
      features: ["2 Website", "10 GB SSD NVMe Storage ", "100 GB Bandwidth", "10 Email Accounts", "Basic Support", "Free SSL Certificate", "Free .com Domain"],
      highlighted: false,
    },
    {
      name: "Silver",
      price: "19,900",
      description: "Small business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: ".com",
      controlPanel: "cPanel",
      features: [
        "5 Websites",
        "20 GB SSD NVMe Storage ",
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
      price: "30,000",
      description: "Growing business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: ".com or .org",
      controlPanel: "cPanel",
      features: [
        "20 Websites",
        "80 GB SSD NVMe Storage ",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Premium Support",
        "Free SSL Certificate",
        "Free .com or .org Domain",
        "Advanced Security",
      ],
      highlighted: false,
    },
    {
      name: "Platinum",
      price: "48,000",
      description: "Enterprise solution",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: "(.*)",
      controlPanel: "cPanel",
      features: [
        "Unlimited Websites",
        "250 GB SSD NVMe Storage ",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Dedicated Support",
        "Free SSL Certificate",
        "Free Domain (.*)",
        "Enterprise Security",
        "Daily Backups",
      ],
      highlighted: false,
    },
  ]

  const sharedHostingDAPlans = [
    {
      name: "Bronze",
      price: "14,000",
      description: "Getting started",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: ".com",
      controlPanel: "DirectAdmin",
      features: ["2 Website", "10 GB SSD NVMe Storage ", "100 GB Bandwidth", "10 Email Accounts", "Basic Support", "Free SSL Certificate", "Free .com or .org Domain"],
      highlighted: false,
    },
    {
      name: "Silver",
      price: "16,900",
      description: "Small business",
      currency: "FCFA",
      billing: "/year",
      freeDomain: true,
      domainType: ".com",
      controlPanel: "DirectAdmin",
      features: [
        "5 Websites",
        "20 GB SSD NVMe Storage ",
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
      domainType: ".com or .org",
      controlPanel: "DirectAdmin",
      features: [
        "20 Websites",
        "80 GB SSD NVMe Storage ",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Premium Support",
        "Free SSL Certificate",
        "Free .com or .org Domain",
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
      domainType: "(.*)",
      controlPanel: "DirectAdmin",
      features: [
        "Unlimited Websites",
        "250 GB SSD NVMe Storage ",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "24/7 Dedicated Support",
        "Free SSL Certificate",
        "Free Domain (.*)",
        "Enterprise Security",
        "Daily Backups",
      ],
      highlighted: false,
    },
  ]

  const getSharedPrice = (annual: number) => {
    return { price: annual.toLocaleString(), billing: "/year" }
  }

  const getResellerPrice = (monthly: number) => {
    return { price: (monthly * 12).toLocaleString(), billing: "/year" }
  }

  const resellerHostingPlans = [
    {
      name: "Bronze",
      monthlyPrice: 3000,
      description: "Start your journey",
      currency: "FCFA",
      controlPanel: "cPanel",
      domainType: ".com or .org",
      baseFeatures: [
        "5 cPanel Accounts",
        "20 GB SSD NVMe Storage ",
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
      domainType: ".com or .org",
      baseFeatures: [
        "15 cPanel Accounts",
        "50 GB SSD NVMe Storage ",
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
      domainType: ".com or .org",
      baseFeatures: [
        "50 cPanel Accounts",
        "150 GB SSD NVMe Storage ",
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
      domainType: "(.*)",
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
      const freeDomain = true
      const domainLabel = plan.domainType === "(.*)" ? "Free Domain (.*)" : `Free ${plan.domainType} Domain`
      return {
        name: plan.name,
        price: pricing.price,
        description: plan.description,
        currency: plan.currency,
        billing: pricing.billing,
        freeDomain: freeDomain,
        domainType: plan.domainType,
        controlPanel: plan.controlPanel,
        features: [domainLabel, ...plan.baseFeatures],
        highlighted: plan.highlighted,
      }
    })
  }

  const getSharedPlansWithPricing = (basePlans: typeof sharedHostingCPanelPlans) => {
    return basePlans.map((plan) => {
      const annualPrice = parseInt(plan.price.replace(/,/g, ''))
      const pricing = getSharedPrice(annualPrice)
      return {
        ...plan,
        price: pricing.price,
        billing: pricing.billing,
        freeDomain: plan.freeDomain,
        features: plan.features.filter(f => f !== "Free .com Domain"),
      }
    })
  }

  const getPlansList = () => {
    if (activeTab === "shared") {
      return sharedControlPanel === "cpanel" 
        ? getSharedPlansWithPricing(sharedHostingCPanelPlans)
        : getSharedPlansWithPricing(sharedHostingDAPlans)
    }
    return getResellerPlansWithPricing()
  }

  const plans = getPlansList()

  return (
    <>
      <section id="pricing" className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hosting Plans</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Choose the perfect plan with flexible billing options. Free domain with annual billing.
          </p>
        </div>

        {/* Tab Navigation - Main Hosting Types */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("shared")}
            className={`px-8 py-3.5 rounded-lg font-semibold transition-all text-lg cursor-pointer ${
              activeTab === "shared"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            style={activeTab === "shared" ? { backgroundColor: "#128C7E" } : {}}
          >
            Shared Hosting
          </button>
          <button
            onClick={() => setActiveTab("reseller")}
            className={`px-8 py-3.5 rounded-lg font-semibold transition-all text-lg cursor-pointer ${
              activeTab === "reseller"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            style={activeTab === "reseller" ? { backgroundColor: "#128C7E" } : {}}
          >
            Reseller Hosting
          </button>
        </div>

        {/* Control Panel Selection for Shared Hosting */}
        {activeTab === "shared" && (
          <div className="flex flex-col items-center mb-10">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Choose the control panel you want to use (cPanel or DirectAdmin)</p>
            <div className="flex justify-center gap-12">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setSharedControlPanel("cpanel")}
                  className={`px-4 py-2 font-semibold transition-all text-lg cursor-pointer border-b-2 ${
                    sharedControlPanel === "cpanel"
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  style={sharedControlPanel === "cpanel" ? { borderBottomColor: "#128C7E" } : { borderBottomColor: "transparent" }}
                >
                  cPanel
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Popular & Reliable</p>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setSharedControlPanel("directadmin")}
                  className={`px-4 py-2 font-semibold transition-all text-lg cursor-pointer border-b-2 ${
                    sharedControlPanel === "directadmin"
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  style={sharedControlPanel === "directadmin" ? { borderBottomColor: "#128C7E" } : { borderBottomColor: "transparent" }}
                >
                  DirectAdmin
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Lightweight & Fast</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative rounded-xl p-5 flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              {/* Oblique Ribbon for Popular Plan */}
              {plan.highlighted && (
                <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                  POPULAR
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
                {plan.freeDomain && plan.domainType && (
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: "#128C7E" }} />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {plan.domainType === "(.*)" ? "Free Domain (.*)" : `Free ${plan.domainType} Domain`}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    const numericPrice = parseInt(String(plan.price).replace(/,/g, "")) || 0
                    setSelectedPlan({
                      planType: activeTab === "shared" ? "shared" : "reseller",
                      planName: plan.name,
                      planPrice: numericPrice,
                    })
                    setIsSelectOpen(true)
                  }}
                  className="w-full mb-5 font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer rounded-md"
                  style={{ backgroundColor: "#128C7E" }}
                >
                  Get Started
                </button>
              </div>

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

        {/* Domain Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto mb-10">
          <p className="text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
            <span>
              <strong>Tips:</strong> If you don't want to use our domain name, you can purchase a domain from another registrar and set the DNS to <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">ns1.kmerhosting.com</code> and <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">ns2.kmerhosting.com</code>
                <p className="mt-4">You can contact support to remove the domain name from your plan <strong>before purchasing</strong>, and the price will be recalculated.</p>
                <p className="mt-4">And if you want to add multiple domains to a specific KmerHosting service you have purchased, submit a request through your dashboard quick action by specifying the associated service.</p>
            </span>
          </p>
        </div>

        {/* Control Panel Comparison & Recommendations */}
        {activeTab === "shared" && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Which Control Panel is Right for You?</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* cPanel Features */}
              <div className="border-l-4" style={{ borderColor: "#128C7E" }}>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span style={{ color: "#128C7E" }}>★</span> cPanel
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  We recommend <strong>cPanel for developers and advanced users</strong> who need:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>SSH Access</strong> - Full command-line control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>PostgreSQL & Redis</strong> - Advanced database support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Git Integration</strong> - Deploy directly from repositories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Many more features</strong> - Professional-grade tools</span>
                  </li>
                </ul>
              </div>
              
              {/* DirectAdmin Features */}
              <div className="border-l-4" style={{ borderColor: "#128C7E" }}>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span style={{ color: "#128C7E" }}>★</span> DirectAdmin
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  We recommend <strong>DirectAdmin for beginners and small businesses</strong> who value:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Lightweight & Fast</strong> - Low resource usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Easy to Use</strong> - Simple, intuitive interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Lower Cost</strong> - More affordable pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span><strong>Reliable Performance</strong> - Great for standard sites</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Sales Button */}
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">Need a custom plan tailored to your needs?</p>
              <Button
                className="font-semibold py-3 px-8 text-white text-base hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales Team
              </Button>
            </div>
          </div>
        )}

        {/* VPS PLANS SECTION */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">VPS Servers plans</h2>
            <p className="text-slate-600 dark:text-slate-400">Powerful configurations to match your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-20">
            {/* VPS Starter */}
            <div className="rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">VPS Starter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Perfect for growing sites</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">2 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">80 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">2 TB Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "1 IPv4 Address", "Linux or Windows", "Free SSL Certificate", "24/7 Support"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VPS Business - POPULAR */}
            <div className="relative rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg shadow-lg" style={{ borderColor: "#128C7E" }}>
              <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                POPULAR
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">VPS Business</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Best for most businesses</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">8 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">160 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4 TB Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "2 IPv4 Addresses", "Linux or Windows", "Free SSL Certificate", "Priority Support", "Weekly Backups"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VPS Professional */}
            <div className="rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">VPS Professional</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">For high-traffic sites</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">8 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">16 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">320 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">8 TB Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "4 IPv4 Addresses", "Linux or Windows", "Free SSL Certificate", "24/7 Priority Support", "Daily Backups"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED SERVERS SECTION */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dedicated Servers plans</h2>
            <p className="text-slate-600 dark:text-slate-400">Enterprise-grade hardware for maximum performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* Essential */}
            <div className="rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Essential</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">For small to medium businesses</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Intel Xeon E-2236 (6 Cores)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">32 GB DDR4 ECC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">2x 1TB NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">10 TB/month Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "5 IPv4 Addresses", "RAID 1 Configuration", "Remote Management (IPMI)", "DDoS Protection", "99.9% Uptime SLA"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business - POPULAR */}
            <div className="relative rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg shadow-lg" style={{ borderColor: "#128C7E" }}>
              <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                POPULAR
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Business</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Best for most enterprises</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Intel Xeon E-2288G (8 Cores)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">64 GB DDR4 ECC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">2x 2TB NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">20 TB/month Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "8 IPv4 Addresses", "RAID 1 or RAID 10", "Remote Management (IPMI)", "DDoS Protection", "99.9% Uptime SLA", "Priority Support"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl p-6 flex flex-col border-2 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Maximum performance & reliability</p>
              
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#128C7E" }}>Contact</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs">for pricing</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dual Xeon Silver 4214 (24 Cores)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">128 GB DDR4 ECC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4x 4TB NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">50 TB/month Bandwidth</span>
                </div>
              </div>

              <Button
                className="w-full font-semibold py-2 text-white text-sm hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => setShowSalesDialog(true)}
              >
                Contact Sales
              </Button>

              <div className="space-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                {["Full Root Access", "16 IPv4 Addresses", "Custom RAID Config", "Remote Management (IPMI)", "Advanced DDoS Protection", "99.99% Uptime SLA", "24/7 Dedicated Support", "Hardware Replacement"].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SelectPlanDialog
      isOpen={isSelectOpen}
      onClose={() => setIsSelectOpen(false)}
      planType={selectedPlan.planType}
      planName={selectedPlan.planName}
      planPrice={selectedPlan.planPrice}
    />
    <SalesContactDialog open={showSalesDialog} onOpenChange={setShowSalesDialog} />
    </>
  )
}
