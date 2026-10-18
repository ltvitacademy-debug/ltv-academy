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
      L(1, "the-slow-request-log", "The Slow Request Log", { contentDir: "ch01/01-the-slow-request-log" }),
      L(2, "form-load-performance-and-ui-policy-overload", "Form-Load Performance & UI-Policy Overload", { contentDir: "ch01/02-form-load-performance-and-ui-policy-overload" }),
      L(3, "list-view-performance-and-related-lists", "List-View Performance & Related Lists", { contentDir: "ch01/03-list-view-performance-and-related-lists" }),
      L(4, "slow-forms-lab", "Slow Forms Lab", { contentDir: "ch01/04-slow-forms-lab" }),
    ],
  },
  {
    n: 2,
    title: "Diagnosing Slow Scripts",
    lessons: [
      L(5, "the-script-performance-profiler", "The Script Performance Profiler", { contentDir: "ch02/05-the-script-performance-profiler" }),
      L(6, "common-gliderecord-performance-mistakes", "Common GlideRecord Performance Mistakes", { contentDir: "ch02/06-common-gliderecord-performance-mistakes" }),
      L(7, "business-rule-loops-and-recursive-triggers", "Business Rule Loops & Recursive Triggers", { contentDir: "ch02/07-business-rule-loops-and-recursive-triggers" }),
      L(8, "slow-scripts-lab", "Slow Scripts Lab", { contentDir: "ch02/08-slow-scripts-lab" }),
    ],
  },
  {
    n: 3,
    title: "Database & Query Performance",
    lessons: [
      L(9, "indexes-on-the-platform", "Indexes on the Platform", { contentDir: "ch03/09-indexes-on-the-platform" }),
      L(10, "query-plan-basics-for-admins", "Query-Plan Basics for Admins", { contentDir: "ch03/10-query-plan-basics-for-admins" }),
      L(11, "database-performance-lab", "Database Performance Lab", { contentDir: "ch03/11-database-performance-lab" }),
    ],
  },
  {
    n: 4,
    title: "Instance Health & Monitoring",
    lessons: [
      L(12, "the-instance-health-dashboard", "The Instance Health Dashboard", { contentDir: "ch04/12-the-instance-health-dashboard" }),
      L(13, "semaphore-and-node-usage", "Semaphore & Node Usage", { contentDir: "ch04/13-semaphore-and-node-usage" }),
      L(14, "scheduled-job-contention", "Scheduled Job Contention", { contentDir: "ch04/14-scheduled-job-contention" }),
      L(15, "monitoring-lab", "Monitoring Lab", { contentDir: "ch04/15-monitoring-lab" }),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting Integrations & Flows in Production",
    lessons: [
      L(16, "diagnosing-a-failed-integration-in-production", "Diagnosing a Failed Integration in Production", { contentDir: "ch05/16-diagnosing-a-failed-integration-in-production" }),
      L(17, "diagnosing-a-stuck-or-failing-flow", "Diagnosing a Stuck or Failing Flow", { contentDir: "ch05/17-diagnosing-a-stuck-or-failing-flow" }),
      L(18, "integration-troubleshooting-lab", "Integration Troubleshooting Lab", { contentDir: "ch05/18-integration-troubleshooting-lab" }),
    ],
  },
  {
    n: 6,
    title: "Incident Response for Platform Issues",
    lessons: [
      L(19, "triaging-a-platform-wide-slowdown", "Triaging a Platform-Wide Slowdown", { contentDir: "ch06/19-triaging-a-platform-wide-slowdown" }),
      L(20, "working-with-servicenow-support", "Working With ServiceNow Support", { contentDir: "ch06/20-working-with-servicenow-support" }),
      L(21, "writing-a-platform-incident-postmortem", "Writing a Platform Incident Postmortem", { contentDir: "ch06/21-writing-a-platform-incident-postmortem" }),
      L(22, "incident-response-lab", "Incident Response Lab", { contentDir: "ch06/22-incident-response-lab" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: Diagnose & Fix a Realistic Performance Problem",
    lessons: [
      L(23, "capstone-kickoff-a-realistic-slow-instance-scenario", "Capstone Kickoff: a Realistic Slow-Instance Scenario", { contentDir: "ch07/23-capstone-kickoff-a-realistic-slow-instance-scenario" }),
      L(24, "capstone-diagnose-the-root-cause", "Capstone: Diagnose the Root Cause", { contentDir: "ch07/24-capstone-diagnose-the-root-cause" }),
      L(25, "capstone-wrap-up-and-prevention-plan", "Capstone Wrap-Up & Prevention Plan", { contentDir: "ch07/25-capstone-wrap-up-and-prevention-plan" }),
    ],
  },
];
