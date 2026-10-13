import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '../lib/jsonLd'
import { services } from '../lib/services'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Figma to Next.js, SaaS dashboards, full-stack web apps, React Native apps, CRM and e-commerce software, and AI-built app cleanup by a full-stack developer.',
  alternates: { canonical: '/services' },
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
  ],
}

export default function ServicesPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1200px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        Web and mobile development services
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#95979D] md:text-[18px]">
        I design, build and fix web and mobile products with Next.js, React and
        React Native. Pick a service to see what is included and how I work.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="flex h-full flex-col rounded-3xl bg-secondary p-6 transition hover:bg-[#23262e] md:p-8"
            >
              <h2 className="text-[22px] md:text-[26px]">{service.title}</h2>
              <p className="mt-3 text-[15px] text-[#95979D]">
                {service.tagline}
              </p>
              <span className="mt-6 text-[14px] font-semibold underline underline-offset-2">
                Learn more
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
