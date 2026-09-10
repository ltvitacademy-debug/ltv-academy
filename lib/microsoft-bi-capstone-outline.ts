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
      L(1, "capstone-kickoff-and-business-scenario", "Capstone Kickoff & Business Scenario"),
      L(2, "architecture-planning", "Architecture Planning: Raw Data to Reporting"),
    ],
  },
  {
    n: 2,
    title: "Building the Full Stack",
    lessons: [
      L(3, "loading-raw-data-with-sql-server", "Loading Raw Data With SQL Server"),
      L(4, "building-the-ssis-etl-package", "Building the SSIS ETL Package"),
      L(5, "staging-and-warehouse-tables", "Staging & Warehouse Tables"),
      L(6, "building-facts-and-dimensions", "Building Facts & Dimensions"),
      L(7, "an-ssrs-paginated-report", "An SSRS Paginated Report"),
      L(8, "a-power-bi-dashboard", "A Power BI Dashboard"),
      L(9, "connecting-ssrs-and-power-bi-to-the-same-warehouse", "Connecting SSRS & Power BI to the Same Warehouse"),
      L(10, "validating-the-full-pipeline", "Validating the Full Pipeline, End to End"),
      L(11, "handling-a-late-schema-change", "Handling a Late Schema Change"),
    ],
  },
  {
    n: 3,
    title: "Production Practices",
    lessons: [
      L(12, "deployment-across-ssis-ssrs-power-bi", "Deployment Across SSIS, SSRS & Power BI"),
      L(13, "scheduling-and-automation", "Scheduling & Automation"),
      L(14, "documenting-the-solution", "Documenting the Solution"),
      L(15, "basic-monitoring", "Basic Monitoring"),
    ],
  },
  {
    n: 4,
    title: "Job Preparation",
    lessons: [
      L(16, "building-your-resume-around-this-project", "Building Your Resume Around This Project"),
      L(17, "portfolio-presentation-strategy", "Portfolio Presentation Strategy"),
      L(18, "common-bi-developer-interview-questions", "Common Microsoft BI Developer Interview Questions"),
      L(19, "technical-interview-walkthrough", "Technical Interview Walkthrough"),
      L(20, "behavioral-interview-basics", "Behavioral Interview Basics"),
      L(21, "salary-negotiation-basics", "Salary Negotiation Basics"),
      L(22, "reading-job-postings-correctly", "Reading Job Postings Correctly"),
      L(23, "where-to-go-next", "Where to Go Next: An Overview of Advanced Tracks"),
    ],
  },
  {
    n: 5,
    title: "Wrap-Up",
    lessons: [
      L(24, "presenting-your-capstone", "Presenting Your Capstone"),
      L(25, "final-wrap-up", "Final Wrap-Up & Next Steps"),
    ],
  },
];
