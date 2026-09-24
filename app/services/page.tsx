//app/services/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../css/services.module.css";

export default function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("website");

  useEffect(() => {
    const sections =
      rootRef.current?.querySelectorAll<HTMLElement>("[data-service]");
    if (!sections || !sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
        /* ---------- HERO ---------- */

        /* Line entrance on load */
        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        gsap.set(heroLines, { yPercent: 110 });
        gsap.to(heroLines, {
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.1,
        });

        /* Fade in eyebrow, lead and nav */
        const heroFades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        gsap.set(heroFades, { y: 24, opacity: 0 });
        gsap.to(heroFades, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
        });

        /* Hero image parallax on scroll */
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

        /* Hero content drifts up slightly and fades as you leave */
        gsap.to("[data-hero-content]", {
          yPercent: -10,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        /* ---------- SERVICE 01 — WEBSITE ---------- */

        const websiteTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#website",
            start: "top 78%",
          },
        });

        websiteTl
          .from("[data-website-head] > *", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          })
          .from(
            "[data-website-frame]",
            {
              clipPath: "inset(100% 0 0 0)",
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.4"
          )
          .from(
            "[data-website-foot] > *",
            {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.5"
          );

        /* Subtle parallax on the browser mockup's inner content */
        gsap.fromTo(
          "[data-website-frame]",
          { yPercent: 3 },
          {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: "#website",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );

        /* ---------- SERVICE 02 — MOBILE ---------- */

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#mobile",
            start: "top 78%",
          },
        });

        mobileTl
          .from("[data-mobile-text] > *", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          })
          .from(
            "[data-mobile-media]",
            {
              clipPath: "inset(0 100% 0 0)",
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.5"
          );

        /* Image parallax inside the media frame */
        gsap.fromTo(
          "[data-mobile-image]",
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#mobile",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );

        /* ---------- SERVICE 03 — SOFTWARE ---------- */

        const softwareTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#software",
            start: "top 78%",
          },
        });

        softwareTl
          .from("[data-software-head] > *", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          })
          .from(
            "[data-dashboard]",
            {
              y: 48,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            "[data-software-foot] > *",
            {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.4"
          );

        /* Bars grow from 0 height as the dashboard enters view */
        const dashBars = gsap.utils.toArray<HTMLElement>("[data-dash-bar]");
        dashBars.forEach((bar) => {
          const targetHeight = bar.dataset.height || bar.style.height;
          gsap.fromTo(
            bar,
            { height: "0%" },
            {
              height: targetHeight,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: "[data-dashboard]",
                start: "top 78%",
              },
            }
          );
        });

        /* KPI values slide up */
        gsap.from("[data-dash-kpi]", {
          y: 16,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-dashboard]",
            start: "top 75%",
          },
        });

        /* ---------- SERVICE 04 — DESIGN ---------- */

        const designTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#design",
            start: "top 78%",
          },
        });

        designTl
          .from("[data-design-head] > *", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          })
          .from(
            "[data-wire-back]",
            {
              x: -60,
              opacity: 0,
              duration: 1,
              ease: "expo.out",
            },
            "-=0.4"
          )
          .from(
            "[data-wire-front]",
            {
              x: 60,
              opacity: 0,
              duration: 1,
              ease: "expo.out",
            },
            "-=0.8"
          )
          .from(
            "[data-design-foot] > *",
            {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.4"
          );

        /* ---------- CTA ---------- */

        /* Image parallax */
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

        /* Content fade-in */
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
      {/* ================= HERO ================= */}
      <section className={styles.hero} data-hero>
        <div className={styles.heroBg} data-hero-image aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=2400&q=80&auto=format&fit=crop"
            alt=""
            className={styles.heroBgImage}
            loading="eager"
            decoding="async"
          />
          <div className={styles.heroBgTopScrim} />
          <div className={styles.heroBgBottomScrim} />
        </div>

        <div className={styles.heroInner} data-hero-content>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroLine}>
                  <span className={styles.heroLineInner} data-hero-line>
                    Four things
                  </span>
                </span>
                <span className={styles.heroLine}>
                  <span className={styles.heroLineInner} data-hero-line>
                    we do well.
                  </span>
                </span>
              </h1>

              <p className={styles.heroLead} data-hero-fade>
                Each one has a rule. We keep the rules so the work stays
                good.
              </p>

              <nav
                className={`${styles.heroNav} ${styles.heroNavMoved}`}
                aria-label="Services"
                data-hero-fade
              >
                <ol className={styles.heroNavList}>
                  {[
                    { id: "website", index: "01", label: "Web" },
                    { id: "mobile", index: "02", label: "Mobile" },
                    { id: "software", index: "03", label: "Systems" },
                    { id: "design", index: "04", label: "Design" },
                  ].map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={
                          activeId === s.id
                            ? `${styles.heroNavLink} ${styles.heroNavLinkActive}`
                            : styles.heroNavLink
                        }
                        aria-current={activeId === s.id ? "true" : undefined}
                      >
                        <span className={styles.heroNavNum}>{s.index}</span>
                        <span className={styles.heroNavLabel}>{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE 01 — WEBSITE ================= */}
      <section
        id="website"
        data-service
        className={styles.website}
        aria-labelledby="website-title"
      >
        <div className={styles.container}>
          <header className={styles.websiteHead} data-website-head>
            <span className={styles.serviceNum}>01</span>

            <h2 id="website-title" className={styles.websiteTitle}>
              <span>Website</span>
              <span className={styles.websiteTitleSecond}>Development</span>
            </h2>

            <p className={styles.websiteRule}>
              We refuse to build sites your team can&rsquo;t edit. If the
              copy has to come through us, we&rsquo;ve failed.
            </p>
          </header>

          <div
            className={styles.browserFrame}
            data-website-frame
            aria-hidden="true"
          >
            <div className={styles.browserBar}>
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
              <div className={styles.browserUrl}>
                <span>codesquare.com.np</span>
              </div>
            </div>

            <div className={styles.browserBody}>
              <div className={styles.siteNav}>
                <div className={styles.siteBrand}>
                  <span className={styles.siteMark} />
                  <span className={styles.siteBrandText}>
                    CODE SQUARE
                  </span>
                </div>
                <div className={styles.siteNavLinks}>
                  <span>Work</span>
                  <span>Services</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>

              <div className={styles.siteHero}>
                <h3 className={styles.siteH1}>
                  Building
                  <br />
                  something
                  <br />
                  useful.
                </h3>
                <span className={styles.siteCta}>
                  Start a project <span aria-hidden="true">→</span>
                </span>
              </div>

              <div className={styles.siteGrid}>
                <div className={styles.siteCard}>
                  <span className={styles.siteCardNum}>01</span>
                  <span className={styles.siteCardTitle}>Websites</span>
                </div>
                <div className={styles.siteCard}>
                  <span className={styles.siteCardNum}>02</span>
                  <span className={styles.siteCardTitle}>Applications</span>
                </div>
                <div className={styles.siteCard}>
                  <span className={styles.siteCardNum}>03</span>
                  <span className={styles.siteCardTitle}>Design</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.websiteFoot} data-website-foot>
            <div className={styles.handleBlock}>
              <span className={styles.blockLabel}>Scope</span>
              <ol className={styles.handleGrid}>
                {[
                  "Discovery",
                  "Architecture",
                  "Interface",
                  "Development",
                  "Performance",
                  "Launch",
                ].map((item, i) => (
                  <li key={item}>
                    <span className={styles.handleNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.footRow}>
              <span className={styles.time}>3—6 weeks</span>
              <Link
                href="/contact?service=website"
                className={styles.link}
              >
                Get a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE 02 — MOBILE ================= */}
      <section
        id="mobile"
        data-service
        className={styles.mobile}
        aria-labelledby="mobile-title"
      >
        <div className={styles.container}>
          <div className={styles.mobileGrid}>
            <div className={styles.mobileText} data-mobile-text>
              <span className={styles.serviceNumLight}>02</span>

              <h2 id="mobile-title" className={styles.mobileTitle}>
                We won&rsquo;t build an app for something a web page can
                already do.
              </h2>

              <p className={styles.mobileLead}>
                When an app is the right answer, it&rsquo;s built from one
                codebase and runs on both platforms.
              </p>
            </div>

            <div className={styles.mobileMedia} data-mobile-media>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=80&auto=format&fit=crop"
                alt="Two phones showing a mobile application interface"
                className={styles.mobileImage}
                loading="lazy"
                decoding="async"
                data-mobile-image
              />
            </div>
          </div>

          <div className={styles.footRowDark}>
            <span className={styles.timeLight}>6—12 weeks</span>
            <Link
              href="/contact?service=mobile"
              className={styles.linkLight}
            >
              Get a quote <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SERVICE 03 — SOFTWARE ================= */}
      <section
        id="software"
        data-service
        className={styles.software}
        aria-labelledby="software-title"
      >
        <div className={styles.container}>
          <header className={styles.softwareHead} data-software-head>
            <span className={styles.serviceNum}>03</span>

            <h2 id="software-title" className={styles.softwareTitle}>
              Every system we build starts with a workflow audit. If we
              can&rsquo;t map it on one page, we don&rsquo;t build it.
            </h2>
          </header>
        </div>

        <div className={styles.dashboardBleed}>
          <div className={styles.dashboard} data-dashboard aria-hidden="true">
            <div className={styles.dashHeader}>
              <span className={styles.dashTitle}>Operations</span>
              <div className={styles.dashHeaderRight}>
                <span className={styles.dashPill}>Week</span>
                <span className={styles.dashPill}>Month</span>
                <span className={styles.dashPillActive}>Quarter</span>
              </div>
            </div>

            <div className={styles.dashKpis}>
              <div className={styles.dashKpi} data-dash-kpi>
                <span className={styles.dashKpiLabel}>Orders</span>
                <span className={styles.dashKpiValue}>1,248</span>
                <span className={styles.dashKpiDelta}>
                  ↑ 12% from last quarter
                </span>
              </div>
              <div className={styles.dashKpi} data-dash-kpi>
                <span className={styles.dashKpiLabel}>Users</span>
                <span className={styles.dashKpiValue}>382</span>
                <span className={styles.dashKpiDelta}>↑ 46 new</span>
              </div>
              <div className={styles.dashKpi} data-dash-kpi>
                <span className={styles.dashKpiLabel}>Pending</span>
                <span className={styles.dashKpiValue}>38</span>
                <span className={styles.dashKpiDelta}>
                  ↓ 6 since Monday
                </span>
              </div>
            </div>

            <div className={styles.dashChart}>
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="38%"
                style={{ height: "38%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="62%"
                style={{ height: "62%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="48%"
                style={{ height: "48%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="82%"
                style={{ height: "82%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="54%"
                style={{ height: "54%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="70%"
                style={{ height: "70%" }}
              />
              <span
                className={`${styles.dashBar} ${styles.dashBarActive}`}
                data-dash-bar
                data-height="94%"
                style={{ height: "94%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="60%"
                style={{ height: "60%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="78%"
                style={{ height: "78%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="42%"
                style={{ height: "42%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="68%"
                style={{ height: "68%" }}
              />
              <span
                className={styles.dashBar}
                data-dash-bar
                data-height="55%"
                style={{ height: "55%" }}
              />
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.softwareFoot} data-software-foot>
            <div className={styles.handleBlock}>
              <span className={styles.blockLabel}>Scope</span>
              <ol className={styles.handleGrid}>
                {[
                  "Process mapping",
                  "Data model",
                  "Admin interface",
                  "Access control",
                  "Integrations",
                  "Documentation",
                ].map((item, i) => (
                  <li key={item}>
                    <span className={styles.handleNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.footRow}>
              <span className={styles.time}>8—16 weeks</span>
              <Link
                href="/contact?service=software"
                className={styles.link}
              >
                Get a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE 04 — DESIGN ================= */}
      <section
        id="design"
        data-service
        className={styles.design}
        aria-labelledby="design-title"
      >
        <div className={styles.container}>
          <header className={styles.designHead} data-design-head>
            <span className={styles.serviceNum}>04</span>

            <h2 id="design-title" className={styles.designTitle}>
              We do this before anything else. If the design isn&rsquo;t
              right, the code is wasted.
            </h2>
          </header>

          <div className={styles.wireframes} aria-hidden="true">
            <div className={styles.wireBack} data-wire-back>
              <div className={styles.wireHeader}>
                <span className={styles.wireLabel}>
                  Customer onboarding · v3
                </span>
                <span className={styles.wireDot} />
              </div>
              <div className={styles.wireRow}>
                <div className={styles.wireBox} />
                <div className={styles.wireLines}>
                  <span />
                  <span />
                  <span className={styles.wireLineShort} />
                </div>
              </div>
              <div className={styles.wireRow}>
                <div className={styles.wireBox} />
                <div className={styles.wireLines}>
                  <span />
                  <span className={styles.wireLineShort} />
                </div>
              </div>
              <div className={styles.wireRow}>
                <div className={styles.wireBox} />
                <div className={styles.wireLines}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className={styles.wireFront} data-wire-front>
              <div className={styles.wireHeader}>
                <span className={styles.wireLabel}>
                  Components · 42 defined
                </span>
                <span className={styles.wireDotActive} />
              </div>
              <div className={styles.wireSwatches}>
                <span className={styles.wireSwatchA} />
                <span className={styles.wireSwatchB} />
                <span className={styles.wireSwatchC} />
                <span className={styles.wireSwatchD} />
              </div>
              <div className={styles.wireType}>
                <span className={styles.wireTypeH}>Aa</span>
                <div className={styles.wireTypeLines}>
                  <span className={styles.wireTypeLine} />
                  <span className={styles.wireTypeLineShort} />
                </div>
              </div>
              <div className={styles.wireButtons}>
                <span className={styles.wireBtnPrimary}>Continue</span>
                <span className={styles.wireBtnGhost}>Back</span>
              </div>
            </div>
          </div>

          <div className={styles.designFoot} data-design-foot>
            <div className={styles.handleBlock}>
              <span className={styles.blockLabel}>Scope</span>
              <ol className={styles.handleGrid}>
                {[
                  "Research",
                  "Flows",
                  "Wireframes",
                  "Prototypes",
                  "Design system",
                  "Handoff",
                ].map((item, i) => (
                  <li key={item}>
                    <span className={styles.handleNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.footRow}>
              <span className={styles.time}>3—8 weeks</span>
              <Link
                href="/contact?service=design"
                className={styles.link}
              >
                Get a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
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
                Have something in mind?
              </h2>
              <p className={styles.ctaText}>
                Tell us about it. We&rsquo;ll reply within one business day
                with honest thoughts on scope, timeline, and cost.
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