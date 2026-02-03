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
