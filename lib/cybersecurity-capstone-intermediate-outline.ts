// Capstone tier outline for cybersecurity-capstone-intermediate. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cybersecurity-capstone-intermediate/
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

export const CYBERSECURITY_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Stakeholders, One Deadline", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 15 s" }),
      L(2, "reconciling-what-each-stakeholder-actually-wants", "Reconciling What Each Stakeholder Actually Wants", { contentDir: "ch01/02-reconciling-what-each-stakeholder-actually-wants", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/reconciling-what-each-stakeholder-actually-wants.mp4", durationLabel: "1 min 20 s" }),
      L(3, "planning-the-multi-source-ingestion", "Planning Multi-Source Log Ingestion", { contentDir: "ch01/03-planning-the-multi-source-ingestion", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/planning-the-multi-source-ingestion.mp4", durationLabel: "1 min 8 s" }),
      L(4, "connecting-the-firewall-and-linux-logs", "Connecting the Firewall and Linux Logs to Sentinel", { contentDir: "ch01/04-connecting-the-firewall-and-linux-logs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/connecting-the-firewall-and-linux-logs.mp4", durationLabel: "1 min 40 s" }),
      L(5, "building-the-correlation-rule", "Building a Correlation Rule Across Sources", { contentDir: "ch01/05-building-the-correlation-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/building-the-correlation-rule.mp4", durationLabel: "1 min 18 s" }),
      L(6, "configuring-conditional-access", "Configuring a Conditional Access Pilot Policy", { contentDir: "ch01/06-configuring-conditional-access", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/configuring-conditional-access.mp4", durationLabel: "1 min 5 s" }),
      L(7, "writing-the-incident-response-runbook", "Writing the First Incident-Response Runbook", { contentDir: "ch01/07-writing-the-incident-response-runbook", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/writing-the-incident-response-runbook.mp4", durationLabel: "1 min 14 s" }),
      L(8, "the-rule-fires-at-3am", "The Rule Fires at 3 AM: A Real Alert to Triage", { contentDir: "ch01/08-the-rule-fires-at-3am", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/the-rule-fires-at-3am.mp4", durationLabel: "1 min 23 s" }),
      L(9, "tracing-the-alert-to-a-firewall-rule", "Tracing the Alert Back to a Firewall Rule", { contentDir: "ch01/09-tracing-the-alert-to-a-firewall-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/tracing-the-alert-to-a-firewall-rule.mp4", durationLabel: "1 min 4 s" }),
      L(10, "finding-the-overly-broad-rule", "Finding the Overly Broad Rule Nobody Flagged", { contentDir: "ch01/10-finding-the-overly-broad-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/finding-the-overly-broad-rule.mp4", durationLabel: "1 min 14 s" }),
      L(11, "fixing-and-validating-the-firewall-rule", "Fixing and Validating the Firewall Rule", { contentDir: "ch01/11-fixing-and-validating-the-firewall-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/fixing-and-validating-the-firewall-rule.mp4", durationLabel: "1 min 4 s" }),
      L(12, "updating-the-runbook-with-the-real-incident", "Updating the Runbook with the Real Incident", { contentDir: "ch01/12-updating-the-runbook-with-the-real-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/updating-the-runbook-with-the-real-incident.mp4", durationLabel: "1 min 1 s" }),
      L(13, "documenting-the-expanded-soc-baseline", "Documenting the Expanded SOC Baseline", { contentDir: "ch01/13-documenting-the-expanded-soc-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/documenting-the-expanded-soc-baseline.mp4", durationLabel: "57 s" }),
      L(14, "presenting-to-both-stakeholders", "Presenting to the IT Director and Compliance Officer", { contentDir: "ch01/14-presenting-to-both-stakeholders", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/presenting-to-both-stakeholders.mp4", durationLabel: "1 min 3 s" }),
      L(15, "handling-the-compliance-officers-follow-up", "Handling the Compliance Officer's Follow-Up Question", { contentDir: "ch01/15-handling-the-compliance-officers-follow-up", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/handling-the-compliance-officers-follow-up.mp4", durationLabel: "50 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What Changed, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cybersecurity-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 1 s" }),
    ],
  },
];
