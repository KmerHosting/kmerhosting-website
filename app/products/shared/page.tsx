"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Server, Zap, Shield, HardDrive, X } from "lucide-react"
import Link from "next/link"

const sharedPlans = {
  php: [
    {
      name: "Discover",
      price: "13,900 FCFA",
      description: "Perfect for starter PHP websites",
      features: {
        websites: "1",
        storage: "5 GB",
        bandwidth: "50 GB",
        email: "10",
        databases: "1",
        phpVersion: "8.4",
        ssl: true,
        backups: false,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Plus",
      price: "15,000 FCFA",
      description: "Great for small business sites",
      badge: "Popular",
      features: {
        websites: "3",
        storage: "10 GB",
        bandwidth: "100 GB",
        email: "10",
        databases: "3",
        phpVersion: "8.4",
        ssl: true,
        backups: true,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Pro",
      price: "25,000 FCFA",
      description: "Ideal for business websites",
      features: {
        websites: "10",
        storage: "25 GB",
        bandwidth: "Unlimited",
        email: "25",
        databases: "10",
        phpVersion: "8.4",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
    {
      name: "Gold",
      price: "50,000 FCFA",
      description: "For demanding PHP applications",
      features: {
        websites: "Unlimited",
        storage: "50 GB",
        bandwidth: "Unlimited",
        email: "Unlimited",
        databases: "Unlimited",
        phpVersion: "8.4",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
  ],
  nodejs: [
    {
      name: "Discover",
      price: "13,900 FCFA",
      description: "Perfect for starter Node.js apps",
      features: {
        websites: "1",
        storage: "5 GB",
        bandwidth: "50 GB",
        email: "10",
        nodeVersion: "20.x",
        npmPackages: "Unlimited",
        ssl: true,
        backups: false,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Plus",
      price: "15,000 FCFA",
      description: "Great for small Node.js projects",
      badge: "Popular",
      features: {
        websites: "3",
        storage: "10 GB",
        bandwidth: "100 GB",
        email: "10",
        nodeVersion: "20.x",
        npmPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Pro",
      price: "25,000 FCFA",
      description: "Ideal for Node.js applications",
      features: {
        websites: "10",
        storage: "25 GB",
        bandwidth: "Unlimited",
        email: "25",
        nodeVersion: "20.x",
        npmPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
    {
      name: "Gold",
      price: "50,000 FCFA",
      description: "For demanding Node.js apps",
      features: {
        websites: "Unlimited",
        storage: "50 GB",
        bandwidth: "Unlimited",
        email: "Unlimited",
        nodeVersion: "20.x",
        npmPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
  ],
  python: [
    {
      name: "Discover",
      price: "13,900 FCFA",
      description: "Perfect for starter Python apps",
      features: {
        websites: "1",
        storage: "5 GB",
        bandwidth: "50 GB",
        email: "10",
        pythonVersion: "3.11",
        pipPackages: "Unlimited",
        ssl: true,
        backups: false,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Plus",
      price: "15,000 FCFA",
      description: "Great for small Python projects",
      badge: "Popular",
      features: {
        websites: "3",
        storage: "10 GB",
        bandwidth: "100 GB",
        email: "10",
        pythonVersion: "3.11",
        pipPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "24/7",
        migration: false,
      },
    },
    {
      name: "Pro",
      price: "25,000 FCFA",
      description: "Ideal for Python applications",
      features: {
        websites: "10",
        storage: "25 GB",
        bandwidth: "Unlimited",
        email: "25",
        pythonVersion: "3.11",
        pipPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
    {
      name: "Gold",
      price: "50,000 FCFA",
      description: "For demanding Python apps",
      features: {
        websites: "Unlimited",
        storage: "50 GB",
        bandwidth: "Unlimited",
        email: "Unlimited",
        pythonVersion: "3.11",
        pipPackages: "Unlimited",
        ssl: true,
        backups: true,
        support: "Priority",
        migration: true,
      },
    },
  ],
};

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "SSD storage and optimized servers ensure your website loads in milliseconds.",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Multi-layered security with DDoS protection, firewalls, and malware scanning.",
  },
  {
    icon: HardDrive,
    title: "Reliable Storage",
    description: "Enterprise-grade SSD storage with automated daily backups for peace of mind.",
  },
  {
    icon: Server,
    title: "99.9% Uptime",
    description: "Industry-leading uptime guarantee with redundant infrastructure and monitoring.",
  },
]

export default function SharedHostingPage() {
  const [selectedTech, setSelectedTech] = useState<"php" | "nodejs" | "python">("php")

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Powerful shared hosting for every technology
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Reliable shared hosting optimized for PHP, Node.js, and Python applications. Get started with affordable,
                feature-rich hosting that grows with your business.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Toggle & Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Choose your technology stack</h2>
              <p className="text-lg text-muted-foreground">All plans include optimized performance for your chosen technology</p>
            </div>

            {/* Technology Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setSelectedTech("php")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTech === "php" ? "bg-background shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  PHP
                </button>
                <button
                  onClick={() => setSelectedTech("nodejs")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTech === "nodejs" ? "bg-background shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Node.js
                </button>
                <button
                  onClick={() => setSelectedTech("python")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTech === "python" ? "bg-background shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {sharedPlans[selectedTech].map((plan, index) => (
                <Card key={index} className="relative flex flex-col">
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">{plan.badge}</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      <div className="text-3xl font-bold">
                        {plan.price}
                        <span className="text-base font-normal text-muted-foreground">
                          /year
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <ul className="space-y-1.5 mb-4 flex-1">
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.websites} website(s)</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.storage} SSD storage</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.bandwidth} monthly bandwidth</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.email} email accounts</span>
                      </li>
                      
                      {/* Technology-specific features */}
                      {selectedTech === "php" && (
                        <>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{(plan.features as any).databases} MySQL database(s)</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>PHP {(plan.features as any).phpVersion}</span>
                          </li>
                        </>
                      )}
                      
                      {selectedTech === "nodejs" && (
                        <>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Node.js {(plan.features as any).nodeVersion}</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{(plan.features as any).npmPackages} NPM packages</span>
                          </li>
                        </>
                      )}
                      
                      {selectedTech === "python" && (
                        <>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Python {(plan.features as any).pythonVersion}</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{(plan.features as any).pipPackages} PIP packages</span>
                          </li>
                        </>
                      )}

                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.ssl ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>Free SSL certificate</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.backups ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>Daily backups</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.support} support</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.migration ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>Free migration</span>
                      </li>
                    </ul>
                    <Button className="w-full" size="sm" asChild>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why choose our shared hosting?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with performance, security, and reliability in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
