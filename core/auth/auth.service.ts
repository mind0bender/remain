import User, { IUser, UserMethods, UserStatus } from "@/core/user";
import {
  LoginOptions,
  LoginReturnT,
  RegisterReturnT,
} from "@/core/auth/auth.types";
import { HydratedDocument } from "mongoose";
import connectDB from "@/lib/db/mongoose";

export async function login({
  username,
  password,
}: LoginOptions): Promise<LoginReturnT> {
  try {
    try {
      await connectDB();
    } catch {
      throw new Error("Cannot connect to Database");
    }
    let user: HydratedDocument<IUser, UserMethods> | null;
    try {
      user = (await User.findByUsername(username).select(
        "+password",
      )) as unknown as HydratedDocument<IUser, UserMethods>;
    } catch {
      throw new Error("Error encountered while finding user");
    }
    if (!user) throw new Error("Invalid credentials");
    try {
      const verified: boolean = await user.verifyPassword(password);
      if (!verified) throw new Error("Invalid credentials");

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        username: user.username,
      };
    } catch {
      throw new Error("Error encountered while verifying password");
    }
  } catch (e: unknown) {
    throw e;
  }
}

export type RegisterOptions = Omit<IUser, "lifecycle">;

export async function register({
  name,
  username,
  email,
  password,
}: RegisterOptions): Promise<RegisterReturnT> {
  try {
    try {
      await connectDB();
    } catch {
      throw new Error("Cannot connect to Database");
    }
    let exists: boolean;
    try {
      exists = !!(
        (await User.findByUsername(username)) || (await User.findByEmail(email))
      );
    } catch {
      throw new Error("Error encountered while finding user");
    }
    if (exists) {
      console.log("throwing");
      throw new Error("User already exists");
    }

    const user: HydratedDocument<IUser, UserMethods> = new User({
      name,
      username,
      email,
      lifecycle: {
        status: UserStatus.ACTIVE,
      },
    });

    await user.setPassword(password);
    try {
      await user.save();
    } catch {
      throw new Error("Error encountered while saving user");
    }
    return {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
    };
  } catch (e: unknown) {
    throw e;
  }
}
