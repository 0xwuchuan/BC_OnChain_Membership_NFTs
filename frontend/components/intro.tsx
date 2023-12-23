"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MintButton } from "@/components/mintbutton";
import fintechie from "../public/fintechie.svg";

export default function Intro() {
  return (
    <div
      className="flex flex-col space-y-5 bg-white 
        text-black lg:flex-row lg:justify-between lg:pt-24 "
    >
      <div className="flex flex-col justify-center text-center lg:text-left">
        <h1 className="pb-4 pt-6 text-5xl font-extrabold lg:pb-10 lg:text-6xl">
          NUS <a className="text-primary">Fintechies</a>
        </h1>
        <p className="m-auto max-w-lg text-lg lg:m-2">
          Commemorate your role in the NUS Fintech Society with an unique
          Fintechie that lives on-chain as a soulbound NFT. <br />
          <br />
          Fintechies represent your membership and involvement with the
          society,forever enshrined on the blockchain. <br />
          <br />
          Friends of the society can also mint your own Fintechie to show your
          support.
        </p>
        <div
          className="flex flex-row justify-center 
        space-x-9 pt-10 lg:justify-start lg:pr-10 "
        >
          <Button
            className="bg-secondary bg-opacity-50 py-5 text-base transition 
          duration-100 ease-in-out hover:bg-secondary hover:bg-opacity-65"
            asChild
          >
            <Link href="#about">About the Project</Link>
          </Button>
          <MintButton />
        </div>
      </div>
      <div>
        <Image
          className="m-auto max-w-[500] lg:m-0 lg:max-w-[600]"
          src={fintechie}
          width={550}
          height={550}
          alt="Fintechie SVG"
        />
      </div>
    </div>
  );
}
