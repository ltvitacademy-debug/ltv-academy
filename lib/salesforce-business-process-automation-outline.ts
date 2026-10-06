// The Business Process Automation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-business-process-automation/
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

export const SFTA_SALESFORCE_BUSINESS_PROCESS_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Declarative Business Logic",
    lessons: [
      L(1, "business-processes-in-salesforce", "Business Processes in Salesforce", { contentDir: "ch01/01-business-processes-in-salesforce" }),
      L(2, "approval-processes", "Approval Processes", { contentDir: "ch01/02-approval-processes" }),
      L(3, "multi-step-and-parallel-approvals", "Multi-Step and Parallel Approvals", { contentDir: "ch01/03-multi-step-and-parallel-approvals" }),
      L(4, "validation-rules", "Validation Rules", { contentDir: "ch01/04-validation-rules" }),
      L(5, "formulas-and-formula-functions", "Formulas and Formula Functions", { contentDir: "ch01/05-formulas-and-formula-functions" }),
      L(6, "notifications-and-email-alerts", "Notifications and Email Alerts", { contentDir: "ch01/06-notifications-and-email-alerts" }),
    ],
  },
  {
    n: 2,
    title: "Choosing the Right Tool",
    lessons: [
      L(7, "choosing-declarative-vs-programmatic-solutions", "Choosing Declarative vs. Programmatic Solutions", { contentDir: "ch02/07-choosing-declarative-vs-programmatic-solutions" }),
      L(8, "order-of-execution-overview", "Order of Execution Overview", { contentDir: "ch02/08-order-of-execution-overview" }),
      L(9, "automation-collisions-and-recursion", "Automation Collisions and Recursion", { contentDir: "ch02/09-automation-collisions-and-recursion" }),
      L(10, "maintaining-automation-over-time", "Maintaining Automation Over Time", { contentDir: "ch02/10-maintaining-automation-over-time" }),
    ],
  },
  {
    n: 3,
    title: "Applied Automation",
    lessons: [
      L(11, "business-process-case-study-quote-approval", "Business Process Case Study: Quote Approval", { contentDir: "ch03/11-business-process-case-study-quote-approval" }),
      L(12, "business-process-case-study-service-level-escalation", "Business Process Case Study: Service Level Escalation", { contentDir: "ch03/12-business-process-case-study-service-level-escalation" }),
      L(13, "automation-documentation-and-handoff", "Automation Documentation and Handoff", { contentDir: "ch03/13-automation-documentation-and-handoff" }),
      L(14, "business-process-automation-practice-lab", "Business Process Automation Practice Lab", { contentDir: "ch03/14-business-process-automation-practice-lab" }),
      L(15, "testing-business-processes", "Testing Business Processes", { contentDir: "ch03/15-testing-business-processes" }),
      L(16, "business-process-review", "Business Process Review", { contentDir: "ch03/16-business-process-review" }),
    ],
  },
  {
    n: 4,
    title: "Working With Stakeholders",
    lessons: [
      L(17, "gathering-process-requirements", "Gathering Process Requirements", { contentDir: "ch04/17-gathering-process-requirements" }),
      L(18, "mapping-processes-before-you-build", "Mapping Processes Before You Build", { contentDir: "ch04/18-mapping-processes-before-you-build" }),
    ],
  },
];
