export default function BooksSkeleton() {
  return (
    <div className="animate-pulse mx-auto my-10 w-minus-50 max-w-5xl flex gap-10 flex-wrap justify-center">
      {[...Array(3)].map((_, i) => (
        <article key={i}>
          <div className="w-[245px] h-[350px] bg-gray-300"></div>
          <div className="ml-1 mt-1 space-y-1">
            <p className="h-6 bg-gray-200 rounded w-3/4"></p>
            <p className="h-4 bg-gray-100 rounded w-1/4"></p>
          </div>
        </article>
      ))}
    </div>
  );
}
