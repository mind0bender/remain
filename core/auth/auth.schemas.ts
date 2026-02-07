import z4 from "zod/v4";
import {
  passwordSchema,
  userEmailSchema,
  usernameSchema,
  userNameSchema,
} from "../user/user.schemas";

export const registerSchema = z4.object({
  name: userNameSchema,
  email: userEmailSchema,
  password: passwordSchema,
  username: usernameSchema,
});
export const loginSchema = z4.object({
  username: usernameSchema,
  password: passwordSchema,
});
export const sessionSchema = z4.object({
  token: z4.jwt(),
  confirm: z4.preprocess(
    (val) => val === "on" || val === "true",
    z4.boolean().default(false),
  ),
});
