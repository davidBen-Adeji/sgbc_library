import axios from "axios";
import { booksSchema } from "@/lib/validations/book";
import { Book } from "@/lib/types";
import BookCard from "@/ui/bookcard";
import NotFound from "@/ui/notFound";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = (await searchParams) || "";
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${encodeURIComponent(query)}`,
  );
  const books: Book[] = booksSchema.parse(data);

  return (
    <>
      {books.length === 0 ? (
        <NotFound />
      ) : (
        <ul className="mx-auto my-10 w-minus-50 max-w-5xl flex gap-10 flex-wrap justify-center">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </ul>
      )}
    </>
  );
}
