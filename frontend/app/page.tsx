"use client";

import { NavbarWithWallet } from "@/components/navbar";
import Intro from "@/components/intro";
import About from "@/components/about";

export default function Home() {
  return (
    <div className="mx-10 flex flex-col justify-start lg:max-w-screen-lg xl:max-w-screen-xl">
      <section className="min-h-screen">
        <NavbarWithWallet />
        <Intro />
      </section>
      <About />
    </div>
  );
}
