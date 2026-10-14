# Portfolio expansion plan

Goal: bring in international and Haryana clients from Fiverr, Upwork, LinkedIn, Contra and local leads, and promote mentoring and Innovaft courses.

Branch: `dev` (push to `dev`, open a PR into `main`, never push to `main` directly).
Last updated: 2026-10-14. Design assets needed from the designer are listed in `docs/design-requests.md`.

## Decisions (confirmed by Sharukh)

- Market: international and Haryana equally.
- Structure: one page per service, plus a short services section on the home page.
- Blog: markdown files in this repo (no CMS). A markdown renderer is a new dependency and needs approval first.
- Brand: personal brand first, Innovaft as "my company".
- Budget field in the contact form: dropped.
- Contact form: multi-step, optimised so every enquiry arrives in email ready to quote.
- Salary and earnings claims: never shown.

## Confirmed facts (only these may appear on the site)

| Item | Value |
| --- | --- |
| Name / title | Sharukh Khan, Full-Stack Developer & Software Engineer |
| Role | Co-founder & CTO of Innovaft |
| Location | Hisar, Haryana, India |
| Experience | 7 years |
| Mentoring | 50+ students trained, 10 placed |
| Innovaft clients | 600+ (see open issue 1) |
| Stack | React, Next.js, React Native, TypeScript, Node.js, Tailwind, Firebase |
| Contact | cal.com/iamsharukh/30min, contact@innovaft.com |
| Profiles | github.com/sharukhk08, linkedin.com/in/sharukh08, contra.com/iamsharukh, instagram.com/sharukh_k08, x.com/sharukhk08 |

Do not use: "500+ students", "95% placement", "4.9 by 10,000 users", salary figures, "230+/250+ clients" from the Innovaft pages.

## Services (`/services/<slug>`)

1. Figma to Next.js website
2. Figma UI/UX design
3. Custom SaaS dashboards
4. Full-stack web apps
5. CRM and custom software
6. E-commerce apps
7. React Native mobile apps
8. Claude Code export cleanup
9. Lovable / Bolt / AI-built app cleanup
10. Project management and technical leadership (supporting)
11. Mentoring and Innovaft courses (supporting)

## Location pages

Hisar, Hansi, Bhiwani, Rohtak and a Haryana state page. Each needs unique content. No invented clients or results. If a page would be generic, do not publish it.

## Multi-step contact form

1. You: name, email, phone, city/country.
2. Need: service(s) or course/mentoring enquiry.
3. Details depending on the choice (Figma/app link, features, new vs fix, platform for mobile, level and goal for students).
4. Timing, how they found you, preferred contact method, review and submit.

Email subject: `[Service] Lead - Country`. Auto-reply to the client. Spam protection: honeypot, time check, server-side origin check and rate limits, EmailJS domain restrictions, CAPTCHA if needed. Setup is in `docs/emailjs/README.md`. No new dependencies.

## Order of work

| # | Step | Status |
| --- | --- | --- |
| 1 | Upgrade Next.js to 16.4.0, update and clean dependencies | Done |
| 2 | SEO foundation (metadataBase, canonical, sitemap, robots, JSON-LD) | Done |
| 3 | Services data file and pages | Done |
| 4 | Multi-step contact form | Done |
| 5 | Case studies (`/work/[slug]`) | Done for the 4 existing projects. Pages stay `noindex` until challenge, solution and outcome are filled in `content/projects/<slug>.md` |
| 6 | Location pages | Done |
| 7 | Learn / mentoring page | Done |
| 8 | Blog (markdown) | Done |
| 9 | Home page updates (services section, nav, footer) | Done |

Before each commit: `node scripts/dev-guard.mjs .`, `npx tsc --noEmit`, `npx eslint .`.

## Open issues

1. **Client count.** The live Innovaft pages say "230+" and "250+ trusted clients" and "+100 Brands". Sharukh asked for 600+. Publishing 600+ here contradicts the Innovaft site. Update Innovaft first, or keep the number off the portfolio until it matches.
2. **Innovaft portfolio** work is mostly landing pages and UI/UX (Digital Design, Rumble, Blockframe, NexCash, AI Call, EatSumn, Xinate, BRCA Strong). Describe it as design and front-end work, not full-stack.
3. **Profiles out of date:** Contra says Ambala and "over six years"; GitHub says "Frontend Developer". Update them to match this site.
4. **React Native case studies:** need project name, one-line description, store/demo link and screenshot for each real client app.
5. **Project links:** `projectDetails.ts` has empty demo and GitHub links.
6. **Innovaft site problems** (not in this repo): blog.innovaft.com returns HTTP 500, learn.innovaft.com footer email links to a personal Gmail, FAQ answers are mismatched, testimonials stuck on "loading", conflicting course lengths (6 months vs 2-6 months).
7. **React 19** is blocked by `blobity` (supports React 18 only). Next 16 warns React 18 is deprecated and removes support in Next 17.
8. **Remaining `npm audit` findings (10)** are build-time only (Tailwind 3 toolchain, eslint-config-next). Fix is a Tailwind 4 migration.
9. Open Graph image is 896x1152; a 1200x630 image would give better link previews.
10. Confirm the canonical domain: `www.iamsharukh.com` or `iamsharukh.com`.
11. **React Strict Mode is off** (`reactStrictMode: false` in `next.config.js`). The framer-motion animation components do not start under Strict Mode's dev-only double mounting, so text stays hidden under `next dev`. Next 13.2 had it off; Next 13.5+ turns it on by default. Production is unaffected. A proper fix means making the animation components strict-mode safe.
12. **EmailJS templates:** ready-made HTML and the list of variables are in `docs/emailjs/`. The admin template must use `{{subject}}` as its subject and have the owner's address typed into To Email; the auto-reply uses only `{{to_email}}`.
13. `AGENTS.md` is generated by `next dev` and is not committed.
14. **Location pages** (`/locations/<slug>`: haryana, hisar, hansi, bhiwani, rohtak) use only confirmed facts plus approximate distances (Hansi about 25 km, Bhiwani about 55 km from Hisar). They contain no client names or local claims. Add real local detail (industries, past work, testimonials) in `app/lib/locations.ts` only when confirmed. Other Haryana cities (Gurugram, Faridabad, Panipat, Karnal, Sirsa...) were deliberately not added: generic copies would be thin duplicate content.
15. **Wärmemacher description mismatch:** `app/work-section/projectDetails.ts` says "AC products", but the project screenshot is a German bathroom-mirror site. Confirm what the project is and fix the text. The same file's descriptions (real-time inventory, wallet integration, monetisation tools...) came from the old site and are unverified.
16. **Case studies** (`/work/<slug>`) are `noindex` and left out of the sitemap until `challenge`, `solution` and `outcome` are filled in for that slug in `app/lib/caseStudies.ts`. Live and repo links come from `projectDetails.ts`, or can be set there; currently blank.
17. **Animation and icons.** Effects are in-house components in `app/components/effects/` (SpotlightCard, TiltCard, Magnet, CountUp, RevealWords, Marquee, Aurora, FuzzyText on the 404 page, ShapeWaves behind the learn page hero) inspired by React Bits but written here with no new dependency, because React Bits is copy-paste code from an external registry and should be reviewed line by line before it enters this repo. Icons come from `lucide-react`; mappings are in `app/lib/icons.ts`. Everything respects `prefers-reduced-motion`.
18. **Contact:** `/contact` is the main contact page. Service, location, learn and case-study buttons link to `/contact?service=<slug>` (`learning` starts the student path). The home page still has its own Contact section and modal.
19. **WhatsApp removed** from the whole site (contact page, learn page, enquiry form, copy). The form's contact methods are now Email and Phone call.
20. **Visual language.** Content pages now follow the home page: the grainy `hero.jpg` texture behind the top of each page (`.page-hero`), Mona Sans Narrow uppercase headings (`.site-page h1` and section `h2`), uppercase nav and buttons, monochrome palette (no indigo accent), 1440px container. One heading scale: h1 `clamp(42px, 7vw, 88px)`, long titles use `.h1-compact`. See `app/globals.css`.
21. **More effects:** RotatingWords (services intro), ProcessTrace (contact page, no timings), DotGrid via PageBackdrop (list pages and contact). ShinyText component was removed; its CSS class `.shiny-text` is used by RotatingWords.
22. **Projects** now live in `content/projects/<slug>.md` with images in `public/projects/<slug>/` (see `docs/adding-projects.md`). The old `projectDetails.ts` only holds a type now.
23. **Home page** gained Learn, Latest writing and Explore sections so every page is linked from it; the Services heading uses the same big uppercase style as the other sections. `app/page.tsx` is a server component that reads content at build time and passes plain data to `app/HomeClient.tsx`.
24. **Hosting:** every page is static; the only `ƒ` route is `/api/enquiry` (see 27). `/contact` reads `?service=` in the browser, and the old `[...not_found]` catch-all was removed. See `docs/hosting-vercel.md`.
25. **Expert reviews** (UX, architecture, SEO, growth, engineering) are in `docs/reports/`. They changed: the loading screen, images, mobile menu, share images, structured data, AI crawler rules, `llms.txt`, About, Links and Privacy pages, `/learn/hisar` and `/learn/haryana`, GA4 conversion events, and the Innovaft connection.
26. **Google spam policy.** Rules for adding pages are in `docs/google-spam-policy-notes.md`. No cloned city or state pages; every new place needs a real, distinct fact. Hansi, Bhiwani and Rohtak are the thinnest pages: add one confirmed local detail to each, or set them `noindex`. Delhi, Rajasthan and Punjab pages are not built on purpose.
27. **Contact form sends from the server.** The form posts to `/api/enquiry` (`app/api/enquiry/route.ts`, `app/lib/enquiryMail.ts`). EmailJS keys are private `EMAILJS_*` variables with no `NEXT_PUBLIC_` prefix (see `.env.example`). The route checks the origin, size and fields, limits 5 enquiries per IP per hour and 150 per day per instance, and the auto-reply contains no visitor text. Owner must: allow non-browser API calls in EmailJS Security, set the variables in Vercel, put the inbox address in the admin template's To Email, then delete the old `NEXT_PUBLIC_EMAILJS_*` variables. A CAPTCHA (for example Cloudflare Turnstile) is the next step if spam appears. `@emailjs/browser` is no longer imported and can be removed from `package.json`.
28. **Student page.** `/learn/skills-alongside-college` was added from facts the owner gave: students come to Hisar from Rajasthan, Hansi, Rohtak and nearby villages. It makes no job or income promises. Add a named student story, real travel and accommodation details and fees only when confirmed.
29. **Home page order** (from the five reviews): Hero, Services, Work, Reviews, About, Innovaft band, Learn, Latest writing, Explore, Contact, Footer. Set in `app/HomeClient.tsx`.
30. **Link previews and sharing.** `pageMeta()` in `app/lib/seo.ts` gives every page its own title, description, canonical and share image; `ShareButtons` is on blog, service, learn and case study pages; `docs/reports/audit-scripts/ogaudit.mjs` checks all sitemap URLs.
31. **Moving to a new GitHub repo or Vercel project:** add the new repo as a second remote, push `dev` and `main`, then change the repo in Vercel Settings, Git (keeps domain and variables). Production branch `main`. Environment variables must exist in the project (`.env.example`).
32. **More notes:** `docs/security-and-abuse-notes.md` (public and private variables, what the keys allow, what we did, owner checklist) and the plain-language Q&A at the end of `docs/google-spam-policy-notes.md`.
33. **About page journey.** `app/components/Journey.tsx` shows stats and a timeline from `app/lib/journey.ts`. It holds only confirmed facts. Still needed from the owner for the full story: college (what, where, when), the student years (first projects and first client), and why Hisar and why a company. Add each as one entry in `journey.ts`.
34. **Lottie.** Three example animations in `docs/lottie-examples/` and `public/lottie/`, played by `LottiePlayer` (new dependency `lottie-web` 5.12.2, light build). Used on the form success message, Learn hero and the AI Automation service page. The AI Automation course topics (n8n workflows, connecting apps, AI tools and agents) in `app/lib/courses.ts` still need confirming with Innovaft.
35. **International clients page** `/international`: how a project runs, a time-zone table (calculated offsets only), services, FAQ. It makes no claims about availability hours, payment methods or NDAs; add them only when confirmed. Linked from the footer, Locations, Links, sitemap and llms.txt. Not one page per country (doorway risk).
36. **Security scan (2026-10-14).** Production dependencies: 0 known vulnerabilities (`npm audit --omit=dev`). The 10 remaining findings are build-time only (tailwindcss 3 toolchain, eslint-config-next); the fix is a Tailwind 4 and ESLint config upgrade. Security headers are set in `next.config.js`. See `docs/security-and-abuse-notes.md`.
37. **Last services card.** `ServiceCtaCard` (Something else in mind?) fills the grid on Home and `/services`, looks hovered by default and links to the contact form. No new service was invented.
