"use client"

import Link from "next/link"
import { Check, ArrowRight, Database, Cpu, HardDrive, Network, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DedicatedServerPage() {
  const features = [
    {
      icon: Database,
      title: "Exclusive Server Resources",
      description: "The entire physical server is dedicated exclusively to you. No sharing of CPU, RAM, storage, or bandwidth with anyone else.",
    },
    {
      icon: Cpu,
      title: "Maximum Performance",
      description: "Enterprise-grade hardware delivers exceptional performance for demanding applications, high-traffic websites, and resource-intensive workloads.",
    },
    {
      icon: HardDrive,
      title: "Complete Customization",
      description: "Choose your hardware specifications, operating system, and software stack. Configure everything to match your exact requirements.",
    },
    {
      icon: Network,
      title: "Enhanced Security & Reliability",
      description: "Isolated environment provides maximum security. Redundant power, network, and cooling systems ensure 99.9% uptime.",
    },
  ]

  const specifications = [
    {
      name: "Essential",
      cpu: "Intel Xeon E-2236",
      cores: "6 Cores / 12 Threads",
      ram: "32 GB DDR4 ECC",
      storage: "2x 1TB NVMe SSD",
      bandwidth: "10 TB/month",
      features: ["Full Root Access", "5 IPv4 Addresses", "RAID 1 Configuration", "Remote Management (IPMI)", "DDoS Protection", "99.9% Uptime SLA"],
    },
    {
      name: "Business",
      cpu: "Intel Xeon E-2288G",
      cores: "8 Cores / 16 Threads",
      ram: "64 GB DDR4 ECC",
      storage: "2x 2TB NVMe SSD",
      bandwidth: "20 TB/month",
      features: ["Full Root Access", "8 IPv4 Addresses", "RAID 1 or RAID 10", "Remote Management (IPMI)", "DDoS Protection", "99.9% Uptime SLA", "Priority Support"],
      popular: true,
    },
    {
      name: "Enterprise",
      cpu: "Dual Intel Xeon Silver 4214",
      cores: "24 Cores / 48 Threads",
      ram: "128 GB DDR4 ECC",
      storage: "4x 4TB NVMe SSD",
      bandwidth: "50 TB/month",
      features: ["Full Root Access", "16 IPv4 Addresses", "Custom RAID Config", "Remote Management (IPMI)", "Advanced DDoS Protection", "99.99% Uptime SLA", "24/7 Dedicated Support", "Hardware Replacement"],
    },
  ]

  const idealFor = [
    "Large e-commerce platforms",
    "High-traffic websites and portals",
    "Enterprise applications and ERP systems",
    "Database servers (MySQL, PostgreSQL, MongoDB)",
    "Video streaming and media servers",
    "Big data processing and analytics",
    "Game server hosting",
    "Private cloud infrastructure",
    "Mission-critical business applications",
    "High-security requirements",
  ]

  const managementOptions = [
    {
      type: "Unmanaged",
      description: "You have complete control and responsibility for server management, updates, and security.",
      bestFor: "Experienced system administrators and developers",
    },
    {
      type: "Managed",
      description: "We handle server setup, security updates, monitoring, and maintenance. You focus on your business.",
      bestFor: "Businesses without dedicated IT staff",
    },
    {
      type: "Fully Managed",
      description: "Complete hands-off solution. We manage everything including applications, databases, and optimization.",
      bestFor: "Enterprises requiring maximum uptime and performance",
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#128C7E] transition-colors mb-8 cursor-pointer">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
            <Database className="w-5 h-5" style={{ color: "#128C7E" }} />
            <span className="text-sm font-semibold" style={{ color: "#128C7E" }}>DEDICATED SERVERS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Maximum Performance & Complete Control
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Get an entire physical server dedicated exclusively to your business. Experience unmatched performance, security, and reliability for your mission-critical applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer hover:bg-[#128C7E] hover:text-white transition-all"
              style={{ color: "#128C7E", borderColor: "#128C7E" }}
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        </div>
      </section>

      {/* What is Dedicated Servers */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">What is a Dedicated Servers?</h2>
          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              A dedicated server is a physical server that is exclusively allocated to a single client. Unlike shared hosting or VPS where resources are shared, you get 100% of the server's CPU, RAM, storage, and bandwidth for your use alone.
            </p>
            <p>
              With a dedicated server, you have complete control over the hardware and software configuration. You can install any operating system, configure security policies, and optimize the server for your specific applications. This level of control and dedicated resources makes it the ideal solution for high-traffic websites, resource-intensive applications, and businesses with strict security or compliance requirements.
            </p>
            <p>
              Dedicated servers provide the ultimate in performance, security, and reliability. They're the choice of enterprises, large e-commerce platforms, and any organization that cannot afford downtime or performance issues. With redundant hardware, enterprise-grade components, and isolation from other users, dedicated servers offer the highest level of hosting available.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Why Choose a Dedicated Servers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Server Specifications */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Servers Configurations</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Enterprise-grade hardware for maximum performance</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-all overflow-hidden">
                {spec.popular && (
                  <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">{spec.name}</h3>
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">PROCESSOR</span>
                    <span className="font-semibold text-slate-900 dark:text-white block">{spec.cpu}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{spec.cores}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">MEMORY</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.ram}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">STORAGE</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.storage}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">BANDWIDTH</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.bandwidth}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {spec.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Options */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Management Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementOptions.map((option, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{option.type}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{option.description}</p>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">BEST FOR:</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{option.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Enterprise-grade hardware",
              "Full root/administrator access",
              "Choice of operating system",
              "Multiple IPv4 addresses",
              "Private VLAN options",
              "Hardware RAID controller",
              "IPMI remote management",
              "KVM over IP access",
              "Redundant power supplies",
              "Redundant network connectivity",
              "Advanced DDoS protection",
              "Hardware firewall options",
              "Backup solutions available",
              "Server monitoring and alerts",
              "99.9% or 99.99% uptime SLA",
              "24/7 support from server experts",
              "Free OS installation",
              "Hardware replacement guarantee",
              "Scalable infrastructure",
              "Custom configurations available",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#128C7E" }} />
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Ideal For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {idealFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#128C7E" }}></div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Ready for Ultimate Performance?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Get a custom dedicated server solution designed for your specific needs. Our team will help you choose the perfect configuration.
          </p>
          <Button
            asChild
            size="lg"
            className="text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#128C7E" }}
          >
            <Link href="https://kmerhosting.com/customers/contact.php">
              Contact Us for Dedicated Servers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
