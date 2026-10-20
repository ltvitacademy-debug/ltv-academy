import EmbedHeightReporter from "@/components/EmbedHeightReporter";

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <EmbedHeightReporter />
      {children}
    </>
  );
}
