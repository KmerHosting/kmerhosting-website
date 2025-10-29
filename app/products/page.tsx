import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Server, 
  Cloud, 
  Users, 
  Database, 
  Mail, 
  Lock, 
  Globe, 
  Zap,
  Bot,
  Workflow,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Products - Web Hosting, VPS, AI Services | KmerHosting",
  description: "Explore KmerHosting's comprehensive range of hosting solutions, from shared hosting to dedicated servers, plus AI-powered tools and premium services.",
  keywords: "hosting products, VPS hosting, shared hosting, dedicated servers, AI services, reseller hosting, Cameroon",
}

interface Product {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  href: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
}

const hostingProducts: Product[] = [
  {
    icon: Server,
    title: "Shared Hosting",
    description: "Perfect for websites and blogs with support for WordPress, PHP, Python, Node.js, and Ruby",
    features: [
      "cPanel or DirectAdmin",
      "Free SSL & Domain",
      "LiteSpeed Web Server",
      "99.9% Uptime Guarantee"
    ],
    href: "/pricing",
    badge: "Popular",
    badgeVariant: "default"
  },
  {
    icon: Users,
    title: "Reseller Hosting",
    description: "Start your own hosting business with white-label solutions and WHMCS",
    features: [
      "Free WHMCS License",
      "White Label Hosting",
      "cPanel/WHM or DirectAdmin",
      "Unlimited Client Accounts"
    ],
    href: "/products/reseller",
    badge: "Most Popular",
    badgeVariant: "secondary"
  },
  {
    icon: Cloud,
    title: "Cloud VPS Hosting",
    description: "Scalable virtual private servers with full root access and your choice of OS",
    features: [
      "Full Root Access",
      "Managed & Unmanaged Options",
      "DDoS Protection",
      "99.9% Uptime SLA"
    ],
    href: "/products/vps/managed"
  },
  {
    icon: Zap,
    title: "Dedicated VPS",
    description: "High-performance dedicated virtual servers for demanding applications",
    features: [
      "Dedicated Resources",
      "Advanced DDoS Protection",
      "Priority Support",
      "99.99% Uptime SLA"
    ],
    href: "/products/vps/managed"
  },
  {
    icon: Server,
    title: "Bare Metal Servers",
    description: "Ultimate performance with dedicated physical servers for your business",
    features: [
      "100% Dedicated Hardware",
      "Enterprise-Grade Performance",
      "Custom Configurations",
      "Managed Services Available"
    ],
    href: "/products/dedicated-servers/managed"
  },
]

const aiProducts: Product[] = [
  {
    icon: Bot,
    title: "KmerHosting AI",
    description: "Access cutting-edge AI models including GPT-4, Claude 3, and Gemini",
    features: [
      "Free Access to 8 AI Models",
      "Paid Access to 10+ Premium Models",
      "GPT-4, Claude 3 Opus, Gemini Pro",
      "API Access & Unlimited Requests"
    ],
    href: "/pricing",
    badge: "Popular",
    badgeVariant: "default"
  },
  {
    icon: Sparkles,
    title: "AI Website Builder",
    description: "Build stunning websites in minutes with AI-powered design and content generation",
    features: [
      "AI-Powered Design",
      "Instant Content Generation",
      "Drag & Drop Editor",
      "Mobile Responsive"
    ],
    href: "/signup"
  },
  {
    icon: Workflow,
    title: "Self-hosted n8n",
    description: "Powerful workflow automation platform hosted on your own infrastructure",
    features: [
      "Visual Workflow Editor",
      "400+ Integrations",
      "Self-hosted Solution",
      "Full Control & Privacy"
    ],
    href: "/signup",
    badge: "Popular",
    badgeVariant: "default"
  },
]

const additionalServices: Product[] = [
  {
    icon: Lock,
    title: "SSL Certificates",
    description: "Secure your website with industry-standard SSL/TLS certificates",
    features: [
      "Domain Validation (DV)",
      "Organization Validation (OV)",
      "Extended Validation (EV)",
      "Wildcard SSL Available"
    ],
    href: "/products/ssl-certificates"
  },
  {
    icon: Mail,
    title: "Email Hosting",
    description: "Professional email hosting with advanced spam protection",
    features: [
      "Custom Domain Email",
      "Advanced Spam Filter",
      "Webmail Access",
      "IMAP/POP3/SMTP Support"
    ],
    href: "/products/email-hosting"
  },
  {
    icon: Database,
    title: "Database Hosting",
    description: "Managed database hosting for MySQL, PostgreSQL, and MariaDB",
    features: [
      "MySQL & PostgreSQL",
      "Automatic Backups",
      "High Availability",
      "Performance Optimization"
    ],
    href: "/products/database-hosting"
  },
  {
    icon: Globe,
    title: "Domain Registration",
    description: "Register your perfect domain name from hundreds of extensions",
    features: [
      ".com, .net, .org & More",
      "Free WHOIS Privacy",
      "Easy DNS Management",
      "Competitive Pricing"
    ],
    href: "/products/domain-registration"
  },
]

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon
  
  return (
    <Card className="group relative overflow-hidden border hover:border-green-500/50 transition-all duration-300">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base leading-tight">{product.title}</h3>
              {product.badge && (
                <Badge variant={product.badgeVariant || "default"} className="text-xs px-2 py-0 h-5 flex-shrink-0">
                  {product.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          </div>
        </div>
        <ul className="space-y-1 mb-3">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-xs">
              <CheckCircle2 className="h-3 w-3 text-[#07C983] flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-xs text-muted-foreground ml-4.5">
              +{product.features.length - 3} more features
            </li>
          )}
        </ul>
        {/* Per-product CTA removed — users should use the global "View Pricing Plans" CTA below */}
      </div>
    </Card>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="text-xs px-3 py-0.5">
                Complete Hosting Solutions
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Everything You Need to Succeed Online
              </h1>
              <p className="text-base text-muted-foreground">
                From powerful hosting solutions to cutting-edge AI tools, we provide the complete infrastructure for your digital success
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="container py-12 md:py-16">
          <div className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold">Main Services</h2>
              <p className="text-sm text-muted-foreground">
                Reliable, high-performance hosting solutions for every need
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {hostingProducts.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* AI Services */}
        <section className="border-t bg-muted/30">
          <div className="container py-12 md:py-16">
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">AI-Powered Services</h2>
                <p className="text-sm text-muted-foreground">
                  Harness the power of artificial intelligence for your projects
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {aiProducts.map((product) => (
                  <ProductCard key={product.title} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="border-t">
          <div className="container py-12 md:py-16">
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">Additional Services</h2>
                <p className="text-sm text-muted-foreground">
                  Enhance your hosting with premium add-ons and professional services
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {additionalServices.map((product) => (
                  <ProductCard key={product.title} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Pricing */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-sm opacity-90">
                View our transparent pricing and choose the perfect plan for your needs
              </p>
              <Button size="sm" variant="secondary" asChild className="h-9 px-6">
                <Link href="/pricing">
                  View Pricing Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Sales Section */}
        <section className="border-t bg-muted/50">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our expert sales team is ready to help you find the perfect solution for your unique requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="sm" asChild className="h-9">
                  <Link href="/support">
                    Contact Sales Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="h-9">
                  <Link href="/support/live-chat">Start Live Chat</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Available 24/7 to answer your questions and provide expert guidance
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
