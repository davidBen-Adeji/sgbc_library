import "./globals.css";

import MobileHeader from "@/ui/mobileHeader";

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
