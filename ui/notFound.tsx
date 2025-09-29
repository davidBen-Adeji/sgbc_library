import Image from "next/image";

export default function NotFound() {
  return (
    <article>
      <Image
        src="/sad-face.svg"
        alt="sad face"
        width={100}
        height={100}
        className="mx-auto mt-14"
      />
      <h1 className="mt-4 text-xl font-bold text-center">
        Sorry, we couldn't find what you were looking for
      </h1>
    </article>
  );
}
