# Report 4: Growth and lead-generation review

Reviewer view: a marketer and business-growth lead with 10 years of experience in lead generation for freelancers and small agencies. Goal: more enquiries and a higher share of visitors who enquire.

## Who the site should win

| Segment | What they want | Where they come from | Best entry page |
| --- | --- | --- | --- |
| International founders and agencies | A reliable Next.js / React / React Native developer, Figma to code, fast delivery | Fiverr, Upwork, Contra, LinkedIn, Google | `/services/figma-to-nextjs`, `/services/react-native-app-development` |
| Businesses wanting AI automation | Fewer manual tasks, AI replies, connected tools | LinkedIn, Google, referrals | `/services/ai-automation-n8n` |
| Haryana businesses | A local web developer they can meet | Google Maps, local search, word of mouth | `/locations/hisar` and nearby towns |
| Non-technical founders with an AI-built prototype | Make it safe to launch | Google, communities | `/services/ai-built-app-cleanup`, the blog post |
| Students and career changers | A course with real projects and a path to work | Instagram, Google, word of mouth | `/learn/hisar`, `/learn` |

Market context from listings: Hisar competitors advertise on price (static sites near ₹4,000 to ₹10,000, a full-stack course near ₹22,000) and sell mostly basic sites. Marketplace demand and rates for AI automation are strong but come from marketplace blogs (see report 3). **Positioning to use:** modern stack, mobile apps and AI automation, with proof. Do not compete as the cheapest.

## The funnel and where it leaked

| Stage | Before | Fix | Status |
| --- | --- | --- | --- |
| Find | Few indexable pages; no AI-search files; 5 of 12 pages had no share image | SEO programme (report 3) | Done |
| Land | Services only reachable by URL from the home page earlier; no About page for trust | Home sections linking to everything, About page, links hub | Done |
| Trust | Testimonials only on home; project pages had no results; Innovaft not connected | Innovaft entity and band, author box, About; results still needed | Partly done |
| Act | Form asked for phone first; four steps; no sticky button on phones | Client or student split, easier order, sticky "Get a free quote" button | Done |
| Measure | No conversion tracking | 6 GA4 events (below) | Done |
| Follow up | Auto-reply only | See "Follow-up" below | Backlog |

## Conversion tracking now in place (Google Analytics 4)

| Event | When it fires |
| --- | --- |
| `form_start` | The enquiry form opens |
| `form_step` | A visitor reaches step 2, 3 or 4 (shows where people drop off) |
| `generate_lead` | An enquiry is sent successfully. **Mark this as a Key event in Analytics.** |
| `form_error` | Sending failed |
| `contact_cta_click` | Any button or link to the contact page, with the page it was on |
| `book_call_click` | The Cal.com booking link |
| `outbound_click` | A click to GitHub, LinkedIn, Contra, Instagram, X or Innovaft |

No personal data is sent in any event. The privacy page says so.

## Offers to test (decisions for you)

1. **A productised starter for each service** with a clear scope and "from" price, for example "Figma to Next.js landing page" and "AI automation starter (one workflow)". Visitors choose faster when the offer is concrete. Prices are your decision; local listings suggest the range buyers have seen.
2. **A free resource** in exchange for an email, such as the Figma handoff checklist or the AI-built-app launch checklist as a PDF. This needs a place to store emails (not built, to avoid collecting data without a plan).
3. **A free first class** for learners (already offered) as the main learning call to action.
4. **A fixed-price "AI-built app review"**: a short paid audit that turns into a bigger project.

## Channels

| Channel | Action | Effort |
| --- | --- | --- |
| Google Business Profile (Hisar) | Claim, complete, add photos, ask for reviews | 1 hour, then ongoing |
| Fiverr, Upwork, Contra | Use the service titles and phrases in report 3; link your site; reuse case studies | 2 hours |
| LinkedIn | Share each blog post and one case study a week; use the About text from `/about` | 1 hour a week |
| Local partners | Colleges, coaching centres and business groups link to `/learn/hisar` and `/locations/hisar` | Ongoing |
| Innovaft | Link both ways between innovaft.com and this site; mention the portfolio on Innovaft's client pages | 1 hour |
| Instagram | Put `/links` in the bio; post project clips and student work | Ongoing |

## Follow-up (backlog)

- Reply to every enquiry the same working day and say so on the contact page only once you can keep the promise.
- Send a short "what happens next" email in the auto-reply (the template is in EmailJS).
- Keep a simple sheet of enquiries with source, service, status and outcome. After a month the `Found me via` answers show which channel pays.

## KPIs (review monthly)

| KPI | Source | Starting point |
| --- | --- | --- |
| Enquiries per month (`generate_lead`) | Analytics | 0 measured so far |
| Form completion rate (`generate_lead` / `form_start`) | Analytics | unknown |
| Share of enquiries by `Found me via` | Email | unknown |
| Search impressions and clicks for Hisar and learning phrases | Search Console | not set up |
| Booked calls (`book_call_click`) | Analytics, Cal.com | unknown |

## 90-day plan

- **Weeks 1 to 2:** set Vercel variables and deploy; Search Console; Google Business Profile; put the site on every profile; mark `generate_lead` as a Key event.
- **Weeks 3 to 6:** fill in case study text for all four projects; add fees and timings to learn pages; publish two posts; ask three past clients and two students for reviews.
- **Weeks 7 to 12:** read Search Console and Analytics; double down on the pages and channels that produce enquiries; add one new page only where there is real demand (for example an online batch, or a service with many impressions).

## Update, 2026-10-14

- Home page order now follows land, trust, act: Hero, Services, Work, Reviews, About, Innovaft band, Learn, Latest writing, Explore, Contact.
- New student page `/learn/skills-alongside-college` for the second audience. Add a named student story and travel details when confirmed.
- Enquiry emails: the admin email now shows every field (type, timeline, preferred contact, source) and uses the form's own subject. Templates are in `docs/emailjs/`.
- Share buttons are on blog, service, learn and case study pages.
