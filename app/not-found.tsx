// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "96px 24px",
        textAlign: "center",
        color: "var(--pine)",
      }}
    >
      <div style={{ display: "grid", gap: 20, justifyItems: "center" }}>
        <p style={{ fontWeight: 600 }}>Error 404</p>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
          }}
        >
          This page does not exist.
        </h1>
        <p style={{ maxWidth: "28em", color: "var(--muted)" }}>
          The link may be broken or the page may have moved. Try one of these
          instead.
        </p>
        <nav
          aria-label="Helpful links"
          style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
        >
          <Link
            href="/"
            style={{
              padding: "14px 28px",
              borderRadius: 999,
              background: "var(--pine)",
              color: "var(--mist)",
              fontWeight: 600,
            }}
          >
            Back home
          </Link>
          <Link
            href="/services"
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              border: "2px solid var(--pine)",
              fontWeight: 600,
            }}
          >
            Our services
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              border: "2px solid var(--pine)",
              fontWeight: 600,
            }}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </main>
  );
}