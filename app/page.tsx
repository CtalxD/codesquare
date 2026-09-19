"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import "./css/page.css";

/* =========================================================
   ██  EDIT BELOW  ██
========================================================= */

const POSITIONING =
  "A software studio building websites, applications, and custom software.";

const AUDIENCE =
  "For companies that need software built properly, on time.";

const CAPABILITIES = [
  {
    n: "01",
    title: "Websites",
    body: "Marketing sites, landing pages, and content platforms. Designed and built to load fast and last.",
    tags: ["Marketing", "Content", "Platforms"],
  },
  {
    n: "02",
    title: "Applications",
    body: "Web apps, dashboards, and internal tools built around how your team actually works.",
    tags: ["Dashboards", "Portals", "Tools"],
  },
  {
    n: "03",
    title: "Custom software",
    body: "Cross-platform mobile apps and purpose-built systems, from first sketch to shipped product.",
    tags: ["Mobile", "Systems", "Integrations"],
  },
];

const STUDIO_TEASER =
  "We think design and engineering are the same conversation held at different resolutions. So we hold it in one room. The same people who sketch the interface also ship the code.";

const CONTACT_EMAIL = "codesquare2026@gmail.com";

const FOUNDED = new Date().getFullYear();

/* =========================================================
   ██  DO NOT EDIT BELOW  ██
========================================================= */

const VIEWPORT_OPTS = {
  once: true,
  amount: 0.05,
  margin: "0px 0px -40px 0px" as const,
};

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
      viewport={VIEWPORT_OPTS}
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
        viewport={VIEWPORT_OPTS}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(false);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  return (
    <section
      id="top"
      ref={ref}
      className="cs-hero"
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="cs-hero-bg" aria-hidden="true">
        <div className="cs-hero-bg-base" />
        <motion.div
          className="cs-hero-bg-glow"
          animate={{
            opacity: active ? 1 : 0.5,
            background: `radial-gradient(700px circle at ${mouse.x * 100}% ${
              mouse.y * 100
            }%, rgba(30, 58, 138, 0.22), rgba(30, 58, 138, 0.06) 35%, transparent 65%)`,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="cs-hero-bg-grid" />
      </div>

      <div className="cs-container">
        <h1 className="cs-hero-headline">
          <span className="cs-hero-line">
            <MaskIn>Software, built</MaskIn>
          </span>
          <span className="cs-hero-line">
            <MaskIn delay={0.08}>like it was</MaskIn>
          </span>
          <span className="cs-hero-line">
            <MaskIn delay={0.16}>
              <em>meant</em> to be.
            </MaskIn>
          </span>
        </h1>

        <motion.div
          className="cs-hero-foot"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cs-hero-foot-label">Introduction</div>
          <div className="cs-hero-foot-body">
            <p className="cs-hero-lede">{POSITIONING}</p>
            <p className="cs-hero-sub">{AUDIENCE}</p>
            <div className="cs-hero-actions">
              <Link
                href="/contact"
                className="cs-btn cs-btn--primary"
                data-cursor="action"
              >
                Start a project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/capabilities"
                className="cs-btn cs-btn--ghost"
                data-cursor="nav"
              >
                See capabilities
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="cs-section">
      <div className="cs-container">
        <Reveal className="cs-head">
          <h2 className="cs-head-title">
            <MaskOnView>What we build.</MaskOnView>
          </h2>
        </Reveal>

        <div className="cs-cap-list">
          {CAPABILITIES.map((c) => (
            <Link
              href="/capabilities"
              key={c.n}
              className="cs-cap-row"
              data-cursor="row"
            >
              <span className="cs-cap-bar" aria-hidden="true" />
              <span className="cs-cap-glow" aria-hidden="true" />
              <div className="cs-cap-grid">
                <div className="cs-cap-left">
                  <span className="cs-cap-num">{c.n}</span>
                  <h3 className="cs-cap-title">{c.title}</h3>
                </div>
                <div className="cs-cap-right">
                  <p className="cs-cap-body">{c.body}</p>
                  <div className="cs-cap-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="cs-cap-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="cs-cap-cta">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioTeaser() {
  return (
    <section id="studio" className="cs-section">
      <div className="cs-container">
        <Reveal className="cs-head">
          <h2 className="cs-head-title">
            <MaskOnView>One room.</MaskOnView>
          </h2>
        </Reveal>

        <Reveal className="cs-studio">
          <p className="cs-studio-text">{STUDIO_TEASER}</p>
          <Link
            href="/studio"
            className="cs-btn cs-btn--ghost"
            data-cursor="nav"
          >
            Read the studio page
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="contact"
      className="cs-section cs-section--dark cs-section--last"
    >
      <div className="cs-cta-bg" aria-hidden="true" />
      <div className="cs-container">
        <Reveal>
          <h2 className="cs-cta-title">
            Tell us what
            <br />
            you&apos;re building.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="cs-cta-row">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="cs-cta-email"
            data-cursor="email"
          >
            {CONTACT_EMAIL}
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
  );
}

export default function Page() {
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

      <main>
        <Hero />
        <Capabilities />
        <StudioTeaser />
        <CTA />
      </main>
    </>
  );
}