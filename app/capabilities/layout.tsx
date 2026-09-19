import type { Metadata } from "next";
import { JsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Websites, web applications, custom software, mobile apps, UI/UX design, and ongoing partnership. See what Code Square builds and how projects run.",
  alternates: {
    canonical: "/capabilities",
  },
  openGraph: {
    title: "Capabilities | Code Square",
    description:
      "Websites, web applications, custom software, mobile apps, UI/UX design, and ongoing partnership.",
    url: "/capabilities",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Websites",
        description: "Marketing sites, landing pages, and content platforms.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Web Applications",
        description: "Dashboards, portals, and internal tools.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Custom Software",
        description: "Software built around your workflow.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Mobile Applications",
        description: "Apps for iOS and Android.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "UI and UX Design",
        description: "Interface design, flows, and design systems.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "Ongoing Partnership",
        description: "Improvements after launch.",
        provider: { "@type": "Organization", name: "Code Square" },
      },
    },
  ],
};

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={servicesSchema} />
      {children}
    </>
  );
}