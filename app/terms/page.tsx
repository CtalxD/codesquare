// app/terms/page.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import styles from "../css/terms.module.css";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Code Square website and send us an enquiry.",
  path: "/terms",
});

/* ============================================================
   Content (edit here)
   ============================================================ */
const EMAIL = "codesquare2026@gmail.com";
const UPDATED = "3 October 2026";

const sections: { id: string; t: string; body: ReactNode }[] = [
  {
    id: "agreement",
    t: "Agreement to these terms",
    body: (
      <p>
        These terms apply to your use of the Code Square website, operated by
        Code Square Pvt. Ltd. (&ldquo;Code Square&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) in Kathmandu, Nepal. By using the website you agree
        to them. If you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    id: "our-services",
    t: "Our services and enquiries",
    body: (
      <>
        <p>
          This website describes the services we offer: UI/UX design, custom
          software, mobile apps and websites. The descriptions are for
          general information.
        </p>
        <p>
          Sending an enquiry through the contact form does not create a
          contract. Any project we take on is covered by a separate written
          agreement or proposal that sets out the scope, timeline, price and
          ownership of the work. If that agreement conflicts with these terms,
          the agreement wins for that project.
        </p>
      </>
    ),
  },
  {
    id: "using-the-site",
    t: "Using the website",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the site for anything unlawful or fraudulent</li>
          <li>
            send spam, automated submissions or misleading enquiries through
            the contact form
          </li>
          <li>
            try to break, overload or gain unauthorised access to the site or
            its systems
          </li>
          <li>copy or scrape the site in a way that harms it or us</li>
        </ul>
        <p>
          When you send us information, please make sure it is accurate and
          that you are allowed to share it.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    t: "Intellectual property",
    body: (
      <>
        <p>
          The website&apos;s design, text, graphics, code and the Code Square
          name and logo belong to Code Square or its licensors. You may view
          the site and share its pages, but you may not copy, modify or reuse
          our content or branding without our written permission.
        </p>
        <p>
          Ownership of work we create for a client is set out in the agreement
          for that project.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    t: "Third-party services and links",
    body: (
      <p>
        The site may link to or rely on services run by others, such as the
        form service that delivers your message to us. We do not control these
        and are not responsible for their content or practices. Please read
        their own terms and policies.
      </p>
    ),
  },
  {
    id: "disclaimer",
    t: "Disclaimer",
    body: (
      <p>
        We work to keep the website accurate and available, but it is provided
        &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We do not promise
        that it will always be error-free, uninterrupted or free of harmful
        components, and information on it is not professional advice.
      </p>
    ),
  },
  {
    id: "liability",
    t: "Limitation of liability",
    body: (
      <p>
        To the fullest extent the law allows, Code Square is not liable for
        any indirect, incidental or consequential loss arising from your use
        of the website. Nothing in these terms limits liability that cannot be
        limited by law. Liability for project work is governed by the
        agreement for that project.
      </p>
    ),
  },
  {
    id: "privacy",
    t: "Privacy",
    body: (
      <p>
        How we handle personal information is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link>, which forms part of these
        terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    t: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Nepal. Any dispute that
        cannot be resolved by talking it through will be brought before the
        courts of Kathmandu, Nepal.
      </p>
    ),
  },
  {
    id: "changes",
    t: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The date at the top of
        the page shows when they last changed. Continuing to use the site
        after a change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    t: "Contact us",
    body: (
      <p>
        Questions about these terms? Write to{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

/* ============================================================
   Page
   ============================================================ */
export default function TermsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Legal</p>
          <h1 className={styles.title}>Terms of service</h1>
          <p className={styles.lead}>
            The ground rules for using this website and sending us an
            enquiry. Short and in plain language.
          </p>
          <p className={styles.updated}>Last updated {UPDATED}</p>
        </header>

        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="On this page">
            <p className={styles.tocHead}>On this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.content}>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={styles.section}>
                <h2 className={styles.h2}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.t}
                </h2>
                <div className={styles.body}>{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}