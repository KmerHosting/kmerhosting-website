"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Terminal,
  Database,
  Zap,
  Server,
} from "lucide-react"

interface Feature {
  icon?: React.ElementType
  iconSvg?: string
  title: string
  description: string
}

const allFeatures: Feature[] = [
  // Row 1 - 3 items (top of triangle)
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"/></svg>`,
    title: "Node.js",
    description: "Fast, scalable applications"
  },
  {
    iconSvg: `<svg viewBox="0 0 128 128"><linearGradient id="python-gradient-1" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="python-gradient-2" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#python-gradient-1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-gradient-2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/><radialGradient id="python-gradient-3" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"/><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"/></radialGradient><path opacity=".444" fill="url(#python-gradient-3)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/></svg>`,
    title: "Python",
    description: "AI & data science ready"
  },
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="#CC342D" d="M27.35 80.52l10.68-68.44c.37-2.33 3.5-2.89 4.6-.8l11.48 21.48-26.76 47.76zm75.94 16.63L93.1 34.11c-.31-1.96-2.76-2.76-4.17-1.35L24.71 97.15l35.54 19.95a7.447 7.447 0 007.18 0l35.86-19.95zm-28.85-55L66.21 26.5c-.92-1.78-3.44-1.78-4.36 0L25.7 90.95l48.74-48.8z"/></svg>`,
    title: "Ruby",
    description: "Elegant development"
  },
  // Row 2 - 4 items
  {
    iconSvg: `<svg viewBox="0 0 128 128"><path fill="#6181B6" d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961s27.354 30.961 61.094 30.961 61.094-13.862 61.094-30.961-27.354-30.961-61.094-30.961zm-15.897 36.993c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34h14.04c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515-.759 1.357-1.748 2.598-2.972 3.748zm21.311 2.968l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-34h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528l-3.031 15.241h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.748-1.359 1.18-2.89 1.711-4.573 2.228-1.681.518-3.73.461-6.162.461h-6.918l-1.733 10h-7.244l6.515-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.392l-.329 1.251zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421l.515-2.517c.452-2.279.243-3.925-.686-4.794-.929-.868-2.517-1.868-5.037-1.868zm-39.381 14h-5.274l-2.727 14h5.274c2.942 0 5.136-.29 6.576-1.4 1.441-1.108 2.413-2.828 2.917-5.421l.515-2.517c.452-2.279.243-3.925-.686-4.794-.928-.868-2.844-1.868-6.595-1.868z"/></svg>`,
    title: "PHP",
    description: "Industry standard"
  },
  {
    icon: Terminal,
    title: "SSH Access",
    description: "Full terminal control"
  },
  {
    icon: Zap,
    title: "Redis",
    description: "In-memory caching"
  },
  {
    icon: Database,
    title: "MySQL",
    description: "Relational database"
  },
  // Row 3 - 5 items (bottom of triangle)
  {
    icon: Database,
    title: "PostgreSQL",
    description: "Advanced SQL DB"
  },
  {
    icon: Server,
    title: "LiteSpeed",
    description: "40x faster server"
  },
  {
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: "CloudLinux",
    description: "Resource isolation"
  },
  {
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    title: "JetBackup",
    description: "Automated backups"
  },
  {
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: "Imunify360",
    description: "AI security"
  },
]

export function Features() {
  return (
    <section id="hosting-features" className="py-20 sm:py-32 bg-background" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to succeed online
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional web hosting with industry-leading control panels DirectAdmin and cPanel
          </p>
        </header>

        {/* DirectAdmin & cPanel Banner */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* DirectAdmin */}
            <article 
              className="relative bg-gradient-to-br from-card to-muted/20 border-2 border-border rounded-2xl p-6" 
              itemScope 
              itemType="https://schema.org/SoftwareApplication"
            >
              <div className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="!bg-blue-400 flex-shrink-0 w-20 h-20 flex items-center justify-center bg-muted/50 rounded-xl border border-border">
                    <Image
                      src="/partners/white_directadmin.svg"
                      alt="DirectAdmin Control Panel Logo - Lightweight Web Hosting Management"
                      width={64}
                      height={64}
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1" itemProp="name">DirectAdmin</h3>
                    <Badge variant="secondary" className="text-xs">Lightweight & Fast</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed" itemProp="description">
                  High-performance control panel engineered for minimal resource consumption and maximum uptime. Features enterprise-grade security and native LiteSpeed integration.
                </p>
                
                <Button asChild size="sm" className="w-full hover:bg-primary/90 transition-colors">
                  <a href="https://demo.directadmin.com" target="_blank" rel="noopener noreferrer" aria-label="Try DirectAdmin control panel with live demo">
                    Explore panel for free
                  </a>
                </Button>
              </div>
            </article>

            {/* cPanel */}
            <article 
              className="relative bg-gradient-to-br from-card to-muted/20 border-2 border-border rounded-2xl p-6" 
              itemScope 
              itemType="https://schema.org/SoftwareApplication"
            >
              <div className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-muted/50 rounded-xl border border-border">
                    <Image
                      src="/partners/cpanel-logo.svg"
                      alt="cPanel Control Panel Logo - Industry Standard Web Hosting Management"
                      width={64}
                      height={64}
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1" itemProp="name">cPanel</h3>
                    <Badge variant="secondary" className="text-xs">Industry Standard</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed" itemProp="description">
                  Enterprise-class hosting platform with advanced automation, comprehensive API access, and Softaculous integration. Optimized for scalability and developer productivity.
                </p>
                
                <Button asChild size="sm" className="w-full hover:bg-primary/90 transition-colors">
                  <a href="https://cpanel.net/demo/" target="_blank" rel="noopener noreferrer" aria-label="Try cPanel control panel demo">
                    Explore panel for free
                  </a>
                </Button>
              </div>
            </article>
          </div>
        </div>

        {/* Features in Reverse Triangle Layout */}
        <div className="max-w-5xl mx-auto">
          <h3 className="sr-only">Supported Technologies and Features</h3>
          <div className="space-y-4">
            {/* Row 1 - 3 items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {allFeatures.slice(0, 3).map((feature) => (
                <article
                  key={feature.title}
                  className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card hover:border-foreground/20 transition-colors"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-md" aria-hidden="true">
                    {feature.iconSvg ? (
                      <div 
                        className="w-6 h-6 text-foreground" 
                        dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                      />
                    ) : feature.icon ? (
                      <feature.icon className="h-5 w-5 text-foreground" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm truncate" itemProp="name">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground truncate" itemProp="description">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 2 - 4 items */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {allFeatures.slice(3, 7).map((feature) => (
                <article
                  key={feature.title}
                  className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card hover:border-foreground/20 transition-colors"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-md" aria-hidden="true">
                    {feature.iconSvg ? (
                      <div 
                        className="w-6 h-6 text-foreground" 
                        dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                      />
                    ) : feature.icon ? (
                      <feature.icon className="h-5 w-5 text-foreground" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm truncate" itemProp="name">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground truncate" itemProp="description">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 3 - 5 items */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {allFeatures.slice(7, 12).map((feature) => (
                <article
                  key={feature.title}
                  className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card hover:border-foreground/20 transition-colors"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-md" aria-hidden="true">
                    {feature.iconSvg ? (
                      <div 
                        className="w-6 h-6 text-foreground" 
                        dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                      />
                    ) : feature.icon ? (
                      <feature.icon className="h-5 w-5 text-foreground" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm truncate" itemProp="name">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground truncate" itemProp="description">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

