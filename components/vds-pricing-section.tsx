"use client"

import { Check, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VDSPricingSection() {
  const router = useRouter()

  const vdsPlans = [
    {
      name: "CLOUD VDS S",
      price: "22,272",
      description: "Getting started with dedicated resources",
      currency: "FCFA",
      billing: "/month",
      cpu: "3 Physical Cores",
      ram: "24 GB RAM",
      storage: "180 GB SSD",
      bandwidth: "250 Mbit/s Port",
      features: [
        "3 Physical Cores",
        "24 GB RAM",
        "180 GB SSD Storage",
        "Full Admin Access",
        "Unlimited Traffic",
        "Linux or Windows",
        "Free SSL Let's Encrypt Certificate",
        "24/7 Support",
      ],
      highlighted: false,
    },
    {
      name: "CLOUD VDS M",
      price: "26,496",
      description: "Best for growing applications",
      currency: "FCFA",
      billing: "/month",
      cpu: "4 Physical Cores",
      ram: "32 GB RAM",
      storage: "240 GB SSD",
      bandwidth: "500 Mbit/s Port",
      features: [
        "4 Physical Cores",
        "32 GB RAM",
        "240 GB SSD Storage",
        "Full Admin Access",
        "Unlimited Traffic",
        "Linux or Windows",
        "Free SSL Let's Encrypt Certificate",
        "Priority Support",
        "Weekly Backups",
      ],
      highlighted: true,
    },
    {
      name: "CLOUD VDS L",
      price: "39,936",
      description: "For high-traffic applications",
      currency: "FCFA",
      billing: "/month",
      cpu: "6 Physical Cores",
      ram: "48 GB RAM",
      storage: "360 GB SSD",
      bandwidth: "750 Mbit/s Port",
      features: [
        "6 Physical Cores",
        "48 GB RAM",
        "360 GB SSD Storage",
        "Full Admin Access",
        "Unlimited Traffic",
        "Linux or Windows",
        "Free SSL Let's Encrypt Certificate",
        "24/7 Premium Support",
        "Daily Backups",
      ],
      highlighted: false,
    },
    {
      name: "CLOUD VDS XL",
      price: "52,992",
      description: "Enterprise-grade performance",
      currency: "FCFA",
      billing: "/month",
      cpu: "8 Physical Cores",
      ram: "64 GB RAM",
      storage: "480 GB SSD",
      bandwidth: "1 Gbit/s Port",
      features: [
        "8 Physical Cores",
        "64 GB RAM",
        "480 GB SSD Storage",
        "Full Admin Access",
        "Unlimited Traffic",
        "Linux or Windows",
        "Free SSL Let's Encrypt Certificate",
        "24/7 Dedicated Support",
        "Daily Backups",
      ],
      highlighted: false,
    },
    {
      name: "CLOUD VDS XXL",
      price: "74,880",
      description: "Maximum power and resources",
      currency: "FCFA",
      billing: "/month",
      cpu: "12 Physical Cores",
      ram: "96 GB RAM",
      storage: "720 GB SSD",
      bandwidth: "1 Gbit/s Port",
      features: [
        "12 Physical Cores",
        "96 GB RAM",
        "720 GB SSD Storage",
        "Full Admin Access",
        "Unlimited Traffic",
        "Linux or Windows",
        "Free SSL Let's Encrypt Certificate",
        "24/7 Dedicated Support",
        "Daily Backups",
      ],
      highlighted: false,
    },
  ]

  const handleConfigurePlan = (planName: string) => {
    router.push(`/vds-hosting/configure?plan=${encodeURIComponent(planName)}`)
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            VDS Hosting Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Dedicated CPU cores with guaranteed performance. Perfect for applications requiring dedicated resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {vdsPlans.map((plan, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md transition-all overflow-hidden"
            >
              {plan.highlighted && (
                <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                  POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="text-xl font-bold mb-4" style={{ color: "#128C7E" }}>
                {plan.price} {plan.currency}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer hover:opacity-90"
                style={{ backgroundColor: "#128C7E" }}
                onClick={() => handleConfigurePlan(plan.name)}
              >
                Configure
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
