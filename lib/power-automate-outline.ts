// Microsoft Power Automate — business process & enterprise automation.
// Lessons without a contentDir render as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/power-automate/
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

export const POWER_AUTOMATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Business Process Automation",
    lessons: [
      L(1, "what-is-power-automate", "What Is Power Automate? Platform Overview", { contentDir: "ch01/01-what-is-power-automate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122089/ltv-power-automate/what-is-power-automate.mp4", durationLabel: "2 min 2 s" }),
      L(2, "flows-triggers-and-actions", "Flows, Triggers and Actions", { contentDir: "ch01/02-flows-triggers-and-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122155/ltv-power-automate/flows-triggers-and-actions.mp4", durationLabel: "2 min 21 s" }),
      L(3, "building-your-first-flow", "Building Your First Flow: An Approval on a New SharePoint Item", { contentDir: "ch01/03-building-your-first-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122232/ltv-power-automate/building-your-first-flow.mp4", durationLabel: "2 min 16 s" }),
      L(4, "conditions-if-else-logic", "Conditions: If/Else Logic in Flows", { contentDir: "ch01/04-conditions-if-else-logic", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122292/ltv-power-automate/conditions-if-else-logic.mp4", durationLabel: "1 min 59 s" }),
      L(5, "loops-apply-to-each-and-do-until", "Loops: Apply to Each and Do Until", { contentDir: "ch01/05-loops-apply-to-each-and-do-until", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122355/ltv-power-automate/loops-apply-to-each-and-do-until.mp4", durationLabel: "2 min 10 s" }),
      L(6, "variables-and-initializing-data", "Variables and Initializing Data", { contentDir: "ch01/06-variables-and-initializing-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122429/ltv-power-automate/variables-and-initializing-data.mp4", durationLabel: "2 min 32 s" }),
      L(7, "expressions-in-power-automate", "Expressions in Power Automate", { contentDir: "ch01/07-expressions-in-power-automate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122489/ltv-power-automate/expressions-in-power-automate.mp4", durationLabel: "2 min 6 s" }),
      L(8, "automating-outlook", "Automating Outlook: Email Triggers and Actions", { contentDir: "ch01/08-automating-outlook", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122554/ltv-power-automate/automating-outlook.mp4", durationLabel: "2 min 19 s" }),
      L(9, "automating-microsoft-teams", "Automating Microsoft Teams: Notifications and Approvals", { contentDir: "ch01/09-automating-microsoft-teams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122618/ltv-power-automate/automating-microsoft-teams.mp4", durationLabel: "2 min 16 s" }),
      L(10, "automating-excel", "Automating Excel: Tables and Rows", { contentDir: "ch01/10-automating-excel", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122674/ltv-power-automate/automating-excel.mp4", durationLabel: "1 min 57 s" }),
      L(11, "automating-sharepoint", "Automating SharePoint: Lists, Libraries and Document Automation", { contentDir: "ch01/11-automating-sharepoint", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122744/ltv-power-automate/automating-sharepoint.mp4", durationLabel: "2 min 26 s" }),
      L(12, "connecting-power-bi", "Connecting Power BI: Data Alerts and Refresh Notifications", { contentDir: "ch01/12-connecting-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122809/ltv-power-automate/connecting-power-bi.mp4", durationLabel: "2 min 12 s" }),
      L(13, "approval-workflows", "Approval Workflows: Start and Wait for an Approval", { contentDir: "ch01/13-approval-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122870/ltv-power-automate/approval-workflows.mp4", durationLabel: "2 min 2 s" }),
      L(14, "error-handling-in-flows", "Error Handling: Configure Run After and Try/Catch Patterns", { contentDir: "ch01/14-error-handling-in-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122931/ltv-power-automate/error-handling-in-flows.mp4", durationLabel: "2 min 5 s" }),
      L(15, "scheduled-and-recurring-flows", "Scheduled and Recurring Flows", { contentDir: "ch01/15-scheduled-and-recurring-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792122992/ltv-power-automate/scheduled-and-recurring-flows.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 2,
    title: "Enterprise Automation",
    lessons: [
      L(16, "introduction-to-dataverse", "Introduction to Dataverse", { contentDir: "ch02/16-introduction-to-dataverse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123066/ltv-power-automate/introduction-to-dataverse.mp4", durationLabel: "2 min 33 s" }),
      L(17, "automating-with-dataverse", "Automating with Dataverse Triggers and Actions", { contentDir: "ch02/17-automating-with-dataverse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123130/ltv-power-automate/automating-with-dataverse.mp4", durationLabel: "2 min 13 s" }),
      L(18, "connecting-to-sql-server", "Connecting to SQL Server from Power Automate", { contentDir: "ch02/18-connecting-to-sql-server", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123191/ltv-power-automate/connecting-to-sql-server.mp4", durationLabel: "2 min 4 s" }),
      L(19, "http-actions-and-rest-apis", "HTTP Actions and Calling REST APIs", { contentDir: "ch02/19-http-actions-and-rest-apis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123252/ltv-power-automate/http-actions-and-rest-apis.mp4", durationLabel: "2 min 1 s" }),
      L(20, "working-with-json", "Working with JSON: Parse JSON and Compose", { contentDir: "ch02/20-working-with-json", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123317/ltv-power-automate/working-with-json.mp4", durationLabel: "2 min 14 s" }),
      L(21, "authentication-and-connections", "Authentication: Connections, Service Principals and OAuth", { contentDir: "ch02/21-authentication-and-connections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123377/ltv-power-automate/authentication-and-connections.mp4", durationLabel: "1 min 59 s" }),
      L(22, "building-custom-connectors", "Building and Using Custom Connectors", { contentDir: "ch02/22-building-custom-connectors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123445/ltv-power-automate/building-custom-connectors.mp4", durationLabel: "2 min 14 s" }),
      L(23, "child-flows-and-modular-design", "Child Flows and Modular Flow Design", { contentDir: "ch02/23-child-flows-and-modular-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123508/ltv-power-automate/child-flows-and-modular-design.mp4", durationLabel: "2 min 4 s" }),
      L(24, "solutions-and-packaging-flows", "Solutions: Packaging Flows for ALM", { contentDir: "ch02/24-solutions-and-packaging-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123578/ltv-power-automate/solutions-and-packaging-flows.mp4", durationLabel: "2 min 27 s" }),
      L(25, "environment-variables-and-connection-references", "Environment Variables and Connection References", { contentDir: "ch02/25-environment-variables-and-connection-references", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123657/ltv-power-automate/environment-variables-and-connection-references.mp4", durationLabel: "2 min 38 s" }),
      L(26, "environments-and-environment-strategy", "Environments and Environment Strategy", { contentDir: "ch02/26-environments-and-environment-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123725/ltv-power-automate/environments-and-environment-strategy.mp4", durationLabel: "2 min 25 s" }),
      L(27, "data-loss-prevention-policies", "Security: Data Loss Prevention (DLP) Policies", { contentDir: "ch02/27-data-loss-prevention-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123791/ltv-power-automate/data-loss-prevention-policies.mp4", durationLabel: "2 min 14 s" }),
      L(28, "governance-and-the-admin-center", "Governance: Admin Center and Monitoring", { contentDir: "ch02/28-governance-and-the-admin-center", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123859/ltv-power-automate/governance-and-the-admin-center.mp4", durationLabel: "2 min 15 s" }),
      L(29, "application-lifecycle-management", "Application Lifecycle Management: Dev/Test/Prod", { contentDir: "ch02/29-application-lifecycle-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123940/ltv-power-automate/application-lifecycle-management.mp4", durationLabel: "2 min 56 s" }),
      L(30, "troubleshooting-flows", "Troubleshooting Flows: Run History and Error Diagnosis", { contentDir: "ch02/30-troubleshooting-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792123999/ltv-power-automate/troubleshooting-flows.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
];
