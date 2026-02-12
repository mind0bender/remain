"use client";
import { IUser } from "@/core/user";
import {
  Context,
  createContext,
  FC,
  JSX,
  PropsWithChildren,
  useContext,
} from "react";

const UserCtx: Context<IUser | null> = createContext<IUser | null>(null);

export interface UserProviderProps extends PropsWithChildren {
  user: IUser | null;
}

export const UserProvider: FC<UserProviderProps> = ({
  user,
  children,
}: UserProviderProps): JSX.Element => {
  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = (): IUser | null => useContext(UserCtx);
