// The Data Quality Management course outline. Part of the Data Governance
// career path. Content-complete (guide, slides, quiz) as of 2026-10-04; no
// narrated video yet.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-quality-management/
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

export const GOV_DATA_QUALITY_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Foundations",
    lessons: [
      L(1, "what-data-quality-is", "What Data Quality Is", { contentDir: "ch01/01-what-data-quality-is" }),
      L(2, "data-quality-dimensions", "Data Quality Dimensions", { contentDir: "ch01/02-data-quality-dimensions" }),
      L(3, "business-impact-of-data-quality", "Business Impact of Data Quality", { contentDir: "ch01/03-business-impact-of-data-quality" }),
      L(4, "data-quality-roles-and-responsibilities", "Data Quality Roles and Responsibilities", { contentDir: "ch01/04-data-quality-roles-and-responsibilities" }),
      L(5, "the-data-quality-lifecycle", "The Data Quality Lifecycle", { contentDir: "ch01/05-the-data-quality-lifecycle" }),
    ],
  },
  {
    n: 2,
    title: "Profiling",
    lessons: [
      L(6, "data-profiling-concepts", "Data Profiling Concepts", { contentDir: "ch02/06-data-profiling-concepts" }),
      L(7, "profiling-with-sql", "Profiling With SQL", { contentDir: "ch02/07-profiling-with-sql" }),
      L(8, "column-and-value-profiling", "Column and Value Profiling", { contentDir: "ch02/08-column-and-value-profiling" }),
      L(9, "relationship-and-pattern-profiling", "Relationship and Pattern Profiling", { contentDir: "ch02/09-relationship-and-pattern-profiling" }),
      L(10, "interpreting-profiling-results", "Interpreting Profiling Results", { contentDir: "ch02/10-interpreting-profiling-results" }),
    ],
  },
  {
    n: 3,
    title: "The Quality Dimensions",
    lessons: [
      L(11, "accuracy", "Accuracy", { contentDir: "ch03/11-accuracy" }),
      L(12, "completeness", "Completeness", { contentDir: "ch03/12-completeness" }),
      L(13, "consistency", "Consistency", { contentDir: "ch03/13-consistency" }),
      L(14, "validity", "Validity", { contentDir: "ch03/14-validity" }),
      L(15, "uniqueness", "Uniqueness", { contentDir: "ch03/15-uniqueness" }),
      L(16, "timeliness", "Timeliness", { contentDir: "ch03/16-timeliness" }),
    ],
  },
  {
    n: 4,
    title: "Rules and Checks",
    lessons: [
      L(17, "data-quality-rules", "Data Quality Rules", { contentDir: "ch04/17-data-quality-rules" }),
      L(18, "writing-sql-data-quality-checks", "Writing SQL Data Quality Checks", { contentDir: "ch04/18-writing-sql-data-quality-checks" }),
      L(19, "referential-integrity-checks", "Referential Integrity Checks", { contentDir: "ch04/19-referential-integrity-checks" }),
      L(20, "cross-system-reconciliation-checks", "Cross-System Reconciliation Checks", { contentDir: "ch04/20-cross-system-reconciliation-checks" }),
      L(21, "thresholds-and-tolerances", "Thresholds and Tolerances", { contentDir: "ch04/21-thresholds-and-tolerances" }),
      L(22, "automating-quality-checks", "Automating Quality Checks", { contentDir: "ch04/22-automating-quality-checks" }),
    ],
  },
  {
    n: 5,
    title: "Remediation and Monitoring",
    lessons: [
      L(23, "root-cause-analysis", "Root Cause Analysis", { contentDir: "ch05/23-root-cause-analysis" }),
      L(24, "data-cleansing-and-standardization", "Data Cleansing and Standardization", { contentDir: "ch05/24-data-cleansing-and-standardization" }),
      L(25, "remediation-workflows", "Remediation Workflows", { contentDir: "ch05/25-remediation-workflows" }),
      L(26, "data-quality-monitoring", "Data Quality Monitoring", { contentDir: "ch05/26-data-quality-monitoring" }),
      L(27, "data-quality-scorecards-and-dashboards", "Data Quality Scorecards and Dashboards", { contentDir: "ch05/27-data-quality-scorecards-and-dashboards" }),
      L(28, "data-quality-issue-management", "Data Quality Issue Management", { contentDir: "ch05/28-data-quality-issue-management" }),
    ],
  },
  {
    n: 6,
    title: "Applied Data Quality",
    lessons: [
      L(29, "data-quality-case-study-customer-data", "Data Quality Case Study: Customer Data", { contentDir: "ch06/29-data-quality-case-study-customer-data" }),
      L(30, "data-quality-case-study-financial-data", "Data Quality Case Study: Financial Data", { contentDir: "ch06/30-data-quality-case-study-financial-data" }),
    ],
  },
];
