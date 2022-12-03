import { ConnectWallet } from "./connectWallet";
import Image from "next/image";
import fintechlogo from "../public/fintechsoc-logo.webp";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="fixed top-0 w-full lg:px-12 px-6 lg:pt-8 pt-5">
			<div className="flex items-center justify-between">
				<div>
					<Link href="/">
						<Image src={fintechlogo} alt="logo" className="w-40" />
					</Link>
				</div>
				<div>
					<ul className="flex space-x-4">
						{/* TODO: Change Font */}
						<li>
							<Link
								href="/"
								className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100"
							>
								Mint
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100"
							>
								About
							</Link>
						</li>
						<li>
							{/* Twitter Logo */}
							<a
								href="https://twitter.com/nus_blockchain"
								className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className=" fill-current stroke-current h-6 w-6"
									viewBox="0 0 40 40"
									width="40"
									height="40"
								>
									<path
										d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z"
										stroke="#000000"
									></path>
								</svg>
							</a>
						</li>
						<li>
							{/* Instagram Logo */}
							<a
								href="https://www.instagram.com/nusfintech/"
								className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className=" fill-current stroke-current h-6 w-6"
									viewBox="0 0 40 40"
									width="40"
									height="40"
								>
									<path
										d="M27.524 1.79c3.334.17 5.899 1.11 7.694 2.992 1.796 1.88 2.822 4.36 2.993 7.694 0 1.314.078 3.651.085 7.089v2.108c-.002 2.768-.014 4.702-.085 5.85-.171 3.335-1.112 5.9-2.993 7.695-1.88 1.796-4.36 2.822-7.694 2.993-1.15.071-3.143.083-5.88.085h-3.317c-2.768-.002-4.702-.014-5.85-.085-3.335-.171-5.9-1.112-7.695-2.993-1.796-1.795-2.822-4.36-2.993-7.694-.065-1.04-.08-2.771-.084-5.118v-4.812c.004-2.347.02-4.078.084-5.118.171-3.334 1.112-5.899 2.993-7.694 1.795-1.796 4.36-2.822 7.694-2.993 1.04-.065 2.771-.08 5.118-.084h4.847c2.361.004 4.043.02 5.083.084Zm-7.61 8.805c-2.65 0-4.873.94-6.668 2.736C11.45 15.212 10.51 17.35 10.51 20c0 2.65.94 4.873 2.736 6.669 1.88 1.795 4.018 2.736 6.668 2.736 2.65 0 4.874-.94 6.67-2.736 1.795-1.881 2.735-4.019 2.735-6.669 0-2.65-.94-4.873-2.736-6.669-1.795-1.88-4.018-2.736-6.669-2.736Zm0 3.25c1.71 0 3.164.598 4.36 1.795A6.076 6.076 0 0 1 26.07 20c0 1.624-.598 3.078-1.795 4.275-1.197 1.197-2.65 1.795-4.36 1.795-1.71 0-3.164-.598-4.36-1.795-1.198-1.112-1.796-2.565-1.796-4.275 0-1.71.598-3.163 1.795-4.36 1.197-1.197 2.65-1.796 4.36-1.796Zm9.833-5.9c-.599 0-1.112.257-1.54.684-.427.427-.683.94-.683 1.539 0 .598.256 1.111.684 1.539.427.427.94.684 1.539.684.598 0 1.111-.257 1.538-.684.428-.428.684-.94.684-1.54 0-.598-.256-1.11-.684-1.538-.427-.427-.94-.684-1.538-.684Z"
										stroke="#000000"
									></path>
								</svg>
							</a>
						</li>
						<li>
							{/* Github Logo */}
							<a
								href="https://github.com/0xwuchuan/BC_On_Chain_Membership"
								className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className=" fill-current stroke-current h-6 w-6"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
							</a>
						</li>
						<li className="flex items-center rounded-lg py-2 px-6 bg-secondary hover:bg-opacity-75 transition duration-100">
							<ConnectWallet />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
