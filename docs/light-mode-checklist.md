# Light mode checklist

Dark is the default. Visitors switch with the sun/moon button (header on content pages, bottom bar on the home page). The choice is kept in `localStorage` under `theme` and applied before first paint by the inline script in `app/layout.tsx`. The operating system setting is ignored on purpose.

## How it works

- Colours are CSS variables in `app/globals.css` (`--c-ink`, `--c-primary`, ...), dark in `:root`, light under `html[data-theme='light']`.
- Tailwind names: `bg-primary`, `bg-secondary`, `text-ink`, `text-ink-soft`, `text-ink-mute`, `text-paper`, `bg-raised`, `bg-panel`, `bg-nav`, `text-ok`, `text-warn`, `text-bad` (`tailwind.config.js`). Do not write raw hex colours in components.
- Canvas effects (`DotGrid`, `ShapeWaves`, `FuzzyText`) read the colour with `readColor()` from `app/lib/theme.ts` and redraw on the `themechange` event.
- Images drawn for the dark theme: `.theme-photo` (hero grain photo) and `.theme-invert` (light-on-transparent graphics) are flipped with a CSS filter in light mode; Lottie animations are flipped by `.lottie-themed`.
- Illustrations (`app/components/Illustrations.tsx`) use the CSS variables for every colour.

## Done and checked

- [x] Default is dark; dark pages are pixel-identical apart from the new toggle (about 3,500 pixels per page) and project titles (cream instead of pure white).
- [x] Light theme on Home (all sections), About, Services, a service page, Learn, Blog, Contact, Locations, Work, International and 404, checked in screenshots.
- [x] Toggle on every page, with an accessible label, and a `theme_change` event in Analytics.
- [x] Browser colours: `color-scheme` and `theme-color` follow the theme.
- [x] Contrast: axe found 0 contrast issues on 9 pages in both themes.
- [x] Fonts need no change (colour only comes from the variables).
- [x] Images: hero photo, review quote marks, Lottie, illustrations and the "Hire me on Contra" badge (given a thin ring in light) work in both themes.
- [x] Open Graph / share images stay dark on purpose (they are fixed images shown outside the site).

## Owner to check by eye (not covered by automated tests)

- [ ] Home hero on a phone in light mode (name text over the pale grain).
- [ ] The custom cursor (Blobity) on the home page in light mode.
- [ ] The loading screen in light mode (it follows the saved theme).
- [ ] The contact form modal and the mobile menu in light mode.
- [ ] Your own project screenshots and client photos: they are fixed images, so check they look right on the light cards.
- [ ] Favicon: it is the same in both themes; check it on a light browser tab.
- [ ] Case study pages and blog posts once real content is added.

## Possible later

- [ ] Follow the visitor's system setting on the first visit (currently always dark first).
- [ ] A light variant of the share image.
- [ ] Remove the cream/white difference on project titles if you want dark mode to be exactly as before.
