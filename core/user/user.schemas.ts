import { z } from "zod";
import { UserStatus } from "./user.types";

export const userNameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(64, { message: "Name must be at most 64 characters" })
  .refine((val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Name must not be an email address",
  });

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(32, { message: "Username must be at most 32 characters" })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Username may only contain letters, numbers, and underscores",
  })
  .transform((v) => v.toLowerCase());

export const userEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.email({
      error: "Invalid email address",
    }),
  );

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(128, { message: "Password must be at most 128 characters long" });

export const userStatusSchema = z.enum(UserStatus);

export const userLastActiveSchema = z.coerce
  .date({
    error: (issue) =>
      issue.input === undefined
        ? "lastActiveAt is required"
        : "Invalid date format",
  })
  .max(new Date(), { message: "User activity cannot be in the future" });
