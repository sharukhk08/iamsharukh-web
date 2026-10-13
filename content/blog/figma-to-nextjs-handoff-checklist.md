---
title: Figma to Next.js: what to prepare before handing over your design
description: A practical checklist for designers and founders so a Figma design can be built into a fast, accurate Next.js website without delays or guesswork.
date: 2026-10-13
---

A good Figma design is not always a design that is ready to build. The gap between the two is where most delays, extra revisions and "that is not what I designed" moments come from. This checklist covers what to prepare before handing a design to a developer, so the website you get matches the design you approved.

## 1. Design every screen size

Websites are viewed on phones, tablets and large monitors. Provide at least a mobile and a desktop version of every page. If you only provide a desktop design, the developer has to invent the mobile layout, and it may not be what you would have chosen. A tablet version is a bonus for complex layouts.

## 2. Use auto layout and real components

Auto layout in Figma behaves like the way browsers lay out pages. When a design uses it, a developer can see how elements should grow, shrink and wrap. Turn repeated elements, such as buttons, cards, navigation items and form fields, into components, so everything that should look the same is the same.

## 3. Define your styles once

Set up shared styles instead of picking values by eye each time:

- **Colours:** a small palette with names, such as primary, background and text.
- **Typography:** a clear scale for headings, body text and captions.
- **Spacing:** a consistent set of gaps and paddings, for example multiples of 8.

These map directly onto a Tailwind CSS configuration, so the website stays consistent and is easy to change later.

## 4. Show every state

A button is not just a button. Design the hover, focus, pressed and disabled states. For forms, show the error, success and loading states. For lists and dashboards, show what an empty state looks like. If states are missing, the developer has to guess, and the guesses rarely match your brand.

## 5. Explain the animations

Animations are hard to read from static frames. Write short notes next to the design: what moves, in which direction, how fast and what triggers it, such as on scroll, on hover or on page load. A short screen recording or a Figma prototype is even better.

## 6. Export and organise your assets

- Provide icons and logos as **SVG** so they stay sharp.
- Provide photos at a good resolution, in a format that can be compressed, such as JPEG or WebP.
- Check that you have the right to use every image and font.
- Name layers and frames clearly, so the developer can find things.

## 7. Provide the real content

Placeholder text hides problems. Real headings, descriptions and button labels change how a layout behaves, because a long German word or a three-line heading can break a layout that looked perfect with "Lorem ipsum". Include the page titles and descriptions you want shown on Google, and alt text for important images.

## 8. Describe how things should behave

Some behaviour cannot be seen in a picture. Write down:

- Where each form sends its data and what the visitor sees afterwards.
- Which links open in a new tab.
- What happens on pages that do not exist.
- Any login, payment or booking steps.

## A quick final check

Before you share the file, ask yourself: could someone build this website without asking me a single question? If the answer is no, the questions you would be asked are the things to add to the file.

If you have a design ready and want it built as a fast, SEO-ready Next.js website, you can [send me the details](/services/figma-to-nextjs) and I will tell you what I would need and how I would approach it.
