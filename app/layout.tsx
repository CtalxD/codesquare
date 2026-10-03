// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  LEGAL_NAME,
  organizationSchema,
  websiteSchema,
} from "./lib/seo";
import "./globals.css";

const sans = Instrument_Sans({
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12332e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | Code Square",
  },

  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  creator: LEGAL_NAME,
  publisher: LEGAL_NAME,
  category: "Technology",

  /* Pages override this with their own canonical (see lib/seo.ts) */
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Square - software studio in Kathmandu, Nepal",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        alt: "Code Square - software studio in Kathmandu, Nepal",
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

  /* Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in .env.local
     with the codes Search Console and Bing Webmaster Tools give you. */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />

        {/* Hidden until focused with the keyboard (styled in globals.css) */}
        <a href="#main" className="skipLink">
          Skip to content
        </a>

        <Navbar />

        {/* Each page renders its own <main>, so this wrapper is a div. */}
        <div id="main" tabIndex={-1}>
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}