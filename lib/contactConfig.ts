//lib/contactConfig.ts

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export const CONTACT = {
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "codesquare2026@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+977 9813301334",
  phoneHref:
    process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? "tel:+9779813301334",
  address: "Kathmandu, Nepal",
  hours: "Sun – Fri, 10:00 – 18:00 NPT",
} as const;

export const CONTACT_EMAIL_HREF = `mailto:${CONTACT.email}`;

export const SERVICE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "mobile", label: "Mobile app" },
  { value: "software", label: "Custom software" },
  { value: "design", label: "UI / UX design" },
  { value: "other", label: "Something else" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const COUNTRY_CODES = [
  { value: "+977", label: "Nepal (+977)" },
  { value: "+1", label: "US / Canada (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+64", label: "New Zealand (+64)" },
  { value: "+91", label: "India (+91)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+966", label: "Saudi Arabia (+966)" },
  { value: "+65", label: "Singapore (+65)" },
  { value: "+60", label: "Malaysia (+60)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+82", label: "South Korea (+82)" },
  { value: "+86", label: "China (+86)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+31", label: "Netherlands (+31)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+41", label: "Switzerland (+41)" },
  { value: "+46", label: "Sweden (+46)" },
  { value: "+47", label: "Norway (+47)" },
  { value: "+45", label: "Denmark (+45)" },
  { value: "+353", label: "Ireland (+353)" },
  { value: "+27", label: "South Africa (+27)" },
  { value: "+55", label: "Brazil (+55)" },
  { value: "+52", label: "Mexico (+52)" },
  { value: "+other", label: "Other" },
] as const;

/* ---------- Validation ---------- */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[0-9\s\-()]{5,}$/;
export const AMOUNT_RE = /^\d+(\.\d+)?$/;

/** Minimum time (ms) a human plausibly needs to fill the form. */
export const MIN_SUBMIT_MS = 3000;

/** Client-side cooldown between submits (ms). */
export const SUBMIT_COOLDOWN_MS = 30_000;

export type Web3FormsPayload = {
  access_key: string;
  subject: string;
  from_name: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline?: string;
  message: string;
  botcheck: string;
  submitted_at: string;
  page_source: string;
  referrer: string;
  user_agent: string;
};

/* ---------- Labels ---------- */

export const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  SERVICE_OPTIONS.map((o) => [o.value, o.label])
);

export const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_OPTIONS.map((o) => [o.value, o.label])
);

/* ---------- Helpers ---------- */

/** Build a mailto: fallback so a failed submit never dead-ends. */
export function buildMailtoFallback(args: {
  name: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
}): string {
  const subject = `Contact form - ${args.name}${
    args.company ? ` (${args.company})` : ""
  }`;
  const body = [
    `Name: ${args.name}`,
    args.company ? `Company: ${args.company}` : "",
    args.phone ? `Phone: ${args.phone}` : "",
    args.service
      ? `Service: ${SERVICE_LABELS[args.service] ?? args.service}`
      : "",
    args.budget ? `Budget: ${args.budget}` : "",
    args.timeline
      ? `Timeline: ${TIMELINE_LABELS[args.timeline] ?? args.timeline}`
      : "",
    "",
    args.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/** Fire an analytics event safely (no-op if no analytics is present). */
export function trackEvent(
  name: string,
  payload?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") w.gtag("event", name, payload ?? {});
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...(payload ?? {}) });
  }
}