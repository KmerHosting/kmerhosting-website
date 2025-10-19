import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, MessageCircle, FileText, Video, Headphones, Phone } from "lucide-react"
import Link from "next/link"

const supportCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of setting up your hosting account",
    articles: 24,
  },
  {
    icon: FileText,
    title: "Account Management",
    description: "Manage your account, billing, and subscriptions",
    articles: 18,
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    articles: 12,
  },
  {
    icon: MessageCircle,
    title: "WordPress Help",
    description: "WordPress-specific guides and troubleshooting",
    articles: 32,
  },
]

const faqs = [
  {
    question: "How do I get started with my hosting account?",
    answer:
      "After purchasing a hosting plan, you'll receive a welcome email with your login credentials for cPanel. From there, you can install WordPress or other applications using our 1-click installer, upload files via FTP, or set up email accounts.",
  },
  {
    question: "How long does it take to set up my hosting account?",
    answer:
      "Your hosting account is activated instantly after payment confirmation. You'll receive your login details within minutes and can start building your website right away.",
  },
  {
    question: "Can I upgrade or downgrade my hosting plan?",
    answer:
      "Yes, you can upgrade or downgrade your hosting plan at any time from your account dashboard. Upgrades are instant, and you'll only pay the prorated difference. Downgrades take effect at the end of your current billing cycle.",
  },
  {
    question: "Do you offer website migration services?",
    answer:
      "Yes, we offer free website migration for Business and Professional plans. Our technical team will handle the entire migration process, ensuring zero downtime and data integrity.",
  },
  {
    question: "What is your uptime guarantee?",
    answer:
      "We guarantee 99.9% uptime for all hosting plans. If we fail to meet this guarantee, you're eligible for service credits as outlined in our Service Level Agreement (SLA).",
  },
  {
    question: "How do I create email accounts?",
    answer:
      "You can create email accounts through cPanel. Navigate to the Email Accounts section, enter your desired email address and password, and set the mailbox quota. Email accounts are created instantly.",
  },
  {
    question: "What backup options are available?",
    answer:
      "All hosting plans include daily automated backups. You can restore your website from any backup point within the last 30 days through cPanel. We also recommend maintaining your own local backups for added security.",
  },
  {
    question: "How do I install SSL certificates?",
    answer:
      "Free SSL certificates are automatically installed on all domains. You can enable HTTPS through cPanel's SSL/TLS section. The process is automatic and takes just a few minutes.",
  },
]

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">How can we help you?</h1>
              <p className="text-lg text-muted-foreground text-balance mb-8">
                Search our knowledge base or browse categories to find answers to your questions.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="search" placeholder="Search for help articles..." className="pl-12 h-12 text-base" />
              </div>
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Browse by category</h2>
              <p className="text-lg text-muted-foreground">Find helpful articles organized by topic</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Badge variant="secondary">{category.articles} articles</Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently asked questions</h2>
                <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Still need help?</CardTitle>
                  <CardDescription className="text-base">
                    Our support team is available 24/7 to assist you with any questions or issues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/contact">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                      <a href="https://wa.me/237694193493" target="_blank" rel="noopener noreferrer">
                        <Phone className="mr-2 h-5 w-5" />
                        WhatsApp Chat
                      </a>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-sm text-muted-foreground mb-2">Average response time</p>
                    <p className="text-2xl font-bold">1-2 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
