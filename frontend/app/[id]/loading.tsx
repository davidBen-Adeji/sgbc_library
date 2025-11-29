export default function Loading() {
  return (
    <main className="animate-pulse w-minus-50 mx-auto pb-8">
      <article className="mt-8 max-w-2xl mx-auto md:flex justify-center items-start">
        <div className="mx-auto w-[85%] max-w-[310px] h-[450px] bg-gray-300"></div>
        <section className="p-3 space-y-3 w-[85%] max-w-xs mx-auto">
          <p className="h-6 bg-gray-200 rounded w-full"></p>
          <p className="h-4 bg-gray-100 rounded w-[90%]"></p>
          <p className="h-4 bg-gray-100 rounded w-[90%]"></p>
          <p className="h-4 bg-gray-100 rounded w-[90%]"></p>
          <p className="h-4 bg-gray-100 rounded w-[90%]"></p>
          <p className="h-4 bg-gray-100 rounded w-[90%]"></p>
          <p className="h-6 bg-gray-200 rounded w-full"></p>
          <p className="h-6 bg-gray-200 rounded w-full"></p>
          <p className="h-6 bg-gray-200 rounded w-full"></p>
        </section>
      </article>
    </main>
  );
}
