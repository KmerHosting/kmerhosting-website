"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowRight, CheckCircle2, Server, Globe, Shield, Zap, HeadphonesIcon, DollarSign } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function ResellerHostingPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Server,
      title: "DirectAdmin Control",
      description: "Full DirectAdmin access to manage all your client accounts from one intuitive control panel."
    },
    {
      icon: Globe,
      title: "White-Label Branding",
      description: "Brand the hosting service as your own with custom nameservers and branding options."
    },
    {
      icon: Shield,
      title: "Free SSL Certificates",
      description: "Provide unlimited free SSL certificates to all your hosting clients automatically."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "SSD NVMe storage and LiteSpeed servers ensure blazing-fast performance for all accounts."
    },
    {
      icon: HeadphonesIcon,
      title: "Priority Support",
      description: "Get priority access to our expert support team to help you 24/7."
    },
    {
      icon: DollarSign,
      title: "Blesta Integration",
      description: "Integrate with Blesta for automated billing, provisioning, and client management."
    }
  ]

  const benefits = [
    "Create DirectAdmin accounts for clients",
    "Private nameservers (ns1.yourbrand.com)",
    "Free Blesta license included",
    "Automatic backups with JetBackup",
    "CloudLinux for account isolation",
    "Softaculous with 400+ apps",
    "DirectAdmin control panel",
    "99.9% uptime guarantee",
    "Free website migration for clients",
    "Email hosting for all accounts"
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-green-500/10 via-green-600/5 to-green-500/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("hosting.reseller.title")}
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Start your own web hosting business with our powerful white-label reseller hosting plans.
                Manage multiple clients, create custom packages, and grow your hosting empire with complete control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/pricing#reseller">
                    View Reseller Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our reseller hosting plans come packed with powerful features to help you build and manage your hosting business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Why Choose KmerHosting Reseller Plans?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Build your hosting business on a solid foundation with industry-leading features and support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-green-500/10 via-green-600/5 to-green-500/10 border-green-500/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Ready to Start Your Hosting Business?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Choose from our Bronze, Silver, Gold, or Platinum reseller plans and start hosting clients today.
                  All plans include free migration and 30-day money-back guarantee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/pricing#reseller">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/support/live-chat">
                      Chat with Sales
                    </Link>
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
