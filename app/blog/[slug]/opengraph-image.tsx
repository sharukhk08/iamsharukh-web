import { getPost, getPosts } from '../../lib/blog'
import { OG_SIZE, OG_TYPE, renderOg } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
// Pre-generate every share image at build time, so none runs a function on request.
export const dynamicParams = false
export function generateStaticParams() {
  return getPosts().map((item) => ({ slug: item.slug }))
}

export const alt = 'Article by Sharukh Khan'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return renderOg({ title: post?.title ?? 'Blog', subtitle: post?.description, tag: 'Blog' })
}
