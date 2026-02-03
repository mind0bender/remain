import { JWT_SECRET } from "config/env";
import jwt from "jsonwebtoken";

export interface SessionPayload {
  _id: string;
}

export function sign(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verify(token: string): SessionPayload {
  return jwt.verify(token, JWT_SECRET) as SessionPayload;
}
