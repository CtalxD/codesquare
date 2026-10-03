//app/services/page.tsx
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import styles from "../css/services.module.css";
import { icons, tileIcons, Illustration } from "../components/icons";

/* ============================================================
   Style helper
   ============================================================ */
const v = (o: Record<string, number | string>) =>
  o as unknown as CSSProperties;

/* ============================================================
   Content (edit here)
   ============================================================ */

/* Where every "Start a project" button goes. Change to your real
   contact page, or a mailto: link. */
const CONTACT_HREF = "/contact";

const services = [
  {
    id: "ui-ux-design",
    t: "UI/UX design",
    d: "Research, flows and interfaces tested with real users before a line of code is written.",
    out: "You approve a clickable prototype that real users have already tried.",
    k: ["Product discovery", "Wireframes", "Design systems", "Prototypes"],
    tools: ["Figma", "Framer", "Storybook"],
  },
  {
    id: "custom-software",
    t: "Custom software",
    d: "Portals, dashboards and internal tools shaped around how your team already works.",
    out: "One tool that replaces the spreadsheets and workarounds your team juggles today.",
    k: ["Web platforms", "Integrations", "Automation", "APIs"],
    tools: ["Node.js", "Python", "Java", "PostgreSQL", "GraphQL", "AWS", "Docker"],
  },
  {
    id: "mobile-apps",
    t: "Mobile apps",
    d: "iOS and Android apps that feel native, launch quickly and stay easy to maintain.",
    out: "A fast, native-feeling app in the stores, ready to grow with your users.",
    k: ["iOS", "Android", "Cross-platform", "App store release"],
    tools: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "websites",
    t: "Websites",
    d: "Fast, accessible sites designed to load quickly, rank well and look right on every screen.",
    out: "A site that loads quickly, ranks well and works on every device.",
    k: ["Marketing sites", "Accessibility", "Performance", "SEO"],
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Vue"],
  },
];

const steps: [string, string, string][] = [
  ["Listen", "We start with your goals, your users and your constraints.", "A clear brief"],
  ["Design", "You click through a working prototype before we build anything.", "A clickable prototype"],
  ["Build", "We ship small releases every week so progress is never a mystery.", "Working releases every week"],
  ["Support", "After launch we fix, improve and scale alongside you.", "Fixes, updates and room to scale"],
];

const principles = [
  "Designers and engineers, together",
  "Plain communication",
  "Small, steady releases",
  "Built to be maintained",
];

const titleLines = ["What we", "build"];

/* ============================================================
   Page
   ============================================================ */
export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(services[0].id);

  /* Highlight the service currently in view in the sticky sub-nav */
  useEffect(() => {
    const els = services
      .map((x) => document.getElementById(x.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setCurrent(entry.target.id),
        ),
      { rootMargin: "-40% 0px -50% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", (x / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", (y / r.height - 0.5).toFixed(3));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ---------- HERO (full screen) ---------- */}
        <section
          ref={heroRef}
          className={styles.hero}
          onPointerMove={onMove}
          onPointerEnter={(e) => (e.currentTarget.dataset.active = "1")}
          onPointerLeave={(e) => delete e.currentTarget.dataset.active}
        >
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.gridLit} aria-hidden="true" />
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.cursor} aria-hidden="true" />

          <div className={styles.heroLeft}>
            <h1 className={styles.title} aria-label={titleLines.join(" ")}>
              {titleLines.map((l, i) => (
                <span key={l} className={styles.line} aria-hidden="true">
                  <span className={styles.lineIn} style={v({ "--d": i })}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>

            <ul className={styles.tileRow} aria-label="Jump to a service">
              {services.map((s, i) => {
                const Icon = tileIcons[i];
                return (
                  <li key={s.id} style={v({ "--n": i })}>
                    <a href={`#${s.id}`} className={styles.tile}>
                      <span className={styles.tileIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <span>{s.t}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className={styles.about} aria-label="What we do">
            <p className={styles.aboutKicker}>What we do</p>
            <h2 className={styles.aboutTitle}>Good software is quiet.</h2>
            <p className={styles.aboutText}>
              It removes steps, answers questions before they are asked, and
              keeps working long after launch. That is what we build.
            </p>
            <p className={styles.aboutText}>
              Websites, mobile apps and custom software for teams that need
              technology to fit the way they work.
            </p>

            <ul className={styles.aboutList}>
              {principles.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <a href={CONTACT_HREF} className={styles.aboutBtn}>
              Start a project
            </a>
          </aside>

          <span className={styles.scrollLine} aria-hidden="true" />
        </section>

        {/* ---------- SERVICES ---------- */}
        <section className={styles.services} aria-label="Our services">
          <div className={styles.svcWrap}>
            <h2 className={styles.h2}>Our services</h2>

            <nav className={styles.subnav} aria-label="Services">
              {services.map((x) => (
                <a
                  key={x.id}
                  href={`#${x.id}`}
                  className={`${styles.pill} ${current === x.id ? styles.pillOn : ""}`}
                  aria-current={current === x.id ? "true" : undefined}
                >
                  {x.t}
                </a>
              ))}
            </nav>

            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={`${styles.svc} ${styles["tone" + i]}`}
              >
                <div className={styles.svcSide}>
                  <h3 className={styles.svcName}>{s.t}</h3>
                  <p className={styles.svcDesc}>{s.d}</p>
                  <p className={styles.svcOut}>{s.out}</p>
                  <a href={CONTACT_HREF} className={styles.svcLink}>
                    Start a project
                  </a>
                </div>

                <div className={styles.svcMain}>
                  <div className={styles.svcArt}>
                    <div className={styles.svcIll}>
                      <Illustration kind={i} />
                    </div>
                  </div>

                  <div className={styles.cols}>
                    <div>
                      <h4 className={styles.colTitle}>Included</h4>
                      <ul className={styles.checks}>
                        {s.k.map((k) => (
                          <li key={k}>{k}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={styles.colTitle}>Built with</h4>
                      <ul className={styles.chips}>
                        {s.tools.map((name) => {
                          const Icon = icons[name];
                          return (
                            <li key={name} className={styles.chip}>
                              <Icon />
                              {name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- HOW WE WORK ---------- */}
        <section className={styles.process} aria-label="How we work">
          <div className={styles.processWrap}>
            <h2 className={`${styles.h2} ${styles.h2Light}`}>How we work</h2>

            <ol className={styles.steps}>
              {steps.map(([t, d, o], i) => (
                <li key={t} className={styles.step} style={v({ "--s": i })}>
                  <span className={styles.num} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className={styles.stepTitle}>{t}</h3>
                  <p>{d}</p>
                  <p className={styles.get}>
                    <strong>You get</strong> {o}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}