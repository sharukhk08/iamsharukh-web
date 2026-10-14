// Link-preview audit: reads every page in the sitemap the way a social network does.
// Usage: node ogaudit.mjs [http://localhost:3000]
const BASE = process.argv[2] || 'http://localhost:3000'
const PROD = 'https://www.iamsharukh.com'
const meta = (html, attr, key) => {
  const m = html.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, 'i')) || html.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`, 'i'))
  return m ? m[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'") : ''
}
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text()
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(PROD, '') || '/')
const problems = []
const seenTitles = new Map()
const seenDescs = new Map()
for (const path of paths) {
  const html = await (await fetch(BASE + path)).text()
  const p = {
    ogTitle: meta(html, 'property', 'og:title'), ogDesc: meta(html, 'property', 'og:description'),
    ogImage: meta(html, 'property', 'og:image'), ogUrl: meta(html, 'property', 'og:url'), ogType: meta(html, 'property', 'og:type'),
    twCard: meta(html, 'name', 'twitter:card'), twTitle: meta(html, 'name', 'twitter:title'), twDesc: meta(html, 'name', 'twitter:description'), twImage: meta(html, 'name', 'twitter:image'),
    canonical: (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '',
  }
  for (const [k, v] of Object.entries(p)) if (!v) problems.push(`${path}: missing ${k}`)
  if (p.ogTitle !== p.twTitle) problems.push(`${path}: og:title and twitter:title differ`)
  if (p.ogDesc !== p.twDesc) problems.push(`${path}: og:description and twitter:description differ`)
  if (p.ogUrl && p.canonical && p.ogUrl !== p.canonical) problems.push(`${path}: og:url ${p.ogUrl} differs from canonical ${p.canonical}`)
  if (p.ogImage && !/^https:\/\//.test(p.ogImage)) problems.push(`${path}: og:image is not an absolute https URL`)
  if (seenTitles.has(p.ogTitle)) problems.push(`${path}: same og:title as ${seenTitles.get(p.ogTitle)}`); else seenTitles.set(p.ogTitle, path)
  if (seenDescs.has(p.ogDesc)) problems.push(`${path}: same og:description as ${seenDescs.get(p.ogDesc)}`); else seenDescs.set(p.ogDesc, path)
  if (p.ogDesc.length > 200) problems.push(`${path}: og:description is ${p.ogDesc.length} characters`)
  if (p.ogImage) {
    const r = await fetch(p.ogImage.replace(PROD, BASE))
    const type = r.headers.get('content-type') || ''
    const bytes = (await r.arrayBuffer()).byteLength
    if (r.status !== 200 || !type.startsWith('image/') || bytes < 1000) problems.push(`${path}: og:image ${r.status} ${type} ${bytes} bytes`)
  }
  console.log(`${path.padEnd(46)} ${p.ogType.padEnd(8)} ${p.twCard.padEnd(19)} ${p.ogTitle.slice(0, 60)}`)
}
console.log(`\n${paths.length} pages checked\nPROBLEMS: ${problems.length ? '\n' + problems.join('\n') : 'none'}`)
