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
      L(1, "automation-on-the-salesforce-platform", "Automation on the Salesforce Platform"),
      L(2, "flow-builder-overview", "Flow Builder Overview"),
      L(3, "flow-elements-and-resources", "Flow Elements and Resources"),
      L(4, "variables-constants-and-formulas", "Variables, Constants and Formulas"),
      L(5, "flow-data-types-and-records", "Flow Data Types and Records"),
    ],
  },
  {
    n: 2,
    title: "Flow Types",
    lessons: [
      L(6, "record-triggered-flows-before-save", "Record-Triggered Flows: Before Save"),
      L(7, "record-triggered-flows-after-save", "Record-Triggered Flows: After Save"),
      L(8, "screen-flows", "Screen Flows"),
      L(9, "scheduled-flows", "Scheduled Flows"),
      L(10, "autolaunched-flows", "Autolaunched Flows"),
      L(11, "subflows", "Subflows"),
      L(12, "platform-event-triggered-flows", "Platform Event-Triggered Flows"),
    ],
  },
  {
    n: 3,
    title: "Flow Logic",
    lessons: [
      L(13, "decisions", "Decisions"),
      L(14, "loops", "Loops"),
      L(15, "collections", "Collections"),
      L(16, "get-records", "Get Records"),
      L(17, "create-update-and-delete-records", "Create, Update and Delete Records"),
      L(18, "assignments", "Assignments"),
      L(19, "transform-element-and-data-manipulation", "Transform Element and Data Manipulation"),
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
