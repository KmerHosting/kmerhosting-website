import Link from "next/link"
import { Home, DollarSign } from "lucide-react"

export default function RefundPolicyPage() {
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
              <DollarSign className="w-8 h-8" style={{ color: "#128C7E" }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Refund Policy
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
                At KmerHosting, we are committed to customer satisfaction and stand behind the quality of our hosting services. This Refund Policy outlines the terms and conditions under which refunds are issued for our products and services. Please read this policy carefully before making a purchase.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. 30-Day Money-Back Guarantee</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">2.1 Eligibility</h3>
              <p className="leading-relaxed mb-3">
                We offer a 30-day money-back guarantee on the following services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Shared Hosting plans (all tiers: Bronze, Silver, Gold, Platinum)</li>
                <li>Reseller Hosting plans (all tiers)</li>
              </ul>
              <p className="leading-relaxed mt-3">
                This guarantee applies only to new customers who have not previously used our services or customers who have not requested a refund in the past 12 months.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">2.2 Coverage</h3>
              <p className="leading-relaxed">
                If you are not satisfied with your hosting service for any reason within the first 30 days of your initial purchase, you may request a full refund of the hosting fees paid. The refund covers only the hosting service charges for the first billing period.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">2.3 How to Request</h3>
              <p className="leading-relaxed mb-3">
                To request a refund under the 30-day money-back guarantee:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our billing department by opening a ticket or via email at billing@kmerhosting.com</li>
                <li>Include your account details and reason for cancellation (optional)</li>
                <li>Allow 5-7 business days for processing</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. Services NOT Covered by Money-Back Guarantee</h2>
              <p className="leading-relaxed mb-3">
                The following products and services are NOT eligible for refunds under our 30-day money-back guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Domain Registrations:</strong> All domain name registrations and renewals are non-refundable due to registry fees</li>
                <li><strong>Domain Transfers:</strong> Fees paid for domain transfers are non-refundable</li>
                <li><strong>SSL Certificates:</strong> SSL certificates and security products are non-refundable once issued</li>
                <li><strong>Setup Fees:</strong> Any one-time setup or migration fees are non-refundable</li>
                <li><strong>VPS Servers:</strong> Virtual Private Server plans are not covered by the money-back guarantee</li>
                <li><strong>Dedicated Servers:</strong> Dedicated server plans are non-refundable due to custom configuration costs</li>
                <li><strong>Add-on Services:</strong> Additional services like extra storage, bandwidth, or IP addresses</li>
                <li><strong>Third-Party Services:</strong> Any third-party products or services purchased through us</li>
                <li><strong>Renewals:</strong> Renewal payments for any service are non-refundable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">4. Prorated Refunds</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">4.1 When Applicable</h3>
              <p className="leading-relaxed mb-3">
                Prorated refunds may be issued in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service downtime exceeding our 99.9% uptime guarantee (calculated monthly)</li>
                <li>Billing errors or duplicate charges</li>
                <li>Service termination by KmerHosting due to our fault</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">4.2 Calculation</h3>
              <p className="leading-relaxed">
                Prorated refunds are calculated based on the number of unused days remaining in your billing cycle at the time of cancellation or service termination. The daily rate is determined by dividing your plan's cost by the number of days in the billing period.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">4.3 Exclusions</h3>
              <p className="leading-relaxed">
                No prorated refunds are issued for voluntary cancellations made after the 30-day money-back guarantee period, except in cases of service failure on our part.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">5. Account Cancellation and Refunds</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">5.1 Cancellation Process</h3>
              <p className="leading-relaxed mb-3">
                To cancel your account and request a refund:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Log into your client area at kmerhosting.com/customers</li>
                <li>Navigate to Services → My Services</li>
                <li>Select the service you wish to cancel</li>
                <li>Click "Request Cancellation"</li>
                <li>Choose cancellation type (Immediate or End of Billing Period)</li>
                <li>For refunds, contact billing@kmerhosting.com with your cancellation request</li>
              </ol>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">5.2 Data Backup Responsibility</h3>
              <p className="leading-relaxed">
                Before requesting cancellation, you are responsible for backing up all your data, files, databases, and emails. Once your account is cancelled, all data will be permanently deleted and cannot be recovered. KmerHosting is not responsible for any data loss resulting from account cancellation.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">5.3 Data Retention Period</h3>
              <p className="leading-relaxed">
                After cancellation, you have 7 days to download your data before permanent deletion. After this period, all data is irrecoverably removed from our systems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">6. Refund Processing</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6.1 Processing Time</h3>
              <p className="leading-relaxed">
                Once a refund is approved, it will be processed within 5-7 business days. The time for the refund to appear in your account depends on your payment method and financial institution, typically taking 7-14 business days.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">6.2 Refund Method</h3>
              <p className="leading-relaxed mb-3">
                Refunds are issued using the same payment method used for the original purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Credit/Debit Cards:</strong> Refunded to the original card</li>
                <li><strong>Mobile Money:</strong> Refunded to the original Mobile Money account</li>
                <li><strong>Bank Transfer:</strong> Refunded to the originating bank account</li>
              </ul>
              <p className="leading-relaxed mt-3">
                If the original payment method is no longer available, please contact our billing department to arrange an alternative refund method.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">6.3 Transaction Fees</h3>
              <p className="leading-relaxed">
                Please note that transaction fees charged by payment processors (credit card fees, Mobile Money charges) are non-refundable and will be deducted from your refund amount.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">7. Service Violations and Refunds</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">7.1 Terms of Service Violations</h3>
              <p className="leading-relaxed mb-3">
                If your account is terminated due to violation of our Terms of Service or Acceptable Use Policy, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hosting illegal content</li>
                <li>Spamming or phishing activities</li>
                <li>Excessive resource usage affecting other customers</li>
                <li>Fraudulent activities</li>
                <li>Non-payment of invoices</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You will NOT be eligible for any refund, regardless of how much time remains in your billing cycle.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">7.2 Chargebacks</h3>
              <p className="leading-relaxed">
                If you initiate a chargeback or payment dispute with your financial institution without first contacting us to resolve the issue, your account will be immediately suspended. All services will remain suspended until the dispute is resolved. Fraudulent chargebacks may result in permanent account termination and legal action.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">8. Special Circumstances</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">8.1 Service Outages</h3>
              <p className="leading-relaxed">
                If we fail to meet our 99.9% uptime guarantee, you may be eligible for service credits or prorated refunds as outlined in our Service Level Agreement. Claims must be submitted within 7 days of the incident with supporting documentation.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">8.2 Force Majeure</h3>
              <p className="leading-relaxed">
                No refunds will be issued for service disruptions caused by events beyond our control, including but not limited to natural disasters, wars, terrorism, riots, power failures, internet outages, or government actions.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">8.3 Promotional Pricing</h3>
              <p className="leading-relaxed">
                If you purchased services at a promotional or discounted rate, refunds will be calculated based on the promotional price paid, not the regular price.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">9. Dispute Resolution</h2>
              <p className="leading-relaxed">
                If you disagree with our refund decision, you may request a review by contacting our management team at support@kmerhosting.com. We will investigate your case and provide a final decision within 10 business days. Our decision on refund matters is final and binding.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">10. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website with an updated "Last Updated" date. It is your responsibility to review this policy periodically. Continued use of our services after changes constitutes acceptance of the modified policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">11. Contact Information</h2>
              <p className="leading-relaxed mb-3">
                For refund requests, questions, or concerns, please contact our billing department:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">KmerHosting Billing Department</p>
                <p>Email: billing@kmerhosting.com</p>
                <p>Support: support@kmerhosting.com</p>
                <p>Phone: +237 6 94 19 34 93</p>
                <p>Address: Yaounde, Cameroon</p>
                <p className="mt-3 text-sm">Business Hours: Monday - Friday, 8:00 AM - 6:00 PM (GMT+1)</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                By purchasing services from KmerHosting, you acknowledge that you have read, understood, and agree to this Refund Policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
