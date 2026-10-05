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
      L(1, "what-data-lineage-is", "What Data Lineage Is", { contentDir: "ch01/01-what-data-lineage-is" }),
      L(2, "why-lineage-matters", "Why Lineage Matters", { contentDir: "ch01/02-why-lineage-matters" }),
      L(3, "business-vs-technical-lineage", "Business vs. Technical Lineage", { contentDir: "ch01/03-business-vs-technical-lineage" }),
      L(4, "column-level-vs-table-level-lineage", "Column-Level vs. Table-Level Lineage", { contentDir: "ch01/04-column-level-vs-table-level-lineage" }),
      L(5, "lineage-standards-and-approaches", "Lineage Standards and Approaches", { contentDir: "ch01/05-lineage-standards-and-approaches" }),
    ],
  },
  {
    n: 2,
    title: "Tracing Data",
    lessons: [
      L(6, "source-systems-and-extraction", "Source Systems and Extraction", { contentDir: "ch02/06-source-systems-and-extraction" }),
      L(7, "etl-and-elt-lineage", "ETL and ELT Lineage", { contentDir: "ch02/07-etl-and-elt-lineage" }),
      L(8, "lineage-through-data-lakes-and-warehouses", "Lineage Through Data Lakes and Warehouses", { contentDir: "ch02/08-lineage-through-data-lakes-and-warehouses" }),
      L(9, "lineage-through-semantic-models", "Lineage Through Semantic Models", { contentDir: "ch02/09-lineage-through-semantic-models" }),
      L(10, "lineage-into-power-bi", "Lineage Into Power BI", { contentDir: "ch02/10-lineage-into-power-bi" }),
      L(11, "lineage-to-executive-dashboards", "Lineage to Executive Dashboards", { contentDir: "ch02/11-lineage-to-executive-dashboards" }),
    ],
  },
  {
    n: 3,
    title: "Dependencies and Impact",
    lessons: [
      L(12, "upstream-and-downstream-dependencies", "Upstream and Downstream Dependencies", { contentDir: "ch03/12-upstream-and-downstream-dependencies" }),
      L(13, "transformations-and-business-rules", "Transformations and Business Rules", { contentDir: "ch03/13-transformations-and-business-rules" }),
      L(14, "impact-analysis", "Impact Analysis", { contentDir: "ch03/14-impact-analysis" }),
      L(15, "change-impact-assessment", "Change Impact Assessment", { contentDir: "ch03/15-change-impact-assessment" }),
      L(16, "lineage-for-root-cause-analysis", "Lineage for Root Cause Analysis", { contentDir: "ch03/16-lineage-for-root-cause-analysis" }),
    ],
  },
  {
    n: 4,
    title: "Documenting Lineage",
    lessons: [
      L(17, "lineage-documentation", "Lineage Documentation", { contentDir: "ch04/17-lineage-documentation" }),
      L(18, "lineage-diagrams", "Lineage Diagrams", { contentDir: "ch04/18-lineage-diagrams" }),
      L(19, "automated-vs-manual-lineage", "Automated vs. Manual Lineage", { contentDir: "ch04/19-automated-vs-manual-lineage" }),
      L(20, "lineage-tools-overview", "Lineage Tools Overview", { contentDir: "ch04/20-lineage-tools-overview" }),
      L(21, "maintaining-lineage", "Maintaining Lineage", { contentDir: "ch04/21-maintaining-lineage" }),
    ],
  },
  {
    n: 5,
    title: "Applied Lineage",
    lessons: [
      L(22, "lineage-case-study-a-revenue-report", "Lineage Case Study: A Revenue Report", { contentDir: "ch05/22-lineage-case-study-a-revenue-report" }),
      L(23, "lineage-case-study-customer-data-across-systems", "Lineage Case Study: Customer Data Across Systems", { contentDir: "ch05/23-lineage-case-study-customer-data-across-systems" }),
      L(24, "lineage-practice-lab", "Lineage Practice Lab", { contentDir: "ch05/24-lineage-practice-lab" }),
      L(25, "lineage-review-checklist", "Lineage Review Checklist", { contentDir: "ch05/25-lineage-review-checklist" }),
    ],
  },
];
