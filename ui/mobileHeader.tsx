"use client";

import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import MobileSearch from "@/ui/mobileSearch";

export default function MobileHeader() {
  const [isSearchVisible, setIsSearchVisible] = useState<bool>(false);

  function handleToggleSearch(boolVal) {
    setIsSearchVisible(boolVal);
  }
  return (
    <>
      <header className={clsx("w-minus-30 mx-auto mt-6")}>
        <div className={clsx("flex justify-between")}>
          <Link href="/">
            <Image
              className={clsx(`cursor-pointer`)}
              alt="Site Logo"
              src="/sgbc_logo.svg"
              width={102}
              height={50}
            />
          </Link>

          <div className={clsx("flex gap-4 mt-6")}>
            <Image
              className={clsx(`cursor-pointer`)}
              alt="Search Button"
              src="/search.svg"
              width={25}
              height={25}
              onClick={() => handleToggleSearch(true)}
            />
            <Image
              className={clsx(`cursor-pointer`)}
              alt="Search Button"
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
