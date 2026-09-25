// The Statistics & Probability for Data Science course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 3 of the Data Scientist path. No prior statistics assumed; taught for people who will apply it in Python.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/statistics-and-probability-for-data-science/
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

export const STATISTICS_AND_PROBABILITY_FOR_DATA_SCIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Descriptive Statistics",
    lessons: [
      L(1, "what-statistics-is-for", "What Statistics Is For"),
      L(2, "types-of-data-and-measurement-scales", "Types of Data & Measurement Scales"),
      L(3, "measures-of-center", "Measures of Center"),
      L(4, "measures-of-spread", "Measures of Spread"),
      L(5, "distributions-and-shape", "Distributions & Shape"),
      L(6, "visualizing-distributions", "Visualizing Distributions"),
    ],
  },
  {
    n: 2,
    title: "Probability Foundations",
    lessons: [
      L(7, "probability-basics", "Probability Basics"),
      L(8, "conditional-probability-and-independence", "Conditional Probability & Independence"),
      L(9, "bayes-theorem", "Bayes' Theorem"),
      L(10, "random-variables-and-expected-value", "Random Variables & Expected Value"),
    ],
  },
  {
    n: 3,
    title: "Distributions",
    lessons: [
      L(11, "common-discrete-distributions", "Common Discrete Distributions"),
      L(12, "the-normal-distribution", "The Normal Distribution"),
      L(13, "other-continuous-distributions", "Other Continuous Distributions"),
      L(14, "simulating-distributions-in-python", "Simulating Distributions in Python"),
    ],
  },
  {
    n: 4,
    title: "Sampling & Estimation",
    lessons: [
      L(15, "populations-samples-and-sampling-bias", "Populations, Samples & Sampling Bias"),
      L(16, "the-central-limit-theorem", "The Central Limit Theorem"),
      L(17, "standard-error", "Standard Error"),
      L(18, "confidence-intervals", "Confidence Intervals"),
      L(19, "bootstrapping", "Bootstrapping"),
    ],
  },
  {
    n: 5,
    title: "Hypothesis Testing",
    lessons: [
      L(20, "the-logic-of-hypothesis-testing", "The Logic of Hypothesis Testing"),
      L(21, "p-values-and-statistical-significance", "p-Values & Statistical Significance"),
      L(22, "type-i-and-type-ii-errors-and-power", "Type I & Type II Errors and Power"),
      L(23, "t-tests", "t-Tests"),
      L(24, "chi-square-tests", "Chi-Square Tests"),
      L(25, "anova", "ANOVA"),
      L(26, "multiple-comparisons", "Multiple Comparisons"),
    ],
  },
  {
    n: 6,
    title: "Correlation, Causation & Experiments",
    lessons: [
      L(27, "correlation-vs-causation", "Correlation vs. Causation"),
      L(28, "simple-linear-regression", "Simple Linear Regression"),
      L(29, "a-b-test-design", "A/B Test Design"),
      L(30, "analyzing-a-b-test-results", "Analyzing A/B Test Results"),
      L(31, "common-statistical-pitfalls", "Common Statistical Pitfalls"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-an-end-to-end-statistical-analysis", "Capstone Kickoff: An End-to-End Statistical Analysis"),
      L(33, "capstone-build-it", "Capstone: Build It"),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
