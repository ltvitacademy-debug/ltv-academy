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
      L(1, "what-is-power-automate", "What Is Power Automate? Platform Overview", { contentDir: "ch01/01-what-is-power-automate" }),
      L(2, "flows-triggers-and-actions", "Flows, Triggers and Actions", { contentDir: "ch01/02-flows-triggers-and-actions" }),
      L(3, "building-your-first-flow", "Building Your First Flow: An Approval on a New SharePoint Item", { contentDir: "ch01/03-building-your-first-flow" }),
      L(4, "conditions-if-else-logic", "Conditions: If/Else Logic in Flows", { contentDir: "ch01/04-conditions-if-else-logic" }),
      L(5, "loops-apply-to-each-and-do-until", "Loops: Apply to Each and Do Until", { contentDir: "ch01/05-loops-apply-to-each-and-do-until" }),
      L(6, "variables-and-initializing-data", "Variables and Initializing Data", { contentDir: "ch01/06-variables-and-initializing-data" }),
      L(7, "expressions-in-power-automate", "Expressions in Power Automate", { contentDir: "ch01/07-expressions-in-power-automate" }),
      L(8, "automating-outlook", "Automating Outlook: Email Triggers and Actions", { contentDir: "ch01/08-automating-outlook" }),
      L(9, "automating-microsoft-teams", "Automating Microsoft Teams: Notifications and Approvals", { contentDir: "ch01/09-automating-microsoft-teams" }),
      L(10, "automating-excel", "Automating Excel: Tables and Rows", { contentDir: "ch01/10-automating-excel" }),
      L(11, "automating-sharepoint", "Automating SharePoint: Lists, Libraries and Document Automation", { contentDir: "ch01/11-automating-sharepoint" }),
      L(12, "connecting-power-bi", "Connecting Power BI: Data Alerts and Refresh Notifications", { contentDir: "ch01/12-connecting-power-bi" }),
      L(13, "approval-workflows", "Approval Workflows: Start and Wait for an Approval", { contentDir: "ch01/13-approval-workflows" }),
      L(14, "error-handling-in-flows", "Error Handling: Configure Run After and Try/Catch Patterns", { contentDir: "ch01/14-error-handling-in-flows" }),
      L(15, "scheduled-and-recurring-flows", "Scheduled and Recurring Flows", { contentDir: "ch01/15-scheduled-and-recurring-flows" }),
    ],
  },
  {
    n: 2,
    title: "Enterprise Automation",
    lessons: [
      L(16, "introduction-to-dataverse", "Introduction to Dataverse", { contentDir: "ch02/16-introduction-to-dataverse" }),
      L(17, "automating-with-dataverse", "Automating with Dataverse Triggers and Actions", { contentDir: "ch02/17-automating-with-dataverse" }),
      L(18, "connecting-to-sql-server", "Connecting to SQL Server from Power Automate", { contentDir: "ch02/18-connecting-to-sql-server" }),
      L(19, "http-actions-and-rest-apis", "HTTP Actions and Calling REST APIs", { contentDir: "ch02/19-http-actions-and-rest-apis" }),
      L(20, "working-with-json", "Working with JSON: Parse JSON and Compose", { contentDir: "ch02/20-working-with-json" }),
      L(21, "authentication-and-connections", "Authentication: Connections, Service Principals and OAuth", { contentDir: "ch02/21-authentication-and-connections" }),
      L(22, "building-custom-connectors", "Building and Using Custom Connectors", { contentDir: "ch02/22-building-custom-connectors" }),
      L(23, "child-flows-and-modular-design", "Child Flows and Modular Flow Design", { contentDir: "ch02/23-child-flows-and-modular-design" }),
      L(24, "solutions-and-packaging-flows", "Solutions: Packaging Flows for ALM", { contentDir: "ch02/24-solutions-and-packaging-flows" }),
      L(25, "environment-variables-and-connection-references", "Environment Variables and Connection References", { contentDir: "ch02/25-environment-variables-and-connection-references" }),
      L(26, "environments-and-environment-strategy", "Environments and Environment Strategy", { contentDir: "ch02/26-environments-and-environment-strategy" }),
      L(27, "data-loss-prevention-policies", "Security: Data Loss Prevention (DLP) Policies", { contentDir: "ch02/27-data-loss-prevention-policies" }),
      L(28, "governance-and-the-admin-center", "Governance: Admin Center and Monitoring", { contentDir: "ch02/28-governance-and-the-admin-center" }),
      L(29, "application-lifecycle-management", "Application Lifecycle Management: Dev/Test/Prod", { contentDir: "ch02/29-application-lifecycle-management" }),
      L(30, "troubleshooting-flows", "Troubleshooting Flows: Run History and Error Diagnosis", { contentDir: "ch02/30-troubleshooting-flows" }),
    ],
  },
];
