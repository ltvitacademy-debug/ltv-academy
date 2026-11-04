import type { Metadata } from "next";
import LearningCenterBar from "@/components/app/LearningCenterBar";
import EmbedHeightReporter from "@/components/EmbedHeightReporter";

export const metadata: Metadata = {
  title: "Student Learning Center",
  robots: { index: false },
};

export default function LearningCenterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-parchment">
      {/* /app/* (lessons, quizzes, etc.) is embedded in Wix the same way
          /careers is (a fixed-height iframe on the "Self Study Courses"
          page) — ScrollToTop in the root layout only resets the IFRAME's
          own internal scroll, not the Wix PARENT page's scroll position,
          which is what a student actually sees since Wix grows the embed
          to fit the content instead of giving it its own scrollbar. This
          was wired into /careers already (see EmbedHeightReporter.tsx) but
          never into here, which is why "Next lesson" left students scrolled
          partway down a page that visually looked like it hadn't moved. */}
      <EmbedHeightReporter />
      <LearningCenterBar />
      {children}
    </div>
  );
}
