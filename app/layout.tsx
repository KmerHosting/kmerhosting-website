import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://kmerhosting.site"),
  title: {
    default: "KmerHosting - Professional Web Hosting Solutions",
    template: "%s | KmerHosting",
  },
  description:
    "Reliable cloud hosting with free SSL, domain, and email. PHP, Node.js, Python, WordPress, and VPS hosting plans starting at 13,900 FCFA/year.",
  keywords: [
    "web hosting",
    "cloud hosting",
    "VPS hosting",
    "WordPress hosting",
    "PHP hosting",
    "Node.js hosting",
    "Python hosting",
    "domain registration",
    "SSL certificate",
    "email hosting",
    "shared hosting",
    "managed hosting",
  ],
  authors: [{ name: "KmerHosting" }],
  creator: "KmerHosting",
  publisher: "KmerHosting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: "https://kmerhosting.site",
    title: "KmerHosting - Professional Web Hosting Solutions",
    description: "Reliable cloud hosting with free SSL, domain, and email. Built for developers and businesses.",
    siteName: "KmerHosting",
  },
  twitter: {
    card: "summary_large_image",
    title: "KmerHosting - Professional Web Hosting Solutions",
    description: "Reliable cloud hosting with free SSL, domain, and email. Built for developers and businesses.",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://kmerhosting.site",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
