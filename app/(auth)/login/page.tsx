"use client";

import {
  startTransition,
  SubmitEvent,
  useActionState,
  useEffect,
  useState,
} from "react";
import ResType from "@/types/api";
import loginAction, { LoginResType } from "./actions";
import { LoginOptions } from "@/core/auth/auth.types";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, EyeIcon, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const initialState: ResType<LoginResType> = {
  success: false,
  errors: [],
};

export default function LoginPage() {
  const [loginData, loginActinoClient] = useActionState<
    ResType<LoginResType>,
    FormData
  >(loginAction, initialState);

  let errors: string[];
  if (!loginData.success) errors = loginData.errors;
  else errors = [];

  useEffect((): void => {
    errors.forEach((error: string): void => {
      toast.error(error, {});
    });
  }, [errors]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-stone-200 dark:bg-black">
      <form
        className={`flex flex-col w-3/4 max-w-sm gap-8 bg-stone-200 dark:bg-black text-stone-950 dark:text-stone-50 border border-stone-400 dark:border-stone-800 px-10 py-8 rounded-md`}
        onSubmit={(e: SubmitEvent<HTMLFormElement>): void => {
          e.preventDefault();
          const formData: FormData = new FormData(e.currentTarget);
          startTransition((): void => loginActinoClient(formData));
        }}
      >
        <h3 className="text-4xl font-semibold">Login</h3>
        <FieldGroup className="w-full">
          <Field>
            <FieldLabel>
              Username
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              autoFocus
              required
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
              placeholder="johndoeofficial"
              name="username"
              type="text"
            />
          </Field>
          <Field>
            <FieldLabel>
              Password
              <span className="text-destructive">*</span>
            </FieldLabel>
            <InputGroup
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
            >
              <InputGroupInput
                required
                placeholder={showPassword ? "Password" : "********"}
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <InputGroupAddon
                align={"inline-end"}
                className="cursor-pointer"
                onClick={(): void =>
                  setShowPassword((pSP: boolean): boolean => !pSP)
                }
              >
                {showPassword ? <EyeOff /> : <EyeIcon />}{" "}
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button variant={"default"}>Login</Button>
        </FieldGroup>
        <div className={`w-full flex justify-end gap-1 text-sm`}>
          Don&apos;t have an account?
          <Link
            className={`text-blue-500 flex justify-center items-center`}
            href={"/register"}
          >
            Register <ArrowUpRight size={16} />
          </Link>
        </div>
      </form>
    </main>
  );
}
