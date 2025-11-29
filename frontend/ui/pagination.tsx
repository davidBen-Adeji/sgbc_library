import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center my-6 space-x-2">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}&page=${currentPage - 1}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Prev
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-3 py-1">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`${basePath}&page=${page}`}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}&page=${currentPage + 1}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}

function generatePageNumbers(current: number, total: number) {
  const delta = 2; // how many pages to show around current
  const range: number[] = [];
  const rangeWithDots: (number | "...")[] = [];
  let lastPage: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (lastPage !== undefined) {
      if (i - lastPage === 2) {
        rangeWithDots.push(lastPage + 1);
      } else if (i - lastPage > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    lastPage = i;
  }

  return rangeWithDots;
}
