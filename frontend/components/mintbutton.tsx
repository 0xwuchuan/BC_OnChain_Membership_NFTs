"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MintForm } from "./mintform";
import { AlertConnect } from "./alertconnect";
import { useAccount } from "wagmi";

export function MintButton() {
  const { address, isConnected } = useAccount();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-primary bg-opacity-50 py-5 text-sm 
           transition duration-100 ease-in-out hover:bg-primary 
           hover:bg-opacity-65 md:text-base"
        >
          Mint Fintechie
        </Button>
      </DialogTrigger>
      {isConnected ? <MintForm /> : <AlertConnect />}
    </Dialog>
  );
}
