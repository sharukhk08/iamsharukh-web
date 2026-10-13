import emailjs from "@emailjs/browser";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

interface EmailData {
  name: string;
  email: string;
  phone: string;
  workType: string;
  description: string;
}

export const sendEmails = async (data: EmailData): Promise<void> => {
  try {
    // Send admin notification email
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        work_type: data.workType,
        message: data.description,
        to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL,
      }
    );

    // Send auto-reply email to the user's entered email address
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!,
      {
        to_name: data.name,
        from_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL, // Your email as sender
        to_email: data.email, // User's entered email as recipient
        phone: data.phone,
        work_type: data.workType,
        message: data.description,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
