import fs from 'node:fs'
import path from 'node:path'
import { parseFrontmatter } from './frontmatter'

// HOW PROJECTS WORK (see docs/adding-projects.md)
//   Text:   content/projects/<slug>.md
//   Images: public/projects/<slug>/cover.png   (required; png, jpg, webp)
//           public/projects/<slug>/shot-1.png  (optional extra screenshots)
// Nothing else needs editing: the home page grid, /work and /work/<slug> all read this.

export type ProjectImage = { src: string; width: number; height: number }

export type Project = {
  slug: string
  name: string
  summary: string
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
  comingSoon: boolean
  order: number
  cover: ProjectImage
  shots: ProjectImage[]
  challenge?: string
  solution?: string
  outcome?: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects')
const IMAGE_DIR = path.join(process.cwd(), 'public', 'projects')
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i

// Reads width and height from the file header, so no image package is needed.
function imageSize(file: string): { width: number; height: number } | null {
  const buf = fs.readFileSync(file)
  if (buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buf.length && buf[offset] === 0xff) {
      const marker = buf[offset + 1]
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
      }
      offset += 2 + buf.readUInt16BE(offset + 2)
    }
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16)
    if (kind === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    }
    if (kind === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (kind === 'VP8X') {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) }
    }
  }
  return null
}

function readImage(slug: string, file: string): ProjectImage | null {
  const size = imageSize(path.join(IMAGE_DIR, slug, file))
  if (!size) {
    console.warn(`projects: could not read the size of public/projects/${slug}/${file}`)
    return null
  }
  return { src: `/projects/${slug}/${file}`, ...size }
}

// Only real https links are used; anything else is ignored.
const cleanUrl = (value?: string) =>
  value && /^https:\/\/\S+$/.test(value.trim()) ? value.trim() : undefined

function sections(body: string) {
  const found: Record<string, string> = {}
  for (const part of body.split(/^##\s+/m).slice(1)) {
    const [heading, ...rest] = part.split('\n')
    const text = rest.join('\n').trim().replace(/\n{2,}/g, '\n\n')
    const key = heading.toLowerCase()
    if (key.includes('challenge')) found.challenge = text
    else if (key.includes('built') || key.includes('solution')) found.solution = text
    else if (key.includes('outcome') || key.includes('result')) found.outcome = text
  }
  return found
}

export function getProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const projects: Project[] = []

  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith('.md') || file.startsWith('_') || /^readme/i.test(file)) continue
    const slug = file.replace(/\.md$/, '')
    const parsed = parseFrontmatter(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
    if (!parsed || !parsed.meta.name || !parsed.meta.summary) {
      console.warn(`projects: ${file} needs "name" and "summary" in its frontmatter`)
      continue
    }
    if (parsed.meta.status === 'draft') continue

    const dir = path.join(IMAGE_DIR, slug)
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f)) : []
    const coverFile = files.find((f) => /^cover\./i.test(f))
    const cover = coverFile ? readImage(slug, coverFile) : null
    if (!cover) {
      console.warn(`projects: ${file} needs an image at public/projects/${slug}/cover.png (or .jpg/.webp)`)
      continue
    }
    const shots = files
      .filter((f) => /^shot-\d+\./i.test(f))
      .sort((a, b) => parseInt(a.slice(5), 10) - parseInt(b.slice(5), 10))
      .map((f) => readImage(slug, f))
      .filter((img): img is ProjectImage => img !== null)

    const { meta, body } = parsed
    projects.push({
      slug,
      name: meta.name,
      summary: meta.summary,
      technologies: (meta.technologies ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: cleanUrl(meta.liveUrl),
      repoUrl: cleanUrl(meta.repoUrl),
      comingSoon: meta.status === 'coming-soon',
      order: Number.isFinite(Number(meta.order)) ? Number(meta.order) : 999,
      cover,
      shots,
      ...sections(body),
    })
  }
  return projects.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
}

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug)

export const hasFullDetails = (project: Project) =>
  Boolean(project.challenge && project.solution && project.outcome)
