# Google spam policy: rules for this site

Read this before adding any new page, especially city, state or service pages.
These notes are a summary in our own words. The official text is the source of truth and changes over time, so re-read it before large content pushes.

## Official sources

- Spam policies for Google web search: https://developers.google.com/search/docs/essentials/spam-policies
- March 2024 core update and new spam policies: https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- Google's guidance on AI-generated content: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Doorway pages update (2015): https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages
- Creating helpful, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

(These could not be fetched from the build sandbox, so this summary comes from search results. Check the live pages.)

## The two policies that matter most for us

**Doorway abuse.** Many pages made to rank for similar searches that all lead the visitor to the same place, with little value of their own. A typical example is one page per city with the same text and only the city name swapped.

**Scaled content abuse.** Producing many pages mainly to rank, regardless of how they are made (AI, templates, scraping, humans at scale), without adding value for readers.

Other policies worth remembering: no keyword stuffing, no hidden text, no fake reviews or invented results, no misleading claims, no buying or selling links that pass ranking credit (use `rel="sponsored"` or skip it), no cloaking.

## Rules we follow

1. A page exists only if a visitor would be helped by it. Test: "If search did not exist, would I still link this page from somewhere?"
2. Every location or service page needs facts that are true for that page only (a real office, a real batch, a real project, real distance, a real offer). If it can be produced by swapping the place name, do not publish it.
3. No invented clients, results, reviews, ratings, prices or addresses. Unknown facts say "ask" (see Innovaft fees and timings).
4. No mass generation. New pages are written and checked one at a time. AI can help draft, but a person with real knowledge reviews and adds experience.
5. Pages that are not ready stay `noindex` and out of the sitemap (case studies work this way already).
6. Same business details everywhere (address, hours, phone) as Google Business Profile.
7. Structured data must match what is visible on the page.
8. Backlinks come from real profiles, directories and content, never from paid link schemes or link swaps at scale.

## What this means for the open asks

- **Hisar and Haryana** pages exist and carry real local facts (office, hours, courses in person).
- **Hansi, Bhiwani, Rohtak** are kept short and honest. Do not clone them for more towns.
- **Delhi, Rajasthan, Punjab** learn or service pages: only add one if there is a real reason for that audience, for example an online batch, a partner centre, or a project done there. Until then, one page about online learning that mentions these regions in a sentence is safer than three near-identical pages.
- Before adding any city or state page, write down the one thing that makes it different. If you cannot, do not add it.

## Questions that came up, in plain words

**Can we reword each city page so they look different?** No. Rewording the same idea is what the policy calls out: the page lists "automated transformations like synonymizing" under scaled content abuse. Google judges whether a page helps a visitor, not whether the words differ. Five pages with one idea are still one page.

**Checked 2026-10-14 against the live policy page.** Doorway abuse includes "multiple domain names or pages targeted at specific regions or cities that funnel users to one page" and "substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy". Scaled content abuse includes using generative AI "to generate many pages without adding value for users", and it applies "no matter how it's created".

**What happens if Google decides pages are spam.** Either an automatic demotion (traffic quietly drops) or a manual action (a message in Search Console). Thin pages can be dropped from results, and the effect can spread to the whole site, including the good pages. Recovery means fixing or removing the pages, and for a manual action sending a reconsideration request and waiting weeks. Set up Search Console, because that is where a warning would appear.

**The honest way to reach more places.**
- One strong page per real place; Haryana covers the rest.
- Each local page needs facts that are true only for that place: a real client or project (with permission), a real meeting point or travel route, questions people there actually ask.
- Shared pages that help everyone (price guide, how to choose a developer, case studies) beat several thin city pages.
- If a place has nothing real yet, point it to the Haryana page or keep it `noindex`.
- Reach people without more pages: Google Business Profile, real reviews, local directories, LinkedIn and Instagram posts that name the cities, blog posts with real stories.

**Why the student page exists.** The owner confirmed that students come to Hisar from Rajasthan, Hansi, Rohtak and nearby villages, and want practical skills next to a degree. That is a real audience with real questions, so `/learn/skills-alongside-college` was written for them. It makes no job or income promises. Still needed from the owner: which places students come from, how to get to and stay in Hisar, whether any classes are online, and one student willing to be named.

**Page status (2026-10-14).** Fine: services, blog, About, Links, Privacy, Learn, Hisar, Haryana, share previews, schema, sitemap, robots and llms.txt. Thinnest: Hansi, Bhiwani and Rohtak (same template, only the distance is local). Add one confirmed local detail to each or set `noindex`. Not built, on purpose: Delhi, Rajasthan and Punjab pages.
