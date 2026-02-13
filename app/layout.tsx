import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TiendexApp",
  description: "Credit & Inventory Management for Small Latin American Stores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
