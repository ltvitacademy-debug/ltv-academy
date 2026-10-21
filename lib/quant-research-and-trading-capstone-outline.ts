// The Quantitative Research & Trading Capstone course outline — 100% content-complete
// (all 23 lessons have a contentDir). Lessons without a contentDir render as
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
      L(1, "the-capstone-brief-and-raw-data", "The Capstone Brief & Raw Data", { contentDir: "ch01/01-the-capstone-brief-and-raw-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526185/ltv-quant-research-and-trading-capstone/the-capstone-brief-and-raw-data.mp4", durationLabel: "2 min 12 s" }),
      L(2, "formulating-a-research-question", "Formulating a Research Question", { contentDir: "ch01/02-formulating-a-research-question", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526975/ltv-quant-research-and-trading-capstone/formulating-a-research-question.mp4", durationLabel: "2 min 5 s" }),
      L(3, "project-plan-and-success-criteria", "Project Plan & Success Criteria", { contentDir: "ch01/03-project-plan-and-success-criteria", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527810/ltv-quant-research-and-trading-capstone/project-plan-and-success-criteria.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Data & Statistical Analysis",
    lessons: [
      L(4, "cleaning-and-exploring-market-data", "Cleaning & Exploring Market Data", { contentDir: "ch02/04-cleaning-and-exploring-market-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528616/ltv-quant-research-and-trading-capstone/cleaning-and-exploring-market-data.mp4", durationLabel: "2 min 13 s" }),
      L(5, "statistical-analysis-of-the-hypothesis", "Statistical Analysis of the Hypothesis", { contentDir: "ch02/05-statistical-analysis-of-the-hypothesis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529599/ltv-quant-research-and-trading-capstone/statistical-analysis-of-the-hypothesis.mp4", durationLabel: "2 min 39 s" }),
      L(6, "checkpoint-review", "Checkpoint Review", { contentDir: "ch02/06-checkpoint-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530423/ltv-quant-research-and-trading-capstone/checkpoint-review.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Features, Model & Signal",
    lessons: [
      L(7, "feature-engineering", "Feature Engineering", { contentDir: "ch03/07-feature-engineering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531231/ltv-quant-research-and-trading-capstone/feature-engineering.mp4", durationLabel: "2 min 29 s" }),
      L(8, "building-and-validating-the-model", "Building & Validating the Model", { contentDir: "ch03/08-building-and-validating-the-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532177/ltv-quant-research-and-trading-capstone/building-and-validating-the-model.mp4", durationLabel: "2 min 35 s" }),
      L(9, "turning-the-model-into-a-trading-signal", "Turning the Model Into a Trading Signal", { contentDir: "ch03/09-turning-the-model-into-a-trading-signal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532671/ltv-quant-research-and-trading-capstone/turning-the-model-into-a-trading-signal.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Backtest & Risk",
    lessons: [
      L(10, "building-the-backtest", "Building the Backtest", { contentDir: "ch04/10-building-the-backtest", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533118/ltv-quant-research-and-trading-capstone/building-the-backtest.mp4", durationLabel: "2 min 0 s" }),
      L(11, "costs-slippage-and-realism", "Costs, Slippage & Realism", { contentDir: "ch04/11-costs-slippage-and-realism", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533541/ltv-quant-research-and-trading-capstone/costs-slippage-and-realism.mp4", durationLabel: "2 min 23 s" }),
      L(12, "risk-analysis-and-stress-tests", "Risk Analysis & Stress Tests", { contentDir: "ch04/12-risk-analysis-and-stress-tests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533798/ltv-quant-research-and-trading-capstone/risk-analysis-and-stress-tests.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 5,
    title: "Phase 4: Report & Presentation",
    lessons: [
      L(13, "writing-the-performance-report", "Writing the Performance Report", { contentDir: "ch05/13-writing-the-performance-report" }),
      L(14, "defending-your-research-to-a-skeptical-audience", "Defending Your Research to a Skeptical Audience", { contentDir: "ch05/14-defending-your-research-to-a-skeptical-audience" }),
      L(15, "presentation", "Presentation", { contentDir: "ch05/15-presentation" }),
    ],
  },
  {
    n: 6,
    title: "Career Preparation",
    lessons: [
      L(16, "resume-and-portfolio-for-quant-roles", "Resume & Portfolio for Quant Roles", { contentDir: "ch06/16-resume-and-portfolio-for-quant-roles" }),
      L(17, "the-quant-recruiting-process", "The Quant Recruiting Process", { contentDir: "ch06/17-the-quant-recruiting-process" }),
      L(18, "math-and-probability-interview-preparation", "Math & Probability Interview Preparation", { contentDir: "ch06/18-math-and-probability-interview-preparation" }),
      L(19, "coding-and-cplusplus-interview-preparation", "Coding & C++ Interview Preparation", { contentDir: "ch06/19-coding-and-cplusplus-interview-preparation" }),
      L(20, "statistics-and-machine-learning-interview-questions", "Statistics & Machine Learning Interview Questions", { contentDir: "ch06/20-statistics-and-machine-learning-interview-questions" }),
      L(21, "market-knowledge-and-trading-interviews", "Market-Knowledge & Trading Interviews", { contentDir: "ch06/21-market-knowledge-and-trading-interviews" }),
      L(22, "research-presentations-and-case-interviews", "Research Presentations & Case Interviews", { contentDir: "ch06/22-research-presentations-and-case-interviews" }),
      L(23, "compensation-offers-and-choosing-a-firm", "Compensation, Offers & Choosing a Firm", { contentDir: "ch06/23-compensation-offers-and-choosing-a-firm" }),
    ],
  },
];
