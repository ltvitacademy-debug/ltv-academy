// The Data Visualization & Exploratory Data Analysis course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 4 of the Data Scientist path. Reuses Power BI skills at a lighter touch than the full Power BI course; the emphasis is exploration and communication, not dashboard engineering.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-visualization-and-eda/
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

export const DATA_VISUALIZATION_AND_EDA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Principles of Visual Communication",
    lessons: [
      L(1, "why-visualization-matters", "Why Visualization Matters", { contentDir: "ch01/01-why-visualization-matters" }),
      L(2, "choosing-the-right-chart", "Choosing the Right Chart", { contentDir: "ch01/02-choosing-the-right-chart" }),
      L(3, "color-layout-and-clarity", "Color, Layout & Clarity", { contentDir: "ch01/03-color-layout-and-clarity" }),
      L(4, "misleading-charts-and-how-to-avoid-them", "Misleading Charts & How to Avoid Them", { contentDir: "ch01/04-misleading-charts-and-how-to-avoid-them" }),
    ],
  },
  {
    n: 2,
    title: "Visualization in Python",
    lessons: [
      L(5, "matplotlib-fundamentals", "matplotlib Fundamentals", { contentDir: "ch02/05-matplotlib-fundamentals" }),
      L(6, "customizing-charts", "Customizing Charts", { contentDir: "ch02/06-customizing-charts" }),
      L(7, "seaborn-for-statistical-plots", "seaborn for Statistical Plots", { contentDir: "ch02/07-seaborn-for-statistical-plots" }),
      L(8, "plotly-for-interactive-charts", "Plotly for Interactive Charts", { contentDir: "ch02/08-plotly-for-interactive-charts" }),
      L(9, "subplots-and-dashboards-in-python", "Subplots & Dashboards in Python", { contentDir: "ch02/09-subplots-and-dashboards-in-python" }),
    ],
  },
  {
    n: 3,
    title: "The EDA Workflow",
    lessons: [
      L(10, "the-eda-mindset-and-workflow", "The EDA Mindset & Workflow", { contentDir: "ch03/10-the-eda-mindset-and-workflow" }),
      L(11, "univariate-analysis", "Univariate Analysis", { contentDir: "ch03/11-univariate-analysis" }),
      L(12, "bivariate-analysis", "Bivariate Analysis", { contentDir: "ch03/12-bivariate-analysis" }),
      L(13, "multivariate-exploration", "Multivariate Exploration", { contentDir: "ch03/13-multivariate-exploration" }),
      L(14, "correlation-analysis", "Correlation Analysis", { contentDir: "ch03/14-correlation-analysis" }),
      L(15, "outliers-and-anomalies-in-eda", "Outliers & Anomalies in EDA", { contentDir: "ch03/15-outliers-and-anomalies-in-eda" }),
      L(16, "automated-eda-tools", "Automated EDA Tools", { contentDir: "ch03/16-automated-eda-tools" }),
    ],
  },
  {
    n: 4,
    title: "Power BI for Data Scientists",
    lessons: [
      L(17, "connecting-power-bi-to-python-and-sql-data", "Connecting Power BI to Python & SQL Data", { contentDir: "ch04/17-connecting-power-bi-to-python-and-sql-data" }),
      L(18, "building-exploratory-reports", "Building Exploratory Reports", { contentDir: "ch04/18-building-exploratory-reports" }),
      L(19, "sharing-findings-with-stakeholders", "Sharing Findings With Stakeholders", { contentDir: "ch04/19-sharing-findings-with-stakeholders" }),
    ],
  },
  {
    n: 5,
    title: "Communicating Findings",
    lessons: [
      L(20, "telling-the-story-of-a-dataset", "Telling the Story of a Dataset", { contentDir: "ch05/20-telling-the-story-of-a-dataset" }),
      L(21, "writing-up-an-analysis", "Writing Up an Analysis", { contentDir: "ch05/21-writing-up-an-analysis" }),
      L(22, "presenting-to-non-technical-audiences", "Presenting to Non-Technical Audiences", { contentDir: "ch05/22-presenting-to-non-technical-audiences" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(23, "capstone-kickoff-explore-and-present-a-real-dataset", "Capstone Kickoff: Explore and Present a Real Dataset", { contentDir: "ch06/23-capstone-kickoff-explore-and-present-a-real-dataset" }),
      L(24, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/24-capstone-build-it" }),
      L(25, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/25-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
