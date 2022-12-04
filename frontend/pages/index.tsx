import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
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
				<button className="bg-secondary rounded-[10px] font-bold w-full 2xl:w-2/3 mt-6 py-4 transition duration-200 hover:bg-opacity-75">
					Mint
				</button>
			</section>
			<section className="flex flex-col mt-28">
				<div className="flex justify-center">
					<Image
						src="/gus.jpg"
						alt="Membership NFT Image"
						className="rounded-[30px] drop-shadow-2xl"
						width={490}
						height={490}
					/>
				</div>
			</section>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
