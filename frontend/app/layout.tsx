"use client";

import "./globals.css";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { cn } from "../lib/utils";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Toaster } from "@/components/ui/sonner";
import { base, baseGoerli } from "viem/chains";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const walletConnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const chains = [base, baseGoerli];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: alchemyId, // or infuraId
    walletConnectProjectId: walletConnectProjectId,
    chains,

    // Required
    appName: "NUS Fintechies",
  }),
);

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">
        <html lang="en">
          <Head>
            <title>NUS Fintechies</title>
            <link rel="favicon" href="favicon.ico" type="image/x-icon" />
          </Head>

          <body
            className={cn(
              "min-h-screen bg-white font-sans antialiased ",
              "flex justify-center scroll-smooth text-text",
              lexend.variable,
            )}
          >
            <Toaster
              theme="light"
              richColors
              closeButton
              expand
              visibleToasts={3}
            />
            <main>{children}</main>
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
