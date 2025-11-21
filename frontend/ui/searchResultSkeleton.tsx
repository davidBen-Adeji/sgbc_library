export default function SearchResultSkeleton() {
  return (
    <div className="w-container space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-1 animate-pulse">
          <p className="h-6 bg-gray-300 rounded w-3/4"></p>
          <p className="h-4 bg-gray-200 rounded w-1/4"></p>
        </div>
      ))}
    </div>
  );
}
