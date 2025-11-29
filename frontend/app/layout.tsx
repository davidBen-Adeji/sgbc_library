import type { Metadata } from "next";

import "./globals.css";

import MobileHeader from "@/ui/mobileHeader";

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
      <body>
        <MobileHeader />
        {children}
      </body>
    </html>
  );
}
