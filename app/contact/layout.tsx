// app/contact/layout.tsx
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { pageMeta, breadcrumbSchema, pageSchema } from "../lib/seo";

const TITLE = "Contact Us - Start Your Project";
const DESCRIPTION =
  "Contact Code Square in Kathmandu for a free consultation. We reply within one business day with honest thoughts on scope, timeline, and cost.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactLayout({
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
            ["Contact", "/contact"],
          ]),
          pageSchema("ContactPage", "/contact", TITLE, DESCRIPTION),
        ]}
      />
      {children}
    </>
  );
}