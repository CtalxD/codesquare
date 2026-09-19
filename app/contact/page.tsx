"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import "../css/contact.css";

const EMAIL = "codesquare2026@gmail.com";

function MaskIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="cs-mask">
      <motion.span
        className="cs-mask-inner"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" />
      </svg>
    );
  }
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4.5" y="4.5" width="8" height="8" rx="1.2" />
      <path d="M3 9.5 H2.5 A1.2 1.2 0 0 1 1.3 8.3 V2.5 A1.2 1.2 0 0 1 2.5 1.3 H8.3 A1.2 1.2 0 0 1 9.5 2.5 V3" />
    </svg>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [copiedCta, setCopiedCta] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      return true;
    } catch {
      return false;
    }
  }

  async function handleCopy() {
    const ok = await copyEmail();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleCtaCopy() {
    const ok = await copyEmail();
    if (ok) {
      setCopiedCta(true);
      setTimeout(() => setCopiedCta(false), 2000);
    }
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="cs-progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <main className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
          <div className="cs-container">
            <h1 className="contact-hero-headline">
              <MaskIn>Start a</MaskIn>
              <br />
              <MaskIn delay={0.08}>
                <em>project.</em>
              </MaskIn>
            </h1>
          </div>
        </section>

        {/* BODY */}
        <section className="contact-section">
          <div className="cs-container">
            <div className="contact-cols">
              {/* LEFT */}
              <Reveal className="contact-left">
                <p className="contact-lede">
                  Tell us what you're building. A few sentences is enough:
                  what it is, who it's for, and what success looks like.
                  We'll reply within two working days.
                </p>

                <div className="contact-list">
                  <div className="contact-row">
                    <span className="contact-row-label">Email</span>
                    <div className="contact-row-body">
                      <a
                        href={`mailto:${EMAIL}`}
                        className="contact-email"
                        data-cursor="email"
                      >
                        {EMAIL}
                      </a>
                      <button
                        type="button"
                        className={`contact-copy ${
                          copied ? "is-copied" : ""
                        }`}
                        onClick={handleCopy}
                        aria-label="Copy email address"
                        data-cursor="nav"
                      >
                        <CopyIcon copied={copied} />
                        <span className="contact-copy-text">
                          {copied ? "Copied" : "Copy"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="contact-row">
                    <span className="contact-row-label">Based</span>
                    <span className="contact-row-value">Remote</span>
                  </div>

                  <div className="contact-row">
                    <span className="contact-row-label">Working hours</span>
                    <span className="contact-row-value">
                      Flexible, overlap with US and EU
                    </span>
                  </div>

                  <div className="contact-row">
                    <span className="contact-row-label">Languages</span>
                    <span className="contact-row-value">
                      English, Nepali
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* RIGHT */}
              <Reveal delay={0.08} className="contact-right">
                <div className="contact-block-bar">
                  <span className="contact-block-num">01</span>
                  <span className="contact-block-label">
                    What happens next
                  </span>
                </div>

                <ol className="contact-steps">
                  <li>
                    <span className="contact-step-num">01</span>
                    <div className="contact-step-body">
                      <span className="contact-step-title">
                        You send us a note
                      </span>
                      <span className="contact-step-text">
                        A few sentences about the project is enough. No
                        forms, no sales calls to sit through.
                      </span>
                    </div>
                  </li>
                  <li>
                    <span className="contact-step-num">02</span>
                    <div className="contact-step-body">
                      <span className="contact-step-title">
                        We reply within two working days
                      </span>
                      <span className="contact-step-text">
                        Either to say we're a fit and set up a short
                        call, or to say we're not and point you to
                        someone who is.
                      </span>
                    </div>
                  </li>
                  <li>
                    <span className="contact-step-num">03</span>
                    <div className="contact-step-body">
                      <span className="contact-step-title">
                        If it's a fit, we write a plan
                      </span>
                      <span className="contact-step-text">
                        Scope, timeline, and price in writing. Nothing
                        starts until you've read it and approved it.
                      </span>
                    </div>
                  </li>
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="contact-section contact-section--dark cs-section--dark">
          <div className="contact-cta-bg" aria-hidden="true" />
          <div className="cs-container">
            <Reveal>
              <h2 className="contact-cta-title">
                Prefer to talk first?
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="contact-cta-row">
              <span className="contact-cta-note">
                Copy the address and send us a note with a couple of
                times that work. We'll set up a short call.
              </span>
              <button
                type="button"
                className={`cs-btn cs-btn--primary cs-btn--lg contact-cta-btn ${
                  copiedCta ? "is-copied" : ""
                }`}
                onClick={handleCtaCopy}
                data-cursor="nav"
              >
                {copiedCta ? "Copied" : "Copy email"}
                <span aria-hidden="true">
                  {copiedCta ? "✓" : "→"}
                </span>
              </button>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}