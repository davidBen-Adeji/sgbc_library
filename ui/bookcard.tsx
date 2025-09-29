import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  let { title, author } = book;

  if (title.length > 29) {
    title = `${title.slice(0, 26)}...`;
  }

  if (author.length > 29) {
    author = `${author.slice(0, 26)}...`;
  }

  return (
    <Link href="#">
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
}
