"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import Link from "next/link"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
  href: string
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card className={plan.popular ? "border-primary shadow-lg relative" : ""}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="pt-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-2">{plan.period}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" size="lg" asChild>
          <Link href={plan.href}>{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Generic Shared Hosting Plan (same for all types)
const getSharedHostingPlans = (type: string): PricingPlan[] => [
  {
    name: `${type} Starter`,
    price: "1,158 FCFA",
    period: "/month",
    description: `Perfect for ${type.toLowerCase()} websites`,
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      `Optimized for ${type}`,
      "cPanel Control Panel",
      "99.9% Uptime Guarantee",
    ],
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: `${type} Business`,
    price: "2,500 FCFA",
    period: "/month",
    description: `Professional ${type.toLowerCase()} hosting`,
    features: [
      "5 Websites",
      "50 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL + Domain",
      "10 Email Accounts",
      "LiteSpeed + Redis",
      `${type} Optimizations`,
      "Priority Support",
    ],
    popular: true,
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: `${type} Premium`,
    price: "5,000 FCFA",
    period: "/month",
    description: `Maximum ${type.toLowerCase()} performance`,
    features: [
      "Unlimited Websites",
      "100 GB SSD Storage",
      "Unlimited Everything",
      "Free SSL + Domain",
      "Advanced Security",
      "Daily Backups",
      "24/7 Premium Support",
    ],
    cta: "Get Started",
    href: "/signup",
  },
]

// DirectAdmin versions (slightly cheaper)
const getDirectAdminPlans = (type: string): PricingPlan[] => [
  {
    name: `${type} Starter`,
    price: "950 FCFA",
    period: "/month",
    description: `Budget-friendly ${type.toLowerCase()} hosting`,
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      `Optimized for ${type}`,
      "DirectAdmin Panel",
      "99.9% Uptime",
    ],
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: `${type} Pro`,
    price: "2,000 FCFA",
    period: "/month",
    description: `Professional ${type.toLowerCase()} hosting`,
    features: [
      "5 Websites",
      "50 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL + Domain",
      "10 Email Accounts",
      "LiteSpeed Server",
      `${type} Optimizations`,
    ],
    popular: true,
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: `${type} Enterprise`,
    price: "4,500 FCFA",
    period: "/month",
    description: `Enterprise ${type.toLowerCase()} solution`,
    features: [
      "Unlimited Websites",
      "100 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL + Domain",
      "Advanced Features",
      "Priority Support",
    ],
    cta: "Get Started",
    href: "/signup",
  },
]

// cPanel Reseller Plans - 4 levels each for 3 tiers
const cPanelResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Reseller",
    price: "10,000 FCFA",
    period: "/month",
    description: "Entry-level reseller hosting",
    features: [
      "30 GB SSD Storage",
      "300 GB Bandwidth",
      "Free WHMCS License",
      "cPanel/WHM Control",
      "White Label Hosting",
      "Unlimited Client Accounts",
      "Free SSL Certificates",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Reseller",
    price: "15,000 FCFA",
    period: "/month",
    description: "Growing reseller business",
    features: [
      "60 GB SSD Storage",
      "600 GB Bandwidth",
      "Free WHMCS License",
      "cPanel/WHM Control",
      "White Label Hosting",
      "Unlimited Client Accounts",
      "Free SSL Certificates",
      "LiteSpeed Server",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Reseller",
    price: "22,000 FCFA",
    period: "/month",
    description: "Professional reseller platform",
    features: [
      "100 GB SSD Storage",
      "1 TB Bandwidth",
      "Free WHMCS License",
      "cPanel/WHM Control",
      "White Label Hosting",
      "Unlimited Client Accounts",
      "Free SSL Certificates",
      "LiteSpeed + Redis",
      "Priority Support",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Reseller",
    price: "30,000 FCFA",
    period: "/month",
    description: "Premium reseller solution",
    features: [
      "150 GB SSD Storage",
      "1.5 TB Bandwidth",
      "Free WHMCS License",
      "cPanel/WHM Control",
      "White Label Hosting",
      "Unlimited Client Accounts",
      "Free SSL Certificates",
      "LiteSpeed + Redis",
      "Priority Support",
      "Daily Backups",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

const cPanelMasterResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Master",
    price: "20,000 FCFA",
    period: "/month",
    description: "Start master reselling",
    features: [
      "80 GB SSD Storage",
      "800 GB Bandwidth",
      "Free WHMCS License",
      "Master Reseller Access",
      "Create Sub-Resellers",
      "cPanel/WHM Control",
      "White Label Hosting",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Master",
    price: "30,000 FCFA",
    period: "/month",
    description: "Scale your reseller network",
    features: [
      "150 GB SSD Storage",
      "1.5 TB Bandwidth",
      "Free WHMCS License",
      "Master Reseller Access",
      "Create Sub-Resellers",
      "LiteSpeed + Redis",
      "Priority Support",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Master",
    price: "42,000 FCFA",
    period: "/month",
    description: "Professional master reseller",
    features: [
      "250 GB SSD Storage",
      "2.5 TB Bandwidth",
      "Free WHMCS License",
      "Master Reseller Access",
      "Unlimited Sub-Resellers",
      "LiteSpeed + Redis",
      "Priority Support",
      "Daily Backups",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Master",
    price: "55,000 FCFA",
    period: "/month",
    description: "Elite master reseller platform",
    features: [
      "400 GB SSD Storage",
      "4 TB Bandwidth",
      "Free WHMCS License",
      "Master Reseller Access",
      "Unlimited Sub-Resellers",
      "LiteSpeed + Redis",
      "Dedicated Support",
      "Daily Backups",
      "99.99% SLA",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

const cPanelAlphaResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Alpha",
    price: "40,000 FCFA",
    period: "/month",
    description: "Entry alpha reseller",
    features: [
      "200 GB SSD Storage",
      "2 TB Bandwidth",
      "Free WHMCS License",
      "Alpha Reseller Rights",
      "Unlimited Sub-Resellers",
      "cPanel/WHM Control",
      "White Label Hosting",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Alpha",
    price: "60,000 FCFA",
    period: "/month",
    description: "Growing alpha network",
    features: [
      "350 GB SSD Storage",
      "3.5 TB Bandwidth",
      "Free WHMCS License",
      "Alpha Reseller Rights",
      "Unlimited Sub-Resellers",
      "LiteSpeed + Redis",
      "Priority Support",
      "Daily Backups",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Alpha",
    price: "85,000 FCFA",
    period: "/month",
    description: "Professional alpha platform",
    features: [
      "500 GB SSD Storage",
      "5 TB Bandwidth",
      "Free WHMCS License",
      "Alpha Reseller Rights",
      "Unlimited Everything",
      "LiteSpeed + Redis",
      "Dedicated Support Team",
      "Daily Backups",
      "99.99% SLA",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Alpha",
    price: "110,000 FCFA",
    period: "/month",
    description: "Ultimate alpha enterprise",
    features: [
      "750 GB SSD Storage",
      "7.5 TB Bandwidth",
      "Free WHMCS License",
      "Alpha Reseller Rights",
      "Unlimited Everything",
      "LiteSpeed + Redis + Memcached",
      "Dedicated Account Manager",
      "Hourly Backups",
      "99.99% SLA",
      "Custom Configurations",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

// DirectAdmin Reseller Plans - 4 levels each for 3 tiers (cheaper than cPanel)
const directAdminResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Reseller",
    price: "8,000 FCFA",
    period: "/month",
    description: "Budget reseller hosting",
    features: [
      "30 GB SSD Storage",
      "300 GB Bandwidth",
      "DirectAdmin Control",
      "White Label Hosting",
      "Unlimited Clients",
      "Free SSL Certificates",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Reseller",
    price: "12,000 FCFA",
    period: "/month",
    description: "Affordable reseller growth",
    features: [
      "60 GB SSD Storage",
      "600 GB Bandwidth",
      "DirectAdmin Control",
      "White Label Hosting",
      "Unlimited Clients",
      "Free SSL Certificates",
      "LiteSpeed Server",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Reseller",
    price: "18,000 FCFA",
    period: "/month",
    description: "Professional reseller hosting",
    features: [
      "100 GB SSD Storage",
      "1 TB Bandwidth",
      "DirectAdmin Control",
      "White Label Hosting",
      "Unlimited Clients",
      "Free SSL Certificates",
      "LiteSpeed Server",
      "Priority Support",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Reseller",
    price: "25,000 FCFA",
    period: "/month",
    description: "Premium reseller platform",
    features: [
      "150 GB SSD Storage",
      "1.5 TB Bandwidth",
      "DirectAdmin Control",
      "White Label Hosting",
      "Unlimited Clients",
      "Free SSL Certificates",
      "LiteSpeed Server",
      "Priority Support",
      "Daily Backups",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

const directAdminMasterResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Master",
    price: "16,000 FCFA",
    period: "/month",
    description: "Entry master reseller",
    features: [
      "80 GB SSD Storage",
      "800 GB Bandwidth",
      "DirectAdmin Control",
      "Master Reseller Access",
      "Create Sub-Resellers",
      "White Label Hosting",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Master",
    price: "25,000 FCFA",
    period: "/month",
    description: "Growing master network",
    features: [
      "150 GB SSD Storage",
      "1.5 TB Bandwidth",
      "DirectAdmin Control",
      "Master Reseller Access",
      "Create Sub-Resellers",
      "LiteSpeed Server",
      "Priority Support",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Master",
    price: "35,000 FCFA",
    period: "/month",
    description: "Professional master platform",
    features: [
      "250 GB SSD Storage",
      "2.5 TB Bandwidth",
      "DirectAdmin Control",
      "Master Reseller Access",
      "Unlimited Sub-Resellers",
      "LiteSpeed Server",
      "Priority Support",
      "Daily Backups",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Master",
    price: "45,000 FCFA",
    period: "/month",
    description: "Elite master reseller",
    features: [
      "400 GB SSD Storage",
      "4 TB Bandwidth",
      "DirectAdmin Control",
      "Master Reseller Access",
      "Unlimited Sub-Resellers",
      "LiteSpeed Server",
      "Dedicated Support",
      "Daily Backups",
      "99.99% SLA",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

const directAdminAlphaResellerBronze: PricingPlan[] = [
  {
    name: "Bronze Alpha",
    price: "32,000 FCFA",
    period: "/month",
    description: "Budget alpha reseller",
    features: [
      "200 GB SSD Storage",
      "2 TB Bandwidth",
      "DirectAdmin Control",
      "Alpha Reseller Rights",
      "Unlimited Sub-Resellers",
      "White Label Hosting",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Silver Alpha",
    price: "50,000 FCFA",
    period: "/month",
    description: "Affordable alpha network",
    features: [
      "350 GB SSD Storage",
      "3.5 TB Bandwidth",
      "DirectAdmin Control",
      "Alpha Reseller Rights",
      "Unlimited Sub-Resellers",
      "LiteSpeed Server",
      "Priority Support",
      "Daily Backups",
    ],
    popular: true,
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Gold Alpha",
    price: "70,000 FCFA",
    period: "/month",
    description: "Professional alpha solution",
    features: [
      "500 GB SSD Storage",
      "5 TB Bandwidth",
      "DirectAdmin Control",
      "Alpha Reseller Rights",
      "Unlimited Everything",
      "LiteSpeed Server",
      "Dedicated Support Team",
      "Daily Backups",
      "99.99% SLA",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
  {
    name: "Platinum Alpha",
    price: "90,000 FCFA",
    period: "/month",
    description: "Ultimate alpha enterprise",
    features: [
      "750 GB SSD Storage",
      "7.5 TB Bandwidth",
      "DirectAdmin Control",
      "Alpha Reseller Rights",
      "Unlimited Everything",
      "LiteSpeed + Advanced Cache",
      "Dedicated Account Manager",
      "Hourly Backups",
      "99.99% SLA",
      "Custom Configurations",
    ],
    cta: "Start Reselling",
    href: "/signup",
  },
]

// Cloud VPS Plans - Unmanaged (cheaper)
const cloudVpsUnmanagedPlans: PricingPlan[] = [
  {
    name: "VPS Starter",
    price: "8,000 FCFA",
    period: "/month",
    description: "Self-managed entry VPS",
    features: [
      "2 vCPU Cores",
      "4 GB RAM",
      "50 GB SSD",
      "2 TB Bandwidth",
      "Full Root Access",
      "Choice of OS",
      "Community Support",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "VPS Pro",
    price: "15,000 FCFA",
    period: "/month",
    description: "Self-managed production VPS",
    features: [
      "4 vCPU Cores",
      "8 GB RAM",
      "100 GB SSD",
      "4 TB Bandwidth",
      "Full Root Access",
      "DDoS Protection",
      "Priority Support",
    ],
    popular: true,
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "VPS Enterprise",
    price: "30,000 FCFA",
    period: "/month",
    description: "Self-managed high-performance",
    features: [
      "8 vCPU Cores",
      "16 GB RAM",
      "200 GB SSD",
      "8 TB Bandwidth",
      "Full Root Access",
      "Advanced DDoS Protection",
      "99.99% SLA",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
]

// Cloud VPS Plans - Managed (more expensive)
const cloudVpsManagedPlans: PricingPlan[] = [
  {
    name: "VPS Starter",
    price: "12,000 FCFA",
    period: "/month",
    description: "Fully managed entry VPS",
    features: [
      "2 vCPU Cores",
      "4 GB RAM",
      "50 GB SSD",
      "2 TB Bandwidth",
      "Full Root Access",
      "Choice of OS",
      "Managed by Experts",
      "Security Updates Included",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "VPS Pro",
    price: "22,000 FCFA",
    period: "/month",
    description: "Fully managed production VPS",
    features: [
      "4 vCPU Cores",
      "8 GB RAM",
      "100 GB SSD",
      "4 TB Bandwidth",
      "Free cPanel License",
      "Managed Support 24/7",
      "DDoS Protection",
      "Performance Optimization",
    ],
    popular: true,
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "VPS Enterprise",
    price: "42,000 FCFA",
    period: "/month",
    description: "Fully managed high-performance",
    features: [
      "8 vCPU Cores",
      "16 GB RAM",
      "200 GB SSD",
      "8 TB Bandwidth",
      "Free cPanel License",
      "Dedicated Support Team",
      "Advanced DDoS Protection",
      "Daily Backups",
      "99.99% SLA",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
]

// Dedicated VPS Plans - Unmanaged (cheaper)
const dedicatedVpsUnmanagedPlans: PricingPlan[] = [
  {
    name: "Dedicated VPS Basic",
    price: "25,000 FCFA",
    period: "/month",
    description: "Self-managed dedicated VPS",
    features: [
      "4 Dedicated CPU Cores",
      "16 GB Dedicated RAM",
      "150 GB NVMe SSD",
      "5 TB Bandwidth",
      "Full Root Access",
      "Advanced DDoS Protection",
      "99.9% Uptime SLA",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "Dedicated VPS Pro",
    price: "45,000 FCFA",
    period: "/month",
    description: "Self-managed high-performance",
    features: [
      "8 Dedicated CPU Cores",
      "32 GB Dedicated RAM",
      "300 GB NVMe SSD",
      "10 TB Bandwidth",
      "Full Root Access",
      "Advanced DDoS Protection",
      "Priority Support",
      "99.99% SLA",
    ],
    popular: true,
    cta: "Deploy Now",
    href: "/signup",
  },
]

// Dedicated VPS Plans - Managed (more expensive)
const dedicatedVpsManagedPlans: PricingPlan[] = [
  {
    name: "Dedicated VPS Basic",
    price: "35,000 FCFA",
    period: "/month",
    description: "Fully managed dedicated VPS",
    features: [
      "4 Dedicated CPU Cores",
      "16 GB Dedicated RAM",
      "150 GB NVMe SSD",
      "5 TB Bandwidth",
      "Fully Managed 24/7",
      "Advanced DDoS Protection",
      "Security Updates Included",
      "99.9% Uptime SLA",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
  {
    name: "Dedicated VPS Pro",
    price: "60,000 FCFA",
    period: "/month",
    description: "Fully managed enterprise VPS",
    features: [
      "8 Dedicated CPU Cores",
      "32 GB Dedicated RAM",
      "300 GB NVMe SSD",
      "10 TB Bandwidth",
      "Fully Managed 24/7",
      "Dedicated Support Team",
      "Daily Backups",
      "Performance Optimization",
      "99.99% SLA",
    ],
    popular: true,
    cta: "Deploy Now",
    href: "/signup",
  },
]

// Bare Metal Server Plans - Unmanaged (cheaper)
const bareMetalUnmanagedPlans: PricingPlan[] = [
  {
    name: "Server E3",
    price: "75,000 FCFA",
    period: "/month",
    description: "Self-managed dedicated server",
    features: [
      "Intel Xeon E3 Processor",
      "32 GB DDR4 RAM",
      "1 TB NVMe SSD",
      "20 TB Bandwidth",
      "Full Hardware Control",
      "Root Access",
      "99.9% Uptime SLA",
    ],
    cta: "Order Now",
    href: "/signup",
  },
  {
    name: "Server E5",
    price: "150,000 FCFA",
    period: "/month",
    description: "Self-managed high-performance",
    features: [
      "Intel Xeon E5 Processor",
      "64 GB DDR4 RAM",
      "2x 1TB NVMe SSD RAID",
      "Unlimited Bandwidth",
      "Full Hardware Control",
      "Root Access",
      "99.99% Uptime SLA",
    ],
    popular: true,
    cta: "Order Now",
    href: "/signup",
  },
]

// Bare Metal Server Plans - Managed (more expensive)
const bareMetalManagedPlans: PricingPlan[] = [
  {
    name: "Server E3",
    price: "95,000 FCFA",
    period: "/month",
    description: "Fully managed dedicated server",
    features: [
      "Intel Xeon E3 Processor",
      "32 GB DDR4 RAM",
      "1 TB NVMe SSD",
      "20 TB Bandwidth",
      "Full Hardware Control",
      "Managed 24/7",
      "Security Updates",
      "Daily Backups",
      "99.9% Uptime SLA",
    ],
    cta: "Order Now",
    href: "/signup",
  },
  {
    name: "Server E5",
    price: "190,000 FCFA",
    period: "/month",
    description: "Fully managed enterprise server",
    features: [
      "Intel Xeon E5 Processor",
      "64 GB DDR4 RAM",
      "2x 1TB NVMe SSD RAID",
      "Unlimited Bandwidth",
      "Fully Managed 24/7",
      "Dedicated Support Team",
      "Enterprise Security",
      "Hourly Backups",
      "99.99% Uptime SLA",
    ],
    popular: true,
    cta: "Order Now",
    href: "/signup",
  },
]

// AI Services Plans
const aiFreeModels: PricingPlan[] = [
  {
    name: "Free AI Access",
    price: "Free",
    period: "forever",
    description: "Access to 8 AI models",
    features: [
      "Llama Series",
      "Deepseek Series",
      "GPT Series",
      "Qwen, Mistral, Gemma",
      "Phi & Code Llama",
      "Limited Daily Requests",
    ],
    cta: "Start Free",
    href: "/signup",
  },
]

const aiPaidModels: PricingPlan[] = [
  {
    name: "AI Pro",
    price: "10,000 FCFA",
    period: "/month",
    description: "Premium AI models",
    features: [
      "All Free Models",
      "Claude Series",
      "Command R+",
      "GPT-4 & GPT-4 Turbo",
      "Unlimited Requests",
      "API Access",
      "Priority Processing",
    ],
    popular: true,
    cta: "Upgrade Now",
    href: "/signup",
  },
  {
    name: "AI Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Custom AI solutions",
    features: [
      "All Premium Models",
      "Dedicated Resources",
      "Custom Model Training",
      "SLA Guarantees",
      "Dedicated Support",
      "On-Premise Options",
    ],
    cta: "Contact Sales",
    href: "/support",
  },
]

// Additional Services
const additionalServices: PricingPlan[] = [
  {
    name: "SSL Certificate",
    price: "5,000 FCFA",
    period: "/year",
    description: "Secure your website",
    features: [
      "Domain Validation",
      "256-bit Encryption",
      "Trust Seal",
      "Unlimited Reissues",
    ],
    cta: "Buy Now",
    href: "/products/ssl-certificates",
  },
  {
    name: "Email Hosting",
    price: "2,000 FCFA",
    period: "/month",
    description: "Professional email",
    features: [
      "Custom Domain Email",
      "10 GB Storage",
      "Spam Protection",
      "Webmail Access",
    ],
    cta: "Get Started",
    href: "/products/email-hosting",
  },
  {
    name: "Database Hosting",
    price: "3,000 FCFA",
    period: "/month",
    description: "Managed databases",
    features: [
      "MySQL/PostgreSQL",
      "Automatic Backups",
      "High Availability",
      "Performance Tuning",
    ],
    cta: "Get Started",
    href: "/products/database-hosting",
  },
  {
    name: "n8n Workflow",
    price: "8,000 FCFA",
    period: "/month",
    description: "Self-hosted automation",
    features: [
      "Visual Workflow Editor",
      "400+ Integrations",
      "Self-hosted Solution",
      "Full Privacy Control",
    ],
    cta: "Deploy Now",
    href: "/signup",
  },
]

export default function PricingPage() {
  const [cloudVpsType, setCloudVpsType] = useState<"unmanaged" | "managed">("unmanaged")
  const [dedicatedVpsType, setDedicatedVpsType] = useState<"unmanaged" | "managed">("unmanaged")
  const [bareMetalType, setBareMetalType] = useState<"unmanaged" | "managed">("unmanaged")

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Choose Your Perfect Plan
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive pricing for all our hosting, VPS, AI services, and more. All plans include 24/7 support.
              </p>
            </div>
          </div>
        </section>

        {/* Main Pricing Content */}
        <section className="container py-16 md:py-24">
          <Tabs defaultValue="shared" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto mb-12 gap-2">
              <TabsTrigger value="shared" className="text-xs md:text-sm py-2">
                Shared Hosting
              </TabsTrigger>
              <TabsTrigger value="reseller" className="text-xs md:text-sm py-2">
                Reseller
              </TabsTrigger>
              <TabsTrigger value="vps" className="text-xs md:text-sm py-2">
                VPS
              </TabsTrigger>
              <TabsTrigger value="dedicated" className="text-xs md:text-sm py-2">
                Dedicated
              </TabsTrigger>
              <TabsTrigger value="ai" className="text-xs md:text-sm py-2">
                AI Services
              </TabsTrigger>
              <TabsTrigger value="extras" className="text-xs md:text-sm py-2">
                Extras
              </TabsTrigger>
            </TabsList>

            {/* SHARED HOSTING TAB */}
            <TabsContent value="shared" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">Shared Hosting Plans</h2>
                <p className="text-muted-foreground">
                  Choose your hosting type and control panel
                </p>
              </div>

              <Accordion type="single" collapsible className="max-w-7xl mx-auto space-y-4">
                {/* cPanel Shared Hosting */}
                <AccordionItem value="cpanel" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">cPanel Shared Hosting</span>
                        <Badge>Popular</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    {/* WordPress Hosting */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">WordPress Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("WordPress").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Node.js Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Node.js Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("Node.js").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* PHP Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">PHP Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("PHP").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Python Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Python Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("Python").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Ruby Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Ruby Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("Ruby").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* E-commerce Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">E-commerce Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("E-commerce").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* WooCommerce Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">WooCommerce Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSharedHostingPlans("WooCommerce").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* DirectAdmin Shared Hosting */}
                <AccordionItem value="directadmin" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">DirectAdmin Shared Hosting</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    {/* WordPress Hosting */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">WordPress Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("WordPress").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Node.js Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Node.js Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("Node.js").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* PHP Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">PHP Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("PHP").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Python Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Python Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("Python").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* E-commerce Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">E-commerce Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("E-commerce").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* WooCommerce Hosting */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">WooCommerce Hosting</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDirectAdminPlans("WooCommerce").map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* RESELLER HOSTING TAB */}
            <TabsContent value="reseller" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">Reseller Hosting Plans</h2>
                <p className="text-muted-foreground">
                  4-tier plans (Bronze, Silver, Gold, Platinum) for each reseller level
                </p>
              </div>

              <Accordion type="single" collapsible className="max-w-7xl mx-auto space-y-4">
                {/* cPanel Reseller */}
                <AccordionItem value="reseller-cpanel" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">cPanel Reseller Hosting</span>
                        <Badge variant="secondary">Most Popular</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    {/* Standard Reseller */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">Standard Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cPanelResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Master Reseller */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Master Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cPanelMasterResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Alpha Reseller */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Alpha Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cPanelAlphaResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* DirectAdmin Reseller */}
                <AccordionItem value="reseller-directadmin" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">DirectAdmin Reseller Hosting</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-8">
                    {/* Standard Reseller */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">Standard Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directAdminResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Master Reseller */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Master Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directAdminMasterResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>

                    {/* Alpha Reseller */}
                    <div className="border-t pt-8">
                      <h4 className="text-lg font-semibold mb-4 text-center">Alpha Reseller</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directAdminAlphaResellerBronze.map((plan) => (
                          <PricingCard key={plan.name} plan={plan} />
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Cloud VPS Reseller */}
                <AccordionItem value="reseller-cloudvps" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">Cloud VPS Reseller</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-6">
                      <Card className="max-w-md mx-auto">
                        <CardHeader>
                          <CardTitle className="text-2xl">Cloud VPS Reseller</CardTitle>
                          <CardDescription>Resell VPS instances with full control</CardDescription>
                          <div className="pt-4">
                            <span className="text-4xl font-bold">Custom</span>
                            <span className="text-muted-foreground ml-2">pricing</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">Resell VPS Instances</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">Custom Resource Allocation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">White Label Solution</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">API Access</span>
                            </li>
                          </ul>
                          <Button className="w-full" size="lg" asChild>
                            <Link href="/support">Contact Sales</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* VPS TAB */}
            <TabsContent value="vps" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">VPS Hosting Plans</h2>
                <p className="text-muted-foreground">
                  Scalable virtual private servers with full control
                </p>
              </div>

              <Accordion type="single" collapsible defaultValue="cloud-vps" className="max-w-7xl mx-auto space-y-4">
                <AccordionItem value="cloud-vps" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <span className="text-xl font-semibold">Cloud VPS Hosting</span>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Toggle for Managed/Unmanaged */}
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                        <button
                          onClick={() => setCloudVpsType("unmanaged")}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            cloudVpsType === "unmanaged"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Unmanaged
                        </button>
                        <button
                          onClick={() => setCloudVpsType("managed")}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            cloudVpsType === "managed"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Managed
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                      {(cloudVpsType === "unmanaged" ? cloudVpsUnmanagedPlans : cloudVpsManagedPlans).map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-6 text-center">
                      {cloudVpsType === "unmanaged" 
                        ? "Self-managed plans - You have full control and responsibility" 
                        : "Fully managed plans - We handle server management and updates"}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dedicated-vps" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <span className="text-xl font-semibold">Dedicated VPS</span>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Toggle for Managed/Unmanaged */}
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                        <button
                          onClick={() => setDedicatedVpsType("unmanaged")}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            dedicatedVpsType === "unmanaged"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Unmanaged
                        </button>
                        <button
                          onClick={() => setDedicatedVpsType("managed")}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            dedicatedVpsType === "managed"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Managed
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                      {(dedicatedVpsType === "unmanaged" ? dedicatedVpsUnmanagedPlans : dedicatedVpsManagedPlans).map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-6 text-center">
                      {dedicatedVpsType === "unmanaged"
                        ? "Self-managed with dedicated CPU and RAM resources"
                        : "Fully managed with dedicated resources and 24/7 support"}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* DEDICATED SERVERS TAB */}
            <TabsContent value="dedicated" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">Bare Metal Servers</h2>
                <p className="text-muted-foreground">
                  Ultimate performance with dedicated physical hardware
                </p>
              </div>

              {/* Toggle for Managed/Unmanaged */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                  <button
                    onClick={() => setBareMetalType("unmanaged")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      bareMetalType === "unmanaged"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Unmanaged
                  </button>
                  <button
                    onClick={() => setBareMetalType("managed")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      bareMetalType === "managed"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Managed
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {(bareMetalType === "unmanaged" ? bareMetalUnmanagedPlans : bareMetalManagedPlans).map((plan) => (
                  <PricingCard key={plan.name} plan={plan} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                {bareMetalType === "unmanaged"
                  ? "Self-managed dedicated servers - Full hardware control and responsibility"
                  : "Fully managed dedicated servers - We handle all server management 24/7"}
                {" | Custom configurations available."}
              </p>
            </TabsContent>

            {/* AI SERVICES TAB */}
            <TabsContent value="ai" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">AI Services</h2>
                <p className="text-muted-foreground">
                  Access cutting-edge AI models and automation tools
                </p>
              </div>

              <Accordion type="single" collapsible className="max-w-7xl mx-auto space-y-4">
                <AccordionItem value="ai-models" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">KmerHosting AI - Model Access</span>
                        <Badge>Popular</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-8 pt-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Free Access Plan</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {aiFreeModels.map((plan) => (
                            <PricingCard key={plan.name} plan={plan} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Paid Access Plans</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {aiPaidModels.map((plan) => (
                            <PricingCard key={plan.name} plan={plan} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-builder" className="border-2 border-green-500/20 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <span className="text-xl font-semibold">AI Website Builder</span>
                      <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-500 font-medium">
                        <ChevronDown className="h-4 w-4" />
                        <span>Click here to show more plans</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-6">
                      <Card className="max-w-md mx-auto">
                        <CardHeader>
                          <CardTitle className="text-2xl">AI Website Builder</CardTitle>
                          <CardDescription>Build websites with AI assistance</CardDescription>
                          <div className="pt-4">
                            <span className="text-4xl font-bold">Included</span>
                            <span className="text-muted-foreground ml-2">with hosting</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">AI-Powered Design</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">Content Generation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">Drag & Drop Editor</span>
                            </li>
                          </ul>
                          <Button className="w-full" size="lg" asChild>
                            <Link href="/signup">Try it for free</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* EXTRAS TAB */}
            <TabsContent value="extras" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-2">Additional Services</h2>
                <p className="text-muted-foreground">
                  Enhance your hosting with premium add-ons
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {additionalServices.map((plan) => (
                  <PricingCard key={plan.name} plan={plan} />
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted/50 rounded-lg max-w-2xl mx-auto text-center">
                <h3 className="text-lg font-semibold mb-2">Domain Registration</h3>
                <p className="text-muted-foreground mb-4">
                  Register your perfect domain from 6,500 FCFA/year
                </p>
                <Button asChild>
                  <Link href="/domain-search">Search Domains</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Need Help Choosing?
              </h2>
              <p className="text-lg opacity-90">
                Our expert team is ready to help you find the perfect solution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/support">
                    Contact Sales Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="/products">View All Products</Link>
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
