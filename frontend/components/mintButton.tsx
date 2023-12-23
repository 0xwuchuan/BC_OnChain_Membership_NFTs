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
          className="bg-primary bg-opacity-50 py-5 text-base 
           transition duration-100 ease-in-out hover:bg-primary 
           hover:bg-opacity-65"
        >
          Mint Fintechie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-left">
            Mint a Fintechie
          </DialogTitle>
          <DialogDescription className="text-center  text-base md:text-left">
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
