"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Compass as Wordpress, Cloud, ArrowRight, Workflow, Brain } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function HostingTypes() {
  const { t } = useLanguage()

  const hostingTypes = [
    {
      icon: Server,
      titleKey: "hosting.shared.title",
      descriptionKey: "hosting.shared.description",
      features: [
        t("common.freeDomain"),
        t("common.freeSSL"),
        t("common.freeEmail"),
        t("common.unlimitedBandwidth"),
        t("common.unlimitedWebsites"),
        t("common.dailyBackups"),
        t("common.ssdStorage")
      ],
      link: "/products/shared",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Wordpress,
      titleKey: "hosting.wordpress.title",
      descriptionKey: "hosting.wordpress.description",
      features: [
        t("common.freeDomain"),
        t("common.freeSSL"),
        t("common.freeEmail"),
        "WordPress auto-updates",
        "Enhanced security",
        "1-click WordPress installer",
        "WP-CLI access",
        "Staging environment"
      ],
      link: "/products/wordpress",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cloud,
      titleKey: "hosting.vps.title",
      descriptionKey: "hosting.vps.description",
      features: [
        "Full root access",
        "Dedicated resources",
        "Custom OS installation",
        "High-performance SSD",
        "99.9% uptime SLA",
        "24/7 monitoring",
        "Scalable resources"
      ],
      link: "/products/vps",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Workflow,
      titleKey: "hosting.n8n.title",
      descriptionKey: "hosting.n8n.description",
      features: [
        "Auto-installed n8n",
        "API integration ready",
        "Workflow automation",
        "Node-based editor",
        "Community workflows",
        "Regular updates",
        "Backup included"
      ],
      link: "/products/n8n",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Brain,
      titleKey: "hosting.llm.title",
      descriptionKey: "hosting.llm.description",
      features: [
        "Multiple LLM models",
        "API access included",
        "Pre-installed setup",
        "GPU acceleration",
        "Model fine-tuning",
        "Usage analytics",
        "Auto-scaling"
      ],
      link: "/products/llm",
      color: "from-gray-800 to-black"
    }
  ]

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t("hosting.types.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("hosting.types.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostingTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color} transform -skew-x-12 origin-top-left`}></div>
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t(type.titleKey)}</CardTitle>
                  <CardDescription className="text-base">{t(type.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={type.link}>
                      {t("common.learnMore")}
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
  )
}
