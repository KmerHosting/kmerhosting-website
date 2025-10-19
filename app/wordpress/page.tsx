import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Compass, Zap, Shield, RefreshCw, Terminal, Layers, X } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "WP Discover",
    price: "13,900 FCFA",
    description: "Perfect for personal WordPress blogs",
    features: {
      websites: "1",
      storage: "10 GB",
      bandwidth: "100 GB",
      email: "5",
      autoUpdates: true,
      wpCli: false,
      staging: false,
      support: "24/7",
    },
  },
  {
    name: "WP Plus",
    price: "15,000 FCFA",
    description: "For small business websites",
    features: {
      websites: "3",
      storage: "20 GB",
      bandwidth: "Unlimited",
      email: "15",
      autoUpdates: true,
      wpCli: true,
      staging: false,
      support: "24/7",
    },
  },
  {
    name: "WP Pro",
    price: "25,000 FCFA",
    description: "Ideal for business websites",
    badge: "Popular",
    features: {
      websites: "10",
      storage: "40 GB",
      bandwidth: "Unlimited",
      email: "25",
      autoUpdates: true,
      wpCli: true,
      staging: true,
      support: "Priority",
    },
  },
  {
    name: "WP Gold",
    price: "50,000 FCFA",
    description: "For agencies and high-traffic sites",
    features: {
      websites: "Unlimited",
      storage: "80 GB",
      bandwidth: "Unlimited",
      email: "Unlimited",
      autoUpdates: true,
      wpCli: true,
      staging: true,
      support: "Priority",
    },
  },
]

const features = [
  {
    icon: Zap,
    title: "Optimized Performance",
    description: "WordPress-specific caching and optimization for lightning-fast page loads.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Updates",
    description: "WordPress core, themes, and plugins updated automatically for security and features.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "WordPress-focused security with malware scanning, firewall, and brute-force protection.",
  },
  {
    icon: Terminal,
    title: "WP-CLI Access",
    description: "Command-line interface for advanced WordPress management and automation.",
  },
  {
    icon: Layers,
    title: "Staging Environment",
    description: "Test changes safely in a staging environment before pushing to production.",
  },
  {
    icon: Compass,
    title: "1-Click Installation",
    description: "Get WordPress up and running in seconds with our automated installer.",
  },
]

export default function WordPressPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                WordPress Hosting
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                WordPress hosting built for speed and security
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Optimized WordPress hosting with automatic updates, enhanced security, and expert support. Launch your
                WordPress site in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Choose your WordPress plan</h2>
              <p className="text-lg text-muted-foreground">All plans include WordPress-optimized features</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className="relative flex flex-col">
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">{plan.badge}</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      <div className="text-3xl font-bold">
                        {plan.price}
                        <span className="text-base font-normal text-muted-foreground">
                          /year
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <ul className="space-y-1.5 mb-4 flex-1">
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.websites} WordPress site(s)</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.storage} SSD storage</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.bandwidth} monthly bandwidth</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.email} email accounts</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.autoUpdates ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>Automatic updates</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.wpCli ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>WP-CLI access</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        {plan.features.staging ? (
                          <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span>Staging environment</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-xs">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features.support} support</span>
                      </li>
                    </ul>
                    <Button className="w-full" size="sm" asChild>
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
              <h2 className="text-3xl font-bold tracking-tight mb-4">WordPress-specific features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Everything you need to build, manage, and grow your WordPress website.
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

        {/* Why WordPress Hosting */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
                Why choose managed WordPress hosting?
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Optimized for WordPress</h3>
                  <p className="text-muted-foreground">
                    Our servers are specifically configured for WordPress with optimized PHP settings, caching layers,
                    and database tuning for maximum performance.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Automatic Maintenance</h3>
                  <p className="text-muted-foreground">
                    WordPress core, themes, and plugins are automatically updated to keep your site secure and running
                    the latest features without manual intervention.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Expert WordPress Support</h3>
                  <p className="text-muted-foreground">
                    Our support team specializes in WordPress and can help with everything from installation to
                    troubleshooting plugin conflicts and performance optimization.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-semibold mb-2">Safe Testing Environment</h3>
                  <p className="text-muted-foreground">
                    Use staging environments to test theme changes, plugin updates, and new features before deploying to
                    your live site.
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
