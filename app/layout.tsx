import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "sonner/dist/styles.css";
import { ThemeProvider } from "next-themes";
import { JSX } from "react";
import Navbar from "@/components/navbar";
import { IUser } from "@/core/user";
import { UserProvider } from "@/providers/user-provider";
import { getSession } from "@/lib/auth/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remain | Digital Legacy & Secrets Vault",
  description:
    "Secure your digital legacy with Remain. Store encrypted secrets and messages that are automatically shared with loved ones if you stop logging in.",
  openGraph: {
    title: "Remain | Digital Legacy & Secrets Vault",
    description:
      "A secure fail-safe for your digital assets. Ensure your data reaches the right people when you can not.",
    url: "https://remain.vercel.app",
    siteName: "Remain",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const user: IUser | null = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider user={user}>
            <Navbar />
            <main className="w-full grow flex flex-col justify-center items-center bg-stone-100 dark:bg-black text-stone-950 dark:text-stone-50">
              {children}
            </main>
            <Toaster
              className="toaster group"
              toastOptions={{
                classNames: {
                  toast:
                    "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                },
              }}
              style={
                {
                  "--normal-border": "var(--border)",
                } as React.CSSProperties
              }
            />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
