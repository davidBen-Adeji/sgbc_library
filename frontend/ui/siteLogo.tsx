import Image from "next/image";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href="/">
      <Image
        className="cursor-pointer"
        alt="Site Logo"
        src="/sgbc_logo.svg"
        width={102}
        height={50}
      />
    </Link>
  );
}
