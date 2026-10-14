# Security and abuse notes (contact form, environment variables, email)

Plain-language record of the decisions made on 2026-10-14.

## Public and private variables

- In Next.js, a variable that starts with `NEXT_PUBLIC_` is copied into the JavaScript every visitor downloads. Anyone can read it. A variable without that prefix stays on the server.
- The first version of the contact form sent email from the visitor's browser, so every EmailJS value had to be `NEXT_PUBLIC_`. That included `NEXT_PUBLIC_EMAILJS_TO_EMAIL`, which put the owner's inbox address in the page code and undid the click-to-reveal email protection.
- EmailJS's public key, service ID and template IDs are designed to be public. They are identifiers, not passwords. The risk is not that they leak, but that they can be used.

## What someone could do with the public keys

With the public key, service ID and template ID anyone can call the EmailJS API directly, without our site.

- **Admin template (to the owner):** if its To Email is fixed, they can only fill the owner's inbox with junk.
- **User template (auto-reply):** its recipient was a variable (`to_email`). An attacker could set it to any address and put their own text in the name and message fields, so the template would be delivered to a stranger from the owner's connected email account. That could also get the sender account flagged.
- **Quota:** the free plan has a monthly request limit (the dashboard showed 200). Each enquiry uses two requests, so spam can use up the quota and block real enquiries.
- EmailJS domain restriction (Security tab) only stops other websites in a browser. A script outside a browser can fake the header it checks, so it is useful but not a lock.

## What we did

1. The auto-reply template contains no visitor-written text (`docs/emailjs/user-template.html`); the code sends it only `to_email`.
2. The contact form posts to `/api/enquiry` (`app/api/enquiry/route.ts`). The EmailJS keys are private `EMAILJS_*` variables, never sent to visitors. The inbox address lives only in the EmailJS admin template.
3. The route checks the Origin header against our domains (`ALLOWED_HOSTS` adds more), caps body size, validates and trims every field, removes line breaks from one-line fields, and limits 5 enquiries per IP per hour and 150 per day per server instance.
4. The form keeps its honeypot field and its minimum-fill-time check.

## Limits that remain

- A script can fake the Origin header, and the in-memory counters do not carry across Vercel instances. They slow abuse; the EmailJS quota is the hard cap.
- Next step if spam appears: a CAPTCHA such as Cloudflare Turnstile (free, adds a script), then an external rate-limit store.
- The site is no longer fully static: `/api/enquiry` is the only `ƒ` route and runs only when someone submits the form.
- Never put EmailJS's private key in a `NEXT_PUBLIC_` variable or in the repo. Paste it into Vercel yourself.

## Owner checklist

1. EmailJS, Account, Security: allow API calls from non-browser applications (the server needs this; some plans may not offer it), allow only your domains, enable any CAPTCHA or rate-limit option available.
2. Vercel: set `EMAILJS_SERVICE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_ADMIN_TEMPLATE_ID`, `EMAILJS_USER_TEMPLATE_ID`. Add a preview host to `ALLOWED_HOSTS` to test on previews.
3. EmailJS admin template: Subject `{{subject}}`, To Email your inbox address, Reply To `{{from_email}}`. User template: To Email `{{to_email}}`, fixed subject, Reply To your inbox.
4. After the new version works, delete the old `NEXT_PUBLIC_EMAILJS_*` variables in Vercel.
5. Watch EmailJS usage for spikes. If the old public key was ever exposed in a live build and you see abuse, rotate the keys in EmailJS.
