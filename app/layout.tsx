//app/layout.tsx
import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.codesquare.com.np";

const SITE_NAME = "Code Square";

const SITE_DESCRIPTION =
  "Code Square is a software studio in Kathmandu, Nepal building websites, mobile applications, custom software and digital experiences for businesses in Nepal and international markets.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${SITE_URL}/#organization`,

  name: "Code Square",
  legalName: "Code Square Pvt. Ltd.",

  alternateName: [
    "Code Square Nepal",
    "Code Square Kathmandu",
    "CodeSquare",
    "Code Square Pvt Ltd",
  ],

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

  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati Province",
    addressCountry: "NP",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Kathmandu",
    },
    {
      "@type": "Country",
      name: "Nepal",
    },
    {
      "@type": "Place",
      name: "International",
    },
  ],

  knowsAbout: [
    "Web Development",
    "Website Development",
    "Software Development",
    "Custom Software Development",
    "Mobile App Development",
    "UI UX Design",
    "Frontend Development",
    "Backend Development",
    "Digital Product Development",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  name: SITE_NAME,

  alternateName: [
    "Code Square Nepal",
    "Code Square Kathmandu",
    "CodeSquare",
  ],

  url: SITE_URL,

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en",
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",

  "@id": `${SITE_URL}/#business`,

  name: "Code Square Pvt. Ltd.",

  alternateName: [
    "Code Square",
    "Code Square Nepal",
    "Code Square Kathmandu",
  ],

  url: SITE_URL,

  image: `${SITE_URL}/og-image.png`,

  logo: `${SITE_URL}/logo.png`,

  description: SITE_DESCRIPTION,

  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati Province",
    addressCountry: "NP",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Kathmandu",
    },
    {
      "@type": "Country",
      name: "Nepal",
    },
    {
      "@type": "Place",
      name: "International",
    },
  ],

  serviceType: [
    "Website Development",
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "UI UX Design",
  ],

  parentOrganization: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Code Square | Software Company & Digital Product Studio in Kathmandu, Nepal",

    template: "%s | Code Square",
  },

  description: SITE_DESCRIPTION,

  applicationName: "Code Square",

  generator: "Next.js",

  referrer: "origin-when-cross-origin",

  keywords: [
    "Code Square",
    "CodeSquare",
    "Code Square Nepal",
    "Code Square Kathmandu",
    "Code Square Pvt Ltd",
    "Code Square software company",
    "Code Square Nepal software company",

    "software company Kathmandu",
    "software company in Kathmandu",
    "IT company Kathmandu",
    "IT company in Kathmandu",
    "software development company Kathmandu",
    "software development company Nepal",

    "web development Kathmandu",
    "web development Nepal",
    "website development Kathmandu",
    "website development Nepal",

    "mobile app development Kathmandu",
    "mobile app development Nepal",

    "custom software development Nepal",
    "custom software development Kathmandu",

    "UI UX design Nepal",
    "UI UX design Kathmandu",

    "digital product development Nepal",
    "software studio Kathmandu",
    "software studio Nepal",
    "technology company Nepal",
  ],

  authors: [
    {
      name: "Code Square Pvt. Ltd.",
      url: SITE_URL,
    },
  ],

  creator: "Code Square Pvt. Ltd.",
  publisher: "Code Square Pvt. Ltd.",

  category: "Technology",

  classification: "Software Development",

  alternates: {
    canonical: SITE_URL,

    languages: {
      "en-NP": SITE_URL,
      en: SITE_URL,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_NP",

    url: SITE_URL,

    siteName: SITE_NAME,

    title:
      "Code Square | Software Company & Digital Product Studio in Kathmandu, Nepal",

    description: SITE_DESCRIPTION,

    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Code Square - Software Company and Digital Product Studio in Kathmandu, Nepal",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Code Square | Software Company & Digital Product Studio in Kathmandu, Nepal",

    description: SITE_DESCRIPTION,

    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        alt: "Code Square - Software Company and Digital Product Studio",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              professionalServiceSchema,
            ]),
          }}
        />

        <a href="#main" className="skipLink">
          Skip to content
        </a>

        <ScrollToTop />

        <Navbar />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}