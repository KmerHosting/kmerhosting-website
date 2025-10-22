"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Shield,
  Zap,
  HardDrive,
  Lock,
  Cloud,
  Server,
  Upload,
  CreditCard,
  ArrowUp,
  RotateCcw,
  Activity,
  Database,
  Globe,
  CheckCircle,
  ChevronDown
} from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "99.9% Uptime",
    description: "Guaranteed high availability for your websites"
  },
  {
    icon: Server,
    title: "Enterprise Litespeed",
    description: "High-performance web server technology"
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    description: "Ultra-fast solid-state drive storage"
  },
  {
    icon: Shield,
    title: "Anti-DDoS Protection",
    description: "Advanced protection against DDoS attacks"
  },
  {
    icon: Lock,
    title: "Free SSL Certificates",
    description: "Secure your site with free SSL certificates"
  },
  {
    icon: Database,
    title: "Softaculous",
    description: "One-click installation for 400+ applications"
  },
  {
    icon: Globe,
    title: "Free Domain Registration",
    description: "Get a free domain with your hosting plan"
  },
  {
    icon: Cloud,
    title: "Backups by JetBackup",
    description: "Automated backups for peace of mind"
  },
  {
    icon: Shield,
    title: "Security with CloudLinux",
    description: "CloudLinux offers enhanced security with its \"Cage\" like server environment, providing every separate account its own isolation preventing cross-account breaches while also providing you with more customization over your account."
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Turbo Charged Servers. Our servers are optimized to the max, featuring Litespeed, Solid State Drives and Intel Xeon Processors. Litespeed is a drop-in replacement for Apache that is up to 6x faster at serving dynamic content and offers unique server-level caching."
  },
  {
    icon: Upload,
    title: "FTP Access",
    description: "FTP Icon. Every hosting account comes with the ability to use FTP. You can directly access your account data with third-party applications like Filezilla."
  },
  {
    icon: CreditCard,
    title: "Payment methods",
    description: "Easily Make Payment. We support 6 different methods of payment on our platform including Bitcoin, Direct Credit/Debit card payment with Stripe, PayPal, Orange Money, and MTN Mobile Money."
  },
  {
    icon: ArrowUp,
    title: "Upgrade",
    description: "Upgrade at any time. Directly upgrade your account at any time within our Client Area. Upgrades are pro-rata priced, so you never lose value on the amount you have already paid. Upgrades are also instant and never put your account offline at any stage."
  },
  {
    icon: RotateCcw,
    title: "Refund",
    description: "30-Day Refund Policy. We believe that you should get the service that you pay for or we don't deserve your money. We will refund your payment within the first 30 days if you are not happy with our product or service."
  },
  {
    icon: Shield,
    title: "Security - CPGuard",
    description: "Advanced malware protection and monitoring. CPGuard provides real-time website security scanning, malware detection, and automatic cleanup to keep your websites safe from threats and vulnerabilities."
  },
  {
    icon: CheckCircle,
    title: "Security - Immunify360",
    description: "Comprehensive security suite for complete protection. Immunify360 offers advanced firewall protection, intrusion detection and prevention, proactive defense against emerging threats, and automated malware removal to ensure your hosting environment stays secure 24/7."
  }
]

export function Features() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to succeed online</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance mb-6">
            Professional hosting features designed for performance, security, and reliability
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Globe className="h-5 w-5" />
            <p className="text-base font-semibold">
              10+ Datacenters across North America, Europe, Asia, and Africa
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isOpen = openItems.has(index)
            return (
              <Card key={index} className="border-border/50 bg-background">
                <Collapsible open={isOpen} onOpenChange={() => toggleItem(index)}>
                  <CollapsibleTrigger asChild>
                    <CardContent className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm leading-tight">{feature.title}</h3>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
