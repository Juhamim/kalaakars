import type { Metadata } from "next";
import "./globals.css";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "KALAAKARS | Zero-Gravity Luxury Architecture",
  description: "Boutique luxury architecture studio specializing in zero-gravity design and innovative structural reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
