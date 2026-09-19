"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import "../css/capabilities.css";

/* =========================================================
   ██  EDIT BELOW  ██
========================================================= */

type Capability = {
  n: string;
  title: string;
  summary: string;
  body: string;
  deliverables: string[];
  tags: string[];
};

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "Websites",
    summary: "Company sites, landing pages, content platforms.",
    body: "We design and build websites that load quickly and are simple to maintain. You can update the content yourself, without depending on us. No page builders, no templates you'll outgrow in six months.",
    deliverables: [
      "A custom design, built for your brand",
      "An admin panel for editing text, images, and pages",
      "Hosting set up and ready to run",
      "Fast on every device, accessible by default",
    ],
    tags: ["Marketing", "Content", "Platforms", "Next.js"],
  },
  {
    n: "02",
    title: "Web applications",
    summary: "Dashboards, portals, internal tools.",
    body: "We build applications that fit the way your team already works, not the other way around. Design and engineering happen together, by the same team, from the first sketch to launch.",
    deliverables: [
      "A working application your team can log into on day one",
      "A design system that keeps new screens consistent",
      "User accounts, permissions, and a database built to last",
      "Documentation your developers can build on",
    ],
    tags: ["Dashboards", "Portals", "Tools", "PostgreSQL"],
  },
  {
    n: "03",
    title: "Custom software",
    summary: "Software built around your workflow.",
    body: "Some problems don't fit an off-the-shelf tool. When that happens, we build the thing that fits you. From first conversation to a working product you can rely on.",
    deliverables: [
      "A clear technical plan before any code is written",
      "Progress you can see every week, not a status update",
      "Connections to the tools you already use",
      "A clean handover, with code and documentation",
    ],
    tags: ["Systems", "Integrations", "Automation"],
  },
  {
    n: "04",
    title: "Mobile applications",
    summary: "Apps for iOS and Android.",
    body: "One codebase, two platforms. We design for the way people actually hold their phones, not for a website squeezed into a smaller screen. Store submission is handled by us.",
    deliverables: [
      "A single build that runs on both iOS and Android",
      "Store listings, screenshots, and submission handled",
      "Push notifications and offline support",
      "Analytics wired in from launch day",
    ],
    tags: ["React Native", "iOS", "Android"],
  },
  {
    n: "05",
    title: "UI and UX design",
    summary: "Interface design, flows, and design systems.",
    body: "We design interfaces grounded in what's actually being built. Not mood boards or dribbble shots. Real, considered screens your team can use and your developers can implement.",
    deliverables: [
      "Information architecture and user flows",
      "High-fidelity screens for every page",
      "Motion and interaction specification",
      "A component library your developers can work from",
    ],
    tags: ["Product design", "Design systems", "Prototyping"],
  },
  {
    n: "06",
    title: "Ongoing partnership",
    summary: "Improvements after launch.",
    body: "Launch is the midpoint, not the finish line. We stay on after v1 to fix what needs fixing, refine what users find confusing, and add what comes next.",
    deliverables: [
      "A monthly plan of what gets worked on",
      "Continuous improvements to the live product",
      "Ongoing performance and reliability work",
      "Direct access to the engineers who built it",
    ],
    tags: ["Maintenance", "Iteration", "Support"],
  },
];

const ENGAGEMENTS = [
  {
    n: "01",
    size: "Small",
    title: "A focused build",
    duration: "2 to 4 weeks",
    body: "One clear deliverable: a marketing site, a landing page, a design system, or a prototype that needs to become real. Tightly scoped and shipped fast.",
  },
  {
    n: "02",
    size: "Medium",
    title: "A first product",
    duration: "6 to 12 weeks",
    body: "A working application with real users: a dashboard, a portal, or an internal tool. Design and engineering run together through the whole build.",
  },
  {
    n: "03",
    size: "Ongoing",
    title: "A long partnership",
    duration: "Monthly, ongoing",
    body: "Continuous improvement on a product that's already live. We join your weekly rhythm and become the engineering team you don't have to hire.",
  },
];

const NOT_DOING = [
  "No page builders, no WordPress themes, no Webflow",
  "No fixed quotes before we understand the work",
  "No projects we can't staff ourselves",
  "No work quietly passed to other teams",
  "No free discovery that never becomes a real project",
  "No projects we'd take only to fill a slot",
];

const STACK = [
  { label: "Frontend", items: "React, Next.js, TypeScript, Python" },
  { label: "Backend", items: "Node.js, PostgreSQL" },
  { label: "Hosting", items: "Vercel, AWS" },
  { label: "Design", items: "Figma, motion prototyping" },
  { label: "Code", items: "Git, GitHub" },
  { label: "Communication", items: "Slack, Linear, weekly calls" },
];

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

function MaskOnView({
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
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
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

function CapabilityRow({
  c,
  isOpen,
  onToggle,
}: {
  c: Capability;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`cap-row ${isOpen ? "is-open" : ""}`}>
      <button
        className="cap-row-head"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor="nav"
      >
        <span className="cap-row-num">{c.n}</span>
        <span className="cap-row-title-wrap">
          <span className="cap-row-title">{c.title}</span>
          <span className="cap-row-summary">{c.summary}</span>
        </span>
        <span className="cap-row-tags-inline">
          {c.tags.slice(0, 3).map((t) => (
            <span key={t} className="cap-row-tag-inline">
              {t}
            </span>
          ))}
        </span>
        <span className="cap-row-plus" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <motion.div
        className="cap-row-body"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cap-row-body-inner">
          <div className="cap-row-cols">
            <div className="cap-row-left">
              <span className="cap-row-label">About this</span>
              <p className="cap-row-text">{c.body}</p>
              <div className="cap-row-tags">
                {c.tags.map((t) => (
                  <span key={t} className="cap-row-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="cap-row-right">
              <span className="cap-row-label">What you get</span>
              <ul className="cap-row-deliverables">
                {c.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CapabilitiesPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

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

      <main className="cap-page">
        {/* HERO */}
        <section className="cap-hero">
          <div className="cs-container">
            <h1 className="cap-hero-headline">
              <MaskIn>What we</MaskIn>
              <MaskIn delay={0.08}>
                <em>actually</em> build.
              </MaskIn>
            </h1>
          </div>
        </section>

        {/* CAPABILITIES LIST */}
        <section className="cap-section">
          <div className="cs-container">
            <Reveal className="cap-head">
              <h2 className="cap-head-title">
                <MaskOnView>Six things we do. Open any row.</MaskOnView>
              </h2>
            </Reveal>

            <div className="cap-list">
              {CAPABILITIES.map((c, i) => (
                <CapabilityRow
                  key={c.n}
                  c={c}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENTS */}
        <section className="cap-section">
          <div className="cs-container">
            <Reveal className="cap-head">
              <div className="cap-head-bar">
                <span className="cap-head-num">02</span>
                <span className="cap-head-label">Engagements</span>
              </div>
              <h2 className="cap-head-title">
                <MaskOnView>How projects usually run.</MaskOnView>
              </h2>
            </Reveal>

            <div className="cap-engagements">
              {ENGAGEMENTS.map((e, i) => (
                <Reveal
                  key={e.n}
                  delay={i * 0.06}
                  className="cap-engagement"
                >
                  <div className="cap-engagement-head">
                    <span className="cap-engagement-num">{e.n}</span>
                    <span className="cap-engagement-size">{e.size}</span>
                  </div>
                  <h3 className="cap-engagement-title">{e.title}</h3>
                  <div className="cap-engagement-duration">
                    {e.duration}
                  </div>
                  <p className="cap-engagement-body">{e.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="cap-section">
          <div className="cs-container">
            <Reveal className="cap-head">
              <div className="cap-head-bar">
                <span className="cap-head-num">03</span>
                <span className="cap-head-label">How we work</span>
              </div>
              <h2 className="cap-head-title">
                <MaskOnView>Four rules we don't bend.</MaskOnView>
              </h2>
            </Reveal>

            <div className="cap-rules">
              {[
                {
                  n: "01",
                  title: "One team, no handoffs",
                  body: "The people who design your product are the same people who build it. No account managers in between. No work quietly passed elsewhere. You always know who's on it.",
                },
                {
                  n: "02",
                  title: "Visible progress, every week",
                  body: "You see working software every week, not a status report. If something gets stuck, you hear it the day it happens, not at the next milestone.",
                },
                {
                  n: "03",
                  title: "Scoped before anything starts",
                  body: "Before a line of code is written, you get a clear plan: what gets built, in what order, for what price. Changes are discussed openly, never absorbed quietly into the deadline.",
                },
                {
                  n: "04",
                  title: "We say no when it's right",
                  body: "If a project isn't a fit, we'll tell you early, before you've spent money. Better to turn down work than take something we know we can't do well.",
                },
              ].map((r, i) => (
                <Reveal key={r.n} delay={i * 0.05} className="cap-rule">
                  <span className="cap-rule-num">{r.n}</span>
                  <h3 className="cap-rule-title">{r.title}</h3>
                  <p className="cap-rule-body">{r.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DON'T DO */}
        <section className="cap-section cap-section--alt">
          <div className="cs-container">
            <div className="cap-nogo-grid">
              <Reveal className="cap-nogo-left">
                <div className="cap-head-bar">
                  <span className="cap-head-num">04</span>
                  <span className="cap-head-label">What we don't do</span>
                </div>
                <h2 className="cap-head-title">
                  <MaskOnView>Some things we'd rather turn down.</MaskOnView>
                </h2>
                <p className="cap-nogo-lede">
                  Knowing what we won't take is how we stay good at
                  what we will. This list is short on purpose.
                </p>
              </Reveal>

              <Reveal delay={0.08} className="cap-nogo-right">
                <ul className="cap-nogo-list">
                  {NOT_DOING.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="cap-section">
          <div className="cs-container">
            <div className="cap-stack-grid">
              <Reveal className="cap-stack-left">
                <div className="cap-head-bar">
                  <span className="cap-head-num">05</span>
                  <span className="cap-head-label">Stack</span>
                </div>
                <h2 className="cap-head-title">
                  <MaskOnView>The tools we actually use.</MaskOnView>
                </h2>
                <p className="cap-stack-lede">
                  Only what we can staff today. If a project needs
                  something outside this list and we can't deliver it
                  properly, we'll tell you upfront.
                </p>
              </Reveal>

              <div className="cap-stack-right">
                {STACK.map((s, i) => (
                  <Reveal
                    key={s.label}
                    delay={i * 0.04}
                    className="cap-stack-row"
                  >
                    <span className="cap-stack-label">{s.label}</span>
                    <span className="cap-stack-items">{s.items}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cap-section cap-section--dark cs-section--dark">
          <div className="cap-cta-bg" aria-hidden="true" />
          <div className="cs-container">
            <Reveal>
              <div className="cap-head-bar">
                <span className="cap-head-num">06</span>
                <span className="cap-head-label">Contact</span>
              </div>
              <h2 className="cap-cta-title">
                Have something to build?
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="cap-cta-row">
              <a
                href="mailto:codesquare2026@gmail.com"
                className="cap-cta-email"
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