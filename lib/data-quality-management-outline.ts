// The Data Quality Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

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
      L(1, "what-data-quality-is", "What Data Quality Is"),
      L(2, "data-quality-dimensions", "Data Quality Dimensions"),
      L(3, "business-impact-of-data-quality", "Business Impact of Data Quality"),
      L(4, "data-quality-roles-and-responsibilities", "Data Quality Roles and Responsibilities"),
      L(5, "the-data-quality-lifecycle", "The Data Quality Lifecycle"),
    ],
  },
  {
    n: 2,
    title: "Profiling",
    lessons: [
      L(6, "data-profiling-concepts", "Data Profiling Concepts"),
      L(7, "profiling-with-sql", "Profiling With SQL"),
      L(8, "column-and-value-profiling", "Column and Value Profiling"),
      L(9, "relationship-and-pattern-profiling", "Relationship and Pattern Profiling"),
      L(10, "interpreting-profiling-results", "Interpreting Profiling Results"),
    ],
  },
  {
    n: 3,
    title: "The Quality Dimensions",
    lessons: [
      L(11, "accuracy", "Accuracy"),
      L(12, "completeness", "Completeness"),
      L(13, "consistency", "Consistency"),
      L(14, "validity", "Validity"),
      L(15, "uniqueness", "Uniqueness"),
      L(16, "timeliness", "Timeliness"),
    ],
  },
  {
    n: 4,
    title: "Rules and Checks",
    lessons: [
      L(17, "data-quality-rules", "Data Quality Rules"),
      L(18, "writing-sql-data-quality-checks", "Writing SQL Data Quality Checks"),
      L(19, "referential-integrity-checks", "Referential Integrity Checks"),
      L(20, "cross-system-reconciliation-checks", "Cross-System Reconciliation Checks"),
      L(21, "thresholds-and-tolerances", "Thresholds and Tolerances"),
      L(22, "automating-quality-checks", "Automating Quality Checks"),
    ],
  },
  {
    n: 5,
    title: "Remediation and Monitoring",
    lessons: [
      L(23, "root-cause-analysis", "Root Cause Analysis"),
      L(24, "data-cleansing-and-standardization", "Data Cleansing and Standardization"),
      L(25, "remediation-workflows", "Remediation Workflows"),
      L(26, "data-quality-monitoring", "Data Quality Monitoring"),
      L(27, "data-quality-scorecards-and-dashboards", "Data Quality Scorecards and Dashboards"),
      L(28, "data-quality-issue-management", "Data Quality Issue Management"),
    ],
  },
  {
    n: 6,
    title: "Applied Data Quality",
    lessons: [
      L(29, "data-quality-case-study-customer-data", "Data Quality Case Study: Customer Data"),
      L(30, "data-quality-case-study-financial-data", "Data Quality Case Study: Financial Data"),
    ],
  },
];
