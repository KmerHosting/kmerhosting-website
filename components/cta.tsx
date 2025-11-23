"use client"

import { Server, Users, HardDrive, Database } from "lucide-react"

export default function CTA() {
  const hostingOptions = [
    {
      title: "Shared Hosting",
      description: "Perfect for personal websites and small businesses",
      icon: Users,
      link: "/shared-hosting",
    },
    {
      title: "Reseller Hosting",
      description: "Start your own hosting business with ease",
      icon: Server,
      link: "/reseller-hosting",
    },
    {
      title: "VPS Servers",
      description: "Scalable resources and full root access",
      icon: HardDrive,
      link: "/vps-hosting",
    },
    {
      title: "Dedicated Servers",
      description: "Maximum performance and complete control",
      icon: Database,
      link: "/dedicated-server",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the perfect hosting solution for your needs. All plans include 24/7 support and 99.9% uptime guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hostingOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <a
                key={index}
                href={option.link}
                className="group cursor-pointer"
              >
                <div className="h-full p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-900" style={{ borderColor: "#128C7E" }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-xl transition-transform group-hover:scale-110" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-8 h-8" style={{ color: "#128C7E" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                      {option.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {option.description}
                    </p>
                    <div className="mt-auto">
                      <span className="text-sm font-semibold transition-colors" style={{ color: "#128C7E" }}>
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
