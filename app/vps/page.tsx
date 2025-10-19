import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Cloud, Server, Cpu, HardDrive, Network, Shield } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "VPS Basic",
    price: "120,000 FCFA",
    description: "Perfect for small applications",
    features: [
      "2 CPU cores",
      "4 GB RAM",
      "80 GB SSD NVMe",
      "2 TB bandwidth",
      "1 IPv4 address",
      "Full root access",
      "Choice of OS",
      "DDoS protection",
      "99.9% uptime SLA",
      "24/7 support",
    ],
  },
  {
    name: "VPS Pro",
    price: "240,000 FCFA",
    description: "For growing applications",
    badge: "Popular",
    features: [
      "4 CPU cores",
      "8 GB RAM",
      "160 GB SSD NVMe",
      "4 TB bandwidth",
      "2 IPv4 addresses",
      "Full root access",
      "Choice of OS",
      "DDoS protection",
      "99.9% uptime SLA",
      "Priority support",
      "Free backups",
      "Snapshots included",
    ],
  },
  {
    name: "VPS Enterprise",
    price: "480,000 FCFA",
    description: "For demanding workloads",
    features: [
      "8 CPU cores",
      "16 GB RAM",
      "320 GB SSD NVMe",
      "8 TB bandwidth",
      "4 IPv4 addresses",
      "Full root access",
      "Choice of OS",
      "DDoS protection",
      "99.9% uptime SLA",
      "Priority support",
      "Free backups",
      "Snapshots included",
      "Managed services available",
    ],
  },
]

const features = [
  {
    icon: Cpu,
    title: "Dedicated Resources",
    description: "Guaranteed CPU, RAM, and storage resources that are never shared with other users.",
  },
  {
    icon: Server,
    title: "Full Root Access",
    description: "Complete control over your server with root access to install and configure anything you need.",
  },
  {
    icon: HardDrive,
    title: "SSD NVMe Storage",
    description: "Ultra-fast NVMe SSD storage for exceptional read/write performance and reliability.",
  },
  {
    icon: Network,
    title: "High-Speed Network",
    description: "Connected to high-speed networks with generous bandwidth allocations for your applications.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Advanced DDoS protection keeps your server online even during attacks.",
  },
  {
    icon: Cloud,
    title: "Flexible Scaling",
    description: "Easily upgrade your resources as your application grows without downtime.",
  },
]

const operatingSystems = [
  "Ubuntu 22.04 LTS",
  "Ubuntu 20.04 LTS",
  "Debian 11",
  "Debian 10",
  "CentOS 8",
  "CentOS 7",
  "Rocky Linux 8",
  "AlmaLinux 8",
  "Windows Server 2022",
  "Windows Server 2019",
]

export default function VPSPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                VPS Hosting
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Powerful VPS hosting with dedicated resources
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Get the performance and control you need with virtual private servers featuring dedicated CPU, RAM, and
                SSD NVMe storage.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Choose your VPS plan</h2>
              <p className="text-lg text-muted-foreground">All plans include full root access and DDoS protection</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
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
                        <span className="text-base font-normal text-muted-foreground">/year</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise-grade VPS features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Everything you need for high-performance applications and complete server control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Operating Systems */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Choose your operating system</h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Install your preferred OS with just one click. All major Linux distributions and Windows Server
                supported.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {operatingSystems.map((os, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-border/50">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <span className="font-medium">{os}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Perfect for any workload</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Web Applications</h3>
                  <p className="text-muted-foreground">
                    Host high-traffic web applications with dedicated resources ensuring consistent performance even
                    during traffic spikes.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Development & Testing</h3>
                  <p className="text-muted-foreground">
                    Create isolated development environments with full control to test applications, configurations, and
                    deployments.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Database Servers</h3>
                  <p className="text-muted-foreground">
                    Run MySQL, PostgreSQL, MongoDB, or any database with dedicated resources and optimized storage for
                    maximum performance.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Game Servers</h3>
                  <p className="text-muted-foreground">
                    Host game servers with low latency, high performance, and the ability to customize server settings
                    and mods.
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
