import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Lock, Award } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SSL Certificates - Secure Your Website | KmerHosting",
  description: "Professional SSL certificates from trusted providers. Protect your website with industry-standard encryption. Starting at affordable prices with easy installation.",
  keywords: [
    "SSL certificate",
    "HTTPS",
    "website security",
    "SSL encryption",
    "secure certificate",
    "Sectigo SSL",
  ],
  openGraph: {
    title: "SSL Certificates - Secure Your Website",
    description: "Get trusted SSL certificates to encrypt and secure your website. Easy installation and expert support.",
    url: "https://kmerhosting.com/products/ssl-certificates",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/ssl-certificates",
  },
}

const sslPlans = [
  {
    name: "Domain Validation SSL",
    price: "3,500",
    period: "year",
    features: [
      "Domain Validation",
      "256-bit Encryption",
      "99.9% Browser Recognition",
      "Issued in Minutes",
      "Secures 1 Domain",
      "Trust Seal Included",
      "Free Reissues",
      "30-Day Money Back",
    ],
    popular: false,
    icon: Lock,
  },
  {
    name: "Wildcard SSL",
    price: "12,000",
    period: "year",
    features: [
      "Domain Validation",
      "256-bit Encryption",
      "99.9% Browser Recognition",
      "Unlimited Subdomains",
      "Secures *.yourdomain.com",
      "Trust Seal Included",
      "Free Reissues",
      "30-Day Money Back",
    ],
    popular: true,
    icon: Shield,
  },
  {
    name: "EV SSL Certificate",
    price: "25,000",
    period: "year",
    features: [
      "Extended Validation",
      "256-bit Encryption",
      "Green Address Bar",
      "Company Name in Browser",
      "Highest Trust Level",
      "Trust Seal Included",
      "Free Reissues",
      "$1.75M Warranty",
      "Priority Support",
    ],
    popular: false,
    icon: Award,
  },
]

const sslFeatures = [
  {
    icon: Shield,
    title: "Trusted Security",
    description: "SSL certificates from industry-leading providers like Sectigo, trusted by millions of websites worldwide.",
  },
  {
    icon: Lock,
    title: "Easy Installation",
    description: "Simple installation process with automatic setup on most hosting plans. Our team can help if needed.",
  },
  {
    icon: Award,
    title: "Warranty Protection",
    description: "All certificates include warranty protection and free reissues for the certificate lifetime.",
  },
]

export default function SslCertificatesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-sm font-medium">SSL Certificates</span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Secure Your Website with SSL
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Protect your visitors and boost your SEO with trusted SSL certificates. Easy installation and expert support included.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sslFeatures.map((feature, index) => (
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your SSL Certificate</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All certificates include 256-bit encryption and free installation support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {sslPlans.map((plan, index) => (
                <Card key={index} className={plan.popular ? "border-primary shadow-lg" : ""}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 rounded-t-lg">
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <CardHeader>
                    <plan.icon className="h-12 w-12 text-primary mb-4" />
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
                          <Check className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/signup">Order Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why SSL */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why You Need an SSL Certificate</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Build Trust", desc: "Show visitors your site is secure with HTTPS and the padlock icon" },
                  { title: "Improve SEO", desc: "Google ranks HTTPS sites higher in search results" },
                  { title: "Secure Data", desc: "Encrypt sensitive information like passwords and payment details" },
                  { title: "Prevent Warnings", desc: "Avoid 'Not Secure' warnings in modern browsers" },
                  { title: "Accept Payments", desc: "Required for processing credit card transactions online" },
                  { title: "Protect Privacy", desc: "Prevent data interception and man-in-the-middle attacks" },
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
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Our team can help you select the right SSL certificate for your needs
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
