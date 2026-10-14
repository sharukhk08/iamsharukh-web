import { getLearnPage, learnPages } from '../../lib/learnPages'
import { OG_SIZE, OG_TYPE, renderOg } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
// Pre-generate every share image at build time, so none runs a function on request.
export const dynamicParams = false
export function generateStaticParams() {
  return learnPages.map((item) => ({ slug: item.slug }))
}

export const alt = 'Courses and mentoring by Sharukh Khan'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getLearnPage(slug)
  return renderOg({ title: page?.metaTitle ?? 'Learn', subtitle: page?.metaDescription, tag: 'Learn' })
}
