import clsx from "clsx";

import Image from "next/image";

export default function Header() {
  return (
    <header className={clsx("w-minus-50 mx-auto mt-6")}>
      <div className={clsx("flex justify-between")}>
        <Image alt="Site Logo" src="/sgbc_logo.svg" width={102} height={50} />

        <div className={clsx("flex gap-4 mt-6")}>
          <Image alt="Search Button" src="/search.svg" width={25} height={25} />
          <Image alt="Search Button" src="/menu.svg" width={30} height={30} />
        </div>
      </div>
    </header>
  );
}
