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
      L(1, "the-slow-request-log", "The Slow Request Log", { contentDir: "ch01/01-the-slow-request-log", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728450/ltv-servicenow-performance-troubleshooting/the-slow-request-log.mp4", durationLabel: "2 min 17 s" }),
      L(2, "form-load-performance-and-ui-policy-overload", "Form-Load Performance & UI-Policy Overload", { contentDir: "ch01/02-form-load-performance-and-ui-policy-overload", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728522/ltv-servicenow-performance-troubleshooting/form-load-performance-and-ui-policy-overload.mp4", durationLabel: "2 min 34 s" }),
      L(3, "list-view-performance-and-related-lists", "List-View Performance & Related Lists", { contentDir: "ch01/03-list-view-performance-and-related-lists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728596/ltv-servicenow-performance-troubleshooting/list-view-performance-and-related-lists.mp4", durationLabel: "2 min 36 s" }),
      L(4, "slow-forms-lab", "Slow Forms Lab", { contentDir: "ch01/04-slow-forms-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728670/ltv-servicenow-performance-troubleshooting/slow-forms-lab.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "Diagnosing Slow Scripts",
    lessons: [
      L(5, "the-script-performance-profiler", "The Script Performance Profiler", { contentDir: "ch02/05-the-script-performance-profiler", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728743/ltv-servicenow-performance-troubleshooting/the-script-performance-profiler.mp4", durationLabel: "2 min 37 s" }),
      L(6, "common-gliderecord-performance-mistakes", "Common GlideRecord Performance Mistakes", { contentDir: "ch02/06-common-gliderecord-performance-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728810/ltv-servicenow-performance-troubleshooting/common-gliderecord-performance-mistakes.mp4", durationLabel: "2 min 21 s" }),
      L(7, "business-rule-loops-and-recursive-triggers", "Business Rule Loops & Recursive Triggers", { contentDir: "ch02/07-business-rule-loops-and-recursive-triggers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728874/ltv-servicenow-performance-troubleshooting/business-rule-loops-and-recursive-triggers.mp4", durationLabel: "2 min 16 s" }),
      L(8, "slow-scripts-lab", "Slow Scripts Lab", { contentDir: "ch02/08-slow-scripts-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792728946/ltv-servicenow-performance-troubleshooting/slow-scripts-lab.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 3,
    title: "Database & Query Performance",
    lessons: [
      L(9, "indexes-on-the-platform", "Indexes on the Platform", { contentDir: "ch03/09-indexes-on-the-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729014/ltv-servicenow-performance-troubleshooting/indexes-on-the-platform.mp4", durationLabel: "2 min 27 s" }),
      L(10, "query-plan-basics-for-admins", "Query-Plan Basics for Admins", { contentDir: "ch03/10-query-plan-basics-for-admins", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729074/ltv-servicenow-performance-troubleshooting/query-plan-basics-for-admins.mp4", durationLabel: "2 min 15 s" }),
      L(11, "database-performance-lab", "Database Performance Lab", { contentDir: "ch03/11-database-performance-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729139/ltv-servicenow-performance-troubleshooting/database-performance-lab.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 4,
    title: "Instance Health & Monitoring",
    lessons: [
      L(12, "the-instance-health-dashboard", "The Instance Health Dashboard", { contentDir: "ch04/12-the-instance-health-dashboard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729206/ltv-servicenow-performance-troubleshooting/the-instance-health-dashboard.mp4", durationLabel: "2 min 31 s" }),
      L(13, "semaphore-and-node-usage", "Semaphore & Node Usage", { contentDir: "ch04/13-semaphore-and-node-usage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729264/ltv-servicenow-performance-troubleshooting/semaphore-and-node-usage.mp4", durationLabel: "2 min 14 s" }),
      L(14, "scheduled-job-contention", "Scheduled Job Contention", { contentDir: "ch04/14-scheduled-job-contention", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729323/ltv-servicenow-performance-troubleshooting/scheduled-job-contention.mp4", durationLabel: "2 min 12 s" }),
      L(15, "monitoring-lab", "Monitoring Lab", { contentDir: "ch04/15-monitoring-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729388/ltv-servicenow-performance-troubleshooting/monitoring-lab.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting Integrations & Flows in Production",
    lessons: [
      L(16, "diagnosing-a-failed-integration-in-production", "Diagnosing a Failed Integration in Production", { contentDir: "ch05/16-diagnosing-a-failed-integration-in-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729457/ltv-servicenow-performance-troubleshooting/diagnosing-a-failed-integration-in-production.mp4", durationLabel: "2 min 41 s" }),
      L(17, "diagnosing-a-stuck-or-failing-flow", "Diagnosing a Stuck or Failing Flow", { contentDir: "ch05/17-diagnosing-a-stuck-or-failing-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729520/ltv-servicenow-performance-troubleshooting/diagnosing-a-stuck-or-failing-flow.mp4", durationLabel: "2 min 29 s" }),
      L(18, "integration-troubleshooting-lab", "Integration Troubleshooting Lab", { contentDir: "ch05/18-integration-troubleshooting-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729597/ltv-servicenow-performance-troubleshooting/integration-troubleshooting-lab.mp4", durationLabel: "3 min 1 s" }),
    ],
  },
  {
    n: 6,
    title: "Incident Response for Platform Issues",
    lessons: [
      L(19, "triaging-a-platform-wide-slowdown", "Triaging a Platform-Wide Slowdown", { contentDir: "ch06/19-triaging-a-platform-wide-slowdown", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729656/ltv-servicenow-performance-troubleshooting/triaging-a-platform-wide-slowdown.mp4", durationLabel: "2 min 18 s" }),
      L(20, "working-with-servicenow-support", "Working With ServiceNow Support", { contentDir: "ch06/20-working-with-servicenow-support", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729717/ltv-servicenow-performance-troubleshooting/working-with-servicenow-support.mp4", durationLabel: "2 min 23 s" }),
      L(21, "writing-a-platform-incident-postmortem", "Writing a Platform Incident Postmortem", { contentDir: "ch06/21-writing-a-platform-incident-postmortem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729778/ltv-servicenow-performance-troubleshooting/writing-a-platform-incident-postmortem.mp4", durationLabel: "2 min 18 s" }),
      L(22, "incident-response-lab", "Incident Response Lab", { contentDir: "ch06/22-incident-response-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729843/ltv-servicenow-performance-troubleshooting/incident-response-lab.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: Diagnose & Fix a Realistic Performance Problem",
    lessons: [
      L(23, "capstone-kickoff-a-realistic-slow-instance-scenario", "Capstone Kickoff: a Realistic Slow-Instance Scenario", { contentDir: "ch07/23-capstone-kickoff-a-realistic-slow-instance-scenario", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729915/ltv-servicenow-performance-troubleshooting/capstone-kickoff-a-realistic-slow-instance-scenario.mp4", durationLabel: "2 min 46 s" }),
      L(24, "capstone-diagnose-the-root-cause", "Capstone: Diagnose the Root Cause", { contentDir: "ch07/24-capstone-diagnose-the-root-cause", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792729971/ltv-servicenow-performance-troubleshooting/capstone-diagnose-the-root-cause.mp4", durationLabel: "2 min 8 s" }),
      L(25, "capstone-wrap-up-and-prevention-plan", "Capstone Wrap-Up & Prevention Plan", { contentDir: "ch07/25-capstone-wrap-up-and-prevention-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792730032/ltv-servicenow-performance-troubleshooting/capstone-wrap-up-and-prevention-plan.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
];
