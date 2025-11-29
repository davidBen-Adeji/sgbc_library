import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/types";

export default function Books({ books }: { books: Book[] }) {
  return (
    <ul className="mx-auto mb-10 mt-12 w-container max-w-5xl flex gap-12 flex-wrap">
      {books.map((book) => {
        let { title, author } = book;

        if (title.length > 22) {
          title = `${title.slice(0, 19)}...`;
        }

        if (author.length > 22) {
          author = `${author.slice(0, 19)}...`;
        }

        return (
          <li key={book._id} className="mx-auto">
            <Link href={`/${book._id}`}>
              <div className="relative">
                <Image
                  src={"/bookimage.png"}
                  alt={book.title}
                  title={book.title}
                  width={200}
                  height={250}
                />
                <span className="bg-black/60 text-white p-1 rounded-sm absolute top-[90%] left-2 text-xs font-medium">
                  Lent {book.borrowTimes} times
                </span>
              </div>
              <div className="mt-2">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{author}</p>
                <p className="text-sm text-gray-500">
                  ${(book.price / 100).toFixed(2)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
