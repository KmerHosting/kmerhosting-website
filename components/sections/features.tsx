"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Terminal,
  Database,
  Zap,
  Server,
  Info,
  Shield,
  HardDrive
} from "lucide-react"

interface TechFeature {
  icon?: React.ElementType
  iconSvg?: string
  title: string
  description: string
  badge?: string
  frameworks?: string[]
}

const programmingLanguages: TechFeature[] = [
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="currentColor" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"/></svg>`,
    title: "Node.js",
    description: "Build fast, scalable applications",
    badge: "Popular",
    frameworks: ["Express.js", "Next.js", "NestJS", "Fastify"]
  },
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="currentColor" d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62zm-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545 0-3.079 2.451-5.581 5.478-5.581 3.015 0 5.479 2.502 5.479 5.581-.001 3.066-2.465 5.545-5.479 5.545zM122.281 48.811c-2.098-8.448-6.103-14.811-14.588-14.811H94V47.459c0 10.357-8.197 19.541-18.099 19.541H46.742C38.719 67 33 72.833 33 80.854v27.798c0 7.912 6.745 12.564 14.462 14.811 9.242 2.698 17.994 3.183 29.159 0C85.862 121.37 93 117.331 93 109.652V98H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529zm-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547 0 3.076-2.451 5.579-5.479 5.579-3.015 0-5.478-2.502-5.478-5.579 0-3.068 2.463-5.547 5.478-5.547z"/></svg>`,
    title: "Python",
    description: "AI & data science ready",
    badge: "Popular",
    frameworks: ["Django", "Flask", "FastAPI", "Pyramid"]
  },
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="currentColor" d="M27.7 99.4c-1.6 1.4-3.7 2-5.8 1.5-3.5-.8-5.8-4.1-5.2-7.6.4-2.1 1.7-3.6 3.4-4.6l-.1-.1c-2.1 1-4.3 1.3-6.6.7-4.5-1.1-7.3-5.5-6.3-10 .7-3.1 2.9-5.2 5.6-6.3l-.1-.1c-2.8 1-6 1.1-9 .1-5.4-1.8-8.4-7.6-6.6-13.1 1.3-4 4.8-6.6 8.8-7.2l-.1-.1c-4 .3-8.1-.9-11.4-3.8-5.4-4.8-5.9-13-1.1-18.4 3.5-3.9 8.8-5.2 13.5-3.7l.1-.1c-4.6-1.2-8.3-4.7-9.8-9.4-2.3-7.1 1.6-14.8 8.7-17 5.2-1.6 10.6.2 13.8 4.3l.1-.1c-3.2-3.9-4.3-9.4-2.4-14.5 2.9-7.8 11.5-11.7 19.3-8.8 5.7 2.1 9.3 7.3 9.5 13l.1-.1c-.1-5.7 2.3-11.3 7.1-14.8 7.3-5.3 17.5-3.7 22.8 3.7 3.9 5.4 4.2 12.4 1.2 18.1l.1.1c2.9-5.5 8.4-9.2 14.7-9.6 9.6-.6 17.9 6.6 18.5 16.2.5 6.9-3 13.1-8.6 16.3l.1.1c5.5-3 12.4-3.2 18.2-.2 8.9 4.6 12.3 15.4 7.7 24.3-3.4 6.5-10 10-17 9.4l.1.1c6.9.4 13.3 4.3 16.5 10.8 4.9 9.9.9 21.9-9 26.8-7.2 3.6-15.6 1.9-21.1-3.7l.1.1c5.4 5.3 6.9 13.5 3.4 20.5-5.4 10.6-18.4 14.9-29 9.5-7.7-3.9-11.9-12.1-11.1-20.3l-.1.1c.6 8.1-3 16.2-10 20.9-10.7 7.2-25.3 4.4-32.6-6.3-5.3-7.8-5.2-17.8.1-25.4z"/></svg>`,
    title: "Ruby",
    description: "Elegant web development",
    frameworks: ["Ruby on Rails", "Sinatra", "Hanami", "Padrino"]
  },
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961s27.354 30.961 61.094 30.961 61.094-13.862 61.094-30.961-27.354-30.961-61.094-30.961zm-15.897 36.993c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34h14.04c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515-.759 1.357-1.748 2.598-2.972 3.748zm21.311 2.968l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-34h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528l-3.031 15.241h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.748-1.359 1.18-2.89 1.711-4.573 2.228-1.681.518-3.73.461-6.162.461h-6.918l-1.733 10h-7.244l6.515-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.392l-.329 1.251zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421l.515-2.517c.452-2.279.243-3.925-.686-4.794-.929-.868-2.517-1.868-5.037-1.868zm-39.381 14h-5.274l-2.727 14h5.274c2.942 0 5.136-.29 6.576-1.4 1.441-1.108 2.413-2.828 2.917-5.421l.515-2.517c.452-2.279.243-3.925-.686-4.794-.928-.868-2.844-1.868-6.595-1.868z"/></svg>`,
    title: "PHP",
    description: "Industry standard hosting",
    badge: "Popular",
    frameworks: ["Laravel", "Symfony", "CodeIgniter", "WordPress"]
  },
]

const infrastructureFeatures: TechFeature[] = [
  {
    icon: Terminal,
    title: "SSH Access",
    description: "Full terminal control",
  },
  {
    icon: Zap,
    title: "Redis Caching",
    description: "In-memory data store",
  },
  {
    icon: Database,
    title: "MySQL/MariaDB",
    description: "Relational databases",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description: "Advanced SQL database",
  },
]

export function Features() {
  return (
    <section 
      className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/map.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/95"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to succeed online
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Professional hosting features designed for performance, security, and reliability
          </p>
        </div>

        {/* LiteSpeed Banner with Info Dialog */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="border border-border/50 bg-gradient-to-r from-primary/5 via-background to-background">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">LiteSpeed Web Server</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade performance technology
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1 text-xs whitespace-nowrap">
                    40x Faster than Apache
                  </Badge>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-9 w-9 bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <Info className="h-4 w-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                          <Server className="h-5 w-5 text-primary" />
                          Why LiteSpeed?
                        </DialogTitle>
                        <DialogDescription className="text-base">
                          Understanding our performance advantage
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Performance Comparison</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• <strong>vs Apache:</strong> Up to 40x faster with built-in caching and event-driven architecture</p>
                            <p>• <strong>vs Nginx:</strong> Better PHP performance and seamless .htaccess support</p>
                            <p>• <strong>HTTP/3 & QUIC:</strong> Next-generation protocols for faster page loads</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            Our Security Stack
                          </h4>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div className="p-3 border rounded-lg bg-muted/50">
                              <p className="font-medium text-sm">CloudLinux OS</p>
                              <p className="text-xs text-muted-foreground mt-1">Resource isolation & stability</p>
                            </div>
                            <div className="p-3 border rounded-lg bg-muted/50">
                              <p className="font-medium text-sm">Imunify360</p>
                              <p className="text-xs text-muted-foreground mt-1">AI-powered security</p>
                            </div>
                            <div className="p-3 border rounded-lg bg-muted/50">
                              <p className="font-medium text-sm">JetBackup</p>
                              <p className="text-xs text-muted-foreground mt-1">Automated backups</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programming Languages */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">
            Multi-Language Support
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {programmingLanguages.map((feature) => {
              return (
                <Card key={feature.title} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-md bg-muted/50 w-10 h-10 flex items-center justify-center">
                        {feature.iconSvg ? (
                          <div 
                            className="w-6 h-6 text-foreground" 
                            dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                          />
                        ) : null}
                      </div>
                      <div className="flex items-center gap-1">
                        {feature.badge && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                            {feature.badge}
                          </Badge>
                        )}
                        {feature.frameworks && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full h-7 w-7 bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                <Info className="h-3 w-3 text-primary" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-lg">{feature.title} Frameworks</DialogTitle>
                                <DialogDescription>
                                  Popular frameworks we support
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                {feature.frameworks.map((framework) => (
                                  <div key={framework} className="p-3 border rounded-lg text-center bg-muted/50">
                                    <p className="font-medium text-sm">{framework}</p>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Infrastructure Features */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-6">
            Advanced Infrastructure
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {infrastructureFeatures.map((feature) => {
              const Icon = feature.icon!
              return (
                <Card key={feature.title} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="p-2 rounded-md bg-muted/50 w-10 h-10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
