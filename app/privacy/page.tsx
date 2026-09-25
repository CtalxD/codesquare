//app/privacy/page.tsx
import Link from "next/link";
import styles from "../css/legal.module.css";
import { CONTACT, CONTACT_EMAIL_HREF } from "../../lib/contactConfig";

export default function PrivacyPage() {
  return (
    <main id="main" className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero} aria-labelledby="privacy-title">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 id="privacy-title" className={styles.title}>
            Privacy Policy
          </h1>
          <p className={styles.lead}>
            What we collect when you use this site, why we collect it,
            and how you can ask us to delete it.
          </p>
          <span className={styles.meta}>
            <span>Last updated</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>January 2026</span>
          </span>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.prose}>
            <p>
              Code Square Pvt. Ltd. (&ldquo;Code Square&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates{" "}
              <strong>codesquare.com.np</strong>. This page explains
              what information we collect when you visit the site or
              contact us, and what we do with it.
            </p>
            <p>
              We keep this simple because our practices are simple. We
              don&rsquo;t run ads, we don&rsquo;t sell data, and we
              don&rsquo;t track you across other websites.
            </p>

            <hr />

            <h2>1. What we collect</h2>
            <p>
              When you submit the contact form on this site, we collect
              the details you choose to give us:
            </p>
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number and country code</li>
              <li>Your company name</li>
              <li>The service you&rsquo;re interested in</li>
              <li>Your rough budget</li>
              <li>Your message about the project</li>
            </ul>
            <p>
              Along with the form, we automatically record the page you
              submitted from, the referring page (if any), your browser
              user-agent string, and the time of submission. This
              metadata helps us filter spam and understand how people
              find us.
            </p>
            <p>
              We do not use advertising cookies, and we do not run
              third-party analytics trackers on this site.
            </p>

            <h2>2. Why we collect it</h2>
            <p>
              We use the information you submit for one purpose: to
              read your enquiry and reply to it. That&rsquo;s it. We
              may also keep a record of the correspondence in our email
              system so we can refer back to it if you get in touch
              again.
            </p>

            <h2>3. Who we share it with</h2>
            <p>
              We share your form submission with exactly one third
              party: <strong>Web3Forms</strong>, the service we use to
              deliver contact-form emails to our inbox. Web3Forms
              processes the submission and forwards it to us. You can
              read their privacy practices at{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                web3forms.com/privacy
              </a>
              .
            </p>
            <p>
              Beyond that, we do not sell, rent, or share your
              information with anyone else, unless we are legally
              required to do so by a valid request from a Nepali
              authority.
            </p>

            <h2>4. How long we keep it</h2>
            <p>
              We keep contact-form enquiries for as long as they&rsquo;re
              useful to an ongoing or potential project, and no longer
              than three years. If you ask us to delete your data, we
              will do so within 30 days, unless we&rsquo;re required to
              keep it for tax or legal reasons.
            </p>

            <h2>5. Your rights</h2>
            <p>You can ask us to:</p>
            <ul>
              <li>Show you what information we hold about you</li>
              <li>Correct anything that&rsquo;s wrong</li>
              <li>Delete your information</li>
              <li>Stop contacting you</li>
            </ul>
            <p>
              To make any of these requests, email us at{" "}
              <a href={CONTACT_EMAIL_HREF}>{CONTACT.email}</a>. We
              respond within one business day and act on the request
              within 30 days.
            </p>

            <h2>6. Security</h2>
            <p>
              Form submissions travel over HTTPS. Our inbox is
              protected by a password and two-factor authentication.
              No system is perfectly secure, but we take reasonable
              steps to protect what you send us, and we don&rsquo;t
              store anything we don&rsquo;t need.
            </p>

            <h2>7. Children</h2>
            <p>
              This site is intended for business enquiries. We
              don&rsquo;t knowingly collect information from anyone
              under 16. If you believe we have, contact us and
              we&rsquo;ll remove it.
            </p>

            <h2>8. Changes to this policy</h2>
            <p>
              If we change this policy, we&rsquo;ll update the
              &ldquo;Last updated&rdquo; date above. Material changes
              will be noted on the homepage for a short period.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about this policy, or about your data? Write to
              us:
            </p>

            <div className={styles.footNote}>
              <p>
                <strong>Code Square Pvt. Ltd.</strong>
              </p>
              <p>
                {CONTACT.address}
                <br />
                Email:{" "}
                <a
                  href={CONTACT_EMAIL_HREF}
                  className={styles.footLink}
                >
                  {CONTACT.email}
                </a>
                <br />
                Phone:{" "}
                <a
                  href={CONTACT.phoneHref}
                  className={styles.footLink}
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                See also our{" "}
                <Link href="/terms" className={styles.footLink}>
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}