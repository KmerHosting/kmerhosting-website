import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Compass as Wordpress, Cloud, Database, Mail, Shield, ArrowRight, Check, Filter } from "lucide-react"
import Link from "next/link"

const products = [
  {
    icon: Server,
    title: "Shared Web Hosting",
    description: "Perfect for personal websites and small businesses. Get started with affordable, reliable hosting.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "PHP, Node.js, Python support",
      "KmerHosting control panel",
      "1-click app installer",
      "12 fair share CPU (per User)",
      "JetBackup Included"
    ],
    startingPrice: "13,900 FCFA",
    href: "/products/shared",
  },
  {
    icon: Wordpress,
    title: "WordPress Hosting",
    description: "Optimized for WordPress with automatic updates, enhanced security, and blazing-fast performance.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "1-click WordPress install",
      "Automatic WordPress updates",
      "WordPress-optimized caching",
      "Staging environment",
      "Malware scanning & removal"
    ],
    startingPrice: "13,900 FCFA",
    href: "/wordpress",
  },
  {
    icon: Cloud,
    title: "Cloud VPS Hosting",
    description: "Full control with dedicated resources. Scale your applications with powerful virtual private servers.",
    features: [
      "Free .com domain + SSL", 
      "10+ Free Pro email accounts", 
      "Full root/administrator access",
      "Dedicated CPU & RAM",
      "Choice of OS (Linux/Windows)",
      "SSD NVMe storage",
      "DDoS protection included"
    ],
    startingPrice: "120,000 FCFA",
    href: "/vps",
  },
]

const additionalServices = [
  {
    icon: Database,
    title: "Database Hosting",
    description: "Managed MySQL and PostgreSQL databases with automatic backups and optimization.",
  },
  {
    icon: Mail,
    title: "Email Hosting",
    description: "Professional email hosting with spam protection and unlimited storage.",
  },
  {
    icon: Shield,
    title: "Security Services",
    description: "Advanced security features including DDoS protection, malware scanning, and SSL certificates.",
  },
]

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Hosting solutions for every need
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                From personal blogs to enterprise applications, we have the perfect hosting solution to power your
                online presence.
              </p>
            </div>
          </div>
        </section>

        {/* Main Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const Icon = product.icon
                return (
                  <Card key={index} className="relative flex flex-col">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{product.title}</CardTitle>
                      <CardDescription className="text-base">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="text-3xl font-bold">
                          {product.startingPrice}
                          <span className="text-base font-normal text-muted-foreground">/year</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8 flex-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="w-full" asChild>
                        <Link href={product.href}>
                          View Plans
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Additional Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Enhance your hosting with our premium add-on services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparison CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Not sure which plan is right for you?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Compare all our hosting plans side-by-side or contact our sales team for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/pricing">
                    Compare All Plans
                    <Filter className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
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
