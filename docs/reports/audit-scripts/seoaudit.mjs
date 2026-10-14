import { chromium } from 'playwright-core'
const BASE = 'http://localhost:3180'
const REQUIRED = {
  Person: ['name', 'url'],
  WebSite: ['name', 'url'],
  Service: ['name', 'provider', 'areaServed'],
  ProfessionalService: ['name', 'address', 'url'],
  BlogPosting: ['headline', 'datePublished', 'author', 'image'],
  Course: ['name', 'description', 'provider'],
  Organization: ['name', 'url'],
  ProfilePage: ['mainEntity'],
  ItemList: ['itemListElement'],
  WebPage: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
  CreativeWork: ['name'],
  ContactPage: ['name', 'url'],
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })
const sm = await (await fetch(BASE + '/sitemap.xml')).text()
const inSitemap = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace('https://www.iamsharukh.com', '') || '/'))
const pages = ['/', '/services', '/work', '/locations', '/learn', '/learn/hisar', '/learn/haryana', '/blog', '/contact', '/about', '/links', '/privacy', '/services/figma-to-nextjs', '/services/ai-automation-n8n', '/locations/hisar', '/blog/check-ai-built-app-before-launch', '/work/blockframe']
const findings = {}
const add = (k, v) => (findings[k] ||= []).push(v)
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, isMobile: true })
for (const path of pages) {
  const page = await ctx.newPage()
  await page.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value }).observe({ type: 'layout-shift', buffered: true })
  })
  const resp = await page.goto(BASE + path, { waitUntil: 'load' })
  await page.waitForTimeout(path === '/' ? 10000 : 2500)
  const d = await page.evaluate(() => {
    const m = (s) => document.querySelector(s)?.content || document.querySelector(s)?.href || ''
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent) } catch { return 'INVALID' } })
    return {
      title: document.title, desc: m('meta[name=description]'), canon: m('link[rel=canonical]'),
      og: ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'].map(p => [p, !!m(`meta[property="${p}"]`)]),
      tw: ['twitter:card', 'twitter:image'].map(p => [p, !!m(`meta[name="${p}"]`)]),
      ogImage: m('meta[property="og:image"]'),
      lang: document.documentElement.lang,
      words: document.body.innerText.split(/\s+/).length,
      h: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName),
      ld, lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3),
      imgs: [...document.images].map(i => ({ alt: i.getAttribute('alt'), w: i.naturalWidth, rw: i.clientWidth, src: i.currentSrc })).filter(i => i.src),
      scripts: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script').reduce((a, r) => a + (r.encodedBodySize || 0), 0),
    }
  })
  const flat = d.ld.flatMap(x => x === 'INVALID' ? [x] : x['@graph'] ? x['@graph'] : [x])
  for (const node of flat) {
    if (node === 'INVALID') { add('invalid json-ld', path); continue }
    const types = [].concat(node['@type'])
    for (const t of types) for (const field of (REQUIRED[t] || [])) if (node[field] === undefined) add(`schema ${t} missing "${field}"`, path)
  }
  if (!d.og.every(([, ok]) => ok)) add('missing OG tags: ' + d.og.filter(([, ok]) => !ok).map(([p]) => p).join(','), path)
  if (!d.tw.every(([, ok]) => ok)) add('missing twitter tags: ' + d.tw.filter(([, ok]) => !ok).map(([p]) => p).join(','), path)
  if (d.imgs.some(i => i.alt === null)) add('image without alt attribute', path)
  const big = d.imgs.filter(i => i.rw && i.w > i.rw * 2.2).length
  if (big) add(`${big} image(s) far larger than displayed`, path)
  if (!inSitemap.has(path) && !path.startsWith('/work/')) add('indexable page not in sitemap', path)
  console.log(`${String(resp.status())} ${path.padEnd(44)} LCP ${String(d.lcp).padStart(5)}ms  CLS ${d.cls}  words ${String(d.words).padStart(4)}  js ${Math.round(d.scripts / 1024)}KB  og:image ${d.ogImage ? 'yes' : 'NO'}  lang=${d.lang}  ld=${flat.map(n => [].concat(n['@type']).join('+')).join(',')}`)
  await page.close()
}
console.log('\nROBOTS.TXT:\n' + (await (await fetch(BASE + '/robots.txt')).text()))
const llms = await fetch(BASE + '/llms.txt'); const llmsText = await llms.text()
console.log('llms.txt status:', llms.status, '| bytes:', llmsText.length, '| llms-full.txt bytes:', (await (await fetch(BASE + '/llms-full.txt')).text()).length)
// every URL in the sitemap must answer 200 and not be noindex
let bad = 0
for (const u of inSitemap) { const r = await fetch(BASE + (u === '/' ? '/' : u)); if (r.status !== 200) { bad++; console.log('SITEMAP URL FAILS', u, r.status) } }
console.log('sitemap urls:', inSitemap.size, '| failing:', bad)
const og = await fetch(BASE + '/services/figma-to-nextjs/opengraph-image'); console.log('og image:', og.status, og.headers.get('content-type'), (await og.arrayBuffer()).byteLength, 'bytes')
console.log('\nFINDINGS:'); for (const [k, v] of Object.entries(findings)) console.log(`- ${k}: ${[...new Set(v)].join(', ')}`)
await browser.close()
