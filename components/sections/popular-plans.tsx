"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Server, 
  Zap, 
  Bot, 
  Workflow, 
  Globe,
  ArrowRight,
  Check,
  Users,
  Crown,
  Sparkles
} from "lucide-react"

interface Plan {
  id: string
  name: string
  tagline: string
  description: string
  icon: React.ElementType
  features: string[]
  href: string
  popular?: boolean
  gradient: string
  iconBg: string
}

const popularPlans: Plan[] = [
  {
    id: "cpanel-reseller",
    name: "cPanel Reseller Hosting",
    tagline: "Build Your Hosting Business",
    description: "Start your own web hosting company with our cPanel Reseller packages. Get WHM access to create unlimited client accounts, manage resources, and build your brand. Perfect for web agencies, developers, and entrepreneurs looking to offer hosting services under their own brand with full white-label capabilities.",
    icon: Users,
    features: [
      "WHM Control Panel Access",
      "Create Unlimited cPanel Accounts",
      "White-Label Branding",
      "Private Name Servers",
      "24/7 Technical Support"
    ],
    href: "/products/reseller/cpanel/reseller",
    popular: true,
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    id: "master-reseller",
    name: "cPanel Master Reseller",
    tagline: "Resell Reseller Hosting",
    description: "Take your hosting business to the next level with Master Reseller hosting. Create and manage your own reseller clients who can then create their own hosting customers. Includes advanced WHM features, priority support, and higher resource allocations. Ideal for established hosting businesses looking to scale exponentially.",
    icon: Crown,
    features: [
      "Create Reseller Accounts",
      "Multi-Tier Management",
      "Advanced WHM Features",
      "Priority Support & SLA",
      "Higher Resource Limits",
      "Dedicated Account Manager"
    ],
    href: "/products/reseller/cpanel/master",
    popular: true,
    gradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    id: "kmerhosting-ai",
    name: "KmerHosting AI",
    tagline: "AI-Powered Solutions",
    description: "Access cutting-edge AI models including GPT, Claude, Llama, Deepseek, and more. Build intelligent applications with our API-first platform featuring both free and paid tiers. Perfect for developers and businesses integrating AI capabilities into their products.",
    icon: Bot,
    features: [
      "Multiple AI Models (GPT, Claude, Llama)",
      "Free & Paid Access Tiers",
      "RESTful API Integration",
      "AI Website Builder Included",
      "Generous Token Limits",
      "Real-time Streaming Responses"
    ],
    href: "/products/ai/website-builder",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-500/10 text-[#07C983] dark:text-[#07C983]"
  },
  {
    id: "self-hosted-n8n",
    name: "Self-Hosted n8n",
    tagline: "Workflow Automation Platform",
    description: "Deploy your own n8n instance for powerful workflow automation. Connect 400+ services and create complex automations without vendor lock-in. We handle the infrastructure, updates, and security while you focus on building workflows. Includes dedicated resources, automatic backups, and SSL certificates.",
    icon: Workflow,
    features: [
      "Fully Managed n8n Instance",
      "400+ Service Integrations",
      "No Vendor Lock-In",
      "Automatic Backups & Updates",
      "Custom Domain & SSL",
      "Dedicated Resources"
    ],
    href: "/products/n8n",
    popular: true,
    gradient: "from-orange-500/10 to-red-500/10",
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  },
  {
    id: "shared-hosting",
    name: "Shared Hosting",
    tagline: "PHP, WordPress & More",
    description: "Affordable and reliable shared hosting with support for PHP, Node.js, Python, Ruby, and WordPress. One-click WordPress installation, free SSL certificates, and daily backups. Perfect for personal websites, blogs, and small business sites.",
    icon: Globe,
    features: [
      "PHP, Node.js, Python, Ruby Support",
      "One-Click WordPress Install",
      "Free SSL Certificate",
      "Daily Automated Backups",
      "DirectAdmin or cPanel",
      "99.9% Uptime Guarantee"
    ],
    href: "/pricing",
    gradient: "from-indigo-500/10 to-blue-500/10",
    iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  }
]

export function PopularPlans() {
  return (
    <section id="popular-plans" className="py-16 bg-background border-y border-border" aria-labelledby="popular-plans-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="h-3 w-3 mr-1" />
            Popular Right Now
          </Badge>
          <h2 id="popular-plans-heading" className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Our Most Popular Hosting Plans
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of customers worldwide
          </p>
        </header>

        {/* Plans Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPlans.map((plan) => (
              <article
                key={plan.id}
                className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                      Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${plan.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold truncate">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Description - Compact */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {plan.description}
                  </p>

                  {/* Features - Compact */}
                  <ul className="space-y-1.5">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <Check className="h-3 w-3 text-[#07C983] dark:text-[#07C983] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground leading-tight">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-xs text-muted-foreground/60 pl-5">
                        +{plan.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <Button asChild size="sm" className="w-full h-8 text-xs">
                    <Link href={plan.href} className="flex items-center justify-center gap-1">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/products" className="gap-2">
              View All Products
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
