import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Meet the team behind Code Square. A small, focused software studio that designs and engineers together in one room.",
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title: "Studio | Code Square",
    description:
      "Meet the team behind Code Square. A small, focused software studio.",
    url: "/studio",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}