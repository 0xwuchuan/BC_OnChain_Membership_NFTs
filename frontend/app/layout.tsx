"use client";

import "./globals.css";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { cn } from "../lib/utils";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Toaster } from "@/components/ui/toaster";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",

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
            <Toaster />
            <main>{children}</main>
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
