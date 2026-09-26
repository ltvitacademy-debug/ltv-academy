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
      L(1, "what-statistics-is-for", "What Statistics Is For", { contentDir: "ch01/01-what-statistics-is-for" }),
      L(2, "types-of-data-and-measurement-scales", "Types of Data & Measurement Scales", { contentDir: "ch01/02-types-of-data-and-measurement-scales" }),
      L(3, "measures-of-center", "Measures of Center", { contentDir: "ch01/03-measures-of-center" }),
      L(4, "measures-of-spread", "Measures of Spread", { contentDir: "ch01/04-measures-of-spread" }),
      L(5, "distributions-and-shape", "Distributions & Shape", { contentDir: "ch01/05-distributions-and-shape" }),
      L(6, "visualizing-distributions", "Visualizing Distributions", { contentDir: "ch01/06-visualizing-distributions" }),
    ],
  },
  {
    n: 2,
    title: "Probability Foundations",
    lessons: [
      L(7, "probability-basics", "Probability Basics", { contentDir: "ch02/07-probability-basics" }),
      L(8, "conditional-probability-and-independence", "Conditional Probability & Independence", { contentDir: "ch02/08-conditional-probability-and-independence" }),
      L(9, "bayes-theorem", "Bayes' Theorem", { contentDir: "ch02/09-bayes-theorem" }),
      L(10, "random-variables-and-expected-value", "Random Variables & Expected Value", { contentDir: "ch02/10-random-variables-and-expected-value" }),
    ],
  },
  {
    n: 3,
    title: "Distributions",
    lessons: [
      L(11, "common-discrete-distributions", "Common Discrete Distributions", { contentDir: "ch03/11-common-discrete-distributions" }),
      L(12, "the-normal-distribution", "The Normal Distribution", { contentDir: "ch03/12-the-normal-distribution" }),
      L(13, "other-continuous-distributions", "Other Continuous Distributions", { contentDir: "ch03/13-other-continuous-distributions" }),
      L(14, "simulating-distributions-in-python", "Simulating Distributions in Python", { contentDir: "ch03/14-simulating-distributions-in-python" }),
    ],
  },
  {
    n: 4,
    title: "Sampling & Estimation",
    lessons: [
      L(15, "populations-samples-and-sampling-bias", "Populations, Samples & Sampling Bias", { contentDir: "ch04/15-populations-samples-and-sampling-bias" }),
      L(16, "the-central-limit-theorem", "The Central Limit Theorem", { contentDir: "ch04/16-the-central-limit-theorem" }),
      L(17, "standard-error", "Standard Error", { contentDir: "ch04/17-standard-error" }),
      L(18, "confidence-intervals", "Confidence Intervals", { contentDir: "ch04/18-confidence-intervals" }),
      L(19, "bootstrapping", "Bootstrapping", { contentDir: "ch04/19-bootstrapping" }),
    ],
  },
  {
    n: 5,
    title: "Hypothesis Testing",
    lessons: [
      L(20, "the-logic-of-hypothesis-testing", "The Logic of Hypothesis Testing", { contentDir: "ch05/20-the-logic-of-hypothesis-testing" }),
      L(21, "p-values-and-statistical-significance", "p-Values & Statistical Significance", { contentDir: "ch05/21-p-values-and-statistical-significance" }),
      L(22, "type-i-and-type-ii-errors-and-power", "Type I & Type II Errors and Power", { contentDir: "ch05/22-type-i-and-type-ii-errors-and-power" }),
      L(23, "t-tests", "t-Tests", { contentDir: "ch05/23-t-tests" }),
      L(24, "chi-square-tests", "Chi-Square Tests", { contentDir: "ch05/24-chi-square-tests" }),
      L(25, "anova", "ANOVA", { contentDir: "ch05/25-anova" }),
      L(26, "multiple-comparisons", "Multiple Comparisons", { contentDir: "ch05/26-multiple-comparisons" }),
    ],
  },
  {
    n: 6,
    title: "Correlation, Causation & Experiments",
    lessons: [
      L(27, "correlation-vs-causation", "Correlation vs. Causation", { contentDir: "ch06/27-correlation-vs-causation" }),
      L(28, "simple-linear-regression", "Simple Linear Regression", { contentDir: "ch06/28-simple-linear-regression" }),
      L(29, "a-b-test-design", "A/B Test Design", { contentDir: "ch06/29-a-b-test-design" }),
      L(30, "analyzing-a-b-test-results", "Analyzing A/B Test Results", { contentDir: "ch06/30-analyzing-a-b-test-results" }),
      L(31, "common-statistical-pitfalls", "Common Statistical Pitfalls", { contentDir: "ch06/31-common-statistical-pitfalls" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-an-end-to-end-statistical-analysis", "Capstone Kickoff: An End-to-End Statistical Analysis", { contentDir: "ch07/32-capstone-kickoff-an-end-to-end-statistical-analysis" }),
      L(33, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/33-capstone-build-it" }),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/34-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
