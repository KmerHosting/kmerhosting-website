"use client"

import { Server, Shield, Headphones, Zap, Check, Cpu, Brain, Search, Lightbulb, Code2 } from "lucide-react"
import Image from "next/image"

export default function Features() {
  const basicFeatures = [
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
      icon: Zap,
      title: "Easy Management",
      description: "cPanel or DirectAdmin control panels",
    },
  ]

  const advancedFeatures = [
    { name: "Node.js", category: "Programming" },
    { name: "PHP", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "Ruby", category: "Programming" },
    { name: "SSH Access", category: "Security" },
    { name: "Git", category: "Development" },
    { name: "WordPress Installer", category: "Tools" },
    { name: "cPanel Terminal", category: "Management" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MariaDB", category: "Database" },
    { name: "JetBackup", category: "Backup" },
    { name: "Immunify360", category: "Security" },
    { name: "CPGuard", category: "Security" },
    { name: "Site Builder", category: "Tools" },
    { name: "Softaculous", category: "Tools" },
    { name: "WP-CLI", category: "Tools" },
  ]

  const partnersList = [
    { name: "cPanel" },
    { name: "DirectAdmin" },
    { name: "CloudLinux" },
    { name: "LiteSpeed" },
    { name: "Immunify360" },
    { name: "JetBackup" },
    { name: "Cloudflare" },
    { name: "SECTIGO" },
    { name: "Let's Encrypt" },
    { name: "AWS" },
    { name: "Docker" },
    { name: "nginx" },
    { name: "ModSecurity" },
    { name: "WHM" },
  ]

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Basic Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Why Choose KmerHosting?</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need for success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {basicFeatures.map((feature, index) => {
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

        {/* Free Domain & SSL Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 px-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-green-200 dark:border-green-900/30">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full mb-3" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                <Check className="w-6 h-6" style={{ color: "#128C7E" }} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Free Domain</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get a free domain name with every hosting plan</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full mb-3" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                <Check className="w-6 h-6" style={{ color: "#128C7E" }} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Free SSL Certificate</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Secure your website with complimentary SSL encryption</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-purple-200 dark:border-purple-900/30">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full mb-3" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
                <Check className="w-6 h-6" style={{ color: "#128C7E" }} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Pro Email Addresses</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">We offer at least 10 professional email addresses in each plan</p>
            </div>
          </div>
        </div>

        {/* Developer Types Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Built for <span style={{ color: "#128C7E" }}>All Developers</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Whether you're building with WordPress, working on Frontend, Backend, Full-stack, or using Node.js—KmerHosting has everything you need with powerful developer tools and complete control.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700" style={{ backgroundColor: "rgba(18, 140, 126, 0.05)" }}>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Developer Profile</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Specialization</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900 dark:text-white">Supported</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { profile: "WordPress Developer", spec: "CMS & Web Development" },
                  { profile: "Frontend Developer", spec: "UI/UX & Client-side Development" },
                  { profile: "Backend Developer", spec: "Server-side & API Development" },
                  { profile: "Full-stack Developer", spec: "Complete Application Development" },
                  { profile: "Node.js Developer", spec: "JavaScript Runtime & APIs" },
                  { profile: "Python Developer", spec: "Backend & Data Processing" },
                  { profile: "MERN Stack Developer", spec: "MongoDB, Express, React, Node.js" },
                  { profile: "Laravel Developer", spec: "PHP Framework Web Development" },
                  { profile: "React Developer", spec: "Frontend UI & Components" },
                  { profile: "Vue.js Developer", spec: "Progressive JavaScript Framework" },
                  { profile: "Angular Developer", spec: "Enterprise Frontend Solutions" },
                  { profile: "Django Developer", spec: "Python Web Framework" },
                  { profile: "No-Code Developer", spec: "Visual & Low-Code Platforms" },
                  { profile: "Mobile Developer", spec: "Mobile Apps & Progressive Web Apps" },
                  { profile: "DevOps Engineer", spec: "Infrastructure & Deployment" },
                ].map((dev, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{dev.profile}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{dev.spec}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#128C7E" }}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LLM & AI Models Section */}
        <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 mb-20 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                AI-Powered Development with <span style={{ color: "#128C7E" }}>KmerHosting AI</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Access the most powerful Large Language Models for free with API integration. Leverage cutting-edge AI to accelerate your development workflow and build smarter applications.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: "#128C7E" }} />
                  <span className="text-slate-700 dark:text-slate-300">Free API access to advanced LLMs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: "#128C7E" }} />
                  <span className="text-slate-700 dark:text-slate-300">Seamless integration with your hosting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: "#128C7E" }} />
                  <span className="text-slate-700 dark:text-slate-300">No additional setup required</span>
                </div>
              </div>
              <a
                href="/kmerhosting-ai/"
                className="px-6 py-2.5 rounded-lg font-medium transition-all text-white cursor-pointer inline-block"
                style={{ backgroundColor: "#128C7E" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a6f62")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
              >
                Explore AI Features
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Supported AI Providers</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "OpenAI", Icon: Brain},
                    { name: "Google", Icon: Search },
                    { name: "Anthropic", Icon: Code2 },
                    { name: "Meta", Icon: Lightbulb },
                  ].map((ai, idx) => {
                    const IconComponent = ai.Icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <IconComponent className="w-5 h-5 flex-shrink-0" style={{ color: "#128C7E" }} />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{ai.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Open Source Models</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Llama",
                    "Mistral",
                    "Qwen",
                    "Baichuan",
                  ].map((model, idx) => (
                    <div key={idx} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white text-center border border-slate-200 dark:border-slate-700">
                      {model}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

          {/* Advanced Features Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              advancedFeatures.slice(0, Math.ceil(advancedFeatures.length / 2)),
              advancedFeatures.slice(Math.ceil(advancedFeatures.length / 2))
            ].map((featureGroup, groupIdx) => (
              <div key={groupIdx} className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700" style={{ backgroundColor: "rgba(18, 140, 126, 0.05)" }}>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Feature</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Category</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureGroup.map((feature, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{feature.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)", color: "#128C7E" }}>
                            {feature.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#128C7E" }}>
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
              <svg className="w-6 h-6" style={{ color: "#128C7E" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Why Choose KmerHosting?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Professional-grade hosting with developer tools (Node.js, Python, SSH, Git), advanced security (Immunify360), and local support—matching international providers at local prices. <span className="font-semibold" style={{ color: "#128C7E" }}>The smarter choice for serious developers in Cameroon.</span>
              </p>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Our <span style={{ color: "#128C7E" }}>Partners</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Trusted by industry leaders and the best in class</p>
            </div>

            {/* Partners Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                partnersList.slice(0, Math.ceil(partnersList.length / 2)),
                partnersList.slice(Math.ceil(partnersList.length / 2))
              ].map((partnerGroup, groupIdx) => (
                <div key={groupIdx} className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700" style={{ backgroundColor: "rgba(18, 140, 126, 0.05)" }}>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Partner</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Trusted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerGroup.map((partner, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{partner.name}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#128C7E" }}>
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
