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
import { MintForm } from "./mintForm";

export function MintButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="py-5 text-base bg-primary bg-opacity-50 
           hover:bg-primary hover:bg-opacity-65 transition duration-100 
           ease-in-out"
        >
          Mint Fintechie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Mint a Fintechie</DialogTitle>
          <DialogDescription className="text-base">
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
