import Link from 'next/link'
import { ReactNode } from 'react'

// A small markdown renderer that outputs React elements, never raw HTML, so post
// content cannot inject markup or scripts. Supports: ## / ### / #### headings,
// paragraphs, - and 1. lists, fenced code blocks, **bold**, *italic*, `code` and
// [links](url). Anything else is shown as plain text.

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g

const safeHref = (href: string) =>
  /^(https?:\/\/|mailto:|\/(?!\/)|#)/.test(href) ? href : null

function renderInline(text: string, prefix: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    const key = `${prefix}-${index}`
    if (!part) return null
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link) {
      const href = safeHref(link[2])
      if (!href) return link[1]
      const external = /^https?:\/\//.test(href)
      return external ? (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {link[1]}
        </a>
      ) : (
        <Link key={key} href={href} className="underline underline-offset-2">
          {link[1]}
        </Link>
      )
    }
    return part
  })
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    if (line.startsWith('```')) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push(
        <pre
          key={`b${blocks.length}`}
          className="overflow-x-auto rounded-2xl bg-secondary p-4 text-[14px]"
        >
          <code>{code.join('\n')}</code>
        </pre>,
      )
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      const level = Math.max(2, heading[1].length)
      const key = `b${blocks.length}`
      const children = renderInline(heading[2], key)
      blocks.push(
        level === 2 ? (
          <h2 key={key} className="mt-12 text-[24px] md:text-[28px]">
            {children}
          </h2>
        ) : level === 3 ? (
          <h3 key={key} className="mt-8 text-[22px]">
            {children}
          </h3>
        ) : (
          <h4 key={key} className="mt-6 text-[18px]">
            {children}
          </h4>
        ),
      )
      i++
      continue
    }

    const ordered = /^\d+\.\s+/.test(line)
    if (ordered || /^[-*]\s+/.test(line)) {
      const pattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/
      const items: string[] = []
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(lines[i].replace(pattern, ''))
        i++
      }
      const key = `b${blocks.length}`
      const children = items.map((item, index) => (
        <li key={`${key}-${index}`}>{renderInline(item, `${key}-${index}`)}</li>
      ))
      blocks.push(
        ordered ? (
          <ol key={key} className="list-decimal space-y-2 pl-6">
            {children}
          </ol>
        ) : (
          <ul key={key} className="list-disc space-y-2 pl-6">
            {children}
          </ul>
        ),
      )
      continue
    }

    const paragraph: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('```') &&
      !/^#{1,4}\s+/.test(lines[i]) &&
      !/^([-*]|\d+\.)\s+/.test(lines[i])
    ) {
      paragraph.push(lines[i++])
    }
    const key = `b${blocks.length}`
    blocks.push(<p key={key}>{renderInline(paragraph.join(' '), key)}</p>)
  }

  return (
    <div className="space-y-5 text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
      {blocks}
    </div>
  )
}
