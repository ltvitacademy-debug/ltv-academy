// Incident Response, Threat Hunting & SOC Capstone course outline. Lessons without a contentDir
// render as "in production". Course 7 of the Cybersecurity Analyst → Security Engineer path —
// the final course of the Job-Ready Foundation stage: the full NIST incident response lifecycle,
// hypothesis-driven threat hunting, and a job-ready capstone closing out the SOC Analyst
// foundation built across courses 1-6.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/incident-response-soc-capstone/
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

export const INCIDENT_RESPONSE_SOC_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Incident Response Lifecycle",
    lessons: [
      L(1, "the-nist-incident-response-lifecycle", "The NIST Incident Response Lifecycle", { contentDir: "ch01/01-the-nist-incident-response-lifecycle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/the-nist-incident-response-lifecycle.mp4", durationLabel: "2 min 42 s" }),
      L(2, "preparation-the-phase-that-happens-before-anything-goes-wrong", "Preparation: The Phase That Happens Before Anything Goes Wrong", { contentDir: "ch01/02-preparation-the-phase-that-happens-before-anything-goes-wrong", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/preparation-the-phase-that-happens-before-anything-goes-wrong.mp4", durationLabel: "2 min 14 s" }),
      L(3, "detection-and-analysis-confirming-a-real-incident", "Detection and Analysis: Confirming a Real Incident", { contentDir: "ch01/03-detection-and-analysis-confirming-a-real-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/detection-and-analysis-confirming-a-real-incident.mp4", durationLabel: "2 min 10 s" }),
      L(4, "containment-eradication-and-recovery-overview", "Containment, Eradication, and Recovery: Overview", { contentDir: "ch01/04-containment-eradication-and-recovery-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/containment-eradication-and-recovery-overview.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 2,
    title: "Preparation: Building an IR Plan",
    lessons: [
      L(5, "what-a-real-incident-response-plan-contains", "What a Real Incident Response Plan Contains", { contentDir: "ch02/05-what-a-real-incident-response-plan-contains", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/what-a-real-incident-response-plan-contains.mp4", durationLabel: "2 min 41 s" }),
      L(6, "incident-response-playbooks-for-common-scenarios", "Incident Response Playbooks for Common Scenarios", { contentDir: "ch02/06-incident-response-playbooks-for-common-scenarios", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/incident-response-playbooks-for-common-scenarios.mp4", durationLabel: "2 min 38 s" }),
      L(7, "ir-team-roles-and-raci", "IR Team Roles and RACI", { contentDir: "ch02/07-ir-team-roles-and-raci", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/ir-team-roles-and-raci.mp4", durationLabel: "2 min 26 s" }),
      L(8, "tabletop-exercises-testing-the-plan-before-you-need-it", "Tabletop Exercises: Testing the Plan Before You Need It", { contentDir: "ch02/08-tabletop-exercises-testing-the-plan-before-you-need-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/tabletop-exercises-testing-the-plan-before-you-need-it.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 3,
    title: "Detection & Analysis Deep Dive",
    lessons: [
      L(9, "triage-at-incident-scale-not-just-single-alerts", "Triage at Incident Scale, Not Just Single Alerts", { contentDir: "ch03/09-triage-at-incident-scale-not-just-single-alerts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/triage-at-incident-scale-not-just-single-alerts.mp4", durationLabel: "2 min 16 s" }),
      L(10, "timeline-reconstruction-from-multiple-log-sources", "Timeline Reconstruction from Multiple Log Sources", { contentDir: "ch03/10-timeline-reconstruction-from-multiple-log-sources", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/timeline-reconstruction-from-multiple-log-sources.mp4", durationLabel: "2 min 14 s" }),
      L(11, "scoping-an-incident-what-else-is-affected", "Scoping an Incident: What Else Is Affected", { contentDir: "ch03/11-scoping-an-incident-what-else-is-affected", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/scoping-an-incident-what-else-is-affected.mp4", durationLabel: "2 min 12 s" }),
      L(12, "incident-severity-classification-in-practice", "Incident Severity Classification in Practice", { contentDir: "ch03/12-incident-severity-classification-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/incident-severity-classification-in-practice.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Containment Strategies",
    lessons: [
      L(13, "short-term-vs-long-term-containment", "Short-Term vs. Long-Term Containment", { contentDir: "ch04/13-short-term-vs-long-term-containment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/short-term-vs-long-term-containment.mp4", durationLabel: "2 min 18 s" }),
      L(14, "isolation-decisions-and-their-real-tradeoffs", "Isolation Decisions and Their Real Tradeoffs", { contentDir: "ch04/14-isolation-decisions-and-their-real-tradeoffs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/isolation-decisions-and-their-real-tradeoffs.mp4", durationLabel: "2 min 14 s" }),
      L(15, "containing-a-compromised-account-vs-a-compromised-host", "Containing a Compromised Account vs. a Compromised Host", { contentDir: "ch04/15-containing-a-compromised-account-vs-a-compromised-host", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/containing-a-compromised-account-vs-a-compromised-host.mp4", durationLabel: "2 min 12 s" }),
      L(16, "preserving-evidence-while-you-contain", "Preserving Evidence While You Contain", { contentDir: "ch04/16-preserving-evidence-while-you-contain", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/preserving-evidence-while-you-contain.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 5,
    title: "Eradication & Recovery",
    lessons: [
      L(17, "eradication-removing-the-actual-root-cause", "Eradication: Removing the Actual Root Cause", { contentDir: "ch05/17-eradication-removing-the-actual-root-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/eradication-removing-the-actual-root-cause.mp4", durationLabel: "2 min 40 s" }),
      L(18, "restoring-from-clean-backups-the-right-way", "Restoring from Clean Backups the Right Way", { contentDir: "ch05/18-restoring-from-clean-backups-the-right-way", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/restoring-from-clean-backups-the-right-way.mp4", durationLabel: "2 min 16 s" }),
      L(19, "validation-before-returning-to-production", "Validation Before Returning to Production", { contentDir: "ch05/19-validation-before-returning-to-production", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/validation-before-returning-to-production.mp4", durationLabel: "2 min 14 s" }),
      L(20, "phased-recovery-and-monitoring-for-reinfection", "Phased Recovery and Monitoring for Reinfection", { contentDir: "ch05/20-phased-recovery-and-monitoring-for-reinfection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/phased-recovery-and-monitoring-for-reinfection.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 6,
    title: "Post-Incident Activity",
    lessons: [
      L(21, "the-lessons-learned-meeting", "The Lessons Learned Meeting", { contentDir: "ch06/21-the-lessons-learned-meeting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/the-lessons-learned-meeting.mp4", durationLabel: "2 min 19 s" }),
      L(22, "writing-a-real-after-action-report", "Writing a Real After-Action Report", { contentDir: "ch06/22-writing-a-real-after-action-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/writing-a-real-after-action-report.mp4", durationLabel: "2 min 34 s" }),
      L(23, "feeding-new-detections-back-into-sentinel", "Feeding New Detections Back into Sentinel", { contentDir: "ch06/23-feeding-new-detections-back-into-sentinel", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/feeding-new-detections-back-into-sentinel.mp4", durationLabel: "2 min 22 s" }),
      L(24, "measuring-whether-the-response-actually-improved", "Measuring Whether the Response Actually Improved", { contentDir: "ch06/24-measuring-whether-the-response-actually-improved", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/measuring-whether-the-response-actually-improved.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 7,
    title: "Threat Hunting Methodology",
    lessons: [
      L(25, "hypothesis-driven-threat-hunting", "Hypothesis-Driven Threat Hunting", { contentDir: "ch07/25-hypothesis-driven-threat-hunting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/hypothesis-driven-threat-hunting.mp4", durationLabel: "2 min 15 s" }),
      L(26, "the-threat-hunting-loop-in-practice", "The Threat Hunting Loop in Practice", { contentDir: "ch07/26-the-threat-hunting-loop-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/the-threat-hunting-loop-in-practice.mp4", durationLabel: "2 min 11 s" }),
      L(27, "hunting-with-mitre-attck-as-a-map", "Hunting with MITRE ATT&CK as a Map", { contentDir: "ch07/27-hunting-with-mitre-attck-as-a-map", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/hunting-with-mitre-attck-as-a-map.mp4", durationLabel: "2 min 15 s" }),
      L(28, "turning-a-successful-hunt-into-a-permanent-detection", "Turning a Successful Hunt into a Permanent Detection", { contentDir: "ch07/28-turning-a-successful-hunt-into-a-permanent-detection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/turning-a-successful-hunt-into-a-permanent-detection.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 8,
    title: "Job-Ready Capstone: Full Incident Response Exercise",
    lessons: [
      L(29, "capstone-part-1-detection-through-containment", "Capstone Part 1: Detection Through Containment", { contentDir: "ch08/29-capstone-part-1-detection-through-containment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/capstone-part-1-detection-through-containment.mp4", durationLabel: "2 min 32 s" }),
      L(30, "capstone-part-2-eradication-recovery-and-the-report", "Capstone Part 2: Eradication, Recovery, and the Report", { contentDir: "ch08/30-capstone-part-2-eradication-recovery-and-the-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/capstone-part-2-eradication-recovery-and-the-report.mp4", durationLabel: "2 min 29 s" }),
      L(31, "capstone-part-3-the-hunt-that-finds-what-sentinel-missed", "Capstone Part 3: The Hunt That Finds What Sentinel Missed", { contentDir: "ch08/31-capstone-part-3-the-hunt-that-finds-what-sentinel-missed", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/capstone-part-3-the-hunt-that-finds-what-sentinel-missed.mp4", durationLabel: "2 min 22 s" }),
      L(32, "job-ready-foundation-review-and-whats-next", "Job-Ready Foundation Review and What's Next", { contentDir: "ch08/32-job-ready-foundation-review-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-incident-response-soc-capstone/job-ready-foundation-review-and-whats-next.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
];
