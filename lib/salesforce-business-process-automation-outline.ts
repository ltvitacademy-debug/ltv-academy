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
      L(1, "business-processes-in-salesforce", "Business Processes in Salesforce"),
      L(2, "approval-processes", "Approval Processes"),
      L(3, "multi-step-and-parallel-approvals", "Multi-Step and Parallel Approvals"),
      L(4, "validation-rules", "Validation Rules"),
      L(5, "formulas-and-formula-functions", "Formulas and Formula Functions"),
      L(6, "notifications-and-email-alerts", "Notifications and Email Alerts"),
    ],
  },
  {
    n: 2,
    title: "Choosing the Right Tool",
    lessons: [
      L(7, "choosing-declarative-vs-programmatic-solutions", "Choosing Declarative vs. Programmatic Solutions"),
      L(8, "order-of-execution-overview", "Order of Execution Overview"),
      L(9, "automation-collisions-and-recursion", "Automation Collisions and Recursion"),
      L(10, "maintaining-automation-over-time", "Maintaining Automation Over Time"),
    ],
  },
  {
    n: 3,
    title: "Applied Automation",
    lessons: [
      L(11, "business-process-case-study-quote-approval", "Business Process Case Study: Quote Approval"),
      L(12, "business-process-case-study-service-level-escalation", "Business Process Case Study: Service Level Escalation"),
      L(13, "automation-documentation-and-handoff", "Automation Documentation and Handoff"),
      L(14, "business-process-automation-practice-lab", "Business Process Automation Practice Lab"),
      L(15, "testing-business-processes", "Testing Business Processes"),
      L(16, "business-process-review", "Business Process Review"),
    ],
  },
  {
    n: 4,
    title: "Working With Stakeholders",
    lessons: [
      L(17, "gathering-process-requirements", "Gathering Process Requirements"),
      L(18, "mapping-processes-before-you-build", "Mapping Processes Before You Build"),
    ],
  },
];
