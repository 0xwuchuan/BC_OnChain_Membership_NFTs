import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
	getDefaultClient({
		appName: "NFSMembership",
		//infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		alchemyId: alchemyId,
		chains: [chain.mainnet, chain.goerli],
	})
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider theme="soft">
				{getLayout(<Component {...pageProps} />)}
			</ConnectKitProvider>
		</WagmiConfig>
	);
}
