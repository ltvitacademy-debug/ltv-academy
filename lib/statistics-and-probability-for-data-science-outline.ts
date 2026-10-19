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
      L(1, "what-statistics-is-for", "What Statistics Is For", { contentDir: "ch01/01-what-statistics-is-for", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433630/ltv-statistics-and-probability-for-data-science/what-statistics-is-for.mp4", durationLabel: "3 min 8 s" }),
      L(2, "types-of-data-and-measurement-scales", "Types of Data & Measurement Scales", { contentDir: "ch01/02-types-of-data-and-measurement-scales", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433994/ltv-statistics-and-probability-for-data-science/types-of-data-and-measurement-scales.mp4", durationLabel: "3 min 22 s" }),
      L(3, "measures-of-center", "Measures of Center", { contentDir: "ch01/03-measures-of-center", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434347/ltv-statistics-and-probability-for-data-science/measures-of-center.mp4", durationLabel: "3 min 26 s" }),
      L(4, "measures-of-spread", "Measures of Spread", { contentDir: "ch01/04-measures-of-spread", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434670/ltv-statistics-and-probability-for-data-science/measures-of-spread.mp4", durationLabel: "3 min 9 s" }),
      L(5, "distributions-and-shape", "Distributions & Shape", { contentDir: "ch01/05-distributions-and-shape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434967/ltv-statistics-and-probability-for-data-science/distributions-and-shape.mp4", durationLabel: "3 min 34 s" }),
      L(6, "visualizing-distributions", "Visualizing Distributions", { contentDir: "ch01/06-visualizing-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435252/ltv-statistics-and-probability-for-data-science/visualizing-distributions.mp4", durationLabel: "3 min 24 s" }),
    ],
  },
  {
    n: 2,
    title: "Probability Foundations",
    lessons: [
      L(7, "probability-basics", "Probability Basics", { contentDir: "ch02/07-probability-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435464/ltv-statistics-and-probability-for-data-science/probability-basics.mp4", durationLabel: "4 min 4 s" }),
      L(8, "conditional-probability-and-independence", "Conditional Probability & Independence", { contentDir: "ch02/08-conditional-probability-and-independence", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435696/ltv-statistics-and-probability-for-data-science/conditional-probability-and-independence.mp4", durationLabel: "4 min 4 s" }),
      L(9, "bayes-theorem", "Bayes' Theorem", { contentDir: "ch02/09-bayes-theorem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435930/ltv-statistics-and-probability-for-data-science/bayes-theorem.mp4", durationLabel: "4 min 29 s" }),
      L(10, "random-variables-and-expected-value", "Random Variables & Expected Value", { contentDir: "ch02/10-random-variables-and-expected-value", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436155/ltv-statistics-and-probability-for-data-science/random-variables-and-expected-value.mp4", durationLabel: "4 min 18 s" }),
    ],
  },
  {
    n: 3,
    title: "Distributions",
    lessons: [
      L(11, "common-discrete-distributions", "Common Discrete Distributions", { contentDir: "ch03/11-common-discrete-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436354/ltv-statistics-and-probability-for-data-science/common-discrete-distributions.mp4", durationLabel: "3 min 42 s" }),
      L(12, "the-normal-distribution", "The Normal Distribution", { contentDir: "ch03/12-the-normal-distribution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436555/ltv-statistics-and-probability-for-data-science/the-normal-distribution.mp4", durationLabel: "3 min 48 s" }),
      L(13, "other-continuous-distributions", "Other Continuous Distributions", { contentDir: "ch03/13-other-continuous-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436745/ltv-statistics-and-probability-for-data-science/other-continuous-distributions.mp4", durationLabel: "3 min 38 s" }),
      L(14, "simulating-distributions-in-python", "Simulating Distributions in Python", { contentDir: "ch03/14-simulating-distributions-in-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436972/ltv-statistics-and-probability-for-data-science/simulating-distributions-in-python.mp4", durationLabel: "3 min 40 s" }),
    ],
  },
  {
    n: 4,
    title: "Sampling & Estimation",
    lessons: [
      L(15, "populations-samples-and-sampling-bias", "Populations, Samples & Sampling Bias", { contentDir: "ch04/15-populations-samples-and-sampling-bias", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437169/ltv-statistics-and-probability-for-data-science/populations-samples-and-sampling-bias.mp4", durationLabel: "3 min 35 s" }),
      L(16, "the-central-limit-theorem", "The Central Limit Theorem", { contentDir: "ch04/16-the-central-limit-theorem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437373/ltv-statistics-and-probability-for-data-science/the-central-limit-theorem.mp4", durationLabel: "3 min 42 s" }),
      L(17, "standard-error", "Standard Error", { contentDir: "ch04/17-standard-error", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437772/ltv-statistics-and-probability-for-data-science/standard-error.mp4", durationLabel: "3 min 48 s" }),
      L(18, "confidence-intervals", "Confidence Intervals", { contentDir: "ch04/18-confidence-intervals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438008/ltv-statistics-and-probability-for-data-science/confidence-intervals.mp4", durationLabel: "4 min 9 s" }),
      L(19, "bootstrapping", "Bootstrapping", { contentDir: "ch04/19-bootstrapping", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438211/ltv-statistics-and-probability-for-data-science/bootstrapping.mp4", durationLabel: "3 min 56 s" }),
    ],
  },
  {
    n: 5,
    title: "Hypothesis Testing",
    lessons: [
      L(20, "the-logic-of-hypothesis-testing", "The Logic of Hypothesis Testing", { contentDir: "ch05/20-the-logic-of-hypothesis-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438391/ltv-statistics-and-probability-for-data-science/the-logic-of-hypothesis-testing.mp4", durationLabel: "3 min 47 s" }),
      L(21, "p-values-and-statistical-significance", "p-Values & Statistical Significance", { contentDir: "ch05/21-p-values-and-statistical-significance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438556/ltv-statistics-and-probability-for-data-science/p-values-and-statistical-significance.mp4", durationLabel: "3 min 37 s" }),
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
