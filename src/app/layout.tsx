import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalaakars — Architecture Studio | Calicut, Kerala",
  description: "Kalaakars is a boutique architecture studio based in Calicut (Kozhikode), Kerala. We design structures rooted in the Malabar spirit — where monsoon light, material honesty, and spatial transcendence meet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
