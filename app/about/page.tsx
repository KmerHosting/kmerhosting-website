"use client"

import Link from "next/link"
import { Server, Shield, Headphones, Zap, Award, Users, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Server, label: "Servers Running", value: "99.9%", suffix: " Uptime" },
    { icon: Globe, label: "Websites Hosted", value: "1000+" },
    { icon: Award, label: "Years Experience", value: "5+" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security of your data with free SSL certificates, DDoS protection, and regular security updates on all our hosting plans.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Our state-of-the-art infrastructure with SSD storage ensures lightning-fast loading times for your websites and applications.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert support team is available around the clock in both French and English to assist you whenever you need help.",
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "We provide scalable solutions that grow with your business, from shared hosting to reseller packages for entrepreneurs.",
    },
  ]

  const team = [
    {
      role: "Our Mission",
      description: "To provide reliable, affordable, and secure web hosting solutions tailored specifically for Cameroon businesses and individuals, empowering them to establish and grow their online presence.",
    },
    {
      role: "Our Vision",
      description: "To become the leading web hosting provider in Cameroon, known for exceptional service, local expertise, and unwavering commitment to our clients' success.",
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            About <span style={{ color: "#128C7E" }}>KmerHosting</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            We are Cameroon's trusted web hosting provider, dedicated to delivering reliable, secure, and affordable hosting solutions for businesses and individuals across the nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="text-white font-semibold"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="/#pricing">View Our Plans</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-8 h-8" style={{ color: "#128C7E" }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: "#128C7E" }}>
                    {stat.value}
                    {stat.suffix && <span className="text-lg text-slate-600 dark:text-slate-400">{stat.suffix}</span>}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">Our Story</h2>
          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              KmerHosting was founded with a clear vision: to make professional web hosting accessible and affordable for everyone in Cameroon. We understand the unique challenges that local businesses and individuals face when trying to establish their online presence.
            </p>
            <p>
              Starting as a small team of passionate technology enthusiasts, we've grown into a trusted hosting provider serving hundreds of satisfied customers across Cameroon. Our commitment to quality, reliability, and exceptional customer service has been the cornerstone of our success.
            </p>
            <p>
              We offer a comprehensive range of hosting solutions, from shared hosting perfect for beginners to powerful reseller packages for entrepreneurs looking to start their own hosting business. With both cPanel and DirectAdmin control panel options, we give you the flexibility to choose the tools that work best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((item, index) => (
              <div key={index} className="p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary hover:shadow-lg transition-all bg-white dark:bg-slate-800">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#128C7E" }}>
                  {item.role}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0 bg-slate-50 dark:bg-slate-800">
                      <Icon className="w-6 h-6" style={{ color: "#128C7E" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{value.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">What We Offer</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            Comprehensive hosting solutions designed to meet the diverse needs of our Cameroonian clients
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#128C7E" }}>
                Shared Hosting
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Perfect for beginners and small businesses. Get started with our reliable shared hosting featuring:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Choice of cPanel or DirectAdmin control panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Free .com domain (Silver plan and above)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Unlimited bandwidth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Free SSL certificates on all plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Plans starting from 13,000 FCFA/year</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800" style={{ borderColor: "#128C7E" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#128C7E" }}>
                Reseller Hosting
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Start your own hosting business with our powerful reseller packages featuring:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>WHM & cPanel management access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Flexible billing: Monthly, Quarterly, Semi-Annual, or Annual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Free .com domain with annual billing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>White label ready - brand it as your own</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Plans starting from 3,000 FCFA/month</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Ready to Join KmerHosting?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Experience reliable hosting with local support. Let's build your online presence together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="text-white font-semibold"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="/#pricing">Get Started Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-white/50 dark:hover:bg-slate-700 font-semibold"
            >
              <Link href="#contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
