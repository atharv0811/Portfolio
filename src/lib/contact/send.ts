import type { ContactFormValues } from "./schema";

type SendResult = { ok: true; preview: boolean } | { ok: false; reason: "not-configured" | "provider-error" };

/**
 * Delivery adapter for contact form submissions. Server-only: secrets never reach the browser.
 *
 * - With RESEND_API_KEY set, messages are sent through the Resend REST API.
 * - Without it, development runs in preview mode (logged, nothing sent) and production
 *   reports that the form is not configured, so leads are never dropped silently.
 *
 * To use another provider (Formspree, EmailJS, Supabase, your own API), replace `deliver`
 * and keep the return shape.
 */
export async function sendContactMessage(values: ContactFormValues): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Preview mode — message not sent:", {
        name: values.name,
        email: values.email,
        projectType: values.projectType,
        budget: values.budget,
      });
      return { ok: true, preview: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  return deliver(values, apiKey);
}

async function deliver(values: ContactFormValues, apiKey: string): Promise<SendResult> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) return { ok: false, reason: "not-configured" };

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `New project inquiry — ${values.projectType} (${values.name})`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Provider responded with status", response.status);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true, preview: false };
  } catch (error) {
    console.error("[contact] Delivery failed", error);
    return { ok: false, reason: "provider-error" };
  }
}
