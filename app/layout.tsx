import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'KmerHosting - The Best Web Hosting Solution in Cameroon',
  description: 'The best web hosting solution in Cameroon. Professional-grade hosting with cPanel/DirectAdmin, 24/7 support in French & English, advanced security (Immunify360), and enterprise features at local prices.',
  generator: 'KmerHosting',
  keywords: 'web hosting cameroon, best hosting cameroon, kmerhosting, affordable hosting, managed hosting, shared hosting, vps hosting, dedicated servers, cpanel hosting, directadmin hosting',
  authors: [{ name: 'KmerHosting' }],
  creator: 'KmerHosting',
  publisher: 'KmerHosting',
  applicationName: 'KmerHosting',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kmerhosting.com',
    title: 'KmerHosting - The Best Web Hosting Solution in Cameroon',
    description: 'Professional web hosting in Cameroon with cPanel, DirectAdmin, 24/7 support, and enterprise security features.',
    siteName: 'KmerHosting',
    images: [
      {
        url: 'https://kmerhosting.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KmerHosting - Best Web Hosting in Cameroon',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KmerHosting - The Best Web Hosting Solution in Cameroon',
    description: 'Professional web hosting in Cameroon with 24/7 support and enterprise features.',
    images: ['https://kmerhosting.com/og-image.png'],
    creator: '@KmerHosting',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon0.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon1.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/manifest.json',
      },
      {
        rel: 'mask-icon',
        url: '/icon0.svg',
        color: '#1f2937',
      },
      {
        rel: 'shortcut icon',
        url: '/favicon.ico',
      },
    ],
  },
  verification: {
    google: 'your-google-site-verification',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KmerHosting',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KmerHosting" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
