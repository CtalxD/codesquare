"use client";

import Link from "next/link";
import LogoMark from "./LogoMark";
import "../css/footer.css";

const FOOTER_LINKS = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const CONTACT = {
  email: "codesquare2026@gmail.com",
  links: [] as { label: string; href: string }[],
};

const FOUNDED = new Date().getFullYear();

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-top">
          <div className="cs-footer-brand">
            <LogoMark size={20} />
            <span className="cs-footer-brand-word">Code Square</span>
          </div>

          <nav className="cs-footer-links">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.href} href={l.href} data-cursor="nav">
                {l.label}
              </Link>
            ))}
          </nav>

          {CONTACT.links.length > 0 && (
            <nav className="cs-footer-links cs-footer-links--ext">
              {CONTACT.links.map((l) => (
                <a key={l.label} href={l.href} data-cursor="nav">
                  {l.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="cs-footer-bottom">
          <span>
            © {FOUNDED}
            {year !== FOUNDED ? ` to ${year}` : ""} Code Square
          </span>
          <a
            href={`mailto:${CONTACT.email}`}
            className="cs-footer-email"
            data-cursor="email"
          >
            {CONTACT.email}
          </a>
          <span>Code / Structure / Square</span>
        </div>
      </div>
    </footer>
  );
}