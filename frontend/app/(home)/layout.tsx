import NavLinks from "@/ui/navLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavLinks
        links={[
          { caption: "All", href: "/" },
          { caption: "SGBC", href: "/sgbc" },
          { caption: "GTS", href: "/gts" },
          { caption: "Popular", href: "/popular" },
        ]}
      />
      {children}
    </main>
  );
}
