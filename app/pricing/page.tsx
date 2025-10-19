"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const sharedPlans = {
  php: [
    {
      name: "Discover",
      price: "13,900 FCFA",
      description: "Perfect for starter PHP projects",
      features: {
        websites: "1",
        storage: "5 GB",
        bandwidth: "50 GB",
        email: "10",
        databases: "5",
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
      description: "Great for personal websites",
      features: {
        websites: "3",
        storage: "30 GB",
        bandwidth: "100 GB",
        email: "10",
        databases: "10",
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
      badge: "Popular",
      features: {
        websites: "10",
        storage: "80 GB",
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
      description: "Ideal for production Node.js apps",
      badge: "Popular",
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
      description: "For high-traffic Node.js applications",
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
      description: "Ideal for production Python apps",
      badge: "Popular",
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
      description: "For high-performance Python applications",
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
}

const wordpressPlans = [
  {
    name: "WP Discover",
    price: "20,000 FCFA",
    description: "For starter WordPress blogs",
    features: {
      websites: "1",
      storage: "10 GB",
      bandwidth: "50 GB",
      email: "5",
      ssl: true,
      backups: false,
      support: "24/7",
      wpCli: false,
      staging: false,
      autoUpdates: true,
    },
  },
  {
    name: "WP Plus",
    price: "30,000 FCFA",
    description: "For personal blogs",
    features: {
      websites: "3",
      storage: "25 GB",
      bandwidth: "Unlimited",
      email: "15",
      ssl: true,
      backups: true,
      support: "24/7",
      wpCli: false,
      staging: false,
      autoUpdates: true,
    },
  },
  {
    name: "WP Pro",
    price: "50,000 FCFA",
    description: "For business sites",
    badge: "Popular",
    features: {
      websites: "10",
      storage: "75 GB",
      bandwidth: "Unlimited",
      email: "50",
      ssl: true,
      backups: true,
      support: "Priority",
      wpCli: true,
      staging: true,
      autoUpdates: true,
    },
  },
  {
    name: "WP Gold",
    price: "80,000 FCFA",
    description: "For agencies & enterprises",
    features: {
      websites: "Unlimited",
      storage: "150 GB",
      bandwidth: "Unlimited",
      email: "Unlimited",
      ssl: true,
      backups: true,
      support: "Priority",
      wpCli: true,
      staging: true,
      autoUpdates: true,
    },
  },
]

const vpsPlans = [
  {
    name: "VPS Basic",
    price: "120,000 FCFA",
    description: "For small applications",
    features: {
      cpu: "2 cores",
      ram: "4 GB",
      storage: "80 GB NVMe",
      bandwidth: "2 TB",
      ipv4: "1",
      rootAccess: true,
      ddos: true,
      backups: false,
      managed: false,
    },
  },
  {
    name: "VPS Pro",
    price: "240,000 FCFA",
    description: "For growing apps",
    badge: "Popular",
    features: {
      cpu: "4 cores",
      ram: "8 GB",
      storage: "160 GB NVMe",
      bandwidth: "4 TB",
      ipv4: "2",
      rootAccess: true,
      ddos: true,
      backups: true,
      managed: false,
    },
  },
  {
    name: "VPS Enterprise",
    price: "480,000 FCFA",
    description: "For enterprise apps",
    features: {
      cpu: "8 cores",
      ram: "16 GB",
      storage: "320 GB NVMe",
      bandwidth: "8 TB",
      ipv4: "4",
      rootAccess: true,
      ddos: true,
      backups: true,
      managed: true,
    },
  },
]

export default function PricingPage() {
  const [selectedTech, setSelectedTech] = useState<"php" | "nodejs" | "python">("php")

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8">
                Choose the perfect plan for your needs. All plans include free SSL, daily backups, and 24/7 support.
              </p>
              <p className="text-sm text-muted-foreground">
                All prices are yearly billing in FCFA (Central African CFA Franc)
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="shared" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="shared">Shared</TabsTrigger>
                <TabsTrigger value="wordpress">WordPress</TabsTrigger>
                <TabsTrigger value="vps">VPS</TabsTrigger>
              </TabsList>

              {/* Shared Web Hosting Plans */}
              <TabsContent value="shared">
                {/* Technology Toggle */}
                <div className="flex justify-center mb-8">
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
                      <CardContent className="flex-1 flex flex-col">
                        <ul className="space-y-2 mb-6 flex-1 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.websites} website(s)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.storage} SSD storage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.bandwidth} monthly bandwidth</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.email} email accounts</span>
                          </li>
                          
                          {/* Technology-specific features */}
                          {selectedTech === "php" && (
                            <>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{(plan.features as any).databases} MySQL database(s)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>PHP {(plan.features as any).phpVersion}</span>
                              </li>
                            </>
                          )}
                          
                          {selectedTech === "nodejs" && (
                            <>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Node.js {(plan.features as any).nodeVersion}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{(plan.features as any).npmPackages} NPM packages</span>
                              </li>
                            </>
                          )}
                          
                          {selectedTech === "python" && (
                            <>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Python {(plan.features as any).pythonVersion}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{(plan.features as any).pipPackages} PIP packages</span>
                              </li>
                            </>
                          )}

                          <li className="flex items-start gap-2">
                            {plan.features.ssl ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Free SSL certificate</span>
                          </li>
                          <li className="flex items-start gap-2">
                            {plan.features.backups ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Daily backups</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.support} support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            {plan.features.migration ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Free migration</span>
                          </li>
                        </ul>
                        <Button className="w-full" size="sm" asChild>
                          <Link href="/signup">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* WordPress Plans */}
              <TabsContent value="wordpress">
                <div className="grid lg:grid-cols-4 gap-6">
                  {wordpressPlans.map((plan, index) => (
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
                            <span>{plan.features.websites} WordPress site(s)</span>
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
                          <li className="flex items-start gap-1.5 text-xs">
                            {plan.features.autoUpdates ? (
                              <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Automatic updates</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            {plan.features.wpCli ? (
                              <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>WP-CLI access</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            {plan.features.staging ? (
                              <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Staging environment</span>
                          </li>
                          <li className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.support} support</span>
                          </li>
                        </ul>
                        <Button className="w-full" size="sm" asChild>
                          <Link href="/contact">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* VPS Plans */}
              <TabsContent value="vps">
                <div className="grid lg:grid-cols-3 gap-8">
                  {vpsPlans.map((plan, index) => (
                    <Card key={index} className="relative flex flex-col">
                      {plan.badge && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">{plan.badge}</Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="pt-4">
                          <div className="text-4xl font-bold">
                            {plan.price}
                            <span className="text-base font-normal text-muted-foreground">
                              /year
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <ul className="space-y-3 mb-8 flex-1">
                          <li className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.cpu} CPU</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.ram} RAM</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.storage} storage</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.bandwidth} monthly bandwidth</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{plan.features.ipv4} IPv4 address(es)</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            {plan.features.rootAccess ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Full root access</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            {plan.features.ddos ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>DDoS protection</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            {plan.features.backups ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Free backups</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            {plan.features.managed ? (
                              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <span>Managed services</span>
                          </li>
                        </ul>
                        <Button className="w-full" asChild>
                          <Link href="/contact">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently asked questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade your hosting plan at any time. The upgrade is instant and you'll only pay the
                    prorated difference.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day money-back guarantee on all hosting plans. If you're not satisfied, contact us for
                    a full refund.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for annual plans.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">
                    No, there are no setup fees. The price you see is the price you pay.
                  </p>
                </div>
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
