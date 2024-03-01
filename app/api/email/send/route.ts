import ContactEmailSentConfirmation from "@/emails/ContactEmailSentConfirmation";
import ContactEmail from "@/emails/ContactEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const companyEmail = process.env.EMAIL ?? "";
const companyEmailWithSenderName = process.env.EMAIL_WITH_SENDER_NAME ?? "";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // confirmation email
    await resend.emails.send({
      from: companyEmailWithSenderName,
      to: [body.email],
      subject: "Thank you for reacking out!",
      react: ContactEmailSentConfirmation({ message: body.message }),
      text: "",
    });

    // contact email
    await resend.emails.send({
      from: companyEmailWithSenderName,
      to: [companyEmail],
      subject: "You've got a new message!",
      react: ContactEmail({ email: body.email, message: body.message }),
      text: "",
    });

    return Response.json(body);
  } catch (error) {
    console.log({ error });
    return Response.json({ error });
  }
}
