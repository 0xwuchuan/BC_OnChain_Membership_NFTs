import { ConnectKitButton } from "connectkit";
import { truncate } from "fs";

export const ConnectWallet = () => {
	return (
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
						{isConnected ? ensName ?? truncatedAddress : "Connect"}
					</button>
				);
			}}
		</ConnectKitButton.Custom>
	);
};
