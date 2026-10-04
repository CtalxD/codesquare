//app/page.tsx
"use client";

import {
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./css/page.module.css";
import { icons, Illustration } from "./components/icons";

/* ============================================================
   Style helper
   ============================================================ */
const v = (o: Record<string, number | string>) =>
  o as unknown as CSSProperties;

/* ============================================================
   Content (edit here)
   ============================================================ */
const services = [
  {
    id: "ui-ux-design",
    t: "UI/UX design",
    d: "Research, flows and interfaces tested with real users before a line of code is written.",
    k: ["Product discovery", "Wireframes", "Design systems", "Prototypes"],
  },
  {
    id: "custom-software",
    t: "Custom software",
    d: "Portals, dashboards and internal tools shaped around how your team already works.",
    k: ["Web platforms", "Integrations", "Automation", "APIs"],
  },
  {
    id: "mobile-apps",
    t: "Mobile apps",
    d: "iOS and Android apps that feel native, launch quickly and stay easy to maintain.",
    k: ["iOS", "Android", "Cross-platform", "App store release"],
  },
  {
    id: "websites",
    t: "Websites",
    d: "Fast, accessible sites designed to load quickly, rank well and look right on every screen.",
    k: ["Marketing sites", "Accessibility", "Performance", "SEO"],
  },
];

const steps: [string, string][] = [
  ["Listen", "We start with your goals, your users and your constraints."],
  ["Design", "You click through a working prototype before we build anything."],
  ["Build", "We ship small releases every week so progress is never a mystery."],
  ["Support", "After launch we fix, improve and scale alongside you."],
];

const stack = [
  { g: "Design", t: ["Figma", "Framer", "Storybook"] },
  { g: "Web", t: ["React", "Next.js", "TypeScript", "Tailwind", "Vue"] },
  { g: "Mobile", t: ["React Native", "Flutter", "Swift", "Kotlin"] },
  {
    g: "Backend and cloud",
    t: ["Node.js", "Python", "Java", "PostgreSQL", "GraphQL", "AWS", "Docker"],
  },
];

const principles: [string, string][] = [
  [
    "Designers and engineers, together",
    "Both are in the conversation from day one, so the product you approve is the product we build.",
  ],
  [
    "Plain communication",
    "One point of contact, weekly demos and honest timelines. You always know where the project stands.",
  ],
  [
    "Small, steady releases",
    "We ship in slices you can test, which keeps risk low and feedback early.",
  ],
  [
    "Built to be maintained",
    "Clean code, written decisions and a proper handover, so you are never locked in.",
  ],
];

/* ---------- Team (real, alphabetical by first name) ---------- */
const team = [
  {
    n: "Prithak Rai",
    r: "Backend & System Architecture",
    img: "/pr.jpg",
  },
  {
    n: "Shrijan Thapa",
    r: "Project Manager & AI Engineer",
    img: "/sbt.jpg",
  },
  {
    n: "Sital Aryal",
    r: "Full Stack & UI/UX",
    img: "/si.jpeg",
  },
  {
    n: "Sudil Maharjan",
    r: "Frontend & UI/UX",
    img: "/sm.jpg",
  },
];

/* ---------- Hero copy ---------- */
const title = "We design and build software people actually use.".split(" ");

/* ---------- Sketch to shipped ---------- */
const stages: [string, string, number][] = [
  ["Sketch", "We start with boxes and arrows, so the layout is easy to question and cheap to change.", 0],
  ["Prototype", "You click through a working version before any real code is written.", 50],
  ["Shipped", "The site you approved is the one that goes live, polished and ready for visitors.", 100],
];

/* One website drawn twice: as a rough wireframe and as the finished design */
function ScreenUI({ done }: { done: boolean }) {
  return (
    <div className={styles.screen} data-kind={done ? "done" : "wire"}>
      <div className={styles.wChrome}>
        <i />
        <i />
        <i />
        <span className={styles.wUrl}>{done && "northbean.com"}</span>
      </div>
      <div className={styles.wBody}>
        <div className={styles.wNav}>
          <span className={styles.wLogo}>{done && "Northbean"}</span>
          <span className={styles.wLinks}>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={styles.wHero}>
          <div className={styles.wCopy}>
            <span className={styles.wHead}>
              {done && "Good coffee, made simple"}
            </span>
            <span className={styles.wSub}>
              {done && "Beans roasted weekly and sent to your door."}
            </span>
            <span className={styles.wCta}>{done && "Shop beans"}</span>
          </div>
          <div className={styles.wImg} />
        </div>
        <div className={styles.wCards}>
          {["Espresso", "Filter", "Decaf"].map((n) => (
            <span key={n}>{done && n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function Home() {
  const [mix, setMix] = useState(0);
  const stage = mix < 34 ? 0 : mix < 67 ? 1 : 2;

  return (
    <div className={styles.page}>
      <main>
        {/* ---------- HOME / Hero ---------- */}
        <section id="top" className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.title} aria-label={title.join(" ")}>
              {title.map((w, i) => (
                <span key={i} className={styles.mask} aria-hidden="true">
                  <span className={styles.w} style={v({ "--d": i })}>
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </h1>

            <p className={styles.lead}>
              Websites, mobile apps and custom software from Kathmandu, Nepal,
              for teams that need technology to fit the way they work.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.btn}>
                Start a project
              </Link>
              <a href="#services" className={styles.btnGhost}>
                What we build
              </a>
            </div>
          </div>

          <div
            className={styles.heroArt}
            role="group"
            aria-label="Tools and languages we work with"
          >
            <div className={styles.board}>
              {stack.map((c, gi) => (
                <div
                  key={c.g}
                  className={`${styles.group} ${styles["g" + gi]}`}
                  style={v({ "--k": gi })}
                >
                  <p className={styles.groupName}>{c.g}</p>
                  <ul className={styles.chips}>
                    {c.t.map((name, ci) => {
                      const Icon = icons[name];
                      return (
                        <li
                          key={name}
                          className={styles.tool}
                          style={v({ "--n": gi * 4 + ci })}
                        >
                          <Icon />
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- INTRODUCTION ---------- */}
        <section
          id="intro"
          className={styles.intro}
          aria-label="Introduction"
        >
          <div className={styles.introInner}>
            <div className={styles.introHead}>
              <h2 className={styles.introTitle}>
                Websites, mobile apps and custom software.
              </h2>
              <p className={styles.introText}>
                Code Square is a software and design studio. We build websites,
                mobile apps and custom software, and we stay accountable long
                after launch.
              </p>
            </div>

            <ul className={styles.introList}>
              {services.map((s, i) => (
                <li key={s.t} style={v({ "--i": i })}>
                  <Link
                    href={`/services#${s.id}`}
                    className={styles.introItem}
                  >
                    <span className={styles.introName}>{s.t}</span>
                    <span className={styles.introDesc}>{s.d}</span>
                    <span className={styles.introArrow} aria-hidden="true">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section id="services" className={styles.section}>
          <h2 className={styles.h2}>What we build</h2>

          <div className={styles.stack}>
            {services.map((s, i) => (
              <article
                key={s.t}
                className={`${styles.panel} ${styles["tone" + i]}`}
                style={v({ "--i": i })}
              >
                <div className={styles.panelInner}>
                  <div>
                    <h3 className={styles.h3}>{s.t}</h3>
                    <p className={styles.panelText}>{s.d}</p>
                    <ul className={styles.keys}>
                      {s.k.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.art}>
                    <Illustration kind={i} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <h3 className={`${styles.h2} ${styles.sub}`}>How we work</h3>
          <ol className={styles.steps}>
            {steps.map(([t, d], i) => (
              <li key={t} className={styles.step}>
                <span className={styles.num} aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h4 className={styles.stepTitle}>{t}</h4>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className={styles.section}>
          <h2 className={styles.h2}>A small team that owns the result</h2>
          <p className={styles.aboutLead}>
            Code Square is a software and design studio. We build websites,
            mobile apps and custom software, and we stay accountable long after
            launch.
          </p>

          <ul className={styles.rows}>
            {principles.map(([t, d]) => (
              <li key={t} className={styles.row}>
                <h3 className={styles.rowTitle}>{t}</h3>
                <p className={styles.rowText}>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- CRAFT: sketch to shipped ---------- */}
        <section id="craft" className={styles.craft} aria-labelledby="craft-title">
          <div className={styles.craftInner}>
            <div className={styles.craftText}>
              <h2 id="craft-title" className={styles.h2}>
                From sketch to shipped
              </h2>
              <p className={styles.craftLead}>
                Drag the slider and watch one website grow from a rough sketch
                into a finished design. It is the same path every project
                takes with us.
              </p>

              <div className={styles.stageBtns} role="group" aria-label="Project stage">
                {stages.map(([name, , at], i) => (
                  <button
                    key={name}
                    type="button"
                    className={styles.stageBtn}
                    aria-pressed={stage === i}
                    onClick={() => setMix(at)}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <input
                className={styles.range}
                type="range"
                min={0}
                max={100}
                value={mix}
                onChange={(e) => setMix(Number(e.target.value))}
                aria-label="Move the project from sketch to shipped"
                aria-valuetext={stages[stage][0]}
              />

              <p className={styles.stageNote} aria-live="polite">
                {stages[stage][1]}
              </p>
            </div>

            <div className={styles.device} style={v({ "--t": mix / 100 })} aria-hidden="true">
              <ScreenUI done={false} />
              <ScreenUI done />
            </div>
          </div>
        </section>

        {/* ---------- TEAM ---------- */}
        <section id="team" className={styles.team} aria-label="Our team">
          <div className={styles.teamHead}>
            <span className={styles.teamKicker}>The team</span>
            <span className={styles.teamRule} aria-hidden="true" />
          </div>

          <div className={styles.teamGrid}>
            <ul className={styles.teamPhotos}>
              {team.map((m, i) => (
                <li
                  key={m.n}
                  className={`${styles.teamPhoto} ${styles["p" + i]}`}
                  style={v({ "--m": i })}
                >
                  {m.img ? (
                    <Image
                      src={m.img}
                      alt={m.n}
                      fill
                      sizes="(max-width: 1000px) 46vw, 240px"
                      quality={90}
                    />
                  ) : (
                    <span
                      className={styles.teamInitial}
                      role="img"
                      aria-label={m.n}
                    >
                      {m.n
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.teamInfo}>
              <h3 className={styles.teamTitle}>
                Four specialists, one team.
              </h3>
              <p className={styles.teamText}>
                You work directly with the people building your product - no
                account managers, no handoffs. Every project is staffed end to
                end by the same four: design, frontend, backend and delivery.
              </p>
              <Link href="/contact" className={styles.teamBtn}>
                Work with us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}