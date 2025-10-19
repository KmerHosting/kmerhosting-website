"use client"

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 sm:px-16 sm:py-24 text-center">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Join thousands of satisfied customers and experience the difference of professional hosting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base" asChild>
                <Link href="/pricing">
                  View Pricing Plans
                  <Eye className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
