//app/contact/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import styles from "../css/contact.module.css";
import { useCopy } from "../../lib/useCopy";
import {
  AMOUNT_RE,
  buildMailtoFallback,
  CONTACT,
  CONTACT_EMAIL_HREF,
  COUNTRY_CODES,
  EMAIL_RE,
  MIN_SUBMIT_MS,
  PHONE_RE,
  SERVICE_OPTIONS,
  SUBMIT_COOLDOWN_MS,
  trackEvent,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_KEY,
  type Web3FormsPayload,
} from "../../lib/contactConfig";

type FormState = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
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
  message: "",
};

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountedAtRef = useRef<number>(0);
  const lastSubmitAtRef = useRef<number>(0);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const { copiedKey, copy } = useCopy();

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    if (!svc) return;
    const match = SERVICE_OPTIONS.find((o) => o.value === svc);
    if (match) setForm((f) => ({ ...f, service: match.value }));
  }, []);

  useEffect(() => {
    if (status === "sent") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

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

        gsap.from("[data-contact-card]", {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-contact-body]",
            start: "top 80%",
          },
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
      next.email = "Please add an email so we can reply.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "That email doesn't look right.";
    }

    if (!form.phone.trim()) {
      next.phone = "Please add a phone number.";
    } else if (!PHONE_RE.test(form.phone.trim())) {
      next.phone = "Digits, spaces, and dashes only.";
    }

    if (!form.company.trim()) {
      next.company = "Please tell us the company name.";
    }

    if (!form.budget.trim()) {
      next.budget = "A rough number is enough.";
    } else if (!AMOUNT_RE.test(form.budget.trim())) {
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

    /* Bot check - silent reject if the form was filled too fast. */
    if (Date.now() - mountedAtRef.current < MIN_SUBMIT_MS) {
      setStatus("error");
      setServerMessage(
        "That was a little too quick. Please try again in a moment."
      );
      return;
    }

    /* Rate limit - client-side, catches accidental double-submits. */
    if (Date.now() - lastSubmitAtRef.current < SUBMIT_COOLDOWN_MS) {
      const wait = Math.ceil(
        (SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmitAtRef.current)) / 1000
      );
      setStatus("error");
      setServerMessage(
        `Please wait ${wait}s before sending another message.`
      );
      return;
    }

    setStatus("sending");
    setServerMessage("");

    const payload: Web3FormsPayload = {
      access_key: WEB3FORMS_KEY,
      subject: `New enquiry - ${form.name} (${form.company})`,
      from_name: "Code Square website",
      email: form.email.trim(),
      name: form.name.trim(),
      phone: `${form.countryCode} ${form.phone.trim()}`,
      company: form.company.trim(),
      service: form.service,
      budget: form.budget.trim(),
      message: form.message.trim(),
      botcheck: "",
      submitted_at: new Date().toISOString(),
      page_source:
        typeof window !== "undefined" ? window.location.pathname : "",
      referrer:
        typeof document !== "undefined" ? document.referrer || "direct" : "",
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(data.message || "send failed");
      }

      trackEvent("contact_submit", {
        service: form.service,
        has_company: Boolean(form.company),
      });

      lastSubmitAtRef.current = Date.now();
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "unknown";
      setServerMessage(detail);
      setStatus("error");
      trackEvent("contact_submit_error", { detail });
    }
  };

  const emailCopied = copiedKey === "email";
  const phoneCopied = copiedKey === "phone";

  return (
    <main id="main" ref={rootRef} className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.container}>
          <span className={styles.eyebrow} data-contact-fade>
            05 - Contact
          </span>

          <h1 id="contact-title" className={styles.title}>
            <span className={styles.maskLine}>
              <span data-contact-line>Tell us about</span>
            </span>
            <span className={styles.maskLine}>
              <span data-contact-line>the project.</span>
            </span>
          </h1>

          <p className={styles.lead} data-contact-fade>
            We reply within one business day - with honest thoughts on
            scope, timeline, and cost. No discovery-call funnel, no
            pressure.
          </p>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className={styles.body} data-contact-body>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* ---------- Left: contact details ---------- */}
            <aside className={styles.aside}>
              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>Email</span>
                <div className={styles.asideRow}>
                  <a
                    href={CONTACT_EMAIL_HREF}
                    className={styles.asideValue}
                  >
                    {CONTACT.email}
                  </a>
                  <button
                    type="button"
                    className={`${styles.copyBtn} ${
                      emailCopied ? styles.copyBtnDone : ""
                    }`}
                    onClick={() => copy("email", CONTACT.email)}
                    aria-label={
                      emailCopied
                        ? "Email copied to clipboard"
                        : "Copy email address"
                    }
                  >
                    {emailCopied ? (
                      <>
                        <Check
                          size={13}
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        <span className={styles.copyBtnLabel}>
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} strokeWidth={2} aria-hidden="true" />
                        <span className={styles.copyBtnLabel}>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>Phone</span>
                <div className={styles.asideRow}>
                  <a
                    href={CONTACT.phoneHref}
                    className={styles.asideValue}
                  >
                    {CONTACT.phone}
                  </a>
                  <button
                    type="button"
                    className={`${styles.copyBtn} ${
                      phoneCopied ? styles.copyBtnDone : ""
                    }`}
                    onClick={() => copy("phone", CONTACT.phone)}
                    aria-label={
                      phoneCopied
                        ? "Phone number copied to clipboard"
                        : "Copy phone number"
                    }
                  >
                    {phoneCopied ? (
                      <>
                        <Check
                          size={13}
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        <span className={styles.copyBtnLabel}>
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} strokeWidth={2} aria-hidden="true" />
                        <span className={styles.copyBtnLabel}>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>Based in</span>
                <span className={styles.asideValue}>
                  {CONTACT.address}
                </span>
              </div>

              <div className={styles.asideBlock} data-contact-card>
                <span className={styles.asideLabel}>Hours</span>
                <span className={styles.asideValue}>{CONTACT.hours}</span>
              </div>

              <div className={styles.asideNote} data-contact-card>
                <p>
                  Prefer to write in your own format? Email us directly
                  - same inbox, same reply time.
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
                  <h2
                    className={styles.successTitle}
                    ref={successHeadingRef}
                    tabIndex={-1}
                  >
                    Got it.
                  </h2>
                  <p className={styles.successText}>
                    We&rsquo;ll read your message and reply within one
                    business day. If it&rsquo;s urgent, call{" "}
                    <a
                      href={CONTACT.phoneHref}
                      className={styles.successLink}
                    >
                      {CONTACT.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
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
                        htmlFor="contact-name"
                      >
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        className={styles.input}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "err-name" : undefined
                        }
                        required
                      />
                      {errors.name && (
                        <span id="err-name" className={styles.error}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="contact-email"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        className={styles.input}
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "err-email" : undefined
                        }
                        required
                      />
                      {errors.email && (
                        <span id="err-email" className={styles.error}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="contact-phone"
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
                        id="contact-phone"
                        className={`${styles.input} ${styles.inputPhone}`}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="98XXXXXXXX"
                        value={form.phone}
                        onChange={update("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "err-phone" : undefined
                        }
                        required
                      />
                    </div>
                    {errors.phone && (
                      <span id="err-phone" className={styles.error}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="contact-company"
                      >
                        Company
                      </label>
                      <input
                        id="contact-company"
                        className={styles.input}
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={update("company")}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={
                          errors.company ? "err-company" : undefined
                        }
                        required
                      />
                      {errors.company && (
                        <span id="err-company" className={styles.error}>
                          {errors.company}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="contact-service"
                      >
                        What do you need?
                      </label>
                      <select
                        id="contact-service"
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

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="contact-budget"
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
                        id="contact-budget"
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
                          errors.budget ? "err-budget" : undefined
                        }
                        required
                      />
                    </div>
                    <span className={styles.hint}>
                      A rough number is enough. USD is fine - we convert
                      on our side.
                    </span>
                    {errors.budget && (
                      <span id="err-budget" className={styles.error}>
                        {errors.budget}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="contact-message"
                    >
                      About the project
                    </label>
                    <textarea
                      id="contact-message"
                      className={styles.textarea}
                      rows={7}
                      value={form.message}
                      onChange={update("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "err-message" : undefined
                      }
                      placeholder="What are you building, who is it for, and when would you like it live?"
                      required
                    />
                    {errors.message && (
                      <span id="err-message" className={styles.error}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formFoot}>
                    <p className={styles.privacy}>
                      We only use your details to reply. No lists, no
                      forwarding.
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
                          Send message
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
                      We couldn&rsquo;t send your message automatically.{" "}
                      <a
                        href={buildMailtoFallback({
                          name: form.name,
                          company: form.company,
                          phone: `${form.countryCode} ${form.phone}`.trim(),
                          service: form.service,
                          budget: form.budget,
                          message: form.message,
                        })}
                        className={styles.errorLink}
                      >
                        Send it by email instead
                      </a>{" "}
                      - your message is already in that link.
                      {serverMessage && (
                        <span className={styles.formErrorDetail}>
                          {" "}
                          ({serverMessage})
                        </span>
                      )}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTNOTE ================= */}
      <section className={styles.foot} aria-labelledby="foot-title">
        <div className={styles.container}>
          <div className={styles.footRow}>
            <div>
              <h2 id="foot-title" className={styles.footTitle}>
                Prefer a call?
              </h2>
              <p className={styles.footText}>
                Ring us at{" "}
                <a
                  href={CONTACT.phoneHref}
                  className={styles.footLink}
                >
                  {CONTACT.phone}
                </a>{" "}
                or drop us a line at{" "}
                <a
                  href={CONTACT_EMAIL_HREF}
                  className={styles.footLink}
                >
                  {CONTACT.email}
                </a>
                .
              </p>
            </div>
            <div className={styles.footActions}>
              <Link href="/services" className={styles.footSecondary}>
                See what we do
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}