// ServiceNow Flow Designer & Automation course outline. Lessons without a contentDir render as
// "in production". Course 4 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: low-code automation, the admin-facing bridge toward scripted development.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-flow-designer-automation/
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

export const SERVICENOW_FLOW_DESIGNER_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Flow Designer Fundamentals",
    lessons: [
      L(1, "flow-designer-vs-legacy-workflow-editor", "Flow Designer vs. the Legacy Workflow Editor"),
      L(2, "flows-actions-and-subflows", "Flows, Actions & Subflows"),
      L(3, "triggers-record-and-scheduled", "Triggers: Record & Scheduled"),
      L(4, "your-first-flow", "Your First Flow"),
    ],
  },
  {
    n: 2,
    title: "Flow Logic & Data",
    lessons: [
      L(5, "flow-variables-and-data-pills", "Flow Variables & Data Pills"),
      L(6, "if-else-conditions-in-a-flow", "If/Else Conditions in a Flow"),
      L(7, "for-each-loops-in-a-flow", "For-Each Loops in a Flow"),
      L(8, "flow-logic-lab", "Flow Logic Lab"),
    ],
  },
  {
    n: 3,
    title: "Flow Actions",
    lessons: [
      L(9, "built-in-actions-create-update-notify", "Built-In Actions: Create, Update, Notify"),
      L(10, "approval-actions", "Approval Actions"),
      L(11, "building-a-custom-reusable-action", "Building a Custom Reusable Action"),
      L(12, "flow-actions-lab", "Flow Actions Lab"),
    ],
  },
  {
    n: 4,
    title: "Subflows & Reuse",
    lessons: [
      L(13, "when-to-build-a-subflow-instead-of-a-flow", "When to Build a Subflow Instead of a Flow"),
      L(14, "subflow-inputs-and-outputs", "Subflow Inputs & Outputs"),
      L(15, "subflow-reuse-lab", "Subflow Reuse Lab"),
    ],
  },
  {
    n: 5,
    title: "Service Catalog Automation",
    lessons: [
      L(16, "wiring-a-catalog-item-to-a-flow", "Wiring a Catalog Item to a Flow"),
      L(17, "multi-stage-approval-automation", "Multi-Stage Approval Automation"),
      L(18, "catalog-automation-lab", "Catalog Automation Lab"),
    ],
  },
  {
    n: 6,
    title: "Integration Hub Actions in Flow Designer",
    lessons: [
      L(19, "what-integrationhub-adds-to-flow-designer", "What IntegrationHub Adds to Flow Designer"),
      L(20, "calling-a-rest-step-from-a-flow", "Calling a REST Step From a Flow"),
      L(21, "integrationhub-flow-lab", "IntegrationHub Flow Lab"),
    ],
  },
  {
    n: 7,
    title: "Debugging & Troubleshooting Flows",
    lessons: [
      L(22, "the-flow-execution-log", "The Flow Execution Log"),
      L(23, "common-flow-failures-and-how-to-diagnose-them", "Common Flow Failures & How to Diagnose Them"),
      L(24, "troubleshooting-lab", "Troubleshooting Lab"),
    ],
  },
  {
    n: 8,
    title: "Capstone: Automating a Real Business Process",
    lessons: [
      L(25, "capstone-kickoff-choose-a-process-to-automate", "Capstone Kickoff: Choose a Process to Automate"),
      L(26, "capstone-build-the-flow-and-subflows", "Capstone: Build the Flow & Subflows"),
      L(27, "capstone-wrap-up-and-process-documentation", "Capstone Wrap-Up & Process Documentation"),
    ],
  },
];
