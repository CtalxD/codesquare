//app/quote/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote - One Reply, No Pressure",
  description:
    "Get a written scope, fixed price, and timeline from Code Square within one business day. Free to ask, no follow-up calls unless you want them.",
  alternates: { canonical: "/quote" },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}