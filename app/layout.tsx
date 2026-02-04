import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "sonner/dist/styles.css";
import { ThemeProvider } from "next-themes";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100 dark:bg-black text-stone-950 dark:text-stone-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
