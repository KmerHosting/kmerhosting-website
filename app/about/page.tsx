import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Award, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Professional Web Hosting Since 2019 | KmerHosting",
  description: "Learn about KmerHosting's mission to provide reliable, affordable web hosting. Serving 10,000+ customers worldwide with 99.9% uptime and 24/7 support since 2019.",
  keywords: ["about KmerHosting", "web hosting company", "hosting provider", "reliable hosting", "web hosting Africa"],
  openGraph: {
    title: "About KmerHosting - Your Trusted Hosting Partner",
    description: "Professional web hosting services since 2019. Join 10,000+ satisfied customers worldwide.",
    url: "https://kmerhosting.com/about",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                About KmerHosting
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Empowering businesses with reliable hosting solutions
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Since 2019, we've been providing professional web hosting services to thousands of customers worldwide,
                combining cutting-edge technology with exceptional support.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At KmerHosting, our mission is to provide reliable, high-performance web hosting solutions that
                  empower businesses and individuals to succeed online. We believe that everyone deserves access to
                  professional hosting services without complexity or compromise.
                </p>
                <p className="text-muted-foreground">
                  We're committed to delivering exceptional value through innovative technology, transparent pricing,
                  and world-class customer support. Your success is our success.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Active Customers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime SLA</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Expert Support</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                These principles guide everything we do and shape how we serve our customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Customer First</h3>
                  <p className="text-sm text-muted-foreground">
                    Your success drives our decisions. We prioritize your needs and work tirelessly to exceed
                    expectations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We maintain the highest standards in technology, security, and service delivery.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear pricing, honest communication, and no hidden fees. You always know what you're getting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    We continuously improve our platform with the latest technologies and best practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Why businesses trust KmerHosting</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Proven Reliability</h3>
                  <p className="text-muted-foreground">
                    Our infrastructure is built on enterprise-grade hardware with redundant systems ensuring 99.9%
                    uptime. Your website stays online when it matters most.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Expert Support Team</h3>
                  <p className="text-muted-foreground">
                    Our technical support team consists of experienced professionals who understand hosting inside and
                    out. We're available 24/7 to help you succeed.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Developer-Friendly Platform</h3>
                  <p className="text-muted-foreground">
                    From SSH access to Git integration, WP-CLI, and support for PHP, Node.js, Ruby and Python. Using most popular databases such as PostgreSQL, MySQL and Redis, we provide the
                    tools developers need to build amazing applications.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Scalable Solutions</h3>
                  <p className="text-muted-foreground">
                    Start with shared hosting and seamlessly upgrade to VPS as your business grows. Our flexible plans
                    scale with your success.
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
