//app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";
import styles from "./css/page.module.css";

const SERVICES = [
  {
    n: "01",
    title: "Website Development",
    text: "Fast, responsive sites that load quickly and read clearly on any device. Built to be found on Google and easy for your team to update.",
    href: "/services#website",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "Mobile App Development",
    text: "Android and iOS apps for customers or internal teams. One codebase, two platforms, no wasted effort.",
    href: "/services#mobile",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Custom Software",
    text: "Inventory, billing, CRM, dashboards - the tools your team runs on, shaped around how you actually work.",
    href: "/services#software",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "UI / UX Design",
    text: "Interfaces people understand without a manual. Designed for real users, tested before build.",
    href: "/services#design",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1400&q=80&auto=format&fit=crop",
  },
];

const SPLIT_ROWS = [
  {
    eyebrow: "Discovery first",
    title: "We start by listening.",
    text: "Before we write anything, we sit down with you - a call or two, sometimes more - to understand how your business actually runs. What's slowing you down, what your customers need, what success looks like. Then we put it in writing.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
    reversed: false,
  },
  {
    eyebrow: "Built together",
    title: "You see progress every week.",
    text: "We build in short cycles and share working versions as we go. You can try things early, give feedback, and course-correct while it's cheap - instead of waiting until launch to see what you got.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
    reversed: true,
  },
  {
    eyebrow: "After launch",
    title: "We stick around.",
    text: "Software needs care. We're reachable for fixes, updates, and small improvements long after go-live. No disappearing after the invoice clears.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80&auto=format&fit=crop",
    reversed: false,
  },
];

const TEAM_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80&auto=format&fit=crop",
];

const PROCESS_STEPS = [
  {
    n: "01",
    t: "Discover",
    d: "Calls, questions, and a written scope. You know what we're building before we start.",
    Icon: Compass,
  },
  {
    n: "02",
    t: "Design",
    d: "Clickable layouts and flows. We revise together before code.",
    Icon: PenTool,
  },
  {
    n: "03",
    t: "Develop",
    d: "Weekly builds you can test. Feedback early, not at the end.",
    Icon: Code2,
  },
  {
    n: "04",
    t: "Deliver",
    d: "Launch, handover, and a walkthrough for your team. Then we stay reachable.",
    Icon: Rocket,
  },
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    TEAM_PHOTOS.map(() => false)
  );

  const toggleReveal = (index: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

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
        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        gsap.set(heroLines, { yPercent: 110, opacity: 0 });
        gsap.to(heroLines, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.1,
        });

        const heroFades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        gsap.set(heroFades, { y: 20, opacity: 0 });
        gsap.to(heroFades, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.5,
        });

        gsap.to("[data-hero-image]", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.set("[data-intro-line]", { yPercent: 100, opacity: 0 });
        gsap.to("[data-intro-line]", {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-intro]", start: "top 85%" },
        });

        gsap.set("[data-intro-body] > p, [data-intro-body] > a", {
          y: 20,
          opacity: 0,
        });
        gsap.to("[data-intro-body] > p, [data-intro-body] > a", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-intro]", start: "top 80%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((block) => {
          const words = block.querySelectorAll("[data-fill-word]");
          if (!words.length) return;

          gsap.set(words, { opacity: 0.15 });
          gsap.to(words, {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          });
        });

        const serviceSection = document.querySelector<HTMLElement>(
          "[data-services]"
        );
        const serviceItems = gsap.utils.toArray<HTMLElement>(
          "[data-service-item]"
        );
        const serviceImages = gsap.utils.toArray<HTMLElement>(
          "[data-service-image]"
        );
        const serviceCounter = document.querySelector<HTMLElement>(
          "[data-service-counter]"
        );

        if (serviceSection && serviceItems.length && serviceImages.length) {
          const setActive = (idx: number) => {
            const clamped = Math.max(0, Math.min(SERVICES.length - 1, idx));
            serviceItems.forEach((el, i) =>
              el.classList.toggle(styles.active, i === clamped)
            );
            serviceImages.forEach((el, i) =>
              el.classList.toggle(styles.active, i === clamped)
            );
            if (serviceCounter) {
              serviceCounter.textContent = String(clamped + 1).padStart(2, "0");
            }
          };

          setActive(0);

          ScrollTrigger.create({
            trigger: serviceSection,
            start: "top top",
            end: "bottom bottom",
            pin: "[data-services-sticky]",
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.floor(self.progress * SERVICES.length);
              setActive(idx);
            },
          });

          gsap.set("[data-service-item]", { y: 24, opacity: 0 });
          ScrollTrigger.create({
            trigger: serviceSection,
            start: "top 70%",
            once: true,
            onEnter: () => {
              gsap.to("[data-service-item]", {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.1,
                onComplete: () => {
                  gsap.set("[data-service-item]", {
                    clearProps: "opacity,transform",
                  });
                  setActive(0);
                },
              });
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((row) => {
          const media = row.querySelector("[data-split-media]");
          const img = row.querySelector("[data-split-img]");
          const content = row.querySelectorAll("[data-split-content] > *");

          if (media) {
            gsap.fromTo(
              media,
              { clipPath: "inset(100% 0 0 0)" },
              {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: { trigger: row, start: "top 85%" },
              }
            );
          }
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.12 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          }
          if (content.length) {
            gsap.set(content, { y: 24, opacity: 0 });
            gsap.to(content, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: row, start: "top 80%" },
            });
          }
        });

        const rail = document.querySelector("[data-timeline-rail]");
        if (rail) {
          gsap.fromTo(
            rail,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-timeline]",
                start: "top 80%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            }
          );
        }

        gsap.set("[data-timeline-step]", { y: 30, opacity: 0 });
        gsap.to("[data-timeline-step]", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: "[data-timeline]", start: "top 80%" },
        });

        gsap.set("[data-team-photo]", { y: 40, opacity: 0, scale: 0.94 });
        gsap.to("[data-team-photo]", {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-team]", start: "top 80%" },
        });

        gsap.set("[data-team-content] > *", { y: 20, opacity: 0 });
        gsap.to("[data-team-content] > *", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-team]", start: "top 80%" },
        });

        gsap.fromTo(
          "[data-cta-image]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-cta]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );

        gsap.set("[data-cta-content] > *", { y: 20, opacity: 0 });
        gsap.to("[data-cta-content] > *", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-cta]", start: "top 80%" },
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

  return (
    <div ref={rootRef}>
      <main id="main" className={styles.page}>
        {/* HERO */}
        <section className={styles.hero} data-hero>
          <div className={styles.heroImage} data-hero-image aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=2000&q=80&auto=format&fit=crop"
              alt=""
              className={styles.heroImageInner}
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow} data-hero-fade>
              Software studio — Kathmandu, Nepal
            </span>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>
                <span data-hero-line>We build the digital</span>
              </span>
              <span className={styles.heroLine}>
                <span data-hero-line>tools your business</span>
              </span>
              <span className={styles.heroLine}>
                <span data-hero-line>needs to grow.</span>
              </span>
            </h1>

            <p className={styles.heroLead} data-hero-fade>
              Code Square is a four-person studio building websites, mobile
              apps, and custom software for businesses in Nepal and abroad.
            </p>

            <div className={styles.heroActions} data-hero-fade>
              <Link href="/contact" className={styles.btnPrimary}>
                Get a Free Consultation
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link href="/services" className={styles.btnGhost}>
                See what we do
              </Link>
            </div>

            <div className={styles.heroMeta} data-hero-fade>
              <span>Web</span>
              <span className={styles.dot} />
              <span>Apps</span>
              <span className={styles.dot} />
              <span>Software</span>
              <span className={styles.dot} />
              <span>Design</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className={styles.intro} data-intro>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introIndex}>
                <span className={styles.introIndexNum}>01</span>
                <span className={styles.introIndexLine} aria-hidden="true" />
                <span className={styles.introIndexLabel}>Introduction</span>
              </div>

              <div className={styles.introBody} data-intro-body>
                <h2 className={styles.introTitle}>
                  <span className={styles.maskLine}>
                    <span data-intro-line>An IT company that</span>
                  </span>
                  <span className={styles.maskLine}>
                    <span data-intro-line>treats your software</span>
                  </span>
                  <span className={styles.maskLine}>
                    <span data-intro-line>like our own.</span>
                  </span>
                </h2>
                <p className={styles.introText}>
                  Code Square Pvt. Ltd. is a Nepal-based software company
                  started in 2026 by four friends who&rsquo;d been building
                  products together for years. We work with local businesses,
                  startups, and international clients who want software that
                  actually fits how they operate.
                </p>
                <p className={styles.introText}>
                  Our work spans four areas: <em>websites</em>,{" "}
                  <em>mobile apps</em>, <em>custom software</em>, and{" "}
                  <em>UI/UX design</em>. Small enough to move fast, structured
                  enough to deliver.
                </p>
                <Link href="/about" className={styles.inlineLink}>
                  More about us
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PINNED SERVICES */}
        <section
          className={styles.pinned}
          data-services
          aria-labelledby="services-title"
        >
          <div className={styles.pinnedSticky} data-services-sticky>
            <div className={styles.pinnedInner}>
              <header className={styles.pinnedHead}>
                <span className={styles.sectionLabel}>What we do</span>
                <h2
                  id="services-title"
                  className={styles.pinnedTitle}
                  data-fill
                >
                  <FillWords text="Four services. Done properly." />
                </h2>
              </header>

              <div className={styles.pinnedLayout}>
                <div className={styles.pinnedVisual}>
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.n}
                      className={`${styles.pinnedImageWrap} ${
                        i === 0 ? styles.active : ""
                      }`}
                      data-service-image
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt=""
                        className={styles.pinnedImage}
                      />
                    </div>
                  ))}

                  <span className={styles.pinnedCounter} aria-hidden="true">
                    <span
                      className={styles.pinnedCounterNum}
                      data-service-counter
                    >
                      01
                    </span>
                    <span className={styles.pinnedCounterTotal}>
                      / {String(SERVICES.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>

                <ol className={styles.pinnedList}>
                  {SERVICES.map((s, i) => (
                    <li
                      key={s.n}
                      className={`${styles.pinnedItem} ${
                        i === 0 ? styles.active : ""
                      }`}
                      data-service-item
                    >
                      <div className={styles.pinnedItemHead}>
                        <span className={styles.pinnedNum}>{s.n}</span>
                        <h3 className={styles.pinnedItemTitle}>{s.title}</h3>
                      </div>
                      <p className={styles.pinnedItemText}>{s.text}</p>
                      <Link href={s.href} className={styles.pinnedLink}>
                        Get a quote
                        <ArrowRight
                          size={14}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* SPLIT ROWS */}
        <section className={styles.splits}>
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <span className={styles.sectionLabel}>How we work</span>
              <h2 className={styles.sectionTitle} data-fill>
                <FillWords text="A small team, working close to you." />
              </h2>
            </header>

            {SPLIT_ROWS.map((row) => (
              <div
                key={row.title}
                className={`${styles.split} ${
                  row.reversed ? styles.splitReverse : ""
                }`}
                data-split
              >
                <div className={styles.splitMedia} data-split-media>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.image}
                    alt=""
                    className={styles.splitImage}
                    data-split-img
                  />
                </div>
                <div className={styles.splitContent} data-split-content>
                  <span className={styles.splitEyebrow}>{row.eyebrow}</span>
                  <h3 className={styles.splitTitle}>{row.title}</h3>
                  <p className={styles.splitText}>{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.container}>
            <header className={styles.sectionHead}>
              <span className={styles.sectionLabel}>Our process</span>
              <h2
                id="process-title"
                className={styles.sectionTitle}
                data-fill
              >
                <FillWords text="Four steps. No surprises." />
              </h2>
            </header>

            <ol className={styles.timeline} data-timeline>
              <span
                className={styles.timelineRail}
                data-timeline-rail
                aria-hidden="true"
              />
              {PROCESS_STEPS.map((s) => {
                const Icon = s.Icon;
                return (
                  <li
                    key={s.n}
                    className={styles.timelineStep}
                    data-timeline-step
                  >
                    <span className={styles.timelineMarker} aria-hidden="true">
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span className={styles.timelineIndex}>Step {s.n}</span>
                    <h3 className={styles.timelineTitle}>{s.t}</h3>
                    <p className={styles.timelineText}>{s.d}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* TEAM */}
        <section className={styles.team} data-team aria-labelledby="team-title">
          <div className={styles.container}>
            <div className={styles.teamGrid}>
              <div className={styles.teamVisual}>
                <div className={styles.teamImages}>
                  {TEAM_PHOTOS.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      className={styles.teamPhoto}
                      data-slot={i + 1}
                      data-team-photo
                      aria-label={`Reveal color for team member ${i + 1}`}
                      aria-pressed={revealed[i]}
                      onClick={() => toggleReveal(i)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className={styles.teamPhotoInner}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.teamContent} data-team-content>
                <span className={styles.sectionLabel}>The people</span>
                <h2 id="team-title" className={styles.sectionTitle}>
                  Four friends. One company.
                </h2>
                <p className={styles.sectionLead}>
                  Code Square started because four of us wanted to build
                  software the way we wished more agencies did - carefully,
                  honestly, and without the sales pitch.
                </p>
                <Link href="/about#team" className={styles.inlineLink}>
                  Meet the team
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaBand} data-cta>
          <div className={styles.ctaImage} data-cta-image aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=2000&q=80&auto=format&fit=crop"
              alt=""
              className={styles.ctaImageInner}
            />
            <div className={styles.ctaImageOverlay} />
          </div>

          <div className={styles.container}>
            <div className={styles.ctaGrid} data-cta-content>
              <div>
                <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
                <p className={styles.ctaText}>
                  Tell us about it. We&rsquo;ll reply within one business day
                  with honest thoughts on scope, timeline, and cost.
                </p>
              </div>
              <div className={styles.ctaActions}>
                <Link href="/contact" className={styles.ctaPrimary}>
                  Start a conversation
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link href="/services" className={styles.ctaSecondary}>
                  See services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* Helper: splits a string into per-word spans for scroll-fill */
function FillWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          data-fill-word
          style={{ display: "inline-block", marginRight: "0.24em" }}
        >
          {w}
        </span>
      ))}
    </>
  );
}