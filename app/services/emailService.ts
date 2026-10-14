import emailjs from "@emailjs/browser";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export interface EnquiryData {
  audience: "client" | "student";
  name: string;
  email: string;
  phone: string;
  // City or country, as typed or picked from the suggestions.
  country: string;
  // Human-readable labels of the services chosen.
  services: string[];
  // Label and answer pairs from the details step, already in display order.
  details: { label: string; value: string }[];
  timeline: string;
  source: string;
  contactMethod: string;
}

const MAX_FIELD = 3000;
const clean = (value: string) => value.trim().slice(0, MAX_FIELD);

// Subject example: [Custom SaaS Dashboard Development] Lead - Germany
export const buildSubject = (data: EnquiryData) => {
  const place = data.country || "Unknown";
  const first = data.services[0] ?? "Enquiry";
  return data.audience === "student"
    ? `[Learning: ${first}] Student enquiry - ${place}`
    : `[${first}] Lead - ${place}`;
};

// Everything in one readable block, grouped, so the existing EmailJS
// template (which already prints {{message}}) shows the full enquiry.
export const buildMessage = (data: EnquiryData) =>
  [
    "SERVICES",
    data.services.join(", "),
    "",
    "DETAILS",
    ...data.details
      .filter((item) => item.value)
      .map((item) => `${item.label}: ${item.value}`),
    "",
    "TIMING AND CONTACT",
    `Type: ${data.audience === "student" ? "Student" : "Client"}`,
    ...(data.timeline ? [`Timeline: ${data.timeline}`] : []),
    `Preferred contact: ${data.contactMethod}`,
    ...(data.source ? [`Found me via: ${data.source}`] : []),
    `Location: ${data.country}`,
  ].join("\n");

export const sendEnquiry = async (raw: EnquiryData): Promise<void> => {
  const data: EnquiryData = {
    ...raw,
    name: clean(raw.name),
    email: clean(raw.email),
    phone: clean(raw.phone),
    country: clean(raw.country),
    details: raw.details.map((item) => ({
      label: item.label,
      value: clean(item.value),
    })),
  };
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const message = buildMessage(data);

  // The admin notification is the one that matters: if it fails, show an error.
  await emailjs.send(serviceId, process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!, {
    subject: buildSubject(data),
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    country: data.country,
    work_type: data.services.join(", "),
    timeline: data.timeline,
    source: data.source,
    contact_method: data.contactMethod,
    message,
    to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL,
  });

  // The auto-reply is a courtesy. If it fails the enquiry was still delivered,
  // so do not tell the visitor their message failed.
  try {
    await emailjs.send(serviceId, process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!, {
      to_name: data.name,
      from_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL,
      to_email: data.email,
      phone: data.phone,
      work_type: data.services.join(", "),
      message,
    });
  } catch (error) {
    console.error("Auto-reply failed:", error);
  }
};
