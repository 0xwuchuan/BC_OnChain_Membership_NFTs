import { PropsWithChildren } from "react";
import Head from "next/head";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Head>
				<title>NFS Membership</title>
				<link rel="favicon" href="/public/favicon.ico" />
			</Head>
			<main className="bg-primary h-screen">{children}</main>
		</>
	);
}
