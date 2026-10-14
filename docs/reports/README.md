# Expert review reports

Five reviews of iamsharukh.com, written 14 October 2026, each from a different senior viewpoint. Every finding is based on something measured on the built site (a headless Chromium browser, a structured-data check and an accessibility scan), or on sources linked in report 03. Numbers are **lab measurements on a local build**, not real visitor data. Real data comes from Google Search Console and Google Analytics once the site is live.

| # | Role | Report |
| --- | --- | --- |
| 1 | UI/UX designer | [01-ux-design-review.md](01-ux-design-review.md) |
| 2 | Solutions architect (cost and performance) | [02-architecture-review.md](02-architecture-review.md) |
| 3 | SEO expert and keyword researcher | [03-seo-keyword-review.md](03-seo-keyword-review.md) |
| 4 | Growth marketer (leads and conversion) | [04-growth-lead-generation.md](04-growth-lead-generation.md) |
| 5 | Senior software engineer (implementation) | [05-engineering-implementation.md](05-engineering-implementation.md) |

## Before and after (measured)

| Measure | Before | After |
| --- | --- | --- |
| Home page layout shift (CLS, good is under 0.1) | 0.51 mobile, 0.32 desktop | **0.00** both |
| Weight of the five largest images | 4,984 KB | **324 KB** (94% smaller) |
| Pages with a share image (link previews, AI tools) | 7 of 12 audited | **17 of 17** |
| Structured data problems | Blog post had no image; no company entity | none found; added Organization, ProfilePage, ItemList, CourseInstance |
| Pages that run server code per request | 2 | **0** |
| Accessibility issues (axe) | Contact page: 2 serious (progress bar name, contrast). Home: 3 moderate | **0 on every content page.** Home: 2 minor (a heading level in the hero links, the third-party cursor canvas) |
| Pages reachable from the phone menu | 3 of 7 sections | **7 of 7** |
| Conversion events measured | 0 | 6 (see report 04) |
| URLs in the sitemap | built before the new pages | **30, all return 200** (6 new pages added: About, Links, Privacy, 2 learn pages, AI automation service) |
| AI search files | none | robots rules for AI crawlers, `llms.txt`, `llms-full.txt` |

## What only you can do (highest value first)

1. **Set the environment variables in Vercel** (`NEXT_PUBLIC_EMAILJS_*`) or the contact form will fail in production. See `docs/hosting-vercel.md`.
2. **Claim and complete Google Business Profile** for the Hisar office and add the website. This matters most for Hisar searches.
3. **Verify the site in Google Search Console** and submit the sitemap. Set `GOOGLE_SITE_VERIFICATION` in Vercel.
4. **Put the website address on every profile** (GitHub, LinkedIn, Contra, Instagram, X, Fiverr, Upwork, Innovaft). Checklist in `docs/backlinks-and-local-seo.md`.
5. **Fill in the three sections for each project** (`content/projects/*.md`) so case studies appear in Google.
6. **Confirm Innovaft's fees, batch timings and course lengths**, then add them to `app/lib/learnPages.ts`. Local searchers look for fees first, and the pages currently say "ask".
7. **Mark `generate_lead` as a Key event in Google Analytics** so you can see which pages bring enquiries.
8. **Check the Vercel Hobby plan's terms.** It is described as for non-commercial use, and a site that advertises paid services may not qualify. Details in report 02.
9. Fix the issues on the Innovaft sites (blog returns an error, email link, FAQ answers, client-count numbers) because this site now links to them.
10. Replace the drawn illustrations with real photos and screenshots when you have them (`docs/image-prompts.md`).
