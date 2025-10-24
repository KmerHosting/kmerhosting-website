import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products - Web Hosting Solutions | KmerHosting",
  description: "Explore our web hosting solutions: Shared hosting, WordPress hosting, VPS servers, Reseller hosting, n8n automation, and LLM hosting. Professional hosting with 24/7 support.",
  keywords: [
    "web hosting products",
    "hosting solutions",
    "shared hosting",
    "WordPress hosting",
    "VPS server",
    "reseller hosting",
    "n8n hosting",
    "LLM hosting",
  ],
  openGraph: {
    title: "Web Hosting Products & Solutions - KmerHosting",
    description: "Professional hosting solutions for every need. From shared hosting to VPS, WordPress to LLM hosting.",
    url: "https://kmerhosting.com/products",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/products",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
