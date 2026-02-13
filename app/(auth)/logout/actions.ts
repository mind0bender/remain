"use server";
import { logout } from "@/core/auth/auth.service";

export default async function logoutAction() {
  await logout();
}
