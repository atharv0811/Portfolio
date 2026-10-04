export const PROJECT_TYPES = [
  "Landing Page",
  "Website",
  "SaaS Application",
  "Dashboard",
  "Admin Panel",
  "UI Development",
  "Bug Fixing",
  "Performance Optimization",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
  "Not sure yet",
] as const;

export type ContactFormValues = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  /** Honeypot — real visitors never see or fill this field. */
  website: string;
};

export type ContactField = Exclude<keyof ContactFormValues, "website">;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResult =
  | { status: "success"; preview: boolean }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

export const CONTACT_FIELDS: ContactField[] = ["name", "email", "projectType", "budget", "message"];

export const emptyContactValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client (instant feedback) and the server action (source of truth). */
export function validateField(field: ContactField, rawValue: string): string | undefined {
  const value = rawValue.trim();
  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "Name looks too short.";
      if (value.length > 100) return "Name is too long.";
      return;
    case "email":
      if (!value) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(value) || value.length > 200) return "Please enter a valid email address.";
      return;
    case "projectType":
      if (!(PROJECT_TYPES as readonly string[]).includes(value)) return "Please choose a project type.";
      return;
    case "budget":
      if (!(BUDGET_RANGES as readonly string[]).includes(value)) return "Please choose a budget range.";
      return;
    case "message":
      if (!value) return "Please tell me a little about the project.";
      if (value.length < MESSAGE_MIN) return `Please add a bit more detail (at least ${MESSAGE_MIN} characters).`;
      if (value.length > MESSAGE_MAX) return `Please keep it under ${MESSAGE_MAX} characters.`;
      return;
  }
}

export function validateContact(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
