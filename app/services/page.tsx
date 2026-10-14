import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Marquee from '../components/effects/Marquee'
import RotatingWords from '../components/effects/RotatingWords'
import PageBackdrop from '../components/PageBackdrop'
import RevealWords from '../components/effects/RevealWords'
import Reveal from '../components/Reveal'
import ServiceCard from '../components/ServiceCard'
import { JsonLd, itemListJsonLd } from '../lib/jsonLd'
import { services } from '../lib/services'
import { SITE } from '../lib/site'
import { STACK } from '../lib/stack'

export const metadata: Metadata = pageMeta({
  title: 'Services',
  description:
    'Figma to Next.js, SaaS dashboards, full-stack web apps, React Native apps, CRM and e-commerce software, and AI-built app cleanup by a full-stack developer.',
  path: '/services',
})

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
  ],
}

export default function ServicesPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemListJsonLd(services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })))} />
      <PageBackdrop />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Web and mobile development services" />
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#c9c4bd] md:text-[18px]">
        Using Next.js, React and React Native, I design, build and fix{' '}
        <RotatingWords
          wordClassName="shiny-text font-semibold"
          words={[
            'websites',
            'web apps',
            'mobile apps',
            'dashboards',
            'online stores',
            'AI-built apps',
          ]}
        />
        <br />
        Pick a service to see what is included and how I work.
      </p>

      <div className="mt-10">
        <Marquee
          items={STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#e4ded7]/25 px-4 py-2 text-[14px] text-[#c9c4bd]"
            >
              {tech}
            </span>
          ))}
        />
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <li key={service.slug}>
            <Reveal delay={(index % 2) * 80} className="h-full">
              <ServiceCard
                as="h2"
                slug={service.slug}
                title={service.title}
                tagline={service.tagline}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
