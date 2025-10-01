import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/types";

export default function Books({ books }: { books: Book[] }) {
  return (
    <ul className="mx-auto my-10 w-minus-50 max-w-5xl flex gap-10 flex-wrap justify-center">
      {books.map((book) => {
        let { title, author } = book;

        if (title.length > 29) {
          title = `${title.slice(0, 26)}...`;
        }

        if (author.length > 29) {
          author = `${author.slice(0, 26)}...`;
        }

        return (
          <Link key={book._id} href={`/${book._id}`}>
            <li>
              <Image
                src={"/bookimage.png"}
                alt={book.title}
                width={245}
                height={350}
              />
              <div className="mt-2">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{author}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
