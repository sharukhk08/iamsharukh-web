---
title: How to check an AI-built app before you launch it
description: A plain-language checklist for apps built with Claude Code, Lovable, Bolt or other AI tools, covering secrets, access control, data, dependencies and testing before real users arrive.
date: 2026-10-13
---

AI tools can turn an idea into a working app in a day. That is genuinely useful, and it is also the moment people tend to skip the checks that keep an app safe once real users, real data and real money are involved. This is a checklist you can work through before you launch, whichever tool built the app.

## 1. Look for secrets in the code

API keys, database passwords and tokens must never sit in the code or in the repository. Search the project for anything that looks like a key. If a secret has ever been committed, treat it as exposed: replace it with a new one, even if you have since deleted the file. Keep secrets in environment variables, and make sure your `.env` files are in `.gitignore`.

## 2. Check who can see and change what

This is the most common serious problem in prototypes. Ask these questions for every page and every action:

- Can a logged-out visitor open a page that should require login?
- Can one user see or edit another user's data by changing an ID in the address?
- Is the check done on the **server**, not only by hiding a button in the interface?

If you use a hosted database such as Firebase or Supabase, review its security rules. Open rules that allow anyone to read or write everything are fine for a demo and dangerous in production.

## 3. Validate everything users send

Anything a visitor types into a form, a URL or an upload can be wrong or hostile. Check that the server validates the type, length and format of input, and that uploads are limited by size and file type. Never build database queries by joining user text into a string.

## 4. Review your dependencies

AI tools install packages freely. Look at your list of dependencies and remove anything you do not use. Run your package manager's audit command, for example `npm audit`, and read what it reports. Be cautious with packages you do not recognise, since misspelled or look-alike package names are a known way to spread malware.

## 5. Handle errors on purpose

Try to break the app. Submit empty forms, lose your connection, open a page that does not exist and refuse a payment. A launch-ready app shows a clear message, does not crash, and does not show technical details to the visitor.

## 6. Test the flows that matter

You do not need hundreds of tests. Pick the three to five journeys that your business depends on, such as signing up, paying and submitting an order, and test them end to end. Do it again after every significant change.

## 7. Separate testing from production

Use separate databases, keys and payment settings for testing and for the live app. Take backups of your live data and check that you can actually restore from one.

## 8. Check speed on a phone

Open the app on a real phone on a mobile connection. Large images, heavy scripts and slow pages lose visitors. Compress images and avoid loading things the first screen does not need.

## When to get a developer to look

If your app handles logins, payments, personal data or anything people depend on, a review by an experienced developer before launch is cheap compared with the cost of a leak or an outage. A good review gives you a written list of what is fine, what is risky and what to fix first, and does not rewrite working code for the sake of it.

If you have an app built with Claude Code, Lovable, Bolt or a similar tool and want it checked, you can [read how I approach cleanup](/services/ai-built-app-cleanup) or [send me the details](/services/claude-code-export-cleanup).
