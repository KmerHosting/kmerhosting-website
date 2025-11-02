import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CreditCard, Shield, AlertTriangle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy - Money-Back Guarantee | KmerHosting",
  description: "KmerHosting refund policy. Learn about our 30-day money-back guarantee, refund process, eligibility, and terms for web hosting services.",
  keywords: ["refund policy", "money back guarantee", "hosting refunds", "30-day guarantee"],
  openGraph: {
    title: "Refund Policy - 30-Day Money-Back Guarantee",
    description: "Our commitment to customer satisfaction with a 30-day money-back guarantee.",
    url: "https://kmerhosting.com/refunds",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/refunds",
  },
}

export default function RefundsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Refunds Policy
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Our commitment to customer satisfaction includes a fair and transparent refund policy.
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Refund Overview</h2>
                <p className="text-lg text-muted-foreground">
                  We offer a 30-day money-back guarantee on all hosting plans to ensure your complete satisfaction.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">30-Day Guarantee</h3>
                    <p className="text-sm text-muted-foreground">
                      Full refund within 30 days of purchase
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Instant Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Refunds processed within 3-5 business days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Questions Asked</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple refund process with minimal requirements
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Pro-rated Refunds</h3>
                    <p className="text-sm text-muted-foreground">
                      Partial refunds available for unused service time
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">30-Day Money-Back Guarantee</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you're not completely satisfied with our hosting services within the first 30 days of your subscription,
                    we'll provide a full refund of your hosting fees. This guarantee applies to all new hosting accounts.
                  </p>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What's Covered:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Shared hosting plans (Starter, Business, Professional)</li>
                      <li>WordPress hosting plans</li>
                      <li>VPS hosting plans</li>
                      <li>Domain registration fees</li>
                      <li>SSL certificate fees</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Refund Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    To be eligible for a refund, your account must meet the following criteria:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Request within 30 days:</strong> Refund requests must be submitted within 30 days of the initial purchase date.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Active account:</strong> The hosting account must still be active and in good standing.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <strong>No policy violations:</strong> The account must not have violated our Terms of Service or Acceptable Use Policy.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Reasonable usage:</strong> The account should not have excessive resource usage that indicates abuse.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>How to Request a Refund</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Requesting a refund is simple and straightforward. Follow these steps:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">1</Badge>
                      <div>
                        <h4 className="font-semibold">Contact Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Reach out to our support team via live chat, email, or phone to initiate your refund request.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">2</Badge>
                      <div>
                        <h4 className="font-semibold">Provide Details</h4>
                        <p className="text-sm text-muted-foreground">
                          Include your account information and reason for the refund request.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">3</Badge>
                      <div>
                        <h4 className="font-semibold">Review Process</h4>
                        <p className="text-sm text-muted-foreground">
                          Our team will review your request and process the refund within 3-5 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">4</Badge>
                      <div>
                        <h4 className="font-semibold">Confirmation</h4>
                        <p className="text-sm text-muted-foreground">
                          You'll receive email confirmation once the refund has been processed.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Special Cases & Exceptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Non-Refundable Items</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Domain privacy protection fees</li>
                        <li>Third-party SSL certificates (outside our free offering)</li>
                        <li>Premium support add-ons</li>
                        <li>Custom development services</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Renewal Refunds</h4>
                      <p className="text-sm text-muted-foreground">
                        Refunds for subscription renewals are processed on a case-by-case basis and may be prorated.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Domain Registration Deduction</h4>
                      <p className="text-sm text-muted-foreground">
                        Please note that a deduction of 10,000 FCFA will be applied per hosting plan for domain registration fees, as domain names cannot be canceled or refunded once registered with the domain registry.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Have questions about our refund policy or need to initiate a refund request?
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Live Chat</h4>
                      <p className="text-sm text-muted-foreground">
                        Available 24/7 for instant support
                      </p>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        info@kmerhosting.com
                      </p>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Phone</h4>
                      <p className="text-sm text-muted-foreground">
                        Available during business hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground text-center mt-8">
                Last updated: January 2025
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