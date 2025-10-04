import axios from "axios";
import { booksSchema } from "@/lib/validations/book";
import { Book } from "@/lib/types";
import Books from "@/ui/books";
import Link from "next/link";
import Pagination from "@/ui/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const currentPage = page || "1";
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?page=${currentPage}`,
  );
  const { totalPages } = data;
  const books: Book[] = booksSchema.parse(data.books);

  return (
    <>
      <Books books={books} />
      <Pagination
        currentPage={parseInt(currentPage)}
        totalPages={totalPages}
        basePath={`/?`}
      />
    </>
  );
}
