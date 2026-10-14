# Audit scripts

The checks behind the reports, so they can be repeated after any change. They are not part of the website and nothing in the site depends on them.

| Script | Checks |
| --- | --- |
| `seoaudit.mjs` | Every page: title, description, canonical, share image, structured data required fields, heading count, image alt text, sitemap coverage, robots.txt, llms.txt, every sitemap URL returns 200 |
| `axe.mjs` | Accessibility (axe-core, WCAG 2 A and AA) on the main pages at phone width |
| `cls.mjs` | Layout shift on the home page (phone and desktop), with the elements that moved |
| `form2.mjs` | The contact form end to end (client path, student path, service link), with the email calls intercepted so nothing is sent |

## How to run

```
# once, in a separate empty folder (not in the website project)
mkdir audit && cd audit && npm init -y
npm install playwright-core axe-core --ignore-scripts
# copy these scripts into that folder, then:
npm run build && npm start        # in the website project, in another terminal (port 3000)
```

Each script has a `localhost:PORT` near the top (the reports used 3170 to 3180): change it to the port your server uses. They need a Chromium browser: set `executablePath` to your Chromium. The form script needs the site built with test EmailJS variables, for example:

```
npm run build  # no EmailJS variables are needed to build any more
```

Numbers from these scripts are lab measurements on one machine. For real visitor data use Google Search Console and Google Analytics.
