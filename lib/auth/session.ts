import { IS_DEV } from "@/config/env";
import { SessionPayload, sign } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = sign(payload);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: !IS_DEV,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  return token;
}
