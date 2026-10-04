"use server";

import { siteConfig } from "@/data/site-config";
import { type ContactFormValues, type ContactResult, validateContact } from "./schema";
import { sendContactMessage } from "./send";

function toValues(input: unknown): ContactFormValues {
  const source = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const read = (key: keyof ContactFormValues) => {
    const value = source[key];
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: read("name"),
    email: read("email"),
    projectType: read("projectType"),
    budget: read("budget"),
    message: read("message"),
    website: read("website"),
  };
}

export async function submitContactForm(input: unknown): Promise<ContactResult> {
  const values = toValues(input);

  // Bots tend to fill every field; accept quietly and drop the submission.
  if (values.website) return { status: "success", preview: false };

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const result = await sendContactMessage(values);
  if (result.ok) return { status: "success", preview: result.preview };

  return {
    status: "error",
    message:
      result.reason === "not-configured"
        ? `The form isn't connected yet. Please email me directly at ${siteConfig.email}.`
        : `Something went wrong while sending. Please try again or email me at ${siteConfig.email}.`,
  };
}
