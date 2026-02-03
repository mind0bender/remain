"use client";

import { toast } from "sonner";
import ResType from "@/types/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerAction, { RegisterResData } from "./actions";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  startTransition,
  SubmitEvent,
  useActionState,
  useEffect,
  useState,
} from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowUpRight, EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";

const initialState: ResType<RegisterResData> = {
  success: false,
  errors: [],
};

export default function RegisterPage() {
  const [registerData, registerActionClient] = useActionState<
    ResType<RegisterResData>,
    FormData
  >(registerAction, initialState);

  let errors: string[];
  if (!registerData.success) errors = registerData.errors;
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
          startTransition(() => registerActionClient(formData));
        }}
      >
        <h3 className="text-4xl font-semibold">Register</h3>
        <FieldGroup className="w-full">
          <Field>
            <FieldLabel>
              Name
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              autoFocus
              required
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
              placeholder="John Doe"
              name="name"
              type="text"
            />
          </Field>
          <Field>
            <FieldLabel>
              Username
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
              placeholder="johndoeofficial"
              name="username"
              type="text"
            />
          </Field>
          <Field>
            <FieldLabel>
              Email
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
              placeholder="you@example.com"
              name="email"
              type="email"
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
          <Button type="submit" variant={"secondary"}>
            Register
          </Button>
        </FieldGroup>
        <div className={`w-full flex justify-end gap-1 text-sm`}>
          Already have an account?
          <Link
            className={`text-blue-500 flex justify-center items-center`}
            href={"/login"}
          >
            Login <ArrowUpRight size={16} />
          </Link>
        </div>
      </form>
    </main>
  );
}
