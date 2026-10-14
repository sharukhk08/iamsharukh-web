import { OG_SIZE, OG_TYPE, renderOg } from '../../lib/og'
import { getProject, getProjects } from '../../lib/projects'

export const size = OG_SIZE
export const contentType = OG_TYPE
// Pre-generate every share image at build time, so none runs a function on request.
export const dynamicParams = false
export function generateStaticParams() {
  return getProjects().map((item) => ({ slug: item.slug }))
}

export const alt = 'Project by Sharukh Khan'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return renderOg({ title: project?.name ?? 'Work', subtitle: project?.summary, tag: 'Work' })
}
