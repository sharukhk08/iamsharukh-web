import { getLocation, locations } from '../../lib/locations'
import { OG_SIZE, OG_TYPE, renderOg } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
// Pre-generate every share image at build time, so none runs a function on request.
export const dynamicParams = false
export function generateStaticParams() {
  return locations.map((item) => ({ slug: item.slug }))
}

export const alt = 'Web and app developer by location'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = getLocation(slug)
  return renderOg({ title: location?.shortTitle ?? 'Locations', subtitle: location?.metaDescription, tag: 'Locations' })
}
