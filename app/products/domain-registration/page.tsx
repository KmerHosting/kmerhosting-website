import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Globe, Search, Shield } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Domain Registration - Register Your Domain Name | KmerHosting",
  description: "Register your domain name with KmerHosting. .com, .net, .org and more. Free WHOIS privacy, DNS management, and 24/7 support included.",
  keywords: [
    "domain registration",
    "buy domain",
    "domain name",
    "register domain",
    ".com domain",
    "domain search",
  ],
  openGraph: {
    title: "Domain Registration - Get Your Perfect Domain",
    description: "Register your domain name with free WHOIS privacy and DNS management included.",
    url: "https://kmerhosting.com/products/domain-registration",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/domain-registration",
  },
}

const domainPricing = [
  {
    extension: ".com",
    price: "8,500",
    popular: true,
    description: "The most popular and trusted domain extension worldwide",
  },
  {
    extension: ".net",
    price: "9,500",
    popular: false,
    description: "Perfect for technology and networking websites",
  },
  {
    extension: ".org",
    price: "10,000",
    popular: false,
    description: "Ideal for non-profit organizations and communities",
  },
  {
    extension: ".info",
    price: "7,500",
    popular: false,
    description: "Great for informational websites and resources",
  },
  {
    extension: ".biz",
    price: "8,000",
    popular: false,
    description: "Perfect for business and commercial websites",
  },
  {
    extension: ".co",
    price: "12,000",
    popular: false,
    description: "Modern alternative to .com for companies",
  },
]

const features = [
  {
    icon: Globe,
    title: "Free WHOIS Privacy",
    description: "Protect your personal information with free WHOIS privacy protection on all domains.",
  },
  {
    icon: Shield,
    title: "DNS Management",
    description: "Full DNS management panel with easy-to-use controls for managing your domain records.",
  },
  {
    icon: Search,
    title: "Domain Search",
    description: "Advanced domain search tool to find the perfect domain name for your website.",
  },
]

const includedFeatures = [
  "Free WHOIS Privacy Protection",
  "DNS Management Panel",
  "Email Forwarding",
  "Domain Forwarding",
  "Domain Locking",
  "Easy Domain Transfer",
  "Auto-Renewal Option",
  "24/7 Support",
  "99.9% Uptime Guarantee",
  "Free SSL with Hosting",
  "Nameserver Management",
  "Subdomain Support",
]

export default function DomainRegistrationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">Domain Registration</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Find Your Perfect Domain Name
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Register your domain name with free WHOIS privacy, DNS management, and 24/7 support. Get started in minutes.
              </p>
              <Button size="lg" asChild>
                <Link href="/domain-search">Search Available Domains</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
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

        {/* Domain Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Domain Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Competitive pricing on all popular domain extensions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {domainPricing.map((domain, index) => (
                <Card key={index} className={domain.popular ? "border-primary shadow-lg" : ""}>
                  {domain.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 rounded-t-lg">
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-3xl">{domain.extension}</CardTitle>
                    <CardDescription className="min-h-[48px]">{domain.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">{domain.price}</span>
                      <span className="text-muted-foreground ml-2">FCFA/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/domain-search">Register Now</Link>
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
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {includedFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Register Your Domain with Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Free Privacy Protection",
                    desc: "Keep your personal information private with free WHOIS privacy on all domains",
                  },
                  {
                    title: "Easy Management",
                    desc: "User-friendly control panel to manage all aspects of your domain",
                  },
                  {
                    title: "Quick Setup",
                    desc: "Get your domain registered and configured in minutes",
                  },
                  {
                    title: "24/7 Support",
                    desc: "Our expert team is always available to help with domain issues",
                  },
                  {
                    title: "Auto-Renewal",
                    desc: "Never lose your domain with optional automatic renewal",
                  },
                  {
                    title: "Bundle & Save",
                    desc: "Get discounts when you bundle domains with hosting plans",
                  },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
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
                <h2 className="text-3xl font-bold mb-4">Ready to Register Your Domain?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Search for your perfect domain name and get started today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/domain-search">Search Domains</Link>
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
