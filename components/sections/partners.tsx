"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export function Partners() {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainer = useRef<HTMLDivElement>(null)

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
      name: "cPanel",
      logo: "/partners/cpanel-logo.svg",
      alt: "cPanel Control Panel - Industry-standard web hosting control panel",
      url: "https://www.cpanel.net",
      description: "Control Panel"
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
      logo: "/partners/cloudflare.svg",
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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainer.current) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.pageX - scrollContainer.current.offsetLeft)
    setScrollLeft(scrollContainer.current.scrollLeft)
    scrollContainer.current.style.cursor = 'grabbing'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsPaused(false)
    if (scrollContainer.current) {
      scrollContainer.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPaused(false)
    if (scrollContainer.current) {
      scrollContainer.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainer.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainer.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainer.current.scrollLeft = scrollLeft - walk
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainer.current) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.touches[0].pageX - scrollContainer.current.offsetLeft)
    setScrollLeft(scrollContainer.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainer.current) return
    const x = e.touches[0].pageX - scrollContainer.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainer.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setIsPaused(false)
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KmerHosting",
    "url": "https://kmerhosting.com",
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
        className="py-16 bg-black text-white"
        aria-labelledby="partners-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 
              id="partners-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white"
            >
              Our Technology Partners
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powered by industry-leading technologies to deliver exceptional hosting services
            </p>
          </header>
        </div>

          {/* Full-width carousel container */}
          <div className="relative w-full overflow-hidden" role="region" aria-label="Partner logos carousel">
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
              .animate-scroll:hover,
              .animate-scroll.paused {
                animation-play-state: paused;
              }
              .scroll-container {
                cursor: grab;
                user-select: none;
                width: 100%;
              }
              .scroll-container:active {
                cursor: grabbing;
              }
              .partners-track {
                display: flex;
                width: calc(200% + 32px);
                animation: scroll-left 30s linear infinite;
              }
              .partners-track:hover,
              .partners-track.paused {
                animation-play-state: paused;
              }
            `}</style>

            <div 
              ref={scrollContainer}
              className={`scroll-container ${isPaused ? 'paused' : ''}`}
              role="list"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              <div className={`partners-track ${isPaused ? 'paused' : ''}`}>
              {duplicatedPartners.map((partner, index) => (
                <article
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-4 w-48 h-24"
                  role="listitem"
                  style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center h-full p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors bg-black"
                    aria-label={`Visit ${partner.name} - ${partner.description}`}
                    title={partner.name}
                    onClick={(e) => {
                      if (isDragging) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={192}
                      height={96}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                      loading="lazy"
                      draggable={false}
                    />
                  </a>
                </article>
              ))}
              </div>
            </div>
          </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <footer className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Trusted partnerships delivering cutting-edge performance, security, and reliability
            </p>
          </footer>
        </div>
      </section>
    </>
  )
}
