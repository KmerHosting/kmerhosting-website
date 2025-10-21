"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Brain, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LLMHostingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-black/10 via-gray-900/5 to-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-black/10 flex items-center justify-center mx-auto mb-8">
                <Brain className="h-10 w-10 text-black" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                LLM Hosting
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Access to powerful open-source Large Language Models with full API integration. Deploy AI capabilities
                for your applications with enterprise-grade security and high-performance GPU support.
              </p>
              <Button size="lg" asChild>
                <Link href="/pricing">
                  View Plans
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
