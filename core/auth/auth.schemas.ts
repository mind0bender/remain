import z4 from "zod/v4";
import {
  passwordSchema,
  userEmailSchema,
  usernameSchema,
  userNameSchema,
} from "../user/user.schemas";
import { LoginOptions, RegistereOptions } from "@/core/auth/auth.types";

export const registerSchema = z4.object({
  name: userNameSchema,
  email: userEmailSchema,
  password: passwordSchema,
  username: usernameSchema,
}) satisfies z4.ZodType<RegistereOptions>;

export const loginSchema = z4.object({
  username: usernameSchema,
  password: passwordSchema,
}) satisfies z4.ZodType<LoginOptions>;
