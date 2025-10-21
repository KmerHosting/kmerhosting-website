"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, ArrowLeftCircle, ArrowRightCircle, IceCreamBowlIcon, PlaneTakeoff } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <span className="text-sm font-medium">Trusted by 10,000+ websites worldwide</span>
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-base" asChild>
              <Link href="/pricing">
                <PlaneTakeoff className="ml-2 h-4 w-4" />
                {t("common.getStarted")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/contact">{t("common.contactSales")}</Link>
            </Button>
          </div>

          {/* Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[t("common.freeDomain"), t("common.freeSSL"), t("common.freeEmail")].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
