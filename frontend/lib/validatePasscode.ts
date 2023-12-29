export async function validatePassCode(
  role: number,
  passCode: string,
): Promise<boolean | undefined> {
  let isValid = false;

  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        passCode: passCode,
      }),
    });

    if (response.ok) {
      isValid = true;
    }
  } catch (error) {
    throw new Error("Error validating passcode");
  }

  return isValid;
}
