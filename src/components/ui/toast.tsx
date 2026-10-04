"use client";

import { Check } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToastContextValue = { toast: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 2400;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  const toast = useCallback((next: string) => {
    window.clearTimeout(timeout.current);
    setMessage(next);
    setVisible(true);
    timeout.current = window.setTimeout(() => setVisible(false), TOAST_DURATION);
  }, []);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-70 flex justify-center px-4"
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1917] py-2 pl-2.5 pr-4 text-sm font-medium text-[#faf9f9] shadow-float transition-[opacity,transform] duration-300 ease-out dark:bg-[#f5f4f3] dark:text-[#1c1917]",
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <span className="grid size-5 place-items-center rounded-full bg-secondary text-[#042f2e]">
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          {message}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}
