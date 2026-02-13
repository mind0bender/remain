import { JWT_SECRET } from "config/env";
import jwt, { SignOptions } from "jsonwebtoken";

export interface SessionPayload {
  _id: string;
}

export function sign(
  payload: SessionPayload,
  { expiresIn = "7d", ...signOpts }: SignOptions = {},
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    ...signOpts,
  });
}

export function verify(token: string): SessionPayload {
  return jwt.verify(token, JWT_SECRET) as SessionPayload;
}
