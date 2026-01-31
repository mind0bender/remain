export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DECEASED = "DECEASED",
}

export interface IUser {
  name: string;
  email: string;
  password: {
    hash: string;
    salt: string;
  };
  username: string;
  lifecycle: {
    status: UserStatus;
    lastActiveAt: Date;
    declaredDeadAt?: Date;
  };
}

export interface UserMethods {}
