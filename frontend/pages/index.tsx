import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

const Home: NextPageWithLayout = () => {
	return (
		<div className="min-h-screen grid grid-cols-2 pt-32 lg:px-20 px-6">
			<section className="mx-2 mt-20">
				<h1 className="text-5xl font-bold mb-12">
					Own your membership, <br />
					on-chain and forever
				</h1>
				<div className="text-lg font-bold max-w-xl break-words ">
					<ul className="list-disc list-inside">
						<li className="leading-10">
							Own and showcase your membership in the NUS Fintech Society with a
							unique, on-chain NFT
						</li>
						<li className="leading-10">
							Securely store your NFT on the blockchain, providing proof of
							ownership and authenticity
						</li>
						<li className="leading-10">
							Evolve your NFT to reflect your level of engagement and
							involvement in the society
						</li>
						<li className="leading-10">
							Join now and start evolving your membership NFT today!
						</li>
					</ul>
				</div>
				{/* TODO: Implementing Mint function with Wagmi.sh */}
				<Link href="/mint">
					<button className="bg-secondary rounded-[10px] font-bold w-full 2xl:w-2/3 mt-6 py-4 transition duration-200 hover:bg-opacity-75">
						Mint
					</button>
				</Link>
			</section>
			<section className="flex flex-col mt-28">
				<div className="flex justify-center">
					{/* <Image
						src="/sample.png"
						alt="Membership NFT Image"
						className="rounded-[30px] drop-shadow-2xl"
						width={480}
						height={336}
					/> */}
					<svg xmlns="http://www.w3.org/2000/svg" width="480" height="336" fill="none"><rect fill="#000000" x="0" y="0" width="480" height="336" rx="20" ry="20"></rect><text x="35" y="52" font-size="30" font-family="monospace" font-weight="bold" fill="#FFF">Proof of Membership</text><text x="35" y="83" font-size="15" font-family="monospace" fill="#FFF">NUS Fintech Society</text><line x1="35" y1="101" x2="449" y2="101" stroke="#FFF"></line><text x="35" y="122" font-size="10" font-family="monospace" fill="#FFF">BLOCK FABRICATED: 16117574</text><text x="35" y="170" font-weight="bold" font-size="20" font-family="monospace" fill="#FFF">DIVISION: BLOCKCHAIN</text><text x="35" y="220" font-weight="bold" font-size="20" font-family="monospace" fill="#FFF">ACCESS LEVEL: DEVELOPER</text><text x="35" y="275" font-size="10" font-family="monospace" fill="#FFF">0x777dccd91f7c62717dba44db3504bdf47c75e2f1</text><rect x="35" y="287" width="12" height="30" fill="#FFF"></rect><rect x="63" y="287" width="12" height="30" fill="#FFF"></rect><rect x="91" y="287" width="12" height="30" fill="#FFF"></rect><rect x="119" y="287" width="12" height="30" fill="#FFF"></rect><rect x="147" y="287" width="12" height="30" fill="#FFF"></rect><rect x="175" y="287" width="12" height="30" fill="#FFF"></rect><rect x="203" y="287" width="12" height="30" fill="#FFF"></rect><rect x="231" y="287" width="12" height="30" fill="#FFF"></rect><rect x="259" y="287" width="12" height="30" fill="#FFF"></rect><rect x="287" y="287" width="12" height="30" fill="#FFF"></rect><rect x="315" y="287" width="12" height="30" fill="#FFF"></rect><rect x="343" y="287" width="12" height="30" fill="#FFF"></rect><text x="384" y="309" font-size="20" font-family="monospace" fill="#FFF">1000001</text></svg>
				</div>
			</section>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
