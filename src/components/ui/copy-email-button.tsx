"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { useToast } from "./toast";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for older browsers and non-secure contexts.
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function CopyEmailButton({
  className,
  showAddress = true,
  tone = "default",
}: {
  className?: string;
  showAddress?: boolean;
  tone?: "default" | "inverse";
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await copyText(siteConfig.email);
      setCopied(true);
      toast("Email copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${siteConfig.email}`}
      className={cn(
        "group inline-flex min-h-9 items-center gap-2 rounded-md px-2 text-sm transition-colors",
        tone === "default"
          ? "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
          : "text-white/70 hover:bg-white/5 hover:text-white",
        className,
      )}
    >
      {showAddress ? <span className="font-mono text-[0.8125rem]">{siteConfig.email}</span> : null}
      <Icon
        aria-hidden="true"
        className={cn("size-3.5 transition-transform duration-200", copied ? "scale-110 text-primary" : "group-hover:-translate-y-px")}
      />
    </button>
  );
}
