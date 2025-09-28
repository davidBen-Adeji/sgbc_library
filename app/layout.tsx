import type { Metadata } from "next";
import "./globals.css";

// import Header from "@/ui/header";

export const metadata: Metadata = {
  title: "SGBC Library",
  description: "Sovereign Grace Bible Church Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
