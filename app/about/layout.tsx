// app/about/layout.tsx
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { pageMeta, breadcrumbSchema, pageSchema } from "../lib/seo";

const TITLE = "About - Four-Person Studio in Kathmandu";
const DESCRIPTION =
  "Code Square is a four-person software company in Kathmandu, Nepal. Founded in 2026 by four friends building products together for years.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutLayout({
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
            ["About", "/about"],
          ]),
          pageSchema("AboutPage", "/about", TITLE, DESCRIPTION),
        ]}
      />
      {children}
    </>
  );
}