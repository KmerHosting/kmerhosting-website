"use client"

export function Partners() {
  const partners = [
    {
      name: "Sectigo",
      logo: "/partners/sectigo.svg",
      alt: "Sectigo SSL Certificate Provider - Industry-leading SSL/TLS certificates",
      url: "https://sectigo.com",
      description: "SSL Certificate Provider"
    },
    {
      name: "LiteSpeed",
      logo: "/partners/litespeed.svg",
      alt: "LiteSpeed Web Server - High-performance web server technology",
      url: "https://www.litespeedtech.com",
      description: "Web Server Technology"
    },
    {
      name: "CloudLinux",
      logo: "/partners/cloudlinux.svg",
      alt: "CloudLinux OS - Secure and stable Linux operating system",
      url: "https://www.cloudlinux.com",
      description: "Linux Operating System"
    },
    {
      name: "WHMCS",
      logo: "/partners/whmcs.svg",
      alt: "WHMCS Billing Platform - Web hosting billing and automation",
      url: "https://www.whmcs.com",
      description: "Billing Automation Platform"
    },
    {
      name: "Softaculous",
      logo: "/partners/softaculous.svg",
      alt: "Softaculous Auto Installer - 450+ script auto-installer",
      url: "https://www.softaculous.com",
      description: "Auto Installer"
    },
    {
      name: "Cloudflare",
      logo: "https://www.cloudflare.com/img/logo-cloudflare-dark.svg",
      alt: "Cloudflare CDN - Content delivery network and DDoS protection",
      url: "https://www.cloudflare.com",
      description: "CDN & Security"
    },
    {
      name: "DirectAdmin",
      logo: "/partners/white_directadmin.svg",
      alt: "DirectAdmin Control Panel - User-friendly hosting control panel",
      url: "https://www.directadmin.com",
      description: "Control Panel"
    },
    {
      name: "JetBackup",
      logo: "/partners/jetbackup.svg",
      alt: "JetBackup - Professional backup solution for cPanel and DirectAdmin",
      url: "https://www.jetbackup.com",
      description: "Backup Solution"
    }
  ]

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners]

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KmerHosting",
    "url": "https://kmerhosting.site",
    "partner": partners.map(partner => ({
      "@type": "Organization",
      "name": partner.name,
      "url": partner.url,
      "description": partner.description
    }))
  }

  return (
    <>
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section 
        className="py-16 bg-gradient-to-b from-muted/50 to-background overflow-hidden"
        aria-labelledby="partners-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 
              id="partners-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            >
              Our Technology Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by industry-leading technologies to deliver exceptional hosting services
            </p>
          </header>

          <div className="relative" role="region" aria-label="Partner logos carousel">
            <style jsx>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll-left 30s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="flex animate-scroll" role="list">
              {duplicatedPartners.map((partner, index) => (
                <article
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-4 w-48 h-24"
                  role="listitem"
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center h-full p-6 rounded-lg border border-border/50 hover:border-border transition-colors bg-[#06a467] dark:bg-card"
                    aria-label={`Visit ${partner.name} - ${partner.description}`}
                    title={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      width="192"
                      height="96"
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </article>
              ))}
            </div>
          </div>

          <footer className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Trusted partnerships delivering cutting-edge performance, security, and reliability
            </p>
          </footer>
        </div>
      </section>
    </>
  )
}
