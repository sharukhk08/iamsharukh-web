export const BOOKING_URL = 'https://cal.com/iamsharukh/30min'
export const CONTACT_EMAIL = 'iamsharukh08@gmail.com'

// Links to the contact page with the service pre-selected.
// "learning" starts the student path.
export const contactHref = (service?: string) =>
  service ? `/contact?service=${encodeURIComponent(service)}` : '/contact'
