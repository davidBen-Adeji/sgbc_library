"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import useQuerySearchField from "@/hooks/useQuerySearchField";
import SearchResultSkeleton from "@/ui/searchResultSkeleton";
import SearchResult from "@/ui/searchResult";
import { categories } from "@/lib/categories";

import SiteLogo from "@/ui/siteLogo";

export default function DesktopHeader() {
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const pathName = usePathname();
  const categoriesRef = useRef<HTMLLIElement>(null);
  const debouncedSearch = useDebounce(search, 1000);
  const router = useRouter();
  const { isLoading, results } = useQuerySearchField(debouncedSearch);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (categoriesRef.current && !categoriesRef.current.contains(target)) {
        setIsDropDownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoriesRef]);

  function handleToggleDropdown() {
    setIsDropDownVisible((prevVal) => !prevVal);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (search.trim() === "") return;

    const searchTerm = search.trim();

    setSearch("");

    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <header className="w-container max-w-5xl mx-auto pt-7 hidden sm:flex justify-between items-center">
      <div className="flex gap-12">
        <SiteLogo />
        <form className="mt-4 relative" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Book, ISBN, Author"
            className="w-[40vw] max-w-lg border border-gray-400 outline-0 focus:ring-1 focus:ring-blue-500 rounded-3xl py-2 px-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchResultsVisible(true)}
            onBlur={() =>
              setTimeout(() => setIsSearchResultsVisible(false), 300)
            }
          />
          {isSearchResultsVisible && (
            <div>
              {debouncedSearch.trim() && (
                <div className="absolute left-0 mt-2 w-[100%] bg-white border border-gray-200 max-h-[300px] z-50 rounded-md overflow-y-scroll">
                  {isLoading ? (
                    <SearchResultSkeleton />
                  ) : (
                    <ul>
                      {results.length === 0 && debouncedSearch && (
                        <p className="text-gray-500 my-2 ml-4">
                          No results found
                        </p>
                      )}
                      {results.map((result) => (
                        <SearchResult key={result._id} result={result} />
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
      <nav className="mt-5">
        <ul className="flex gap-4">
          <li className={clsx(pathName === "/authors" && "font-bold")}>
            <Link href="/authors">Authors</Link>
          </li>
          <li className="relative" ref={categoriesRef}>
            <span className="cursor-pointer" onClick={handleToggleDropdown}>
              Categories
              <Image
                src="/chevrondown.svg"
                alt="arrow button"
                height={15}
                width={15}
                className={clsx("inline ml-1")}
              />
            </span>
            {isDropdownVisible && (
              <ul
                className={clsx(
                  "absolute z-50 bg-gray-100 rounded p-2 space-y-2 mt-4 w-[300px] right-0",
                )}
              >
                {categories.map((category) => (
                  <li
                    key={category}
                    className="hover:bg-gray-400 focus:bg-gray-400 cursor-pointer p-2"
                  >
                    <Link
                      onClick={handleToggleDropdown}
                      href={`/categories/${category}`}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
