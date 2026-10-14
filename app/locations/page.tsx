import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import IconBadge from '../components/IconBadge'
import RevealWords from '../components/effects/RevealWords'
import PageBackdrop from '../components/PageBackdrop'
import SpotlightCard from '../components/effects/SpotlightCard'
import { JsonLd } from '../lib/jsonLd'
import { locations } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Locations',
  description:
    'Web and app development for clients in Hisar, Hansi, Bhiwani, Rohtak and across Haryana, plus remote clients worldwide.',
  path: '/locations',
})

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
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <PageBackdrop />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Where I work" />
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-ink-soft md:text-[18px]">
        I am based in Hisar, Haryana, and I work with clients across Haryana and
        around the world. Most projects run online, with in-person meetings
        available in Hisar.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <li key={location.slug}>
            <SpotlightCard className="h-full rounded-3xl bg-secondary transition-colors hover:bg-raised">
              <Link
                href={`/locations/${location.slug}`}
                className="flex h-full flex-col p-6 md:p-8"
              >
                <IconBadge icon={MapPin} className="self-start" />
                <h2 className="mt-4 text-[22px] md:text-[26px]">
                  {location.shortTitle}
                </h2>
                <p className="mt-3 text-[15px] text-ink-mute">
                  {location.metaDescription}
                </p>
              </Link>
            </SpotlightCard>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[15px] text-ink-soft">
        Working from outside India?{' '}
        <Link href="/international" className="underline underline-offset-2">
          See how I work with international clients
        </Link>
        .
      </p>
    </main>
  )
}
