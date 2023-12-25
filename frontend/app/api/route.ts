import { privateKeyToAccount } from "viem/accounts";
import { encodePacked, keccak256 } from "viem";

const signer = privateKeyToAccount(
  process.env.SIGNER_PRIVATE_KEY as `0x${string}`,
);

export async function POST(request: Request) {
  try {
    // const { department, userAddress } = request.body;
    const res = await request.json();
    const { role, userAddress } = res;

    if (!role || !userAddress) {
      return new Response(JSON.stringify({ error: "Bad Request" }), {
        status: 400,
      });
    }

    const signature = await generateSignature(role, userAddress);

    return new Response(JSON.stringify({ signature }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return new Response(JSON.stringify({ error: "Internal Sever Error" }), {
      status: 500,
    });
  }
}

export const generateSignature = async (
  role: bigint,
  userAddress: `0x${string}`,
): Promise<`0x${string}`> => {
  const messageHash = keccak256(
    encodePacked(["address", "uint256"], [userAddress, role]),
  );

  const signature = await signer.signMessage({
    message: { raw: messageHash },
  });

  return signature;
};
