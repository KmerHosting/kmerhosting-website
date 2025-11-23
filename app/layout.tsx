import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
