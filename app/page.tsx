import Hero from "@/components/home/Hero";
import Chapters from "@/components/home/Chapters";
import Tracks from "@/components/home/Tracks";
import Testimonials from "@/components/home/Testimonials";
import Instructor from "@/components/home/Instructor";
import Schedule from "@/components/home/Schedule";
import Pricing from "@/components/home/Pricing";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import StructuredData from "@/components/StructuredData";

export default function HomePage() {
  return (
    <main>
      <StructuredData />
      <Hero />
      <Chapters />
      <Tracks />
      <Testimonials />
      <Instructor />
      <Schedule />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
