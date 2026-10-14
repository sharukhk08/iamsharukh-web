import type { StaticImageData } from 'next/image'

// The shape the home page project card expects. The data itself comes from
// content/projects/*.md via app/lib/projects.ts (see docs/adding-projects.md).
export type ProjectProps = {
  id: number
  name: string
  description: string
  technologies: string[]
  github: string
  demo: string
  image: StaticImageData
  available: boolean
}
