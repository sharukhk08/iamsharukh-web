import { OG_SIZE, OG_TYPE, renderOg } from '../../lib/og'
import { getService, services } from '../../lib/services'

export const size = OG_SIZE
export const contentType = OG_TYPE
// Pre-generate every share image at build time, so none runs a function on request.
export const dynamicParams = false
export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }))
}

export const alt = 'Service by Sharukh Khan'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  return renderOg({ title: service?.title ?? 'Services', subtitle: service?.tagline, tag: 'Services' })
}
