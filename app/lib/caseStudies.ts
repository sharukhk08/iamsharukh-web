import type { StaticImageData } from 'next/image'
import { devProjects } from '../work-section/projectDetails'

export type CaseStudy = {
  slug: string
  name: string
  summary: string
  technologies: string[]
  image: StaticImageData
  // Add these only when confirmed. Without challenge, solution and outcome
  // the page is shown but kept out of Google and the sitemap (thin content).
  liveUrl?: string
  repoUrl?: string
  challenge?: string
  solution?: string
  outcome?: string
}

// Extra, owner-confirmed details per project, keyed by slug.
// Leave a field out until it is true; do not invent results.
const details: Record<
  string,
  Partial<Pick<CaseStudy, 'liveUrl' | 'repoUrl' | 'challenge' | 'solution' | 'outcome'>>
> = {
  blockframe: {},
  'rapid-rilief': {},
  warmemacher: {},
  'happer-tv': {},
}

const slugFor = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Project data entries use blank or whitespace-only strings for missing links.
const cleanUrl = (value?: string) => {
  const url = value?.trim()
  return url && /^https:\/\//.test(url) ? url : undefined
}

export const caseStudies: CaseStudy[] = devProjects.map((project) => {
  const slug = slugFor(project.name)
  const extra = details[slug] ?? {}
  return {
    slug,
    name: project.name,
    summary: project.description,
    technologies: project.technologies,
    image: project.image as unknown as StaticImageData,
    liveUrl: cleanUrl(extra.liveUrl ?? project.demo),
    repoUrl: cleanUrl(extra.repoUrl ?? project.github),
    challenge: extra.challenge,
    solution: extra.solution,
    outcome: extra.outcome,
  }
})

export const hasFullDetails = (study: CaseStudy) =>
  Boolean(study.challenge && study.solution && study.outcome)

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug)
