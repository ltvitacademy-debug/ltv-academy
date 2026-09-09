import type { Metadata } from "next";
import LearningCenterBar from "@/components/app/LearningCenterBar";

export const metadata: Metadata = {
  title: "Student Learning Center",
  robots: { index: false },
};

export default function LearningCenterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-parchment">
      <LearningCenterBar />
      {children}
    </div>
  );
}
