import { privateKeyToAccount } from "viem/accounts";
import { encodePacked, keccak256 } from "viem";

export const generateSignature = async (
  department: bigint,
  signerPrivateKey: `0x${string}`,
  userAddress: `0x${string}`,
) => {
  const messageHash = keccak256(
    encodePacked(["address", "uint256"], [userAddress, department]),
  );

  const account = privateKeyToAccount(signerPrivateKey || "0x1234");

  const signature = await account.signMessage({
    message: { raw: messageHash },
  });

  return signature;
};
