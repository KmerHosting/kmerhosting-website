"use client"

import { Badge } from "@/components/ui/badge"
import { Server, MapPin, Zap } from "lucide-react"

interface Datacenter {
  name: string
  country: string
  region: string
  position: { top: string; left: string }
  flag: string
}

const datacenters: Datacenter[] = [
  {
    name: "United States",
    country: "USA",
    region: "North America",
    position: { top: "35%", left: "20%" },
    flag: "🇺🇸"
  },
  {
    name: "Germany",
    country: "Germany",
    region: "Europe",
    position: { top: "28%", left: "50%" },
    flag: "🇩🇪"
  },
  {
    name: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    position: { top: "65%", left: "75%" },
    flag: "🇸🇬"
  },
  {
    name: "India",
    country: "India",
    region: "South Asia",
    position: { top: "50%", left: "68%" },
    flag: "🇮🇳"
  }
]

export function GlobalInfrastructure() {
  return (
    <section id="global-infrastructure" className="py-20 sm:py-32 bg-muted/30 border-y border-border" aria-labelledby="infrastructure-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Server className="h-3 w-3 mr-1" />
            Global Network
          </Badge>
          <h2 id="infrastructure-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Datacenters Across the Globe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ultra-low latency hosting with strategically positioned datacenters on four continents
          </p>
        </header>

        {/* World Map Visualization */}
        <div className="max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="relative bg-card border-2 border-border rounded-2xl p-8 sm:p-12 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            {/* World Map SVG */}
            <div className="relative aspect-[2/1] mb-8">
              {/* Simplified World Map Outline */}
              <svg viewBox="0 0 1000 500" className="w-full h-full text-muted-foreground/20 dark:text-muted-foreground/10">
                {/* Continents - Simplified shapes */}
                {/* North America */}
                <path d="M 150 80 Q 180 70 200 85 L 220 120 Q 230 140 220 160 L 200 180 Q 180 190 160 185 L 140 170 Q 120 150 130 120 Z" fill="currentColor" />
                {/* South America */}
                <path d="M 220 280 L 240 320 Q 245 350 235 380 L 220 400 Q 210 410 200 405 L 190 380 Q 185 350 195 320 Z" fill="currentColor" />
                {/* Europe */}
                <path d="M 480 100 L 520 95 Q 540 100 545 115 L 540 135 Q 530 145 510 143 L 490 138 Q 475 125 480 100 Z" fill="currentColor" />
                {/* Africa */}
                <path d="M 480 200 L 520 210 Q 540 230 545 260 L 540 310 Q 530 340 510 350 L 490 345 Q 470 325 475 290 L 480 250 Z" fill="currentColor" />
                {/* Asia */}
                <path d="M 600 80 L 750 90 Q 820 100 850 130 L 860 180 Q 855 220 830 240 L 780 250 Q 720 245 680 230 L 640 200 Q 610 165 615 125 Z" fill="currentColor" />
                {/* Australia */}
                <path d="M 750 350 Q 780 345 810 360 L 820 380 Q 815 400 790 405 L 760 400 Q 740 385 750 350 Z" fill="currentColor" />
              </svg>

              {/* Datacenter Points */}
              {datacenters.map((dc, index) => (
                <div
                  key={dc.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ top: dc.position.top, left: dc.position.left }}
                >
                  {/* Pulsing Ring Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/30 dark:bg-green-400/20 animate-ping"></div>
                  </div>
                  
                  {/* Main Point */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-400 border-4 border-background shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Server className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-card border-2 border-border rounded-lg shadow-xl p-3 min-w-[140px] backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{dc.flag}</div>
                        <div className="font-bold text-sm">{dc.name}</div>
                        <div className="text-xs text-muted-foreground">{dc.region}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Lines connecting datacenters */}
                <line x1="200" y1="175" x2="500" y2="140" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="500" y1="140" x2="680" y2="250" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="680" y1="250" x2="750" y2="325" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
              </svg>
            </div>

            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {datacenters.map((dc) => (
                <div key={dc.name} className="bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-green-500/50 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-2xl">{dc.flag}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{dc.name}</h3>
                  <p className="text-xs text-muted-foreground">{dc.region}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Zap className="h-3 w-3" />
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">Ultra-Low Latency</h3>
              <p className="text-sm text-muted-foreground">
                Choose the datacenter closest to your audience for lightning-fast performance
              </p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">99.9% Uptime SLA</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade infrastructure with redundant systems and 24/7 monitoring
              </p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">Global CDN</h3>
              <p className="text-sm text-muted-foreground">
                Automatic content distribution across our worldwide network for optimal speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
