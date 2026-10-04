"use client";

import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useId, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { submitContactForm } from "@/lib/contact/actions";
import {
  BUDGET_RANGES,
  CONTACT_FIELDS,
  MESSAGE_MAX,
  PROJECT_TYPES,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormValues,
  emptyContactValues,
  validateContact,
  validateField,
} from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "success"; preview: boolean } | { kind: "error"; message: string };

const inputClasses =
  "w-full rounded-md border border-border-strong bg-background px-3.5 text-[0.9375rem] text-foreground shadow-[0_1px_0_rgb(0_0_0/0.02)] transition-[border-color,box-shadow] duration-200 placeholder:text-subtle-foreground hover:border-foreground/25 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-accent aria-[invalid=true]:focus:ring-accent/15 disabled:opacity-60";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const fieldId = (field: string) => `${id}-${field}`;

  function update(field: keyof ContactFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      // Once a field has been visited, keep its error in sync while the user corrects it.
      if (field !== "website" && (touched[field] || errors[field])) {
        setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
      }
    };
  }

  function handleBlur(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
  }

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = CONTACT_FIELDS.find((field) => fieldErrors[field]);
    if (!first) return;
    const target = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    target?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateContact(values);
    setErrors(fieldErrors);
    setTouched({ name: true, email: true, projectType: true, budget: true, message: true });
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitContactForm(values);
        if (result.status === "success") {
          setStatus({ kind: "success", preview: result.preview });
          setValues(emptyContactValues);
          setTouched({});
          requestAnimationFrame(() => successRef.current?.focus());
        } else {
          setStatus({ kind: "error", message: result.message });
          if (result.fieldErrors) {
            setErrors(result.fieldErrors);
            focusFirstError(result.fieldErrors);
          }
        }
      } catch {
        setStatus({
          kind: "error",
          message: `Couldn't reach the server. Please check your connection or email me at ${siteConfig.email}.`,
        });
      }
    });
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-112 flex-col items-start justify-center rounded-xl border border-border bg-surface p-8 focus:outline-none sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary-strong">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-title">Thanks — your message is on its way.</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          I&apos;ll read it properly and reply to the email you provided. {siteConfig.responseTime}
        </p>
        {status.preview ? (
          <p className="mt-5 rounded-md border border-dashed border-border-strong px-3 py-2 font-mono text-xs text-subtle-foreground">
            Preview mode: no email service is configured, so nothing was actually sent.
          </p>
        ) : null}
        <Button variant="secondary" className="mt-8" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const showError = (field: ContactField) => (touched[field] ? errors[field] : undefined);
  const describedBy = (field: ContactField, extra?: string) =>
    [showError(field) ? fieldId(`${field}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-title`}
      className="rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-8"
    >
      <h3 id={`${id}-title`} className="text-title">
        Start a project
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">All fields are required.</p>

      {status.kind === "error" ? (
        <div role="alert" className="mt-6 flex gap-3 rounded-md border border-accent/40 bg-accent-soft p-3.5 text-sm text-accent-foreground">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{status.message}</p>
        </div>
      ) : null}

      <fieldset disabled={isPending} className="mt-7 grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Project inquiry</legend>

        <Field label="Name" htmlFor={fieldId("name")} error={showError("name")} errorId={fieldId("name-error")}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={update("name")}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={describedBy("name")}
            className={cn(inputClasses, "h-11")}
          />
        </Field>

        <Field label="Email" htmlFor={fieldId("email")} error={showError("email")} errorId={fieldId("email-error")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={values.email}
            onChange={update("email")}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={describedBy("email")}
            className={cn(inputClasses, "h-11")}
          />
        </Field>

        <Field
          label="Project type"
          htmlFor={fieldId("projectType")}
          error={showError("projectType")}
          errorId={fieldId("projectType-error")}
          className="sm:col-span-2"
        >
          <div className="relative">
            <select
              id={fieldId("projectType")}
              name="projectType"
              value={values.projectType}
              onChange={update("projectType")}
              onBlur={() => handleBlur("projectType")}
              aria-invalid={Boolean(showError("projectType"))}
              aria-describedby={describedBy("projectType")}
              className={cn(inputClasses, "h-11 appearance-none pr-10", !values.projectType && "text-subtle-foreground")}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type} className="text-foreground">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground" aria-hidden="true" />
          </div>
        </Field>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={showError("budget") ? fieldId("budget-error") : undefined}
        >
          <legend className="text-sm font-medium">Budget range</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {BUDGET_RANGES.map((range) => {
              const checked = values.budget === range;
              return (
                <label
                  key={range}
                  className={cn(
                    "relative inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
                    checked
                      ? "border-primary-strong bg-primary-soft font-medium text-primary-strong"
                      : "border-border-strong text-muted-foreground hover:border-foreground/25 hover:text-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={range}
                    checked={checked}
                    onChange={(event) => {
                      update("budget")(event);
                      setTouched((current) => ({ ...current, budget: true }));
                      setErrors((current) => ({ ...current, budget: undefined }));
                    }}
                    className="sr-only"
                  />
                  {range}
                </label>
              );
            })}
          </div>
          <FieldError id={fieldId("budget-error")} error={showError("budget")} />
        </fieldset>

        <Field
          label="Message"
          htmlFor={fieldId("message")}
          error={showError("message")}
          errorId={fieldId("message-error")}
          className="sm:col-span-2"
          hint={
            <span id={fieldId("message-count")} className="font-mono text-xs text-subtle-foreground">
              {values.message.length}/{MESSAGE_MAX}
            </span>
          }
        >
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="What are you building, what's the timeline, and is there a design or existing codebase?"
            value={values.message}
            onChange={update("message")}
            onBlur={() => handleBlur("message")}
            aria-invalid={Boolean(showError("message"))}
            aria-describedby={describedBy("message", fieldId("message-count"))}
            className={cn(inputClasses, "min-h-36 resize-y py-3 leading-relaxed")}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
          />
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-subtle-foreground">{siteConfig.responseTime}</p>
        <Button type="submit" size="lg" disabled={isPending} aria-disabled={isPending} className="sm:min-w-44">
          {isPending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-caption text-accent-foreground">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}
