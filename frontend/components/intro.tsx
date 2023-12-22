import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import fintechie from "../public/fintechie.svg";

export default function Intro() {
  return (
    <div
      className="flex flex-row justify-between pt-24 
    text-black bg-white"
    >
      <div>
        <h1 className="py-10 text-6xl font-extrabold">
          NUS <a className="text-primary">Fintechies</a>
        </h1>
        <p className="max-w-lg text-lg">
          Commemorate your role in the NUS Fintech Society with an unique
          Fintechie that lives on-chain as a soulbound NFT. <br />
          <br />
          Fintechies represent your membership and involvement with the
          society,forever enshrined on the blockchain. <br />
          <br />
          Friends of the society can also mint your own Fintechie to show your
          support.
        </p>
        <div className="flex flex-row pt-10 pr-10 space-x-9">
          <Button
            className="py-5 text-base bg-secondary bg-opacity-50
           hover:bg-secondary hover:bg-opacity-65"
          >
            <Link href="#about">About the Project</Link>
          </Button>
          <Button
            className="py-5 text-base bg-primary bg-opacity-50 
           hover:bg-primary hover:bg-opacity-65"
          >
            Mint a Fintechie here
          </Button>
        </div>
      </div>
      <div>
        <Image src={fintechie} width={550} height={550} alt="Fintechie SVG" />
      </div>
    </div>
  );
}
