// ServiceNow ITSM Implementation course outline. Lessons without a contentDir render as
// "in production". Course 8 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: implementing the core ITSM process modules end to end, aligned with CIS-ITSM.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-itsm-implementation/
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

export const SERVICENOW_ITSM_IMPLEMENTATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Implementing Incident Management",
    lessons: [
      L(1, "incident-table-and-state-model", "Incident Table & State Model", { contentDir: "ch01/01-incident-table-and-state-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718086/ltv-servicenow-itsm-implementation/incident-table-and-state-model.mp4", durationLabel: "2 min 16 s" }),
      L(2, "priority-impact-and-urgency", "Priority, Impact & Urgency", { contentDir: "ch01/02-priority-impact-and-urgency", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718141/ltv-servicenow-itsm-implementation/priority-impact-and-urgency.mp4", durationLabel: "2 min 9 s" }),
      L(3, "assignment-rules-and-assignment-groups", "Assignment Rules & Assignment Groups", { contentDir: "ch01/03-assignment-rules-and-assignment-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718197/ltv-servicenow-itsm-implementation/assignment-rules-and-assignment-groups.mp4", durationLabel: "2 min 5 s" }),
      L(4, "major-incident-management", "Major Incident Management", { contentDir: "ch01/04-major-incident-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718252/ltv-servicenow-itsm-implementation/major-incident-management.mp4", durationLabel: "2 min 11 s" }),
      L(5, "incident-implementation-lab", "Incident Implementation Lab", { contentDir: "ch01/05-incident-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718314/ltv-servicenow-itsm-implementation/incident-implementation-lab.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 2,
    title: "Implementing Problem Management",
    lessons: [
      L(6, "problem-table-and-its-relationship-to-incident", "Problem Table & Its Relationship to Incident", { contentDir: "ch02/06-problem-table-and-its-relationship-to-incident", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718375/ltv-servicenow-itsm-implementation/problem-table-and-its-relationship-to-incident.mp4", durationLabel: "2 min 23 s" }),
      L(7, "root-cause-analysis-fields-and-workflow", "Root-Cause Analysis Fields & Workflow", { contentDir: "ch02/07-root-cause-analysis-fields-and-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718434/ltv-servicenow-itsm-implementation/root-cause-analysis-fields-and-workflow.mp4", durationLabel: "2 min 15 s" }),
      L(8, "known-error-database", "Known Error Database", { contentDir: "ch02/08-known-error-database", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718489/ltv-servicenow-itsm-implementation/known-error-database.mp4", durationLabel: "2 min 6 s" }),
      L(9, "problem-implementation-lab", "Problem Implementation Lab", { contentDir: "ch02/09-problem-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718560/ltv-servicenow-itsm-implementation/problem-implementation-lab.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
  {
    n: 3,
    title: "Implementing Change Enablement",
    lessons: [
      L(10, "standard-normal-and-emergency-changes", "Standard, Normal & Emergency Changes", { contentDir: "ch03/10-standard-normal-and-emergency-changes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718614/ltv-servicenow-itsm-implementation/standard-normal-and-emergency-changes.mp4", durationLabel: "2 min 1 s" }),
      L(11, "change-risk-assessment", "Change Risk Assessment", { contentDir: "ch03/11-change-risk-assessment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718673/ltv-servicenow-itsm-implementation/change-risk-assessment.mp4", durationLabel: "2 min 16 s" }),
      L(12, "change-approval-workflows", "Change Approval Workflows", { contentDir: "ch03/12-change-approval-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718729/ltv-servicenow-itsm-implementation/change-approval-workflows.mp4", durationLabel: "2 min 7 s" }),
      L(13, "change-advisory-board-cab-configuration", "Change Advisory Board (CAB) Configuration", { contentDir: "ch03/13-change-advisory-board-cab-configuration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718786/ltv-servicenow-itsm-implementation/change-advisory-board-cab-configuration.mp4", durationLabel: "2 min 11 s" }),
      L(14, "change-implementation-lab", "Change Implementation Lab", { contentDir: "ch03/14-change-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718844/ltv-servicenow-itsm-implementation/change-implementation-lab.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 4,
    title: "Implementing Request Management",
    lessons: [
      L(15, "the-request-and-requested-item-tables", "The Request & Requested Item Tables", { contentDir: "ch04/15-the-request-and-requested-item-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718905/ltv-servicenow-itsm-implementation/the-request-and-requested-item-tables.mp4", durationLabel: "2 min 18 s" }),
      L(16, "fulfillment-workflows", "Fulfillment Workflows", { contentDir: "ch04/16-fulfillment-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792718958/ltv-servicenow-itsm-implementation/fulfillment-workflows.mp4", durationLabel: "2 min 1 s" }),
      L(17, "request-management-lab", "Request Management Lab", { contentDir: "ch04/17-request-management-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719013/ltv-servicenow-itsm-implementation/request-management-lab.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 5,
    title: "Implementing Knowledge Management",
    lessons: [
      L(18, "knowledge-bases-and-articles", "Knowledge Bases & Articles", { contentDir: "ch05/18-knowledge-bases-and-articles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719082/ltv-servicenow-itsm-implementation/knowledge-bases-and-articles.mp4", durationLabel: "2 min 38 s" }),
      L(19, "knowledge-article-approval-workflow", "Knowledge Article Approval Workflow", { contentDir: "ch05/19-knowledge-article-approval-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719146/ltv-servicenow-itsm-implementation/knowledge-article-approval-workflow.mp4", durationLabel: "2 min 30 s" }),
      L(20, "knowledge-article-feedback-and-retirement", "Knowledge Article Feedback & Retirement", { contentDir: "ch05/20-knowledge-article-feedback-and-retirement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719214/ltv-servicenow-itsm-implementation/knowledge-article-feedback-and-retirement.mp4", durationLabel: "2 min 35 s" }),
      L(21, "knowledge-management-lab", "Knowledge Management Lab", { contentDir: "ch05/21-knowledge-management-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719289/ltv-servicenow-itsm-implementation/knowledge-management-lab.mp4", durationLabel: "2 min 59 s" }),
    ],
  },
  {
    n: 6,
    title: "Service Level Management Implementation",
    lessons: [
      L(22, "sla-definitions-and-sla-conditions", "SLA Definitions & SLA Conditions", { contentDir: "ch06/22-sla-definitions-and-sla-conditions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719344/ltv-servicenow-itsm-implementation/sla-definitions-and-sla-conditions.mp4", durationLabel: "2 min 1 s" }),
      L(23, "sla-workflows-pause-stop-breach", "SLA Workflows: Pause, Stop, Breach", { contentDir: "ch06/23-sla-workflows-pause-stop-breach", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719401/ltv-servicenow-itsm-implementation/sla-workflows-pause-stop-breach.mp4", durationLabel: "2 min 7 s" }),
      L(24, "sla-reporting", "SLA Reporting", { contentDir: "ch06/24-sla-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719459/ltv-servicenow-itsm-implementation/sla-reporting.mp4", durationLabel: "2 min 10 s" }),
      L(25, "sla-implementation-lab", "SLA Implementation Lab", { contentDir: "ch06/25-sla-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719519/ltv-servicenow-itsm-implementation/sla-implementation-lab.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 7,
    title: "Service Portal & End-User Experience",
    lessons: [
      L(26, "service-portal-configuration-overview", "Service Portal Configuration: Overview", { contentDir: "ch07/26-service-portal-configuration-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719583/ltv-servicenow-itsm-implementation/service-portal-configuration-overview.mp4", durationLabel: "2 min 22 s" }),
      L(27, "widgets-and-portal-pages", "Widgets & Portal Pages", { contentDir: "ch07/27-widgets-and-portal-pages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719654/ltv-servicenow-itsm-implementation/widgets-and-portal-pages.mp4", durationLabel: "2 min 42 s" }),
      L(28, "service-portal-lab", "Service Portal Lab", { contentDir: "ch07/28-service-portal-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719726/ltv-servicenow-itsm-implementation/service-portal-lab.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Enterprise IT Service Desk",
    lessons: [
      L(29, "capstone-kickoff-service-desk-requirements", "Capstone Kickoff: Service Desk Requirements", { contentDir: "ch08/29-capstone-kickoff-service-desk-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719788/ltv-servicenow-itsm-implementation/capstone-kickoff-service-desk-requirements.mp4", durationLabel: "2 min 22 s" }),
      L(30, "capstone-configure-incident-problem-and-change-workflows", "Capstone: Configure Incident, Problem & Change Workflows", { contentDir: "ch08/30-capstone-configure-incident-problem-and-change-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719850/ltv-servicenow-itsm-implementation/capstone-configure-incident-problem-and-change-workflows.mp4", durationLabel: "2 min 26 s" }),
      L(31, "capstone-configure-slas-and-reporting", "Capstone: Configure SLAs & Reporting", { contentDir: "ch08/31-capstone-configure-slas-and-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719910/ltv-servicenow-itsm-implementation/capstone-configure-slas-and-reporting.mp4", durationLabel: "2 min 18 s" }),
      L(32, "capstone-wrap-up-and-cis-itsm-exam-alignment", "Capstone Wrap-Up & CIS-ITSM Exam Alignment", { contentDir: "ch08/32-capstone-wrap-up-and-cis-itsm-exam-alignment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792719971/ltv-servicenow-itsm-implementation/capstone-wrap-up-and-cis-itsm-exam-alignment.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
];
