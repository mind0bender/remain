"use client";

import {
  JSX,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
} from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import verifyUserAction from "./actions";
import ResType from "@/types/api";
import { VerifyUserReturnT } from "@/core/auth/auth.types";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { sessionSchema } from "@/core/auth/auth.schemas";
import { zodIssuesToStrings } from "@/utils/zodHelper";
import { NextPage } from "next";

const initialState: ResType<VerifyUserReturnT> = {
  success: true,
  data: {
    id: "",
    name: "",
    username: "",
    email: "",
    verified: false,
  },
};

const ConfirmVerifyAccountPage: NextPage = (): JSX.Element => {
  const { token } = useParams<{ token: string }>();

  const [verifyUserState, verifyUserActionClient, isPending] = useActionState<
    ResType<VerifyUserReturnT>,
    FormData
  >(verifyUserAction, initialState);

  useEffect((): void => {
    const formData: FormData = new FormData();
    formData.append("token", token);
    startTransition((): void => {
      verifyUserActionClient(formData);
    });
  }, [token, verifyUserActionClient]);

  let errors: string[];
  if (!verifyUserState.success) errors = verifyUserState.errors;
  else errors = [];

  useEffect((): void => {
    errors.forEach((error: string): void => {
      toast.error(error);
    });
  }, [errors]);

  const handleSubmit = useCallback(
    (formData: FormData): void => {
      const dataObj = Object.fromEntries(formData.entries());
      const { success, error } = sessionSchema.safeParse(dataObj);
      if (!success) {
        const errs: string[] = zodIssuesToStrings(error.issues);
        errs.forEach((err: string): void => {
          toast.error(err);
        });
      }
      verifyUserActionClient(formData);
    },
    [verifyUserActionClient],
  );

  if (!verifyUserState.success) {
    return <main>error</main>;
  }

  const { data } = verifyUserState;

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-stone-200 dark:bg-black">
      <form
        action={handleSubmit}
        className={`flex flex-col w-3/4 max-w-sm gap-8 bg-stone-200 dark:bg-black text-stone-950 dark:text-stone-50 border border-stone-400 dark:border-stone-800 px-10 py-8 rounded-md`}
      >
        <FieldGroup className="w-full">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              type="text"
              name="name"
              value={data.name || "Loading..."}
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel>username</FieldLabel>
            <Input
              type="text"
              name="username"
              value={data.username || "Loading..."}
              readOnly
            />
          </Field>
          <Field hidden>
            <FieldLabel>token</FieldLabel>
            <Input type="text" name="token" value={token} readOnly />
          </Field>
          <Field hidden>
            <FieldLabel>confirm</FieldLabel>
            <Input name="confirm" type="checkbox" checked={true} readOnly />
          </Field>
          <Field>
            <FieldLabel>status</FieldLabel>
            <Input
              name="verified"
              type="text"
              value={
                isPending
                  ? "Loading..."
                  : data.verified
                    ? "verified"
                    : "unverified"
              }
              readOnly
            />
          </Field>

          {data.verified ? (
            <Link href={"/"} className="w-full">
              <Button className="w-full" type="button" variant={"secondary"}>
                Back to Home
              </Button>
            </Link>
          ) : (
            <Button type="submit">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Verify my Account</>
              )}
            </Button>
          )}
        </FieldGroup>
      </form>
    </main>
  );
};

export default ConfirmVerifyAccountPage;
