//app/components/Navbar.tsx
"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../css/navbar.module.css";
import { Mark, Wordmark } from "./logo";

/* [id, label, href] - every item opens its own page */
const nav: [string, string, string][] = [
  ["top", "Home", "/"],
  ["services", "Services", "/services"],
  ["about", "About us", "/about"],
  ["contact", "Contact", "/contact"],
];

/* Which nav item belongs to the page you are on */
const routeId = (pathname: string): string | null => {
  if (pathname === "/") return "top"; // Home stays active while you scroll
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return null;
};

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);

  /* The active link depends only on the page you are on, never on scroll */
  const active = routeId(pathname);

  /* "Start a project" opens the contact page */
  const contactHref = "/contact";

  /* Lock page scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close the mobile menu whenever the route changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Close with Escape, and when the screen grows past the mobile layout */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 861px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  /* Clicking Home while already on the home page scrolls to the top.
     The scroll lock is released first: phones ignore scrollTo while
     the body is locked, which made the menu links feel dead. */
  const onNavClick =
    (href: string, close?: boolean) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (close) {
        document.body.style.overflow = "";
        setOpen(false);
      }
      if (href === "/" && onHome) {
        e.preventDefault();
        requestAnimationFrame(() =>
          window.scrollTo({ top: 0, behavior: "smooth" }),
        );
      }
    };

  return (
    <>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Code Square home"
          onClick={onNavClick("/", open)}
        >
          <Mark className={styles.brandMark} />
          <Wordmark />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {nav.map(([id, l, href]) => (
            <Link
              key={id}
              href={href}
              onClick={onNavClick(href)}
              className={`${styles.link} ${active === id ? styles.active : ""}`}
              aria-current={active === id ? "page" : undefined}
            >
              {l}
            </Link>
          ))}
          <Link href={contactHref} className={styles.navCta}>
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        id="menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
      >
        {nav.map(([id, l, href]) => (
          <Link
            key={id}
            href={href}
            onClick={onNavClick(href, true)}
            aria-current={active === id ? "page" : undefined}
          >
            {l}
          </Link>
        ))}
        <Link href={contactHref} onClick={onNavClick(contactHref, true)}>
          Start a project
        </Link>
      </div>
    </>
  );
}