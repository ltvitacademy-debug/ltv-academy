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
      L(1, "the-nist-incident-response-lifecycle", "The NIST Incident Response Lifecycle", { contentDir: "ch01/01-the-nist-incident-response-lifecycle" }),
      L(2, "preparation-the-phase-that-happens-before-anything-goes-wrong", "Preparation: The Phase That Happens Before Anything Goes Wrong", { contentDir: "ch01/02-preparation-the-phase-that-happens-before-anything-goes-wrong" }),
      L(3, "detection-and-analysis-confirming-a-real-incident", "Detection and Analysis: Confirming a Real Incident", { contentDir: "ch01/03-detection-and-analysis-confirming-a-real-incident" }),
      L(4, "containment-eradication-and-recovery-overview", "Containment, Eradication, and Recovery: Overview", { contentDir: "ch01/04-containment-eradication-and-recovery-overview" }),
    ],
  },
  {
    n: 2,
    title: "Preparation: Building an IR Plan",
    lessons: [
      L(5, "what-a-real-incident-response-plan-contains", "What a Real Incident Response Plan Contains", { contentDir: "ch02/05-what-a-real-incident-response-plan-contains" }),
      L(6, "incident-response-playbooks-for-common-scenarios", "Incident Response Playbooks for Common Scenarios", { contentDir: "ch02/06-incident-response-playbooks-for-common-scenarios" }),
      L(7, "ir-team-roles-and-raci", "IR Team Roles and RACI", { contentDir: "ch02/07-ir-team-roles-and-raci" }),
      L(8, "tabletop-exercises-testing-the-plan-before-you-need-it", "Tabletop Exercises: Testing the Plan Before You Need It", { contentDir: "ch02/08-tabletop-exercises-testing-the-plan-before-you-need-it" }),
    ],
  },
  {
    n: 3,
    title: "Detection & Analysis Deep Dive",
    lessons: [
      L(9, "triage-at-incident-scale-not-just-single-alerts", "Triage at Incident Scale, Not Just Single Alerts", { contentDir: "ch03/09-triage-at-incident-scale-not-just-single-alerts" }),
      L(10, "timeline-reconstruction-from-multiple-log-sources", "Timeline Reconstruction from Multiple Log Sources", { contentDir: "ch03/10-timeline-reconstruction-from-multiple-log-sources" }),
      L(11, "scoping-an-incident-what-else-is-affected", "Scoping an Incident: What Else Is Affected", { contentDir: "ch03/11-scoping-an-incident-what-else-is-affected" }),
      L(12, "incident-severity-classification-in-practice", "Incident Severity Classification in Practice", { contentDir: "ch03/12-incident-severity-classification-in-practice" }),
    ],
  },
  {
    n: 4,
    title: "Containment Strategies",
    lessons: [
      L(13, "short-term-vs-long-term-containment", "Short-Term vs. Long-Term Containment", { contentDir: "ch04/13-short-term-vs-long-term-containment" }),
      L(14, "isolation-decisions-and-their-real-tradeoffs", "Isolation Decisions and Their Real Tradeoffs", { contentDir: "ch04/14-isolation-decisions-and-their-real-tradeoffs" }),
      L(15, "containing-a-compromised-account-vs-a-compromised-host", "Containing a Compromised Account vs. a Compromised Host", { contentDir: "ch04/15-containing-a-compromised-account-vs-a-compromised-host" }),
      L(16, "preserving-evidence-while-you-contain", "Preserving Evidence While You Contain", { contentDir: "ch04/16-preserving-evidence-while-you-contain" }),
    ],
  },
  {
    n: 5,
    title: "Eradication & Recovery",
    lessons: [
      L(17, "eradication-removing-the-actual-root-cause", "Eradication: Removing the Actual Root Cause", { contentDir: "ch05/17-eradication-removing-the-actual-root-cause" }),
      L(18, "restoring-from-clean-backups-the-right-way", "Restoring from Clean Backups the Right Way", { contentDir: "ch05/18-restoring-from-clean-backups-the-right-way" }),
      L(19, "validation-before-returning-to-production", "Validation Before Returning to Production", { contentDir: "ch05/19-validation-before-returning-to-production" }),
      L(20, "phased-recovery-and-monitoring-for-reinfection", "Phased Recovery and Monitoring for Reinfection", { contentDir: "ch05/20-phased-recovery-and-monitoring-for-reinfection" }),
    ],
  },
  {
    n: 6,
    title: "Post-Incident Activity",
    lessons: [
      L(21, "the-lessons-learned-meeting", "The Lessons Learned Meeting", { contentDir: "ch06/21-the-lessons-learned-meeting" }),
      L(22, "writing-a-real-after-action-report", "Writing a Real After-Action Report", { contentDir: "ch06/22-writing-a-real-after-action-report" }),
      L(23, "feeding-new-detections-back-into-sentinel", "Feeding New Detections Back into Sentinel", { contentDir: "ch06/23-feeding-new-detections-back-into-sentinel" }),
      L(24, "measuring-whether-the-response-actually-improved", "Measuring Whether the Response Actually Improved", { contentDir: "ch06/24-measuring-whether-the-response-actually-improved" }),
    ],
  },
  {
    n: 7,
    title: "Threat Hunting Methodology",
    lessons: [
      L(25, "hypothesis-driven-threat-hunting", "Hypothesis-Driven Threat Hunting", { contentDir: "ch07/25-hypothesis-driven-threat-hunting" }),
      L(26, "the-threat-hunting-loop-in-practice", "The Threat Hunting Loop in Practice", { contentDir: "ch07/26-the-threat-hunting-loop-in-practice" }),
      L(27, "hunting-with-mitre-attck-as-a-map", "Hunting with MITRE ATT&CK as a Map", { contentDir: "ch07/27-hunting-with-mitre-attck-as-a-map" }),
      L(28, "turning-a-successful-hunt-into-a-permanent-detection", "Turning a Successful Hunt into a Permanent Detection", { contentDir: "ch07/28-turning-a-successful-hunt-into-a-permanent-detection" }),
    ],
  },
  {
    n: 8,
    title: "Job-Ready Capstone: Full Incident Response Exercise",
    lessons: [
      L(29, "capstone-part-1-detection-through-containment", "Capstone Part 1: Detection Through Containment", { contentDir: "ch08/29-capstone-part-1-detection-through-containment" }),
      L(30, "capstone-part-2-eradication-recovery-and-the-report", "Capstone Part 2: Eradication, Recovery, and the Report", { contentDir: "ch08/30-capstone-part-2-eradication-recovery-and-the-report" }),
      L(31, "capstone-part-3-the-hunt-that-finds-what-sentinel-missed", "Capstone Part 3: The Hunt That Finds What Sentinel Missed", { contentDir: "ch08/31-capstone-part-3-the-hunt-that-finds-what-sentinel-missed" }),
      L(32, "job-ready-foundation-review-and-whats-next", "Job-Ready Foundation Review and What's Next", { contentDir: "ch08/32-job-ready-foundation-review-and-whats-next" }),
    ],
  },
];
