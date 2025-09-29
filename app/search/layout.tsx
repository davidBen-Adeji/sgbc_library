import SearchParamWatcher from "@/app/search/_ui/searchParamWatcher";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SearchParamWatcher />
      {children}
    </>
  );
}
