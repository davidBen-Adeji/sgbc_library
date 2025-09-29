import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "@/lib/types";
import { booksSchema } from "@/lib/validations/book";

export default function useQuerySearchField<T>(debouncedSearch: T) {
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const returnObject = { results, isLoading };

  useEffect(() => {
    if (debouncedSearch) {
      const fetchBooks = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `/api/search?query=${encodeURIComponent(debouncedSearch)}&limit=10`,
          );
          const books = booksSchema.parse(data);
          setResults(books);
        } catch (err) {
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
      };
      fetchBooks();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return returnObject;
}
