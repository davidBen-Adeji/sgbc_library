export default function Loading() {
  return (
    <div className="animate-pulse mx-auto my-12 w-container max-w-5xl flex gap-12 flex-wrap">
      {[...Array(9)].map((_, i) => (
        <article key={i} className="h-6 bg-gray-200 rounded w-1/4"></article>
      ))}
    </div>
  );
}
