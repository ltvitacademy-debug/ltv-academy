import type { Metadata } from "next";
import VslTopBar from "@/components/vsl/VslTopBar";
import VslHero from "@/components/vsl/VslHero";
import PathsGrid from "@/components/vsl/PathsGrid";
import LearningSystem from "@/components/vsl/LearningSystem";
import FounderProof from "@/components/vsl/FounderProof";
import VslPricingFaq from "@/components/vsl/VslPricingFaq";

export const metadata: Metadata = {
  title: "Start Your Tech Career for $9.97",
  description:
    "24 technology career paths, one complete training platform. Video lessons, AI-assisted learning, hands-on practice, and interview preparation. Start your first 30 days for $9.97.",
  alternates: { canonical: "/vsl" },
  robots: { index: false, follow: false },
};

export default function VslPage() {
  return (
    <main>
      <VslTopBar />
      <VslHero />
      <PathsGrid />
      <LearningSystem />
      <FounderProof />
      <VslPricingFaq />
    </main>
  );
}
