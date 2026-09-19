"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LogoMark from "./LogoMark";
import "../css/navbar.css";

const NAV_LINKS = [
  { n: "00", label: "Home", href: "/" },
  { n: "01", label: "Capabilities", href: "/capabilities" },
  { n: "02", label: "Studio", href: "/studio" },
  { n: "03", label: "Work", href: "/work" },
  { n: "04", label: "Contact", href: "/contact" },
];

const FOUNDED = new Date().getFullYear();

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function pageLabel(pathname: string): string | null {
  if (pathname === "/") return null;
  const match = NAV_LINKS.find((l) => isActive(pathname, l.href));
  if (match) return match.label;
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : null;
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentPage = pageLabel(pathname);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`cs-nav ${open ? "is-open" : ""} ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <Link
          href="/"
          className="cs-nav-brand"
          data-cursor="nav"
          onClick={() => setOpen(false)}
        >
          <LogoMark size={20} />
          <span className="cs-nav-brand-word">Code Square</span>
          {currentPage && (
            <span className="cs-nav-brand-sep" aria-hidden="true">
              /
            </span>
          )}
          {currentPage && (
            <span className="cs-nav-brand-page">{currentPage}</span>
          )}
        </Link>

        <nav className="cs-nav-links">
          {NAV_LINKS.slice(0, 4).map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`cs-nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                data-cursor="nav"
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={`cs-nav-cta ${
            isActive(pathname, "/contact") ? "is-active" : ""
          }`}
          aria-current={isActive(pathname, "/contact") ? "page" : undefined}
          data-cursor="nav"
        >
          Start a project
        </Link>

        <button
          className={`cs-burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-cursor="nav"
        >
          <span className="cs-burger-line cs-burger-line--top" />
          <span className="cs-burger-line cs-burger-line--mid" />
          <span className="cs-burger-line cs-burger-line--bot" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cs-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cs-menu-inner">
              <span className="cs-menu-eyebrow">
                Menu / {FOUNDED}
              </span>

              <nav className="cs-menu-nav">
                {NAV_LINKS.map((l, i) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={l.href}
                        className={`cs-menu-link ${
                          active ? "is-active" : ""
                        }`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        data-cursor="nav"
                      >
                        <span className="cs-menu-link-num">{l.n}</span>
                        <span className="cs-menu-link-label">
                          {l.label}
                        </span>
                        {active && (
                          <span
                            className="cs-menu-link-current"
                            aria-hidden="true"
                          >
                            Current
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                className="cs-menu-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.28 }}
              >
                <a
                  href="mailto:codesquare2026@gmail.com"
                  className="cs-menu-email"
                  data-cursor="email"
                >
                  codesquare2026@gmail.com
                </a>
                <span className="cs-menu-note">
                  Code / Structure / Square
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}