"use server";

import { loginSchema } from "@/core/auth/auth.schemas";
import { login } from "@/core/auth/auth.service";
import { createSession } from "@/lib/auth/session";
import ResType from "@/types/api";
import { $ZodIssue } from "zod/v4/core";

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
      errors: error.issues.flatMap((issue: $ZodIssue): string => issue.message),
    };
  }

  const { username, password } = data;

  try {
    const { id } = await login({ username, password });
    await createSession({ _id: id });
    return {
      success: true,
      data: {
        id,
      },
    };
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
}
