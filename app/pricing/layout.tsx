import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - Affordable Web Hosting Plans | KmerHosting",
  description: "Compare web hosting plans starting at 1,158 FCFA/month. Shared PHP hosting, WordPress hosting, VPS servers, and reseller hosting with 24/7 support and free SSL certificates.",
  keywords: [
    "hosting pricing",
    "cheap web hosting",
    "affordable hosting plans",
    "hosting comparison",
    "VPS pricing",
    "WordPress hosting prices",
    "reseller hosting plans",
  ],
  openGraph: {
    title: "Web Hosting Pricing - Plans from 1,158 FCFA/month",
    description: "Affordable hosting plans with 24/7 support, free SSL, and daily backups. Choose from shared, WordPress, VPS, or reseller hosting.",
    url: "https://kmerhosting.com/pricing",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/pricing",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
