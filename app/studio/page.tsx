"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import "../css/studio.css";

/* =========================================================
   ██  EDIT BELOW  ██
========================================================= */

const FOUNDED = new Date().getFullYear();

const TEAM = [
  {
    n: "01",
    role: "Engineering",
    focus: "Frontend and backend. Full-stack delivery.",
    detail:
      "Designs the data model, builds the app, ships it. Has spent more time debugging other people's codebases than writing fresh ones.",
  },
  {
    n: "02",
    role: "Engineering",
    focus: "Applications and integrations.",
    detail:
      "Specializes in connecting systems that weren't built to talk to each other. Handles the parts of the work that don't photograph well but matter.",
  },
  {
    n: "03",
    role: "Design",
    focus: "Interface, brand, and interaction.",
    detail:
      "Draws the screens before they're built. Works directly with engineering so nothing gets lost in translation between Figma and code.",
  },
  {
    n: "04",
    role: "Operations",
    focus: "Client work, project delivery.",
    detail:
      "Runs the day-to-day: schedules, scope, and the actual delivery of work. The person who keeps everyone honest about deadlines.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Design and engineering share a table.",
    body: "The people who draw the screens sit next to the people who build them. Decisions get made in one conversation, not over three handoffs.",
  },
  {
    n: "02",
    title: "We write down what we promise.",
    body: "Scope, price, and timeline are put in writing before any work begins. If something changes mid-project, it gets discussed, not absorbed.",
  },
  {
    n: "03",
    title: "We build things we'd want to maintain.",
    body: "No shortcuts that save a week and cost a year. Every project gets documented, tested, and handed over in a state we'd be happy to inherit.",
  },
  {
    n: "04",
    title: "Direct access, always.",
    body: "The people who build your product are the same people you talk to. No account managers, no layers between you and the work.",
  },
];

const FACTS = [
  { label: "Founded", value: String(FOUNDED) },
  { label: "Based", value: "Remote" },
  { label: "Languages", value: "English, Nepali" },
  { label: "Working hours", value: "Flexible, overlap with US and EU" },
];

const TRACK = [
  {
    period: "Today",
    title: "Where we are",
    body: "Building software for companies that need it done properly. Every project runs end to end, from the first sketch to the final release.",
  },
  {
    period: "Approach",
    title: "How we work",
    body: "Every project gets the full attention of the team, from kickoff to launch. We run a deliberate roster so nothing gets rushed and nothing gets handed off.",
  },
  {
    period: "Long term",
    title: "How we grow",
    body: "We grow by getting better at the work, not by adding layers. The team scales with the quality of the output, never the other way around.",
  },
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

export default function StudioPage() {
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

      <main className="studio-page">
        {/* HERO */}
        <section className="studio-hero">
          <div className="cs-container">
            <h1 className="studio-hero-headline">
              <MaskIn>Built by people</MaskIn>
              <br />
              <MaskIn delay={0.08}>
                <em>who ship.</em>
              </MaskIn>
            </h1>
          </div>
        </section>

        {/* INTRO */}
        <section className="studio-section">
          <div className="cs-container">
            <Reveal className="studio-intro">
              <p className="studio-intro-lede">
                Code Square is a software studio. We design and build
                websites, applications, and custom software for
                companies that need them done properly.
              </p>
              <p className="studio-intro-body">
                We work on projects from beginning to end, with the same
                people who sketched the first wireframe also shipping
                the final release. No account managers. No offshore
                handoffs. Just a team that cares about the work and
                knows how to do it properly.
              </p>
            </Reveal>
          </div>
        </section>

        {/* TEAM */}
        <section className="studio-section">
          <div className="cs-container">
            <Reveal className="studio-head">
              <div className="studio-head-bar">
                <span className="studio-head-num">01</span>
                <span className="studio-head-label">The team</span>
              </div>
              <h2 className="studio-head-title">
                <MaskOnView>Who you&apos;ll actually work with.</MaskOnView>
              </h2>
            </Reveal>

            <div className="studio-team">
              {TEAM.map((t, i) => (
                <Reveal key={t.n} delay={i * 0.05} className="studio-member">
                  <div className="studio-member-head">
                    <span className="studio-member-num">{t.n}</span>
                    <span className="studio-member-role">{t.role}</span>
                  </div>
                  <h3 className="studio-member-focus">{t.focus}</h3>
                  <p className="studio-member-detail">{t.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="studio-section">
          <div className="cs-container">
            <Reveal className="studio-head">
              <div className="studio-head-bar">
                <span className="studio-head-num">02</span>
                <span className="studio-head-label">How we think</span>
              </div>
              <h2 className="studio-head-title">
                <MaskOnView>What we stand for.</MaskOnView>
              </h2>
            </Reveal>

            <div className="studio-principles">
              {PRINCIPLES.map((p, i) => (
                <Reveal
                  key={p.n}
                  delay={i * 0.05}
                  className="studio-principle"
                >
                  <span className="studio-principle-num">{p.n}</span>
                  <h3 className="studio-principle-title">{p.title}</h3>
                  <p className="studio-principle-body">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section className="studio-section">
          <div className="cs-container">
            <div className="studio-facts-grid">
              <Reveal className="studio-facts-left">
                <div className="studio-head-bar">
                  <span className="studio-head-num">03</span>
                  <span className="studio-head-label">The basics</span>
                </div>
                <h2 className="studio-head-title">
                  <MaskOnView>Quick facts.</MaskOnView>
                </h2>
                <p className="studio-facts-lede">
                  Everything on this page is true today. If something
                  changes, this page changes with it.
                </p>
              </Reveal>

              <Reveal delay={0.08} className="studio-facts-right">
                {FACTS.map((f) => (
                  <div key={f.label} className="studio-fact-row">
                    <span className="studio-fact-label">{f.label}</span>
                    <span className="studio-fact-value">{f.value}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRACK */}
        <section className="studio-section studio-section--alt">
          <div className="cs-container">
            <Reveal className="studio-head">
              <div className="studio-head-bar">
                <span className="studio-head-num">04</span>
                <span className="studio-head-label">The work</span>
              </div>
              <h2 className="studio-head-title">
                <MaskOnView>How we operate.</MaskOnView>
              </h2>
            </Reveal>

            <div className="studio-track">
              {TRACK.map((t, i) => (
                <Reveal
                  key={t.period}
                  delay={i * 0.06}
                  className="studio-track-row"
                >
                  <div className="studio-track-period">{t.period}</div>
                  <h3 className="studio-track-title">{t.title}</h3>
                  <p className="studio-track-body">{t.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="studio-section studio-section--dark cs-section--dark">
          <div className="studio-cta-bg" aria-hidden="true" />
          <div className="cs-container">
            <Reveal>
              <div className="studio-head-bar">
                <span className="studio-head-num">05</span>
                <span className="studio-head-label">Contact</span>
              </div>
              <h2 className="studio-cta-title">
                Want to work with us?
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="studio-cta-row">
              <a
                href="mailto:codesquare2026@gmail.com"
                className="studio-cta-email"
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