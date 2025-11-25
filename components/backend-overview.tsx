"use client"

import Image from "next/image"

export default function BackendOverview() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/backend-overview.png"
              alt="Backend Overview"
              fill
              className="object-cover"
              quality={85}
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Powerful Backend Infrastructure
            </h2>
            <p className="text-slate-600 mb-6">
              Our cutting-edge backend architecture ensures optimal performance, reliability, and scalability for your hosting needs. Built with the latest technologies and best practices.
            </p>

            <ul className="space-y-4">
              {[
                "Enterprise-grade server infrastructure",
                "Advanced security and DDoS protection",
                "Automatic backups and disaster recovery",
                "Lightning-fast content delivery",
                "99.9% uptime guarantee",
                "Real-time monitoring and alerts",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5"
                    style={{ backgroundColor: "#128C7E" }}
                  />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
