"use client";

import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import ResType from "@/types/api";
import loginAction, { LoginResType } from "./actions";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, EyeIcon, EyeOff, Loader2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import z4 from "zod/v4";
import { loginSchema } from "@/core/auth/auth.schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormFields = z4.infer<typeof loginSchema>;

const initialState: ResType<LoginResType> = {
  success: false,
  errors: [],
};

export default function LoginPage() {
  const [loginData, loginActinoClient, isPending] = useActionState<
    ResType<LoginResType>,
    FormData
  >(loginAction, initialState);

  useEffect((): void => {
    if (loginData.success) return;
    loginData.errors.forEach((error: string): void => {
      toast.error(error, {});
    });
  }, [loginData]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    (data: LoginFormFields): void => {
      const formData: FormData = new FormData();
      Object.entries(data).forEach(([name, value]: [string, string]): void => {
        formData.append(name, value);
      });
      startTransition((): void => {
        loginActinoClient(formData);
      });
    },
    [loginActinoClient],
  );

  return (
    <form className={`w-3/4 max-w-sm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className={`flex flex-col gap-8 bg-stone-200 dark:bg-black text-stone-950 dark:text-stone-50 border border-stone-400 dark:border-stone-800 px-10 py-8 rounded-md`}
        disabled={isPending}
      >
        <h3 className="text-4xl font-semibold">Login</h3>
        <FieldGroup className="w-full gap-4">
          <Field>
            <FieldLabel>
              Username
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              autoFocus
              className={`w-full bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800`}
              placeholder="johndoeofficial"
              type="text"
              {...register("username")}
            />
            <FieldError className={`text-xs`}>
              {clientErrors.username?.message}
            </FieldError>
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
                placeholder={showPassword ? "Password" : "********"}
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <InputGroupAddon
                align={"inline-end"}
                className="cursor-pointer"
                onClick={(): void =>
                  setShowPassword((pSP: boolean): boolean => !pSP)
                }
              >
                {!showPassword ? <EyeOff /> : <EyeIcon />}{" "}
              </InputGroupAddon>
            </InputGroup>
            <FieldError className={`text-xs`}>
              {clientErrors.password?.message}
            </FieldError>
          </Field>
        </FieldGroup>

        <Button type="submit" variant={"default"}>
          {isPending ? <Loader2 className="animate-spin" /> : <>Login</>}
        </Button>
        <div className={`w-full flex justify-end gap-1 text-sm`}>
          Don&apos;t have an account?
          <Link
            className={`text-blue-500 flex justify-center items-center`}
            href={"/register"}
          >
            Register <ArrowUpRight size={16} />
          </Link>
        </div>
      </fieldset>
    </form>
  );
}
