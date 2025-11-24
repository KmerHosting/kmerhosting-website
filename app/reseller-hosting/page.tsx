"use client"

import Link from "next/link"
import { Check, ArrowRight, Server, DollarSign, Settings, TrendingUp, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResellerHostingPage() {
  const features = [
    {
      icon: Server,
      title: "WHM & cPanel Access",
      description: "Full Web Host Manager (WHM) and cPanel access gives you complete control over your clients' hosting accounts and server resources.",
    },
    {
      icon: DollarSign,
      title: "Flexible Pricing",
      description: "Set your own pricing and packages. Keep 100% of the profit while we handle the infrastructure and technical support.",
    },
    {
      icon: Settings,
      title: "White Label Ready",
      description: "Brand everything as your own. Custom nameservers, branded control panels, and no mention of KmerHosting to your clients.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Business",
      description: "Start small and grow your hosting business. Upgrade your plan as you acquire more clients without any downtime.",
    },
  ]

  const plans = [
    {
      name: "Bronze",
      price: "From 3,000 FCFA/month",
      features: ["5 cPanel Accounts", "20 GB SSD NVMe Storage ", "Unlimited Bandwidth", "Basic Support", "Free SSL Certificates", "WHM & cPanel Access"],
    },
    {
      name: "Silver",
      price: "From 5,000 FCFA/month",
      popular: true,
      features: ["15 cPanel Accounts", "50 GB SSD NVMe Storage ", "Unlimited Bandwidth", "Priority Support", "Free SSL Certificates", "WHM & cPanel Access", "Free Domain (Annual)"],
    },
    {
      name: "Gold",
      price: "From 15,000 FCFA/month",
      features: ["50 cPanel Accounts", "150 GB SSD NVMe Storage ", "Unlimited Bandwidth", "24/7 Premium Support", "Free SSL Certificates", "WHM & cPanel Access", "Advanced Security"],
    },
    {
      name: "Platinum",
      price: "From 30,000 FCFA/month",
      features: ["Unlimited cPanel Accounts", "Unlimited Storage", "Unlimited Bandwidth", "24/7 Dedicated Support", "Free SSL Certificates", "WHM & cPanel Access", "Enterprise Security", "Priority Network"],
    },
  ]

  const idealFor = [
    "Web designers and developers",
    "Digital marketing agencies",
    "IT consultants and freelancers",
    "Entrepreneurs starting a hosting business",
    "Companies managing multiple client websites",
    "Tech-savvy individuals looking for extra income",
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Plan",
      description: "Select a reseller hosting package that fits your business needs and budget.",
    },
    {
      step: "2",
      title: "Setup Your Brand",
      description: "Configure your white-label nameservers and customize your control panel branding.",
    },
    {
      step: "3",
      title: "Create Packages",
      description: "Use WHM to create hosting packages with your own pricing and resource allocations.",
    },
    {
      step: "4",
      title: "Sell to Clients",
      description: "Market your hosting services and sign up clients directly through your branded platform.",
    },
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
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
            <Server className="w-5 h-5" style={{ color: "#128C7E" }} />
            <span className="text-sm font-semibold" style={{ color: "#128C7E" }}>RESELLER HOSTING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Start Your Own Hosting Business with Ease
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Build your hosting brand and generate recurring revenue. Our reseller hosting gives you the infrastructure, tools, and support to succeed in the hosting industry.
          </p>
        </div>
        </div>
      </section>

      {/* What is Reseller Hosting */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">What is Reseller Hosting?</h2>
          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              Reseller hosting allows you to start your own web hosting business without the complexity and cost of maintaining servers. You purchase hosting resources from us in bulk and then resell them to your own clients under your brand name.
            </p>
            <p>
              With our reseller hosting plans, you get access to WHM (Web Host Manager) and cPanel, industry-standard control panels that let you create and manage individual hosting accounts for your clients. You set your own prices, create custom packages, and keep all the profits while we handle the server infrastructure, maintenance, and technical support.
            </p>
            <p>
              This is the perfect solution for web designers, developers, digital agencies, and entrepreneurs who want to offer hosting services to their clients or start their own hosting company with minimal investment.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4" style={{ backgroundColor: "#128C7E" }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
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
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Everything You Need to Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "WHM (Web Host Manager) access",
              "cPanel for all client accounts",
              "White label nameservers",
              "Private branding options",
              "Unlimited domains",
              "Free SSL certificates for all accounts",
              "Softaculous app installer",
              "WHMCS billing integration support",
              "Automated backups",
              "Resource monitoring tools",
              "Suspend/unsuspend accounts",
              "Create custom packages",
              "Set your own pricing",
              "Bandwidth and disk usage reports",
              "Email account management",
              "24/7 technical support",
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
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Ideal For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {idealFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#128C7E" }}></div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Overview */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Choose Your Plan</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Flexible billing options: Monthly, Quarterly, Semi-Annual, or Annual</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-all overflow-hidden">
                {plan.popular && (
                  <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-lg font-bold mb-4" style={{ color: "#128C7E" }}>{plan.price}</p>
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
            Ready to Start Your Hosting Business?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Join successful entrepreneurs and agencies who are building profitable hosting businesses with KmerHosting.
          </p>
          <Button
            asChild
            size="lg"
            className="text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#128C7E" }}
          >
            <Link href="https://kmerhosting.com/customers/store/cpanel-reseller-hosting">
              Start Your Business Today <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
