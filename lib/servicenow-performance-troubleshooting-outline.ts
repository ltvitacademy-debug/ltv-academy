// ServiceNow Performance & Troubleshooting course outline. Lessons without a contentDir render
// as "in production". Course 12 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: diagnosing slow forms, slow scripts, and real production incidents on the platform.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-performance-troubleshooting/
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

export const SERVICENOW_PERFORMANCE_TROUBLESHOOTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Diagnosing Slow Forms & Lists",
    lessons: [
      L(1, "the-slow-request-log", "The Slow Request Log"),
      L(2, "form-load-performance-and-ui-policy-overload", "Form-Load Performance & UI-Policy Overload"),
      L(3, "list-view-performance-and-related-lists", "List-View Performance & Related Lists"),
      L(4, "slow-forms-lab", "Slow Forms Lab"),
    ],
  },
  {
    n: 2,
    title: "Diagnosing Slow Scripts",
    lessons: [
      L(5, "the-script-performance-profiler", "The Script Performance Profiler"),
      L(6, "common-gliderecord-performance-mistakes", "Common GlideRecord Performance Mistakes"),
      L(7, "business-rule-loops-and-recursive-triggers", "Business Rule Loops & Recursive Triggers"),
      L(8, "slow-scripts-lab", "Slow Scripts Lab"),
    ],
  },
  {
    n: 3,
    title: "Database & Query Performance",
    lessons: [
      L(9, "indexes-on-the-platform", "Indexes on the Platform"),
      L(10, "query-plan-basics-for-admins", "Query-Plan Basics for Admins"),
      L(11, "database-performance-lab", "Database Performance Lab"),
    ],
  },
  {
    n: 4,
    title: "Instance Health & Monitoring",
    lessons: [
      L(12, "the-instance-health-dashboard", "The Instance Health Dashboard"),
      L(13, "semaphore-and-node-usage", "Semaphore & Node Usage"),
      L(14, "scheduled-job-contention", "Scheduled Job Contention"),
      L(15, "monitoring-lab", "Monitoring Lab"),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting Integrations & Flows in Production",
    lessons: [
      L(16, "diagnosing-a-failed-integration-in-production", "Diagnosing a Failed Integration in Production"),
      L(17, "diagnosing-a-stuck-or-failing-flow", "Diagnosing a Stuck or Failing Flow"),
      L(18, "integration-troubleshooting-lab", "Integration Troubleshooting Lab"),
    ],
  },
  {
    n: 6,
    title: "Incident Response for Platform Issues",
    lessons: [
      L(19, "triaging-a-platform-wide-slowdown", "Triaging a Platform-Wide Slowdown"),
      L(20, "working-with-servicenow-support", "Working With ServiceNow Support"),
      L(21, "writing-a-platform-incident-postmortem", "Writing a Platform Incident Postmortem"),
      L(22, "incident-response-lab", "Incident Response Lab"),
    ],
  },
  {
    n: 7,
    title: "Capstone: Diagnose & Fix a Realistic Performance Problem",
    lessons: [
      L(23, "capstone-kickoff-a-realistic-slow-instance-scenario", "Capstone Kickoff: a Realistic Slow-Instance Scenario"),
      L(24, "capstone-diagnose-the-root-cause", "Capstone: Diagnose the Root Cause"),
      L(25, "capstone-wrap-up-and-prevention-plan", "Capstone Wrap-Up & Prevention Plan"),
    ],
  },
];
