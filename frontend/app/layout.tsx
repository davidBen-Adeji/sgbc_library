import type { Metadata } from "next";

import "./globals.css";

import MobileHeader from "@/ui/mobileHeader";
import DesktopHeader from "@/ui/desktopHeader";

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
        <DesktopHeader />
        {children}
      </body>
    </html>
  );
}
