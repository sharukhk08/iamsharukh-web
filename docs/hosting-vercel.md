# Hosting notes (Vercel)

Written 2026-10-14. Plan limits change often and could not be checked from the build environment, so look at the **Usage** page in the Vercel dashboard and Vercel's Limits and Fair Use pages for current numbers. This file records what is true about the code.

## How the site is built

- Every page is **static** (generated once at build, served as files). A build prints `○` or `●` for these.
- There is **no middleware, no API route and no edge function**.
- The only server work is **image optimisation** for `next/image` pictures (project covers, profile photo, reviews). Results are cached after the first request.
- The contact form posts to one small serverless route, `/api/enquiry`, which holds the EmailJS keys privately and sends the email. It is the only `ƒ` route and runs only when someone sends an enquiry.
- Blog posts and projects are Markdown files read at build time. Adding one adds one static page and needs a new deploy.

## Rules to keep it cheap

1. After every change to routes, run `npm run build` and look at the route list. **Any `ƒ` means a serverless function runs per request.** There should be exactly one: `/api/enquiry`.
2. Do not read `searchParams`, `cookies()` or `headers()` in a server page. Use `useSearchParams` in a client component inside `<Suspense>` instead (see `app/contact-section/ContactForm.tsx`).
3. Do not add `app/api` routes, `middleware.ts` or `proxy.ts` unless you need them.
4. Do not add `export const dynamic = 'force-dynamic'` or `revalidate` timers.
5. Keep images small (under about 500 KB source). Prefer `.webp`.
6. Unknown URLs use the static `app/not-found.tsx`. Do not add a catch-all route such as `[...slug]`.

## Things to check

- **Hobby plan terms.** Vercel's Hobby plan is described as for personal, non-commercial use. A portfolio that advertises paid services may count as commercial, so read Vercel's Fair Use Guidelines. If it does, the options are Vercel Pro or another host with a free tier that allows commercial sites.
- **Environment variables** `EMAILJS_*` (no `NEXT_PUBLIC_`, see `.env.example`) must be set in the Vercel project settings, or the contact form will fail.
- **EmailJS** has its own monthly email limit on the free plan.

## Environment variables

All variables are `NEXT_PUBLIC_*`: they are compiled into the JavaScript every visitor downloads, so they are **public by design**. This repository has no private secrets. See the table in `docs/reports/02-architecture-review.md` for which variable is what, and which accounts to rotate after the earlier malware.

## Moving to a new GitHub repo

Add the new repo as a second git remote and push `dev` and `main` to it. In Vercel, open the project, Settings, Git, disconnect the old repo and connect the new one: the domain and environment variables stay. Set Production Branch to `main`. Install the Vercel GitHub app on the new repo. Keep the old repo until the new deploy works.
