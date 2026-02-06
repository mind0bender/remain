import { IUser } from "../user";

export type LoginOptions = Pick<IUser, "username" | "password">;

export type LoginReturnT = Pick<IUser, "name" | "username" | "email"> & {
  id: string;
};

export type RegistereOptions = Pick<
  IUser,
  "name" | "username" | "email" | "password"
>;

export type RegisterReturnT = LoginReturnT;

export interface VerifyUserOptions {
  token: string;
  confirm?: boolean;
}

export type VerifyUserReturnT = LoginReturnT & Pick<IUser, "verified">;
export type SendVerificationLinkReturnT = LoginReturnT;

export interface SendVerificationLinkOptions {
  email: string;
  token: string;
}
