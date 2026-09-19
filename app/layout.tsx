import type { Metadata, Viewport } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import { JsonLd } from "./components/JsonLd";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#e8ecee",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://codesquare-eight.vercel.app"),
  title: {
    default: "Code Square — Software Studio",
    template: "%s | Code Square",
  },
  description:
    "A software studio building websites, applications, and custom software. Based remotely, working with clients worldwide.",
  keywords: [
    "software studio",
    "web development",
    "custom software",
    "web applications",
    "mobile apps",
    "UI UX design",
    "Code Square",
  ],
  authors: [{ name: "Code Square" }],
  creator: "Code Square",
  publisher: "Code Square",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codesquare-eight.vercel.app",
    siteName: "Code Square",
    title: "Code Square — Software Studio",
    description:
      "A software studio building websites, applications, and custom software.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Square — Software Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Square — Software Studio",
    description:
      "A software studio building websites, applications, and custom software.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Code Square",
  url: "https://codesquare-eight.vercel.app",
  email: "codesquare2026@gmail.com",
  description:
    "A software studio building websites, applications, and custom software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${inter.variable} ${mono.variable}`}
      >
        <JsonLd data={organizationSchema} />
        <Cursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}