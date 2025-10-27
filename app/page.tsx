import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Hero } from "@/components/sections/hero"
import { GlobalInfrastructure } from "@/components/sections/global-infrastructure"
import { ExpertHelp } from "@/components/sections/expert-help"
import { Features } from "@/components/sections/features"
import { Partners } from "@/components/sections/partners"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"
import { StructuredData, organizationSchema, websiteSchema } from "@/components/structured-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KmerHosting - Professional Web Hosting | PHP, Node.js, Python, WordPress & VPS",
  description: "Affordable web hosting starting at 1,158 FCFA/month. Free domain, SSL, and email included. 99.9% uptime guarantee. PHP, Node.js, Python, WordPress, VPS, and Reseller hosting.",
  keywords: [
    "web hosting",
    "cheap hosting",
    "PHP hosting",
    "Node.js hosting",
    "Python hosting",
    "WordPress hosting",
    "VPS hosting",
    "reseller hosting",
    "free domain",
    "free SSL",
    "hosting Africa",
    "hosting Cameroon",
    "affordable hosting",
    "cloud hosting",
  ],
  openGraph: {
    title: "KmerHosting - Professional Web Hosting Solutions",
    description: "Get started with professional web hosting from 1,158 FCFA/month. Free domain, SSL certificate, and 24/7 support included.",
    url: "https://kmerhosting.com",
    siteName: "KmerHosting",
    images: [
      {
        url: "https://kmerhosting.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "KmerHosting - Professional Web Hosting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KmerHosting - Professional Web Hosting",
    description: "Affordable hosting starting at 1,158 FCFA/month with free domain & SSL",
    images: ["https://kmerhosting.com/og-image.png"],
  },
  alternates: {
    canonical: "https://kmerhosting.com",
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <Header />
      <main>
        <Hero />
        <GlobalInfrastructure />
        <Features />
        <ExpertHelp />
        <Partners />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
