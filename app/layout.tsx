//app/layout.tsx
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code Square Pvt. Ltd. - Software studio in Nepal",
  description:
    "Code Square is a Nepal-based software studio building websites, mobile apps, and custom software for businesses at home and abroad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}