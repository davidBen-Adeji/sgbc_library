import { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  ISBN: string;
}

export default function useQuerySearchField(debouncedSearch: string) {
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const returnObject = { results, isLoading };

  useEffect(() => {
    if (debouncedSearch) {
      const fetchBooks = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `/api/search?query=${encodeURIComponent(debouncedSearch)}`,
          );
          setResults(data);
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
