import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import IconBadge from '../../components/IconBadge'
import Magnet from '../../components/effects/Magnet'
import RevealWords from '../../components/effects/RevealWords'
import Reveal from '../../components/Reveal'
import ServiceCard from '../../components/ServiceCard'
import { LocationIllustration } from '../../components/Illustrations'
import { BOOKING_URL, contactHref } from '../../lib/contact'
import { JsonLd } from '../../lib/jsonLd'
import {
  HISAR_OFFICE,
  getLocation,
  locations,
} from '../../lib/locations'
import { getService } from '../../lib/services'
import { SITE } from '../../lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) return {}

  return {
    title: location.shortTitle,
    description: location.metaDescription,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: `${location.shortTitle} | ${SITE.name}`,
      description: location.metaDescription,
      url: `${SITE.url}/locations/${location.slug}`,
      type: 'website',
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) notFound()

  const url = `${SITE.url}/locations/${location.slug}`
  const featured = location.featuredServices
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined)
  const related = location.related
    .map((relatedSlug) => getLocation(relatedSlug))
    .filter((item) => item !== undefined)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE.name} - Web & App Development`,
    description: location.metaDescription,
    url,
    provider: { '@id': `${SITE.url}/#person` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed:
      location.kind === 'state'
        ? { '@type': 'AdministrativeArea', name: 'Haryana, India' }
        : { '@type': 'City', name: `${location.name}, Haryana, India` },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: location.shortTitle,
        item: url,
      },
    ],
  }

  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumb} />

      <p className="text-[14px] text-[#c9c4bd]">
        <Link href="/locations" className="hover:underline">
          Locations
        </Link>{' '}
        / {location.name}
      </p>
      <div className="mt-4 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <IconBadge icon={MapPin} size={26} />
          <h1 className="h1-compact mt-4 max-w-[900px] text-[36px] leading-tight md:text-[56px]">
            <RevealWords text={location.h1} />
          </h1>
          <p className="mt-6 max-w-[800px] text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
            {location.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnet>
              <Link
                href={contactHref()}
                className="inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
              >
                Tell me about your project
              </Link>
            </Magnet>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-[#e4ded7]/40 px-6 py-3 text-[14px] font-semibold uppercase text-[#e4ded7] transition-colors hover:border-[#e4ded7] hover:bg-[#e4ded7] hover:text-[#0E1016]"
            >
              Book a free 30-minute call
            </a>
          </div>
        </div>
        <div>
          <LocationIllustration />
        </div>
      </div>

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">
          Working with clients in {location.name}
        </h2>
        <div className="mt-4 max-w-[800px] space-y-4 text-[16px] leading-relaxed text-[#c9c4bd]">
          {location.working.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">What I can build for you</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {featured.map((service) => (
            <li key={service.slug}>
              <ServiceCard
                slug={service.slug}
                title={service.title}
                tagline={service.tagline}
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px]">
          <Link href="/services" className="underline underline-offset-2">
            See all services
          </Link>
        </p>
      </section>
      </Reveal>

      {location.slug === 'hisar' && (
        <section className="mt-14 rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">Meet in Hisar</h2>
          <p className="mt-3 text-[15px] text-[#c9c4bd]">
            {HISAR_OFFICE.name}, {HISAR_OFFICE.address}
          </p>
          <p className="mt-1 text-[15px] text-[#c9c4bd]">
            {HISAR_OFFICE.hours}
          </p>
        </section>
      )}

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">Questions</h2>
        <dl className="mt-6 space-y-6">
          {location.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-[18px] font-semibold">{faq.q}</dt>
              <dd className="mt-2 max-w-[760px] text-[15px] text-[#c9c4bd]">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">
          Ready to talk about your project?
        </h2>
        <p className="mt-3 max-w-[600px] text-[16px] text-[#c9c4bd]">
          Tell me what you need and I will reply with next steps.
        </p>
        <Link
          href={contactHref()}
          className="mt-6 inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
        >
          Send an enquiry
        </Link>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16">
        <h2 className="text-[22px]">Other locations</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/locations/${item.slug}`}
                className="inline-block rounded-full border border-[#e4ded7]/30 px-4 py-2 text-[14px] hover:bg-secondary"
              >
                {item.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>
    </main>
  )
}
