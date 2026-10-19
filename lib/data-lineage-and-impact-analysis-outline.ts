// The Data Lineage & Impact Analysis course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-lineage-and-impact-analysis/
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

export const GOV_DATA_LINEAGE_AND_IMPACT_ANALYSIS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Lineage Concepts",
    lessons: [
      L(1, "what-data-lineage-is", "What Data Lineage Is", { contentDir: "ch01/01-what-data-lineage-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408308/ltv-data-lineage-and-impact-analysis/what-data-lineage-is.mp4", durationLabel: "1:41" }),
      L(2, "why-lineage-matters", "Why Lineage Matters", { contentDir: "ch01/02-why-lineage-matters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408576/ltv-data-lineage-and-impact-analysis/why-lineage-matters.mp4", durationLabel: "1:30" }),
      L(3, "business-vs-technical-lineage", "Business vs. Technical Lineage", { contentDir: "ch01/03-business-vs-technical-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408708/ltv-data-lineage-and-impact-analysis/business-vs-technical-lineage.mp4", durationLabel: "1:22" }),
      L(4, "column-level-vs-table-level-lineage", "Column-Level vs. Table-Level Lineage", { contentDir: "ch01/04-column-level-vs-table-level-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408870/ltv-data-lineage-and-impact-analysis/column-level-vs-table-level-lineage.mp4", durationLabel: "1:24" }),
      L(5, "lineage-standards-and-approaches", "Lineage Standards and Approaches", { contentDir: "ch01/05-lineage-standards-and-approaches", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409042/ltv-data-lineage-and-impact-analysis/lineage-standards-and-approaches.mp4", durationLabel: "1:41" }),
    ],
  },
  {
    n: 2,
    title: "Tracing Data",
    lessons: [
      L(6, "source-systems-and-extraction", "Source Systems and Extraction", { contentDir: "ch02/06-source-systems-and-extraction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409215/ltv-data-lineage-and-impact-analysis/source-systems-and-extraction.mp4", durationLabel: "1:32" }),
      L(7, "etl-and-elt-lineage", "ETL and ELT Lineage", { contentDir: "ch02/07-etl-and-elt-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409372/ltv-data-lineage-and-impact-analysis/etl-and-elt-lineage.mp4", durationLabel: "1:22" }),
      L(8, "lineage-through-data-lakes-and-warehouses", "Lineage Through Data Lakes and Warehouses", { contentDir: "ch02/08-lineage-through-data-lakes-and-warehouses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409534/ltv-data-lineage-and-impact-analysis/lineage-through-data-lakes-and-warehouses.mp4", durationLabel: "1:32" }),
      L(9, "lineage-through-semantic-models", "Lineage Through Semantic Models", { contentDir: "ch02/09-lineage-through-semantic-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409667/ltv-data-lineage-and-impact-analysis/lineage-through-semantic-models.mp4", durationLabel: "1:16" }),
      L(10, "lineage-into-power-bi", "Lineage Into Power BI", { contentDir: "ch02/10-lineage-into-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409846/ltv-data-lineage-and-impact-analysis/lineage-into-power-bi.mp4", durationLabel: "1:30" }),
      L(11, "lineage-to-executive-dashboards", "Lineage to Executive Dashboards", { contentDir: "ch02/11-lineage-to-executive-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409999/ltv-data-lineage-and-impact-analysis/lineage-to-executive-dashboards.mp4", durationLabel: "1:33" }),
    ],
  },
  {
    n: 3,
    title: "Dependencies and Impact",
    lessons: [
      L(12, "upstream-and-downstream-dependencies", "Upstream and Downstream Dependencies", { contentDir: "ch03/12-upstream-and-downstream-dependencies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410168/ltv-data-lineage-and-impact-analysis/upstream-and-downstream-dependencies.mp4", durationLabel: "1:30" }),
      L(13, "transformations-and-business-rules", "Transformations and Business Rules", { contentDir: "ch03/13-transformations-and-business-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410338/ltv-data-lineage-and-impact-analysis/transformations-and-business-rules.mp4", durationLabel: "1:26" }),
      L(14, "impact-analysis", "Impact Analysis", { contentDir: "ch03/14-impact-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410516/ltv-data-lineage-and-impact-analysis/impact-analysis.mp4", durationLabel: "1:27" }),
      L(15, "change-impact-assessment", "Change Impact Assessment", { contentDir: "ch03/15-change-impact-assessment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410692/ltv-data-lineage-and-impact-analysis/change-impact-assessment.mp4", durationLabel: "1:27" }),
      L(16, "lineage-for-root-cause-analysis", "Lineage for Root Cause Analysis", { contentDir: "ch03/16-lineage-for-root-cause-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410866/ltv-data-lineage-and-impact-analysis/lineage-for-root-cause-analysis.mp4", durationLabel: "1:22" }),
    ],
  },
  {
    n: 4,
    title: "Documenting Lineage",
    lessons: [
      L(17, "lineage-documentation", "Lineage Documentation", { contentDir: "ch04/17-lineage-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411009/ltv-data-lineage-and-impact-analysis/lineage-documentation.mp4", durationLabel: "1:23" }),
      L(18, "lineage-diagrams", "Lineage Diagrams", { contentDir: "ch04/18-lineage-diagrams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411163/ltv-data-lineage-and-impact-analysis/lineage-diagrams.mp4", durationLabel: "1:21" }),
      L(19, "automated-vs-manual-lineage", "Automated vs. Manual Lineage", { contentDir: "ch04/19-automated-vs-manual-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411316/ltv-data-lineage-and-impact-analysis/automated-vs-manual-lineage.mp4", durationLabel: "1:19" }),
      L(20, "lineage-tools-overview", "Lineage Tools Overview", { contentDir: "ch04/20-lineage-tools-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411503/ltv-data-lineage-and-impact-analysis/lineage-tools-overview.mp4", durationLabel: "1:25" }),
      L(21, "maintaining-lineage", "Maintaining Lineage", { contentDir: "ch04/21-maintaining-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411633/ltv-data-lineage-and-impact-analysis/maintaining-lineage.mp4", durationLabel: "1:17" }),
    ],
  },
  {
    n: 5,
    title: "Applied Lineage",
    lessons: [
      L(22, "lineage-case-study-a-revenue-report", "Lineage Case Study: A Revenue Report", { contentDir: "ch05/22-lineage-case-study-a-revenue-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411812/ltv-data-lineage-and-impact-analysis/lineage-case-study-a-revenue-report.mp4", durationLabel: "1:30" }),
      L(23, "lineage-case-study-customer-data-across-systems", "Lineage Case Study: Customer Data Across Systems", { contentDir: "ch05/23-lineage-case-study-customer-data-across-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411978/ltv-data-lineage-and-impact-analysis/lineage-case-study-customer-data-across-systems.mp4", durationLabel: "1:27" }),
      L(24, "lineage-practice-lab", "Lineage Practice Lab", { contentDir: "ch05/24-lineage-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412133/ltv-data-lineage-and-impact-analysis/lineage-practice-lab.mp4", durationLabel: "1:24" }),
      L(25, "lineage-review-checklist", "Lineage Review Checklist", { contentDir: "ch05/25-lineage-review-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412302/ltv-data-lineage-and-impact-analysis/lineage-review-checklist.mp4", durationLabel: "1:29" }),
    ],
  },
];
