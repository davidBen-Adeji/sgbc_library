"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useQuerySearchField from "@/hooks/useQuerySearchField";
import SearchResultSkeleton from "@/ui/searchResultSkeleton";
import SearchResult from "@/ui/searchResult";

interface MobileSearchProps {
  isVisible: boolean;
  onToggleSearch: (value: boolean) => void;
}

export default function MobileSearch({
  isVisible,
  onToggleSearch,
}: MobileSearchProps) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500); // 500ms delay

  const router = useRouter();

  const { isLoading, results } = useQuerySearchField(debouncedSearch);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchTerm = search.trim();
    if (!searchTerm) return;
    onToggleSearch(false);
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <article
      className={clsx(
        "w-screen h-screen fixed top-0 z-50 bg-white transition-all duration-300",
        !isVisible && "left-[100%]",
        isVisible && "left-0",
      )}
    >
      {/* Close button + search bar */}
      <div className={clsx("flex items-start gap-6 w-minus-30 mx-auto mt-6")}>
        <Image
          src="/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="mt-2 cursor-pointer"
          onClick={() => onToggleSearch(false)}
        />
        <div className="flex-grow">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Book, ISBN, Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={clsx(
                "w-full block border border-gray-400 outline-0 focus:ring-1 focus:ring-blue-500 rounded-3xl py-2 px-4",
              )}
            />
          </form>
        </div>
      </div>

      <div className={clsx("w-minus-30 mx-auto mt-6")}>
        {isLoading ? (
          <SearchResultSkeleton />
        ) : (
          <ul>
            {results.length === 0 && debouncedSearch && (
              <p className="text-gray-500 mt-4">No results found</p>
            )}
            {results.map((result) => (
              <SearchResult key={result._id} result={result} />
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
