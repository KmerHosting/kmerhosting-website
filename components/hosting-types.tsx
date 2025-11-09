"use client"

import { Check } from "lucide-react"

export default function HostingTypes() {
  const hostingTypes = [
    {
      title: "Shared Hosting",
      subtitle: "Perfect for Beginners",
      description: "Reliable hosting for small businesses and personal websites",
      features: [
        { name: "cPanel & DirectAdmin", detail: "Choose your control panel" },
        { name: "Free .com Domain", detail: "Silver plan and above" },
        { name: "Unlimited Bandwidth", detail: "No restrictions" },
        { name: "Free SSL Certificate", detail: "Secure your site" },
      ],
    },
    {
      title: "Reseller Hosting",
      subtitle: "Grow Your Business",
      description: "Build your own hosting brand with our infrastructure",
      features: [
        { name: "WHM & cPanel", detail: "Full control panel access" },
        { name: "Free .com Domain", detail: "Silver plan and above" },
        { name: "Unlimited Accounts", detail: "Create as many as needed" },
        { name: "White Label Ready", detail: "Your brand, your way" },
      ],
    },
  ]

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Choose Your Hosting Type</h2>
          <p className="text-slate-600">Perfect hosting solutions tailored to your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hostingTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-white text-sm font-semibold"
                  style={{ backgroundColor: "#128C7E" }}
                >
                  {type.title}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-slate-900">{type.subtitle}</h3>
              <p className="text-slate-600 mb-6 text-sm">{type.description}</p>

              <div className="space-y-3">
                {type.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#128C7E" }} />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-900">{feature.name}</p>
                      <p className="text-xs text-slate-500">{feature.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
