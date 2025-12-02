import useQuerySearchField from "@/hooks/useQuerySearchField";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

import SearchResultSkeleton from "@/ui/searchResultSkeleton";
import SearchResult from "@/ui/searchResult";

export default function DesktopSearchBox() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const { isLoading, results } = useQuerySearchField(debouncedSearch);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (search.trim() === "") return;

    const searchTerm = search.trim();

    setSearch("");

    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <form className="mt-4 relative" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Book, ISBN, Author"
        className="w-[40vw] max-w-lg border border-gray-400 outline-0 focus:ring-1 focus:ring-blue-500 rounded-3xl py-2 px-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsSearchResultsVisible(true)}
        onBlur={() => setTimeout(() => setIsSearchResultsVisible(false), 300)}
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
                    <p className="text-gray-500 my-2 ml-4">No results found</p>
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
  );
}
