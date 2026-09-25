//app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Tell Us About Your Project",
  description:
    "Contact Code Square for a free consultation. We reply within one business day with honest thoughts on scope, timeline, and cost.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}