import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Server, Code, Cpu } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Unmanaged Dedicated Servers - Full Root Access | KmerHosting",
  description: "Powerful unmanaged dedicated servers with full root access and complete control. Perfect for developers and sysadmins. Starting at competitive prices with enterprise hardware.",
  keywords: [
    "unmanaged dedicated server",
    "root access server",
    "self-managed server",
    "dedicated server",
    "bare metal server",
    "full control hosting",
  ],
  openGraph: {
    title: "Unmanaged Dedicated Servers - Full Control",
    description: "Get enterprise-grade dedicated servers with full root access and complete control over your infrastructure.",
    url: "https://kmerhosting.com/products/dedicated-servers/unmanaged",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/dedicated-servers/unmanaged",
  },
}

const unmanagedPlans = [
  {
    name: "DS-U Basic",
    price: "28,000",
    period: "month",
    features: [
      "Intel Xeon E3-1230 v6",
      "16 GB DDR4 RAM",
      "500 GB SSD Storage",
      "10 TB Bandwidth",
      "1 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "IPMI Access",
      "DDoS Protection",
      "99.9% Uptime SLA",
      "Basic Support",
    ],
    popular: false,
  },
  {
    name: "DS-U Pro",
    price: "48,000",
    period: "month",
    features: [
      "Intel Xeon E5-2680 v4",
      "32 GB DDR4 RAM",
      "1 TB NVMe SSD Storage",
      "20 TB Bandwidth",
      "1 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "IPMI Access",
      "Advanced DDoS Protection",
      "99.9% Uptime SLA",
      "Priority Support",
      "5 IP Addresses",
    ],
    popular: true,
  },
  {
    name: "DS-U Enterprise",
    price: "85,000",
    period: "month",
    features: [
      "Dual Intel Xeon Gold 6248",
      "128 GB DDR4 RAM",
      "2 TB NVMe SSD Storage",
      "50 TB Bandwidth",
      "10 Gbps Network",
      "Full Root Access",
      "Choice of OS",
      "IPMI Access",
      "Advanced DDoS Protection",
      "99.99% Uptime SLA",
      "Priority Support",
      "10 IP Addresses",
      "Hardware Firewall Option",
    ],
    popular: false,
  },
]

const unmanagedFeatures = [
  {
    icon: Code,
    title: "Full Root Access",
    description: "Complete control over your server. Install any software, configure any settings, and customize to your exact needs.",
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "Latest Intel Xeon processors, NVMe SSDs, and high-speed networking for maximum performance.",
  },
  {
    icon: Server,
    title: "Flexible Configuration",
    description: "Choose your operating system and configure your server exactly how you want it.",
  },
]

export default function UnmanagedDedicatedServersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Unmanaged Dedicated Servers</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Unmanaged Dedicated Servers
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Full root access and complete control. Perfect for developers, sysadmins, and businesses who want total control over their infrastructure.
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Unmanaged Server</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include full root access, choice of OS, and enterprise-grade hardware
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {unmanagedPlans.map((plan, index) => (
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

        {/* What You Manage */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What You Control</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Operating System Installation",
                  "Software & Application Management",
                  "Security & Firewall Configuration",
                  "Updates & Patches",
                  "Backup Strategy",
                  "User & Permission Management",
                  "Network Configuration",
                  "Resource Allocation",
                  "Database Management",
                  "Web Server Configuration",
                  "Email Server Setup",
                  "Monitoring & Logging",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Note:</strong> Unmanaged servers require technical expertise. Our support team can help with hardware and network issues, but server management is your responsibility.
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
                <h2 className="text-3xl font-bold mb-4">Need Expert Management?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  If you prefer to focus on your business while we handle the server management, check out our managed dedicated servers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/products/dedicated-servers/managed">View Managed Servers</Link>
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
