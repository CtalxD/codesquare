"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import "../css/work.css";

/* =========================================================
   ██  EDIT BELOW  ██
========================================================= */

type Project = {
  n: string;
  type: string;
  name: string;
  year: string;
  summary: string;
  delivered: string[];
  tags: string[];
  image?: string;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    type: "Business software",
    name: "Jewellery billing and inventory system",
    year: "2026",
    summary:
      "A billing, inventory, and loan system for jewellery businesses, built around Nepal Rastra Bank regulations, with VAT-compliant invoicing, live inventory across metals and stone counts, and a loan ledger for gold-backed lending.",
    delivered: [
      "Billing with automatic VAT and NRB-compliant invoice format",
      "Inventory tracking across metals, weights, and stone counts",
      "Loan management for gold-backed lending, with interest and repayment tracking",
      "A daily-use dashboard for counter staff",
    ],
    tags: ["React", "Django", "PostgreSQL", "Billing", "Inventory"],
    image: "",
  },
];

const EMPTY_STATE = {
  title: "We're heads-down on a project right now.",
  body: "When it's ready to talk about publicly, it goes up here. In the meantime, if you'd like to see what we're working on, reach out and we'll walk you through it.",
};

/* =========================================================
   ██  DO NOT EDIT BELOW  ██
========================================================= */

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

export default function WorkPage() {
  const hasProjects = PROJECTS.length > 0;

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

      <main className="work-page">
        {/* HERO */}
        <section className="work-hero">
          <div className="cs-container">
            <h1 className="work-hero-headline">
              <MaskIn>What we&apos;ve</MaskIn>
              <br />
              <MaskIn delay={0.08}>
                <em>shipped.</em>
              </MaskIn>
            </h1>
          </div>
        </section>

        {/* PROJECTS OR EMPTY STATE */}
        {hasProjects ? (
          <section className="work-section">
            <div className="cs-container">
              <div className="work-list">
                {PROJECTS.map((p, i) => (
                  <Reveal
                    key={p.n}
                    delay={i * 0.05}
                    className="work-project"
                  >
                    <div className="work-project-head">
                      <span className="work-project-num">{p.n}</span>
                      <span className="work-project-type">{p.type}</span>
                      <span className="work-project-year">{p.year}</span>
                    </div>

                    <div className="work-project-cols">
                      <div className="work-project-left">
                        <h3 className="work-project-name">{p.name}</h3>

                        {p.image && (
                          <div className="work-project-media">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.name}
                              loading="lazy"
                            />
                          </div>
                        )}

                        <p className="work-project-summary">{p.summary}</p>

                        <div className="work-project-tags">
                          {p.tags.map((t) => (
                            <span key={t} className="work-project-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="work-project-right">
                        <span className="work-project-label">
                          What we delivered
                        </span>
                        <ul className="work-project-delivered">
                          {p.delivered.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="work-section">
            <div className="cs-container">
              <Reveal>
                <h2 className="work-empty-title">
                  {EMPTY_STATE.title}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="work-empty-body">
                <p>{EMPTY_STATE.body}</p>
              </Reveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="work-section work-section--dark cs-section--dark">
          <div className="work-cta-bg" aria-hidden="true" />
          <div className="cs-container">
            <Reveal>
              <h2 className="work-cta-title">
                Want to see more?
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="work-cta-row">
              <a
                href="mailto:codesquare2026@gmail.com"
                className="work-cta-email"
                data-cursor="email"
              >
                codesquare2026@gmail.com
              </a>
              <Link
                href="/contact"
                className="cs-btn cs-btn--primary cs-btn--lg"
                data-cursor="action"
              >
                Start a project
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}