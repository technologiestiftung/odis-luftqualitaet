import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luftqualitätskarte für Berlin",
  description: "Wo gibt es Bedarf für Luftverbesserung in Berlin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="w-full h-full">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
