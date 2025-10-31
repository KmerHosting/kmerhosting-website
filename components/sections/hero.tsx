"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-20 sm:py-32">
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

      {/* Decorative effects */}
      
      {/* Dark theme: Green geometric shapes + central white glow behind text */}
      <div className="hidden dark:block">
        {/* Central white glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top left green triangular shape */}
        <div className="absolute top-0 left-0 w-[300px] h-[200px] pointer-events-none">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <polygon points="0,0 300,0 200,200 0,100" fill="#16A34A" opacity="0.6" />
            <polygon points="0,0 200,0 100,150 0,80" fill="#07C983" opacity="0.4" />
          </svg>
        </div>
        
        {/* Top right green triangular shape */}
        <div className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <polygon points="300,0 0,0 100,200 300,100" fill="#16A34A" opacity="0.6" />
            <polygon points="300,0 100,0 200,150 300,80" fill="#07C983" opacity="0.4" />
          </svg>
        </div>
        
        {/* Bottom left green shape */}
        <div className="absolute bottom-0 left-0 w-[250px] h-[150px] pointer-events-none">
          <svg viewBox="0 0 250 150" className="w-full h-full">
            <polygon points="0,150 250,150 150,0 0,50" fill="#16A34A" opacity="0.5" />
            <polygon points="0,150 150,150 100,30 0,70" fill="#07C983" opacity="0.3" />
          </svg>
        </div>
        
        {/* Bottom right green shape */}
        <div className="absolute bottom-0 right-0 w-[250px] h-[150px] pointer-events-none">
          <svg viewBox="0 0 250 150" className="w-full h-full">
            <polygon points="250,150 0,150 100,0 250,50" fill="#16A34A" opacity="0.5" />
            <polygon points="250,150 100,150 150,30 250,70" fill="#07C983" opacity="0.3" />
          </svg>
        </div>
        
        {/* Additional decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-[100px] h-[100px] bg-[#07C983]/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-[80px] h-[80px] bg-[#16A34A]/10 rounded-full pointer-events-none" />
      </div>
      
      {/* Light theme: Green geometric shapes at extremities */}
      <div className="dark:hidden">
        {/* Top left green triangular shape */}
        <div className="absolute top-0 left-0 w-[300px] h-[200px] pointer-events-none">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <polygon points="0,0 300,0 200,200 0,100" fill="#16A34A" opacity="0.6" />
            <polygon points="0,0 200,0 100,150 0,80" fill="#07C983" opacity="0.4" />
          </svg>
        </div>
        
        {/* Top right green triangular shape */}
        <div className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <polygon points="300,0 0,0 100,200 300,100" fill="#16A34A" opacity="0.6" />
            <polygon points="300,0 100,0 200,150 300,80" fill="#07C983" opacity="0.4" />
          </svg>
        </div>
        
        {/* Bottom left green shape */}
        <div className="absolute bottom-0 left-0 w-[250px] h-[150px] pointer-events-none">
          <svg viewBox="0 0 250 150" className="w-full h-full">
            <polygon points="0,150 250,150 150,0 0,50" fill="#16A34A" opacity="0.5" />
            <polygon points="0,150 150,150 100,30 0,70" fill="#07C983" opacity="0.3" />
          </svg>
        </div>
        
        {/* Bottom right green shape */}
        <div className="absolute bottom-0 right-0 w-[250px] h-[150px] pointer-events-none">
          <svg viewBox="0 0 250 150" className="w-full h-full">
            <polygon points="250,150 0,150 100,0 250,50" fill="#16A34A" opacity="0.5" />
            <polygon points="250,150 100,150 150,30 250,70" fill="#07C983" opacity="0.3" />
          </svg>
        </div>
        
        {/* Additional decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-[100px] h-[100px] bg-[#07C983]/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-[80px] h-[80px] bg-[#16A34A]/10 rounded-full pointer-events-none" />
      </div>
    </section>
  )
}
