# Hosting notes (Vercel)

Written 2026-10-14. Plan limits change often and could not be checked from the build environment, so look at the **Usage** page in the Vercel dashboard and Vercel's Limits and Fair Use pages for current numbers. This file records what is true about the code.

## How the site is built

- Every page is **static** (generated once at build, served as files). A build prints `○` or `●` for these.
- There is **no middleware, no API route and no edge function**.
- The only server work is **image optimisation** for `next/image` pictures (project covers, profile photo, reviews). Results are cached after the first request.
- The contact form sends email straight from the visitor's browser through EmailJS, so it needs no server code.
- Blog posts and projects are Markdown files read at build time. Adding one adds one static page and needs a new deploy.

## Rules to keep it cheap

1. After every change to routes, run `npm run build` and look at the route list. **Any `ƒ` means a serverless function runs per request.** There should be none.
2. Do not read `searchParams`, `cookies()` or `headers()` in a server page. Use `useSearchParams` in a client component inside `<Suspense>` instead (see `app/contact-section/ContactForm.tsx`).
3. Do not add `app/api` routes, `middleware.ts` or `proxy.ts` unless you need them.
4. Do not add `export const dynamic = 'force-dynamic'` or `revalidate` timers.
5. Keep images small (under about 500 KB source). Prefer `.webp`.
6. Unknown URLs use the static `app/not-found.tsx`. Do not add a catch-all route such as `[...slug]`.

## Things to check

- **Hobby plan terms.** Vercel's Hobby plan is described as for personal, non-commercial use. A portfolio that advertises paid services may count as commercial, so read Vercel's Fair Use Guidelines. If it does, the options are Vercel Pro or another host with a free tier that allows commercial sites.
- **Environment variables** `NEXT_PUBLIC_EMAILJS_*` must be set in the Vercel project settings, or the contact form will fail.
- **EmailJS** has its own monthly email limit on the free plan.
