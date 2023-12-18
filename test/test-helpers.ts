import { ethers } from "hardhat";
import { Signer } from "ethers";

export default async function signWhitelist(
  department: number,
  whitelistKey: Signer,
  userAddress: string
) {
  const messageHash = ethers.solidityPackedKeccak256(
    ["address", "uint256"],
    [userAddress, department]
  );

  const messageHashBinary = ethers.toBeArray(messageHash);

  const sig = await whitelistKey.signMessage(messageHashBinary);

  return sig;
}
