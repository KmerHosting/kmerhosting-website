import type { Organization, WebSite, Product, Service, FAQPage, Question } from 'schema-dts'

export interface StructuredDataProps {
  data: Organization | WebSite | Product | Service | FAQPage
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Object.assign({ '@context': 'https://schema.org' }, data)
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Pre-configured structured data for common pages
export const organizationSchema: Organization = {
  '@type': 'Organization',
  name: 'KmerHosting',
  description: 'Professional web hosting services with PHP, Node.js, Python, WordPress, and VPS hosting solutions',
  url: 'https://kmerhosting.com',
  logo: 'https://kmerhosting.com/kmerhosting-logo.svg',
  sameAs: [
    // Add your social media URLs here
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English'],
    areaServed: 'Worldwide',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CM', // Cameroon based on FCFA currency
  },
}

export const websiteSchema: WebSite = {
  '@type': 'WebSite',
  name: 'KmerHosting',
  description: 'Professional Web Hosting Solutions',
  url: 'https://kmerhosting.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://kmerhosting.com/domain-search?q={search_term_string}',
    },
  } as any, // Type assertion needed for SearchAction
}

export function createProductSchema(
  name: string,
  description: string,
  price: string,
  category: string
): Product {
  return {
    '@type': 'Product',
    name,
    description,
    category,
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^0-9]/g, ''),
      priceCurrency: 'XAF', // Central African CFA franc
      availability: 'https://schema.org/InStock',
      url: 'https://kmerhosting.com/pricing',
    },
    brand: {
      '@type': 'Brand',
      name: 'KmerHosting',
    },
  }
}

export function createServiceSchema(
  name: string,
  description: string,
  serviceType: string
): Service {
  return {
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'KmerHosting',
    },
    serviceType,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Plans`,
      itemListElement: [],
    },
  }
}

export function createFAQSchema(questions: Array<{ question: string; answer: string }>): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
