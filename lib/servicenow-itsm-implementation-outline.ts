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
      L(1, "incident-table-and-state-model", "Incident Table & State Model"),
      L(2, "priority-impact-and-urgency", "Priority, Impact & Urgency"),
      L(3, "assignment-rules-and-assignment-groups", "Assignment Rules & Assignment Groups"),
      L(4, "major-incident-management", "Major Incident Management"),
      L(5, "incident-implementation-lab", "Incident Implementation Lab"),
    ],
  },
  {
    n: 2,
    title: "Implementing Problem Management",
    lessons: [
      L(6, "problem-table-and-its-relationship-to-incident", "Problem Table & Its Relationship to Incident"),
      L(7, "root-cause-analysis-fields-and-workflow", "Root-Cause Analysis Fields & Workflow"),
      L(8, "known-error-database", "Known Error Database"),
      L(9, "problem-implementation-lab", "Problem Implementation Lab"),
    ],
  },
  {
    n: 3,
    title: "Implementing Change Enablement",
    lessons: [
      L(10, "standard-normal-and-emergency-changes", "Standard, Normal & Emergency Changes"),
      L(11, "change-risk-assessment", "Change Risk Assessment"),
      L(12, "change-approval-workflows", "Change Approval Workflows"),
      L(13, "change-advisory-board-cab-configuration", "Change Advisory Board (CAB) Configuration"),
      L(14, "change-implementation-lab", "Change Implementation Lab"),
    ],
  },
  {
    n: 4,
    title: "Implementing Request Management",
    lessons: [
      L(15, "the-request-and-requested-item-tables", "The Request & Requested Item Tables"),
      L(16, "fulfillment-workflows", "Fulfillment Workflows"),
      L(17, "request-management-lab", "Request Management Lab"),
    ],
  },
  {
    n: 5,
    title: "Implementing Knowledge Management",
    lessons: [
      L(18, "knowledge-bases-and-articles", "Knowledge Bases & Articles"),
      L(19, "knowledge-article-approval-workflow", "Knowledge Article Approval Workflow"),
      L(20, "knowledge-article-feedback-and-retirement", "Knowledge Article Feedback & Retirement"),
      L(21, "knowledge-management-lab", "Knowledge Management Lab"),
    ],
  },
  {
    n: 6,
    title: "Service Level Management Implementation",
    lessons: [
      L(22, "sla-definitions-and-sla-conditions", "SLA Definitions & SLA Conditions"),
      L(23, "sla-workflows-pause-stop-breach", "SLA Workflows: Pause, Stop, Breach"),
      L(24, "sla-reporting", "SLA Reporting"),
      L(25, "sla-implementation-lab", "SLA Implementation Lab"),
    ],
  },
  {
    n: 7,
    title: "Service Portal & End-User Experience",
    lessons: [
      L(26, "service-portal-configuration-overview", "Service Portal Configuration: Overview"),
      L(27, "widgets-and-portal-pages", "Widgets & Portal Pages"),
      L(28, "service-portal-lab", "Service Portal Lab"),
    ],
  },
  {
    n: 8,
    title: "Capstone: Enterprise IT Service Desk",
    lessons: [
      L(29, "capstone-kickoff-service-desk-requirements", "Capstone Kickoff: Service Desk Requirements"),
      L(30, "capstone-configure-incident-problem-and-change-workflows", "Capstone: Configure Incident, Problem & Change Workflows"),
      L(31, "capstone-configure-slas-and-reporting", "Capstone: Configure SLAs & Reporting"),
      L(32, "capstone-wrap-up-and-cis-itsm-exam-alignment", "Capstone Wrap-Up & CIS-ITSM Exam Alignment"),
    ],
  },
];
