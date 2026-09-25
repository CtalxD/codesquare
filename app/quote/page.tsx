//app/quote/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import styles from "../css/quote.module.css";

const WEB3FORMS_ACCESS_KEY = "405d200a-2900-41f2-be2e-e8037215888a";

const SERVICE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "mobile", label: "Mobile app" },
  { value: "software", label: "Custom software" },
  { value: "design", label: "UI / UX design" },
  { value: "other", label: "Something else" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

const COUNTRY_CODES = [
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
];

type FormState = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  countryCode: "+977",
  phone: "",
  company: "",
  service: "website",
  budget: "",
  timeline: "1-3-months",
  message: "",
};

export default function QuotePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    if (!svc) return;

    const match = SERVICE_OPTIONS.find((o) => o.value === svc);
    if (match) {
      setForm((f) => ({ ...f, service: match.value }));
    }
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const root = rootRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
        gsap.from("[data-contact-line]", {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.1,
        });

        gsap.from("[data-contact-fade]", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.4,
        });

        gsap.from("[data-contact-form]", {
          y: 32,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-contact-body]",
            start: "top 78%",
          },
        });

        ScrollTrigger.refresh();
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  const update =
    <K extends keyof FormState>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "Please tell us your name.";

    if (!form.email.trim()) {
      next.email = "Please add an email so we can send the quote.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That email doesn't look right.";
    }

    if (!form.phone.trim()) {
      next.phone = "Please add a phone number.";
    } else if (!/^[0-9\s\-()]{5,}$/.test(form.phone.trim())) {
      next.phone = "Digits only, please.";
    }

    if (!form.company.trim()) {
      next.company = "Please tell us the company name.";
    }

    if (!form.budget.trim()) {
      next.budget = "A rough number is enough.";
    } else if (!/^\d+(\.\d+)?$/.test(form.budget.trim())) {
      next.budget = "Numbers only, please.";
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "A sentence or two about the project, please.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Quote request - ${form.name} (${form.company})`,
          from_name: "Code Square - Quote request",
          email: form.email,
          name: form.name,
          phone: `${form.countryCode} ${form.phone}`,
          company: form.company,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          botcheck: "",
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("send failed");

      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main id="main" ref={rootRef} className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero} aria-labelledby="quote-title">
        <div className={styles.container}>
          <span className={styles.eyebrow} data-contact-fade>
            06 - Quote
          </span>

          <h1 id="quote-title" className={styles.title}>
            <span className={styles.maskLine}>
              <span data-contact-line>Get a quote</span>
            </span>
            <span className={styles.maskLine}>
              <span data-contact-line>in one reply.</span>
            </span>
          </h1>

          <p className={styles.lead} data-contact-fade>
            Answer a few questions and we&rsquo;ll come back within one
            business day with a written scope, a price, and a timeline.
            No follow-up calls unless you ask.
          </p>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className={styles.body} data-contact-body>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* ---------- Left: what you get ---------- */}
            <aside className={styles.aside}>
              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>What you get</span>
                <span className={styles.asideValue}>
                  A written scope of work, a fixed price, and a delivery
                  timeline.
                </span>
              </div>

              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>How long it takes</span>
                <span className={styles.asideValue}>
                  One business day from the moment you hit send.
                </span>
              </div>

              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>No cost to ask</span>
                <span className={styles.asideValue}>
                  Quotes are free. If we can&rsquo;t help, we&rsquo;ll say
                  so.
                </span>
              </div>

              <div className={styles.asideNote} data-contact-card>
                <p>
                  Prefer the full contact form?{" "}
                  <Link href="/contact" className={styles.asideLink}>
                    Head over here
                  </Link>
                  .
                </p>
              </div>
            </aside>

            {/* ---------- Right: form ---------- */}
            <div className={styles.formWrap} data-contact-form>
              {status === "sent" ? (
                <div className={styles.success} role="status">
                  <span className={styles.successIcon} aria-hidden="true">
                    <Check size={22} strokeWidth={2} />
                  </span>
                  <h2 className={styles.successTitle}>
                    Request received.
                  </h2>
                  <p className={styles.successText}>
                    We&rsquo;ll send your quote within one business day.
                    If you don&rsquo;t hear from us, check spam - and if
                    it&rsquo;s urgent, call{" "}
                    <a
                      href="tel:+9779813301334"
                      className={styles.successLink}
                    >
                      +977 9813301334
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setStatus("idle")}
                  >
                    Request another quote
                  </button>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={onSubmit}
                  noValidate
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                    aria-hidden="true"
                  />

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-name"
                      >
                        Your name
                      </label>
                      <input
                        id="quote-name"
                        className={styles.input}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "err-quote-name" : undefined
                        }
                        required
                      />
                      {errors.name && (
                        <span
                          id="err-quote-name"
                          className={styles.error}
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-email"
                      >
                        Email
                      </label>
                      <input
                        id="quote-email"
                        className={styles.input}
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "err-quote-email" : undefined
                        }
                        required
                      />
                      {errors.email && (
                        <span
                          id="err-quote-email"
                          className={styles.error}
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="quote-phone"
                    >
                      Phone
                    </label>
                    <div className={styles.phoneRow}>
                      <select
                        aria-label="Country code"
                        className={`${styles.select} ${styles.selectCode}`}
                        value={form.countryCode}
                        onChange={update("countryCode")}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="quote-phone"
                        className={`${styles.input} ${styles.inputPhone}`}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="98XXXXXXXX"
                        value={form.phone}
                        onChange={update("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "err-quote-phone" : undefined
                        }
                        required
                      />
                    </div>
                    {errors.phone && (
                      <span
                        id="err-quote-phone"
                        className={styles.error}
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-company"
                      >
                        Company
                      </label>
                      <input
                        id="quote-company"
                        className={styles.input}
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={update("company")}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={
                          errors.company ? "err-quote-company" : undefined
                        }
                        required
                      />
                      {errors.company && (
                        <span
                          id="err-quote-company"
                          className={styles.error}
                        >
                          {errors.company}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-service"
                      >
                        What do you need?
                      </label>
                      <select
                        id="quote-service"
                        className={styles.select}
                        value={form.service}
                        onChange={update("service")}
                      >
                        {SERVICE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-budget"
                      >
                        Rough budget
                      </label>
                      <div className={styles.budgetRow}>
                        <span
                          className={styles.budgetPrefix}
                          aria-hidden="true"
                        >
                          $
                        </span>
                        <input
                          id="quote-budget"
                          className={`${styles.input} ${styles.inputBudget}`}
                          type="number"
                          min="0"
                          step="100"
                          inputMode="numeric"
                          placeholder="5000"
                          value={form.budget}
                          onChange={update("budget")}
                          aria-invalid={Boolean(errors.budget)}
                          aria-describedby={
                            errors.budget ? "err-quote-budget" : undefined
                          }
                          required
                        />
                      </div>
                      <span className={styles.hint}>
                        A rough number is enough. USD is fine - we
                        convert on our side.
                      </span>
                      {errors.budget && (
                        <span
                          id="err-quote-budget"
                          className={styles.error}
                        >
                          {errors.budget}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="quote-timeline"
                      >
                        When do you need it?
                      </label>
                      <select
                        id="quote-timeline"
                        className={styles.select}
                        value={form.timeline}
                        onChange={update("timeline")}
                      >
                        {TIMELINE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="quote-message"
                    >
                      What are you building?
                    </label>
                    <textarea
                      id="quote-message"
                      className={styles.textarea}
                      rows={7}
                      value={form.message}
                      onChange={update("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "err-quote-message" : undefined
                      }
                      placeholder="Describe the project: what it does, who uses it, and any hard requirements (deadlines, integrations, existing systems)."
                      required
                    />
                    {errors.message && (
                      <span
                        id="err-quote-message"
                        className={styles.error}
                      >
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formFoot}>
                    <p className={styles.privacy}>
                      Your details are only used to send this quote. No
                      lists, no forwarding.
                    </p>
                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        "Sending…"
                      ) : (
                        <>
                          Request quote
                          <ArrowRight
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className={styles.formError} role="alert">
                      Something went wrong. Please email us at{" "}
                      <a
                        href="mailto:codesquare2026@gmail.com"
                        className={styles.errorLink}
                      >
                        codesquare2026@gmail.com
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}