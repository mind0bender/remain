"use server";

import ResType from "@/types/api";
import { createSession } from "@/lib/auth/session";
import { register } from "@/core/auth/auth.service";
import { zodIssuesToStrings } from "@/utils/zodHelper";
import { registerSchema } from "@/core/auth/auth.schemas";
import { RegisterReturnT } from "@/core/auth/auth.types";

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
    } satisfies ResType<RegisterResData>;
  }

  const { username, email, password, name } = data;
  try {
    const { id }: RegisterReturnT = await register({
      username,
      email,
      password,
      name,
    });
    await createSession({ _id: id });
    return {
      success: true,
      data: {
        id,
      },
    } satisfies ResType<RegisterResData>;
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
