"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <span className="text-sm font-medium">Trusted by 10,000+ websites worldwide</span>
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl text-[#07C983] lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Powerful Web Hosting for Everyone
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Fast, reliable, and secure hosting with 99.9% uptime guarantee powered by LiteSpeed and CloudLinux OS. DirectAdmin and cPanel
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Button size="lg" variant="outline" className="text-base bg-transparent px-8 py-6 w-full sm:w-auto sm:min-w-[300px]" asChild>
              <Link href="/pricing" className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>  

          {/* Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {["Free .com Domain", "Free SSL Certificate", "SSH Access", "Git Access", "PostgreSQL/MySQL/MariaDB/Redis", "10+ Free Pro Email Addresses"].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-[#07C983] dark:text-[#07C983] flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient blur - more visible in light mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
