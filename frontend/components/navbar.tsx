import { ConnectWallet } from "./connectwallet";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="top-0 w-full pt-12 text-black bg-white lg:pt-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src="/fintech-logo.webp"
              alt="logo"
              className="w-40 transition duration-200 hover:opacity-75"
              width={120}
              height={70}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function NavbarWithWallet() {
  return (
    <header className="top-0 w-full pt-12 text-black bg-white lg:pt-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src="/fintech-logo.webp"
              alt="logo"
              className="w-40 transition duration-200 hover:opacity-75"
              width={120}
              height={70}
            />
          </Link>
        </div>
        <ConnectWallet />
      </div>
    </header>
  );
}
