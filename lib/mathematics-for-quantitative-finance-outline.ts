// The Mathematics for Quantitative Finance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 1 of the Quantitative Developer / Researcher destination path. Assumes the Data Scientist path (basic statistics and Python); this course goes to the depth quant interviews and research actually require.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/mathematics-for-quantitative-finance/
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

export const MATHEMATICS_FOR_QUANTITATIVE_FINANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Calculus for Quantitative Work",
    lessons: [
      L(1, "limits-derivatives-and-rates-of-change", "Limits, Derivatives & Rates of Change", { contentDir: "ch01/01-limits-derivatives-and-rates-of-change" }),
      L(2, "multivariable-calculus-and-gradients", "Multivariable Calculus & Gradients", { contentDir: "ch01/02-multivariable-calculus-and-gradients" }),
      L(3, "integration-and-expectation", "Integration & Expectation", { contentDir: "ch01/03-integration-and-expectation" }),
      L(4, "taylor-series-and-approximation", "Taylor Series & Approximation", { contentDir: "ch01/04-taylor-series-and-approximation" }),
      L(5, "ordinary-differential-equations-basics", "Ordinary Differential Equations Basics", { contentDir: "ch01/05-ordinary-differential-equations-basics" }),
    ],
  },
  {
    n: 2,
    title: "Linear Algebra",
    lessons: [
      L(6, "vectors-matrices-and-linear-maps", "Vectors, Matrices & Linear Maps", { contentDir: "ch02/06-vectors-matrices-and-linear-maps" }),
      L(7, "systems-of-equations-and-matrix-decompositions", "Systems of Equations & Matrix Decompositions", { contentDir: "ch02/07-systems-of-equations-and-matrix-decompositions" }),
      L(8, "eigenvalues-and-eigenvectors", "Eigenvalues & Eigenvectors", { contentDir: "ch02/08-eigenvalues-and-eigenvectors" }),
      L(9, "singular-value-decomposition", "Singular Value Decomposition", { contentDir: "ch02/09-singular-value-decomposition" }),
      L(10, "covariance-matrices-and-principal-components", "Covariance Matrices & Principal Components", { contentDir: "ch02/10-covariance-matrices-and-principal-components" }),
      L(11, "linear-algebra-in-numpy", "Linear Algebra in NumPy", { contentDir: "ch02/11-linear-algebra-in-numpy" }),
    ],
  },
  {
    n: 3,
    title: "Probability Theory",
    lessons: [
      L(12, "probability-spaces-and-random-variables", "Probability Spaces & Random Variables", { contentDir: "ch03/12-probability-spaces-and-random-variables" }),
      L(13, "expectation-variance-and-moments", "Expectation, Variance & Moments", { contentDir: "ch03/13-expectation-variance-and-moments" }),
      L(14, "joint-distributions-and-conditioning", "Joint Distributions & Conditioning", { contentDir: "ch03/14-joint-distributions-and-conditioning" }),
      L(15, "law-of-large-numbers-and-central-limit-theorem", "Law of Large Numbers & Central Limit Theorem", { contentDir: "ch03/15-law-of-large-numbers-and-central-limit-theorem" }),
      L(16, "characteristic-and-moment-generating-functions", "Characteristic & Moment-Generating Functions", { contentDir: "ch03/16-characteristic-and-moment-generating-functions" }),
      L(17, "common-distributions-in-finance", "Common Distributions in Finance", { contentDir: "ch03/17-common-distributions-in-finance" }),
    ],
  },
  {
    n: 4,
    title: "Advanced Statistics",
    lessons: [
      L(18, "estimation-maximum-likelihood-and-method-of-moments", "Estimation: Maximum Likelihood & Method of Moments", { contentDir: "ch04/18-estimation-maximum-likelihood-and-method-of-moments" }),
      L(19, "bayesian-inference", "Bayesian Inference", { contentDir: "ch04/19-bayesian-inference" }),
      L(20, "hypothesis-testing-revisited", "Hypothesis Testing Revisited", { contentDir: "ch04/20-hypothesis-testing-revisited" }),
      L(21, "regression-theory-and-the-gauss-markov-assumptions", "Regression Theory & the Gauss-Markov Assumptions", { contentDir: "ch04/21-regression-theory-and-the-gauss-markov-assumptions" }),
      L(22, "multiple-testing-and-false-discovery", "Multiple Testing & False Discovery", { contentDir: "ch04/22-multiple-testing-and-false-discovery" }),
      L(23, "bootstrap-and-resampling-methods", "Bootstrap & Resampling Methods", { contentDir: "ch04/23-bootstrap-and-resampling-methods" }),
    ],
  },
  {
    n: 5,
    title: "Optimization",
    lessons: [
      L(24, "unconstrained-optimization-and-gradient-methods", "Unconstrained Optimization & Gradient Methods", { contentDir: "ch05/24-unconstrained-optimization-and-gradient-methods" }),
      L(25, "constrained-optimization-and-lagrange-multipliers", "Constrained Optimization & Lagrange Multipliers", { contentDir: "ch05/25-constrained-optimization-and-lagrange-multipliers" }),
      L(26, "convex-optimization", "Convex Optimization", { contentDir: "ch05/26-convex-optimization" }),
      L(27, "quadratic-and-linear-programming", "Quadratic & Linear Programming", { contentDir: "ch05/27-quadratic-and-linear-programming" }),
      L(28, "numerical-optimization-in-python", "Numerical Optimization in Python", { contentDir: "ch05/28-numerical-optimization-in-python" }),
    ],
  },
  {
    n: 6,
    title: "Stochastic Processes",
    lessons: [
      L(29, "random-walks", "Random Walks", { contentDir: "ch06/29-random-walks" }),
      L(30, "markov-chains", "Markov Chains", { contentDir: "ch06/30-markov-chains" }),
      L(31, "brownian-motion", "Brownian Motion", { contentDir: "ch06/31-brownian-motion" }),
      L(32, "martingales", "Martingales", { contentDir: "ch06/32-martingales" }),
      L(33, "introduction-to-stochastic-calculus-and-it-s-lemma", "Introduction to Stochastic Calculus & Itô's Lemma", { contentDir: "ch06/33-introduction-to-stochastic-calculus-and-it-s-lemma" }),
      L(34, "monte-carlo-simulation", "Monte Carlo Simulation", { contentDir: "ch06/34-monte-carlo-simulation" }),
    ],
  },
  {
    n: 7,
    title: "Quant Interview Mathematics",
    lessons: [
      L(35, "probability-brainteasers", "Probability Brainteasers", { contentDir: "ch07/35-probability-brainteasers" }),
      L(36, "expected-value-and-betting-problems", "Expected Value & Betting Problems", { contentDir: "ch07/36-expected-value-and-betting-problems" }),
      L(37, "combinatorics-and-counting", "Combinatorics & Counting", { contentDir: "ch07/37-combinatorics-and-counting" }),
      L(38, "mental-math-and-estimation", "Mental Math & Estimation", { contentDir: "ch07/38-mental-math-and-estimation" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(39, "capstone-kickoff-a-mathematical-model-of-asset-prices", "Capstone Kickoff: A Mathematical Model of Asset Prices", { contentDir: "ch08/39-capstone-kickoff-a-mathematical-model-of-asset-prices" }),
      L(40, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/40-capstone-build-it" }),
      L(41, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/41-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
