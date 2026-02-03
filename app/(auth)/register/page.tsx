"use client";
import { useActionState } from "react";
import registerAction, { RegisterResData } from "./actions";
import ResType from "@/types/api";

export default function RegisterPage() {
  const initialState: ResType<RegisterResData> = {
    success: false,
    errors: [],
  };
  const [registerState, registerActionClient] = useActionState<
    ResType<RegisterResData>,
    FormData
  >(registerAction, initialState);

  return (
    <main>
      <div>{JSON.stringify(registerState)}</div>
      <form className={`flex flex-col gap-4`} action={registerActionClient}>
        <input placeholder="Enter your name" name="name" />
        <input placeholder="Enter your username" name="username" />
        <input placeholder="Enter your email" name="email" />
        <input placeholder="Enter your password" name="password" />
        <button>Register</button>
      </form>
    </main>
  );
}
