"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Globe, Lock, HardDrive, Headphones } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const features = [
  {
    icon: Shield,
    titleKey: "features.security.title",
    descKey: "features.security.desc",
  },
  {
    icon: Zap,
    titleKey: "features.performance.title",
    descKey: "features.performance.desc",
  },
  {
    icon: Globe,
    titleKey: "features.uptime.title",
    descKey: "features.uptime.desc",
  },
  {
    icon: Lock,
    titleKey: "features.ssl.title",
    descKey: "features.ssl.desc",
  },
  {
    icon: HardDrive,
    titleKey: "features.storage.title",
    descKey: "features.storage.desc",
  },
  {
    icon: Headphones,
    titleKey: "features.support.title",
    descKey: "features.support.desc",
  },
]

export function Features() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("features.mainTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("features.mainSubtitle")}
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border/50 hover:border-border transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
