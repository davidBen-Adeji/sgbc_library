import { useState, useEffect } from "react";
import axios from "axios";
import { booksSchema } from "@/lib/validations/book";
import { clientBaseURI } from "@/lib/baseURI";

export default function useQuerySearchField(debouncedSearch: string) {
  const [results, setResults] = useState([]);
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
          console.error("An error occured: ", error);
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
