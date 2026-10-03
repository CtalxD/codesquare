//app/components/Footer.tsx
import Link from "next/link";
import styles from "../css/footer.module.css";
import Logo from "./logo";

const EMAIL = "codesquare2026@gmail.com";

/* [label, href] - each opens its own page */
const nav: [string, string][] = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About us", "/about"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
          <Link href="/contact" className={styles.ctaBtn}>
            Start a project
          </Link>
        </div>

        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.brand} aria-label="Code Square home">
              <Logo />
            </Link>
            <p className={styles.note}>
              UI/UX design, custom software, mobile apps and websites.
            </p>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <p className={styles.head}>Pages</p>
            {nav.map(([l, href]) => (
              <Link key={href} href={href}>
                {l}
              </Link>
            ))}
          </nav>

          <div className={styles.col}>
            <p className={styles.head}>Email us</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className={styles.reply}>We reply within one business day.</p>
          </div>
        </div>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Code Square. All rights reserved.
        </p>
      </div>
    </footer>
  );
}