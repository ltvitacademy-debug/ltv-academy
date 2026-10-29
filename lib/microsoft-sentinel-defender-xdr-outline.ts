// Microsoft Sentinel, Defender XDR & KQL course outline. Lessons without a contentDir render as
// "in production". Course 6 of the Cybersecurity Analyst → Security Engineer path's Job-Ready
// Foundation stage — the vendor-specific deep dive this path has been building toward: real
// Microsoft Sentinel architecture, Defender XDR, and KQL, applied to the vendor-neutral SIEM/SOC
// concepts already taught in course 5.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-sentinel-defender-xdr/
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

export const MICROSOFT_SENTINEL_DEFENDER_XDR_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Microsoft Sentinel Architecture",
    lessons: [
      L(1, "what-microsoft-sentinel-actually-is", "What Microsoft Sentinel Actually Is", { contentDir: "ch01/01-what-microsoft-sentinel-actually-is", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/what-microsoft-sentinel-actually-is.mp4", durationLabel: "2 min 29 s" }),
      L(2, "the-log-analytics-workspace-as-sentinels-foundation", "The Log Analytics Workspace as Sentinel's Foundation", { contentDir: "ch01/02-the-log-analytics-workspace-as-sentinels-foundation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/the-log-analytics-workspace-as-sentinels-foundation.mp4", durationLabel: "2 min 29 s" }),
      L(3, "data-connectors-bringing-logs-into-sentinel", "Data Connectors: Bringing Logs into Sentinel", { contentDir: "ch01/03-data-connectors-bringing-logs-into-sentinel", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/data-connectors-bringing-logs-into-sentinel.mp4", durationLabel: "2 min 35 s" }),
      L(4, "sentinel-pricing-and-data-retention-concepts", "Sentinel Pricing and Data Retention Concepts", { contentDir: "ch01/04-sentinel-pricing-and-data-retention-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/sentinel-pricing-and-data-retention-concepts.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 2,
    title: "KQL Fundamentals",
    lessons: [
      L(5, "what-kql-is-and-how-it-differs-from-sql", "What KQL Is and How It Differs from SQL", { contentDir: "ch02/05-what-kql-is-and-how-it-differs-from-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/what-kql-is-and-how-it-differs-from-sql.mp4", durationLabel: "2 min 16 s" }),
      L(6, "basic-kql-queries-filtering-and-projecting", "Basic KQL Queries: Filtering and Projecting", { contentDir: "ch02/06-basic-kql-queries-filtering-and-projecting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/basic-kql-queries-filtering-and-projecting.mp4", durationLabel: "2 min 7 s" }),
      L(7, "summarizing-and-aggregating-with-kql", "Summarizing and Aggregating with KQL", { contentDir: "ch02/07-summarizing-and-aggregating-with-kql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/summarizing-and-aggregating-with-kql.mp4", durationLabel: "2 min 16 s" }),
      L(8, "joining-tables-and-time-windows-in-kql", "Joining Tables and Time Windows in KQL", { contentDir: "ch02/08-joining-tables-and-time-windows-in-kql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/joining-tables-and-time-windows-in-kql.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Analytics Rules & Detection Engineering",
    lessons: [
      L(9, "scheduled-analytics-rules-in-sentinel", "Scheduled Analytics Rules in Sentinel", { contentDir: "ch03/09-scheduled-analytics-rules-in-sentinel", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/scheduled-analytics-rules-in-sentinel.mp4", durationLabel: "2 min 18 s" }),
      L(10, "built-in-vs-custom-analytics-rules", "Built-In vs. Custom Analytics Rules", { contentDir: "ch03/10-built-in-vs-custom-analytics-rules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/built-in-vs-custom-analytics-rules.mp4", durationLabel: "2 min 11 s" }),
      L(11, "entity-mapping-and-incident-correlation", "Entity Mapping and Incident Correlation", { contentDir: "ch03/11-entity-mapping-and-incident-correlation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/entity-mapping-and-incident-correlation.mp4", durationLabel: "2 min 14 s" }),
      L(12, "writing-a-real-kql-based-detection-rule", "Writing a Real KQL-Based Detection Rule", { contentDir: "ch03/12-writing-a-real-kql-based-detection-rule", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/writing-a-real-kql-based-detection-rule.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 4,
    title: "Workbooks & Visualization",
    lessons: [
      L(13, "what-a-sentinel-workbook-actually-does", "What a Sentinel Workbook Actually Does", { contentDir: "ch04/13-what-a-sentinel-workbook-actually-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/what-a-sentinel-workbook-actually-does.mp4", durationLabel: "2 min 5 s" }),
      L(14, "built-in-workbooks-vs-custom-dashboards", "Built-In Workbooks vs. Custom Dashboards", { contentDir: "ch04/14-built-in-workbooks-vs-custom-dashboards", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/built-in-workbooks-vs-custom-dashboards.mp4", durationLabel: "2 min 15 s" }),
      L(15, "visualizing-kql-query-results", "Visualizing KQL Query Results", { contentDir: "ch04/15-visualizing-kql-query-results", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/visualizing-kql-query-results.mp4", durationLabel: "2 min 20 s" }),
      L(16, "building-a-workbook-for-a-specific-use-case", "Building a Workbook for a Specific Use Case", { contentDir: "ch04/16-building-a-workbook-for-a-specific-use-case", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/building-a-workbook-for-a-specific-use-case.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 5,
    title: "Microsoft Defender XDR",
    lessons: [
      L(17, "what-defender-xdr-actually-unifies", "What Defender XDR Actually Unifies", { contentDir: "ch05/17-what-defender-xdr-actually-unifies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/what-defender-xdr-actually-unifies.mp4", durationLabel: "2 min 33 s" }),
      L(18, "defender-for-endpoint-concepts-revisited-in-xdr-context", "Defender for Endpoint Concepts, Revisited in XDR Context", { contentDir: "ch05/18-defender-for-endpoint-concepts-revisited-in-xdr-context", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/defender-for-endpoint-concepts-revisited-in-xdr-context.mp4", durationLabel: "2 min 26 s" }),
      L(19, "defender-for-office-365-and-email-threat-protection", "Defender for Office 365 and Email Threat Protection", { contentDir: "ch05/19-defender-for-office-365-and-email-threat-protection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/defender-for-office-365-and-email-threat-protection.mp4", durationLabel: "2 min 19 s" }),
      L(20, "defender-for-identity-and-detecting-on-prem-ad-attacks", "Defender for Identity and Detecting On-Prem AD Attacks", { contentDir: "ch05/20-defender-for-identity-and-detecting-on-prem-ad-attacks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/defender-for-identity-and-detecting-on-prem-ad-attacks.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 6,
    title: "Incident Investigation in Sentinel",
    lessons: [
      L(21, "the-sentinel-incident-queue-and-severity-triage", "The Sentinel Incident Queue and Severity Triage", { contentDir: "ch06/21-the-sentinel-incident-queue-and-severity-triage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/the-sentinel-incident-queue-and-severity-triage.mp4", durationLabel: "2 min 18 s" }),
      L(22, "the-investigation-graph-and-entity-timelines", "The Investigation Graph and Entity Timelines", { contentDir: "ch06/22-the-investigation-graph-and-entity-timelines", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/the-investigation-graph-and-entity-timelines.mp4", durationLabel: "2 min 7 s" }),
      L(23, "hunting-queries-and-proactive-threat-hunting", "Hunting Queries and Proactive Threat Hunting", { contentDir: "ch06/23-hunting-queries-and-proactive-threat-hunting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/hunting-queries-and-proactive-threat-hunting.mp4", durationLabel: "2 min 17 s" }),
      L(24, "bookmarks-and-building-a-case-during-an-investigation", "Bookmarks and Building a Case During an Investigation", { contentDir: "ch06/24-bookmarks-and-building-a-case-during-an-investigation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/bookmarks-and-building-a-case-during-an-investigation.mp4", durationLabel: "2 min 11 s" }),
    ],
  },
  {
    n: 7,
    title: "Automation with Playbooks",
    lessons: [
      L(25, "sentinel-playbooks-and-azure-logic-apps", "Sentinel Playbooks and Azure Logic Apps", { contentDir: "ch07/25-sentinel-playbooks-and-azure-logic-apps", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/sentinel-playbooks-and-azure-logic-apps.mp4", durationLabel: "2 min 16 s" }),
      L(26, "triggering-a-playbook-from-an-incident", "Triggering a Playbook from an Incident", { contentDir: "ch07/26-triggering-a-playbook-from-an-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/triggering-a-playbook-from-an-incident.mp4", durationLabel: "2 min 8 s" }),
      L(27, "a-real-automation-rule-plus-playbook-example", "A Real Automation Rule Plus Playbook Example", { contentDir: "ch07/27-a-real-automation-rule-plus-playbook-example", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/a-real-automation-rule-plus-playbook-example.mp4", durationLabel: "2 min 12 s" }),
      L(28, "when-to-automate-vs-when-to-keep-a-human-in-the-loop", "When to Automate vs. When to Keep a Human in the Loop", { contentDir: "ch07/28-when-to-automate-vs-when-to-keep-a-human-in-the-loop", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/when-to-automate-vs-when-to-keep-a-human-in-the-loop.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: End-to-End Detection and Response in Sentinel",
    lessons: [
      L(29, "lab-writing-a-custom-analytics-rule-with-kql", "Lab: Writing a Custom Analytics Rule with KQL", { contentDir: "ch08/29-lab-writing-a-custom-analytics-rule-with-kql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/lab-writing-a-custom-analytics-rule-with-kql.mp4", durationLabel: "2 min 12 s" }),
      L(30, "lab-investigating-an-incident-end-to-end", "Lab: Investigating an Incident End to End", { contentDir: "ch08/30-lab-investigating-an-incident-end-to-end", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/lab-investigating-an-incident-end-to-end.mp4", durationLabel: "2 min 7 s" }),
      L(31, "case-study-from-raw-logs-to-closed-incident", "Case Study: From Raw Logs to Closed Incident", { contentDir: "ch08/31-case-study-from-raw-logs-to-closed-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/case-study-from-raw-logs-to-closed-incident.mp4", durationLabel: "2 min 26 s" }),
      L(32, "chapter-capstone-sentinel-defender-xdr-and-kql-review", "Chapter Capstone: Sentinel, Defender XDR & KQL Review", { contentDir: "ch08/32-chapter-capstone-sentinel-defender-xdr-and-kql-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-sentinel-defender-xdr/chapter-capstone-sentinel-defender-xdr-and-kql-review.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
];
