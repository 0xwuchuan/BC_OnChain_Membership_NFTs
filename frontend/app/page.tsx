"use client";

import { NavbarWithWallet } from "@/components/navbar";
import Intro from "@/components/intro";
import About from "@/components/about";

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-2xl justify-start">
      <section className="min-h-screen">
        <NavbarWithWallet />
        <Intro />
      </section>
      <About />
    </div>
  );
}
