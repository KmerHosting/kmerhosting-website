import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

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

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Find quick answers to the most common questions about our hosting services.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
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

        {/* Still Need Help */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Still need help?</CardTitle>
                  <CardDescription className="text-base">
                    Our support team is available 24/7 to assist you with any questions or issues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/support/live-chat">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Live chat
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                      <a href="https://wa.me/237694193493?text=Hi%20KmerHosting,%20I%20need%20help" target="_blank" rel="noopener noreferrer">
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