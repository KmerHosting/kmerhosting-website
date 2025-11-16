import Link from "next/link"
import { Server, Shield, Headphones, Zap, Award, Users, Globe, TrendingUp, HardDrive, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "3500+" },
    { icon: Server, label: "Servers Running", value: "99.9%", suffix: " Uptime" },
    { icon: Globe, label: "Websites Hosted", value: "8000+" },
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

      {/* CEO Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Word from Our CEO</h2>
          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 border-2" style={{ borderColor: "#128C7E" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: "#128C7E" }}>
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white" style={{ backgroundColor: "#128C7E" }}>
                    TT
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-6">
                  <svg className="w-12 h-12 mb-4" style={{ color: "#128C7E" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    "At KmerHosting, our mission goes beyond just providing web hosting services. We are committed to empowering Cameroonian businesses and individuals with the digital infrastructure they need to thrive in today's connected world. Every day, we strive to deliver not just hosting, but reliable partnerships that help our clients achieve their online goals. Our focus on local support, competitive pricing, and enterprise-grade features sets us apart in the market. We believe that quality hosting shouldn't be a luxury—it should be accessible to everyone."
                  </p>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    "As we continue to grow, we remain dedicated to innovation, security, and exceptional customer service. Thank you for trusting KmerHosting with your online presence."
                  </p>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Toscani TENEKEU MODJOU</p>
                  <p className="text-slate-600 dark:text-slate-400">Chief Executive Officer, KmerHosting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((item, index) => (
              <div key={index} className="p-8 rounded-xl border border-slate-200 dark:border-slate-700 transition-all bg-white dark:bg-slate-800">
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
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-all">
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
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">Our Hosting Solutions</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            Comprehensive hosting solutions designed to meet the diverse needs of our Cameroonian clients, from beginners to enterprises
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shared Hosting */}
            <Link href="/shared-hosting" className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800 cursor-pointer block" style={{ borderColor: "#128C7E" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <Users className="w-6 h-6" style={{ color: "#128C7E" }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#128C7E" }}>
                  Shared Hosting
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Perfect for beginners, bloggers, and small businesses looking for affordable and reliable hosting.
              </p>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Features:</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Choice of cPanel or DirectAdmin control panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Free .com domain with annual billing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Unlimited bandwidth on all plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Free SSL certificates included</span>
                </li>
              </ul>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Best For:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Personal websites, blogs, portfolios, small business websites, and WordPress sites
              </p>
              <p className="text-lg font-bold" style={{ color: "#128C7E" }}>From 1 083 FCFA/month</p>
            </Link>

            {/* Reseller Hosting */}
            <Link href="/reseller-hosting" className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800 cursor-pointer block" style={{ borderColor: "#128C7E" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <Server className="w-6 h-6" style={{ color: "#128C7E" }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#128C7E" }}>
                  Reseller Hosting
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Start your own hosting business and earn revenue by selling hosting services under your brand.
              </p>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Features:</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Full WHM & cPanel access for client management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Flexible billing options (monthly to annual)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>White label ready - your brand, your way</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Unlimited cPanel accounts on higher plans</span>
                </li>
              </ul>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Best For:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Web developers, digital agencies, entrepreneurs looking to start hosting business
              </p>
              <p className="text-lg font-bold" style={{ color: "#128C7E" }}>From 3 000 FCFA/month</p>
            </Link>

            {/* VPS Hosting */}
            <Link href="/vps-hosting" className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800 cursor-pointer block" style={{ borderColor: "#128C7E" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <HardDrive className="w-6 h-6" style={{ color: "#128C7E" }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#128C7E" }}>
                  VPS Hosting
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Virtual Private Server with dedicated resources, full root access, and complete control over your environment.
              </p>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Features:</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Full root/administrator access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Dedicated CPU, RAM, and storage resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Choice of Linux or Windows OS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Scalable resources as your business grows</span>
                </li>
              </ul>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Best For:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Growing businesses, high-traffic websites, custom applications, development environments
              </p>
              <p className="text-lg font-bold" style={{ color: "#128C7E" }}>Contact for pricing</p>
            </Link>

            {/* Dedicated Server */}
            <Link href="/dedicated-server" className="p-8 rounded-xl border-2 hover:shadow-lg transition-all bg-white dark:bg-slate-800 cursor-pointer block" style={{ borderColor: "#128C7E" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                  <Database className="w-6 h-6" style={{ color: "#128C7E" }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#128C7E" }}>
                  Dedicated Server
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Entire physical server dedicated exclusively to your business with maximum performance and security.
              </p>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Features:</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Complete server dedicated to you alone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Maximum performance and reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Enhanced security and customization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#128C7E" }}>•</span>
                  <span>Managed or unmanaged options available</span>
                </li>
              </ul>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Best For:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Enterprise applications, large e-commerce sites, mission-critical systems, high-security needs
              </p>
              <p className="text-lg font-bold" style={{ color: "#128C7E" }}>Contact for pricing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            KmerHosting by the <span style={{ color: "#128C7E" }}>Numbers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-all">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                      <Icon className="w-8 h-8" style={{ color: "#128C7E" }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#128C7E" }}>
                    {stat.value}
                    {stat.suffix && <span className="text-xl text-slate-600 dark:text-slate-400">{stat.suffix}</span>}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-semibold">{stat.label}</p>
                </div>
              )
            })}
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
              className="text-white font-semibold cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              <Link href="/#pricing">Get Started Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-white/50 dark:hover:bg-slate-700 font-semibold cursor-pointer"
            >
              <Link href="#contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
