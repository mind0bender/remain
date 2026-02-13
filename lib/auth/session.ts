import { IS_DEV } from "@/config/env";
import { SessionPayload, sign, verify } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import connectDB from "../db/mongoose";
import User, { IUser } from "@/core/user";
import { Types } from "mongoose";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = sign(payload, {
    expiresIn: "4h",
  });
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: !IS_DEV,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  return token;
}

export async function destroySession(): Promise<void> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.delete("token");
}

export interface AuthSession extends Omit<IUser, "password"> {
  id: string;
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get("token")?.value;
  if (!token) return null;
  let _id: string;
  try {
    _id = verify(token)._id;
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Invalid token");
  }
  try {
    await connectDB();
  } catch {
    throw new Error("Cannot connect to Database");
  }

  const user: (IUser & { _id: Types.ObjectId } & { __v: number }) | null =
    await User.findById(_id).lean();

  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    username: user.username,
    verified: user.verified,
    lifecycle: user.lifecycle,
  };
}
