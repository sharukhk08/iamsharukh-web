# Lottie examples (not used on the site yet)

Three simple animations written as plain Lottie JSON, 400 x 400, 30 fps, 4 seconds, colours from the site (cream `#e4ded7` on dark):

| File | What it shows | Possible place |
| --- | --- | --- |
| `success-check.json` | Circle draws, check mark draws, small pop | After the contact form is sent |
| `automation-flow.json` | Three nodes linked by lines, a dot travels along them and each node pulses | AI Automation service and course |
| `growth-bars.json` | Bars rise in turn, then a trend arrow draws over them | Learn and mentoring pages |

`preview-frames.png` shows each animation at frames 0, 20, 40, 60, 90 and 119 (one row each), rendered with lottie-web in a headless browser. No errors were reported. It is a still check, so it does not show easing or timing.

To watch them move, drop a `.json` file onto any Lottie previewer, for example the LottieFiles web previewer.

They are not wired into the site. Using Lottie needs a player library (a new dependency, which needs approval), loaded only where an animation appears, and honouring `prefers-reduced-motion`. Any Lottie file taken from elsewhere should be checked for "expressions" (script code) and for its licence before use.
