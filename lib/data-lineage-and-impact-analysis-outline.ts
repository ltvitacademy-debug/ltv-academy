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
      L(1, "what-data-lineage-is", "What Data Lineage Is"),
      L(2, "why-lineage-matters", "Why Lineage Matters"),
      L(3, "business-vs-technical-lineage", "Business vs. Technical Lineage"),
      L(4, "column-level-vs-table-level-lineage", "Column-Level vs. Table-Level Lineage"),
      L(5, "lineage-standards-and-approaches", "Lineage Standards and Approaches"),
    ],
  },
  {
    n: 2,
    title: "Tracing Data",
    lessons: [
      L(6, "source-systems-and-extraction", "Source Systems and Extraction"),
      L(7, "etl-and-elt-lineage", "ETL and ELT Lineage"),
      L(8, "lineage-through-data-lakes-and-warehouses", "Lineage Through Data Lakes and Warehouses"),
      L(9, "lineage-through-semantic-models", "Lineage Through Semantic Models"),
      L(10, "lineage-into-power-bi", "Lineage Into Power BI"),
      L(11, "lineage-to-executive-dashboards", "Lineage to Executive Dashboards"),
    ],
  },
  {
    n: 3,
    title: "Dependencies and Impact",
    lessons: [
      L(12, "upstream-and-downstream-dependencies", "Upstream and Downstream Dependencies"),
      L(13, "transformations-and-business-rules", "Transformations and Business Rules"),
      L(14, "impact-analysis", "Impact Analysis"),
      L(15, "change-impact-assessment", "Change Impact Assessment"),
      L(16, "lineage-for-root-cause-analysis", "Lineage for Root Cause Analysis"),
    ],
  },
  {
    n: 4,
    title: "Documenting Lineage",
    lessons: [
      L(17, "lineage-documentation", "Lineage Documentation"),
      L(18, "lineage-diagrams", "Lineage Diagrams"),
      L(19, "automated-vs-manual-lineage", "Automated vs. Manual Lineage"),
      L(20, "lineage-tools-overview", "Lineage Tools Overview"),
      L(21, "maintaining-lineage", "Maintaining Lineage"),
    ],
  },
  {
    n: 5,
    title: "Applied Lineage",
    lessons: [
      L(22, "lineage-case-study-a-revenue-report", "Lineage Case Study: A Revenue Report"),
      L(23, "lineage-case-study-customer-data-across-systems", "Lineage Case Study: Customer Data Across Systems"),
      L(24, "lineage-practice-lab", "Lineage Practice Lab"),
      L(25, "lineage-review-checklist", "Lineage Review Checklist"),
    ],
  },
];
