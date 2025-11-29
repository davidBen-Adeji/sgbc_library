import Books from "@/ui/books";
import Pagination from "@/ui/pagination";
import { fetchBooks } from "@/lib/actions";

interface Props {
  searchParams: { page: string };
}

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;

  let currentPage = parseInt(page);
  if (!currentPage || currentPage < 1) {
    currentPage = 1;
  }

  const { books, totalPages } = await fetchBooks(
    `page=${currentPage}`,
    "popular",
  );

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
