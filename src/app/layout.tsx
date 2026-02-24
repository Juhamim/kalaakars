import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalaakars — Architecture Studio",
  description: "Kalaakars is a boutique architecture studio based in Mumbai, India. We design structures that transcend gravity and redefine spatial reality.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
