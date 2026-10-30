// Capstone tier outline for cybersecurity-capstone-advanced. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cybersecurity-capstone-advanced/
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

export const CYBERSECURITY_CAPSTONE_ADVANCED_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident",
    lessons: [
      L(1, "the-ask-becomes-a-mandate", "The Ask Becomes a Mandate: A Board-Level Security Review", { contentDir: "ch01/01-the-ask-becomes-a-mandate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/the-ask-becomes-a-mandate.mp4", durationLabel: "1 min 27 s" }),
      L(2, "scoping-the-zero-trust-pilot", "Scoping the Zero-Trust Pilot", { contentDir: "ch01/02-scoping-the-zero-trust-pilot", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/scoping-the-zero-trust-pilot.mp4", durationLabel: "1 min 39 s" }),
      L(3, "mapping-the-dual-cloud-identity-footprint", "Mapping the Dual-Cloud Identity Footprint", { contentDir: "ch01/03-mapping-the-dual-cloud-identity-footprint", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/mapping-the-dual-cloud-identity-footprint.mp4", durationLabel: "1 min 24 s" }),
      L(4, "designing-the-target-architecture", "Designing the Target Architecture", { contentDir: "ch01/04-designing-the-target-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/designing-the-target-architecture.mp4", durationLabel: "1 min 26 s" }),
      L(5, "building-the-network-segmentation-plan", "Building the Network Segmentation Plan", { contentDir: "ch01/05-building-the-network-segmentation-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/building-the-network-segmentation-plan.mp4", durationLabel: "1 min 33 s" }),
      L(6, "consolidating-azure-and-aws-identity", "Consolidating Azure and AWS Identity", { contentDir: "ch01/06-consolidating-azure-and-aws-identity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/consolidating-azure-and-aws-identity.mp4", durationLabel: "1 min 25 s" }),
      L(7, "rolling-out-the-segmentation-pilot", "Rolling Out the Segmentation Pilot", { contentDir: "ch01/07-rolling-out-the-segmentation-pilot", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/rolling-out-the-segmentation-pilot.mp4", durationLabel: "1 min 27 s" }),
      L(8, "writing-the-python-enrichment-automation", "Writing the Python Enrichment Automation", { contentDir: "ch01/08-writing-the-python-enrichment-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/writing-the-python-enrichment-automation.mp4", durationLabel: "1 min 53 s" }),
      L(9, "scheduling-and-testing-the-automation", "Scheduling and Testing the Automation", { contentDir: "ch01/09-scheduling-and-testing-the-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/scheduling-and-testing-the-automation.mp4", durationLabel: "1 min 31 s" }),
      L(10, "building-the-grc-risk-register", "Building the GRC Risk Register", { contentDir: "ch01/10-building-the-grc-risk-register", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/building-the-grc-risk-register.mp4", durationLabel: "1 min 5 s" }),
      L(11, "the-compliance-audit-finding", "The Compliance Audit Finding", { contentDir: "ch01/11-the-compliance-audit-finding", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/the-compliance-audit-finding.mp4", durationLabel: "57 s" }),
      L(12, "the-siem-says-something-different", "The SIEM Says Something Different", { contentDir: "ch01/12-the-siem-says-something-different", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/the-siem-says-something-different.mp4", durationLabel: "1 min 2 s" }),
      L(13, "reconciling-the-two-accounts", "Reconciling the Two Accounts", { contentDir: "ch01/13-reconciling-the-two-accounts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/reconciling-the-two-accounts.mp4", durationLabel: "52 s" }),
      L(14, "tracing-the-real-sequence-of-events", "Tracing the Real Sequence of Events", { contentDir: "ch01/14-tracing-the-real-sequence-of-events", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/tracing-the-real-sequence-of-events.mp4", durationLabel: "58 s" }),
      L(15, "finding-the-actual-gap", "Finding the Actual Gap Between Both Reports", { contentDir: "ch01/15-finding-the-actual-gap", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/finding-the-actual-gap.mp4", durationLabel: "1 min 4 s" }),
      L(16, "fixing-the-gap", "Fixing the Gap and Validating the Fix", { contentDir: "ch01/16-fixing-the-gap", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/fixing-the-gap.mp4", durationLabel: "1 min 3 s" }),
      L(17, "updating-the-risk-register", "Updating the Risk Register with the Real Finding", { contentDir: "ch01/17-updating-the-risk-register", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/updating-the-risk-register.mp4", durationLabel: "1 min 6 s" }),
      L(18, "briefing-the-ciso", "Briefing the CISO", { contentDir: "ch01/18-briefing-the-ciso", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/briefing-the-ciso.mp4", durationLabel: "1 min 7 s" }),
      L(19, "writing-the-after-action-report", "Writing the After-Action Report", { contentDir: "ch01/19-writing-the-after-action-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/writing-the-after-action-report.mp4", durationLabel: "1 min 17 s" }),
      L(20, "presenting-to-the-board", "Presenting to the Board", { contentDir: "ch01/20-presenting-to-the-board", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/presenting-to-the-board.mp4", durationLabel: "1 min 10 s" }),
      L(21, "handling-the-boards-hardest-question", "Handling the Board's Hardest Question", { contentDir: "ch01/21-handling-the-boards-hardest-question", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/handling-the-boards-hardest-question.mp4", durationLabel: "1 min 4 s" }),
      L(22, "planning-the-next-phase", "Planning the Next Phase of the Zero-Trust Rollout", { contentDir: "ch01/22-planning-the-next-phase", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/planning-the-next-phase.mp4", durationLabel: "1 min 5 s" }),
      L(23, "a-second-stakeholder-conflict", "A Second Stakeholder Conflict: Speed vs. Control", { contentDir: "ch01/23-a-second-stakeholder-conflict", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/a-second-stakeholder-conflict.mp4", durationLabel: "1 min 11 s" }),
      L(24, "resolving-the-conflict-with-data", "Resolving the Conflict with Data, Not Opinion", { contentDir: "ch01/24-resolving-the-conflict-with-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/resolving-the-conflict-with-data.mp4", durationLabel: "1 min 8 s" }),
      L(25, "final-validation-pass", "The Final Validation Pass", { contentDir: "ch01/25-final-validation-pass", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/final-validation-pass.mp4", durationLabel: "1 min 6 s" }),
      L(26, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/26-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-advanced/wrap-up-and-whats-next.mp4", durationLabel: "1 min 12 s" }),
    ],
  },
];
