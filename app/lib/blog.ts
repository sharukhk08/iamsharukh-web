import fs from 'node:fs'
import path from 'node:path'

export type Post = {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  content: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

// Frontmatter is a simple "key: value" block between two --- lines.
function parse(slug: string, raw: string): Post | null {
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return null
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const index = line.indexOf(':')
    if (index > 0) meta[line.slice(0, index).trim()] = line.slice(index + 1).trim()
  }
  if (!meta.title || !meta.description || !meta.date) return null
  if (meta.draft === 'true') return null
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    content: match[2].trim(),
  }
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) =>
      parse(file.replace(/\.md$/, ''), fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')),
    )
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const getPost = (slug: string) => getPosts().find((post) => post.slug === slug)

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
