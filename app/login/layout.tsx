import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member login",
  description:
    "Sign in to the Lifting the Veil Academy member portal to access your classes, recordings, and course materials.",
  robots: { index: false },
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
