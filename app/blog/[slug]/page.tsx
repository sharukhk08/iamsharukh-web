import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getPost, getPosts } from '../../lib/blog'
import { contactHref } from '../../lib/contact'
import { JsonLd } from '../../lib/jsonLd'
import AuthorBox from '../../components/AuthorBox'
import ShareButtons from '../../components/ShareButtons'
import { Markdown } from '../../lib/markdown'
import { pageMeta } from '../../lib/seo'
import { SITE } from '../../lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return pageMeta({
    ownImage: true,
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
  })
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${SITE.url}/blog/${post.slug}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en',
    wordCount: post.content.split(/\s+/).length,
    image: `${url}/opengraph-image`,
    mainEntityOfPage: url,
    author: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.name, url: `${SITE.url}/about` },
    publisher: { '@id': `${SITE.url}/#person` },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <main className="mx-auto w-[90%] max-w-[800px] pt-10 md:pt-16">
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />

      <p className="text-[14px] text-[#c9c4bd]">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{' '}
        / {formatDate(post.date)}
      </p>
      <h1 className="h1-compact mt-4 text-[34px] leading-tight md:text-[48px]">{post.title}</h1>
      <p className="mt-4 text-[18px] text-[#c9c4bd]">{post.description}</p>

      <div className="mt-10">
        <Markdown source={post.content} />
      </div>

      <ShareButtons url={url} title={post.title} text={post.description} />

      <AuthorBox />

      <section className="mt-16 rounded-3xl bg-secondary p-8">
        <h2 className="text-[24px]">Need a hand with your project?</h2>
        <p className="mt-3 text-[16px] text-[#c9c4bd]">
          I am Sharukh Khan, a full-stack developer in Hisar, Haryana. Tell me
          what you are building and I will reply with next steps.
        </p>
        <Link
          href={contactHref()}
          className="mt-6 inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
        >
          Send an enquiry
        </Link>
      </section>
    </main>
  )
}
