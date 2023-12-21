import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utils";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NUS Fintechies",
  description: "NUS Fintech Society On-chain Membership NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          lexend.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
