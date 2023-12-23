"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MintForm } from "./mintform";

export function MintButton() {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg md:text-left md:text-xl">
            Mint a Fintechie
          </DialogTitle>
          <DialogDescription className="text-center text-sm md:text-left md:text-base">
            To mint your Fintechie, kindly select your role and enter the
            corresponding passcode. If you are not a member of the society,
            choose 'None'.
          </DialogDescription>
          <MintForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
