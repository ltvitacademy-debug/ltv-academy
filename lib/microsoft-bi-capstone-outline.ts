// The full Microsoft Data & BI Capstone + Job Preparation course outline.
// Only lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Ties SQL Server, SSIS, SSRS, Power BI, and
// data warehousing into one working stack, then closes with job
// preparation — this is the last course in the Microsoft Data & BI
// Developer program, the point where the whole foundation becomes a
// portfolio and a job search.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-bi-capstone/
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

export const MICROSOFT_BI_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "capstone-kickoff-and-business-scenario", "Capstone Kickoff & Business Scenario", { contentDir: "ch01/01-capstone-kickoff-and-business-scenario", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/capstone-kickoff-and-business-scenario.mp4", durationLabel: "1 min 15 s" }),
      L(2, "architecture-planning", "Architecture Planning: Raw Data to Reporting", { contentDir: "ch01/02-architecture-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/architecture-planning.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 2,
    title: "Building the Full Stack",
    lessons: [
      L(3, "loading-raw-data-with-sql-server", "Loading Raw Data With SQL Server", { contentDir: "ch02/03-loading-raw-data-with-sql-server", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/loading-raw-data-with-sql-server.mp4", durationLabel: "1 min 33 s" }),
      L(4, "building-the-ssis-etl-package", "Building the SSIS ETL Package", { contentDir: "ch02/04-building-the-ssis-etl-package", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/building-the-ssis-etl-package.mp4", durationLabel: "1 min 37 s" }),
      L(5, "staging-and-warehouse-tables", "Staging & Warehouse Tables", { contentDir: "ch02/05-staging-and-warehouse-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/staging-and-warehouse-tables.mp4", durationLabel: "1 min 31 s" }),
      L(6, "building-facts-and-dimensions", "Building Facts & Dimensions", { contentDir: "ch02/06-building-facts-and-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/building-facts-and-dimensions.mp4", durationLabel: "1 min 48 s" }),
      L(7, "an-ssrs-paginated-report", "An SSRS Paginated Report", { contentDir: "ch02/07-an-ssrs-paginated-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/an-ssrs-paginated-report.mp4", durationLabel: "1 min 38 s" }),
      L(8, "a-power-bi-dashboard", "A Power BI Dashboard", { contentDir: "ch02/08-a-power-bi-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/a-power-bi-dashboard.mp4", durationLabel: "1 min 36 s" }),
      L(9, "connecting-ssrs-and-power-bi-to-the-same-warehouse", "Connecting SSRS & Power BI to the Same Warehouse", { contentDir: "ch02/09-connecting-ssrs-and-power-bi-to-the-same-warehouse", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/connecting-ssrs-and-power-bi-to-the-same-warehouse.mp4", durationLabel: "1 min 18 s" }),
      L(10, "validating-the-full-pipeline", "Validating the Full Pipeline, End to End", { contentDir: "ch02/10-validating-the-full-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/validating-the-full-pipeline.mp4", durationLabel: "1 min 28 s" }),
      L(11, "handling-a-late-schema-change", "Handling a Late Schema Change", { contentDir: "ch02/11-handling-a-late-schema-change", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/handling-a-late-schema-change.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 3,
    title: "Production Practices",
    lessons: [
      L(12, "deployment-across-ssis-ssrs-power-bi", "Deployment Across SSIS, SSRS & Power BI", { contentDir: "ch03/12-deployment-across-ssis-ssrs-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/deployment-across-ssis-ssrs-power-bi.mp4", durationLabel: "1 min 31 s" }),
      L(13, "scheduling-and-automation", "Scheduling & Automation", { contentDir: "ch03/13-scheduling-and-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/scheduling-and-automation.mp4", durationLabel: "1 min 42 s" }),
      L(14, "documenting-the-solution", "Documenting the Solution", { contentDir: "ch03/14-documenting-the-solution", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/documenting-the-solution.mp4", durationLabel: "1 min 32 s" }),
      L(15, "basic-monitoring", "Basic Monitoring", { contentDir: "ch03/15-basic-monitoring", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/basic-monitoring.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 4,
    title: "Job Preparation",
    lessons: [
      L(16, "building-your-resume-around-this-project", "Building Your Resume Around This Project", { contentDir: "ch04/16-building-your-resume-around-this-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/building-your-resume-around-this-project.mp4", durationLabel: "1 min 30 s" }),
      L(17, "portfolio-presentation-strategy", "Portfolio Presentation Strategy", { contentDir: "ch04/17-portfolio-presentation-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/portfolio-presentation-strategy.mp4", durationLabel: "1 min 19 s" }),
      L(18, "version-controlling-your-capstone", "Version-Controlling Your Capstone", { contentDir: "ch04/18-version-controlling-your-capstone", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/version-controlling-your-capstone.mp4", durationLabel: "2 min 15 s" }),
      L(19, "common-bi-developer-interview-questions", "Common Microsoft BI Developer Interview Questions", { contentDir: "ch04/19-common-bi-developer-interview-questions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/common-bi-developer-interview-questions.mp4", durationLabel: "1 min 14 s" }),
      L(20, "technical-interview-walkthrough", "Technical Interview Walkthrough", { contentDir: "ch04/20-technical-interview-walkthrough", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/technical-interview-walkthrough.mp4", durationLabel: "1 min 24 s" }),
      L(21, "behavioral-interview-basics", "Behavioral Interview Basics", { contentDir: "ch04/21-behavioral-interview-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/behavioral-interview-basics.mp4", durationLabel: "1 min 21 s" }),
      L(22, "salary-negotiation-basics", "Salary Negotiation Basics", { contentDir: "ch04/22-salary-negotiation-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/salary-negotiation-basics.mp4", durationLabel: "1 min 20 s" }),
      L(23, "reading-job-postings-correctly", "Reading Job Postings Correctly", { contentDir: "ch04/23-reading-job-postings-correctly", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/reading-job-postings-correctly.mp4", durationLabel: "1 min 25 s" }),
      L(24, "where-to-go-next", "Where to Go Next: An Overview of Advanced Tracks", { contentDir: "ch04/24-where-to-go-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/where-to-go-next.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 5,
    title: "Wrap-Up",
    lessons: [
      L(25, "presenting-your-capstone", "Presenting Your Capstone", { contentDir: "ch05/25-presenting-your-capstone", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/presenting-your-capstone.mp4", durationLabel: "1 min 16 s" }),
      L(26, "final-wrap-up", "Final Wrap-Up & Next Steps", { contentDir: "ch05/26-final-wrap-up", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone/final-wrap-up.mp4", durationLabel: "1 min 8 s" }),
    ],
  },
];
