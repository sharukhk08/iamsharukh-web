import { chromium } from 'playwright-core'
import fs from 'node:fs'
const axeSrc = fs.readFileSync(new URL('./node_modules/axe-core/axe.min.js', import.meta.url), 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })
const summary = {}
for (const path of ['/', '/services', '/services/figma-to-nextjs', '/work', '/learn', '/contact', '/blog/check-ai-built-app-before-launch', '/locations/hisar']) {
  const page = await browser.newPage({ viewport: { width: 390, height: 800 }, isMobile: true })
  await page.goto('http://localhost:3180' + path, { waitUntil: 'load' })
  await page.waitForTimeout(path === '/' ? 10000 : 2000)
  await page.addScriptTag({ content: axeSrc })
  const r = await page.evaluate(async () => { const x = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'best-practice'] }); return x.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, sample: v.nodes[0].target.join(' ').slice(0, 70) })) })
  console.log(`\n${path}: ${r.length} issue types`)
  for (const v of r) { console.log(`  [${v.impact}] ${v.id} x${v.n}: ${v.help}  e.g. ${v.sample}`); summary[v.id] = (summary[v.id] || 0) + v.n }
  await page.close()
}
console.log('\nTOTAL BY RULE:', JSON.stringify(summary))
await browser.close()
