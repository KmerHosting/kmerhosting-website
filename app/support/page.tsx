import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Headphones, Ticket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support Center - 24/7 Help & Documentation | KmerHosting",
  description: "Get help with KmerHosting services. Access knowledge base, video tutorials, live chat support, and contact our 24/7 technical support team.",
  keywords: [
    "hosting support",
    "help center",
    "technical support",
    "hosting documentation",
    "24/7 support",
    "live chat support",
  ],
  openGraph: {
    title: "KmerHosting Support Center - 24/7 Help",
    description: "Access our knowledge base, tutorials, and 24/7 support team for all your hosting needs.",
    url: "https://kmerhosting.com/support",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/support",
  },
}

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

        {/* Support */}
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
                    <Button size="lg" variant="outline" className="w-full bg-transparent px-6 py-6" asChild>
                      <a href="https://clients.kmerhosting.com/knowledgebase.php">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Knowledge Base
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent px-6 py-6" asChild>
                      <a href="https://clients.kmerhosting.com/submitticket.php">
                        <Ticket className="mr-2 h-5 w-5" />
                        Open Support Ticket
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
