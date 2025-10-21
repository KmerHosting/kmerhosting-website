"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ExpertHelp() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t("expert.title")}
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("expert.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/support/live-chat">
              <Button size="lg" className="min-w-[200px]">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("expert.liveChat")}
              </Button>
            </Link>

            <Link href="https://wa.me/237694193493?text=Hi%20KmerHosting,%20I%20need%20help%20choosing%20a%20hosting%20plan" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                {t("expert.whatsapp")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}