# Design requests (for the designer)

Everything here is currently a **placeholder**: the pages work without these assets, and nothing broken or empty shows on the site. When a file is ready, put it in the path shown and tell the developer (or fill in the `image` field / path noted below). Last updated: 2026-10-13.

General: dark theme (background `#08090d`, cards `#1b1d23`, text `#e4ded7`, muted `#95979D`). Export images as **WebP** (JPEG for photos), under 300 KB each. Provide **2x** versions for small images. Include readable alt-text ideas where useful.

## 1. Brand and sharing

| Asset | Size | Path | Status |
| --- | --- | --- | --- |
| Social share image (Open Graph) for the home page | 1200x630 | `public/og/home.jpg` | Placeholder (currently uses the 896x1152 profile photo) |
| Social share image for the services index | 1200x630 | `public/og/services.jpg` | Not started |
| One share image per service (10) | 1200x630 | `public/og/services/<slug>.jpg` | Not started |
| Favicon / app icon refresh (if the brand changes) | 512x512 PNG + SVG | `public/` | Existing icons kept |

## 2. Service pages (`/services/<slug>`)

One hero illustration per service, 1200x675 (16:9), WebP, path `public/services/<slug>.webp`. After the file exists, set `image: '/services/<slug>.webp'` on that service in `app/lib/services.ts`.

Slugs: `figma-to-nextjs`, `figma-ui-ux-design`, `saas-dashboard-development`, `full-stack-web-app-development`, `crm-custom-software-development`, `ecommerce-app-development`, `react-native-app-development`, `claude-code-export-cleanup`, `ai-built-app-cleanup`, `project-management`.

Ideas: dashboard UI mockup for SaaS and CRM, phone mockups for React Native, a Figma frame turning into a webpage for Figma to Next.js, before/after code cleanup for the AI cleanup pages.

## 3. Case studies (`/work/[slug]`, step 5)

Per project: cover image 1600x900, 2-4 screenshots or device mockups (desktop and mobile), optional short video/GIF under 3 MB. Projects: BlockFrame, Rapid Rilief, Warmemacher, HAPPER.TV, plus Innovaft work and React Native client apps (need the client's permission to show).
Path: `public/work/<project-slug>/cover.webp`, `public/work/<project-slug>/shot-1.webp`, ...

## 4. Contact form (multi-step, step 4)

Design the 4 steps in Figma (desktop and mobile):
1. You (name, email, phone/WhatsApp, country/city)
2. Need (service chips, including React Native, plus a course/mentoring option)
3. Details (changes depending on the service chosen)
4. Timing and review, then a success screen

Include: progress indicator, error states, loading state, success state, and the confirmation screen with the "Book a call" button.

## 5. Location pages (step 6)

One hero image per page, 1600x900: Hisar, Haryana, Hansi, Bhiwani, Rohtak. Real photos are best. Avoid stock images that look generic.
Path: `public/locations/<slug>.webp`. Slugs: `hisar`, `hansi`, `bhiwani`, `rohtak`, `haryana`. The code has no image field for locations yet; ask the developer to wire it in when the files exist.

## 6. Learn / mentoring page (step 7)

Hero image 1600x900, a mentoring photo (real, with permission), and a simple graphic of the learning path (UI/UX, Frontend, Backend, Full Stack, Mobile, WordPress). Path: `public/learn/`.

## 7. Blog (step 8)

A cover-image template (1200x630) that can be reused per post, with title area, so posts can be produced quickly. Path for covers: `public/blog/<post-slug>.webp`.

## 8. Home page additions (step 9)

A "Services" section: 8-10 icons or small illustrations (SVG, single colour so they can follow the theme), and a short "Mentoring & Innovaft courses" banner.

## Notes

- The Innovaft sites use their own branding; keep this site personal-brand first.
- Do not include claims, numbers or prices in graphics unless the owner has confirmed them (see `docs/expansion-plan.md`).
