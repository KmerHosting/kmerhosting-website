import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Compass as Wordpress, Cloud, Workflow, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"

const webHostingProducts = [
  {
    icon: Server,
    title: "Shared Web Hosting",
    description: "Reliable and affordable hosting solution perfect for personal websites, small businesses, and startups.",
    features: [
      "Free .com domain + SSL certificate",
      "10+ Professional email accounts",
      "Support for PHP, Node.js, Python",
      "User-friendly control panel",
      "1-click application installer"
    ],
    color: "from-blue-500 to-blue-600",
    href: "/products/shared",
  },
  {
    icon: Wordpress,
    title: "WordPress Hosting",
    description: "Optimized hosting environment specifically designed for WordPress sites with enhanced security.",
    features: [
      "1-click WordPress installation",
      "Automatic WordPress updates",
      "WordPress-optimized caching",
      "Enhanced security features",
      "Staging environment"
    ],
    color: "from-purple-500 to-purple-600",
    href: "/products/wordpress",
  },
  {
    icon: Cloud,
    title: "Cloud VPS Hosting",
    description: "Powerful virtual private servers with full control and dedicated resources.",
    features: [
      "Full root/administrator access",
      "Dedicated CPU & RAM resources",
      "SSD NVMe storage",
      "Choice of operating systems",
      "DDoS protection included"
    ],
    color: "from-orange-500 to-orange-600",
    href: "/products/vps",
  },
]

const aiProducts = [
  {
    icon: Workflow,
    title: "Self-hosted n8n",
    description: "Open-source workflow automation platform for AI-powered business processes.",
    features: [
      "Complete n8n installation",
      "AI workflow automation",
      "Auto-deployment on your domain",
      "Pre-configured integrations",
      "Workflow templates included"
    ],
    color: "from-red-500 to-red-600",
    href: "/products/n8n",
  },
  {
    icon: Brain,
    title: "LLM Hosting",
    description: "Access to powerful open-source Large Language Models with full API integration.",
    features: [
      "Multiple open-source LLMs",
      "Full API access for integration",
      "RESTful API endpoints",
      "Pre-installed infrastructure",
      "Custom model fine-tuning"
    ],
    color: "from-black to-gray-900",
    href: "/products/llm",
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
                Complete Hosting Solutions
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8">
                From personal websites to enterprise applications, discover our comprehensive range of hosting services designed to power your digital presence.
              </p>
            </div>
          </div>
        </section>

        {/* Products Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="web-hosting" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="web-hosting">Web Hosting</TabsTrigger>
                <TabsTrigger value="ai">AI Solutions</TabsTrigger>
              </TabsList>

              {/* Web Hosting Products */}
              <TabsContent value="web-hosting">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webHostingProducts.map((product, index) => {
                    const Icon = product.icon
                    return (
                      <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                        <CardContent className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>
                          <ul className="space-y-1 mb-6">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={product.href}>
                              Learn More
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* AI Products */}
              <TabsContent value="ai">
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {aiProducts.map((product, index) => {
                    const Icon = product.icon
                    return (
                      <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                        <CardContent className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>
                          <ul className="space-y-1 mb-6">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={product.href}>
                              Learn More
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Choose the perfect hosting solution for your needs and take your online presence to the next level.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/pricing">
                  View Pricing & Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
