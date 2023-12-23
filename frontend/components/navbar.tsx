"use client";

import { ConnectWallet } from "./connectwallet";
import Image from "next/image";
import Link from "next/link";

export function NavbarWithWallet() {
  return (
    <header className="w-full bg-white pt-8 text-black">
      <div
        className="flex flex-col items-center justify-between 
      space-y-4 sm:flex-row"
      >
        <div>
          <Link href="/">
            <Image
              src="/fintech-logo.webp"
              alt="logo"
              className="transition duration-200 hover:opacity-75"
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
