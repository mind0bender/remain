"use client";
import { AuthSession } from "@/lib/auth/session";
import {
  Context,
  createContext,
  FC,
  JSX,
  PropsWithChildren,
  useContext,
} from "react";

const UserCtx: Context<AuthSession | null> = createContext<AuthSession | null>(
  null,
);

export interface UserProviderProps extends PropsWithChildren {
  user: AuthSession | null;
}

export const UserProvider: FC<UserProviderProps> = ({
  user,
  children,
}: UserProviderProps): JSX.Element => {
  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = (): AuthSession | null => useContext(UserCtx);
