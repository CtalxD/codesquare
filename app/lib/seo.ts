// app/lib/seo.ts

import type { Metadata } from "next";
import { CONTACT } from "./contact";

/* ============================================================
   Facts (edit here)
   ============================================================ */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.codesquare.com.np";

export const SITE_NAME = "Code Square";
export const LEGAL_NAME = "Code Square Pvt. Ltd.";
export const EMAIL = CONTACT.email;
/* E.164 form for structured data. The same number is shown in the footer
   and on the contact page (see lib/contact.ts). */
export const PHONE = CONTACT.phoneHref.replace(/^tel:/, "");

export const SITE_TITLE = "Code Square | Software Company in Kathmandu, Nepal";

/* Keep under ~155 characters so Google does not cut it off */
export const SITE_DESCRIPTION =
  "Code Square is a software studio in Kathmandu, Nepal. We design and build websites, mobile apps and custom software for businesses in Nepal and abroad.";

/* Add your REAL profile URLs only (LinkedIn, GitHub, Facebook, Clutch,
   Google Business Profile...). They connect your brand across the web. */
export const SOCIALS: string[] = [
  // "https://www.linkedin.com/company/your-page",
  // "https://github.com/your-org",
];

export const TEAM = [
  { name: "Prithak Rai", role: "Backend & System Architecture" },
  { name: "Shrijan Thapa", role: "Project Manager & AI Engineer" },
  { name: "Sital Aryal", role: "Full Stack & UI/UX" },
  { name: "Sudil Maharjan", role: "Frontend & UI/UX" },
];

export const SERVICES = [
  {
    id: "ui-ux-design",
    name: "UI/UX design",
    type: "UI/UX Design",
    description:
      "Research, flows and interfaces tested with real users before a line of code is written.",
  },
  {
    id: "custom-software",
    name: "Custom software",
    type: "Custom Software Development",
    description:
      "Portals, dashboards and internal tools shaped around how your team already works.",
  },
  {
    id: "mobile-apps",
    name: "Mobile apps",
    type: "Mobile App Development",
    description:
      "iOS and Android apps that feel native, launch quickly and stay easy to maintain.",
  },
  {
    id: "websites",
    name: "Websites",
    type: "Website Development",
    description:
      "Fast, accessible sites designed to load quickly, rank well and look right on every screen.",
  },
];

/* ============================================================
   Helpers
   ============================================================ */
export const url = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Code Square - software studio in Kathmandu, Nepal",
  type: "image/png",
};

/* Per-page metadata. A child page's openGraph REPLACES the layout's, so
   this fills in url, title and image for every page. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string; // the layout template adds " | Code Square"
  description: string;
  path: string;
}): Metadata {
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NP",
      siteName: SITE_NAME,
      url: path,
      title: full,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}

/* ============================================================
   Structured data (JSON-LD)
   ============================================================ */
const address = {
  "@type": "PostalAddress",
  addressLocality: "Kathmandu",
  addressRegion: "Bagmati Province",
  addressCountry: "NP",
};

const areaServed = [
  { "@type": "City", name: "Kathmandu" },
  { "@type": "Country", name: "Nepal" },
  { "@type": "Place", name: "International" },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: ["CodeSquare", "Code Square Nepal"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
    caption: "Code Square logo",
  },
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  foundingDate: "2026",
  email: EMAIL,
  telephone: PHONE,
  address,
  areaServed,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  founder: TEAM.map((p) => ({
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: EMAIL,
      telephone: PHONE,
      availableLanguage: ["English", "Nepali"],
    },
  ],
  knowsAbout: [
    "Website Development",
    "Mobile App Development",
    "Custom Software Development",
    "UI UX Design",
    "Frontend Development",
    "Backend Development",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        serviceType: s.type,
        description: s.description,
      },
    })),
  },
  ...(SOCIALS.length ? { sameAs: SOCIALS } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: ["CodeSquare", "Code Square Nepal"],
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

/* [name, path] pairs, first one is Home */
export const breadcrumbSchema = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: url(path),
  })),
});

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Code Square services",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": `${SITE_URL}/services#${s.id}`,
      url: `${SITE_URL}/services#${s.id}`,
      name: s.name,
      serviceType: s.type,
      description: s.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed,
    },
  })),
};

export const pageSchema = (
  type: "AboutPage" | "ContactPage",
  path: string,
  name: string,
  description: string,
) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": `${url(path)}#webpage`,
  url: url(path),
  name,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
});