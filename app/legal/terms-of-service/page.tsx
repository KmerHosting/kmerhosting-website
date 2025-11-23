import Link from "next/link"
import { Home, FileText } from "lucide-react"

export default function TermsOfServicePage() {
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
              <FileText className="w-8 h-8" style={{ color: "#128C7E" }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Terms of Service
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
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                Welcome to KmerHosting. By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services. These Terms constitute a legally binding agreement between you ("Customer," "you," or "your") and KmerHosting ("we," "us," or "our").
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. Service Description</h2>
              <p className="leading-relaxed mb-3">
                KmerHosting provides web hosting services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Shared Hosting with cPanel or DirectAdmin control panels</li>
                <li>Reseller Hosting with WHM and cPanel</li>
                <li>Virtual Private Server (VPS) Hosting</li>
                <li>Dedicated Servers Hosting</li>
                <li>Domain registration and management services</li>
                <li>Email hosting and related services</li>
                <li>SSL certificates and security features</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. Account Registration and Security</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.1 Account Creation</h3>
              <p className="leading-relaxed mb-3">
                To use our services, you must create an account by providing accurate, complete, and current information. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide truthful and accurate registration information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Be at least 18 years of age or have parental/guardian consent</li>
                <li>Be responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">3.2 Account Security</h3>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized access or security breach. We are not liable for losses resulting from unauthorized use of your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">4. Acceptable Use Policy</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">4.1 Prohibited Activities</h3>
              <p className="leading-relaxed mb-3">
                You agree not to use our services for any illegal or unauthorized purposes, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hosting or distributing malware, viruses, or malicious code</li>
                <li>Sending spam, unsolicited emails, or engaging in phishing activities</li>
                <li>Hosting illegal content including pirated software, copyrighted material without authorization</li>
                <li>Adult content, pornography, or sexually explicit material</li>
                <li>Content promoting violence, terrorism, or hate speech</li>
                <li>Fraudulent activities, scams, or pyramid schemes</li>
                <li>Cryptocurrency mining without prior authorization</li>
                <li>DDoS attacks or network disruption activities</li>
                <li>Proxy or VPN services without prior approval</li>
                <li>Excessive resource usage that affects server performance for other users</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">4.2 Resource Usage</h3>
              <p className="leading-relaxed">
                While we offer "unlimited" bandwidth on certain plans, fair use policies apply. Excessive CPU usage, memory consumption, or storage that negatively impacts server performance may result in account suspension or requirement to upgrade to a higher plan.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">4.3 Enforcement</h3>
              <p className="leading-relaxed">
                Violation of this Acceptable Use Policy may result in immediate account suspension or termination without refund. We reserve the right to determine what constitutes a violation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">5. Payment and Billing</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">5.1 Fees and Payment</h3>
              <p className="leading-relaxed mb-3">
                You agree to pay all fees associated with your selected hosting plan according to the billing cycle you choose (monthly, quarterly, semi-annual, or annual). Payment methods include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit/Debit cards</li>
                <li>Mobile Money (MTN Mobile Money, Orange Money)</li>
                <li>Bank transfers</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">5.2 Automatic Renewal</h3>
              <p className="leading-relaxed">
                Services automatically renew at the end of each billing period unless you cancel before the renewal date. You will be charged the then-current rate for your plan.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">5.3 Late Payments</h3>
              <p className="leading-relaxed">
                Accounts with overdue payments may be suspended after a grace period. Suspended accounts that remain unpaid for 30 days may be terminated, and all data will be permanently deleted.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">5.4 Refunds</h3>
              <p className="leading-relaxed">
                Refund requests are subject to our <Link href="/legal/refund-policy" className="text-[#128C7E] hover:underline">Refund Policy</Link>. Generally, we offer a 30-day money-back guarantee for new hosting accounts (excluding domain registrations and setup fees).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">6. Service Level Agreement (SLA)</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6.1 Uptime Guarantee</h3>
              <p className="leading-relaxed">
                We guarantee 99.9% uptime for our hosting services. Uptime is calculated monthly and excludes scheduled maintenance and circumstances beyond our control (force majeure events, DDoS attacks, third-party failures).
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">6.2 Scheduled Maintenance</h3>
              <p className="leading-relaxed">
                We perform scheduled maintenance with advance notice when possible. Emergency maintenance may occur without prior notice to address security vulnerabilities or critical issues.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">6.3 Service Credits</h3>
              <p className="leading-relaxed">
                If we fail to meet our 99.9% uptime guarantee, you may be eligible for service credits. Credits must be requested within 7 days of the incident and are subject to verification.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">7. Data Backup and Security</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">7.1 Backup Policy</h3>
              <p className="leading-relaxed">
                We perform regular backups of server data for disaster recovery purposes. However, backups are provided as a courtesy and are not guaranteed. You are solely responsible for maintaining your own backups of all data, content, and files.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">7.2 Data Security</h3>
              <p className="leading-relaxed">
                We implement industry-standard security measures, but no system is completely secure. We are not liable for unauthorized access resulting from vulnerabilities in your applications, weak passwords, or security breaches beyond our control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">8. Intellectual Property</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">8.1 Our Content</h3>
              <p className="leading-relaxed">
                All content on our website, including text, graphics, logos, and software, is the property of KmerHosting and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">8.2 Your Content</h3>
              <p className="leading-relaxed">
                You retain ownership of all content you upload to our servers. By using our services, you grant us a limited license to host, store, and display your content as necessary to provide services. You warrant that you have all necessary rights to your content and that it does not infringe on third-party rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">9. Termination</h2>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">9.1 Termination by You</h3>
              <p className="leading-relaxed">
                You may cancel your services at any time through your client area. Cancellations take effect at the end of your current billing period. No refunds are provided for partial periods unless covered by our refund policy.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">9.2 Termination by Us</h3>
              <p className="leading-relaxed">
                We may suspend or terminate your account immediately if you violate these Terms, engage in illegal activities, or fail to pay amounts due. Upon termination, you will lose access to all data and content stored on our servers.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">9.3 Data Retrieval</h3>
              <p className="leading-relaxed">
                After account termination, you have 7 days to retrieve your data. After this period, all data will be permanently deleted and cannot be recovered.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">10. Limitation of Liability</h2>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, KMERHOSTING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your use or inability to use our services</li>
                <li>Unauthorized access to your data</li>
                <li>Service interruptions or errors</li>
                <li>Data loss or corruption</li>
                <li>Third-party conduct or content</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Our total liability for any claim arising from these Terms or use of our services shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">11. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless KmerHosting, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your violation of these Terms, your use of our services, or your violation of any third-party rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">12. Modifications to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through your client area. Continued use of our services after changes become effective constitutes acceptance of the modified Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">13. Governing Law and Dispute Resolution</h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws of Cameroon. Any disputes arising from these Terms or use of our services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be subject to the exclusive jurisdiction of the courts of Cameroon.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">14. Contact Information</h2>
              <p className="leading-relaxed mb-3">
                For questions regarding these Terms of Service, please contact us:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">KmerHosting</p>
                <p>Email: legal@kmerhosting.com</p>
                <p>Support: support@kmerhosting.com</p>
                <p>Phone: +237 6 94 19 34 93</p>
                <p>Address: Yaounde, Cameroon</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                By using KmerHosting's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
