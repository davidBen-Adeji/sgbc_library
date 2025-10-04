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
          { caption: "SGBC Library", href: "/sgbc" },
          { caption: "GTS", href: "/gts" },
        ]}
      />
      {children}
    </main>
  );
}
