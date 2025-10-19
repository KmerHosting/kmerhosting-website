"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Compass as Wordpress, Cloud, ArrowRight } from "lucide-react"
import Link from "next/link"

const hostingTypes = [
  {
    icon: Server,
    title: "Shared Web Hosting",
    description: "Perfect for personal websites and small businesses. Get started with affordable, reliable hosting.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "PHP, Node.js, Python support",
      "KmerHosting control panel",
      "1-click app installer",
      "12 fair share CPU (per User)",
      "JetBackup Included"
    ],
    href: "/products/shared",
  },
  {
    icon: Wordpress,
    title: "WordPress Hosting",
    description: "Optimized for WordPress with automatic updates, enhanced security, and blazing-fast performance.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "1-click WordPress install",
      "Automatic WordPress updates",
      "WordPress-optimized caching",
      "Staging environment",
      "Malware scanning & removal"
    ],
    href: "/wordpress",
  },
  {
    icon: Cloud,
    title: "VPS Hosting",
    description:
      "Full control with dedicated resources. Scale your applications with powerful virtual private servers.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "Full root/administrator access",
      "Dedicated CPU & RAM",
      "Choice of OS (Linux/Windows)",
      "SSD NVMe storage",
      "DDoS protection included"
    ],
    href: "/vps",
  },
]

export function HostingTypes() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Choose your hosting solution</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            From personal blogs to enterprise applications, we have the perfect hosting plan for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostingTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="relative flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription className="text-base">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 dark:text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href={type.href}>
                      Learn More
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
