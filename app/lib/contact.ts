export const BOOKING_URL = 'https://cal.com/iamsharukh/30min'

// Opens the contact section on the home page with the service pre-selected.
export const contactHref = (service?: string) =>
  service ? `/?service=${encodeURIComponent(service)}#contact` : '/#contact'
