import Link from "next/link"
import { Home, Cookie } from "lucide-react"

export default function CookiesPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#128C7E] transition-colors mb-8 cursor-pointer">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
              <Cookie className="w-8 h-8" style={{ color: "#128C7E" }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Cookies Policy
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Last Updated: May 5, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-8 text-slate-700 dark:text-slate-300">
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
              <p className="leading-relaxed">
                This Cookies Policy explains how KmerHosting ("we," "us," or "our") uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies in accordance with this policy. If you do not agree with our use of cookies, you should adjust your browser settings or refrain from using our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. What Are Cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies allow websites to remember your actions and preferences (such as login details, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.1 Essential Cookies</h3>
              <p className="leading-relaxed mb-3">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, services you have requested cannot be provided.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged into your account</li>
                <li><strong>Security Cookies:</strong> Detect authentication abuse and protect your account</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">3.2 Functional Cookies</h3>
              <p className="leading-relaxed mb-3">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Preference Cookies:</strong> Remember your settings like language, region, and theme</li>
                <li><strong>User Interface Cookies:</strong> Store your interface preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">3.3 Analytics Cookies</h3>
              <p className="leading-relaxed mb-3">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve our website's performance and user experience.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Tracks website usage, traffic sources, and user behavior</li>
                <li><strong>Performance Cookies:</strong> Collect information about how visitors use our website</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">3.4 Marketing Cookies</h3>
              <p className="leading-relaxed mb-3">
                These cookies track your online activity to help us deliver more relevant advertising or to limit how many times you see an advertisement.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Advertising Cookies:</strong> Used to deliver advertisements relevant to you</li>
                <li><strong>Retargeting Cookies:</strong> Show you relevant ads on other websites</li>
                <li><strong>Social Media Cookies:</strong> Enable social media sharing functionality</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">4. Third-Party Cookies</h2>
              <p className="leading-relaxed mb-3">
                We use third-party services that may set cookies on your device. These services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>Payment Processors:</strong> To process secure payments (e.g., Stripe, PayPal)</li>
                <li><strong>Social Media Platforms:</strong> For social sharing buttons (Facebook, Twitter, LinkedIn)</li>
                <li><strong>Live Chat Services:</strong> For customer support functionality</li>
                <li><strong>Content Delivery Networks (CDNs):</strong> To deliver website content efficiently</li>
              </ul>
              <p className="leading-relaxed mt-3">
                These third parties have their own privacy and cookie policies. We recommend reviewing their policies to understand how they use cookies and collect data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">5. How We Use Cookies</h2>
              <p className="leading-relaxed mb-3">
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authentication:</strong> To keep you logged into your account and remember your session</li>
                <li><strong>Security:</strong> To detect and prevent fraudulent activity and protect your account</li>
                <li><strong>Preferences:</strong> To remember your settings, language, and display preferences</li>
                <li><strong>Analytics:</strong> To understand how you use our website and improve our services</li>
                <li><strong>Performance:</strong> To monitor website performance and identify areas for improvement</li>
                <li><strong>Marketing:</strong> To deliver relevant advertising and measure campaign effectiveness</li>
                <li><strong>Functionality:</strong> To provide enhanced features and personalized content</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">6. Cookie Duration</h2>
              <p className="leading-relaxed mb-3">
                Cookies can be session-based or persistent:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you manually delete them. These can last from a few days to several years depending on their purpose</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">7. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">7.1 Browser Settings</h3>
              <p className="leading-relaxed mb-3">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delete all cookies from your browser</li>
                <li>Block all cookies from being set</li>
                <li>Allow cookies only from specific websites</li>
                <li>Block third-party cookies</li>
                <li>Clear cookies when you close your browser</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">7.2 Browser-Specific Instructions</h3>
              <p className="leading-relaxed mb-3">
                Here's how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                <li><strong>Opera:</strong> Settings → Privacy & security → Cookies and other site data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">7.3 Mobile Devices</h3>
              <p className="leading-relaxed">
                For mobile devices, refer to your device manufacturer's instructions or your mobile browser's help section to manage cookies and tracking preferences.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">7.4 Opt-Out Tools</h3>
              <p className="leading-relaxed mb-3">
                You can opt-out of certain types of cookies and tracking:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
                <li><strong>Advertising Cookies:</strong> Visit www.aboutads.info/choices or www.youronlinechoices.eu</li>
                <li><strong>Do Not Track (DNT):</strong> Enable DNT in your browser settings (note: not all websites honor DNT signals)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">8. Impact of Disabling Cookies</h2>
              <p className="leading-relaxed mb-3">
                While you have the right to disable cookies, please note that doing so may affect your experience on our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not be able to log into your account</li>
                <li>Some features and services may not function properly</li>
                <li>Your preferences and settings will not be remembered</li>
                <li>The website may not display correctly</li>
                <li>You may see less relevant content and advertisements</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Essential cookies cannot be disabled as they are necessary for the website to function.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">9. Other Tracking Technologies</h2>
              <p className="leading-relaxed mb-3">
                In addition to cookies, we may use other tracking technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Web Beacons:</strong> Small transparent images embedded in web pages to track user behavior</li>
                <li><strong>Local Storage:</strong> HTML5 local storage for storing data in your browser</li>
                <li><strong>Pixel Tags:</strong> Tiny graphics used to track page views and user actions</li>
                <li><strong>Log Files:</strong> Server logs that record website activity and technical information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">10. Updates to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our business practices. We will post the updated policy on this page with a new "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">11. Your Consent</h2>
              <p className="leading-relaxed">
                By using our website, you consent to the use of cookies as described in this policy. When you first visit our website, you will see a cookie banner informing you about our use of cookies. You can accept or decline non-essential cookies through this banner. Continuing to use our website after seeing the banner constitutes acceptance of our cookie policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">12. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">KmerHosting</p>
                <p>Email: privacy@kmerhosting.com</p>
                <p>Phone: +237 6 94 19 34 93</p>
                <p>Address: Yaounde, Cameroon</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                For more information about how we handle your personal data, please review our <Link href="/legal/privacy-policy" className="text-[#128C7E] hover:underline">Privacy Policy</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
