import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Cloud, Code, Cpu } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Unmanaged VPS Hosting - Full Root Access VPS | KmerHosting",
  description: "Affordable unmanaged VPS hosting with full root access and complete control. Perfect for developers. Starting at competitive prices with SSD storage and guaranteed resources.",
  keywords: [
    "unmanaged VPS",
    "root access VPS",
    "VPS hosting",
    "virtual private server",
    "self-managed VPS",
  ],
  openGraph: {
    title: "Unmanaged VPS Hosting - Full Root Access",
    description: "Get affordable VPS hosting with full root access and complete control over your virtual server.",
    url: "https://kmerhosting.com/products/vps/unmanaged",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/vps/unmanaged",
  },
}

const unmanagedVpsPlans = [
  {
    name: "VPS-U Starter",
    price: "5,500",
    period: "month",
    features: [
      "2 CPU Cores",
      "4 GB RAM",
      "80 GB SSD Storage",
      "2 TB Bandwidth",
      "1 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "KVM Virtualization",
      "99.9% Uptime SLA",
      "Basic Support",
    ],
    popular: false,
  },
  {
    name: "VPS-U Business",
    price: "10,500",
    period: "month",
    features: [
      "4 CPU Cores",
      "8 GB RAM",
      "160 GB SSD Storage",
      "4 TB Bandwidth",
      "1 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "KVM Virtualization",
      "99.9% Uptime SLA",
      "Priority Support",
      "Snapshot Backups",
    ],
    popular: true,
  },
  {
    name: "VPS-U Premium",
    price: "20,000",
    period: "month",
    features: [
      "8 CPU Cores",
      "16 GB RAM",
      "320 GB SSD Storage",
      "8 TB Bandwidth",
      "1 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "KVM Virtualization",
      "99.9% Uptime SLA",
      "Priority Support",
      "Snapshot Backups",
      "Additional IP Addresses",
    ],
    popular: false,
  },
]

const unmanagedFeatures = [
  {
    icon: Code,
    title: "Full Root Access",
    description: "Complete control over your VPS. Install any software and configure to your exact specifications.",
  },
  {
    icon: Cpu,
    title: "Guaranteed Resources",
    description: "Dedicated CPU, RAM, and storage that's always available for your applications.",
  },
  {
    icon: Cloud,
    title: "Flexible & Scalable",
    description: "Easily upgrade your resources as your needs grow with just a few clicks.",
  },
]

export default function UnmanagedVpsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Unmanaged VPS Hosting</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Unmanaged VPS Hosting
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Full root access and complete control at affordable prices. Perfect for developers and tech-savvy users who want to manage their own server.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {unmanagedFeatures.map((feature, index) => (
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Unmanaged VPS Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include full root access, choice of OS, and SSD storage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {unmanagedVpsPlans.map((plan, index) => (
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
                      <a href="https://clients.kmerhosting.com/cart.php">Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What You Control */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What You Manage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Operating System Installation",
                  "Software & Application Setup",
                  "Security Configuration",
                  "Updates & Patches",
                  "Backup Strategy",
                  "User Management",
                  "Firewall Configuration",
                  "Resource Monitoring",
                  "Database Setup",
                  "Web Server Configuration",
                  "Email Configuration",
                  "Performance Tuning",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Note:</strong> Unmanaged VPS requires technical knowledge. Our support team can help with network and hardware issues, but server management is your responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Prefer Expert Management?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Let our team handle the technical details while you focus on your business
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/products/vps/managed">View Managed VPS</Link>
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
