// app/privacy/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import styles from "../css/privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Code Square Pvt. Ltd. collects, uses and protects the information you send us through this website.",
  alternates: { canonical: "/privacy" },
};

/* ============================================================
   Content (edit here)
   ============================================================ */
const EMAIL = "codesquare2026@gmail.com";
const UPDATED = "3 October 2026";

const sections: { id: string; t: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    t: "Who we are",
    body: (
      <>
        <p>
          This website is run by Code Square Pvt. Ltd. (&ldquo;Code
          Square&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a software and
          design studio based in Kathmandu, Nepal. We are responsible for the
          personal information described in this policy.
        </p>
        <p>
          You can reach us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    t: "What we collect",
    body: (
      <>
        <p>
          <strong>Information you give us.</strong> When you use the contact
          form, we receive what you type into it:
        </p>
        <ul>
          <li>your name and email address</li>
          <li>your phone number and the country you selected</li>
          <li>the services you are interested in and when you want to start</li>
          <li>any message or project details you choose to write</li>
        </ul>
        <p>
          <strong>Information stored in your browser.</strong> To limit spam,
          the contact form saves the times of your recent submissions in your
          browser&apos;s local storage. This stays on your device and is not
          sent to us.
        </p>
        <p>
          <strong>Technical information.</strong> Like most websites, our
          hosting provider may record basic technical data such as IP address,
          browser type and the pages requested, for security and reliability.
        </p>
        <p>
          At the time of writing, this website does not use advertising
          trackers. If that changes, we will update this page.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    t: "How we use it",
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>reply to your enquiry and discuss your project</li>
          <li>prepare proposals, estimates and next steps you ask for</li>
          <li>protect the website from spam and abuse</li>
          <li>meet legal obligations</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    t: "Who we share it with",
    body: (
      <>
        <p>
          Contact form messages are delivered through{" "}
          <strong>Web3Forms</strong>, a form service that passes the message
          to our email inbox. Our email is hosted by Google. These providers
          process your information only to deliver it to us, under their own
          privacy terms.
        </p>
        <p>
          We may also share information when the law requires it, or with
          professional advisers who are bound to keep it confidential. We do
          not share it with anyone else for their own marketing.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    t: "How long we keep it",
    body: (
      <p>
        We keep enquiries for as long as we need them to reply, to carry out
        any work we agree on, and to keep a reasonable record of the
        conversation. If an enquiry does not lead to a project, we delete it
        when it is no longer useful. You can ask us to delete it sooner at any
        time.
      </p>
    ),
  },
  {
    id: "your-rights",
    t: "Your choices and rights",
    body: (
      <>
        <p>You can email us to:</p>
        <ul>
          <li>ask what information we hold about you</li>
          <li>correct anything that is wrong</li>
          <li>ask us to delete your information</li>
          <li>object to us contacting you again</li>
        </ul>
        <p>
          We will respond within a reasonable time. You can also clear your
          browser&apos;s local storage at any time to remove the spam-limit
          data described above.
        </p>
      </>
    ),
  },
  {
    id: "security",
    t: "Security",
    body: (
      <p>
        We use reasonable technical and organisational measures to protect
        your information, including encrypted connections (HTTPS) and limiting
        access to the people who need it. No method of transmission or storage
        is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "children",
    t: "Children",
    body: (
      <p>
        This website is for businesses and adults. It is not directed at
        children under 18, and we do not knowingly collect their information.
        If you believe a child has sent us information, email us and we will
        delete it.
      </p>
    ),
  },
  {
    id: "changes",
    t: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of
        the page shows when it last changed. If we make a significant change,
        we will make it clear on this page.
      </p>
    ),
  },
  {
    id: "contact",
    t: "Contact us",
    body: (
      <p>
        Questions about this policy or your information? Write to{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. You can also read our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

/* ============================================================
   Page
   ============================================================ */
export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Legal</p>
          <h1 className={styles.title}>Privacy policy</h1>
          <p className={styles.lead}>
            What we collect when you use this website, why we collect it, and
            the choices you have. Short and in plain language.
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