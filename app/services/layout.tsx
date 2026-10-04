// app/services/layout.tsx
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { pageMeta, breadcrumbSchema, servicesSchema } from "../lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Web, Mobile & Software Development in Nepal",
  description:
    "Website development, mobile app development, custom software and UI/UX design from Code Square in Kathmandu. Weekly releases and support after launch.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            ["Home", "/"],
            ["Services", "/services"],
          ]),
          servicesSchema,
        ]}
      />
      {children}
    </>
  );
}