"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Compass as Wordpress, Cloud, ArrowRight, Workflow, Brain, Users } from "lucide-react"
import Link from "next/link"
export function HostingTypes() {
  const hostingTypes = [
    {
      icon: Server,
      title: "Shared Hosting",
      description: "Perfect for starter websites",
      features: [
        "Free .com Domain",
        "Free SSL Certificate",
        "10+ Pro Email Addresses",
        "Unlimited Bandwidth",
        "Unlimited Websites",
        "Daily Backups",
        "SSD NVMe Storage"
      ],
      link: "/products/shared",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Wordpress,
      title: "WordPress Hosting",
      description: "Optimized for WordPress sites",
      features: [
        "Free .com Domain",
        "Free SSL Certificate",
        "10+ Pro Email Addresses",
        "WordPress auto-updates",
        "Enhanced security",
        "1-click WordPress installer"
      ],
      link: "/products/wordpress",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: "VPS Hosting",
      description: "Scalable virtual private servers",
      features: [
        "Full root access",
        "Dedicated resources",
        "Custom OS installation",
        "High-performance SSD",
        "99.9% uptime SLA",
        "24/7 monitoring",
        "Scalable resources"
      ],
      link: "/products/vps",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Reseller Hosting",
      description: "Start your hosting business",
      features: [
        "DirectAdmin control panel",
        "White-label branding",
        "Free SSL for clients",
        "Private nameservers",
        "Blesta billing system",
        "Priority support",
        "4 reseller packages"
      ],
      link: "/products/reseller",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Workflow,
      title: "Self-hosted n8n",
      description: "AI workflow automation",
      features: [
        "Auto-installed n8n",
        "API integration ready",
        "Workflow automation",
        "Node-based editor",
        "Community workflows",
        "Regular updates",
        "Backup included"
      ],
      link: "/products/n8n",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Brain,
      title: "LLM Hosting",
      description: "Host your language models",
      features: [
        "Multiple LLM models",
        "API access included",
        "Pre-installed setup",
        "GPU acceleration",
        "Model fine-tuning",
        "Usage analytics",
        "Auto-scaling"
      ],
      link: "/products/llm",
      color: "from-gray-800 to-black"
    }
  ]

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {"Choose Your Perfect Hosting Solution"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {"From shared hosting to VPS, we have the right plan for you"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostingTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color} transform -skew-x-12 origin-top-left`}></div>
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription className="text-base">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={type.link}>
                      {"Learn More"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
