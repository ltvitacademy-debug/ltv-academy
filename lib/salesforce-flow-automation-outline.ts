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
      L(1, "automation-on-the-salesforce-platform", "Automation on the Salesforce Platform", { contentDir: "ch01/01-automation-on-the-salesforce-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528120/ltv-salesforce-flow-automation/automation-on-the-salesforce-platform.mp4", durationLabel: "1 min 24 s" }),
      L(2, "flow-builder-overview", "Flow Builder Overview", { contentDir: "ch01/02-flow-builder-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528567/ltv-salesforce-flow-automation/flow-builder-overview.mp4", durationLabel: "1 min 9 s" }),
      L(3, "flow-elements-and-resources", "Flow Elements and Resources", { contentDir: "ch01/03-flow-elements-and-resources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529071/ltv-salesforce-flow-automation/flow-elements-and-resources.mp4", durationLabel: "1 min 18 s" }),
      L(4, "variables-constants-and-formulas", "Variables, Constants and Formulas", { contentDir: "ch01/04-variables-constants-and-formulas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529495/ltv-salesforce-flow-automation/variables-constants-and-formulas.mp4", durationLabel: "1 min 7 s" }),
      L(5, "flow-data-types-and-records", "Flow Data Types and Records", { contentDir: "ch01/05-flow-data-types-and-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530015/ltv-salesforce-flow-automation/flow-data-types-and-records.mp4", durationLabel: "1 min 22 s" }),
    ],
  },
  {
    n: 2,
    title: "Flow Types",
    lessons: [
      L(6, "record-triggered-flows-before-save", "Record-Triggered Flows: Before Save", { contentDir: "ch02/06-record-triggered-flows-before-save", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530440/ltv-salesforce-flow-automation/record-triggered-flows-before-save.mp4", durationLabel: "1 min 14 s" }),
      L(7, "record-triggered-flows-after-save", "Record-Triggered Flows: After Save", { contentDir: "ch02/07-record-triggered-flows-after-save", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530857/ltv-salesforce-flow-automation/record-triggered-flows-after-save.mp4", durationLabel: "1 min 14 s" }),
      L(8, "screen-flows", "Screen Flows", { contentDir: "ch02/08-screen-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531219/ltv-salesforce-flow-automation/screen-flows.mp4", durationLabel: "1 min 3 s" }),
      L(9, "scheduled-flows", "Scheduled Flows", { contentDir: "ch02/09-scheduled-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531733/ltv-salesforce-flow-automation/scheduled-flows.mp4", durationLabel: "1 min 18 s" }),
      L(10, "autolaunched-flows", "Autolaunched Flows", { contentDir: "ch02/10-autolaunched-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532275/ltv-salesforce-flow-automation/autolaunched-flows.mp4", durationLabel: "1 min 31 s" }),
      L(11, "subflows", "Subflows", { contentDir: "ch02/11-subflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532595/ltv-salesforce-flow-automation/subflows.mp4", durationLabel: "1 min 11 s" }),
      L(12, "platform-event-triggered-flows", "Platform Event-Triggered Flows", { contentDir: "ch02/12-platform-event-triggered-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532870/ltv-salesforce-flow-automation/platform-event-triggered-flows.mp4", durationLabel: "1 min 9 s" }),
    ],
  },
  {
    n: 3,
    title: "Flow Logic",
    lessons: [
      L(13, "decisions", "Decisions", { contentDir: "ch03/13-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600355/ltv-salesforce-flow-automation/decisions.mp4", durationLabel: "1 min 48 s" }),
      L(14, "loops", "Loops", { contentDir: "ch03/14-loops", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600887/ltv-salesforce-flow-automation/loops.mp4", durationLabel: "1 min 53 s" }),
      L(15, "collections", "Collections", { contentDir: "ch03/15-collections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601365/ltv-salesforce-flow-automation/collections.mp4", durationLabel: "1 min 57 s" }),
      L(16, "get-records", "Get Records", { contentDir: "ch03/16-get-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601810/ltv-salesforce-flow-automation/get-records.mp4", durationLabel: "1 min 48 s" }),
      L(17, "create-update-and-delete-records", "Create, Update and Delete Records", { contentDir: "ch03/17-create-update-and-delete-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602285/ltv-salesforce-flow-automation/create-update-and-delete-records.mp4", durationLabel: "1 min 46 s" }),
      L(18, "assignments", "Assignments", { contentDir: "ch03/18-assignments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602752/ltv-salesforce-flow-automation/assignments.mp4", durationLabel: "1 min 57 s" }),
      L(19, "transform-element-and-data-manipulation", "Transform Element and Data Manipulation", { contentDir: "ch03/19-transform-element-and-data-manipulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603265/ltv-salesforce-flow-automation/transform-element-and-data-manipulation.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 4,
    title: "Reliable and Scalable Flows",
    lessons: [
      L(20, "fault-handling", "Fault Handling", { contentDir: "ch04/20-fault-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603797/ltv-salesforce-flow-automation/fault-handling.mp4", durationLabel: "2 min 0 s" }),
      L(21, "flow-testing-and-debugging", "Flow Testing and Debugging", { contentDir: "ch04/21-flow-testing-and-debugging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604355/ltv-salesforce-flow-automation/flow-testing-and-debugging.mp4", durationLabel: "2 min 6 s" }),
      L(22, "flow-bulkification-and-performance", "Flow Bulkification and Performance", { contentDir: "ch04/22-flow-bulkification-and-performance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604922/ltv-salesforce-flow-automation/flow-bulkification-and-performance.mp4", durationLabel: "2 min 8 s" }),
      L(23, "governor-limits-in-flow", "Governor Limits in Flow", { contentDir: "ch04/23-governor-limits-in-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605591/ltv-salesforce-flow-automation/governor-limits-in-flow.mp4", durationLabel: "2 min 26 s" }),
      L(24, "flow-versioning-and-deployment", "Flow Versioning and Deployment", { contentDir: "ch04/24-flow-versioning-and-deployment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606059/ltv-salesforce-flow-automation/flow-versioning-and-deployment.mp4", durationLabel: "1 min 40 s" }),
      L(25, "flow-orchestration-overview", "Flow Orchestration Overview", { contentDir: "ch04/25-flow-orchestration-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606589/ltv-salesforce-flow-automation/flow-orchestration-overview.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 5,
    title: "Flow in Practice",
    lessons: [
      L(26, "automation-architecture", "Automation Architecture", { contentDir: "ch05/26-automation-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607149/ltv-salesforce-flow-automation/automation-architecture.mp4", durationLabel: "2 min 5 s" }),
      L(27, "naming-conventions-and-documentation", "Naming Conventions and Documentation", { contentDir: "ch05/27-naming-conventions-and-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607635/ltv-salesforce-flow-automation/naming-conventions-and-documentation.mp4", durationLabel: "1 min 47 s" }),
      L(28, "migrating-from-process-builder-and-workflow-rules", "Migrating From Process Builder and Workflow Rules", { contentDir: "ch05/28-migrating-from-process-builder-and-workflow-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608145/ltv-salesforce-flow-automation/migrating-from-process-builder-and-workflow-rules.mp4", durationLabel: "2 min 6 s" }),
      L(29, "flow-practice-lab-lead-assignment", "Flow Practice Lab: Lead Assignment", { contentDir: "ch05/29-flow-practice-lab-lead-assignment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608700/ltv-salesforce-flow-automation/flow-practice-lab-lead-assignment.mp4", durationLabel: "2 min 0 s" }),
      L(30, "flow-practice-lab-case-escalation", "Flow Practice Lab: Case Escalation", { contentDir: "ch05/30-flow-practice-lab-case-escalation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609177/ltv-salesforce-flow-automation/flow-practice-lab-case-escalation.mp4", durationLabel: "1 min 51 s" }),
      L(31, "flow-practice-lab-onboarding-wizard", "Flow Practice Lab: Onboarding Wizard", { contentDir: "ch05/31-flow-practice-lab-onboarding-wizard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609722/ltv-salesforce-flow-automation/flow-practice-lab-onboarding-wizard.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
];
