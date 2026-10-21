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
      L(1, "business-processes-in-salesforce", "Business Processes in Salesforce", { contentDir: "ch01/01-business-processes-in-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600162/ltv-salesforce-business-process-automation/business-processes-in-salesforce.mp4", durationLabel: "1 min 51 s" }),
      L(2, "approval-processes", "Approval Processes", { contentDir: "ch01/02-approval-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600748/ltv-salesforce-business-process-automation/approval-processes.mp4", durationLabel: "2 min 2 s" }),
      L(3, "multi-step-and-parallel-approvals", "Multi-Step and Parallel Approvals", { contentDir: "ch01/03-multi-step-and-parallel-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601250/ltv-salesforce-business-process-automation/multi-step-and-parallel-approvals.mp4", durationLabel: "2 min 4 s" }),
      L(4, "validation-rules", "Validation Rules", { contentDir: "ch01/04-validation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601760/ltv-salesforce-business-process-automation/validation-rules.mp4", durationLabel: "1 min 59 s" }),
      L(5, "formulas-and-formula-functions", "Formulas and Formula Functions", { contentDir: "ch01/05-formulas-and-formula-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602325/ltv-salesforce-business-process-automation/formulas-and-formula-functions.mp4", durationLabel: "2 min 4 s" }),
      L(6, "notifications-and-email-alerts", "Notifications and Email Alerts", { contentDir: "ch01/06-notifications-and-email-alerts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602807/ltv-salesforce-business-process-automation/notifications-and-email-alerts.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 2,
    title: "Choosing the Right Tool",
    lessons: [
      L(7, "choosing-declarative-vs-programmatic-solutions", "Choosing Declarative vs. Programmatic Solutions", { contentDir: "ch02/07-choosing-declarative-vs-programmatic-solutions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603424/ltv-salesforce-business-process-automation/choosing-declarative-vs-programmatic-solutions.mp4", durationLabel: "2 min 15 s" }),
      L(8, "order-of-execution-overview", "Order of Execution Overview", { contentDir: "ch02/08-order-of-execution-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603952/ltv-salesforce-business-process-automation/order-of-execution-overview.mp4", durationLabel: "2 min 2 s" }),
      L(9, "automation-collisions-and-recursion", "Automation Collisions and Recursion", { contentDir: "ch02/09-automation-collisions-and-recursion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604563/ltv-salesforce-business-process-automation/automation-collisions-and-recursion.mp4", durationLabel: "2 min 12 s" }),
      L(10, "maintaining-automation-over-time", "Maintaining Automation Over Time", { contentDir: "ch02/10-maintaining-automation-over-time", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605144/ltv-salesforce-business-process-automation/maintaining-automation-over-time.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 3,
    title: "Applied Automation",
    lessons: [
      L(11, "business-process-case-study-quote-approval", "Business Process Case Study: Quote Approval", { contentDir: "ch03/11-business-process-case-study-quote-approval", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605463/ltv-salesforce-business-process-automation/business-process-case-study-quote-approval.mp4", durationLabel: "1 min 18 s" }),
      L(12, "business-process-case-study-service-level-escalation", "Business Process Case Study: Service Level Escalation", { contentDir: "ch03/12-business-process-case-study-service-level-escalation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605826/ltv-salesforce-business-process-automation/business-process-case-study-service-level-escalation.mp4", durationLabel: "1 min 22 s" }),
      L(13, "automation-documentation-and-handoff", "Automation Documentation and Handoff", { contentDir: "ch03/13-automation-documentation-and-handoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606128/ltv-salesforce-business-process-automation/automation-documentation-and-handoff.mp4", durationLabel: "1 min 14 s" }),
      L(14, "business-process-automation-practice-lab", "Business Process Automation Practice Lab", { contentDir: "ch03/14-business-process-automation-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606507/ltv-salesforce-business-process-automation/business-process-automation-practice-lab.mp4", durationLabel: "1 min 25 s" }),
      L(15, "testing-business-processes", "Testing Business Processes", { contentDir: "ch03/15-testing-business-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606817/ltv-salesforce-business-process-automation/testing-business-processes.mp4", durationLabel: "1 min 21 s" }),
      L(16, "business-process-review", "Business Process Review", { contentDir: "ch03/16-business-process-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607246/ltv-salesforce-business-process-automation/business-process-review.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
  {
    n: 4,
    title: "Working With Stakeholders",
    lessons: [
      L(17, "gathering-process-requirements", "Gathering Process Requirements", { contentDir: "ch04/17-gathering-process-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607603/ltv-salesforce-business-process-automation/gathering-process-requirements.mp4", durationLabel: "1 min 24 s" }),
      L(18, "mapping-processes-before-you-build", "Mapping Processes Before You Build", { contentDir: "ch04/18-mapping-processes-before-you-build", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608008/ltv-salesforce-business-process-automation/mapping-processes-before-you-build.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
];
