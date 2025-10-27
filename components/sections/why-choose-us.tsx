"use client"

import { CheckCircle2 } from "lucide-react"

const reasons = [
  {
    title: "99.9% Uptime Guarantee",
    description: "Your website stays online with our reliable infrastructure and redundant systems.",
  },
  {
    title: "Lightning-Fast Performance",
    description: "SSD NVMe storage and optimized servers ensure your site loads in milliseconds.",
  },
  {
    title: "24/7 Expert Support",
    description: "Our technical team is always available to help you succeed.",
  },
  {
    title: "Free Migration Service",
    description: "We'll move your existing website to our platform at no extra cost.",
  },
  {
    title: "Daily Automated Backups",
    description: "Your data is safe with automatic daily backups and easy restoration.",
  },
  {
    title: "Developer-Friendly Tools",
    description: "SSH access, Git integration, WP-CLI, and support for PHP, Node.js, Ruby and Python.",
  },
  {
    title: "Multiple Database Options",
    description: "Full support for MySQL/MariaDB, PostgreSQL, and Redis caching for optimal performance.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Why choose KmerHosting?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We combine cutting-edge technology with exceptional service to provide hosting solutions that help your
              business thrive online.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Websites</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+ Years</div>
              <div className="text-sm text-muted-foreground">Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
