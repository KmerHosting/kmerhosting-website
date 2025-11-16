"use client"

import { Server, Shield, Headphones, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Server,
      title: "Powerful Infrastructure",
      description: "SSD NMVe storage and LiteSpeed Web Server for lightning-fast performance",
    },
    {
      icon: Shield,
      title: "Maximum Security",
      description: "Free SSL & DDoS protection included",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 support in French and English",
    },
    {
      icon: Zap,
      title: "Easy Management",
      description: "cPanel or DirectAdmin control panels",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Why Choose KmerHosting?</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need for success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" style={{ color: "#128C7E" }} />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Advanced Features Section */}
        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
              Advanced Features That Set Us <span style={{ color: "#128C7E" }}>Apart</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Unlike other hosting providers in Cameroon, we offer enterprise-grade features that give you complete control and flexibility. Our platform includes professional development tools and security features typically found only in premium international hosting services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[
              { name: "Node.js", desc: "JavaScript runtime" },
              { name: "PHP", desc: "Multiple versions" },
              { name: "Python", desc: "Latest versions" },
              { name: "Ruby", desc: "Full support" },
              { name: "SSH Access", desc: "Secure terminal" },
              { name: "Git", desc: "Version control" },
              { name: "cPanel Terminal", desc: "Web-based CLI" },
              { name: "PostgreSQL", desc: "Advanced database" },
              { name: "MySQL", desc: "MariaDB included" },
              { name: "JetBackup", desc: "Advanced backups" },
              { name: "Immunify360", desc: "Malware protection" },
              { name: "CPGuard", desc: "Security suite" },
              { name: "Site Builder", desc: "Drag & drop" },
              { name: "Softaculous", desc: "1-click installer" },
              { name: "WP-CLI", desc: "WordPress CLI" },
            ].map((tech, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#128C7E] dark:hover:border-[#128C7E] transition-all bg-white dark:bg-slate-800 text-center"
              >
                <div className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
                  {tech.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                <svg className="w-6 h-6" style={{ color: "#128C7E" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Why We're Different in Cameroon
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  While most local hosting providers offer basic shared hosting with limited features, KmerHosting delivers professional-grade tools used by developers worldwide. Our platform supports modern programming languages (Node.js, Python, Ruby), provides secure SSH access for command-line operations, includes Git for version control, and features advanced security with Immunify360 and CPGuard. With JetBackup for reliable data recovery, Softaculous for one-click app installations, and WP-CLI for WordPress management, we give you the same powerful infrastructure as international providers—but with local support and competitive pricing. <span className="font-semibold" style={{ color: "#128C7E" }}>This is what makes us the leading choice for serious developers and businesses in Cameroon.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
