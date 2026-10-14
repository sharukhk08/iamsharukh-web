// Server-only. Builds and sends the two enquiry emails through the EmailJS REST API.
// The keys come from private environment variables (no NEXT_PUBLIC_ prefix), so they
// never reach the browser. The recipient of the admin email is set inside the EmailJS
// template, and the auto-reply carries no visitor-written text.

export type EnquiryData = {
  audience: 'client' | 'student'
  name: string
  email: string
  phone: string
  country: string
  services: string[]
  details: { label: string; value: string }[]
  timeline: string
  source: string
  contactMethod: string
}

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'

// Subject example: [Custom SaaS Dashboard Development] Lead - Germany
export const buildSubject = (data: EnquiryData) => {
  const place = data.country || 'Unknown'
  const first = data.services[0] ?? 'Enquiry'
  return data.audience === 'student'
    ? `[Learning: ${first}] Student enquiry - ${place}`
    : `[${first}] Lead - ${place}`
}

export const buildMessage = (data: EnquiryData) =>
  [
    'SERVICES',
    data.services.join(', '),
    '',
    'DETAILS',
    ...data.details.filter((item) => item.value).map((item) => `${item.label}: ${item.value}`),
    '',
    'TIMING AND CONTACT',
    `Type: ${data.audience === 'student' ? 'Student' : 'Client'}`,
    ...(data.timeline ? [`Timeline: ${data.timeline}`] : []),
    `Preferred contact: ${data.contactMethod}`,
    ...(data.source ? [`Found me via: ${data.source}`] : []),
    `Location: ${data.country}`,
  ].join('\n')

type Config = {
  serviceId: string
  publicKey: string
  privateKey: string
  adminTemplateId: string
  userTemplateId: string
}

export const getConfig = (): Config | null => {
  const config = {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    adminTemplateId: process.env.EMAILJS_ADMIN_TEMPLATE_ID,
    userTemplateId: process.env.EMAILJS_USER_TEMPLATE_ID,
  }
  return Object.values(config).every(Boolean) ? (config as Config) : null
}

const send = async (config: Config, templateId: string, params: Record<string, string>) => {
  const response = await fetch(EMAILJS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: templateId,
      user_id: config.publicKey,
      accessToken: config.privateKey,
      template_params: params,
    }),
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error(`EmailJS responded with ${response.status}`)
}

export const sendEnquiryEmails = async (config: Config, data: EnquiryData) => {
  // The admin notification is the one that matters: if it fails, report an error.
  await send(config, config.adminTemplateId, {
    subject: buildSubject(data),
    audience: data.audience === 'student' ? 'Student' : 'Client',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    country: data.country,
    work_type: data.services.join(', '),
    timeline: data.timeline,
    source: data.source,
    contact_method: data.contactMethod,
    message: buildMessage(data),
  })

  // The auto-reply is a courtesy. If it fails the enquiry was still delivered.
  try {
    await send(config, config.userTemplateId, { to_email: data.email })
  } catch (error) {
    console.error('Auto-reply failed:', error)
  }
}
