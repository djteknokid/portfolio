import { Playfair_Display, Inter } from "next/font/google";
import "../mindbook/mindbook.css";

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

export default function KtalkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`mindbook-root ${playfair.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
