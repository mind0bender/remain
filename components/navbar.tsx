import { JSX } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Logo from "./logo";

export default function Navbar(): JSX.Element {
  return (
    <nav className={`border-b border-b-stone-400 dark:border-b-stone-800`}>
      <div
        className={`w-full px-4 py-4 sm:px-8 flex justify-between items-center container m-auto`}
      >
        <Link href={"/"}>
          <Logo />
        </Link>
        <ol>
          <Link href={"/register"}>
            <Button>
              Create Account <ChevronRight />{" "}
            </Button>
          </Link>
        </ol>
      </div>
    </nav>
  );
}
