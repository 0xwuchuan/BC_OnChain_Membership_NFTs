type RoleToPassCode = { [key: number]: string };

const roleToPassCode: RoleToPassCode = {
  1: process.env.EA || "",
  2: process.env.IA || "",
  3: process.env.PC || "",
  4: process.env.BC || "",
  5: process.env.ML || "",
  6: process.env.SD || "",
  7: process.env.QUANT || "",
  8: process.env.ALUMNI || "",
};

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { role, passCode } = res;

    if (!role || !passCode) {
      return new Response(JSON.stringify({ error: "Bad Request" }), {
        status: 400,
      });
    }

    if (passCode !== roleToPassCode[role]) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({}), {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return new Response(JSON.stringify({ error: "Internal Sever Error" }), {
      status: 500,
    });
  }
}
