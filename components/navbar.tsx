"use client";
import { JSX } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import Logo from "./logo";
import { IUser } from "@/core/user";
import { useUser } from "@/providers/user-provider";
import { AuthSession } from "@/lib/auth/session";
import { logout } from "@/core/auth/auth.service";
import logoutAction from "@/app/(auth)/logout/actions";

export default function Navbar(): JSX.Element {
  const user: AuthSession | null = useUser();

  return (
    <nav className={`border-b border-b-stone-400 dark:border-b-stone-800`}>
      <div
        className={`w-full px-4 py-4 sm:px-8 flex justify-between items-center container m-auto`}
      >
        <Link href={"/"}>
          <Logo />
        </Link>
        {user ? <AuthenticatedMenu {...user} /> : <UnAuthenticatedMenu />}
      </div>
    </nav>
  );
}

function AuthenticatedMenu({ username }: AuthSession): JSX.Element {
  return (
    <ol className={`flex gap-2 justify-center items-center`}>
      <li className={`font-mono`}>@{username}</li>
      <li>
        <form action={logoutAction}>
          <Button variant={"ghost"}>
            <LogOut size={16} />
          </Button>
        </form>
      </li>
    </ol>
  );
}

function UnAuthenticatedMenu(): JSX.Element {
  return (
    <ol>
      <li>
        <Link href={"/register"}>
          <Button type="button" className={`cursor-pointer`}>
            Create Account <ChevronRight />{" "}
          </Button>
        </Link>
      </li>
    </ol>
  );
}
