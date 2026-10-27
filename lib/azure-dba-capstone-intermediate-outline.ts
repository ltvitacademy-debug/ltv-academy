// Intermediate-tier capstone for the Azure Database Engineer path. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-dba-capstone-intermediate/
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

export const AZURE_DBA_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Two Departments, One Performance Problem",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Departments, One Slow System", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 50 s" }),
      L(2, "planning-the-performance-investigation", "Planning the Performance Investigation", { contentDir: "ch01/02-planning-the-performance-investigation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/planning-the-performance-investigation.mp4", durationLabel: "2 min 3 s" }),
      L(3, "querying-active-sessions-with-dmvs", "Querying Active Sessions With DMVs", { contentDir: "ch01/03-querying-active-sessions-with-dmvs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/querying-active-sessions-with-dmvs.mp4", durationLabel: "1 min 58 s" }),
      L(4, "finding-the-slow-queries", "Finding the Slow Queries", { contentDir: "ch01/04-finding-the-slow-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/finding-the-slow-queries.mp4", durationLabel: "1 min 53 s" }),
      L(5, "reading-an-execution-plan", "Reading an Execution Plan", { contentDir: "ch01/05-reading-an-execution-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/reading-an-execution-plan.mp4", durationLabel: "1 min 58 s" }),
      L(6, "diagnosing-a-missing-index", "Diagnosing a Missing Index", { contentDir: "ch01/06-diagnosing-a-missing-index", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/diagnosing-a-missing-index.mp4", durationLabel: "1 min 58 s" }),
      L(7, "creating-the-index-and-retesting", "Creating the Index and Re-Testing", { contentDir: "ch01/07-creating-the-index-and-retesting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/creating-the-index-and-retesting.mp4", durationLabel: "1 min 36 s" }),
      L(8, "diagnosing-a-blocking-chain", "Diagnosing a Blocking Chain", { contentDir: "ch01/08-diagnosing-a-blocking-chain", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/diagnosing-a-blocking-chain.mp4", durationLabel: "1 min 31 s" }),
      L(9, "fixing-the-blocking-issue", "Fixing the Blocking Issue", { contentDir: "ch01/09-fixing-the-blocking-issue", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/fixing-the-blocking-issue.mp4", durationLabel: "1 min 38 s" }),
      L(10, "automating-index-maintenance", "Automating Index Maintenance", { contentDir: "ch01/10-automating-index-maintenance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/automating-index-maintenance.mp4", durationLabel: "1 min 52 s" }),
      L(11, "scheduling-the-maintenance-job", "Scheduling the Maintenance Job", { contentDir: "ch01/11-scheduling-the-maintenance-job", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/scheduling-the-maintenance-job.mp4", durationLabel: "1 min 35 s" }),
      L(12, "building-a-monitoring-dashboard-query", "Building a Monitoring Dashboard Query", { contentDir: "ch01/12-building-a-monitoring-dashboard-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/building-a-monitoring-dashboard-query.mp4", durationLabel: "1 min 40 s" }),
      L(13, "a-new-slowdown-appears", "A New Slowdown Appears — Now What?", { contentDir: "ch01/13-a-new-slowdown-appears", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/a-new-slowdown-appears.mp4", durationLabel: "1 min 42 s" }),
      L(14, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/14-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "1 min 53 s" }),
      L(15, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/15-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 37 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
