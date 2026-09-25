//app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — A Four-Person Software Studio",
  description:
    "Code Square is a four-person software company in Kathmandu, Nepal. Founded in 2026 by four friends building products together for years.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}