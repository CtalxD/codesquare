"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import styles from "../css/services.module.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
        gsap.from("[data-hero-line]", {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.1,
        });

        gsap.from("[data-hero-fade]", {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
        });

        gsap.utils
          .toArray<HTMLElement>("[data-service]")
          .forEach((row) => {
            gsap.from(row, {
              opacity: 0,
              y: 32,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
              },
            });
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
    <main
      id="main"
      ref={rootRef}
      className={`${display.variable} ${mono.variable} ${styles.page}`}
    >
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.container}>
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
              Each one has a rule. We keep the rules so the work stays good.
            </p>
          </div>

          <div className={styles.container}>
            <nav
              className={`${styles.heroNav} ${styles.heroNavMoved}`}
              aria-label="Services"
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
      </section>

      {/* ================= SERVICE 01 — WEBSITE ================= */}
      <section
        id="website"
        data-service
        className={styles.website}
        aria-labelledby="website-title"
      >
        <div className={styles.container}>
          <header className={styles.websiteHead}>
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

          <div className={styles.browserFrame} aria-hidden="true">
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

          <div className={styles.websiteFoot}>
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
            <div className={styles.mobileText}>
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

            <div className={styles.mobileMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=80&auto=format&fit=crop"
                alt="Two phones showing a mobile application interface"
                className={styles.mobileImage}
                loading="lazy"
                decoding="async"
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
          <header className={styles.softwareHead}>
            <span className={styles.serviceNum}>03</span>

            <h2 id="software-title" className={styles.softwareTitle}>
              Every system we build starts with a workflow audit. If we
              can&rsquo;t map it on one page, we don&rsquo;t build it.
            </h2>
          </header>
        </div>

        <div className={styles.dashboardBleed}>
          <div className={styles.dashboard} aria-hidden="true">
            <div className={styles.dashHeader}>
              <span className={styles.dashTitle}>Operations</span>
              <div className={styles.dashHeaderRight}>
                <span className={styles.dashPill}>Week</span>
                <span className={styles.dashPill}>Month</span>
                <span className={styles.dashPillActive}>Quarter</span>
              </div>
            </div>

            <div className={styles.dashKpis}>
              <div className={styles.dashKpi}>
                <span className={styles.dashKpiLabel}>Orders</span>
                <span className={styles.dashKpiValue}>1,248</span>
                <span className={styles.dashKpiDelta}>
                  ↑ 12% from last quarter
                </span>
              </div>
              <div className={styles.dashKpi}>
                <span className={styles.dashKpiLabel}>Users</span>
                <span className={styles.dashKpiValue}>382</span>
                <span className={styles.dashKpiDelta}>↑ 46 new</span>
              </div>
              <div className={styles.dashKpi}>
                <span className={styles.dashKpiLabel}>Pending</span>
                <span className={styles.dashKpiValue}>38</span>
                <span className={styles.dashKpiDelta}>
                  ↓ 6 since Monday
                </span>
              </div>
            </div>

            <div className={styles.dashChart}>
              <span className={styles.dashBar} style={{ height: "38%" }} />
              <span className={styles.dashBar} style={{ height: "62%" }} />
              <span className={styles.dashBar} style={{ height: "48%" }} />
              <span className={styles.dashBar} style={{ height: "82%" }} />
              <span className={styles.dashBar} style={{ height: "54%" }} />
              <span className={styles.dashBar} style={{ height: "70%" }} />
              <span
                className={`${styles.dashBar} ${styles.dashBarActive}`}
                style={{ height: "94%" }}
              />
              <span className={styles.dashBar} style={{ height: "60%" }} />
              <span className={styles.dashBar} style={{ height: "78%" }} />
              <span className={styles.dashBar} style={{ height: "42%" }} />
              <span className={styles.dashBar} style={{ height: "68%" }} />
              <span className={styles.dashBar} style={{ height: "55%" }} />
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.softwareFoot}>
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
          <header className={styles.designHead}>
            <span className={styles.serviceNum}>04</span>

            <h2 id="design-title" className={styles.designTitle}>
              We do this before anything else. If the design isn&rsquo;t
              right, the code is wasted.
            </h2>
          </header>

          <div className={styles.wireframes} aria-hidden="true">
            <div className={styles.wireBack}>
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

            <div className={styles.wireFront}>
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

          <div className={styles.designFoot}>
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
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.container}>
          <div className={styles.ctaGrid}>
            <div>
              <h2 id="cta-title" className={styles.ctaTitle}>
                Have something in mind?
              </h2>
            </div>
            <Link href="/contact" className={styles.ctaLink}>
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}