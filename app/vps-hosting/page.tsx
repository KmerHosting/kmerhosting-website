"use client"

import Link from "next/link"
import { Check, ArrowRight, HardDrive, Gauge, Shield, Code, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VPSHostingPage() {
  const features = [
    {
      icon: HardDrive,
      title: "Dedicated Resources",
      description: "Get guaranteed CPU, RAM, and storage resources that are exclusively yours. No sharing means consistent, predictable performance.",
    },
    {
      icon: Code,
      title: "Full Root Access",
      description: "Complete control over your virtual server. Install custom software, configure settings, and manage your environment exactly how you need it.",
    },
    {
      icon: Gauge,
      title: "Scalable Infrastructure",
      description: "Easily upgrade your resources as your website or application grows. Add more CPU, RAM, or storage with minimal downtime.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Isolated environment provides better security than shared hosting. Full control over firewall rules, security policies, and access controls.",
    },
  ]

  const specifications = [
    {
      name: "VPS Starter",
      cpu: "2 vCPU Cores",
      ram: "4 GB RAM",
      storage: "80 GB SSD",
      bandwidth: "2 TB Bandwidth",
      features: ["Full Root Access", "1 IPv4 Address", "Linux or Windows", "Free SSL Certificate", "24/7 Support"],
    },
    {
      name: "VPS Business",
      cpu: "4 vCPU Cores",
      ram: "8 GB RAM",
      storage: "160 GB SSD",
      bandwidth: "4 TB Bandwidth",
      features: ["Full Root Access", "2 IPv4 Addresses", "Linux or Windows", "Free SSL Certificate", "Priority Support", "Weekly Backups"],
      popular: true,
    },
    {
      name: "VPS Professional",
      cpu: "6 vCPU Cores",
      ram: "16 GB RAM",
      storage: "320 GB SSD",
      bandwidth: "6 TB Bandwidth",
      features: ["Full Root Access", "3 IPv4 Addresses", "Linux or Windows", "Free SSL Certificate", "Priority Support", "Daily Backups", "Dedicated IP"],
    },
  ]

  const idealFor = [
    "Growing websites with high traffic",
    "Web applications and SaaS platforms",
    "E-commerce stores with databases",
    "Development and testing environments",
    "Game servers and hosting",
    "Custom software deployments",
    "API and microservices hosting",
    "Business-critical applications",
  ]

  const operatingSystems = [
    "Ubuntu Server (20.04, 22.04)",
    "CentOS (7, 8)",
    "Debian (10, 11)",
    "AlmaLinux",
    "Rocky Linux",
    "Windows Server 2019",
    "Windows Server 2022",
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
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
            <HardDrive className="w-5 h-5" style={{ color: "#128C7E" }} />
            <span className="text-sm font-semibold" style={{ color: "#128C7E" }}>VPS Servers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Scalable Resources & Full Root Access
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Experience the power and flexibility of Virtual Private Server hosting. Get dedicated resources, complete control, and the ability to scale as your business grows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="https://kmerhosting.com/customers/contact.php">
                Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
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
      </section>

      {/* What is VPS Servers */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">What is VPS Servers?</h2>
          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              VPS (Virtual Private Server) hosting uses virtualization technology to give you dedicated resources on a server shared with other users. Unlike shared hosting where resources are shared, a VPS gives you allocated RAM, CPU, and storage that are yours alone.
            </p>
            <p>
              With VPS Servers, you get full root access to your virtual server, allowing you to install any software, configure any settings, and customize your environment to meet your exact needs. It's like having your own dedicated server, but at a fraction of the cost.
            </p>
            <p>
              VPS Servers is the perfect middle ground between shared hosting and dedicated servers. It provides more power and control than shared hosting, while being more affordable than a dedicated server. It's ideal for growing websites, web applications, and businesses that need guaranteed resources and complete control.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Why Choose VPS Servers?</h2>
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

      {/* Specifications */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">VPS Specifications</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Powerful configurations to match your needs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-all overflow-hidden">
                {spec.popular && (
                  <div className="absolute top-4 -right-10 w-40 text-center rotate-45 text-white text-xs font-bold py-1 shadow-lg z-10" style={{ backgroundColor: "#128C7E" }}>
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">{spec.name}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">CPU</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.cpu}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">RAM</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.ram}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Storage</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spec.storage}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Bandwidth</span>
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

      {/* Operating Systems */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Choose Your Operating System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operatingSystems.map((os, index) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: "#128C7E" }} />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{os}</span>
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
              "Full root/administrator access",
              "KVM or VMware virtualization",
              "SSD storage for faster performance",
              "Guaranteed CPU and RAM resources",
              "Multiple IPv4 addresses available",
              "Private networking options",
              "Custom firewall configuration",
              "SSH/RDP access",
              "Automated backups",
              "Snapshot capability",
              "99.9% uptime guarantee",
              "DDoS protection",
              "24/7 technical support",
              "Control panel options (cPanel/Plesk)",
              "Free migration assistance",
              "Monitoring and alerts",
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
            Ready for More Power and Control?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Get a custom VPS solution tailored to your needs. Contact us today for a personalized quote and expert consultation.
          </p>
          <Button
            asChild
            size="lg"
            className="text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#128C7E" }}
          >
            <Link href="https://kmerhosting.com/customers/contact.php">
              Contact Us for VPS Servers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
