export default function BooksSkeleton() {
  return (
    <div className="animate-pulse mx-auto my-12 w-container max-w-5xl flex gap-12 flex-wrap justify-center sm:justify-between">
      {[...Array(4)].map((_, i) => (
        <article key={i}>
          <div className="w-[200px] h-[250px] bg-gray-300"></div>
          <div className="ml-1 mt-1 space-y-1">
            <p className="h-6 bg-gray-200 rounded w-3/4"></p>
            <p className="h-4 bg-gray-100 rounded w-1/4"></p>
          </div>
        </article>
      ))}
    </div>
  );
}
