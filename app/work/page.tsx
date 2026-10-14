import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealWords from '../components/effects/RevealWords'
import PageBackdrop from '../components/PageBackdrop'
import TiltCard from '../components/effects/TiltCard'
import Reveal from '../components/Reveal'
import { getProjects } from '../lib/projects'
import { JsonLd } from '../lib/jsonLd'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects by Sharukh Khan: a Web3 marketplace, landing pages, an e-commerce platform and a creator platform, built with Next.js, React and Node.js.',
  alternates: { canonical: '/work' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE.url}/work` },
  ],
}

export default function WorkPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <PageBackdrop />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Selected work" />
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#c9c4bd] md:text-[18px]">
        A few projects built with Next.js, React and Node.js. More work from my
        company is on the{' '}
        <a
          href={`${SITE.company.url}/portfolio`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Innovaft portfolio
        </a>
        .
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {getProjects().map((study, index) => (
          <li key={study.slug}>
            <Reveal delay={(index % 2) * 80} className="h-full">
              <TiltCard className="h-full">
              <Link
                href={`/work/${study.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-3xl bg-secondary transition hover:bg-[#23262e]"
              >
                <Image
                  src={study.cover}
                  alt={`${study.name} screenshot`}
                  className="h-[220px] w-full object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 560px"
                />
                <div className="p-6">
                  <h2 className="text-[22px] md:text-[26px]">{study.name}</h2>
                  <p className="mt-2 line-clamp-3 text-[15px] text-[#95979D]">
                    {study.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-[#e4ded7]/30 px-3 py-1 text-[13px]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
