// The Quantitative Research & Trading Capstone course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 8 of the Quantitative Developer / Researcher path. Students go: Raw Data → Research Question → Statistical Analysis → Feature Engineering → Model → Trading Signal → Backtest → Risk Analysis → Performance Report → Presentation. Closes with quant-specific career and interview preparation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quant-research-and-trading-capstone/
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

export const QUANT_RESEARCH_AND_TRADING_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "the-capstone-brief-and-raw-data", "The Capstone Brief & Raw Data"),
      L(2, "formulating-a-research-question", "Formulating a Research Question"),
      L(3, "project-plan-and-success-criteria", "Project Plan & Success Criteria"),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Data & Statistical Analysis",
    lessons: [
      L(4, "cleaning-and-exploring-market-data", "Cleaning & Exploring Market Data"),
      L(5, "statistical-analysis-of-the-hypothesis", "Statistical Analysis of the Hypothesis"),
      L(6, "checkpoint-review", "Checkpoint Review"),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Features, Model & Signal",
    lessons: [
      L(7, "feature-engineering", "Feature Engineering"),
      L(8, "building-and-validating-the-model", "Building & Validating the Model"),
      L(9, "turning-the-model-into-a-trading-signal", "Turning the Model Into a Trading Signal"),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Backtest & Risk",
    lessons: [
      L(10, "building-the-backtest", "Building the Backtest"),
      L(11, "costs-slippage-and-realism", "Costs, Slippage & Realism"),
      L(12, "risk-analysis-and-stress-tests", "Risk Analysis & Stress Tests"),
    ],
  },
  {
    n: 5,
    title: "Phase 4: Report & Presentation",
    lessons: [
      L(13, "writing-the-performance-report", "Writing the Performance Report"),
      L(14, "defending-your-research-to-a-skeptical-audience", "Defending Your Research to a Skeptical Audience"),
      L(15, "presentation", "Presentation"),
    ],
  },
  {
    n: 6,
    title: "Career Preparation",
    lessons: [
      L(16, "resume-and-portfolio-for-quant-roles", "Resume & Portfolio for Quant Roles"),
      L(17, "the-quant-recruiting-process", "The Quant Recruiting Process"),
      L(18, "math-and-probability-interview-preparation", "Math & Probability Interview Preparation"),
      L(19, "coding-and-cplusplus-interview-preparation", "Coding & C++ Interview Preparation"),
      L(20, "statistics-and-machine-learning-interview-questions", "Statistics & Machine Learning Interview Questions"),
      L(21, "market-knowledge-and-trading-interviews", "Market-Knowledge & Trading Interviews"),
      L(22, "research-presentations-and-case-interviews", "Research Presentations & Case Interviews"),
      L(23, "compensation-offers-and-choosing-a-firm", "Compensation, Offers & Choosing a Firm"),
    ],
  },
];
