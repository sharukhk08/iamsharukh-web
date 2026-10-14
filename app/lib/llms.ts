import { getPosts } from './blog'
import { courses } from './courses'
import { learnPages } from './learnPages'
import { HISAR_OFFICE, locations } from './locations'
import { getProjects } from './projects'
import { services } from './services'
import { SITE } from './site'

const url = (path: string) => `${SITE.url}${path}`

const facts = [
  'Sharukh Khan is a full-stack developer and software engineer based in Hisar, Haryana, India.',
  'He has 7 years of experience and is co-founder and CTO of Innovaft (innovaft.com), a web development company and training institute in Hisar.',
  'He builds websites, web apps, SaaS dashboards, React Native mobile apps, e-commerce, CRM software and AI automations (n8n) for clients in Haryana and worldwide.',
  'He mentors students at Innovaft: 50+ students trained, 10 placed in jobs.',
  'Stack: Next.js, React, React Native, TypeScript, Node.js, Tailwind CSS, MongoDB, Firebase, Figma, n8n, OpenAI and Claude APIs.',
]

// llms.txt is a proposed convention (llmstxt.org): a short Markdown guide to the site
// for AI tools. No major AI company has confirmed they read it, so treat it as a
// cheap extra and keep robots.txt and the sitemap as the real signals.
export function llmsTxt(): string {
  return [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    ...facts.map((fact) => `- ${fact}`),
    '',
    '## Services',
    ...services.map((s) => `- [${s.title}](${url(`/services/${s.slug}`)}): ${s.tagline}`),
    '',
    '## Learn',
    `- [Courses and mentoring](${url('/learn')}): six in-person Innovaft courses in Hisar`,
    ...learnPages.map((p) => `- [${p.metaTitle}](${url(`/learn/${p.slug}`)}): ${p.metaDescription}`),
    '',
    '## Locations served',
    ...locations.map((l) => `- [${l.shortTitle}](${url(`/locations/${l.slug}`)})`),
    '',
    '## Work and writing',
    `- [Selected work](${url('/work')})`,
    ...getPosts().map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`),
    '',
    '## About and contact',
    `- [International clients](${url('/international')}): how a project runs across time zones, from India`,
    `- [About](${url('/about')}): who he is, how he works, Innovaft`,
    `- [Contact](${url('/contact')}): enquiry form and booking link`,
    `- [Links](${url('/links')}): official profiles`,
    '',
    '## Optional',
    `- [Full text of this site](${url('/llms-full.txt')})`,
    '',
  ].join('\n')
}

// A single Markdown file with the substance of the site, for AI tools that prefer
// one fetch to crawling many pages.
export function llmsFullTxt(): string {
  const out: string[] = [llmsTxt(), '---', '']
  out.push('# Services in detail', '')
  for (const s of services) {
    out.push(`## ${s.title}`, `URL: ${url(`/services/${s.slug}`)}`, '', s.summary, '')
    out.push('Who it is for:', ...s.forWho.map((x) => `- ${x}`), '')
    out.push('What you get:', ...s.deliverables.map((x) => `- ${x}`), '')
    out.push(`Stack: ${s.stack.join(', ')}`, '')
    out.push(...s.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']))
  }
  out.push('# Courses at Innovaft, Hisar', '')
  out.push(`Location: ${HISAR_OFFICE.address}. Hours: ${HISAR_OFFICE.hours}. Taught in person, with online support.`, '')
  for (const c of courses) out.push(`- ${c.name}: ${c.summary} Topics: ${c.topics.join(', ')}.`)
  out.push('')
  for (const p of learnPages) {
    out.push(`## ${p.h1}`, `URL: ${url(`/learn/${p.slug}`)}`, '', p.intro, '')
    for (const section of p.sections) out.push(`### ${section.heading}`, ...section.paragraphs, '')
    out.push(...p.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']))
  }
  const projects = getProjects()
  if (projects.length) {
    out.push('# Projects', '')
    for (const p of projects) out.push(`- ${p.name}: ${p.summary} (${p.technologies.join(', ')})`)
    out.push('')
  }
  for (const post of getPosts()) {
    out.push(`# ${post.title}`, `URL: ${url(`/blog/${post.slug}`)}`, `Published: ${post.date}`, '', post.content, '')
  }
  return out.join('\n')
}
