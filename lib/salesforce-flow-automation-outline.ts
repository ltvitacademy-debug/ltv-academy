// The Flow Automation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-flow-automation/
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

export const SFTA_SALESFORCE_FLOW_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Flow Foundations",
    lessons: [
      L(1, "automation-on-the-salesforce-platform", "Automation on the Salesforce Platform", { contentDir: "ch01/01-automation-on-the-salesforce-platform" }),
      L(2, "flow-builder-overview", "Flow Builder Overview", { contentDir: "ch01/02-flow-builder-overview" }),
      L(3, "flow-elements-and-resources", "Flow Elements and Resources", { contentDir: "ch01/03-flow-elements-and-resources" }),
      L(4, "variables-constants-and-formulas", "Variables, Constants and Formulas", { contentDir: "ch01/04-variables-constants-and-formulas" }),
      L(5, "flow-data-types-and-records", "Flow Data Types and Records", { contentDir: "ch01/05-flow-data-types-and-records" }),
    ],
  },
  {
    n: 2,
    title: "Flow Types",
    lessons: [
      L(6, "record-triggered-flows-before-save", "Record-Triggered Flows: Before Save", { contentDir: "ch02/06-record-triggered-flows-before-save" }),
      L(7, "record-triggered-flows-after-save", "Record-Triggered Flows: After Save", { contentDir: "ch02/07-record-triggered-flows-after-save" }),
      L(8, "screen-flows", "Screen Flows", { contentDir: "ch02/08-screen-flows" }),
      L(9, "scheduled-flows", "Scheduled Flows", { contentDir: "ch02/09-scheduled-flows" }),
      L(10, "autolaunched-flows", "Autolaunched Flows", { contentDir: "ch02/10-autolaunched-flows" }),
      L(11, "subflows", "Subflows", { contentDir: "ch02/11-subflows" }),
      L(12, "platform-event-triggered-flows", "Platform Event-Triggered Flows", { contentDir: "ch02/12-platform-event-triggered-flows" }),
    ],
  },
  {
    n: 3,
    title: "Flow Logic",
    lessons: [
      L(13, "decisions", "Decisions", { contentDir: "ch03/13-decisions" }),
      L(14, "loops", "Loops", { contentDir: "ch03/14-loops" }),
      L(15, "collections", "Collections", { contentDir: "ch03/15-collections" }),
      L(16, "get-records", "Get Records", { contentDir: "ch03/16-get-records" }),
      L(17, "create-update-and-delete-records", "Create, Update and Delete Records", { contentDir: "ch03/17-create-update-and-delete-records" }),
      L(18, "assignments", "Assignments", { contentDir: "ch03/18-assignments" }),
      L(19, "transform-element-and-data-manipulation", "Transform Element and Data Manipulation", { contentDir: "ch03/19-transform-element-and-data-manipulation" }),
    ],
  },
  {
    n: 4,
    title: "Reliable and Scalable Flows",
    lessons: [
      L(20, "fault-handling", "Fault Handling"),
      L(21, "flow-testing-and-debugging", "Flow Testing and Debugging"),
      L(22, "flow-bulkification-and-performance", "Flow Bulkification and Performance"),
      L(23, "governor-limits-in-flow", "Governor Limits in Flow"),
      L(24, "flow-versioning-and-deployment", "Flow Versioning and Deployment"),
      L(25, "flow-orchestration-overview", "Flow Orchestration Overview"),
    ],
  },
  {
    n: 5,
    title: "Flow in Practice",
    lessons: [
      L(26, "automation-architecture", "Automation Architecture"),
      L(27, "naming-conventions-and-documentation", "Naming Conventions and Documentation"),
      L(28, "migrating-from-process-builder-and-workflow-rules", "Migrating From Process Builder and Workflow Rules"),
      L(29, "flow-practice-lab-lead-assignment", "Flow Practice Lab: Lead Assignment"),
      L(30, "flow-practice-lab-case-escalation", "Flow Practice Lab: Case Escalation"),
      L(31, "flow-practice-lab-onboarding-wizard", "Flow Practice Lab: Onboarding Wizard"),
    ],
  },
];
