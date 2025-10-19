import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - KmerHosting",
  description: "Learn about how KmerHosting uses cookies and similar technologies on our website.",
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main>
        <article className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely
                  used to make websites work more efficiently and provide information to website owners. Cookies help us
                  understand how you use our website and improve your experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>

                <h3 className="text-xl font-semibold mb-3 mt-4">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable core functionality such
                  as security, network management, and accessibility. You cannot opt out of these cookies.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Analytics Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting
                  information anonymously.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on pages</li>
                  <li>Traffic sources</li>
                  <li>Device and browser information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Functional Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Language preferences</li>
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Region or location settings</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Marketing Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies track your online activity to help us deliver more relevant advertising and measure the
                  effectiveness of our marketing campaigns.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Advertising preferences</li>
                  <li>Campaign tracking</li>
                  <li>Conversion tracking</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use services from third-party companies that may set cookies on your device. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Google Analytics:</strong> For website analytics and performance monitoring
                  </li>
                  <li>
                    <strong>Payment Processors:</strong> For secure payment processing
                  </li>
                  <li>
                    <strong>Social Media Platforms:</strong> For social sharing features
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. How Long Do Cookies Last?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Cookies can be either:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser
                  </li>
                  <li>
                    <strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until
                    you delete them
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Managing Your Cookie Preferences</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have several options for managing cookies:
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-4">Browser Settings</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete cookies after each browsing session</li>
                  <li>Accept cookies from specific websites</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Cookie Banner</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you first visit our website, you'll see a cookie banner where you can accept or decline
                  non-essential cookies. You can change your preferences at any time by clearing your browser cookies
                  and revisiting our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Impact of Disabling Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you disable cookies, some features of our website may not function properly. Essential cookies are
                  required for the website to work, so disabling all cookies may prevent you from accessing certain
                  areas or features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or
                  our business practices. We will notify you of significant changes by posting the updated policy on our
                  website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at support@kmerhosting.site.
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
