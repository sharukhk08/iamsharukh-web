# AI image prompts

Claude Code cannot generate raster images in this setup. These prompts are for you or your designer to use in an image tool (Midjourney, DALL-E, Adobe Firefly, Google Imagen, Figma AI and similar). Put the finished files at the paths shown. Services can use them straight away via the `image` field in `app/lib/services.ts`. Other pages need a small code change, so ask the developer.

## Rules that keep the site honest and consistent

- **No text inside AI images.** AI tools spell badly. Keep headings and labels in the page, not in the picture.
- **No fake people or fake clients.** Do not use AI faces as "students", "clients" or "team". Use real photos with permission.
- **Case studies need real screenshots**, not AI art. Use AI only for abstract or illustrative hero images.
- Check each tool's licence for commercial use before publishing.
- Export as **WebP**, 1200x675 (16:9) for service images, under 300 KB. Give each image a plain description for alt text.

## Style block (add to every prompt)

> Dark, minimal, modern tech illustration. Background near-black (#08090d) with deep charcoal panels (#1b1d23). Soft cream (#e4ded7) highlights and one muted indigo accent (#8b8fff). Clean geometric shapes, subtle glow, soft depth, generous empty space. No text, no letters, no logos, no people. 16:9.

## Service images (`public/services/<slug>.webp`)

| Slug | Prompt (then add the style block) |
| --- | --- |
| `figma-to-nextjs` | A design canvas with dashed selection frames transforming into a finished website in a browser window, with a gentle arrow of light between them |
| `figma-ui-ux-design` | Floating interface wireframes, a phone screen and a desktop screen, colour swatches and a pen tool cursor over a design canvas |
| `saas-dashboard-development` | A floating analytics dashboard with a rising line chart, bar chart and summary cards, layered with soft glow |
| `full-stack-web-app-development` | Layered stack of translucent panels: interface on top, API and database layers below, connected by thin glowing lines |
| `crm-custom-software-development` | Connected customer cards, a pipeline of stages and a small calendar floating as abstract interface panels |
| `ecommerce-app-development` | A phone and a laptop showing abstract product grids and a shopping bag, floating over a soft gradient |
| `react-native-app-development` | Two smartphones, one in front of the other, showing abstract app screens with a notification card floating nearby |
| `claude-code-export-cleanup` | A code editor window with abstract lines of code being tidied, check-mark and warning badges floating beside it |
| `ai-built-app-cleanup` | A rough prototype app panel being refined into a polished one, with a scanning beam passing across it |
| `project-management` | A roadmap timeline with milestones and a kanban board of cards on dark panels |

## Other pages

| File | Prompt |
| --- | --- |
| `public/learn/hero.webp` | A staircase of glowing steps rising to a small flag, with a graduation cap hovering at the start |
| `public/locations/haryana.webp` | An abstract map grid with a glowing pin and thin dotted arcs to several smaller points |
| `public/og/home.jpg` (1200x630) | Abstract hero art for a full-stack developer portfolio: layered interface panels, code lines and a soft indigo glow, with empty space on the left for the page title |

For Hisar, Hansi, Bhiwani and Rohtak, real photos of the city are better than AI art.
