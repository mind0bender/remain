import User, { IUser, UserMethods, UserStatus } from "@/core/user";
import {
  LoginOptions,
  LoginReturnT,
  RegisterReturnT,
  SendVerificationLinkOptions,
} from "@/core/auth/auth.types";
import connectDB from "@/lib/db/mongoose";
import sendMail from "@/utils/mail";
import { BASE_URI } from "@/config/env";
import { HydratedDocument } from "mongoose";
import { VerifyUserOptions, VerifyUserReturnT } from "@/core/auth/auth.types";
import { verify } from "@/lib/auth/jwt";

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
    const verified: boolean = await user.verifyPassword(password);
    if (!verified) throw new Error("Invalid credentials");

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
    };
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
    let existsByUsername: boolean;
    let existsByEmail: boolean;

    try {
      existsByUsername = !!(await User.findByUsername(username));
      existsByEmail = !!(await User.findByEmail(email));
    } catch {
      throw new Error("Error encountered while finding user");
    }
    if (existsByUsername) throw new Error("username not available");
    if (existsByEmail) throw new Error("email already in registerod");

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

export async function sendVerificationLink({
  email,
  token,
}: SendVerificationLinkOptions): Promise<void> {
  const emailTemplate: string = `<a href="${BASE_URI}/verify/${token}">
  Verify my account
</a>`;
  try {
    await sendMail({
      to: email,
      subject: "Remain - Account Verification",
      html: emailTemplate,
      appName: "Remain",
    });
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Unable to send email");
  }
}

export async function verifyUser({
  token,
  confirm,
}: VerifyUserOptions): Promise<VerifyUserReturnT> {
  let _id: string;
  try {
    _id = verify(token)._id;
  } catch (e: unknown) {
    console.error(e);

    throw new Error("Invalid token");
  }
  try {
    await connectDB();
  } catch {
    throw new Error("Cannot connect to Database");
  }

  const user: HydratedDocument<IUser, UserMethods> | null =
    await User.findById(_id);

  if (!user) {
    throw new Error("User not found");
  }

  try {
    if (confirm) {
      user.verified = true;
      await user.save();
    }
    const { _id: id, name, username, email, verified } = user;
    return {
      id: id.toString(),
      name,
      username,
      email,
      verified,
    };
  } catch {
    throw new Error("Error Saving user");
  }
}
