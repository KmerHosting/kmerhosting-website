"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export function CTA() {// Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "KmerHosting Web Hosting Services",
    "description": "Professional web hosting services with 99.9% uptime, SSL certificates, and 24/7 support",
    "url": "https://kmerhosting.com/pricing",
    "seller": {
      "@type": "Organization",
      "name": "KmerHosting"
    },
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "XAF",
      "price": "13900"
    }
  }

  return (
    <>
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section 
        className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/30"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-10">
              <h2 
                id="cta-heading"
                className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
              >
                Ready to Launch Your Website?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers. Get started with professional hosting in minutes with our easy setup and 24/7 expert support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="outline"
                className="text-base font-semibold bg-transparent px-8 py-6 group w-full sm:w-auto sm:min-w-[250px]" 
                asChild
              >
                <Link href="/pricing" title="View KmerHosting pricing plans">
                  Get Started Now
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold bg-transparent px-8 py-6 w-full sm:w-auto sm:min-w-[250px]"
                asChild
              >
                <Link href="/support" title="Contact KmerHosting sales team">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Talk to Sales
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Expert Support</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">30-Day</div>
                  <div className="text-sm text-muted-foreground">Money Back</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
