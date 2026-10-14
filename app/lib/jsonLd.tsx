import { HISAR_OFFICE } from './locations'
import { SITE } from './site'

export const PERSON_ID = `${SITE.url}/#person`
export const ORG_ID = `${SITE.url}/#innovaft`

// JSON.stringify does not escape "<", so a value containing "</script>" could
// close the tag early. Escape it so the output is always inert data.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage.url}`,
  jobTitle: SITE.jobTitle,
  description: SITE.description,
  worksFor: { '@id': ORG_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  knowsAbout: [
    'Next.js',
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'SaaS development',
    'Figma to code',
    'AI automation',
    'n8n',
  ],
  sameAs: SITE.sameAs,
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.siteName,
  inLanguage: 'en',
  publisher: { '@id': `${SITE.url}/#person` },
}

// Innovaft, the owner's company. Same address and hours as the Hisar page, Google
// Business Profile and every directory listing: keep them identical.
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.company.name,
  url: SITE.company.url,
  founder: { '@id': PERSON_ID },
  description: 'Web development company and training institute in Hisar, Haryana.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: HISAR_OFFICE.street,
    postalCode: HISAR_OFFICE.postalCode,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  sameAs: [
    'https://www.instagram.com/innovaft.co/',
    'https://www.youtube.com/@Innovaft',
    'https://www.linkedin.com/company/innovaft/',
    'https://www.facebook.com/people/Innovaft/61572956934556/',
    'https://x.com/InnovaftCo',
  ],
}

// A list of pages (services, projects, posts) so search engines see the set.
export const itemListJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: `${SITE.url}${item.path}`,
  })),
})
