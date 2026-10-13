import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BOOKING_URL, contactHref } from '../../lib/contact'
import { JsonLd } from '../../lib/jsonLd'
import { getService, services } from '../../lib/services'
import { SITE } from '../../lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${SITE.name}`,
      description: service.metaDescription,
      url: `${SITE.url}/services/${service.slug}`,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${SITE.url}/services/${service.slug}`
  const others = services.filter((item) => item.slug !== service.slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    url,
    serviceType: service.title,
    provider: { '@id': `${SITE.url}/#person` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Haryana, India' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE.url}/services`,
      },
      { '@type': 'ListItem', position: 3, name: service.title, item: url },
    ],
  }

  return (
    <main className="mx-auto w-[90%] max-w-[1200px] pt-10 md:pt-16">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumb} />

      <p className="text-[14px] text-[#95979D]">
        <Link href="/services" className="hover:underline">
          Services
        </Link>{' '}
        / {service.title}
      </p>
      <h1 className="mt-4 max-w-[900px] text-[36px] leading-tight md:text-[56px]">
        {service.title}
      </h1>
      <p className="mt-4 max-w-[720px] text-[18px] md:text-[22px]">
        {service.tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={contactHref(service.slug)}
          className="rounded-full bg-[#e4ded7] px-6 py-3 font-semibold text-primary"
        >
          Tell me about your project
        </Link>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#e4ded7]/40 px-6 py-3 font-semibold"
        >
          Book a free 30-minute call
        </a>
      </div>

      {service.image && (
        <Image
          src={service.image}
          alt={`${service.title} illustration`}
          width={1200}
          height={675}
          className="mt-12 w-full rounded-3xl"
          priority
        />
      )}

      <p className="mt-14 max-w-[820px] text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
        {service.summary}
      </p>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">Who this is for</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-[#c9c4bd]">
            {service.forWho.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">What you get</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-[#c9c4bd]">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">How it works</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-4">
          {service.process.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-secondary p-6">
              <p className="text-[14px] text-[#95979D]">Step {index + 1}</p>
              <h3 className="mt-1 text-[20px]">{step.title}</h3>
              <p className="mt-3 text-[14px] text-[#c9c4bd]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">Tech stack</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {service.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[#e4ded7]/30 px-4 py-2 text-[14px]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">Questions</h2>
        <dl className="mt-6 space-y-6">
          {service.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-[18px] font-semibold">{faq.q}</dt>
              <dd className="mt-2 max-w-[760px] text-[15px] text-[#c9c4bd]">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">
          Ready to talk about your project?
        </h2>
        <p className="mt-3 max-w-[600px] text-[16px] text-[#c9c4bd]">
          Tell me what you need and I will reply with next steps. Based in
          Hisar, Haryana, working with clients worldwide.
        </p>
        <Link
          href={contactHref(service.slug)}
          className="mt-6 inline-block rounded-full bg-[#e4ded7] px-6 py-3 font-semibold text-primary"
        >
          Send an enquiry
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-[22px]">Other services</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="inline-block rounded-full border border-[#e4ded7]/30 px-4 py-2 text-[14px] hover:bg-secondary"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
