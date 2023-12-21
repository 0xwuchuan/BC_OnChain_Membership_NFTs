import { ConnectWallet } from "./connectwallet";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="top-0 w-full px-6 pt-5 text-black bg-white lg:px-20 lg:pt-8">
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
        <div className="flex items-center px-6 py-2 font-sans font-bold transition duration-200 rounded-lg bg-primary hover:bg-opacity-75">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
