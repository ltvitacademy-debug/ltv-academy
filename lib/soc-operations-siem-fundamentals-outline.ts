// SOC Operations, SIEM & Log Analysis course outline. Lessons without a contentDir render as
// "in production". Course 5 of the Cybersecurity Analyst → Security Engineer path's Job-Ready
// Foundation stage — how a security operations center actually runs: vendor-neutral SIEM
// mechanics, log sources, correlation, triage, and SOAR basics, setting up course 6's
// Microsoft-Sentinel-specific deep dive.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/soc-operations-siem-fundamentals/
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

export const SOC_OPERATIONS_SIEM_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What a SOC Actually Does",
    lessons: [
      L(1, "the-soc-mission-and-why-it-exists", "The SOC Mission and Why It Exists", { contentDir: "ch01/01-the-soc-mission-and-why-it-exists", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/the-soc-mission-and-why-it-exists.mp4", durationLabel: "2 min 16 s" }),
      L(2, "tier-1-tier-2-and-tier-3-analyst-roles", "Tier 1, Tier 2, and Tier 3 Analyst Roles", { contentDir: "ch01/02-tier-1-tier-2-and-tier-3-analyst-roles", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/tier-1-tier-2-and-tier-3-analyst-roles.mp4", durationLabel: "2 min 13 s" }),
      L(3, "shift-models-and-24x7-coverage", "Shift Models and 24x7 Coverage", { contentDir: "ch01/03-shift-models-and-24x7-coverage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/shift-models-and-24x7-coverage.mp4", durationLabel: "2 min 12 s" }),
      L(4, "soc-maturity-models-reactive-to-proactive", "SOC Maturity Models: Reactive to Proactive", { contentDir: "ch01/04-soc-maturity-models-reactive-to-proactive", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/soc-maturity-models-reactive-to-proactive.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 2,
    title: "SIEM Fundamentals",
    lessons: [
      L(5, "what-a-siem-actually-does", "What a SIEM Actually Does", { contentDir: "ch02/05-what-a-siem-actually-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/what-a-siem-actually-does.mp4", durationLabel: "2 min 22 s" }),
      L(6, "log-aggregation-normalization-and-correlation", "Log Aggregation, Normalization, and Correlation", { contentDir: "ch02/06-log-aggregation-normalization-and-correlation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/log-aggregation-normalization-and-correlation.mp4", durationLabel: "2 min 17 s" }),
      L(7, "siem-vs-log-management-the-real-difference", "SIEM vs. Log Management: The Real Difference", { contentDir: "ch02/07-siem-vs-log-management-the-real-difference", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/siem-vs-log-management-the-real-difference.mp4", durationLabel: "2 min 17 s" }),
      L(8, "major-siem-platforms-a-practical-overview", "Major SIEM Platforms: A Practical Overview", { contentDir: "ch02/08-major-siem-platforms-a-practical-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/major-siem-platforms-a-practical-overview.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 3,
    title: "Log Sources & Collection",
    lessons: [
      L(9, "syslog-and-the-standard-log-formats", "Syslog and the Standard Log Formats", { contentDir: "ch03/09-syslog-and-the-standard-log-formats", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/syslog-and-the-standard-log-formats.mp4", durationLabel: "2 min 48 s" }),
      L(10, "windows-event-forwarding-into-a-siem", "Windows Event Forwarding into a SIEM", { contentDir: "ch03/10-windows-event-forwarding-into-a-siem", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/windows-event-forwarding-into-a-siem.mp4", durationLabel: "2 min 37 s" }),
      L(11, "siem-agents-vs-agentless-collection", "SIEM Agents vs. Agentless Collection", { contentDir: "ch03/11-siem-agents-vs-agentless-collection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/siem-agents-vs-agentless-collection.mp4", durationLabel: "2 min 24 s" }),
      L(12, "log-parsing-and-field-extraction", "Log Parsing and Field Extraction", { contentDir: "ch03/12-log-parsing-and-field-extraction", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/log-parsing-and-field-extraction.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 4,
    title: "Correlation Rules & Alert Logic",
    lessons: [
      L(13, "what-a-correlation-rule-actually-is", "What a Correlation Rule Actually Is", { contentDir: "ch04/13-what-a-correlation-rule-actually-is", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/what-a-correlation-rule-actually-is.mp4", durationLabel: "2 min 10 s" }),
      L(14, "writing-a-real-world-correlation-rule", "Writing a Real-World Correlation Rule", { contentDir: "ch04/14-writing-a-real-world-correlation-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/writing-a-real-world-correlation-rule.mp4", durationLabel: "2 min 22 s" }),
      L(15, "rule-tuning-and-reducing-false-positives", "Rule Tuning and Reducing False Positives", { contentDir: "ch04/15-rule-tuning-and-reducing-false-positives", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/rule-tuning-and-reducing-false-positives.mp4", durationLabel: "2 min 31 s" }),
      L(16, "use-case-development-building-detections-that-matter", "Use-Case Development: Building Detections That Matter", { contentDir: "ch04/16-use-case-development-building-detections-that-matter", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/use-case-development-building-detections-that-matter.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 5,
    title: "Alert Triage & Investigation Workflow",
    lessons: [
      L(17, "the-real-alert-triage-process", "The Real Alert Triage Process", { contentDir: "ch05/17-the-real-alert-triage-process", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/the-real-alert-triage-process.mp4", durationLabel: "2 min 9 s" }),
      L(18, "validating-scoping-and-escalating-an-alert", "Validating, Scoping, and Escalating an Alert", { contentDir: "ch05/18-validating-scoping-and-escalating-an-alert", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/validating-scoping-and-escalating-an-alert.mp4", durationLabel: "2 min 7 s" }),
      L(19, "writing-a-clear-investigation-case-note", "Writing a Clear Investigation Case Note", { contentDir: "ch05/19-writing-a-clear-investigation-case-note", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/writing-a-clear-investigation-case-note.mp4", durationLabel: "1 min 54 s" }),
      L(20, "when-and-how-to-escalate-to-tier-2", "When and How to Escalate to Tier 2", { contentDir: "ch05/20-when-and-how-to-escalate-to-tier-2", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/when-and-how-to-escalate-to-tier-2.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 6,
    title: "Dashboards & Reporting",
    lessons: [
      L(21, "building-a-soc-dashboard-that-analysts-actually-use", "Building a SOC Dashboard That Analysts Actually Use", { contentDir: "ch06/21-building-a-soc-dashboard-that-analysts-actually-use", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/building-a-soc-dashboard-that-analysts-actually-use.mp4", durationLabel: "2 min 10 s" }),
      L(22, "key-soc-metrics-mttd-and-mttr", "Key SOC Metrics: MTTD and MTTR", { contentDir: "ch06/22-key-soc-metrics-mttd-and-mttr", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/key-soc-metrics-mttd-and-mttr.mp4", durationLabel: "2 min 8 s" }),
      L(23, "alert-volume-and-analyst-workload-metrics", "Alert Volume and Analyst Workload Metrics", { contentDir: "ch06/23-alert-volume-and-analyst-workload-metrics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/alert-volume-and-analyst-workload-metrics.mp4", durationLabel: "2 min 6 s" }),
      L(24, "reporting-up-communicating-with-leadership", "Reporting Up: Communicating with Leadership", { contentDir: "ch06/24-reporting-up-communicating-with-leadership", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/reporting-up-communicating-with-leadership.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
  {
    n: 7,
    title: "SOAR & Automation Basics",
    lessons: [
      L(25, "what-soar-actually-is-and-why-it-matters", "What SOAR Actually Is and Why It Matters", { contentDir: "ch07/25-what-soar-actually-is-and-why-it-matters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/what-soar-actually-is-and-why-it-matters.mp4", durationLabel: "2 min 7 s" }),
      L(26, "playbooks-automating-the-repeatable-steps", "Playbooks: Automating the Repeatable Steps", { contentDir: "ch07/26-playbooks-automating-the-repeatable-steps", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/playbooks-automating-the-repeatable-steps.mp4", durationLabel: "2 min 8 s" }),
      L(27, "soar-and-the-analyst-relationship-not-a-replacement", "SOAR and the Analyst Relationship: Not a Replacement", { contentDir: "ch07/27-soar-and-the-analyst-relationship-not-a-replacement", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/soar-and-the-analyst-relationship-not-a-replacement.mp4", durationLabel: "2 min 10 s" }),
      L(28, "a-worked-soar-playbook-example", "A Worked SOAR Playbook Example", { contentDir: "ch07/28-a-worked-soar-playbook-example", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/a-worked-soar-playbook-example.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: A Day in the SOC",
    lessons: [
      L(29, "lab-triaging-a-queue-of-real-looking-alerts", "Lab: Triaging a Queue of Real-Looking Alerts", { contentDir: "ch08/29-lab-triaging-a-queue-of-real-looking-alerts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/lab-triaging-a-queue-of-real-looking-alerts.mp4", durationLabel: "2 min 40 s" }),
      L(30, "lab-writing-a-correlation-rule-for-a-known-pattern", "Lab: Writing a Correlation Rule for a Known Pattern", { contentDir: "ch08/30-lab-writing-a-correlation-rule-for-a-known-pattern", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/lab-writing-a-correlation-rule-for-a-known-pattern.mp4", durationLabel: "2 min 15 s" }),
      L(31, "case-study-a-full-shift-from-alert-to-resolution", "Case Study: A Full Shift, From Alert to Resolution", { contentDir: "ch08/31-case-study-a-full-shift-from-alert-to-resolution", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/case-study-a-full-shift-from-alert-to-resolution.mp4", durationLabel: "2 min 28 s" }),
      L(32, "chapter-capstone-soc-operations-and-siem-review", "Chapter Capstone: SOC Operations & SIEM Review", { contentDir: "ch08/32-chapter-capstone-soc-operations-and-siem-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-soc-operations-siem-fundamentals/chapter-capstone-soc-operations-and-siem-review.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
];
