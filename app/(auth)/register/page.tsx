"use client";

import { toast } from "sonner";
import ResType from "@/types/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerAction, { RegisterResData } from "./actions";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowUpRight, EyeIcon, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/core/auth/auth.schemas";
import z4 from "zod/v4";

type RegisterFormFields = z4.infer<typeof registerSchema>;

const initialState: ResType<RegisterResData> = {
  success: false,
  errors: [],
};

export default function RegisterPage() {
  const [registerData, registerActionClient, isPending] = useActionState<
    ResType<RegisterResData>,
    FormData
  >(registerAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  useEffect((): void => {
    if (!registerData.success)
      registerData.errors.forEach((error: string): void => {
        toast.error(error, {});
      });
  }, [registerData]);

  const onSubmit = useCallback(
    (data: RegisterFormFields): void => {
      startTransition((): void => {
        const formData: FormData = new FormData();
        Object.entries(data).forEach(([name, value]): void => {
          formData.append(name, value);
        });
        registerActionClient(formData);
      });
    },
    [registerActionClient],
  );

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form className={`w-3/4 max-w-sm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className={`flex flex-col gap-8 bg-stone-200 dark:bg-black text-stone-950 dark:text-stone-50 border border-stone-400 dark:border-stone-800 px-10 py-8 rounded-md`}
        disabled={isPending}
      >
        <h3 className="text-4xl font-semibold">Register</h3>
        <FieldGroup className="w-full gap-4">
          <Field>
            <FieldLabel>
              Name
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              autoFocus
              placeholder="John Doe"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <FieldError className={`text-xs`}>
              {clientErrors.name?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>
              Username
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="johndoeofficial"
              type="text"
              {...register("username", { required: true })}
            />
            <FieldError className={`text-xs`}>
              {clientErrors.username?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>
              Email
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              placeholder="you@example.com"
              type="email"
              {...register("email", { required: true })}
            />
            <FieldError className={`text-xs`}>
              {clientErrors.email?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>
              Password
              <span className="text-destructive">*</span>
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder={showPassword ? "Password" : "********"}
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <InputGroupAddon
                align={"inline-end"}
                className="cursor-pointer pl-2"
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
          {isPending ? <Loader2 className="animate-spin" /> : <>Register</>}
        </Button>
        <div className={`w-full flex justify-end gap-1 text-sm`}>
          Already have an account?
          <Link
            className={`text-blue-500 flex justify-center items-center`}
            href={"/login"}
          >
            Login <ArrowUpRight size={16} />
          </Link>
        </div>
      </fieldset>
    </form>
  );
}
