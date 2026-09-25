//app/terms/page.tsx
import Link from "next/link";
import styles from "../css/legal.module.css";
import { CONTACT, CONTACT_EMAIL_HREF } from "../../lib/contactConfig";

export default function TermsPage() {
  return (
    <main id="main" className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.container}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 id="terms-title" className={styles.title}>
            Terms of Service
          </h1>
          <p className={styles.lead}>
            The ground rules for using this website and for the work we
            do together once you hire us.
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
              These terms govern your use of{" "}
              <strong>codesquare.com.np</strong> (the
              &ldquo;Site&rdquo;) and, where applicable, the services
              provided by Code Square Pvt. Ltd. (&ldquo;Code
              Square&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
              using the Site, you agree to them.
            </p>

            <hr />

            <h2>1. Use of this website</h2>
            <p>
              You&rsquo;re welcome to browse the Site, read our pages,
              and use the contact form to get in touch. You may not:
            </p>
            <ul>
              <li>
                Copy substantial portions of the Site&rsquo;s text,
                design, or code for commercial use without written
                permission
              </li>
              <li>
                Attempt to probe, scan, or disrupt the Site or its
                hosting infrastructure
              </li>
              <li>
                Use the contact form to send spam, unsolicited
                advertising, or anything unlawful
              </li>
            </ul>

            <h2>2. Enquiries are not a contract</h2>
            <p>
              Submitting the contact form does not create a client
              relationship. It starts a conversation. Nothing you send
              us, and nothing we reply, is binding until we both sign a
              written proposal or statement of work.
            </p>

            <h2>3. Proposals, scope, and pricing</h2>
            <p>
              Every engagement begins with a written proposal that
              lists the deliverables, the timeline, the price, and what
              is explicitly out of scope. Work starts when the proposal
              is accepted and any agreed deposit is received. Changes
              to scope are handled through a written change order with
              its own timeline and cost.
            </p>

            <h2>4. Intellectual property</h2>
            <p>
              On full payment, you own the custom code, designs, and
              content we produce for you, unless your proposal says
              otherwise. We retain ownership of:
            </p>
            <ul>
              <li>
                General tools, libraries, patterns, and know-how we use
                across projects
              </li>
              <li>
                Any third-party components, which remain under their
                own licenses
              </li>
              <li>
                The right to reference the project in our portfolio,
                unless you ask us in writing not to
              </li>
            </ul>

            <h2>5. Client responsibilities</h2>
            <p>
              To deliver good work on time, we need you to provide
              timely feedback, content, access, and decisions. Delays
              caused by outstanding client input may shift the project
              timeline accordingly.
            </p>

            <h2>6. Payment</h2>
            <p>
              Payment terms are set in each proposal. Unless otherwise
              agreed, invoices are due within 14 days. We reserve the
              right to pause work on overdue accounts.
            </p>

            <h2>7. Warranty and support</h2>
            <p>
              We fix defects in our own work at no cost for 30 days
              after handover. Beyond that window, ongoing support and
              maintenance are available under a separate agreement or
              on an hourly basis. We don&rsquo;t warranty third-party
              services (hosting, APIs, payment processors), though
              we&rsquo;ll help you work with them.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, our total
              liability arising from any engagement is limited to the
              fees you paid us for that engagement in the twelve months
              before the claim. We are not liable for indirect,
              incidental, or consequential losses, including lost
              profits or lost data.
            </p>

            <h2>9. Confidentiality</h2>
            <p>
              We treat anything you share with us as confidential and
              don&rsquo;t disclose it outside the team working on your
              project. You agree to keep confidential anything we share
              with you that isn&rsquo;t public.
            </p>

            <h2>10. Termination</h2>
            <p>
              Either side may end an engagement in writing. If you
              terminate, you pay for work completed up to that point.
              If we terminate without cause, we refund any fees for
              work not yet started. On termination, we hand over
              completed deliverables and any work in progress, as
              agreed.
            </p>

            <h2>11. Governing law</h2>
            <p>
              These terms are governed by the laws of Nepal. Any
              dispute will be handled in the courts of Kathmandu,
              unless we agree in writing to a different forum.
            </p>

            <h2>12. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The
              &ldquo;Last updated&rdquo; date at the top reflects the
              most recent revision. Continued use of the Site after an
              update means you accept the new terms.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about these terms? Write to us:
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
                <Link href="/privacy" className={styles.footLink}>
                  Privacy Policy
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