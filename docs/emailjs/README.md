# EmailJS templates

The site sends two emails per enquiry (see `app/services/emailService.ts`).

| Template | Env var | File |
| --- | --- | --- |
| Admin (to you) | `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID` | `admin-template.html` |
| User (auto-reply) | `NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID` | keep your current one; only change the year in the footer |

Both templates work for clients and students. The type (Client or Student) is inside `{{message}}` and in the subject.

## Admin template, in EmailJS

1. Content tab, Subject: `{{subject}}` (it was `New message from {{from_name}}`, which ignored the subject the site builds, e.g. `[Figma to Next.js] Lead - Germany`).
2. Content tab, Edit Content: paste `admin-template.html`.
3. Settings tab, Reply To: `{{from_email}}`, so replying goes to the person who enquired.
4. To Email: `{{to_email}}`.

Variables the site sends to the admin template: `subject`, `from_name`, `from_email`, `phone`, `country`, `work_type`, `timeline`, `source`, `contact_method`, `message`, `to_email`.
`message` already contains the details, timing and contact method in readable blocks, so no extra rows are required.

Variables sent to the auto-reply: `to_name`, `from_email`, `to_email`, `phone`, `work_type`, `message`.
