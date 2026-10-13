import { SITE } from './site'

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
  '@id': `${SITE.url}/#person`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage.url}`,
  jobTitle: SITE.jobTitle,
  description: SITE.description,
  worksFor: {
    '@type': 'Organization',
    name: SITE.company.name,
    url: SITE.company.url,
  },
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
