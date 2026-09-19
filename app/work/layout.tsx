import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Code Square. A jewellery billing and inventory system built around Nepal Rastra Bank regulations.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Code Square",
    description:
      "Selected work from Code Square. Billing, inventory, and loan software for jewellery businesses.",
    url: "/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}