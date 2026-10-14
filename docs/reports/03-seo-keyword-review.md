# Report 3: SEO and keyword review

Reviewer view: an SEO specialist and keyword researcher with 10 years of experience. Order of work, as requested: **research, audit, plan, implement.**

## 1. Research

### What Google rewards now (secondary sources; check Google Search Central for exact wording)

- **People-first content.** Pages should show original information or analysis, add value beyond other sources, show first-hand experience, and say who wrote them and why. Google's "Who, How, Why" questions are guidance, not a requirement. There is no preferred word count. ([Hobo SEO on the 2026 guidance](https://www.hobo-web.co.uk/the-google-helpful-content-update-and-its-relevance-in-2026/), [Search Engine Land](https://searchengineland.com/google-reiterates-guidance-on-ai-generated-content-write-content-for-people-392840))
- **Spam policies.** Doorway pages (many near-identical pages aimed at different cities) and scaled content abuse are penalised. Google is fine with many similar-looking pages **when each describes something real**. A June 2026 spam update was reported. ([ppc.land on doorway pages](https://ppc.land/doorway-pages/), [ppc.land on scaled content](https://ppc.land/scaled-content-abuse/))
- **Structured data.** FAQ rich results were withdrawn (restricted in 2023, reported gone in May 2026) and HowTo was removed earlier, though the markup stays valid. Article, Organization, LocalBusiness, BreadcrumbList, Product and Review still earn rich results. ([jsonld.com](https://jsonld.com/google-faq-rich-results-deprecated/), [SEOcrawl](https://seocrawl.ai/blog/faq-structured-data-google-2026))
- **Core Web Vitals.** Thresholds unchanged: LCP 2.5 s, INP 200 ms, CLS 0.1, judged at the 75th percentile of real visitors. A modest ranking factor, more like a tiebreaker. ([Core Web Vitals 2026 guide](https://rgb.ir/en/blog/core-web-vitals-thresholds-2026/))
- **AI search.** `robots.txt` is what AI crawlers respect (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended). Blocking training crawlers does not stop AI-search citation. **`llms.txt` is only a proposal; no major AI company is confirmed to read it**, so it is a cheap extra, not a ranking lever. ([hyperleap.ai](https://hyperleap.ai/blog/top-llm-crawlers-and-what-they-do-2026), [pagecrawl.io](https://pagecrawl.io/blog/llms-txt-robots-txt-ai-crawler-monitoring.md))

### What people search for (no volume data available)

I could not reach Google Keyword Planner, Search Console or paid tools, so **there are no search volumes here**. What I could see is how the market phrases things:

| Cluster | Phrases seen in results and listings | Target page |
| --- | --- | --- |
| Learning, Hisar | web development course in Hisar, coding classes Hisar, full stack course Hisar, UI/UX course Hisar, WordPress course Hisar, fees, duration | `/learn/hisar` |
| Learning, Haryana | web development course in Haryana, from Hansi / Bhiwani / Rohtak | `/learn/haryana` |
| Local services | web development company in Hisar, website design Hisar, web designer near me | `/locations/hisar`, `/services` |
| Haryana towns | web developer in Hansi / Bhiwani / Rohtak | `/locations/*` |
| Freelance marketplace titles | "Figma to Next.js / Tailwind / React", "pixel-perfect", "SEO-friendly", "Lighthouse score", "Figma to React", "PSD to HTML" | `/services/figma-to-nextjs` |
| AI automation | n8n automation, AI workflow automation, AI agents, API integration, maintenance of existing flows | `/services/ai-automation-n8n` |

([Upwork and Fiverr listings](https://block.fiverr.com/hire/nextjs), [Malt Tech Trends 2026](https://www.malt.uk/resources/trends/malt-tech-trends) on n8n demand)

### Local competition (from IndiaMART listings, self-published and possibly outdated)

Hisar has several small web design firms (Code Era Tech, Sunil Anand Web Design, Dexter Crew, ITech Web Solutions, Techquint) and a coding institute (Coding Block). Listings show **prices on the page**: a basic static site around ₹4,000, a website pack around ₹10,000, a full-stack course around ₹22,000. **Takeaway:** compete on modern work (Next.js, React Native, AI automation), proof and clarity, not on being cheapest. Searchers expect to see price and duration.

### Decision about city and state pages

You asked for learning pages per city and per state (Haryana, Rajasthan, Delhi, Punjab). Innovaft's classes are **in person in Hisar only**, so a page for "learn web development in Delhi" cannot honestly offer anything different from the Hisar page. Near-identical pages are exactly what Google's spam policies target. **So I built two pages that each have a real job** (`/learn/hisar`, `/learn/haryana`) and answered the Delhi, Rajasthan and Punjab question inside the Hisar page's FAQ. Add more pages only when there is something real to say (for example an online batch, or a partner centre in that city).

## 2. Audit (before)

| Check | Result before | Result now |
| --- | --- | --- |
| Titles, descriptions, canonicals, one `h1` | pass | pass |
| Share image on every page | 7 of 12 | 17 of 17 |
| `robots.txt` | minimal | explicit AI-crawler policy, sitemap, host |
| `llms.txt` | missing | present (plus `llms-full.txt`) |
| Sitemap | no dates, noisy fields | real dates only, noindex pages excluded, 30 URLs all 200 |
| Structured data | BlogPosting without image; no company entity | complete; Organization, ProfilePage, ItemList, CourseInstance added |
| Author / "who" signals | none on posts, no About page | About page, author box on every post |
| Home `h1` | name only, invisible to checkers | descriptive text for crawlers and screen readers |
| Home layout shift | CLS 0.51 | 0.00 |
| Image alt text | reviewer photos "title" | real descriptions |
| Local SEO | LocalBusiness on Hisar page | plus Organization entity with the same address |

## 3. Plan and 4. Implementation

| Item | Status |
| --- | --- |
| Allow all crawlers incl. AI search, documented in `app/robots.ts` | Done |
| Sitemap with real dates; `app/sitemap.ts` | Done |
| `llms.txt` and `llms-full.txt` generated from site content | Done |
| Share images generated per page type, pre-built | Done |
| Structured data upgrades | Done |
| About, Links hub, Privacy pages | Done |
| `/learn/hisar` and `/learn/haryana` | Done |
| Keyword-driven FAQs on five services | Done |
| Author box on posts | Done |
| Innovaft connection (company entity, band on home, About, learn pages) | Done |
| Search Console verification via `GOOGLE_SITE_VERIFICATION` | Ready; needs your token |
| Google Business Profile, directories, backlinks | **Yours**: `docs/backlinks-and-local-seo.md` |
| Fees and batch timings on learn pages | **Needs your confirmation** |
| Keyword volumes, rankings | **Needs Search Console data** (4 to 8 weeks after launch) |

## Content plan (next 90 days)

Write posts that answer real questions and link to a service page. Candidates, by cluster:
1. "How much does a website cost in India" (local pricing context, your approach, no fake prices).
2. "Figma to Next.js vs Figma to React" (service page support).
3. "n8n vs Zapier vs Make for small businesses" (AI automation).
4. "Which web development course should you choose" (learning cluster, links to `/learn/hisar`).
5. "How to check a Lovable or Bolt app before launch" (already published).
Publish one post every two weeks and share each on LinkedIn.

## How to measure

1. Add the site to **Google Search Console**, submit the sitemap, and watch Queries and Pages weekly.
2. In Google Analytics mark **`generate_lead`** as a Key event.
3. Re-run the audit after any large change (the scripts are described in report 05).

## Update, 2026-10-14

- A new page, `/learn/skills-alongside-college`, targets students who want practical skills next to a degree, including those from Rajasthan, Hansi, Rohtak and nearby villages. It uses only owner-confirmed facts.
- The spam policy was checked against Google's live page; the rules for new place pages, the page status and the consequences of a penalty are in `docs/google-spam-policy-notes.md`. Do not add near-identical city or state pages.
- Every page now has its own link preview (`pageMeta`); `audit-scripts/ogaudit.mjs` checks all sitemap URLs.
