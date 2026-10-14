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

// The browser only talks to our own /api/enquiry route. The EmailJS keys, the
// subject and the email text are all handled on the server (app/lib/enquiryMail.ts).
export const sendEnquiry = async (data: EnquiryData): Promise<void> => {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Enquiry failed with ${response.status}`);
};
