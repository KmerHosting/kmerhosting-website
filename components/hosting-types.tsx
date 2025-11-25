"use client"

import { Check, ChevronLeft, ChevronRight, Users, Server, HardDrive, Database } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function HostingTypes() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const hostingTypes = [
    {
      title: "Shared Hosting",
      subtitle: "Perfect for Beginners",
      description: "Reliable hosting for small businesses and personal websites",
      icon: Users,
      features: [
        { name: "cPanel & DirectAdmin", detail: "Choose your control panel" },
        { name: "Free Domain", detail: "For every plans chosen" },
        { name: "Unlimited Bandwidth", detail: "No restrictions" },
        { name: "Free SSL Certificate", detail: "Secure your site" },
      ],
    },
    {
      title: "Reseller Hosting",
      subtitle: "Grow Your Business",
      description: "Build your own hosting brand with our infrastructure",
      icon: Server,
      features: [
        { name: "WHM & cPanel", detail: "Full control panel access" },
        { name: "Free Domain", detail: "For every plans chosen" },
        { name: "Unlimited Accounts", detail: "Create as many as needed" },
        { name: "White Label Ready", detail: "Your brand, your way" },
      ],
    },
    {
      title: "VPS Servers",
      subtitle: "Power & Control",
      description: "Dedicated resources with full root access for your applications",
      icon: HardDrive,
      features: [
        { name: "Full Root Access", detail: "Complete server control" },
        { name: "Dedicated Resources", detail: "CPU, RAM, and storage" },
        { name: "Scalable Infrastructure", detail: "Grow as you need" },
        { name: "Linux or Windows", detail: "Choose your OS" },
      ],
    },
    {
      title: "Dedicated Servers",
      subtitle: "Maximum Performance",
      description: "Entire physical server exclusively for your business needs",
      icon: Database,
      features: [
        { name: "Exclusive Server", detail: "All resources for you" },
        { name: "Enterprise Grade", detail: "Premium hardware" },
        { name: "Enhanced Security", detail: "Isolated environment" },
        { name: "Managed Options", detail: "We handle the details" },
      ],
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hostingTypes.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hostingTypes.length) % hostingTypes.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-8 mb-8">
            <div className="relative w-56 h-56 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center">
              <Image
                src="/cPanel-logo.webp"
                alt="cPanel Logo"
                width={200}
                height={200}
                className="object-contain dark:hidden"
              />
              <Image
                src="/cPanel-white.png"
                alt="cPanel Logo"
                width={200}
                height={200}
                className="object-contain hidden dark:block"
              />
            </div>
            <div className="relative w-56 h-56 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center">
              <Image
                src="/DA-logo.png"
                alt="DirectAdmin Logo"
                width={200}
                height={200}
                className="object-contain dark:hidden"
              />
              <Image
                src="/DirectAdmin-white.png"
                alt="DirectAdmin Logo"
                width={150}
                height={150}
                className="object-contain hidden dark:block"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            We Have The Right Hosting Plan For You
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Powerful hosting solutions designed to grow with your business
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop View - Show 2 cards */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-8">
              {[currentIndex, (currentIndex + 1) % hostingTypes.length].map((index) => {
                const type = hostingTypes[index]
                const Icon = type.icon
                return (
                  <div key={index} className="bg-transparent rounded-lg p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                        <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{type.title}</h3>
                        <p className="text-sm font-medium" style={{ color: "#128C7E" }}>{type.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{type.description}</p>

                    <div className="space-y-3">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#128C7E" }} />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-slate-900 dark:text-white">{feature.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{feature.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile View - Show 1 card */}
          <div className="md:hidden">
            <div className="bg-transparent rounded-lg p-8">
              {(() => {
                const type = hostingTypes[currentIndex]
                const Icon = type.icon
                return (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                        <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{type.title}</h3>
                        <p className="text-sm font-medium" style={{ color: "#128C7E" }}>{type.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{type.description}</p>

                    <div className="space-y-3">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#128C7E" }} />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-slate-900 dark:text-white">{feature.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{feature.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            style={{ color: "#128C7E" }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            style={{ color: "#128C7E" }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {hostingTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentIndex
                  ? "w-8"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              style={index === currentIndex ? { backgroundColor: "#128C7E" } : {}}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
