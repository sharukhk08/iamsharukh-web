# EmailJS templates

The site sends two emails per enquiry from the server (`app/api/enquiry/route.ts` and `app/lib/enquiryMail.ts`). The browser never sees the EmailJS keys.

In EmailJS also: Account, Security, allow API calls from non-browser applications (needed because the server calls EmailJS), and set the private key as `EMAILJS_PRIVATE_KEY` in Vercel.

| Template | Env var | File |
| --- | --- | --- |
| Admin (to you) | `EMAILJS_ADMIN_TEMPLATE_ID` | `admin-template.html` |
| User (auto-reply) | `EMAILJS_USER_TEMPLATE_ID` | `user-template.html` (no visitor text, so it cannot be abused to send someone else's message) |

Both templates work for clients and students. The type (Client or Student) is inside `{{message}}` and in the subject.

## Admin template, in EmailJS

1. Content tab, Subject: `{{subject}}` (it was `New message from {{from_name}}`, which ignored the subject the site builds, e.g. `[Figma to Next.js] Lead - Germany`).
2. Content tab, Edit Content: paste `admin-template.html`.
3. Settings tab, Reply To: `{{from_email}}`, so replying goes to the person who enquired.
4. To Email: `{{to_email}}`.

Variables the site sends to the admin template: `subject`, `audience`, `from_name`, `from_email`, `phone`, `country`, `work_type`, `timeline`, `source`, `contact_method`, `message`, `to_email`.
`message` already contains the details, timing and contact method in readable blocks, so no extra rows are required.

Variable sent to the auto-reply: `to_email` only. In the User template set To Email to `{{to_email}}`, Subject to a fixed line (no variables), and Reply To to your own inbox address.
