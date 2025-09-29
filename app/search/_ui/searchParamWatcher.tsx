"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SearchParamWatcher() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  return (
    <Suspense
      fallback={
        <h1 className="w-minus-50 mx-auto mt-7 text-xl font-bold max-w-5xl">
          Loading...
        </h1>
      }
    >
      <h1 className="w-minus-50 mx-auto mt-7 text-xl font-bold max-w-5xl">
        Showing search results for {`"${query}"`}
      </h1>
    </Suspense>
  );
}
