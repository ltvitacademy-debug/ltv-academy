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
      L(1, "why-visualization-matters", "Why Visualization Matters"),
      L(2, "choosing-the-right-chart", "Choosing the Right Chart"),
      L(3, "color-layout-and-clarity", "Color, Layout & Clarity"),
      L(4, "misleading-charts-and-how-to-avoid-them", "Misleading Charts & How to Avoid Them"),
    ],
  },
  {
    n: 2,
    title: "Visualization in Python",
    lessons: [
      L(5, "matplotlib-fundamentals", "matplotlib Fundamentals"),
      L(6, "customizing-charts", "Customizing Charts"),
      L(7, "seaborn-for-statistical-plots", "seaborn for Statistical Plots"),
      L(8, "plotly-for-interactive-charts", "Plotly for Interactive Charts"),
      L(9, "subplots-and-dashboards-in-python", "Subplots & Dashboards in Python"),
    ],
  },
  {
    n: 3,
    title: "The EDA Workflow",
    lessons: [
      L(10, "the-eda-mindset-and-workflow", "The EDA Mindset & Workflow"),
      L(11, "univariate-analysis", "Univariate Analysis"),
      L(12, "bivariate-analysis", "Bivariate Analysis"),
      L(13, "multivariate-exploration", "Multivariate Exploration"),
      L(14, "correlation-analysis", "Correlation Analysis"),
      L(15, "outliers-and-anomalies-in-eda", "Outliers & Anomalies in EDA"),
      L(16, "automated-eda-tools", "Automated EDA Tools"),
    ],
  },
  {
    n: 4,
    title: "Power BI for Data Scientists",
    lessons: [
      L(17, "connecting-power-bi-to-python-and-sql-data", "Connecting Power BI to Python & SQL Data"),
      L(18, "building-exploratory-reports", "Building Exploratory Reports"),
      L(19, "sharing-findings-with-stakeholders", "Sharing Findings With Stakeholders"),
    ],
  },
  {
    n: 5,
    title: "Communicating Findings",
    lessons: [
      L(20, "telling-the-story-of-a-dataset", "Telling the Story of a Dataset"),
      L(21, "writing-up-an-analysis", "Writing Up an Analysis"),
      L(22, "presenting-to-non-technical-audiences", "Presenting to Non-Technical Audiences"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(23, "capstone-kickoff-explore-and-present-a-real-dataset", "Capstone Kickoff: Explore and Present a Real Dataset"),
      L(24, "capstone-build-it", "Capstone: Build It"),
      L(25, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
