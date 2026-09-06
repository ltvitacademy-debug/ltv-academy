import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Learning Center",
  robots: { index: false },
};

export default function LearningCenterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="border-b border-ink/10 bg-parchment">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="eyebrow">Student Learning Center</p>
          <Link
            href="/app"
            className="text-sm text-stone underline underline-offset-4 hover:text-crimson"
          >
            My dashboard
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
