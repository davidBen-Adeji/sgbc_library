import Books from "@/ui/books";
import Pagination from "@/ui/pagination";
import { fetchBooks } from "@/lib/actions";
import { Book } from "@/lib/types";

interface Props {
  searchParams: { page: string };
}

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;

  let currentPage = parseInt(page);
  if (!currentPage || currentPage < 1) {
    currentPage = 1;
  }

  const data: { totalPages: number; books: Book[] } = await fetchBooks(
    `page=${currentPage}`,
    "popular",
  );
  const totalPages = data.totalPages;
  const books: Book[] = data.books;

  return (
    <>
      <Books books={books} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/popular?`}
      />
    </>
  );
}
