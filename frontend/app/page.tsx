"use client";

import { NavbarWithWallet } from "@/components/navbar";
import { Intro } from "@/components/intro";
import { About } from "@/components/about";

export default function Home() {
  return (
    <div className="mx-5 flex max-w-full flex-col justify-start sm:mx-10 lg:mx-10 lg:max-w-screen-lg xl:max-w-screen-xl">
      <section className="min-h-screen">
        <NavbarWithWallet />
        <Intro />
      </section>
      <About />
    </div>
  );
}
