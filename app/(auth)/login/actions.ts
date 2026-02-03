"use server";

import { loginSchema } from "@/core/auth/auth.schemas";
import { login } from "@/core/auth/auth.service";
import { createSession } from "@/lib/auth/session";
import ResType from "@/types/api";
import { zodIssuesToStrings } from "@/utils/zodHelper";
import { redirect } from "next/navigation";

export interface LoginResType {
  id: string | null;
}

export default async function loginAction(
  _prevState: ResType<LoginResType>,
  formData: FormData,
): Promise<ResType<LoginResType>> {
  const { success, error, data } = loginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!success) {
    return {
      success: false,
      errors: zodIssuesToStrings(error.issues),
    };
  }

  const { username, password } = data;

  try {
    const { id } = await login({ username, password });
    await createSession({ _id: id });
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
  redirect("/");
}
