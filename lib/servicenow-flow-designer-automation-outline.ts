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
      L(1, "flow-designer-vs-legacy-workflow-editor", "Flow Designer vs. the Legacy Workflow Editor", { contentDir: "ch01/01-flow-designer-vs-legacy-workflow-editor", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792706969/ltv-servicenow-flow-designer-automation/flow-designer-vs-legacy-workflow-editor.mp4", durationLabel: "1 min 57 s" }),
      L(2, "flows-actions-and-subflows", "Flows, Actions & Subflows", { contentDir: "ch01/02-flows-actions-and-subflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707024/ltv-servicenow-flow-designer-automation/flows-actions-and-subflows.mp4", durationLabel: "1 min 58 s" }),
      L(3, "triggers-record-and-scheduled", "Triggers: Record & Scheduled", { contentDir: "ch01/03-triggers-record-and-scheduled", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707075/ltv-servicenow-flow-designer-automation/triggers-record-and-scheduled.mp4", durationLabel: "1 min 44 s" }),
      L(4, "your-first-flow", "Your First Flow", { contentDir: "ch01/04-your-first-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707127/ltv-servicenow-flow-designer-automation/your-first-flow.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 2,
    title: "Flow Logic & Data",
    lessons: [
      L(5, "flow-variables-and-data-pills", "Flow Variables & Data Pills", { contentDir: "ch02/05-flow-variables-and-data-pills", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707185/ltv-servicenow-flow-designer-automation/flow-variables-and-data-pills.mp4", durationLabel: "2 min 5 s" }),
      L(6, "if-else-conditions-in-a-flow", "If/Else Conditions in a Flow", { contentDir: "ch02/06-if-else-conditions-in-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707241/ltv-servicenow-flow-designer-automation/if-else-conditions-in-a-flow.mp4", durationLabel: "2 min 3 s" }),
      L(7, "for-each-loops-in-a-flow", "For-Each Loops in a Flow", { contentDir: "ch02/07-for-each-loops-in-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707302/ltv-servicenow-flow-designer-automation/for-each-loops-in-a-flow.mp4", durationLabel: "2 min 7 s" }),
      L(8, "flow-logic-lab", "Flow Logic Lab", { contentDir: "ch02/08-flow-logic-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707357/ltv-servicenow-flow-designer-automation/flow-logic-lab.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 3,
    title: "Flow Actions",
    lessons: [
      L(9, "built-in-actions-create-update-notify", "Built-In Actions: Create, Update, Notify", { contentDir: "ch03/09-built-in-actions-create-update-notify", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707422/ltv-servicenow-flow-designer-automation/built-in-actions-create-update-notify.mp4", durationLabel: "2 min 27 s" }),
      L(10, "approval-actions", "Approval Actions", { contentDir: "ch03/10-approval-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707481/ltv-servicenow-flow-designer-automation/approval-actions.mp4", durationLabel: "2 min 13 s" }),
      L(11, "building-a-custom-reusable-action", "Building a Custom Reusable Action", { contentDir: "ch03/11-building-a-custom-reusable-action", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707543/ltv-servicenow-flow-designer-automation/building-a-custom-reusable-action.mp4", durationLabel: "2 min 22 s" }),
      L(12, "flow-actions-lab", "Flow Actions Lab", { contentDir: "ch03/12-flow-actions-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707605/ltv-servicenow-flow-designer-automation/flow-actions-lab.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Subflows & Reuse",
    lessons: [
      L(13, "when-to-build-a-subflow-instead-of-a-flow", "When to Build a Subflow Instead of a Flow", { contentDir: "ch04/13-when-to-build-a-subflow-instead-of-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707671/ltv-servicenow-flow-designer-automation/when-to-build-a-subflow-instead-of-a-flow.mp4", durationLabel: "2 min 31 s" }),
      L(14, "subflow-inputs-and-outputs", "Subflow Inputs & Outputs", { contentDir: "ch04/14-subflow-inputs-and-outputs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707732/ltv-servicenow-flow-designer-automation/subflow-inputs-and-outputs.mp4", durationLabel: "2 min 19 s" }),
      L(15, "subflow-reuse-lab", "Subflow Reuse Lab", { contentDir: "ch04/15-subflow-reuse-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707795/ltv-servicenow-flow-designer-automation/subflow-reuse-lab.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 5,
    title: "Service Catalog Automation",
    lessons: [
      L(16, "wiring-a-catalog-item-to-a-flow", "Wiring a Catalog Item to a Flow", { contentDir: "ch05/16-wiring-a-catalog-item-to-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707869/ltv-servicenow-flow-designer-automation/wiring-a-catalog-item-to-a-flow.mp4", durationLabel: "2 min 51 s" }),
      L(17, "multi-stage-approval-automation", "Multi-Stage Approval Automation", { contentDir: "ch05/17-multi-stage-approval-automation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792707944/ltv-servicenow-flow-designer-automation/multi-stage-approval-automation.mp4", durationLabel: "2 min 54 s" }),
      L(18, "catalog-automation-lab", "Catalog Automation Lab", { contentDir: "ch05/18-catalog-automation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708028/ltv-servicenow-flow-designer-automation/catalog-automation-lab.mp4", durationLabel: "3 min 22 s" }),
    ],
  },
  {
    n: 6,
    title: "Integration Hub Actions in Flow Designer",
    lessons: [
      L(19, "what-integrationhub-adds-to-flow-designer", "What IntegrationHub Adds to Flow Designer", { contentDir: "ch06/19-what-integrationhub-adds-to-flow-designer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708085/ltv-servicenow-flow-designer-automation/what-integrationhub-adds-to-flow-designer.mp4", durationLabel: "2 min 12 s" }),
      L(20, "calling-a-rest-step-from-a-flow", "Calling a REST Step From a Flow", { contentDir: "ch06/20-calling-a-rest-step-from-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708140/ltv-servicenow-flow-designer-automation/calling-a-rest-step-from-a-flow.mp4", durationLabel: "2 min 8 s" }),
      L(21, "integrationhub-flow-lab", "IntegrationHub Flow Lab", { contentDir: "ch06/21-integrationhub-flow-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708208/ltv-servicenow-flow-designer-automation/integrationhub-flow-lab.mp4", durationLabel: "2 min 42 s" }),
    ],
  },
  {
    n: 7,
    title: "Debugging & Troubleshooting Flows",
    lessons: [
      L(22, "the-flow-execution-log", "The Flow Execution Log", { contentDir: "ch07/22-the-flow-execution-log", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708264/ltv-servicenow-flow-designer-automation/the-flow-execution-log.mp4", durationLabel: "2 min 4 s" }),
      L(23, "common-flow-failures-and-how-to-diagnose-them", "Common Flow Failures & How to Diagnose Them", { contentDir: "ch07/23-common-flow-failures-and-how-to-diagnose-them", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708331/ltv-servicenow-flow-designer-automation/common-flow-failures-and-how-to-diagnose-them.mp4", durationLabel: "2 min 39 s" }),
      L(24, "troubleshooting-lab", "Troubleshooting Lab", { contentDir: "ch07/24-troubleshooting-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708384/ltv-servicenow-flow-designer-automation/troubleshooting-lab.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Automating a Real Business Process",
    lessons: [
      L(25, "capstone-kickoff-choose-a-process-to-automate", "Capstone Kickoff: Choose a Process to Automate", { contentDir: "ch08/25-capstone-kickoff-choose-a-process-to-automate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708441/ltv-servicenow-flow-designer-automation/capstone-kickoff-choose-a-process-to-automate.mp4", durationLabel: "2 min 13 s" }),
      L(26, "capstone-build-the-flow-and-subflows", "Capstone: Build the Flow & Subflows", { contentDir: "ch08/26-capstone-build-the-flow-and-subflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708497/ltv-servicenow-flow-designer-automation/capstone-build-the-flow-and-subflows.mp4", durationLabel: "2 min 11 s" }),
      L(27, "capstone-wrap-up-and-process-documentation", "Capstone Wrap-Up & Process Documentation", { contentDir: "ch08/27-capstone-wrap-up-and-process-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792708550/ltv-servicenow-flow-designer-automation/capstone-wrap-up-and-process-documentation.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
];
