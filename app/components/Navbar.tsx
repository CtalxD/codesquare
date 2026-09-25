//app/components/Navbar.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../css/navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  );

  const isQuoteActive = pathname === "/contact";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : ""
        }`}
        data-drawer-open={isOpen}
      >
        <div className={styles.shell}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Code Square - Home"
          >
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 40 40" width="24" height="24">
                <path
                  d="M20 3a17 17 0 1 0 0 34h6v-6h-6a11 11 0 1 1 0-22h6V3h-6z"
                  fill="currentColor"
                />
                <rect
                  x="17"
                  y="17"
                  width="6"
                  height="6"
                  className={styles.brandSquare}
                />
              </svg>
            </span>
            <span className={styles.brandName}>CODE SQUARE</span>
          </Link>

          <nav className={styles.links} aria-label="Primary">
            <ul className={styles.linksList}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.link} ${
                        active ? styles.linkActive : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className={styles.linkLabel}>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/contact"
            className={`${styles.cta} ${
              isQuoteActive ? styles.ctaActive : ""
            }`}
            aria-current={isQuoteActive ? "page" : undefined}
          >
            <span>Get a Quote</span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.menuButton} ${
              isOpen ? styles.menuButtonOpen : ""
            }`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`${styles.backdrop} ${
          isOpen ? styles.backdropOpen : ""
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!isOpen}
      >
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.href);
            return (
              <li
                key={link.href}
                style={{
                  transitionDelay: isOpen ? `${80 + i * 40}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  className={`${styles.drawerLink} ${
                    active ? styles.drawerLinkActive : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.drawerLabel}>{link.label}</span>
                  <span className={styles.drawerArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className={`${styles.drawerCta} ${
            isQuoteActive ? styles.drawerCtaActive : ""
          }`}
          aria-current={isQuoteActive ? "page" : undefined}
        >
          <span>Get a Quote</span>
        </Link>

        <div className={styles.drawerFoot}>
          <span>Code Square</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </aside>
    </>
  );
}