import type { Metadata } from "next";
import VslHero from "@/components/vsl/VslHero";
import PathsGrid from "@/components/vsl/PathsGrid";
import InsidePath from "@/components/vsl/InsidePath";
import VideoLessons from "@/components/vsl/VideoLessons";
import AiAssistant from "@/components/vsl/AiAssistant";
import HandsOn from "@/components/vsl/HandsOn";
import Assessments from "@/components/vsl/Assessments";
import InterviewPrepSection from "@/components/vsl/InterviewPrepSection";
import CommunicationLab from "@/components/vsl/CommunicationLab";
import ProgressTracking from "@/components/vsl/ProgressTracking";
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
      <VslHero />
      <PathsGrid />
      <InsidePath />
      <VideoLessons />
      <AiAssistant />
      <HandsOn />
      <Assessments />
      <InterviewPrepSection />
      <CommunicationLab />
      <ProgressTracking />
      <FounderProof />
      <VslPricingFaq />
    </main>
  );
}
