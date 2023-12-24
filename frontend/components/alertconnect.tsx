import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConnectWallet } from "./connectwallet";

export function AlertConnect() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-lg md:text-left md:text-xl">
          Connect your wallet
        </DialogTitle>
        <DialogDescription className="text-center text-sm md:text-left md:text-base">
          To mint your Fintechie, you need to connect your wallet first
        </DialogDescription>
      </DialogHeader>
      <ConnectWallet />
    </DialogContent>
  );
}
