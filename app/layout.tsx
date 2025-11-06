import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://kmerhosting.com"),
  title: {
    default: "KmerHosting - Professional Web Hosting Solutions",
    template: "%s | KmerHosting",
  },
  description:
    "Multiple Affordable Hosting services to suit you perfectly. PHP, Node.js, Python, WordPress, and VPS hosting plans starting at 1,158 FCFA/month.",
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
    url: "https://kmerhosting.com",
    title: "KmerHosting - Professional Web Hosting Solutions",
    description: "Every plan include free SSL, domain, and email. Built for developers and businesses.",
    siteName: "KmerHosting",
  },
  twitter: {
    card: "summary_large_image",
    title: "KmerHosting - Professional Web Hosting Solutions",
    description: "Every plan include free SSL, domain, and email. Built for developers and businesses.",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://kmerhosting.com",
  },
    generator: 'KmerHosting'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false} themes={['light', 'dark', 'system']}>
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
