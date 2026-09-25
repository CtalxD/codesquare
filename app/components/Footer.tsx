//app/components/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import styles from "../css/footer.module.css";

const CONTACT = {
  address: "Kathmandu, Nepal",
  email: "codesquare2026@gmail.com",
  phone: "+977 9813301334",
  phoneHref: "tel:+9779813301334",
  emailHref: "mailto:codesquare2026@gmail.com",
};

export default function Footer() {
  const year = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Code Square - Home"
          >
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 164 177" width="26" height="26">
                <path
                  d="M40,0 L164,0 L164,42 L50,42 L50,135 L164,135 L164,177 L40,177 L0,135 L0,42 Z"
                  fill="currentColor"
                />
                <rect
                  x="86"
                  y="66"
                  width="45"
                  height="45"
                  className={styles.brandSquare}
                />
              </svg>
            </span>
            <span className={styles.brandName}>CODE SQUARE</span>
          </Link>

          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon} aria-hidden="true">
                <MapPin size={14} strokeWidth={1.75} />
              </span>
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <span className={styles.contactIcon} aria-hidden="true">
                <Mail size={14} strokeWidth={1.75} />
              </span>
              <a href={CONTACT.emailHref} className={styles.contactLink}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <span className={styles.contactIcon} aria-hidden="true">
                <Phone size={14} strokeWidth={1.75} />
              </span>
              <a href={CONTACT.phoneHref} className={styles.contactLink}>
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} Code Square. All rights reserved.
          </p>

          <div className={styles.legal}>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy
            </Link>
            <span className={styles.legalDot} aria-hidden="true" />
            <Link href="/terms" className={styles.legalLink}>
              Terms
            </Link>
            <span className={styles.legalDot} aria-hidden="true" />
            <button
              type="button"
              onClick={handleBackToTop}
              className={styles.backToTop}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}