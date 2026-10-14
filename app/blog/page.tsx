import type { Metadata } from 'next'
import Link from 'next/link'
import RevealWords from '../components/effects/RevealWords'
import PageBackdrop from '../components/PageBackdrop'
import Reveal from '../components/Reveal'
import { formatDate, getPosts } from '../lib/blog'
import { JsonLd, itemListJsonLd } from '../lib/jsonLd'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical notes on Next.js, React, Figma to code and getting AI-built apps ready for launch.',
  alternates: { canonical: '/blog' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
  ],
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemListJsonLd(posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })))} />
      <PageBackdrop />
      <h1 className="text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Blog" />
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#c9c4bd] md:text-[18px]">
        Practical notes on Next.js, React, Figma to code and getting AI-built
        apps ready for launch.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-[#95979D]">Posts are coming soon.</p>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={(index % 2) * 80} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="flex h-full flex-col rounded-3xl bg-secondary p-6 transition hover:bg-[#23262e] md:p-8"
              >
                <p className="text-[13px] uppercase text-[#95979D]">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-2 text-[22px] md:text-[26px]">{post.title}</h2>
                <p className="mt-3 text-[15px] text-[#95979D]">
                  {post.description}
                </p>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
