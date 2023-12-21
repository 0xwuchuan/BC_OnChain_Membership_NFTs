import { PropsWithChildren } from "react";
import Head from "next/head";
import Navbar from "./navbar";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>NFS Membership</title>
        <link rel="favicon" href="/public/favicon.ico" />
      </Head>
      <body className={lexend.variable}>
        <Navbar></Navbar>
        <main className="h-screen bg-white top-10">{children}</main>
      </body>
    </html>
  );
}
