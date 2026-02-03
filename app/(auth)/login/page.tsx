"use client";

import { useActionState } from "react";
import loginAction, { LoginResType } from "./actions";
import ResType from "@/types/api";

export default function RegisterPage() {
  const initialState: ResType<LoginResType> = {
    success: false,
    errors: [],
  };
  const [loginState, loginActionClient] = useActionState<
    ResType<LoginResType>,
    FormData
  >(loginAction, initialState);

  return (
    <main>
      <div>{JSON.stringify(loginState)}</div>
      <form className={`flex flex-col gap-4`} action={loginActionClient}>
        <input placeholder="Enter your username" name="username" />
        <input placeholder="Enter your password" name="password" />
        <button>Register</button>
      </form>
    </main>
  );
}
