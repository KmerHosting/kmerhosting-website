import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, Shield, Users } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Professional Email Hosting - Business Email Solutions | KmerHosting",
  description: "Professional email hosting with your domain name. Secure, reliable, and spam-protected. Starting at affordable prices with webmail and mobile sync.",
  keywords: [
    "email hosting",
    "business email",
    "professional email",
    "custom email",
    "domain email",
    "email service",
  ],
  openGraph: {
    title: "Professional Email Hosting - Your Domain Email",
    description: "Get professional email hosting with your own domain. Secure, reliable, and feature-rich.",
    url: "https://kmerhosting.com/products/email-hosting",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/email-hosting",
  },
}

const emailPlans = [
  {
    name: "Email Starter",
    price: "1,500",
    period: "month",
    features: [
      "5 Email Accounts",
      "10 GB Storage per Account",
      "Webmail Access",
      "IMAP/POP3/SMTP",
      "Mobile Sync",
      "Spam & Virus Protection",
      "Email Forwarding",
      "Auto Responders",
      "Basic Support",
    ],
    popular: false,
  },
  {
    name: "Email Business",
    price: "3,500",
    period: "month",
    features: [
      "25 Email Accounts",
      "25 GB Storage per Account",
      "Webmail Access",
      "IMAP/POP3/SMTP",
      "Mobile Sync (iOS/Android)",
      "Advanced Spam Protection",
      "Email Forwarding",
      "Auto Responders",
      "Mailing Lists",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Email Enterprise",
    price: "7,500",
    period: "month",
    features: [
      "Unlimited Email Accounts",
      "50 GB Storage per Account",
      "Webmail Access",
      "IMAP/POP3/SMTP",
      "Mobile Sync (iOS/Android)",
      "Advanced Spam Protection",
      "Email Forwarding",
      "Auto Responders",
      "Mailing Lists",
      "Email Archiving",
      "Priority Support",
      "99.9% Uptime SLA",
    ],
    popular: false,
  },
]

const emailFeatures = [
  {
    icon: Mail,
    title: "Professional Email",
    description: "Use your own domain for email (you@yourdomain.com) to build trust and credibility with customers.",
  },
  {
    icon: Shield,
    title: "Secure & Protected",
    description: "Advanced spam filtering, virus protection, and encryption keep your communications safe.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Shared calendars, contacts, and seamless mobile sync for your entire team.",
  },
]

export default function EmailHostingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Email Hosting</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Professional Email Hosting
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Get professional email with your domain name. Secure, reliable, and packed with features for businesses of all sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {emailFeatures.map((feature, index) => (
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Email Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include webmail, mobile sync, and advanced spam protection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {emailPlans.map((plan, index) => (
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

        {/* Features Included */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Webmail Interface",
                  "Mobile Device Sync",
                  "Desktop Client Support",
                  "Spam & Virus Filtering",
                  "Email Forwarding",
                  "Auto Responders",
                  "Email Aliases",
                  "Catch-All Accounts",
                  "Mailing Lists",
                  "Calendar & Contacts",
                  "Large Attachment Support",
                  "24/7 Email Delivery",
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

        {/* Compatible Devices */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Access Anywhere, Any Device</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Compatible with all major email clients and devices
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Outlook",
                  "Apple Mail",
                  "Thunderbird",
                  "Gmail App",
                  "iPhone/iPad",
                  "Android",
                  "Windows",
                  "macOS",
                ].map((device, index) => (
                  <Card key={index}>
                    <CardContent className="py-6 text-center">
                      <p className="font-medium">{device}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Professional Email?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Start using professional email with your domain today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="https://clients.kmerhosting.com/cart.php">Get Started Now</a>
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
