"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

const faqs = [
    {
        question: "What types of hosting services does KmerHosting offer?",
        answer: "We offer four main types of hosting services: Shared Hosting (perfect for beginners and small websites), Reseller Hosting (for entrepreneurs wanting to start their own hosting business), VPS Servers (virtual private servers with dedicated resources), and Dedicated Servers (entire physical servers for enterprise needs). Each service comes with different features and pricing to match your specific requirements."
    },
    {
        question: "Do you offer a free domain with hosting plans?",
        answer: "Yes! We offer a free .com domain with our Shared Hosting plans when you choose annual billing. This applies to our Silver, Gold, and Platinum shared and reseller hosting packages. The free domain is valid as long as you remain on annual billing hosting service."
    },
    {
        question: "What control panels do you support?",
        answer: "We support both cPanel and DirectAdmin control panels for Shared Hosting. For Reseller Hosting, we provide WHM (Web Host Manager) along with cPanel. Both control panels are user-friendly and come with comprehensive tools for managing your websites, emails, databases, and more."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept multiple payment methods including Mobile Money (MTN Mobile Money, Orange Money), bank transfers, and credit/debit cards. All payments are processed securely through our payment gateway. We offer flexible billing cycles including monthly, quarterly, semi-annual, and annual options."
    },
    {
        question: "Is there a money-back guarantee?",
        answer: "Yes, we offer a 30-day money-back guarantee on all new hosting accounts. If you're not satisfied with our services within the first 30 days, you can request a full refund. This applies to hosting fees only and excludes domain registration costs and setup fees."
    },
    {
        question: "How long does it take to set up my hosting account?",
        answer: "Most hosting accounts are activated instantly or within a few minutes after payment confirmation. For VPS and Dedicated Server orders, setup typically takes 24-48 hours as we configure the server according to your specifications. You'll receive an email with your login details once your account is ready."
    },
    {
        question: "Do you provide SSL certificates?",
        answer: "Yes! Free SSL certificates are included with all our hosting plans. SSL certificates encrypt data between your website and visitors, essential for security and SEO. The certificates are automatically installed and renewed, so you don't have to worry about manual configuration."
    },
    {
        question: "What is your uptime guarantee?",
        answer: "We guarantee 99.9% uptime for all our hosting services. Our infrastructure is built with redundancy and reliability in mind, featuring enterprise-grade hardware, multiple network connections, and 24/7 monitoring. In the rare event of downtime, our team works immediately to resolve any issues."
    },
    {
        question: "Can I upgrade or downgrade my hosting plan?",
        answer: "Absolutely! You can upgrade your hosting plan at any time through your client area. Upgrades are processed immediately, and you'll only pay the prorated difference. Downgrades can be requested by contacting our support team, and will take effect at your next billing cycle."
    },
    {
        question: "Do you offer website migration services?",
        answer: "Yes, we provide free website migration assistance for new customers moving from another hosting provider. Our technical team will help transfer your websites, databases, and email accounts to ensure a smooth transition with minimal downtime. Contact our support team to schedule your migration."
    },
    {
        question: "What kind of support do you provide?",
        answer: "We offer 24/7 customer support through multiple channels including email, live chat, and phone. Our support team is fluent in both English and French, understanding the unique needs of Cameroonian businesses. We provide technical assistance, billing support, and general guidance to ensure your success."
    },
    {
        question: "Are backups included with hosting plans?",
        answer: "Yes, we perform regular automated backups of all hosting accounts. Shared Hosting includes weekly backups, while VPS and Dedicated Servers can be configured with daily backups. You can also create manual backups anytime through your control panel. We recommend keeping local backups of critical data as well."
    },
    {
        question: "Can I host multiple websites on one account?",
        answer: "Yes! Depending on your plan, you can host multiple websites. Our Bronze plan supports 2 websites, Silver supports 5, Gold supports 20, and Platinum offers unlimited websites. Each website can have its own domain name, and you manage them all from a single control panel."
    },
    {
        question: "Do you offer email hosting with your plans?",
        answer: "Yes, all our hosting plans include email hosting with your domain name. You can create professional email addresses (like info@yourdomain.com) and access them via webmail or email clients like Outlook and Thunderbird. The number of email accounts varies by plan, with unlimited emails on higher-tier packages."
    },
    {
        question: "What happens if my website exceeds bandwidth or storage limits?",
        answer: "If you exceed your plan's limits, we'll notify you via email. Most of our plans include unlimited bandwidth, but storage limits vary by plan. You can either upgrade to a higher plan with more resources or purchase additional storage. We never suspend accounts without prior warning, and our team will help you find the best solution for your needs."
    }
]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#128C7E] transition-colors mb-8 cursor-pointer">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked <span style={{ color: "#128C7E" }}>Questions</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Find answers to common questions about our hosting services, billing, support, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#128C7E] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-slate-600 dark:text-slate-400">
                No questions found matching "{searchQuery}". Try different keywords.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 hover:border-[#128C7E] transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: "#128C7E" }} />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Still Have Questions?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Our support team is available 24/7 to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="https://kmerhosting.com/customers/contact.php">
                Contact Support
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer hover:bg-[#128C7E] hover:!text-white transition-all"
              style={{ color: "#128C7E", borderColor: "#128C7E" }}
            >
              <Link href="/#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
