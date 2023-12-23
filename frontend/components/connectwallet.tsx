import { ConnectKitButton } from "connectkit";

export const ConnectWallet = () => {
  return (
    <div
      className="mx-6 flex items-center rounded-lg bg-[#83C282] bg-opacity-50 
    px-6 py-2 text-sm font-medium transition 
    duration-100 hover:bg-opacity-65 md:text-base"
    >
      <ConnectKitButton.Custom>
        {({
          isConnected,
          isConnecting,
          show,
          hide,
          address,
          truncatedAddress,
          ensName,
        }) => {
          return (
            <button onClick={show}>
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
};
