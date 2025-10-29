import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Server, Shield, Zap } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Managed Dedicated Servers - Fully Managed Hosting | KmerHosting",
  description: "Powerful managed dedicated servers with 24/7 expert support, automatic updates, security monitoring, and full server management. Starting at competitive prices with enterprise-grade hardware.",
  keywords: [
    "managed dedicated server",
    "dedicated hosting",
    "managed server",
    "enterprise hosting",
    "fully managed hosting",
    "dedicated server management",
  ],
  openGraph: {
    title: "Managed Dedicated Servers - Expert Support 24/7",
    description: "Get enterprise-grade dedicated servers with full management, monitoring, and support included.",
    url: "https://kmerhosting.com/products/dedicated-servers/managed",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/dedicated-servers/managed",
  },
}

const managedPlans = [
  {
    name: "DS-M Basic",
    price: "45,000",
    period: "month",
    features: [
      "Intel Xeon E3-1230 v6",
      "16 GB DDR4 RAM",
      "500 GB SSD Storage",
      "10 TB Bandwidth",
      "1 Gbps Network",
      "Full Server Management",
      "24/7 Expert Support",
      "Security Monitoring",
      "Automatic Updates",
      "Daily Backups",
      "Free SSL Certificate",
      "DDoS Protection",
    ],
    popular: false,
  },
  {
    name: "DS-M Pro",
    price: "75,000",
    period: "month",
    features: [
      "Intel Xeon E5-2680 v4",
      "32 GB DDR4 RAM",
      "1 TB NVMe SSD Storage",
      "20 TB Bandwidth",
      "1 Gbps Network",
      "Full Server Management",
      "24/7 Expert Support",
      "Advanced Security Monitoring",
      "Automatic Updates & Patches",
      "Hourly Backups",
      "Free SSL Certificate",
      "Advanced DDoS Protection",
      "Performance Optimization",
    ],
    popular: true,
  },
  {
    name: "DS-M Enterprise",
    price: "125,000",
    period: "month",
    features: [
      "Dual Intel Xeon Gold 6248",
      "128 GB DDR4 RAM",
      "2 TB NVMe SSD Storage",
      "50 TB Bandwidth",
      "10 Gbps Network",
      "Full Server Management",
      "24/7 Priority Support",
      "Enterprise Security Suite",
      "Automatic Updates & Patches",
      "Real-time Backups",
      "Free Wildcard SSL",
      "Advanced DDoS Protection",
      "Performance Optimization",
      "Dedicated Account Manager",
    ],
    popular: false,
  },
]

const managedFeatures = [
  {
    icon: Shield,
    title: "Fully Managed",
    description: "Our experts handle all server management, updates, and maintenance so you can focus on your business.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description: "Continuous monitoring and optimization to ensure peak performance and uptime.",
  },
  {
    icon: Server,
    title: "Enterprise Hardware",
    description: "Latest Intel Xeon processors, NVMe SSDs, and redundant power for maximum reliability.",
  },
]

export default function ManagedDedicatedServersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Managed Dedicated Servers</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Fully Managed Dedicated Servers
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Enterprise-grade dedicated servers with complete management. Our experts handle everything from setup to security, monitoring, and optimization.
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Managed Server</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include full management, 24/7 support, and enterprise-grade hardware
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {managedPlans.map((plan, index) => (
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
                          <Check className="h-5 w-5 text-[#07C983] dark:text-[#07C983] flex-shrink-0 mt-0.5" />
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
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included in Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Server Setup & Configuration",
                  "Operating System Management",
                  "Security Updates & Patches",
                  "Performance Monitoring",
                  "Backup Management",
                  "Security Hardening",
                  "DDoS Protection",
                  "24/7 Server Monitoring",
                  "Application Support",
                  "Database Optimization",
                  "Resource Scaling Assistance",
                  "Troubleshooting & Support",
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
                <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Our team is here to help you select the perfect managed dedicated server for your needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/support">Contact Support</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link href="/products/dedicated-servers/unmanaged">View Unmanaged Servers</Link>
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
