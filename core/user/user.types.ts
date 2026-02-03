import { Document } from "mongoose";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DECEASED = "DECEASED",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
  lifecycle: {
    status: UserStatus;
    lastActiveAt: Date;
    declaredDeadAt?: Date;
  };
}

export interface UserMethods {
  verifyPassword(password: string): Promise<boolean>;
  setPassword(password: string): Promise<void>;
}
