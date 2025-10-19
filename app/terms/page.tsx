import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - KmerHosting",
  description: "Read our terms of service and understand the rules and regulations for using KmerHosting services.",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <article className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using KmerHosting services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  KmerHosting provides web hosting services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Shared web hosting</li>
                  <li>WordPress hosting</li>
                  <li>Virtual Private Server (VPS) hosting</li>
                  <li>Domain registration and management</li>
                  <li>Email hosting services</li>
                  <li>SSL certificates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use our services, you must register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use our services to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Transmit malware, viruses, or harmful code</li>
                  <li>Send spam or unsolicited communications</li>
                  <li>Host illegal content or engage in illegal activities</li>
                  <li>Attempt to gain unauthorized access to other systems</li>
                  <li>Interfere with or disrupt our services or servers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment and Billing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All fees are stated in USD and are non-refundable except as required by law or as explicitly stated in
                  our refund policy. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Pay all fees associated with your selected hosting plan</li>
                  <li>Provide valid payment information</li>
                  <li>Authorize automatic renewal unless you cancel before the renewal date</li>
                  <li>Pay any applicable taxes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 30-day money-back guarantee on all new hosting plans. To request a refund, contact our
                  support team within 30 days of your initial purchase. Refunds do not apply to domain registrations,
                  SSL certificates, or add-on services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Service Level Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We guarantee 99.9% uptime for all hosting services. If we fail to meet this guarantee, you may be
                  eligible for service credits. Scheduled maintenance and circumstances beyond our control are excluded
                  from this guarantee.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Data Backup</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we perform regular backups of our servers, you are responsible for maintaining your own backups
                  of your data. We are not liable for any data loss.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account if you violate these terms or engage in
                  activities that harm our services or other users. You may cancel your account at any time through your
                  account dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KmerHosting shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages resulting from your use or inability to use our services. Our total liability shall not exceed
                  the amount you paid for services in the past 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify you of significant changes via
                  email or through our website. Your continued use of our services after such modifications constitutes
                  acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Service, please contact us at hello@kmerhosting.site.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
