"use client"

import Link from "next/link"
import { Home, Shield, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function PrivacyPolicyPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#128C7E] transition-colors cursor-pointer">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
            </button>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
              <Shield className="w-8 h-8" style={{ color: "#128C7E" }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Privacy Policy
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
                KmerHosting ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our hosting services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">2.1 Personal Information</h3>
              <p className="leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Register for an account</li>
                <li>Purchase hosting services</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="leading-relaxed mb-3">
                This information may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name and contact information (email address, phone number, postal address)</li>
                <li>Account credentials (username and password)</li>
                <li>Payment information (credit card details, Mobile Money information)</li>
                <li>Business information (company name, tax identification number)</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">2.2 Technical Information</h3>
              <p className="leading-relaxed mb-3">
                We automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">2.3 Service Usage Data</h3>
              <p className="leading-relaxed">
                When you use our hosting services, we collect data about your usage patterns, server performance metrics, bandwidth consumption, storage usage, and technical support interactions to provide and improve our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our hosting services, process transactions, and manage your account</li>
                <li><strong>Customer Support:</strong> To respond to your inquiries, provide technical assistance, and resolve issues</li>
                <li><strong>Communication:</strong> To send service updates, security alerts, billing notifications, and promotional materials (with your consent)</li>
                <li><strong>Security:</strong> To protect against unauthorized access, fraud, and other malicious activities</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
                <li><strong>Analytics:</strong> To analyze usage patterns, improve our website and services, and develop new features</li>
                <li><strong>Marketing:</strong> To send you relevant offers and information about our services (you can opt-out at any time)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">4. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our business (payment processors, data centers, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit permission for specific purposes</li>
                <li><strong>Protection:</strong> To protect our rights, property, safety, or that of our users and the public</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data centers with physical security controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and privacy</li>
                <li>Regular backups to prevent data loss</li>
              </ul>
              <p className="leading-relaxed mt-3">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">6. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When your data is no longer needed, we will securely delete or anonymize it. Account information is typically retained for the duration of your active account plus a reasonable period thereafter for legal and accounting purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">7. Your Rights and Choices</h2>
              <p className="leading-relaxed mb-3">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Objection:</strong> Object to processing of your personal information for certain purposes</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Cookie Preferences:</strong> Manage your cookie preferences through browser settings</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, please contact us at privacy@kmerhosting.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">8. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed mb-3">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. For detailed information about our use of cookies, please refer to our <Link href="/legal/cookies-policy" className="text-[#128C7E] hover:underline">Cookies Policy</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">9. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than Cameroon. We ensure that such transfers comply with applicable data protection laws and that appropriate safeguards are in place to protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">10. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">11. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">12. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">13. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                By using KmerHosting's services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
