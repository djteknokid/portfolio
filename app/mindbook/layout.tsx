import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./mindbook.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Symbolic Systems for PM & UX",
  description: "How minds and machines represent meaning — a field guide for product thinkers.",
};

export default function MindbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`mindbook-root ${playfair.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
