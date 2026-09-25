//app/about/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../css/about.module.css";

const TEAM = [
  {
    name: "Prithak Rai",
    role: "Systems Engineer · Backend",
    bio: "Builds and maintains the systems that keep everything running. Handles servers, databases, and the parts nobody sees until they break.",
    photo:
      "",
  },
  {
    name: "Shrijan Thapa",
    role: "Project Manager",
    bio: "Keeps projects moving and clients in the loop. Handles data work and integrates AI where it actually helps.",
    photo:
      "/sbt.jpg",
  },
  {
    name: "Sital Aryal",
    role: "Full-Stack · UI / UX",
    bio: "Works across the stack. Comfortable in the frontend, the backend, and the design files in between.",
    photo:
      "/sba.jpeg",
  },
  {
    name: "Sudil Maharjan",
    role: "Frontend · UI / UX",
    bio: "Builds the interfaces you actually use. Focused on the details that make a product feel finished.",
    photo:
      "",
  },
];

const VALUES = [
  {
    n: "01",
    title: "Say what we'll do. Then do it.",
    text: "Written scopes, fixed prices, and a timeline you can hold us to. No verbal promises that shift later.",
  },
  {
    n: "02",
    title: "Show the work in progress.",
    text: "You see the build every week, not once at the end. Small corrections early, before they're expensive.",
  },
  {
    n: "03",
    title: "Design for the people using it.",
    text: "Not for a portfolio. Every screen has a reason, and if it doesn't earn its place, it comes out.",
  },
  {
    n: "04",
    title: "Stay reachable after launch.",
    text: "Software is never really finished. We answer questions, ship fixes, and help it keep growing.",
  },
];

const APPROACH = [
  {
    n: "01",
    t: "One team, one project",
    d: "We don't run four projects in parallel. When you're in, you're in. Small, focused, and available.",
  },
  {
    n: "02",
    t: "Plain language, always",
    d: "You won't hear about microservices unless you ask. We explain what we're doing in terms you can repeat to your board.",
  },
  {
    n: "03",
    t: "Fixed price, written scope",
    d: "Every engagement starts with a proposal that lists what's included, what isn't, and what it costs to start.",
  },
  {
    n: "04",
    t: "Long after handover",
    d: "Most of our work comes from clients who came back, or people they referred. We behave accordingly.",
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
        /* ---------- INTRO ---------- */
        gsap.from("[data-intro-line]", {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.1,
        });

        gsap.from("[data-intro-fade]", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.5,
        });

        /* ---------- VALUES ---------- */
        gsap.from("[data-value]", {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-values]",
            start: "top 80%",
          },
        });

        /* ---------- TEAM - cinematic pinned sequence ---------- */

        const teamSection = document.querySelector<HTMLElement>(
          "[data-team]"
        );
        const members = gsap.utils.toArray<HTMLElement>("[data-member]");

        if (teamSection && members.length) {
          /* Extra scroll runway after the last member, so his bio
             fully settles and holds before the pin releases. */
          const tailRunway = 1.5; // in viewport-heights

          /* Each member gets one viewport of pin duration, plus
             extra tail runway for the section as a whole. */
          gsap.set(teamSection, {
            height: `${(members.length + tailRunway) * 100}vh`,
          });

          /* The sticky window - holds one member at a time. */
          const stage = teamSection.querySelector<HTMLElement>(
            "[data-team-stage]"
          );
          if (stage) {
            gsap.set(stage, {
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            });
          }

          /* Progress bar inside the stage - updates as you scroll. */
          const progressFill = teamSection.querySelector<HTMLElement>(
            "[data-team-progress]"
          );

          /* Each member's reveal is driven by the section's overall
             scroll progress, not by their own viewport position.
             This is what makes it a proper scroll-driven sequence. */
          members.forEach((member, i) => {
            const photo = member.querySelector<HTMLElement>(
              "[data-member-photo]"
            );
            const name = member.querySelector<HTMLElement>(
              "[data-member-name]"
            );
            const role = member.querySelector<HTMLElement>(
              "[data-member-role]"
            );
            const bio = member.querySelector<HTMLElement>(
              "[data-member-bio]"
            );

            const total = members.length;
            const isLast = i === total - 1;
            const sectionScroll = (total + tailRunway) * window.innerHeight;

            /* Member i occupies [i/total, (i+1)/total] of the
               "core" run. The last member's window is stretched to
               consume the tail runway so his reveal is complete
               and held for a beat before the pin releases. */
            const coreScroll = total * window.innerHeight;
            const start = (i / total) * coreScroll;
            const end = isLast
              ? sectionScroll
              : ((i + 1) / total) * coreScroll;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: teamSection,
                start: `top+=${start} top`,
                end: `top+=${end} top`,
                scrub: 0.4,
              },
            });

            /* Card visibility across the window */
            tl.fromTo(
              member,
              { opacity: 0 },
              { opacity: 1, duration: 0.15, ease: "power2.out" },
              0
            ).to(member, { opacity: 1, duration: 0.5 }, 0.15);

            /* Only fade out if there's a next member. The last one
               stays fully visible through the end of the pin. */
            if (!isLast) {
              tl.to(
                member,
                { opacity: 0, duration: 0.15, ease: "power2.in" },
                0.85
              );
            }

            /* Photo color fill - the key cinematic move.
               Grayscale drains from 100% → 0% as you scroll through
               the member's window. */
            if (photo) {
              tl.fromTo(
                photo,
                { filter: "grayscale(100%) contrast(1.05) brightness(0.85)" },
                {
                  filter: "grayscale(0%) contrast(1) brightness(1)",
                  duration: 0.5,
                  ease: "none",
                },
                0.1
              );

              /* Photo scale settles as the color comes in — ends at 1.02
                 so any 1px light edge on the source image stays cropped. */
              tl.fromTo(
                photo,
                { scale: 1.1 },
                { scale: 1.02, duration: 0.6, ease: "power2.out" },
                0.1
              );
            }

            /* Name reveals first */
            if (name) {
              tl.fromTo(
                name,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.35,
                  ease: "power3.out",
                },
                0.15
              );
            }

            /* Role reveals next */
            if (role) {
              tl.fromTo(
                role,
                { y: 24, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.35,
                  ease: "power3.out",
                },
                0.3
              );
            }

            /* Bio reveals last. For the last member, pull it
               earlier so it fully lands and holds before the pin
               releases. */
            if (bio) {
              tl.fromTo(
                bio,
                { y: 24, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.35,
                  ease: "power3.out",
                },
                isLast ? 0.25 : 0.45
              );
            }
          });

          /* Progress bar for the whole sequence */
          if (progressFill) {
            gsap.fromTo(
              progressFill,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "left center",
                scrollTrigger: {
                  trigger: teamSection,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.3,
                },
              }
            );
          }

          /* Counter - shows which member you're on */
          const counter = teamSection.querySelector<HTMLElement>(
            "[data-team-counter]"
          );
          if (counter) {
            const updateCounter = (progress: number) => {
              const idx = Math.min(
                members.length - 1,
                Math.floor(progress * members.length)
              );
              counter.textContent = String(idx + 1).padStart(2, "0");
            };

            ScrollTrigger.create({
              trigger: teamSection,
              start: "top top",
              end: "bottom bottom",
              scrub: false,
              onUpdate: (self) => updateCounter(self.progress),
            });
          }
        }

        /* ---------- APPROACH ---------- */
        gsap.utils
          .toArray<HTMLElement>("[data-approach-row]")
          .forEach((row) => {
            gsap.from(row, {
              y: 32,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
              },
            });
          });

        /* ---------- CTA ---------- */
        gsap.from("[data-cta-content] > *", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "[data-cta]",
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

  return (
    <main id="main" ref={rootRef} className={styles.page}>
      {/* ================= INTRO ================= */}
      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introIndex}>
              <span className={styles.introIndexNum}>01</span>
              <span className={styles.introIndexLine} aria-hidden="true" />
              <span className={styles.introIndexLabel}>About us</span>
            </div>

            <div className={styles.introBody}>
              <h1 id="intro-title" className={styles.introTitle}>
                <span className={styles.maskLine}>
                  <span data-intro-line>A small studio,</span>
                </span>
                <span className={styles.maskLine}>
                  <span data-intro-line>building real software</span>
                </span>
                <span className={styles.maskLine}>
                  <span data-intro-line>for real businesses.</span>
                </span>
              </h1>

              <p className={styles.introText} data-intro-fade>
                Code Square is a four-person software company based in
                Kathmandu. We were started in 2026 by four friends who had
                been building products together for years and wanted to do
                the work in our own way.
              </p>

              <p className={styles.introText} data-intro-fade>
                The way we see it, most software problems aren&rsquo;t
                technology problems. They&rsquo;re clarity problems. What
                does the business actually need? Which part has to work
                first? Who&rsquo;s going to keep it running? Answering those
                takes longer than writing code, and it&rsquo;s where most of
                our time goes.
              </p>

              <div className={styles.introMeta} data-intro-fade>
                <div className={styles.introMetaBlock}>
                  <span className={styles.introMetaLabel}>Founded</span>
                  <span className={styles.introMetaValue}>2026</span>
                </div>
                <div className={styles.introMetaBlock}>
                  <span className={styles.introMetaLabel}>Team</span>
                  <span className={styles.introMetaValue}>4 people</span>
                </div>
                <div className={styles.introMetaBlock}>
                  <span className={styles.introMetaLabel}>Based in</span>
                  <span className={styles.introMetaValue}>
                    Kathmandu, Nepal
                  </span>
                </div>
                <div className={styles.introMetaBlock}>
                  <span className={styles.introMetaLabel}>Working</span>
                  <span className={styles.introMetaValue}>
                    Locally and internationally
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section
        className={styles.values}
        data-values
        aria-labelledby="values-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <span className={styles.sectionLabel}>How we think</span>
            <h2 id="values-title" className={styles.sectionTitle}>
              Four rules we don&rsquo;t break.
            </h2>
            <p className={styles.sectionLead}>
              Every project is different, but these things stay the same.
              They&rsquo;re how we decide what to say yes to, and how we
              behave once we&rsquo;ve said it.
            </p>
          </header>

          <ol className={styles.valuesList}>
            {VALUES.map((v) => (
              <li key={v.n} className={styles.value} data-value>
                <span className={styles.valueNum}>{v.n}</span>
                <div className={styles.valueBody}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TEAM - pinned cinematic sequence ================= */}
      <section
        className={styles.team}
        data-team
        aria-labelledby="team-title"
      >
        <div className={styles.teamStage} data-team-stage>
          <div className={styles.teamStageInner}>
            <header className={styles.teamHead}>
              <div className={styles.teamHeadLeft}>
                <span className={styles.sectionLabel}>The people</span>
                <h2 id="team-title" className={styles.teamTitle}>
                  Four people. No middle layer.
                </h2>
              </div>

              <div className={styles.teamCounter} aria-hidden="true">
                <span className={styles.teamCounterNum} data-team-counter>
                  01
                </span>
                <span className={styles.teamCounterTotal}>
                  / {String(TEAM.length).padStart(2, "0")}
                </span>
              </div>
            </header>

            <div className={styles.teamViewport}>
              {TEAM.map((m) => (
                <article
                  key={m.name}
                  className={styles.member}
                  data-member
                >
                  <div className={styles.memberPhoto}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo}
                      alt={`${m.name} - ${m.role}`}
                      className={styles.memberImage}
                      loading="lazy"
                      decoding="async"
                      data-member-photo
                    />
                  </div>

                  <div className={styles.memberBody}>
                    <h3
                      className={styles.memberName}
                      data-member-name
                    >
                      {m.name}
                    </h3>
                    <span
                      className={styles.memberRole}
                      data-member-role
                    >
                      {m.role}
                    </span>
                    <p
                      className={styles.memberBio}
                      data-member-bio
                    >
                      {m.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.teamProgress} aria-hidden="true">
              <span
                className={styles.teamProgressFill}
                data-team-progress
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section
        className={styles.approach}
        aria-labelledby="approach-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <span className={styles.sectionLabel}>How we work</span>
            <h2 id="approach-title" className={styles.sectionTitle}>
              A few things you can count on.
            </h2>
          </header>

          <ol className={styles.approachList}>
            {APPROACH.map((a) => (
              <li
                key={a.n}
                className={styles.approachRow}
                data-approach-row
              >
                <span className={styles.approachNum}>{a.n}</span>
                <div className={styles.approachBody}>
                  <h3 className={styles.approachTitle}>{a.t}</h3>
                  <p className={styles.approachText}>{a.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        className={styles.cta}
        data-cta
        aria-labelledby="cta-title"
      >
        <div className={styles.ctaBg} data-cta-image aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=2400&q=80&auto=format&fit=crop"
            alt=""
            className={styles.ctaBgImage}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.ctaBgOverlay} />
        </div>

        <div className={styles.container}>
          <div className={styles.ctaGrid} data-cta-content>
            <div>
              <h2 id="cta-title" className={styles.ctaTitle}>
                Want to work with us?
              </h2>
              <p className={styles.ctaText}>
                Tell us about the project. We&rsquo;ll reply within one
                business day with honest thoughts on scope, timeline, and
                cost.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}