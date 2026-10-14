# Report 5: Engineering implementation

Reviewer view: a senior software engineer with 10 years of experience implementing the findings of reports 1 to 4, and proving each change works.

## What was built

| Area | Change | Files |
| --- | --- | --- |
| Performance | Loading screen collapses with a transform, not height (CLS 0.51 to 0) | `app/animations/PreLoader/loader.js` |
| Performance | Images compressed and converted to WebP (4,984 KB to 324 KB); originals kept in `content/originals/` | `public/projects/*/cover.webp`, `public/hero.webp` |
| Performance | Fonts `swap`, unused preconnects removed, analytics loaded late, `sizes` on images | `app/layout.tsx`, `app/GoogleAnalytics.tsx`, `ProjectCard.tsx`, `Hero.tsx` |
| Hosting cost | No route runs on request: `/contact` static, catch-all removed, share images pre-generated | `app/contact-section/ContactForm.tsx`, `app/**/opengraph-image.tsx` |
| Navigation | Mobile menu with every page; sticky quick-contact button on phones | `MobileMenu.tsx`, `MobileCta.tsx`, `app/lib/nav.ts` |
| Measurement | GA4 events for forms, contact, booking, outbound links | `app/lib/analytics.ts`, `AnalyticsEvents.tsx`, `EnquiryForm.tsx` |
| SEO | `robots.txt` with AI crawler policy, clean sitemap, `llms.txt`, `llms-full.txt` | `app/robots.ts`, `app/sitemap.ts`, `app/lib/llms.ts`, `app/llms*.txt/route.ts` |
| SEO | Share images per page type | `app/lib/og.tsx`, `app/**/opengraph-image.tsx` |
| SEO | Structured data: Organization, ProfilePage, ItemList, CourseInstance, richer BlogPosting | `app/lib/jsonLd.tsx` and pages |
| Trust | About, Links, Privacy pages; author box; Innovaft connection | `app/about`, `app/links`, `app/privacy`, `AuthorBox.tsx`, `InnovaftBand.tsx` |
| Local and learning | `/learn/hisar`, `/learn/haryana`; keyword-driven service FAQs; AI automation service | `app/lib/learnPages.ts`, `app/lib/services.ts` |
| Accessibility | Paragraph component no longer hidden from screen readers; real heading levels; contrast; labelled progress bar; footer overflow | `app/animations/*`, `Footer.tsx`, `ProcessTrace.tsx` |
| Security and privacy | Email address not in page HTML; privacy policy; Blobity removed on leaving the home page | `RevealEmail.tsx`, `app/privacy` |
| Forms | Next button no longer submits early; own city suggestion list | `EnquiryForm.tsx`, `PlaceInput.tsx` |
| Content | Projects from Markdown files with image folders | `app/lib/projects.ts`, `docs/adding-projects.md` |

## How it was verified

All results are from a production build served locally and tested with headless Chromium. Scripts are in `docs/reports/audit-scripts/`.

| Check | Result |
| --- | --- |
| Type check and lint | pass |
| Malware guard (`dev-guard`) | clean |
| Build | succeeds; **0 routes run on request**; about 15 seconds |
| SEO audit, 17 pages | no findings: every page has a share image, structured data has all required fields, canonical and one `h1` present |
| Sitemap | 30 URLs, all return 200 |
| Share image | returns a 1200 by 630 PNG |
| Layout shift, home page | 0.000 on phone and desktop |
| Accessibility | 0 issues on content pages; 2 minor on the home page |
| Contact form, client path | 2 emails built, subject `[Service] Lead - Country` |
| Contact form, student path | subject `[Learning: Course] Student enquiry - City` |
| Contact form, no premature errors | none on arriving at any step |
| Mobile menu | opens, lists 7 pages, closes with Escape, navigates |
| Sticky button | visible on content pages, hidden on `/contact` |

## Known limits

- Lab measurements only; LCP and CLS on real phones and networks will differ. Check Search Console's Core Web Vitals report after launch.
- The form needs the `NEXT_PUBLIC_EMAILJS_*` variables at build time. Without them it shows the friendly error message.
- `reactStrictMode` is off because the home animations break under it. React 18 is deprecated in Next 16 and blocked by the cursor package.
- 10 `npm audit` findings remain in build tooling (Tailwind 3 and the ESLint config).
- `llms.txt` is a proposal that no major AI company has confirmed reading.
- The learn pages say fees and timings are available on request because Innovaft's own pages disagree.
- I could not reach vercel.com, Google Search Console or Keyword Planner from the build environment.

## Before each deploy

```
npx tsc --noEmit && npx eslint .
node scripts/dev-guard.mjs .
npm run build       # look for any "ƒ" in the route list: there should be none
```

## Rollback

Every change is its own commit on `dev`. To undo one, `git revert <commit>`. The originals of compressed images are in `content/originals/`.
