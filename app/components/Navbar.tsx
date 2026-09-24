//app/components/Navbar.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
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
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  );

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

  const moveIndicatorTo = useCallback((index: number) => {
    const list = linksRef.current;
    const el = linkRefs.current[index];
    if (!list || !el) return;
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - listRect.left,
      width: elRect.width,
      visible: true,
    });
  }, []);

  const resetIndicatorToActive = useCallback(() => {
    const activeIndex = NAV_LINKS.findIndex((l) => isActive(l.href));
    if (activeIndex >= 0) moveIndicatorTo(activeIndex);
    else setIndicator((s) => ({ ...s, visible: false }));
  }, [isActive, moveIndicatorTo]);

  useEffect(() => {
    resetIndicatorToActive();
    const onResize = () => resetIndicatorToActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resetIndicatorToActive]);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.shell}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Code Square - Home"
          >
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 40 40" width="30" height="30">
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
            <span className={styles.brandText}>
              <span className={styles.brandName}>CODE SQUARE</span>
              <span className={styles.brandSuffix}>PVT. LTD.</span>
            </span>
          </Link>

          <span className={styles.divider} aria-hidden="true" />

          <ul
            ref={linksRef}
            className={styles.links}
            onMouseLeave={resetIndicatorToActive}
          >
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={link.href}
                    className={`${styles.link} ${
                      active ? styles.linkActive : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => moveIndicatorTo(i)}
                    onFocus={() => moveIndicatorTo(i)}
                  >
                    <span className={styles.linkDot} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <span
              className={`${styles.indicator} ${
                indicator.visible ? styles.indicatorVisible : ""
              }`}
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
              }}
              aria-hidden="true"
            />
          </ul>

          <Link href="/contact" className={styles.cta}>
            <span className={styles.ctaSquare} aria-hidden="true" />
            <span>Get a Quote</span>
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? (
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
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
        <div className={styles.drawerHead}>
          <span className={styles.drawerEyebrow}>Menu</span>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={() => {
              setIsOpen(false);
              menuButtonRef.current?.focus();
            }}
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

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
                  <span className={styles.drawerIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.drawerLabel}>{link.label}</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.75}
                    className={styles.drawerArrow}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className={styles.drawerCta}>
          <span className={styles.ctaSquare} aria-hidden="true" />
          <span>Get a Quote</span>
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>

        <div className={styles.drawerFoot}>
          <span>Code Square Pvt. Ltd.</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </aside>
    </>
  );
}