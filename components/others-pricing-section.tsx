"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Mail, Globe, Code, Brain, GraduationCap, ArrowRight, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { SalesContactDialog } from "@/components/sales-contact-dialog"

export default function OthersPricingSection() {
  const { addItem } = useCart()
  const [showSalesDialog, setShowSalesDialog] = useState(false)
  const [addedItem, setAddedItem] = useState<string | null>(null)

  const pricingPlans = [
    {
      name: "Email Hosting",
      icon: Mail,
      plans: [
        {
          name: "Basic",
          price: 15000,
          period: "year",
          features: [
            "900 FCFA/month",
            "5 Email Accounts",
            "1 GB Storage per Email",
            "Free .com or .org Domain",
            "SMTP/POP3/IMAP",
            "Webmail Access",
            "99.9% Uptime SLA",
          ],
          cta: "Get Started",
          popular: false,
        },
        {
          name: "Professional",
          price: 25000,
          period: "year",
          features: [
            "~2,083 FCFA/month",
            "50 Email Accounts",
            "5 GB Storage per Email",
            "1 Free Domain .com (Annual billing) (.info, .com, .org, .online, .blog, .dev)",
            "Advanced Spam Filter",
            "99.95% Uptime SLA",
            "Priority Support",
            "Email & Chat Support",
          ],
          cta: "Get Started",
          popular: true,
        },
        {
          name: "Enterprise",
          price: 30000,
          period: "year",
          features: [
            "~2,500 FCFA/month",
            "Unlimited Email Accounts",
            "Unlimited Storage",
            "Free Any TLD Domain (.*)",
            "Full Management Suite",
            "Advanced Security",
            "99.99% Uptime SLA",
            "24/7 Premium Support",
            "Dedicated Account Manager",
          ],
          cta: "Get Started",
          popular: false,
        },
      ],
    },
    {
      name: "WordPress Hosting",
      icon: Globe,
      plans: [
        {
          name: "Starter",
          price: 12500,
          period: "year",
          features: [
            "1 WordPress Install",
            "50 GB SSD Storage",
            "Auto-updates",
            "Daily Backups",
            "99.9% Uptime",
          ],
          cta: "Get Started",
          popular: false,
        },
        {
          name: "Professional",
          price: 22500,
          period: "year",
          features: [
            "5 WordPress Installs",
            "250 GB SSD Storage",
            "Auto-updates & Security",
            "Daily Backups",
            "CDN Included",
            "99.95% Uptime",
            "Free SSL Let's Encrypt Certificate",
          ],
          cta: "Get Started",
          popular: true,
        },
        {
          name: "Business",
          price: 45000,
          period: "year",
          features: [
            "Unlimited WordPress Installs",
            "Unlimited Storage",
            "Advanced Security",
            "Hourly Backups",
            "Global CDN",
            "99.99% Uptime SLA",
            "Dedicated Resources",
            "Priority Support",
          ],
          cta: "Contact Sales",
          popular: false,
        },
      ],
    },
    {
      name: "Laravel Hosting",
      icon: Code,
      plans: [
        {
          name: "Starter",
          price: 15000,
          period: "year",
          features: [
            "1 Application",
            "2 GB RAM",
            "10 GB SSD Storage",
            "Node.js Support",
            "99.9% Uptime",
          ],
          cta: "Get Started",
          popular: false,
        },
        {
          name: "Professional",
          price: 30000,
          period: "year",
          features: [
            "5 Applications",
            "4 GB RAM",
            "50 GB SSD Storage",
            "Node.js & Python Support",
            "Redis Caching",
            "Git Integration",
            "99.95% Uptime",
            "Free SSL Let's Encrypt Certificate",
          ],
          cta: "Get Started",
          popular: true,
        },
        {
          name: "Enterprise",
          price: 60000,
          period: "year",
          features: [
            "Unlimited Applications",
            "8 GB RAM",
            "Unlimited Storage",
            "Full Development Stack",
            "Redis & Database",
            "Advanced Monitoring",
            "99.99% Uptime SLA",
            "Dedicated Support",
          ],
          cta: "Contact Sales",
          popular: false,
        },
      ],
    },
    {
      name: "LLM & AI Hosting",
      icon: Brain,
      plans: [
        {
          name: "Starter",
          price: 75000,
          period: "year",
          features: [
            "1x T4 GPU",
            "8 GB GPU Memory",
            "16 GB System RAM",
            "100 GB SSD Storage",
            "CUDA Pre-installed",
          ],
          cta: "Get Started",
          popular: false,
        },
        {
          name: "Professional",
          price: 150000,
          period: "year",
          features: [
            "2x A100 GPUs",
            "40 GB GPU Memory",
            "64 GB System RAM",
            "500 GB NVMe Storage",
            "ML Frameworks Ready",
            "CUDA & cuDNN",
            "99.9% Uptime",
            "Scientific Computing Stack",
          ],
          cta: "Get Started",
          popular: true,
        },
        {
          name: "Enterprise",
          price: 300000,
          period: "year",
          features: [
            "4x A100 GPUs",
            "80 GB GPU Memory",
            "256 GB System RAM",
            "2TB NVMe Storage",
            "Complete ML Stack",
            "Custom Configuration",
            "99.99% Uptime SLA",
            "Dedicated Infrastructure",
            "White-glove Support",
          ],
          cta: "Contact Sales",
          popular: false,
        },
      ],
    },
    {
      name: "Student Hosting",
      icon: GraduationCap,
      plans: [
        {
          name: "Student Plan",
          price: 10800,
          period: "year",
          features: [
            "900 FCFA/month",
            "Perfect for Students",
            "Affordable & Reliable",
            "Email Support",
            "99.9% Uptime",
            "Free SSL Let's Encrypt Certificate",
            "Educational Pricing",
          ],
          cta: "Get Started",
          popular: true,
        },
      ],
    },
  ]

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Specialized Services Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your specific needs
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-16">
          {pricingPlans.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.name}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                    <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{service.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md transition-all overflow-hidden"
                    >
                      {plan.popular && (
                        <div
                          className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10"
                          style={{ backgroundColor: "#128C7E" }}
                        >
                          POPULAR
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-xl font-bold mb-6" style={{ color: "#128C7E" }}>
                        {plan.price.toLocaleString()} FCFA
                      </p>

                      <button
                        className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer mb-6 ${
                          addedItem === `${service.name}-${plan.name}` ? "bg-green-600" : ""
                        }`}
                        style={{ backgroundColor: addedItem === `${service.name}-${plan.name}` ? "#16a34a" : "#128C7E" }}
                        onMouseEnter={(e) => {
                          if (addedItem !== `${service.name}-${plan.name}`) {
                            e.currentTarget.style.backgroundColor = "#0a6f62"
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (addedItem !== `${service.name}-${plan.name}`) {
                            e.currentTarget.style.backgroundColor = "#128C7E"
                          }
                        }}
                        onClick={() => {
                          if (plan.cta === "Contact Sales") {
                            setShowSalesDialog(true)
                          } else {
                            const serviceType = service.name.toLowerCase().replace(/ /g, "-")
                            addItem({
                              planType: serviceType as any,
                              planName: `${service.name} - ${plan.name}`,
                              planPrice: plan.price,
                              quantity: 1,
                            })
                            setAddedItem(`${service.name}-${plan.name}`)
                            setTimeout(() => setAddedItem(null), 2000)
                          }
                        }}
                      >
                        {addedItem === `${service.name}-${plan.name}` ? (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Added!
                          </>
                        ) : (
                          <>
                            {plan.cta === "Contact Sales" ? plan.cta : "Add to Cart"}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sales Dialog */}
        {showSalesDialog && (
          <SalesContactDialog
            open={showSalesDialog}
            onOpenChange={(open) => setShowSalesDialog(open)}
          />
        )}
      </div>
    </section>
  )
}
