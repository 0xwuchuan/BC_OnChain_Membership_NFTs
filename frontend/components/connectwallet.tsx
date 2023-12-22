import { ConnectKitButton } from "connectkit";

export const ConnectWallet = () => {
  return (
    <div
      className="flex items-center px-6 py-2 mx-6 font-sans 
    font-medium transition duration-200 rounded-lg bg-opacity-50 
    bg-primary hover:bg-opacity-65"
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
