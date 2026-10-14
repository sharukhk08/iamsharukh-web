import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })
for (const [name, vp, mobile] of [['mobile 390', { width: 390, height: 800 }, true], ['desktop 1440', { width: 1440, height: 900 }, false]]) {
  const page = await browser.newPage({ viewport: vp, isMobile: mobile })
  await page.addInitScript(() => {
    window.__shifts = []
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__shifts.push({ t: Math.round(e.startTime), v: +e.value.toFixed(3), nodes: (e.sources || []).map(s => (s.node && (s.node.nodeName + '.' + String(s.node.className || '').slice(0, 40) + '#' + (s.node.id || ''))) || '?') }) }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto('http://localhost:3180/', { waitUntil: 'load' })
  await page.waitForTimeout(10500)
  const shifts = await page.evaluate(() => window.__shifts)
  console.log(`== ${name}: total CLS ${shifts.reduce((a, s) => a + s.v, 0).toFixed(3)} in ${shifts.length} shifts`)
  for (const s of shifts.slice(0, 8)) console.log(`  t=${s.t}ms value=${s.v}  ${s.nodes.join(' | ')}`)
  await page.close()
}
await browser.close()
