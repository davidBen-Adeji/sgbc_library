"use client";

import Image from "next/image";

import { useState } from "react";

import MobileSearch from "@/ui/mobileSearch";
import SiteLogo from "@/ui/siteLogo";

export default function MobileHeader() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleToggleSearch(boolVal: boolean) {
    setIsSearchVisible(boolVal);
  }

  return (
    <>
      <header className="w-container max-w-5xl mx-auto pt-6">
        <div className="flex justify-between">
          <SiteLogo />
          {/* search button + menu button */}
          <div className="flex gap-4 mt-6">
            <Image
              className="cursor-pointer"
              alt="Search Button"
              src="/search.svg"
              width={25}
              height={25}
              onClick={() => handleToggleSearch(true)}
            />
            <Image
              className="cursor-pointer"
              alt="Menu Button"
              src="/menu.svg"
              width={30}
              height={30}
            />
          </div>
        </div>
      </header>
      <MobileSearch
        onToggleSearch={handleToggleSearch}
        isVisible={isSearchVisible}
      />
    </>
  );
}
