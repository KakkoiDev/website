import ContactEmail from "@/emails/ContactEmail";
import { Resend } from "resend";

const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Best-effort, per-instance rate limit. On serverless every cold instance
// starts empty, so this slows a script down rather than stopping it; put a
// platform firewall rule or a CAPTCHA in front of the route for a hard limit.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  recentRequests.set(ip, timestamps);

  if (recentRequests.size > 10_000) recentRequests.clear();

  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

// Browsers always send Origin on a cross-site POST, so this keeps other
// sites from using a visitor's browser to post the form. It does not stop a
// script, which can send any Origin it likes.
function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const companyEmail = process.env.EMAIL;
  const companyEmailWithSenderName = process.env.EMAIL_WITH_SENDER_NAME;

  if (!apiKey || !companyEmail || !companyEmailWithSenderName) {
    console.error("Contact form is not configured: missing email env vars");
    return errorResponse("The message could not be sent.", 500);
  }

  if (!isSameOrigin(req)) return errorResponse("Forbidden", 403);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return errorResponse("Too many requests", 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request", 400);
  }

  const { email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: the field is hidden from people, so only bots fill it in.
  // Answer as if it worked so they have nothing to tune against.
  if (typeof website === "string" && website !== "") {
    return Response.json({ ok: true });
  }

  if (
    typeof email !== "string" ||
    typeof message !== "string" ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email) ||
    message.trim() === "" ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return errorResponse("Invalid email or message", 400);
  }

  // Only the site owner is emailed. A confirmation sent to the address a
  // visitor typed would let anyone make this domain mail arbitrary people.
  const { error } = await new Resend(apiKey).emails.send({
    from: companyEmailWithSenderName,
    to: [companyEmail],
    replyTo: email,
    subject: "You've got a new message!",
    react: ContactEmail({ email, message }),
  });

  if (error) {
    console.error("Contact email failed", error);
    return errorResponse("The message could not be sent.", 502);
  }

  return Response.json({ ok: true });
}
