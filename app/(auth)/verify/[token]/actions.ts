"use server";
import { sessionSchema } from "@/core/auth/auth.schemas";
import { verifyUser } from "@/core/auth/auth.service";
import { VerifyUserOptions, VerifyUserReturnT } from "@/core/auth/auth.types";
import { createSession } from "@/lib/auth/session";
import type ResType from "@/types/api";
import { Types } from "mongoose";
import { redirect } from "next/navigation";

export default async function verifyUserAction(
  _prevState: ResType<VerifyUserReturnT>,
  formData: FormData,
): Promise<ResType<VerifyUserReturnT>> {
  const { data, success, error } = sessionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!success) {
    console.error(error);
    return {
      success: false,
      errors: ["Invalid token"],
    };
  }

  const { token, confirm }: VerifyUserOptions = data;

  let id: string;
  try {
    id = (
      await verifyUser({
        token,
        confirm,
      })
    ).id;
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
  await createSession({
    _id: id,
  });
  redirect("/");
}
