export async function generateSignature(
  role: number,
  userAddress: `0x${string}`,
): Promise<`0x${string}` | undefined> {
  let data;

  try {
    const response = await fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        userAddress: userAddress,
      }),
    });

    if (response.ok) {
      data = await response.json();
    } else {
      console.error("Error generating signature:", response.statusText);
    }
  } catch (error) {
    console.error("Error generating signature:", error);
  }

  return data.signature;
}
