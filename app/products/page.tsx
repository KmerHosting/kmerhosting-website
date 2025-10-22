"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Compass as Wordpress, Cloud, Workflow, Brain, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

const webHostingProducts = [
  {
    icon: Server,
    titleKey: "hosting.shared.title",
    descriptionKey: "products.shared.longDesc",
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
    titleKey: "hosting.wordpress.title",
    descriptionKey: "products.wordpress.longDesc",
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
    titleKey: "hosting.vps.title",
    descriptionKey: "products.vps.longDesc",
    features: [
      "Full root/administrator access",
      "Dedicated CPU & RAM usage limit resources",
      "SSD NVMe storage",
      "Choice of operating systems",
      "DDoS protection included"
    ],
    color: "from-orange-500 to-orange-600",
    href: "/products/vps",
  },
  {
    icon: Users,
    titleKey: "hosting.reseller.title",
    descriptionKey: "hosting.reseller.description",
    features: [
      "DirectAdmin control panel",
      "White-label branding options",
      "Free SSL for all clients",
      "Private nameservers included",
      "Blesta billing integration"
    ],
    color: "from-green-500 to-green-600",
    href: "/products/reseller",
  },
]

const aiProducts = [
  {
    icon: Workflow,
    titleKey: "hosting.n8n.title",
    descriptionKey: "hosting.n8n.description",
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
    titleKey: "hosting.llm.title",
    descriptionKey: "hosting.llm.description",
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
  const { t } = useLanguage()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                {t("products.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8">
                {t("products.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Products Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="web-hosting" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="web-hosting">{t("products.tabs.webHosting")}</TabsTrigger>
                <TabsTrigger value="ai">{t("products.tabs.ai")}</TabsTrigger>
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
                          <h3 className="text-xl font-bold mb-2">{t(product.titleKey)}</h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t(product.descriptionKey)}</p>
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
                              {t("products.learnMore")}
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
                          <h3 className="text-xl font-bold mb-2">{t(product.titleKey)}</h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t(product.descriptionKey)}</p>
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
                              {t("products.learnMore")}
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
              <h2 className="text-3xl font-bold mb-4">{t("products.cta.title")}</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                {t("products.cta.subtitle")}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/pricing">
                  {t("products.cta.button")}
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
