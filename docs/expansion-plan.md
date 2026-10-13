# Portfolio expansion plan

Goal: bring in international and Haryana clients from Fiverr, Upwork, LinkedIn, Contra and local leads, and promote mentoring and Innovaft courses.

Branch: `dev` (push to `dev`, open a PR into `main`, never push to `main` directly).
Last updated: 2026-10-13. Design assets needed from the designer are listed in `docs/design-requests.md`.

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

1. You: name, email, phone/WhatsApp, country/city.
2. Need: service(s) or course/mentoring enquiry.
3. Details depending on the choice (Figma/app link, features, new vs fix, platform for mobile, level and goal for students).
4. Timing, how they found you, preferred contact method, review and submit.

Email subject: `[Service] Lead - Country`. Auto-reply to the client. Spam protection: honeypot, time check, EmailJS domain restrictions, CAPTCHA if needed. New EmailJS template variables must be added by the site owner. No new dependencies.

## Order of work

| # | Step | Status |
| --- | --- | --- |
| 1 | Upgrade Next.js to 16.4.0, update and clean dependencies | Done, pushed |
| 2 | SEO foundation (metadataBase, canonical, sitemap, robots, JSON-LD) | Done, committed locally |
| 3 | Services data file and pages | Done, committed locally |
| 4 | Multi-step contact form | Done, committed locally |
| 5 | Case studies (`/work/[slug]`) | Done for the 4 existing projects, committed locally. Pages stay `noindex` until challenge, solution and outcome are added in `app/lib/caseStudies.ts` |
| 6 | Location pages | Done, committed locally |
| 7 | Learn / mentoring page | Done, committed locally |
| 8 | Blog (markdown) | Done, committed locally |
| 9 | Home page updates (services section, nav, footer) | Partly done: nav link, services section, footer links. Hero and About copy still to update |

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
12. **EmailJS template:** the admin template should print `{{message}}` (already does) and may use the new optional variables `subject`, `country`, `timeline`, `source`, `contact_method`.
13. `AGENTS.md` is generated by `next dev` and is not committed.
14. **Location pages** (`/locations/<slug>`: haryana, hisar, hansi, bhiwani, rohtak) use only confirmed facts plus approximate distances (Hansi about 25 km, Bhiwani about 55 km from Hisar). They contain no client names or local claims. Add real local detail (industries, past work, testimonials) in `app/lib/locations.ts` only when confirmed. Other Haryana cities (Gurugram, Faridabad, Panipat, Karnal, Sirsa...) were deliberately not added: generic copies would be thin duplicate content.
15. **Wärmemacher description mismatch:** `app/work-section/projectDetails.ts` says "AC products", but the project screenshot is a German bathroom-mirror site. Confirm what the project is and fix the text. The same file's descriptions (real-time inventory, wallet integration, monetisation tools...) came from the old site and are unverified.
16. **Case studies** (`/work/<slug>`) are `noindex` and left out of the sitemap until `challenge`, `solution` and `outcome` are filled in for that slug in `app/lib/caseStudies.ts`. Live and repo links come from `projectDetails.ts`, or can be set there; currently blank.
17. **Animation and icons.** Effects are in-house components in `app/components/effects/` (SpotlightCard, TiltCard, Magnet, CountUp, RevealWords, Marquee, Aurora) inspired by React Bits but written here with no new dependency, because React Bits is copy-paste code from an external registry and should be reviewed line by line before it enters this repo. Icons come from `lucide-react`; mappings are in `app/lib/icons.ts`. Everything respects `prefers-reduced-motion`.
18. **Contact:** `/contact` is the main contact page. Service, location, learn and case-study buttons link to `/contact?service=<slug>` (`learning` starts the student path). The home page still has its own Contact section and modal.
