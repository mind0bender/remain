import z4 from "zod/v4";
import { IUser } from "../user";
import { loginSchema, registerSchema, sessionSchema } from "./auth.schemas";

export type LoginOptions = z4.infer<typeof loginSchema>;
export type LoginReturnT = Pick<IUser, "name" | "username" | "email"> & {
  id: string;
};

export type RegistereOptions = z4.infer<typeof registerSchema>;
export type RegisterReturnT = LoginReturnT;

export type VerifyUserOptions = z4.infer<typeof sessionSchema>;
export type VerifyUserReturnT = LoginReturnT & Pick<IUser, "verified">;

export type SendVerificationLinkReturnT = LoginReturnT;
export interface SendVerificationLinkOptions {
  email: string;
  token: string;
}
