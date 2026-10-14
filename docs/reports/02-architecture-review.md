# Report 2: Architecture review (cost and performance)

Reviewer view: a solutions architect with 10 years of experience, asked to keep the site cheap to run, fast, safe and ready to grow without paying for a bigger plan. I could not reach vercel.com from the build environment, so plan limits are **not quoted**. Check the Usage page in the Vercel dashboard and Vercel's Limits and Fair Use pages for current numbers.

## How the site runs

- Next.js 16 with the App Router. **Every page is generated once at build and served as a file** (the build marks each route static). **No route runs server code per request.** There is no middleware, no API route and no edge function.
- The only runtime server work is image optimisation for pictures served through `next/image`. Results are cached after the first request.
- The contact form sends email directly from the visitor's browser through EmailJS, so it needs no server.
- Blog posts and projects are Markdown files read at build time. Content changes need a new deploy, which costs build time only.

## Findings

| # | Finding | Impact on cost or speed | Status |
| --- | --- | --- | --- |
| 1 | `/contact` ran a serverless function on every visit because it read the search string on the server | Function invocations | Fixed: read in the browser |
| 2 | A leftover catch-all route ran a function for every unknown URL, including bot probes | Function invocations, abuse risk | Fixed: removed; unknown URLs use the static 404 |
| 3 | Per-page share images were generated on demand | Function invocations | Fixed: pre-generated at build |
| 4 | Five images weighed 4,984 KB | Bandwidth, image optimiser work, slow loads | Fixed: 324 KB |
| 5 | Loading screen animated `height` (layout every frame) | CLS 0.51 | Fixed |
| 6 | Two unused font preconnects, fonts set to `display: block` (invisible text while loading) | Slower first paint | Fixed: removed, `swap` |
| 7 | Analytics loaded `afterInteractive` | Slower interactivity | Fixed: `lazyOnload` |
| 8 | Home project images fetched at 1920 px to show 246 px | Bandwidth | Fixed with `sizes` |
| 9 | `reactStrictMode: false` (needed for the existing animation components) | Hides some dev-time bugs | Documented; fix by making animations strict-mode safe |
| 10 | React 18 is deprecated in Next 16 and blocked by the cursor package (`blobity`) | Upgrade path | Backlog: replace `blobity` |
| 11 | About 330 KB of JavaScript (compressed) across chunks, including animation libraries on pages that barely use them | Mobile load time | Backlog: split `framer-motion` out of content pages |
| 12 | 10 `npm audit` findings, all in build tooling (Tailwind 3 and the ESLint config) | None for visitors | Backlog: Tailwind 4 migration |
| 13 | Content (Markdown, images) lives in git | Repo grows | Fine for now; originals moved to `content/originals/` |

## Cost model

- **Hosting:** static pages are the cheapest possible shape: bandwidth is the main cost. With images at 324 KB the pages are light.
- **Build time:** about 15 to 30 seconds for 60+ generated pages. Each new blog post or project adds one page. This stays small for hundreds of pages.
- **Email:** EmailJS has its own monthly limit on the free plan. A busy month of enquiries plus auto-replies uses two emails per enquiry.
- **Analytics:** Google Analytics is free.

## Rules that keep it cheap (also in `docs/hosting-vercel.md`)

1. After any route change, run `npm run build` and look for `ƒ` in the route list. There should be none.
2. Do not read `searchParams`, `cookies()` or `headers()` in a server page.
3. Do not add `app/api`, `middleware.ts`, `proxy.ts`, `force-dynamic` or `revalidate` timers unless needed.
4. Keep images under about 500 KB; prefer WebP.
5. Do not add a catch-all route.

## Risks to decide on

1. **Vercel Hobby terms.** The Hobby plan is described as for personal, non-commercial use. A site that advertises paid services may count as commercial. Read Vercel's Fair Use Guidelines. If it does, options are Vercel Pro, or another host with a free tier that allows commercial sites (static hosting suits this site well).
2. **Environment variables.** See the table below.
3. **Single points of failure:** EmailJS (form), cal.com (booking). Both have a fallback on the contact page.

## Environment variables: public or private?

All variables this site uses are `NEXT_PUBLIC_*`. **They are compiled into the JavaScript every visitor downloads, so they are public by design.** There are **no private secrets** in this repository.

| Variable | Public? | What it is | Action |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public | EmailJS public key, meant for browsers | No need to rotate. Restrict allowed domains in EmailJS |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Public | Identifies the email service | Not a secret |
| `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID` | Public | Template for your notification | Not a secret |
| `NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID` | Public | Template for the auto-reply | Not a secret |
| `NEXT_PUBLIC_EMAILJS_TO_EMAIL` | Public | Your receiving address, visible in the page's JavaScript | Better: fix the "To email" in the EmailJS template, then remove this variable |
| `GOOGLE_SITE_VERIFICATION` (optional) | Public | Search Console token, ends up in the page HTML | Not a secret |

Because the project was infected by malware earlier, **rotate anything that lived on that machine**, even though the repo holds no secrets:

- Any **private** EmailJS key (Account, Security) if one exists, and turn off "Allow EmailJS API for non-browser applications" unless you need it.
- GitHub tokens and SSH keys used on that machine, Vercel tokens, and any `.env` files in other projects (for example `prompt-radar`), plus passwords saved in the browser.
- Do not put a secret in a `NEXT_PUBLIC_*` variable ever. Secrets belong in plain (non-public) variables read only by server code, and this site has no server code.
