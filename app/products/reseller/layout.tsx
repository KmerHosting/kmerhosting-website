import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reseller Hosting - Start Your Hosting Business | KmerHosting",
  description: "Start your own web hosting business with KmerHosting reseller plans. White-label branding, DirectAdmin control, unlimited cPanel accounts, and 24/7 support.",
  keywords: [
    "reseller hosting",
    "white label hosting",
    "hosting business",
    "DirectAdmin reseller",
    "unlimited cPanel accounts",
    "hosting reseller plans",
  ],
  openGraph: {
    title: "Reseller Hosting - Launch Your Hosting Business",
    description: "Professional reseller hosting with white-label branding and full DirectAdmin control.",
    url: "https://kmerhosting.com/products/reseller",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products/reseller",
  },
}

export default function ResellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
