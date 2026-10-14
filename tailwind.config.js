/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colours live in app/globals.css as CSS variables (dark by default,
        // light under html[data-theme="light"]). The rgb(... / <alpha-value>) form keeps
        // opacity classes such as bg-ink/10 working.
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--c-ink-soft) / <alpha-value>)",
        "ink-mute": "rgb(var(--c-ink-mute) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        raised: "rgb(var(--c-raised) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        nav: "rgb(var(--c-nav) / <alpha-value>)",
        ok: "rgb(var(--c-ok) / <alpha-value>)",
        warn: "rgb(var(--c-warn) / <alpha-value>)",
        bad: "rgb(var(--c-bad) / <alpha-value>)",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
