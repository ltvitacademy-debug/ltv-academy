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
      L(1, "incident-table-and-state-model", "Incident Table & State Model", { contentDir: "ch01/01-incident-table-and-state-model" }),
      L(2, "priority-impact-and-urgency", "Priority, Impact & Urgency", { contentDir: "ch01/02-priority-impact-and-urgency" }),
      L(3, "assignment-rules-and-assignment-groups", "Assignment Rules & Assignment Groups", { contentDir: "ch01/03-assignment-rules-and-assignment-groups" }),
      L(4, "major-incident-management", "Major Incident Management", { contentDir: "ch01/04-major-incident-management" }),
      L(5, "incident-implementation-lab", "Incident Implementation Lab", { contentDir: "ch01/05-incident-implementation-lab" }),
    ],
  },
  {
    n: 2,
    title: "Implementing Problem Management",
    lessons: [
      L(6, "problem-table-and-its-relationship-to-incident", "Problem Table & Its Relationship to Incident", { contentDir: "ch02/06-problem-table-and-its-relationship-to-incident" }),
      L(7, "root-cause-analysis-fields-and-workflow", "Root-Cause Analysis Fields & Workflow", { contentDir: "ch02/07-root-cause-analysis-fields-and-workflow" }),
      L(8, "known-error-database", "Known Error Database", { contentDir: "ch02/08-known-error-database" }),
      L(9, "problem-implementation-lab", "Problem Implementation Lab", { contentDir: "ch02/09-problem-implementation-lab" }),
    ],
  },
  {
    n: 3,
    title: "Implementing Change Enablement",
    lessons: [
      L(10, "standard-normal-and-emergency-changes", "Standard, Normal & Emergency Changes", { contentDir: "ch03/10-standard-normal-and-emergency-changes" }),
      L(11, "change-risk-assessment", "Change Risk Assessment", { contentDir: "ch03/11-change-risk-assessment" }),
      L(12, "change-approval-workflows", "Change Approval Workflows", { contentDir: "ch03/12-change-approval-workflows" }),
      L(13, "change-advisory-board-cab-configuration", "Change Advisory Board (CAB) Configuration", { contentDir: "ch03/13-change-advisory-board-cab-configuration" }),
      L(14, "change-implementation-lab", "Change Implementation Lab", { contentDir: "ch03/14-change-implementation-lab" }),
    ],
  },
  {
    n: 4,
    title: "Implementing Request Management",
    lessons: [
      L(15, "the-request-and-requested-item-tables", "The Request & Requested Item Tables", { contentDir: "ch04/15-the-request-and-requested-item-tables" }),
      L(16, "fulfillment-workflows", "Fulfillment Workflows", { contentDir: "ch04/16-fulfillment-workflows" }),
      L(17, "request-management-lab", "Request Management Lab", { contentDir: "ch04/17-request-management-lab" }),
    ],
  },
  {
    n: 5,
    title: "Implementing Knowledge Management",
    lessons: [
      L(18, "knowledge-bases-and-articles", "Knowledge Bases & Articles", { contentDir: "ch05/18-knowledge-bases-and-articles" }),
      L(19, "knowledge-article-approval-workflow", "Knowledge Article Approval Workflow", { contentDir: "ch05/19-knowledge-article-approval-workflow" }),
      L(20, "knowledge-article-feedback-and-retirement", "Knowledge Article Feedback & Retirement", { contentDir: "ch05/20-knowledge-article-feedback-and-retirement" }),
      L(21, "knowledge-management-lab", "Knowledge Management Lab", { contentDir: "ch05/21-knowledge-management-lab" }),
    ],
  },
  {
    n: 6,
    title: "Service Level Management Implementation",
    lessons: [
      L(22, "sla-definitions-and-sla-conditions", "SLA Definitions & SLA Conditions", { contentDir: "ch06/22-sla-definitions-and-sla-conditions" }),
      L(23, "sla-workflows-pause-stop-breach", "SLA Workflows: Pause, Stop, Breach", { contentDir: "ch06/23-sla-workflows-pause-stop-breach" }),
      L(24, "sla-reporting", "SLA Reporting", { contentDir: "ch06/24-sla-reporting" }),
      L(25, "sla-implementation-lab", "SLA Implementation Lab", { contentDir: "ch06/25-sla-implementation-lab" }),
    ],
  },
  {
    n: 7,
    title: "Service Portal & End-User Experience",
    lessons: [
      L(26, "service-portal-configuration-overview", "Service Portal Configuration: Overview", { contentDir: "ch07/26-service-portal-configuration-overview" }),
      L(27, "widgets-and-portal-pages", "Widgets & Portal Pages", { contentDir: "ch07/27-widgets-and-portal-pages" }),
      L(28, "service-portal-lab", "Service Portal Lab", { contentDir: "ch07/28-service-portal-lab" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Enterprise IT Service Desk",
    lessons: [
      L(29, "capstone-kickoff-service-desk-requirements", "Capstone Kickoff: Service Desk Requirements", { contentDir: "ch08/29-capstone-kickoff-service-desk-requirements" }),
      L(30, "capstone-configure-incident-problem-and-change-workflows", "Capstone: Configure Incident, Problem & Change Workflows", { contentDir: "ch08/30-capstone-configure-incident-problem-and-change-workflows" }),
      L(31, "capstone-configure-slas-and-reporting", "Capstone: Configure SLAs & Reporting", { contentDir: "ch08/31-capstone-configure-slas-and-reporting" }),
      L(32, "capstone-wrap-up-and-cis-itsm-exam-alignment", "Capstone Wrap-Up & CIS-ITSM Exam Alignment", { contentDir: "ch08/32-capstone-wrap-up-and-cis-itsm-exam-alignment" }),
    ],
  },
];
