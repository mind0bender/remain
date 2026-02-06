"use server";

import ResType from "@/types/api";
import { createSession } from "@/lib/auth/session";
import { register, sendVerificationLink } from "@/core/auth/auth.service";
import { zodIssuesToStrings } from "@/utils/zodHelper";
import { registerSchema } from "@/core/auth/auth.schemas";
import { RegisterReturnT } from "@/core/auth/auth.types";
import { redirect } from "next/navigation";

export interface RegisterResData {
  id: string | null;
}

export default async function registerAction(
  _prevState: ResType<RegisterResData>,
  formData: FormData,
): Promise<ResType<RegisterResData>> {
  const { error, data, success } = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!success) {
    return {
      success: false,
      errors: zodIssuesToStrings(error.issues),
    };
  }

  const { username, email, password, name } = data;
  let token: string;
  try {
    const { id }: RegisterReturnT = await register({
      username,
      email,
      password,
      name,
      verified: false,
    });
    token = await createSession({ _id: id });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        success: false,
        errors: [e.message],
      };
    }
    return {
      success: false,
      errors: ["Unknown server error"],
    };
  }

  try {
    await sendVerificationLink({
      email,
      token,
    });
  } catch {
    return {
      success: false,
      errors: ["Failed to send verification link"],
    };
  }

  redirect("/");
}
