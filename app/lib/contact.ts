// app/lib/contact.ts
//
// Single source of truth for the contact details shown on the site (footer,
// contact page) and published in the structured data (lib/seo.ts), so they
// can never drift apart.
//
// The NEXT_PUBLIC_* values come from the Vercel environment variables. They
// are inlined at build time, so redeploy after changing them. The fallbacks
// below are the same values, so the site still works if a variable is missing.

export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "codesquare2026@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+977 9813301334",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "tel:+9779813301334",
  hours: "Sun – Fri, 10:00 – 18:00 NPT",
  place: "Kathmandu, Nepal",
};
