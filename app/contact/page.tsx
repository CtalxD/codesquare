//app/contact/page.tsx
"use client";

import {
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import styles from "../css/contact.module.css";

const v = (o: Record<string, number | string>) =>
  o as unknown as CSSProperties;

/* ============================================================
   Content (edit here)
   ============================================================ */
const EMAIL = "codesquare2026@gmail.com";

/* Web3Forms access key lives in .env.local:
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key                          */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const services = [
  "UI/UX design",
  "Custom software",
  "Mobile apps",
  "Websites",
  "Not sure yet",
];

const timelines = ["As soon as possible", "In a month or two", "Just exploring"];

const team = [
  { n: "Prithak Rai", img: "/pr.jpg" },
  { n: "Shrijan Thapa", img: "/sbt.jpg" },
  { n: "Sital Aryal", img: "/si.jpeg" },
  { n: "Sudil Maharjan", img: "/sm.jpg" },
];

/* [ISO, name, dial code, min digits, max digits] (digits after the country code) */
const countries = (
  [
    ["NP", "Nepal", "977", 8, 10],
    ["IN", "India", "91", 10, 10],
    ["US", "United States", "1", 10, 10],
    ["CA", "Canada", "1", 10, 10],
    ["GB", "United Kingdom", "44", 10, 10],
    ["AU", "Australia", "61", 9, 9],
    ["NZ", "New Zealand", "64", 8, 10],
    ["BD", "Bangladesh", "880", 10, 10],
    ["PK", "Pakistan", "92", 10, 10],
    ["LK", "Sri Lanka", "94", 9, 9],
    ["BT", "Bhutan", "975", 8, 8],
    ["AE", "UAE", "971", 9, 9],
    ["SA", "Saudi Arabia", "966", 9, 9],
    ["QA", "Qatar", "974", 8, 8],
    ["SG", "Singapore", "65", 8, 8],
    ["MY", "Malaysia", "60", 9, 10],
    ["TH", "Thailand", "66", 9, 9],
    ["PH", "Philippines", "63", 10, 10],
    ["ID", "Indonesia", "62", 9, 12],
    ["CN", "China", "86", 11, 11],
    ["JP", "Japan", "81", 10, 10],
    ["KR", "South Korea", "82", 9, 10],
    ["DE", "Germany", "49", 10, 11],
    ["FR", "France", "33", 9, 9],
    ["NL", "Netherlands", "31", 9, 9],
    ["ES", "Spain", "34", 9, 9],
    ["IT", "Italy", "39", 9, 10],
    ["ZA", "South Africa", "27", 9, 9],
    ["NG", "Nigeria", "234", 10, 10],
    ["BR", "Brazil", "55", 10, 11],
    ["MX", "Mexico", "52", 10, 10],
  ] as [string, string, string, number, number][]
).map(([iso, name, dial, min, max]) => ({ iso, name, dial, min, max }));

/* Rate limit (per browser): a short cooldown plus an hourly cap.
   This is a deterrent only; Web3Forms enforces its own limits too. */
const LIMIT_KEY = "cs_contact_sends";
const MAX_PER_HOUR = 3;
const HOUR = 60 * 60 * 1000;
const COOLDOWN = 30 * 1000;

function checkRateLimit(): string | null {
  try {
    const now = Date.now();
    const sends: number[] = JSON.parse(
      localStorage.getItem(LIMIT_KEY) || "[]",
    ).filter((t: number) => now - t < HOUR);
    const last = sends[sends.length - 1];
    if (last && now - last < COOLDOWN) {
      return `Please wait ${Math.ceil((COOLDOWN - (now - last)) / 1000)} seconds before sending another message.`;
    }
    if (sends.length >= MAX_PER_HOUR) {
      return `You've reached the limit of ${MAX_PER_HOUR} messages per hour. Try again in ${Math.ceil((HOUR - (now - sends[0])) / 60000)} minutes, or email ${EMAIL}.`;
    }
    localStorage.setItem(LIMIT_KEY, JSON.stringify([...sends, now]));
  } catch {
    /* storage blocked: skip the local limit */
  }
  return null;
}

type Status = "idle" | "sending" | "sent" | "error";

/* ============================================================
   Page
   ============================================================ */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [iso, setIso] = useState("NP");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [when, setWhen] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const country = countries.find((c) => c.iso === iso) ?? countries[0];
  const range =
    country.min === country.max
      ? `${country.min}`
      : `${country.min}–${country.max}`;
  const phoneOk = phone.length >= country.min && phone.length <= country.max;
  const phoneBad = phoneTouched && !phoneOk;

  const done = [name.trim(), picked.length, email.trim(), phoneOk].filter(
    Boolean,
  ).length;
  const ready = done === 4;

  const onPhone = (val: string) =>
    setPhone(val.replace(/\D/g, "").replace(/^0+/, "").slice(0, country.max));
  const onCountry = (code: string) => {
    const c = countries.find((x) => x.iso === code) ?? countries[0];
    setIso(code);
    setPhone((p) => p.slice(0, c.max));
  };

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const glow = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    /* Spam trap: real visitors never see or fill this field */
    const trap = new FormData(e.currentTarget).get("botcheck");
    if (trap) return;

    if (!phoneOk) {
      setPhoneTouched(true);
      return;
    }

    const limited = checkRateLimit();
    if (limited) {
      setErrMsg(limited);
      setStatus("error");
      return;
    }

    if (!ACCESS_KEY) {
      setErrMsg(`We couldn't send that. Please email us at ${EMAIL}.`);
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Project enquiry from ${name.trim()}`,
          from_name: "Code Square website",
          name: name.trim(),
          email: email.trim(),
          phone: `+${country.dial} ${phone}`,
          country: country.name,
          services: picked.join(", "),
          timeline: when || "Not specified",
          message: msg.trim() || "(no message)",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setPhoneTouched(false);
      setPicked([]);
      setWhen("");
      setMsg("");
    } catch {
      setErrMsg(
        `We couldn't send that. Please try again, or write to us at ${EMAIL}.`,
      );
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is still visible */
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ---------- Left: dark panel ---------- */}
        <section
          className={styles.hero}
          onPointerMove={glow}
          aria-label="Get in touch"
        >
          <span className={styles.glow} aria-hidden="true" />

          <div className={styles.heroBody}>
            <p className={styles.kicker}>Contact</p>
            <h1 className={styles.title}>
              Let&apos;s build something{" "}
              <span className={styles.hl}>people use</span>
            </h1>
            <p className={styles.lead}>
              Tell us what you have in mind. A real person on our team reads
              every message.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className={styles.mail}
              aria-label={EMAIL}
            >
              {EMAIL.split("").map((ch, i) => (
                <span key={i} className={styles.ch} aria-hidden="true">
                  {ch}
                </span>
              ))}
            </a>

            <div className={styles.meta}>
              <button type="button" className={styles.copy} onClick={copy}>
                {copied ? "Copied ✓" : "Copy address"}
              </button>
              <p className={styles.status}>
                <span className={styles.dot} aria-hidden="true" />
                We reply within one business day.
              </p>
            </div>

            <div className={styles.crew}>
              <ul className={styles.team} aria-label="The Code Square team">
                {team.map((m, i) => (
                  <li
                    key={m.n}
                    className={styles.avatar}
                    style={v({ "--i": i })}
                    title={m.n}
                  >
                    {m.img ? (
                      <Image
                        src={m.img}
                        alt={m.n}
                        fill
                        sizes="44px"
                        className={styles.avatarImg}
                      />
                    ) : (
                      <span role="img" aria-label={m.n}>
                        {m.n
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className={styles.teamNote}>
                You talk to the four people who build your product.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Right: fill-in-the-blanks form ---------- */}
        <section className={styles.formWrap}>
          <div className={styles.progress}>
            <span className={styles.bar} aria-hidden="true">
              <i style={v({ "--p": done / 4 })} />
            </span>
            <span className={styles.step}>
              {ready ? "Ready when you are" : `${done} of 4 filled in`}
            </span>
          </div>

          <form
            className={styles.form}
            onSubmit={submit}
            aria-label="Contact form"
          >
            {/* Honeypot */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
            />

            <p className={styles.story}>
              Hi, I&apos;m{" "}
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="your name"
                aria-label="Your name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
              and I&apos;d like help with
            </p>

            <div
              className={styles.chips}
              role="group"
              aria-label="What do you need help with?"
            >
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={styles.chip}
                  aria-pressed={picked.includes(s)}
                  onClick={() => toggle(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className={styles.story}>I&apos;d like to start</p>
            <div
              className={styles.chips}
              role="group"
              aria-label="When would you like to start?"
            >
              {timelines.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={styles.chip}
                  aria-pressed={when === t}
                  onClick={() => setWhen(when === t ? "" : t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className={styles.story}>Here&apos;s a little about it:</p>
            <textarea
              className={styles.area}
              name="message"
              rows={4}
              placeholder="What are you building, and who is it for?"
              aria-label="About your project"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <p className={styles.story}>
              You can reach me at{" "}
              <input
                className={`${styles.input} ${styles.wide}`}
                type="email"
                name="email"
                placeholder="you@email.com"
                aria-label="Your email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p className={styles.story}>and my phone number is</p>
            <div className={styles.phone} data-invalid={phoneBad}>
              <select
                className={styles.cc}
                aria-label="Country code"
                value={iso}
                onChange={(e) => onCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.iso} value={c.iso}>
                    {c.name} (+{c.dial})
                  </option>
                ))}
              </select>
              <input
                className={styles.num}
                type="tel"
                name="phone"
                inputMode="numeric"
                required
                onInvalid={() => setPhoneTouched(true)}
                autoComplete="tel-national"
                placeholder={`${"9".repeat(country.max)}`.replace(/9/g, "0")}
                aria-label="Phone number"
                aria-invalid={phoneBad}
                aria-describedby="phone-hint"
                maxLength={country.max}
                value={phone}
                onChange={(e) => onPhone(e.target.value)}
                onBlur={() => setPhoneTouched(true)}
              />
            </div>
            <p
              id="phone-hint"
              className={styles.hint}
              data-invalid={phoneBad}
            >
              {phone || phoneBad
                ? `${country.name} numbers have ${range} digits (you've entered ${phone.length}).`
                : `Required. ${country.name} numbers have ${range} digits.`}
            </p>

            <button
              type="submit"
              className={styles.send}
              data-ready={ready}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            {status === "sent" && (
              <p className={styles.sent} role="status">
                Thanks, your message is on its way. We&apos;ll reply within one
                business day.
              </p>
            )}
            {status === "error" && (
              <p className={styles.error} role="alert">
                {errMsg}
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}