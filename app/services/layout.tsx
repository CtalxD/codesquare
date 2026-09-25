//app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Websites, Apps, Software & Design",
  description:
    "Four services from Code Square: website development, mobile app development, custom software, and UI/UX design. Built in Kathmandu for clients in Nepal and abroad.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}