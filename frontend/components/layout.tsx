import { PropsWithChildren } from "react";
import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Head>
				<title>NFS Membership</title>
				<link rel="favicon" href="/public/favicon.ico" />
			</Head>
			<Navbar></Navbar>
			<main className="bg-primary h-screen">{children}</main>
		</>
	);
}
