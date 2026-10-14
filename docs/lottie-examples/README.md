# Lottie examples (not used on the site yet)

Three simple animations written as plain Lottie JSON, 400 x 400, 30 fps, 4 seconds, colours from the site (cream `#e4ded7` on dark):

| File | What it shows | Possible place |
| --- | --- | --- |
| `success-check.json` | Circle draws, check mark draws, small pop | After the contact form is sent |
| `automation-flow.json` | Three nodes linked by lines, a dot travels along them and each node pulses | AI Automation service and course |
| `growth-bars.json` | Bars rise in turn, then a trend arrow draws over them | Learn and mentoring pages |

`preview-frames.png` shows each animation at frames 0, 20, 40, 60, 90 and 119 (one row each), rendered with lottie-web in a headless browser. No errors were reported. It is a still check, so it does not show easing or timing.

To watch them move, drop a `.json` file onto any Lottie previewer, for example the LottieFiles web previewer.

Copies are in `public/lottie/` and play through `app/components/LottiePlayer.tsx`: form success message, Learn hero (growth bars), AI Automation service hero (automation flow). The player is `lottie-web` 5.12.2 (the one dependency added for this), loaded as its "light" build (SVG only, no expressions) and only when an animation scrolls into view; with reduced motion it shows one still frame. To use another animation, add its JSON to `public/lottie/` and render `<LottiePlayer src="/lottie/name.json" />`. Any Lottie file taken from elsewhere should be checked for "expressions" (script code) and for its licence before use.
