//app/about/page.tsx
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../css/about.module.css";

/* ============================================================
   Style helper
   ============================================================ */
const v = (o: Record<string, number | string>) =>
  o as unknown as CSSProperties;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/* ============================================================
   Content (edit here)
   ============================================================ */
const heading = "A small team that owns the result".split(" ");

/* ---------- Team (alphabetical by first name) ---------- */
const team = [
  {
    n: "Prithak Rai",
    r: "Backend & System Architecture",
    line: "Designs the systems and services that sit behind every product we ship.",
    img: "/pr.jpg",
  },
  {
    n: "Shrijan Thapa",
    r: "Project Manager & AI Engineer",
    line: "Keeps every project moving week by week and brings AI into the products that need it.",
    img: "/sbt.jpg",
  },
  {
    n: "Sital Aryal",
    r: "Full Stack & UI/UX",
    line: "Works across the whole stack, from the first wireframe to the final deployment.",
    img: "/si.jpeg",
  },
  {
    n: "Sudil Maharjan",
    r: "Frontend & UI/UX",
    line: "Builds the interfaces people see and use, with accessibility and speed in mind.",
    img: "/sm.jpg",
  },
];

const initials = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .join("");

/* ============================================================
   Closing card: a pixel grid you can sketch on.
   Squares light up where the pointer passes and fade out again.
   When nobody is drawing, a slow pen sketches a loop on its own.
   ============================================================ */
function Closing() {
  const card = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = card.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = 30;
    const GAP = 4;
    const LIFE = 2.2; // seconds a lit square takes to fade out

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let raf = 0;
    let running = false;
    let prev = 0;
    let lastInput = -1e9;

    type Pt = { x: number; y: number } | null;
    let user: Pt = null;
    let auto: Pt = null;

    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      heat = new Float32Array(cols * rows);
    };

    /* light the square under (x, y) and, more softly, its neighbours */
    const stamp = (x: number, y: number, power: number) => {
      const cx = Math.floor(x / CELL);
      const cy = Math.floor(y / CELL);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const gx = cx + dx;
          const gy = cy + dy;
          if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) continue;
          const d = Math.abs(dx) + Math.abs(dy);
          const val = power * (d === 0 ? 1 : d === 1 ? 0.5 : 0.2);
          const i = gy * cols + gx;
          if (val > heat[i]) heat[i] = val;
        }
      }
    };

    /* draw a continuous stroke, so fast movement leaves no gaps */
    const pen = (from: Pt, x: number, y: number, power: number): Pt => {
      if (!from) {
        stamp(x, y, power);
      } else {
        const dx = x - from.x;
        const dy = y - from.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (CELL / 2)));
        for (let s = 1; s <= steps; s++) {
          stamp(from.x + (dx * s) / steps, from.y + (dy * s) / steps, power);
        }
      }
      return { x, y };
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      user = pen(user, e.clientX - r.left, e.clientY - r.top, 1);
      lastInput = performance.now();
      setTouched(true);
    };
    const onLeave = () => {
      user = null;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (!reduce && now - lastInput > 2200) {
        const t = now / 1000;
        auto = pen(
          auto,
          w * (0.5 + 0.42 * Math.sin(t * 0.55)),
          h * (0.5 + 0.36 * Math.sin(t * 0.83 + 1.3)),
          0.9,
        );
      } else {
        auto = null;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const size = CELL - GAP;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * CELL + GAP / 2;
          const y = r * CELL + GAP / 2;

          ctx.fillStyle = "rgba(198,210,178,0.05)";
          ctx.fillRect(x, y, size, size);

          const v = heat[i];
          if (v > 0.01) {
            ctx.fillStyle = `rgba(198,210,178,${(v * 0.3).toFixed(3)})`;
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = `rgba(198,210,178,${(v * 0.9).toFixed(3)})`;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(x + 0.75, y + 0.75, size - 1.5, size - 1.5);
            heat[i] = Math.max(0, v - dt / LIFE);
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.close} aria-label="Work with us">
      <div ref={card} className={styles.closeCard}>
        <canvas ref={canvas} className={styles.sketch} aria-hidden="true" />

        <div className={styles.closeText}>
          <p className={styles.place}>Start with a sketch</p>

          <h2 className={styles.closeTitle}>Tell us what you are building.</h2>

          <div className={styles.closeActions}>
            <Link href="/contact" className={styles.closeBtn}>
              Start a project
            </Link>
            <Link href="/services" className={styles.closeGhost}>
              See our services
            </Link>
          </div>
        </div>

        <p className={styles.hint} data-hidden={touched} aria-hidden="true">
          Sketch on the grid
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function AboutPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scenes = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);


  /* Team: every member is driven directly by scroll position.
     s = how many screens we have scrolled into the pinned track.
     Member i enters (--e: 0 -> 1) as s goes i-0.9 -> i+0.1,
     and leaves (--x: 0 -> 1) as s goes i+0.15 -> i+0.6.
     Scrolling back up plays everything in reverse. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const last = team.length - 1;
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const s = -track.getBoundingClientRect().top / vh;

      let best = 0;
      let bestVis = -1;

      scenes.current.forEach((el, i) => {
        if (!el) return;
        const e = clamp(s - i + 0.9);
        const x = i === last ? 0 : clamp((s - i - 0.15) / 0.45);
        el.style.setProperty("--e", e.toFixed(3));
        el.style.setProperty("--x", x.toFixed(3));

        const vis = e * (1 - x);
        if (vis > bestVis) {
          bestVis = vis;
          best = i;
        }
      });

      setActive(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Jump to the scroll position where member i is fully shown */
  const goTo = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      scenes.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (i + 0.12) * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.page}>
      <main>
        {/* ---------- HERO (full screen) ---------- */}
        <section className={styles.hero}>
          <div className={styles.heroBody}>
            <p className={styles.studio}>
              Code Square is a software and design studio.
            </p>

            <h1 className={styles.title} aria-label={heading.join(" ")}>
              {heading.map((w, i) => (
                <span
                  key={i}
                  className={styles.word}
                  style={v({ "--d": i })}
                  aria-hidden="true"
                >
                  {w}{" "}
                </span>
              ))}
            </h1>

            <p className={styles.lead}>
              You work directly with the people building your product - no
              account managers, no handoffs. Every project is staffed end to end
              by the same four: design, frontend, backend and delivery.
            </p>

            <a href="#team" className={styles.heroBtn}>
              Meet the team
            </a>
          </div>

          <ul className={styles.tiles} aria-label="The team">
            {team.map((m, i) => (
              <li key={m.n} className={styles["h" + i]} style={v({ "--n": i })}>
                <a
                  href={`#member-${i}`}
                  className={styles.tile}
                  onClick={goTo(i)}
                  aria-label={m.n}
                >
                  {m.img ? (
                    <Image
                      src={m.img}
                      alt=""
                      fill
                      sizes="(max-width: 1000px) 40vw, 240px"
                      quality={90}
                      priority
                    />
                  ) : (
                    <span className={styles.tileInitial} aria-hidden="true">
                      {initials(m.n)}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- TEAM (scroll-driven, one member at a time) ---------- */}
        <section id="team" className={styles.team} aria-label="Our team">
          <header className={styles.teamHead}>
            <h2 className={styles.teamTitle}>Four specialists, one team.</h2>
            <p className={styles.teamSub}>
              Design, frontend, backend and delivery.
            </p>
          </header>

          <div
            ref={trackRef}
            className={styles.track}
            style={v({ "--count": team.length + 1 })}
          >
            <div className={styles.stage}>
              <ul className={styles.rail} aria-label="Team progress">
                {team.map((m, i) => (
                  <li key={m.n}>
                    <a
                      href={`#member-${i}`}
                      onClick={goTo(i)}
                      className={`${styles.dot} ${active === i ? styles.dotOn : ""}`}
                      aria-label={m.n}
                      aria-current={active === i ? "true" : undefined}
                    />
                  </li>
                ))}
              </ul>

              {team.map((m, i) => (
                <article
                  key={m.n}
                  id={`member-${i}`}
                  ref={(el) => {
                    scenes.current[i] = el;
                  }}
                  className={`${styles.scene} ${i % 2 ? styles.flip : ""} ${styles["tone" + (i % 4)]}`}
                  aria-hidden={active === i ? undefined : "true"}
                >
                  <div className={styles.photoWrap}>
                    <span className={styles.back} aria-hidden="true" />
                    <div className={styles.photo}>
                      {m.img ? (
                        <Image
                          src={m.img}
                          alt={m.n}
                          fill
                          sizes="(max-width: 1000px) 80vw, 520px"
                          quality={90}
                          loading="eager"
                        />
                      ) : (
                        <span
                          className={styles.initial}
                          role="img"
                          aria-label={m.n}
                        >
                          {initials(m.n)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.info}>
                    <h3 className={styles.name}>
                      {m.n.split(" ").map((part, pi) => (
                        <span key={part} className={styles.mask}>
                          <span
                            className={styles.maskIn}
                            style={v({ "--i": pi })}
                          >
                            {part}
                          </span>
                        </span>
                      ))}
                    </h3>

                    <p className={styles.role}>
                      <span className={styles.mask}>
                        <span className={styles.maskIn} style={v({ "--i": 2 })}>
                          {m.r}
                        </span>
                      </span>
                    </p>

                    <p className={styles.line}>{m.line}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CLOSING ---------- */}
        <Closing />
      </main>
    </div>
  );
}