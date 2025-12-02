"use client";

import DesktopSearchBox from "@/ui/desktopSearchBox";
import DesktopNav from "@/ui/desktopNav";

import SiteLogo from "@/ui/siteLogo";

export default function DesktopHeader() {
  return (
    <header className="w-container max-w-5xl mx-auto pt-7 hidden sm:flex justify-between items-center">
      <div className="flex gap-12">
        <SiteLogo />
        <DesktopSearchBox />
      </div>
      <DesktopNav />
    </header>
  );
}
