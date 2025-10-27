import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Cloud, Shield, Zap } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Managed VPS Hosting - Fully Managed Virtual Servers | KmerHosting",
  description: "Powerful managed VPS hosting with expert support, automatic updates, and security monitoring. Starting at affordable prices with SSD storage and guaranteed resources.",
  keywords: [
    "managed VPS",
    "managed virtual server",
    "VPS hosting",
    "managed cloud server",
    "virtual private server",
  ],
  openGraph: {
    title: "Managed VPS Hosting - Expert Support Included",
    description: "Get managed VPS hosting with full support, monitoring, and optimization included.",
    url: "https://kmerhosting.com/products/vps/managed",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/vps/managed",
  },
}

const managedVpsPlans = [
  {
    name: "VPS-M Starter",
    price: "8,500",
    period: "month",
    features: [
      "2 CPU Cores",
      "4 GB RAM",
      "80 GB SSD Storage",
      "2 TB Bandwidth",
      "1 Gbps Network",
      "Full VPS Management",
      "24/7 Support",
      "Security Monitoring",
      "Automatic Updates",
      "Daily Backups",
      "Free SSL Certificate",
    ],
    popular: false,
  },
  {
    name: "VPS-M Business",
    price: "16,500",
    period: "month",
    features: [
      "4 CPU Cores",
      "8 GB RAM",
      "160 GB SSD Storage",
      "4 TB Bandwidth",
      "1 Gbps Network",
      "Full VPS Management",
      "24/7 Priority Support",
      "Advanced Security",
      "Automatic Updates",
      "Hourly Backups",
      "Free SSL Certificate",
      "Performance Optimization",
    ],
    popular: true,
  },
  {
    name: "VPS-M Premium",
    price: "32,000",
    period: "month",
    features: [
      "8 CPU Cores",
      "16 GB RAM",
      "320 GB SSD Storage",
      "8 TB Bandwidth",
      "1 Gbps Network",
      "Full VPS Management",
      "24/7 Priority Support",
      "Enterprise Security",
      "Automatic Updates",
      "Real-time Backups",
      "Free SSL Certificate",
      "Performance Optimization",
      "Resource Scaling",
    ],
    popular: false,
  },
]

const managedFeatures = [
  {
    icon: Shield,
    title: "Fully Managed",
    description: "Our team handles server management, updates, and security so you can focus on your applications.",
  },
  {
    icon: Zap,
    title: "Optimized Performance",
    description: "Continuous monitoring and optimization to ensure your VPS runs at peak performance.",
  },
  {
    icon: Cloud,
    title: "Scalable Resources",
    description: "Easily upgrade your resources as your business grows with our flexible VPS plans.",
  },
]

export default function ManagedVpsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Managed VPS Hosting</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Fully Managed VPS Hosting
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Powerful virtual private servers with complete management. Focus on your business while we handle the technical details.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {managedFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Managed VPS Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include full management, 24/7 support, and SSD storage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {managedVpsPlans.map((plan, index) => (
                <Card key={index} className={plan.popular ? "border-primary shadow-lg" : ""}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 rounded-t-lg">
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground ml-2">FCFA/{plan.period}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 dark:text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Management Includes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Server Setup & Configuration",
                  "Operating System Updates",
                  "Security Patches",
                  "Performance Monitoring",
                  "Backup Management",
                  "Security Hardening",
                  "24/7 Server Monitoring",
                  "Application Support",
                  "Database Optimization",
                  "Resource Monitoring",
                  "Technical Support",
                  "Troubleshooting",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Want Full Control?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  If you prefer to manage your own VPS, check out our unmanaged VPS plans with full root access
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/products/vps/unmanaged">View Unmanaged VPS</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link href="/support">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
