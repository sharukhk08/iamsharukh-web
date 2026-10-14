# Adding or editing a project

A project is **one Markdown file for the text** and **one image folder**. Nothing else needs editing: the home page grid, `/work` and `/work/<slug>` all read from these.

```
content/projects/<slug>.md          the text
public/projects/<slug>/cover.png    the main image (required)
public/projects/<slug>/shot-1.png   extra screenshots (optional: shot-1, shot-2, ...)
```

`<slug>` is the project's web address: `blockframe` becomes `/work/blockframe`. Use lowercase letters, numbers and dashes.

## Steps to add a project

1. Copy `content/projects/_template.md` to `content/projects/my-project.md`.
2. Fill in the frontmatter (the part between the `---` lines) and the three sections below it.
3. Create the folder `public/projects/my-project/` and put `cover.png` in it (`.jpg` or `.webp` also work). Add `shot-1.png`, `shot-2.png` if you have more screenshots.
4. Run `npm run dev` and open `/work/my-project`. Commit and push to publish.

## The fields

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | yes | Project name |
| `summary` | yes | One or two sentences, shown on cards and in Google |
| `technologies` | no | Comma separated, for example `NextJs, Tailwind CSS` |
| `order` | no | Lower numbers come first (default: last) |
| `liveUrl` | no | Link to the live site. Must start with `https://` |
| `repoUrl` | no | Link to the code. Must start with `https://` |
| `status` | no | `published` (default), `coming-soon` (shows a "Coming soon" badge) or `draft` (hidden everywhere) |

Links that are empty or not `https://` are ignored, so no broken buttons appear.

## The three sections

Write them under these exact headings:

```
## The challenge
## What I built
## The outcome
```

- When **all three** have text, the project page is shown to Google and added to the sitemap.
- When any is empty, the page still works but is **hidden from Google** (a nearly empty page can hurt your ranking). Fill them in to publish it fully.
- Only write results you can prove. Do not invent numbers.

## Image tips

- Cover: wide, around 1600 px, under about 500 KB. PNG and JPG both work; WebP is smallest.
- Name matters: the file must be called `cover` (and extras `shot-1`, `shot-2`...).
- Files are served to visitors through Next.js image optimisation, so one large file is resized automatically, but smaller source files build and load faster.

## Hiding or removing a project

Set `status: draft` in its file. Do not delete the image folder unless you are sure.
