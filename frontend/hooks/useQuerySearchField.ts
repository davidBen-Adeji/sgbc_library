import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "@/lib/types";
import { booksSchema } from "@/lib/validations/book";
import { clientBaseURI } from "@/lib/baseURI";

export default function useQuerySearchField(debouncedSearch: string) {
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const returnObject = { results, isLoading };

  useEffect(() => {
    if (debouncedSearch.trim()) {
      async function fetchBooks() {
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `${clientBaseURI}/books/quick-search?query=${encodeURIComponent(debouncedSearch)}`,
          );
          const books = booksSchema.parse(data);
          setResults(books);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Axios error:",
              error.response?.data || error.message,
            );
          } else {
            console.error("Failed to fetch books", error);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchBooks();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return returnObject;
}
