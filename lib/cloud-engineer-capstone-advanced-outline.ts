// Capstone tier outline for cloud-engineer-capstone-advanced. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-engineer-capstone-advanced/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const CLOUD_ENGINEER_CAPSTONE_ADVANCED_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident",
    lessons: [
      L(1, "the-ask-becomes-a-mandate", "The Ask Becomes a Mandate: A Company-Wide Platform Review", { contentDir: "ch01/01-the-ask-becomes-a-mandate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/the-ask-becomes-a-mandate.mp4", durationLabel: "1 min 26 s" }),
      L(2, "scoping-the-kubernetes-migration", "Scoping the Kubernetes Migration", { contentDir: "ch01/02-scoping-the-kubernetes-migration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/scoping-the-kubernetes-migration.mp4", durationLabel: "1 min 23 s" }),
      L(3, "designing-the-multi-cloud-target-architecture", "Designing the Multi-Cloud Target Architecture", { contentDir: "ch01/03-designing-the-multi-cloud-target-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/designing-the-multi-cloud-target-architecture.mp4", durationLabel: "1 min 31 s" }),
      L(4, "building-the-aks-cluster", "Building the AKS Cluster", { contentDir: "ch01/04-building-the-aks-cluster", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/building-the-aks-cluster.mp4", durationLabel: "1 min 17 s" }),
      L(5, "migrating-services-to-kubernetes", "Migrating Services to Kubernetes", { contentDir: "ch01/05-migrating-services-to-kubernetes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/migrating-services-to-kubernetes.mp4", durationLabel: "1 min 25 s" }),
      L(6, "writing-the-terraform-for-both-clouds", "Writing the Terraform for Both Clouds", { contentDir: "ch01/06-writing-the-terraform-for-both-clouds", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/writing-the-terraform-for-both-clouds.mp4", durationLabel: "1 min 19 s" }),
      L(7, "building-the-finops-dashboard", "Building the FinOps Dashboard", { contentDir: "ch01/07-building-the-finops-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/building-the-finops-dashboard.mp4", durationLabel: "1 min 26 s" }),
      L(8, "load-testing-before-the-big-sale", "Load-Testing Before the Big Sale", { contentDir: "ch01/08-load-testing-before-the-big-sale", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/load-testing-before-the-big-sale.mp4", durationLabel: "1 min 19 s" }),
      L(9, "the-sale-goes-live", "The Sale Goes Live", { contentDir: "ch01/09-the-sale-goes-live", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/the-sale-goes-live.mp4", durationLabel: "1 min 26 s" }),
      L(10, "the-dashboards-disagree", "The Dashboards Disagree", { contentDir: "ch01/10-the-dashboards-disagree", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/the-dashboards-disagree.mp4", durationLabel: "53 s" }),
      L(11, "tracing-the-discrepancy", "Tracing the Discrepancy Between Both Dashboards", { contentDir: "ch01/11-tracing-the-discrepancy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/tracing-the-discrepancy.mp4", durationLabel: "57 s" }),
      L(12, "finding-the-real-bottleneck", "Finding the Real Bottleneck", { contentDir: "ch01/12-finding-the-real-bottleneck", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/finding-the-real-bottleneck.mp4", durationLabel: "54 s" }),
      L(13, "fixing-the-bottleneck-live", "Fixing the Bottleneck Live", { contentDir: "ch01/13-fixing-the-bottleneck-live", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/fixing-the-bottleneck-live.mp4", durationLabel: "58 s" }),
      L(14, "validating-the-fix-under-load", "Validating the Fix Under Load", { contentDir: "ch01/14-validating-the-fix-under-load", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/validating-the-fix-under-load.mp4", durationLabel: "51 s" }),
      L(15, "writing-the-incident-report", "Writing the Incident Report", { contentDir: "ch01/15-writing-the-incident-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/writing-the-incident-report.mp4", durationLabel: "59 s" }),
      L(16, "updating-the-finops-dashboard", "Updating the FinOps Dashboard with the Real Numbers", { contentDir: "ch01/16-updating-the-finops-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/updating-the-finops-dashboard.mp4", durationLabel: "52 s" }),
      L(17, "briefing-leadership", "Briefing Leadership on the Sale Results", { contentDir: "ch01/17-briefing-leadership", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/briefing-leadership.mp4", durationLabel: "1 min 0 s" }),
      L(18, "presenting-the-after-action-report", "Presenting the After-Action Report", { contentDir: "ch01/18-presenting-the-after-action-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/presenting-the-after-action-report.mp4", durationLabel: "1 min 0 s" }),
      L(19, "handling-leaderships-hardest-question", "Handling Leadership's Hardest Question", { contentDir: "ch01/19-handling-leaderships-hardest-question", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/handling-leaderships-hardest-question.mp4", durationLabel: "1 min 17 s" }),
      L(20, "planning-the-next-phase", "Planning the Next Phase of the Platform", { contentDir: "ch01/20-planning-the-next-phase", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/planning-the-next-phase.mp4", durationLabel: "1 min 0 s" }),
      L(21, "a-second-stakeholder-conflict", "A Second Stakeholder Conflict: Speed vs. Cost", { contentDir: "ch01/21-a-second-stakeholder-conflict", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/a-second-stakeholder-conflict.mp4", durationLabel: "1 min 7 s" }),
      L(22, "resolving-the-conflict-with-data", "Resolving the Conflict with Data, Not Opinion", { contentDir: "ch01/22-resolving-the-conflict-with-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/resolving-the-conflict-with-data.mp4", durationLabel: "1 min 21 s" }),
      L(23, "hardening-the-platform-for-next-season", "Hardening the Platform for Next Season", { contentDir: "ch01/23-hardening-the-platform-for-next-season", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/hardening-the-platform-for-next-season.mp4", durationLabel: "1 min 7 s" }),
      L(24, "final-validation-pass", "The Final Validation Pass", { contentDir: "ch01/24-final-validation-pass", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/final-validation-pass.mp4", durationLabel: "1 min 15 s" }),
      L(25, "documenting-the-full-platform", "Documenting the Full Platform", { contentDir: "ch01/25-documenting-the-full-platform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/documenting-the-full-platform.mp4", durationLabel: "1 min 1 s" }),
      L(26, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/26-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-advanced/wrap-up-and-whats-next.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
];
