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
      L(1, "what-data-quality-is", "What Data Quality Is", { contentDir: "ch01/01-what-data-quality-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431837/ltv-data-quality-management/what-data-quality-is.mp4", durationLabel: "1 min 43 s" }),
      L(2, "data-quality-dimensions", "Data Quality Dimensions", { contentDir: "ch01/02-data-quality-dimensions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435601/ltv-data-quality-management/data-quality-dimensions.mp4", durationLabel: "2 min 5 s" }),
      L(3, "business-impact-of-data-quality", "Business Impact of Data Quality", { contentDir: "ch01/03-business-impact-of-data-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435655/ltv-data-quality-management/business-impact-of-data-quality.mp4", durationLabel: "1 min 46 s" }),
      L(4, "data-quality-roles-and-responsibilities", "Data Quality Roles and Responsibilities", { contentDir: "ch01/04-data-quality-roles-and-responsibilities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432927/ltv-data-quality-management/data-quality-roles-and-responsibilities.mp4", durationLabel: "1 min 46 s" }),
      L(5, "the-data-quality-lifecycle", "The Data Quality Lifecycle", { contentDir: "ch01/05-the-data-quality-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433183/ltv-data-quality-management/the-data-quality-lifecycle.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Profiling",
    lessons: [
      L(6, "data-profiling-concepts", "Data Profiling Concepts", { contentDir: "ch02/06-data-profiling-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433418/ltv-data-quality-management/data-profiling-concepts.mp4", durationLabel: "1 min 54 s" }),
      L(7, "profiling-with-sql", "Profiling With SQL", { contentDir: "ch02/07-profiling-with-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433625/ltv-data-quality-management/profiling-with-sql.mp4", durationLabel: "1 min 53 s" }),
      L(8, "column-and-value-profiling", "Column and Value Profiling", { contentDir: "ch02/08-column-and-value-profiling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433839/ltv-data-quality-management/column-and-value-profiling.mp4", durationLabel: "2 min 15 s" }),
      L(9, "relationship-and-pattern-profiling", "Relationship and Pattern Profiling", { contentDir: "ch02/09-relationship-and-pattern-profiling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434057/ltv-data-quality-management/relationship-and-pattern-profiling.mp4", durationLabel: "2 min 16 s" }),
      L(10, "interpreting-profiling-results", "Interpreting Profiling Results", { contentDir: "ch02/10-interpreting-profiling-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435721/ltv-data-quality-management/interpreting-profiling-results.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 3,
    title: "The Quality Dimensions",
    lessons: [
      L(11, "accuracy", "Accuracy", { contentDir: "ch03/11-accuracy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435823/ltv-data-quality-management/accuracy.mp4", durationLabel: "1 min 58 s" }),
      L(12, "completeness", "Completeness", { contentDir: "ch03/12-completeness", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435911/ltv-data-quality-management/completeness.mp4", durationLabel: "1 min 46 s" }),
      L(13, "consistency", "Consistency", { contentDir: "ch03/13-consistency", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435982/ltv-data-quality-management/consistency.mp4", durationLabel: "1 min 35 s" }),
      L(14, "validity", "Validity", { contentDir: "ch03/14-validity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436068/ltv-data-quality-management/validity.mp4", durationLabel: "1 min 48 s" }),
      L(15, "uniqueness", "Uniqueness", { contentDir: "ch03/15-uniqueness", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436145/ltv-data-quality-management/uniqueness.mp4", durationLabel: "1 min 35 s" }),
      L(16, "timeliness", "Timeliness", { contentDir: "ch03/16-timeliness", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436220/ltv-data-quality-management/timeliness.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 4,
    title: "Rules and Checks",
    lessons: [
      L(17, "data-quality-rules", "Data Quality Rules", { contentDir: "ch04/17-data-quality-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436295/ltv-data-quality-management/data-quality-rules.mp4", durationLabel: "1 min 33 s" }),
      L(18, "writing-sql-data-quality-checks", "Writing SQL Data Quality Checks", { contentDir: "ch04/18-writing-sql-data-quality-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436377/ltv-data-quality-management/writing-sql-data-quality-checks.mp4", durationLabel: "1 min 48 s" }),
      L(19, "referential-integrity-checks", "Referential Integrity Checks", { contentDir: "ch04/19-referential-integrity-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436469/ltv-data-quality-management/referential-integrity-checks.mp4", durationLabel: "1 min 59 s" }),
      L(20, "cross-system-reconciliation-checks", "Cross-System Reconciliation Checks", { contentDir: "ch04/20-cross-system-reconciliation-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436556/ltv-data-quality-management/cross-system-reconciliation-checks.mp4", durationLabel: "1 min 45 s" }),
      L(21, "thresholds-and-tolerances", "Thresholds and Tolerances", { contentDir: "ch04/21-thresholds-and-tolerances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436640/ltv-data-quality-management/thresholds-and-tolerances.mp4", durationLabel: "1 min 42 s" }),
      L(22, "automating-quality-checks", "Automating Quality Checks", { contentDir: "ch04/22-automating-quality-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436740/ltv-data-quality-management/automating-quality-checks.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 5,
    title: "Remediation and Monitoring",
    lessons: [
      L(23, "root-cause-analysis", "Root Cause Analysis", { contentDir: "ch05/23-root-cause-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436817/ltv-data-quality-management/root-cause-analysis.mp4", durationLabel: "1 min 44 s" }),
      L(24, "data-cleansing-and-standardization", "Data Cleansing and Standardization", { contentDir: "ch05/24-data-cleansing-and-standardization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436898/ltv-data-quality-management/data-cleansing-and-standardization.mp4", durationLabel: "1 min 37 s" }),
      L(25, "remediation-workflows", "Remediation Workflows", { contentDir: "ch05/25-remediation-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436969/ltv-data-quality-management/remediation-workflows.mp4", durationLabel: "1 min 37 s" }),
      L(26, "data-quality-monitoring", "Data Quality Monitoring", { contentDir: "ch05/26-data-quality-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437037/ltv-data-quality-management/data-quality-monitoring.mp4", durationLabel: "1 min 32 s" }),
      L(27, "data-quality-scorecards-and-dashboards", "Data Quality Scorecards and Dashboards", { contentDir: "ch05/27-data-quality-scorecards-and-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437118/ltv-data-quality-management/data-quality-scorecards-and-dashboards.mp4", durationLabel: "1 min 38 s" }),
      L(28, "data-quality-issue-management", "Data Quality Issue Management", { contentDir: "ch05/28-data-quality-issue-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437190/ltv-data-quality-management/data-quality-issue-management.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 6,
    title: "Applied Data Quality",
    lessons: [
      L(29, "data-quality-case-study-customer-data", "Data Quality Case Study: Customer Data", { contentDir: "ch06/29-data-quality-case-study-customer-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437267/ltv-data-quality-management/data-quality-case-study-customer-data.mp4", durationLabel: "1 min 38 s" }),
      L(30, "data-quality-case-study-financial-data", "Data Quality Case Study: Financial Data", { contentDir: "ch06/30-data-quality-case-study-financial-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437359/ltv-data-quality-management/data-quality-case-study-financial-data.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
];
