# Analytics (Google Analytics 4)

Measurement ID `G-61QN0HQ38D`, loaded on every page from `app/GoogleAnalytics.tsx`. Page views come from GA4 itself. Our own events are in `app/components/AnalyticsEvents.tsx` and `app/lib/analytics.ts`. No personal data is sent: only the page, the link target and a page group.

## Events we send

| Event | When | Parameters |
| --- | --- | --- |
| `page_context` | Once per page | `page`, `content_group` |
| `scroll_depth` | At 25, 50, 75 and 100 percent, once each per page | `page`, `percent`, `content_group` |
| `service_click` | A link to a service page | `service` (slug), `page`, `content_group` |
| `learn_click` | A link to a learn page | `to`, `page`, `content_group` |
| `internal_click` | Any other link inside the site | `from`, `to`, `area` (header, footer or page) |
| `contact_cta_click` | A button to the contact page | `to` (includes the service), `page`, `content_group` |
| `book_call_click` | A Cal.com booking link | `page`, `content_group` |
| `outbound_click` | A profile or Innovaft link | `domain`, `page` |
| `reveal_email` | The "show email" button | `page` |
| `share` | A share button | `method`, `page` |
| `form_start`, `form_step`, `form_error` | Contact form | `page`, `step`, `audience` |
| `generate_lead` | An enquiry was sent | `audience`, `service` |

`content_group` is GA4's built-in page grouping: Home, Services list, Service, Work list, Case study, Learn, Learn page, Locations list, Location, Blog, Blog post, Contact, About, International, Links, Privacy. It is set per page in `app/lib/analytics.ts`.

Events sent before Analytics has finished loading are queued and sent in order. If it never loads (for example an ad blocker), they are dropped after about 20 seconds.

## Set up in GA4 (owner, one time)

1. **Key events** (Admin, Events, mark as key event): `generate_lead` (an enquiry), `book_call_click`, `contact_cta_click`.
2. **Custom dimensions** (Admin, Custom definitions, Create, scope: Event). Without these the extra parameters do not show up in reports: `service`, `page`, `to`, `from`, `area`, `percent`, `domain`, `method`, `audience`. Data only appears from the day each dimension is created.
3. **Search Console link** (Admin, Product links) to see which Google searches lead to which pages.

## Where to look

- Which pages people open: Reports, Engagement, Pages and screens (add the "Content group" dimension to group them).
- Where visitors come from: Reports, Acquisition, Traffic acquisition (Google, LinkedIn, Fiverr, Upwork, direct).
- Which services get interest: Reports, Engagement, Events, `service_click` (needs the `service` dimension).
- Where people leave the form: events `form_start`, `form_step`, `form_error`, `generate_lead`.
- How far people read: `scroll_depth` by content group.
- Which pages lead to enquiries: Explore, funnel from `page_context` to `contact_cta_click` to `generate_lead`.

## Limits

- Visitors with ad blockers are not counted, so numbers run a little low.
- There is no cookie consent banner. Visitors in the EU or UK may need one for GA4 cookies; add a consent banner before targeting those markets.
- GA4 does not show the search words people used. Use Search Console for that.
