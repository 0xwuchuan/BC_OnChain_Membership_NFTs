import { ConnectKitButton } from "connectkit";

export const ConnectWallet = () => {
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, isConnecting, show, hide, address, ensName }) => {
				return (
					<button
						onClick={show}
						className="border-2 rounded py-2 px-4"
					>
						{isConnected ? address : "Connect"}
					</button>
				);
			}}
		</ConnectKitButton.Custom>
	);
};
