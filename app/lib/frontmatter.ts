// Shared by the blog and the projects: a "key: value" block between two --- lines,
// followed by Markdown. Returns null when the file has no frontmatter block.
export function parseFrontmatter(
  raw: string,
): { meta: Record<string, string>; body: string } | null {
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return null
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const index = line.indexOf(':')
    if (index > 0) meta[line.slice(0, index).trim()] = line.slice(index + 1).trim()
  }
  return { meta, body: match[2].trim() }
}
