"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Check, Gift, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"

type BillingPeriod = "monthly" | "quarterly" | "semi-annually" | "annually"

interface PricingPlan {
  name: string
  basePrice: number
  description: string
  features: string[]
  allFeatures: string[]
  popular?: boolean
  badge?: string
  color?: string
}

const billingDiscounts: Record<BillingPeriod, { discount: number; label: string; months: number }> = {
  "monthly": { discount: 0, label: "Monthly", months: 1 },
  "quarterly": { discount: 5, label: "Quarterly", months: 3 },
  "semi-annually": { discount: 10, label: "Semi-Annual", months: 6 },
  "annually": { discount: 15, label: "Annual", months: 12 },
}

// Shared Hosting Plans (used for both cPanel and DirectAdmin)
const sharedHostingPlans: PricingPlan[] = [
  {
    name: "Starter",
    basePrice: 1500,
    description: "Perfect for personal websites",
    features: ["1 Website", "10 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate"],
    allFeatures: [
      "1 Website", "10 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate",
      "LiteSpeed Web Server", "WordPress Optimized", "99.9% Uptime Guarantee",
      "24/7 Support", "Free Website Migration", "Daily Backups", "1-Click Installer",
    ],
  },
  {
    name: "Business",
    basePrice: 3000,
    description: "Great for small businesses",
    popular: true,
    badge: "Popular",
    color: "blue",
    features: ["5 Websites", "50 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate"],
    allFeatures: [
      "5 Websites", "50 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate",
      "10 Email Accounts", "LiteSpeed + Redis Cache", "WordPress Optimized",
      "99.9% Uptime Guarantee", "Priority Support", "Free Website Migration",
      "Daily Backups", "Advanced Security", "1-Click Installer", "SSH Access",
    ],
  },
  {
    name: "Premium",
    basePrice: 6000,
    description: "For high-traffic websites",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Websites", "100 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate"],
    allFeatures: [
      "Unlimited Websites", "100 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate",
      "Unlimited Email Accounts", "LiteSpeed + Redis + Memcached", "WordPress Optimized",
      "99.99% Uptime Guarantee", "VIP Support (24/7)", "Free Website Migration",
      "Hourly Backups", "Advanced Security + Firewall", "1-Click Installer",
      "SSH + WP-CLI Access", "Free CDN", "Staging Environment",
    ],
  },
]

// Reseller Hosting Plans
const resellerPlans: PricingPlan[] = [
  {
    name: "Alpha Reseller",
    basePrice: 8000,
    description: "Start your hosting business",
    features: ["50 GB SSD Storage", "500 GB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "50 GB SSD Storage", "500 GB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Reseller Support", "Daily Backups", "99.9% Uptime SLA",
    ],
  },
  {
    name: "Master Reseller",
    basePrice: 15000,
    description: "Scale your hosting business",
    popular: true,
    badge: "Most Popular",
    color: "green",
    features: ["100 GB SSD Storage", "1 TB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "1 TB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Priority Reseller Support", "Daily Backups", "99.9% Uptime SLA",
      "Free Website Migration", "Advanced Security",
    ],
  },
  {
    name: "Reseller",
    basePrice: 5000,
    description: "Basic reseller package",
    features: ["25 GB SSD Storage", "250 GB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "25 GB SSD Storage", "250 GB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Email Support", "Daily Backups", "99.9% Uptime SLA",
    ],
  },
]

// VPS Plans
const vpsPlans: PricingPlan[] = [
  {
    name: "VPS Basic",
    basePrice: 12000,
    description: "Entry-level VPS",
    features: ["2 vCPU Cores", "4 GB RAM", "50 GB NVMe SSD", "2 TB Bandwidth"],
    allFeatures: [
      "2 vCPU Cores", "4 GB RAM", "50 GB NVMe SSD", "2 TB Bandwidth",
      "Full Root Access", "Choice of OS", "DDoS Protection", "99.9% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6", "Snapshots", "24/7 Support",
    ],
  },
  {
    name: "VPS Pro",
    basePrice: 20000,
    description: "High-performance VPS",
    popular: true,
    badge: "Popular",
    color: "blue",
    features: ["4 vCPU Cores", "8 GB RAM", "100 GB NVMe SSD", "4 TB Bandwidth"],
    allFeatures: [
      "4 vCPU Cores", "8 GB RAM", "100 GB NVMe SSD", "4 TB Bandwidth",
      "Full Root Access", "Choice of OS", "Advanced DDoS Protection", "99.9% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6", "Automated Backups", "Priority Support",
      "Free cPanel License (Optional)", "Snapshots & Cloning",
    ],
  },
  {
    name: "VPS Elite",
    basePrice: 35000,
    description: "Maximum VPS power",
    badge: "Best Performance",
    color: "orange",
    features: ["8 vCPU Cores", "16 GB RAM", "200 GB NVMe SSD", "8 TB Bandwidth"],
    allFeatures: [
      "8 vCPU Cores", "16 GB RAM", "200 GB NVMe SSD", "8 TB Bandwidth",
      "Full Root Access", "Choice of OS", "Enterprise DDoS Protection", "99.99% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6 (Multiple IPs)", "Automated Backups", "VIP Support",
      "Free cPanel/Plesk License", "Snapshots & Cloning", "Custom Configurations", "Dedicated Support Manager",
    ],
  },
]

function calculatePrice(basePrice: number, period: BillingPeriod) {
  const { discount, months } = billingDiscounts[period]
  const discountedPrice = basePrice * (1 - discount / 100)
  const totalPrice = discountedPrice * months
  return { monthlyPrice: discountedPrice, totalPrice: totalPrice, discount: discount }
}

function PricingCard({ plan, billingPeriod }: { plan: PricingPlan; billingPeriod: BillingPeriod }) {
  const { monthlyPrice, totalPrice, discount } = calculatePrice(plan.basePrice, billingPeriod)
  const isAnnual = billingPeriod === "annually"
  
  return (
    <Card className="group relative overflow-hidden border hover:border-green-500/50 transition-all duration-300">
      {plan.badge && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className={`rounded-full px-3 py-1 text-xs ${
            plan.color === 'blue' ? 'bg-blue-500' :
            plan.color === 'purple' ? 'bg-purple-500' :
            plan.color === 'orange' ? 'bg-orange-500' :
            plan.color === 'green' ? 'bg-green-500' : 'bg-primary'
          }`}>
            {plan.badge}
          </Badge>
        </div>
      )}
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
          <p className="text-xs text-muted-foreground">{plan.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{Math.round(monthlyPrice).toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">FCFA/mo</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-green-500/10 text-green-600 border-green-500/20">
                Save {discount}%
              </Badge>
              <span className="text-xs text-muted-foreground line-through">
                {plan.basePrice.toLocaleString()} FCFA
              </span>
            </div>
          )}
          {billingPeriod !== "monthly" && (
            <p className="text-xs text-muted-foreground mt-1">
              Billed {Math.round(totalPrice).toLocaleString()} FCFA {billingDiscounts[billingPeriod].label.toLowerCase()}
            </p>
          )}
        </div>

        {isAnnual && (
          <div className="mb-4 p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">Free .com domain included</span>
            </div>
          </div>
        )}

        <ul className="space-y-1.5 mb-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mb-3 h-7 text-xs">
              View all {plan.allFeatures.length} features
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{plan.name} - All Features</DialogTitle>
              <DialogDescription>{plan.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {plan.allFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Button asChild className="w-full h-8 text-xs">
          <Link href="/signup">
            Get Started
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "shared-hosting": true,
  })
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({
    "shared-cpanel": true,
  })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="text-xs px-3 py-0.5">
                Transparent Pricing
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Simple, Affordable Pricing
              </h1>
              <p className="text-base text-muted-foreground">
                Choose the perfect plan for your needs. All plans include free SSL, daily backups, and 24/7 support.
              </p>
            </div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="border-b bg-muted/30">
          <div className="container py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {(Object.keys(billingDiscounts) as BillingPeriod[]).map((period) => {
                  const { label, discount } = billingDiscounts[period]
                  return (
                    <button
                      key={period}
                      onClick={() => setBillingPeriod(period)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        billingPeriod === period
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {label}
                      {discount > 0 && (
                        <span className={`ml-1.5 text-xs ${
                          billingPeriod === period ? "text-primary-foreground/80" : "text-green-600"
                        }`}>
                          -{discount}%
                        </span>
                      )}
                      {period === "annually" && (
                        <div className="absolute -top-1.5 -right-1.5">
                          <Gift className="h-3 w-3 text-green-500" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              {billingPeriod === "annually" && (
                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Gift className="h-3 w-3 text-green-600" />
                  Annual billing includes a free .com domain
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hosting Services with Hierarchical Structure */}
        <section className="container py-12 md:py-16">
          <div className="max-w-6xl mx-auto space-y-4">
            
            {/* Shared Hosting */}
            <Collapsible 
              open={openCategories["shared-hosting"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "shared-hosting": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-green-500">Shared Hosting</h2>
                    <Badge className="bg-orange-500 text-xs">Popular</Badge>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["shared-hosting"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* cPanel Subcategory */}
                    <Collapsible 
                      open={openSubcategories["shared-cpanel"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "shared-cpanel": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">cPanel</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["shared-cpanel"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sharedHostingPlans.map((plan) => (
                              <PricingCard key={`cpanel-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* DirectAdmin Subcategory */}
                    <Collapsible 
                      open={openSubcategories["shared-directadmin"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "shared-directadmin": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">DirectAdmin</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["shared-directadmin"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sharedHostingPlans.map((plan) => (
                              <PricingCard key={`directadmin-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Reseller Hosting */}
            <Collapsible 
              open={openCategories["reseller-hosting"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "reseller-hosting": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Reseller Hosting</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["reseller-hosting"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* cPanel Reseller */}
                    <Collapsible 
                      open={openSubcategories["reseller-cpanel"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "reseller-cpanel": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">cPanel</span>
                            <Badge className="bg-blue-500 text-xs">Most Popular</Badge>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["reseller-cpanel"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {resellerPlans.map((plan) => (
                              <PricingCard key={`reseller-cpanel-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* DirectAdmin Reseller */}
                    <Collapsible 
                      open={openSubcategories["reseller-directadmin"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "reseller-directadmin": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">DirectAdmin</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["reseller-directadmin"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {resellerPlans.map((plan) => (
                              <PricingCard key={`reseller-da-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Cloud VPS Reseller */}
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Cloud VPS Reseller</span>
                    </Card>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Cloud VPS Hosting */}
            <Collapsible 
              open={openCategories["cloud-vps"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "cloud-vps": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Cloud VPS Hosting</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["cloud-vps"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* Managed VPS */}
                    <Collapsible 
                      open={openSubcategories["managed-vps"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "managed-vps": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Managed VPS</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["managed-vps"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vpsPlans.map((plan) => (
                              <PricingCard key={`managed-vps-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Unmanaged VPS */}
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Unmanaged VPS</span>
                    </Card>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Dedicated VPS */}
            <Collapsible 
              open={openCategories["dedicated-vps"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "dedicated-vps": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Dedicated VPS</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["dedicated-vps"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Managed Dedicated VPS</span>
                    </Card>
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Unmanaged Dedicated VPS</span>
                    </Card>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Bare Metal Servers */}
            <Collapsible 
              open={openCategories["bare-metal"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "bare-metal": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Bare Metal Servers</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["bare-metal"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Managed Servers</span>
                    </Card>
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">Unmanaged Servers</span>
                    </Card>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* KmerHosting AI */}
            <Collapsible 
              open={openCategories["ai"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "ai": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-green-500">KmerHosting AI</h2>
                    <Badge className="bg-orange-500 text-xs">Popular</Badge>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["ai"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <Card className="p-3">
                      <span className="font-medium text-muted-foreground">AI Website Builder</span>
                    </Card>
                    <Collapsible>
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Free Access Plan</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </Card>
                    </Collapsible>
                    <Collapsible>
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Paid Access</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </Card>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Self-hosted n8n */}
            <Card className="overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-green-500">Self-hosted n8n</h2>
                  <Badge className="bg-orange-500 text-xs">Popular</Badge>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-sm text-muted-foreground">
                  Common questions about our pricing and billing
                </p>
              </div>
              <div className="space-y-3">
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">What payment methods do you accept?</h3>
                  <p className="text-xs text-muted-foreground">
                    We accept Mobile Money (MTN, Orange), credit/debit cards, PayPal, and bank transfers.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-xs text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes are prorated automatically.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">Is there a money-back guarantee?</h3>
                  <p className="text-xs text-muted-foreground">
                    All plans come with a 30-day money-back guarantee. If you're not satisfied, we'll refund you in full.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">When do I get the free domain?</h3>
                  <p className="text-xs text-muted-foreground">
                    Free .com domain is included only with annual billing plans. You can register or transfer a domain during signup.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Still Have Questions?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our expert team is ready to help you choose the perfect hosting solution
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="h-9">
                  <Link href="/support">
                    Contact Sales
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-9">
                  <Link href="/support/live-chat">Start Live Chat</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
