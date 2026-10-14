import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import IconBadge from '../../components/IconBadge'
import ShareButtons from '../../components/ShareButtons'
import Magnet from '../../components/effects/Magnet'
import LottiePlayer from '../../components/LottiePlayer'
import RevealWords from '../../components/effects/RevealWords'
import SpotlightCard from '../../components/effects/SpotlightCard'
import Reveal from '../../components/Reveal'
import { PROCESS_ICONS, SERVICE_ICONS } from '../../lib/icons'
import { ServiceIllustration } from '../../components/Illustrations'
import { BOOKING_URL, contactHref } from '../../lib/contact'
import { JsonLd } from '../../lib/jsonLd'
import { getService, services } from '../../lib/services'
import { pageMeta } from '../../lib/seo'
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

  return pageMeta({
    ownImage: true,
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
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
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumb} />

      <p className="text-[14px] text-ink-soft">
        <Link href="/services" className="hover:underline">
          Services
        </Link>{' '}
        / {service.title}
      </p>
      <div className="mt-4 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <IconBadge icon={SERVICE_ICONS[service.slug] ?? PROCESS_ICONS[0]} size={26} />
          <h1 className="mt-4 text-[36px] leading-tight md:text-[52px]">
            <RevealWords text={service.title} />
          </h1>
          <p className="mt-4 text-[18px] md:text-[22px]">{service.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnet>
              <Link
                href={contactHref(service.slug)}
                className="inline-block rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
              >
                Tell me about your project
              </Link>
            </Magnet>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-ink/40 px-6 py-3 text-[14px] font-semibold uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Book a free 30-minute call
            </a>
          </div>
        </div>
        <div>
          {service.image ? (
            <Image
              src={service.image}
              alt={`${service.title} illustration`}
              width={1200}
              height={675}
              className="w-full rounded-3xl"
              priority
            />
          ) : service.slug === 'ai-automation-n8n' ? (
            <LottiePlayer src="/lottie/automation-flow.json" staticFrame={40} className="mx-auto aspect-square w-full max-w-[460px] rounded-3xl bg-secondary p-6" />
          ) : (
            <ServiceIllustration slug={service.slug} />
          )}
        </div>
      </div>

      <p className="mt-14 max-w-[820px] text-[16px] leading-relaxed text-ink-soft md:text-[18px]">
        {service.summary}
      </p>

      <Reveal>
      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <SpotlightCard className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">Who this is for</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-ink-soft">
            {service.forWho.map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />
                {item}
              </li>
            ))}
          </ul>
        </SpotlightCard>
        <SpotlightCard className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">What you get</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-ink-soft">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-soft" />
                {item}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">How it works</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-4">
          {service.process.map((step, index) => (
            <li key={step.title}>
              <SpotlightCard className="h-full rounded-3xl bg-secondary p-6">
                <div className="flex items-center justify-between">
                  <IconBadge icon={PROCESS_ICONS[index % PROCESS_ICONS.length]} size={20} />
                  <span className="text-[14px] text-ink-mute">Step {index + 1}</span>
                </div>
                <h3 className="mt-4 text-[20px]">{step.title}</h3>
                <p className="mt-3 text-[14px] text-ink-soft">{step.text}</p>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">Tech stack</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {service.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/30 px-4 py-2 text-[14px]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-14">
        <h2 className="text-[26px] md:text-[32px]">Questions</h2>
        <dl className="mt-6 space-y-6">
          {service.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-[18px] font-semibold">{faq.q}</dt>
              <dd className="mt-2 max-w-[760px] text-[15px] text-ink-soft">
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
        <p className="mt-3 max-w-[600px] text-[16px] text-ink-soft">
          Tell me what you need and I will reply with next steps. Based in
          Hisar, Haryana, working with clients worldwide.
        </p>
        <div className="mt-6">
          <Magnet>
            <Link
              href={contactHref(service.slug)}
              className="inline-block rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              Send an enquiry
            </Link>
          </Magnet>
        </div>
      </section>
      </Reveal>

      <ShareButtons url={url} title={service.title} text={service.metaDescription} />

      <Reveal>
      <section className="mt-16">
        <h2 className="text-[22px]">Other services</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-[14px] hover:bg-secondary"
              >
                {(() => {
                  const Icon = SERVICE_ICONS[item.slug]
                  return Icon ? <Icon size={16} aria-hidden="true" className="text-ink" /> : null
                })()}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>
    </main>
  )
}
