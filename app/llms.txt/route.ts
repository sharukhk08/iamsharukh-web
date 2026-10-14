import { llmsTxt } from '../lib/llms'

// Generated once at build, so it is a plain static file on the host.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
