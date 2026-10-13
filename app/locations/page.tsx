import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '../lib/jsonLd'
import { locations } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Web and app development for clients in Hisar, Hansi, Bhiwani, Rohtak and across Haryana, plus remote clients worldwide.',
  alternates: { canonical: '/locations' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Locations',
      item: `${SITE.url}/locations`,
    },
  ],
}

export default function LocationsPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1200px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        Where I work
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#95979D] md:text-[18px]">
        I am based in Hisar, Haryana, and I work with clients across Haryana and
        around the world. Most projects run online, with in-person meetings
        available in Hisar.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <li key={location.slug}>
            <Link
              href={`/locations/${location.slug}`}
              className="flex h-full flex-col rounded-3xl bg-secondary p-6 transition hover:bg-[#23262e] md:p-8"
            >
              <h2 className="text-[22px] md:text-[26px]">
                {location.shortTitle}
              </h2>
              <p className="mt-3 text-[15px] text-[#95979D]">
                {location.metaDescription}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
