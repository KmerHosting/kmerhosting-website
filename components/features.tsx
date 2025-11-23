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

          {/* Scattered Advanced Features */}
          <div className="relative h-96 flex items-center justify-center mb-12">
            {/* Feature 1 - Node.js (top left) */}
            <div className="absolute top-0 left-0 transform -rotate-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Node.js</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">JavaScript runtime</div>
              </div>
            </div>

            {/* Feature 2 - PHP (top center-right) */}
            <div className="absolute top-4 right-24 transform rotate-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">PHP</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Multiple versions</div>
              </div>
            </div>

            {/* Feature 3 - Python (top right) */}
            <div className="absolute top-8 right-0 transform -rotate-3 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Python</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Latest versions</div>
              </div>
            </div>

            {/* Feature 4 - Ruby (middle left) */}
            <div className="absolute top-1/3 left-4 transform rotate-3 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Ruby</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full support</div>
              </div>
            </div>

            {/* Feature 5 - SSH Access (center-left) */}
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 -rotate-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">SSH Access</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Secure terminal</div>
              </div>
            </div>

            {/* Feature 6 - Git (center) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Git</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Version control</div>
              </div>
            </div>

            {/* Feature 7 - cPanel Terminal (center-right) */}
            <div className="absolute top-1/2 right-12 transform -translate-y-1/2 -rotate-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">cPanel Terminal</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Web-based CLI</div>
              </div>
            </div>

            {/* Feature 8 - PostgreSQL (lower left) */}
            <div className="absolute bottom-12 left-0 transform rotate-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">PostgreSQL</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Advanced database</div>
              </div>
            </div>

            {/* Feature 9 - MySQL (lower center-left) */}
            <div className="absolute bottom-8 left-1/3 transform -translate-x-1/2 -rotate-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">MySQL</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">MariaDB included</div>
              </div>
            </div>

            {/* Feature 10 - JetBackup (lower center-right) */}
            <div className="absolute bottom-12 right-1/4 transform rotate-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">JetBackup</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Advanced backups</div>
              </div>
            </div>

            {/* Feature 11 - Immunify360 (lower right) */}
            <div className="absolute bottom-8 right-6 transform -rotate-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Immunify360</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Malware protection</div>
              </div>
            </div>

            {/* Feature 12 - CPGuard (top left secondary) */}
            <div className="absolute top-16 left-16 transform rotate-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">CPGuard</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Security suite</div>
              </div>
            </div>

            {/* Feature 13 - Site Builder (top center) */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -rotate-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Site Builder</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Drag & drop</div>
              </div>
            </div>

            {/* Feature 14 - Softaculous (middle right) */}
            <div className="absolute top-2/3 right-4 transform rotate-7 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Softaculous</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">1-click installer</div>
              </div>
            </div>

            {/* Feature 15 - WP-CLI (bottom right secondary) */}
            <div className="absolute bottom-0 right-20 transform -rotate-5 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">WP-CLI</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">WordPress CLI</div>
              </div>
            </div>
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
                  Why Choose KmerHosting?
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Professional-grade hosting with developer tools (Node.js, Python, SSH, Git), advanced security (Immunify360), and local support—matching international providers at local prices. <span className="font-semibold" style={{ color: "#128C7E" }}>The smarter choice for serious developers in Cameroon.</span>
                </p>
              </div>
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

            {/* Scattered Partner Logos - Grouped Center */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Partner 1 - Cloudflare */}
              <div className="absolute transform -rotate-12 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '30%', left: '15%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Cloudflare</div>
                </div>
              </div>

              {/* Partner 2 - cPanel */}
              <div className="absolute transform rotate-6 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '20%', right: '18%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">cPanel</div>
                </div>
              </div>

              {/* Partner 3 - DirectAdmin */}
              <div className="absolute transform -rotate-3 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '40%', left: '8%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">DirectAdmin</div>
                </div>
              </div>

              {/* Partner 4 - SECTIGO */}
              <div className="absolute transform opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '50%', left: '22%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">SECTIGO</div>
                </div>
              </div>

              {/* Partner 5 - CloudLinux */}
              <div className="absolute transform rotate-12 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '45%', right: '10%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">CloudLinux</div>
                </div>
              </div>

              {/* Partner 6 - Immunify360 */}
              <div className="absolute transform rotate-3 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '15%', left: '12%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Immunify360</div>
                </div>
              </div>

              {/* Partner 7 - JetBackup */}
              <div className="absolute transform -rotate-6 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '20%', right: '12%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">JetBackup</div>
                </div>
              </div>

              {/* Partner 8 - AWS */}
              <div className="absolute transform rotate-8 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '25%', left: '32%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">AWS</div>
                </div>
              </div>

              {/* Partner 9 - Google Cloud */}
              <div className="absolute transform -rotate-4 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '15%', left: '50%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Google Cloud</div>
                </div>
              </div>

              {/* Partner 10 - LiteSpeed */}
              <div className="absolute transform -rotate-7 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '55%', left: '18%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">LiteSpeed</div>
                </div>
              </div>

              {/* Partner 11 - Let's Encrypt */}
              <div className="absolute transform rotate-9 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ top: '35%', right: '22%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Let's Encrypt</div>
                </div>
              </div>

              {/* Partner 12 - WHM */}
              <div className="absolute transform rotate-5 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '25%', left: '28%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">WHM</div>
                </div>
              </div>

              {/* Partner 13 - ModSecurity */}
              <div className="absolute transform -rotate-8 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '30%', right: '18%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">ModSecurity</div>
                </div>
              </div>

              {/* Partner 14 - nginx */}
              <div className="absolute transform rotate-11 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '10%', left: '22%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">nginx</div>
                </div>
              </div>

              {/* Partner 15 - Docker */}
              <div className="absolute transform -rotate-9 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ bottom: '15%', right: '20%' }}>
                <div className="px-6 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Docker</div>
                </div>
              </div>

              {/* Center point - & more */}
              <div className="absolute opacity-70 hover:opacity-100 transition-opacity duration-300" style={{ top: '50%', left: '50%' }}>
                <div className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-center transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">& many more...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
