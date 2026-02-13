"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/core/user";
import { useUser } from "@/providers/user-provider";
import { ArrowLeft, CheckCircle, Loader2, Mail } from "lucide-react";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { JSX, useActionState, useEffect } from "react";
import sendAccountVerificationAction from "./actions";
import ResType from "@/types/api";
import { SendVerificationLinkActionResT } from "@/core/auth/auth.types";
import { toast } from "sonner";
import Link from "next/link";

const initialState: ResType<SendVerificationLinkActionResT> = {
  success: false,
  errors: [],
};

const SendVerificationMailPage: NextPage = (): JSX.Element => {
  const user: Omit<IUser, "password"> | null = useUser();

  const [
    sendVerificationLinkState,
    sendVerificationLinkActionClient,
    isPending,
  ] = useActionState(sendAccountVerificationAction, initialState);

  useEffect((): void => {
    if (sendVerificationLinkState.success) return;
    sendVerificationLinkState.errors.forEach((error: string): string | number =>
      toast.error(error),
    );
  }, [sendVerificationLinkState]);

  if (!user) redirect("/login");

  // if (user.verified) return <AlreadyVerified email={user.email} />;

  return (
    <div className={`flex flex-col gap-6`}>
      <div className={`flex flex-col justify-center items-center gap-4`}>
        <div className={`p-3 rounded-md bg-stone-300 dark:bg-stone-800 w-fit`}>
          <Mail />
        </div>
        <div className={`flex flex-col gap-1 text-center`}>
          <h3 className={`text-3xl font-semibold`}>Verify Your Email</h3>
          <p className={`text-stone-700 dark:text-stone-400`}>
            Confirm your email address to secure your account
          </p>
        </div>
      </div>
      <form action={sendVerificationLinkActionClient}>
        <FieldSet disabled={isPending}>
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <Input type="email" readOnly value={user.email} />
            <FieldDescription className={`text-sm`}>
              This is the email address associated with your account
            </FieldDescription>
          </Field>
          <Button type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Send Verification Email</>
            )}
          </Button>
        </FieldSet>
      </form>
      <Separator orientation="horizontal" />
      <div>
        <h5 className={`font-semibold`}>What happens Next?</h5>
        <ol
          className={`mt-2 marker:font-bold flex flex-col gap-1 text-stone-400 text-base`}
        >
          <li>
            <span className={`text-stone-50 pr-2 select-none`}>1</span>{" "}
            We&apos;ll send you a verification email
          </li>
          <li>
            <span className={`text-stone-50 pr-2 select-none`}>2</span> Click
            the link in your email
          </li>
          <li>
            <span className={`text-stone-50 pr-2 select-none`}>3</span> Your
            account will be verified
          </li>
        </ol>
      </div>
    </div>
  );
};

interface AlreadyVerifiedProps {
  email: string;
}

function AlreadyVerified({ email }: AlreadyVerifiedProps): JSX.Element {
  return (
    <div className={`flex flex-col gap-6`}>
      <div className={`flex flex-col justify-center items-center gap-4`}>
        <div className={`p-3 rounded-md bg-stone-300 dark:bg-stone-800 w-fit`}>
          <Mail />
        </div>
        <div className={`flex flex-col gap-1 text-center`}>
          <h3 className={`text-3xl font-semibold`}>Account Verified</h3>
          <p className={`text-stone-700 dark:text-stone-400`}>
            Your account is secure. You can start using the service.
          </p>
        </div>
      </div>
      <form>
        <FieldSet>
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <Input type="email" readOnly value={email} />
            <FieldDescription className={`text-sm`}>
              This is the email address associated with your account
            </FieldDescription>
          </Field>
        </FieldSet>
      </form>
      <div
        className={`flex justify-center items-center text-green-400 p-4 gap-4 text-2xl font-semibold`}
      >
        <CheckCircle size={40} /> Verified
      </div>
      <Link href={"/"} className={`flex justify-center items-center`}>
        <ArrowLeft size={20} />
        <Button variant={"link"} className={`cursor-pointer`}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default SendVerificationMailPage;
