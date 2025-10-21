"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Workflow, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function N8nHostingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-red-500/10 via-red-600/5 to-red-500/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-8">
                <Workflow className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Self-hosted n8n
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Open-source workflow automation platform for AI-powered business processes. Deploy your own n8n
                instance with full control and pre-configured integrations.
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
