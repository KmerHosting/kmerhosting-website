import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Database, Zap, Shield } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Database Hosting - MySQL, PostgreSQL, MongoDB | KmerHosting",
  description: "Reliable database hosting for MySQL, PostgreSQL, and MongoDB. Optimized performance, automatic backups, and expert support. Starting at affordable prices.",
  keywords: [
    "database hosting",
    "MySQL hosting",
    "PostgreSQL hosting",
    "MongoDB hosting",
    "database server",
    "managed database",
  ],
  openGraph: {
    title: "Database Hosting - MySQL, PostgreSQL, MongoDB",
    description: "Get reliable database hosting with automatic backups, high performance, and expert support.",
    url: "https://kmerhosting.com/products/database-hosting",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/database-hosting",
  },
}

const databasePlans = [
  {
    name: "DB Starter",
    price: "4,500",
    period: "month",
    features: [
      "5 GB Database Storage",
      "MySQL or PostgreSQL",
      "Daily Backups (7 days)",
      "phpMyAdmin/pgAdmin",
      "Remote Access",
      "SSL Connections",
      "Basic Support",
      "99.9% Uptime SLA",
    ],
    popular: false,
    databases: ["MySQL 8.0", "PostgreSQL 15"],
  },
  {
    name: "DB Business",
    price: "9,500",
    period: "month",
    features: [
      "25 GB Database Storage",
      "MySQL, PostgreSQL, or MongoDB",
      "Hourly Backups (30 days)",
      "phpMyAdmin/pgAdmin/Compass",
      "Remote Access",
      "SSL Connections",
      "Query Optimization",
      "Performance Monitoring",
      "Priority Support",
      "99.9% Uptime SLA",
    ],
    popular: true,
    databases: ["MySQL 8.0", "PostgreSQL 15", "MongoDB 7.0"],
  },
  {
    name: "DB Enterprise",
    price: "19,500",
    period: "month",
    features: [
      "100 GB Database Storage",
      "All Database Types",
      "Real-time Backups",
      "Full Management Tools",
      "Remote Access",
      "SSL Connections",
      "Advanced Optimization",
      "Performance Monitoring",
      "Replication Support",
      "Database Clustering",
      "Priority Support",
      "99.99% Uptime SLA",
    ],
    popular: false,
    databases: ["MySQL 8.0", "PostgreSQL 15", "MongoDB 7.0", "Redis"],
  },
]

const databaseFeatures = [
  {
    icon: Database,
    title: "Multiple Database Types",
    description: "Support for MySQL, PostgreSQL, MongoDB, and Redis to fit your application needs.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "SSD storage, optimized configurations, and caching for lightning-fast database queries.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Automatic backups, SSL connections, and redundant infrastructure for data protection.",
  },
]

export default function DatabaseHostingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Database Hosting</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Reliable Database Hosting
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                High-performance database hosting for MySQL, PostgreSQL, MongoDB, and more. Optimized, secure, and backed up automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {databaseFeatures.map((feature, index) => (
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Database Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include automatic backups, SSD storage, and expert support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {databasePlans.map((plan, index) => (
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        {plan.databases.map((db, dbIndex) => (
                          <Badge key={dbIndex} variant="secondary" className="text-xs">
                            {db}
                          </Badge>
                        ))}
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

        {/* Supported Databases */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Supported Database Systems</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "MySQL 8.0",
                    desc: "World's most popular open-source relational database",
                  },
                  {
                    name: "PostgreSQL 15",
                    desc: "Advanced open-source relational database with powerful features",
                  },
                  {
                    name: "MongoDB 7.0",
                    desc: "Leading NoSQL document database for modern applications",
                  },
                  {
                    name: "Redis",
                    desc: "In-memory data structure store for caching and real-time analytics",
                  },
                ].map((db, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{db.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{db.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Included */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Features Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Automatic Daily Backups",
                  "SSD Storage",
                  "Remote Database Access",
                  "SSL/TLS Connections",
                  "phpMyAdmin Interface",
                  "pgAdmin for PostgreSQL",
                  "MongoDB Compass Access",
                  "Query Performance Monitoring",
                  "Database Import/Export",
                  "User & Permission Management",
                  "Connection Pooling",
                  "24/7 Monitoring",
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

        {/* Use Cases */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Perfect For</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Web Applications", desc: "Power your web apps with reliable database hosting" },
                  { title: "E-commerce", desc: "Handle product catalogs, orders, and customer data securely" },
                  { title: "Mobile Apps", desc: "Backend database for iOS and Android applications" },
                  { title: "Analytics", desc: "Store and analyze large datasets efficiently" },
                  { title: "CMS & Blogs", desc: "WordPress, Drupal, and other content management systems" },
                  { title: "SaaS Products", desc: "Multi-tenant database architecture for SaaS applications" },
                ].map((useCase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                    </CardContent>
                  </Card>
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
                <h2 className="text-3xl font-bold mb-4">Need Help Choosing a Plan?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Our team can help you select the right database solution for your needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/support">Contact Support</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link href="/pricing">View All Plans</Link>
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
