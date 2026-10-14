import { getConfig, sendEnquiryEmails, type EnquiryData } from '../../lib/enquiryMail'

// The only server route on the site. It exists so the EmailJS keys stay private and
// so abuse (spam, mail to strangers) can be limited on the server.
export const runtime = 'nodejs'

const MAX_BODY = 30_000
const PER_IP_LIMIT = 5 // enquiries per IP per hour
const GLOBAL_DAILY_LIMIT = 150 // across this server instance

// Best-effort limits kept in memory. Serverless instances do not share memory, so this
// slows down abuse but is not a hard cap; the EmailJS quota is the hard cap.
const perIp = new Map<string, number[]>()
let day = { start: Date.now(), count: 0 }

const allowedHosts = () => {
  const hosts = new Set(['iamsharukh.com', 'www.iamsharukh.com'])
  if (process.env.NODE_ENV !== 'production') hosts.add('localhost')
  for (const extra of (process.env.ALLOWED_HOSTS ?? '').split(',')) {
    if (extra.trim()) hosts.add(extra.trim())
  }
  return hosts
}

const originAllowed = (request: Request) => {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return allowedHosts().has(new URL(origin).hostname)
  } catch {
    return false
  }
}

const limited = (ip: string) => {
  const now = Date.now()
  if (now - day.start > 86_400_000) day = { start: now, count: 0 }
  if (day.count >= GLOBAL_DAILY_LIMIT) return true
  const recent = (perIp.get(ip) ?? []).filter((time) => now - time < 3_600_000)
  if (recent.length >= PER_IP_LIMIT) {
    perIp.set(ip, recent)
    return true
  }
  recent.push(now)
  perIp.set(ip, recent)
  day.count += 1
  if (perIp.size > 5000) perIp.clear()
  return false
}

// One line only, trimmed, capped: keeps visitor text from breaking the subject or headers.
const line = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) : ''
const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const EMAIL = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/

const parse = (body: unknown): EnquiryData | null => {
  if (!body || typeof body !== 'object') return null
  const raw = body as Record<string, unknown>
  const audience = raw.audience === 'student' ? 'student' : raw.audience === 'client' ? 'client' : null
  const email = line(raw.email, 200)
  const name = line(raw.name, 100)
  if (!audience || !name || !EMAIL.test(email)) return null
  const services = Array.isArray(raw.services)
    ? raw.services.slice(0, 10).map((item) => line(item, 120)).filter(Boolean)
    : []
  if (services.length === 0) return null
  const details = Array.isArray(raw.details)
    ? raw.details.slice(0, 30).flatMap((item) => {
        if (!item || typeof item !== 'object') return []
        const entry = item as Record<string, unknown>
        const label = line(entry.label, 120)
        return label ? [{ label, value: text(entry.value, 3000) }] : []
      })
    : []
  return {
    audience,
    name,
    email,
    phone: line(raw.phone, 40),
    country: line(raw.country, 100),
    services,
    details,
    timeline: line(raw.timeline, 200),
    source: line(raw.source, 200),
    contactMethod: line(raw.contactMethod, 100),
  }
}

const reply = (status: number, error?: string) =>
  Response.json(error ? { ok: false, error } : { ok: true }, { status })

export async function POST(request: Request) {
  if (!originAllowed(request)) return reply(403, 'forbidden')

  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_BODY) return reply(413, 'too_large')

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return reply(429, 'rate_limited')

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return reply(413, 'too_large')
    body = JSON.parse(raw)
  } catch {
    return reply(400, 'invalid')
  }

  const data = parse(body)
  if (!data) return reply(400, 'invalid')

  const config = getConfig()
  if (!config) {
    console.error('Enquiry email is not configured: missing EMAILJS_* environment variables')
    return reply(500, 'not_configured')
  }

  try {
    await sendEnquiryEmails(config, data)
  } catch (error) {
    console.error('Enquiry email failed:', error)
    return reply(502, 'send_failed')
  }
  return reply(200)
}
