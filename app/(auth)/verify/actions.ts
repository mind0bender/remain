"use server";
import { sendVerificationLink } from "@/core/auth/auth.service";
import { SendVerificationLinkActionResT } from "@/core/auth/auth.types";
import { sign } from "@/lib/auth/jwt";
import { AuthSession, getSession } from "@/lib/auth/session";
import ResType from "@/types/api";

export default async function sendAccountVerificationAction(
  _previousState: ResType<SendVerificationLinkActionResT>,
): Promise<ResType<SendVerificationLinkActionResT>> {
  const user: AuthSession | null = await getSession();
  if (!user)
    return {
      success: false,
      errors: ["Unauthorized"],
    };

  const token: string = sign(
    {
      _id: user.id,
    },
    {
      expiresIn: "24h",
    },
  );

  try {
    await sendVerificationLink({ email: user.email, token });
    return {
      success: true,
      data: {},
    };
  } catch {
    return {
      success: false,
      errors: ["Cannot send verification email"],
    };
  }
}
