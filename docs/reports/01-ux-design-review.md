# Report 1: UI/UX design review

Reviewer view: a UI/UX designer with 10 years of experience reviewing the site for clarity, usability, accessibility and trust. Method: screenshots of every page at phone (390 px) and desktop (1440 px) widths, scripted click-throughs of the main journeys, and an automated accessibility scan (axe-core, WCAG 2 A and AA plus best practices).

## What works

- A strong, consistent visual identity: dark monochrome, large Mona Sans headings, generous space. The new pages now match the home page.
- The enquiry form is short in each step, validates inline and shows progress.
- Content pages scan well: icon, headline, one clear action.

## Findings

| # | Finding | Severity | Evidence | Status |
| --- | --- | --- | --- | --- |
| 1 | **Phones could not reach Work, Learn, Locations, Blog or About** from any content page; the header hid them below tablet width | High | header code hid 4 of its 6 links below tablet width | Fixed: full-screen mobile menu, keyboard and Escape support |
| 2 | **Loading screen shifted the layout** (CLS 0.51) and made the first seconds feel jumpy | High | layout-shift trace: 53 shifts from the loading overlay | Fixed (animate with a transform) |
| 3 | **"Next" turned into a submit button mid-click** and showed errors on fields that were already filled | High | reproduced in a browser; user screenshot | Fixed (distinct button keys) |
| 4 | The browser's built-in city suggestion list opened far below the field | Medium | user screenshot | Fixed (own suggestion list under the field) |
| 5 | The cursor effect from the home page kept running on other pages and drew outlines around links and buttons | Medium | user screenshot; the library never removed itself | Fixed (destroyed on leaving the home page) |
| 6 | Screen readers skipped every paragraph of animated text and announced some as headings | High | `aria-hidden` plus `role="heading"` on the paragraph component | Fixed |
| 7 | Home footer links were unreadable (contrast 1.33) because a fixed-height footer overflowed onto a white background | High | axe contrast check | Fixed |
| 8 | Reviewer photos had the alt text "title" | Medium | markup | Fixed (name, role, company) |
| 9 | Dimmed steps in the contact trace failed contrast | Medium | axe | Fixed |
| 10 | No always-visible way to enquire on phones | Medium | review | Fixed: sticky "Get a free quote" button (hidden on the contact page) |
| 11 | The rotating word on the services intro left a gap | Low | screenshot | Fixed |
| 12 | Project cards show no results, only a description | Medium | content | Backlog (needs your results) |
| 13 | Heavy uppercase narrow headings are hard to read when very long | Low | long blog titles | Mitigated with a compact heading size |

## Recommendations still open

1. **Test with five real people** on their own phones (a friend, a student, a client). Ask them to find your price range, book a call and find a course. Watch where they hesitate. This finds problems no scan can.
2. **Real photos and screenshots** instead of drawn illustrations on service pages. Prompts are in `docs/image-prompts.md`.
3. **Case study results.** A project page with a number or a quote converts better than a description.
4. **Add testimonials with names and photos on service pages**, with the client's permission. The home page already has them.
5. **Show a starting price or a "typical project" range** if you are comfortable. Visitors who cannot find a price often leave. Local listings show prices (see report 03), so a vague "contact for quote" can look evasive.
6. On the contact form, consider offering a **phone-number-free path** (email only) to reduce drop-off. Right now the phone number is required.

## Accessibility scan result

After the fixes: **0 issues on every content page.** The home page has 2 minor ones: a heading level in the hero social links and the third-party cursor canvas outside a landmark.
