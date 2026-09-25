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
      L(1, "limits-derivatives-and-rates-of-change", "Limits, Derivatives & Rates of Change"),
      L(2, "multivariable-calculus-and-gradients", "Multivariable Calculus & Gradients"),
      L(3, "integration-and-expectation", "Integration & Expectation"),
      L(4, "taylor-series-and-approximation", "Taylor Series & Approximation"),
      L(5, "ordinary-differential-equations-basics", "Ordinary Differential Equations Basics"),
    ],
  },
  {
    n: 2,
    title: "Linear Algebra",
    lessons: [
      L(6, "vectors-matrices-and-linear-maps", "Vectors, Matrices & Linear Maps"),
      L(7, "systems-of-equations-and-matrix-decompositions", "Systems of Equations & Matrix Decompositions"),
      L(8, "eigenvalues-and-eigenvectors", "Eigenvalues & Eigenvectors"),
      L(9, "singular-value-decomposition", "Singular Value Decomposition"),
      L(10, "covariance-matrices-and-principal-components", "Covariance Matrices & Principal Components"),
      L(11, "linear-algebra-in-numpy", "Linear Algebra in NumPy"),
    ],
  },
  {
    n: 3,
    title: "Probability Theory",
    lessons: [
      L(12, "probability-spaces-and-random-variables", "Probability Spaces & Random Variables"),
      L(13, "expectation-variance-and-moments", "Expectation, Variance & Moments"),
      L(14, "joint-distributions-and-conditioning", "Joint Distributions & Conditioning"),
      L(15, "law-of-large-numbers-and-central-limit-theorem", "Law of Large Numbers & Central Limit Theorem"),
      L(16, "characteristic-and-moment-generating-functions", "Characteristic & Moment-Generating Functions"),
      L(17, "common-distributions-in-finance", "Common Distributions in Finance"),
    ],
  },
  {
    n: 4,
    title: "Advanced Statistics",
    lessons: [
      L(18, "estimation-maximum-likelihood-and-method-of-moments", "Estimation: Maximum Likelihood & Method of Moments"),
      L(19, "bayesian-inference", "Bayesian Inference"),
      L(20, "hypothesis-testing-revisited", "Hypothesis Testing Revisited"),
      L(21, "regression-theory-and-the-gauss-markov-assumptions", "Regression Theory & the Gauss-Markov Assumptions"),
      L(22, "multiple-testing-and-false-discovery", "Multiple Testing & False Discovery"),
      L(23, "bootstrap-and-resampling-methods", "Bootstrap & Resampling Methods"),
    ],
  },
  {
    n: 5,
    title: "Optimization",
    lessons: [
      L(24, "unconstrained-optimization-and-gradient-methods", "Unconstrained Optimization & Gradient Methods"),
      L(25, "constrained-optimization-and-lagrange-multipliers", "Constrained Optimization & Lagrange Multipliers"),
      L(26, "convex-optimization", "Convex Optimization"),
      L(27, "quadratic-and-linear-programming", "Quadratic & Linear Programming"),
      L(28, "numerical-optimization-in-python", "Numerical Optimization in Python"),
    ],
  },
  {
    n: 6,
    title: "Stochastic Processes",
    lessons: [
      L(29, "random-walks", "Random Walks"),
      L(30, "markov-chains", "Markov Chains"),
      L(31, "brownian-motion", "Brownian Motion"),
      L(32, "martingales", "Martingales"),
      L(33, "introduction-to-stochastic-calculus-and-it-s-lemma", "Introduction to Stochastic Calculus & Itô's Lemma"),
      L(34, "monte-carlo-simulation", "Monte Carlo Simulation"),
    ],
  },
  {
    n: 7,
    title: "Quant Interview Mathematics",
    lessons: [
      L(35, "probability-brainteasers", "Probability Brainteasers"),
      L(36, "expected-value-and-betting-problems", "Expected Value & Betting Problems"),
      L(37, "combinatorics-and-counting", "Combinatorics & Counting"),
      L(38, "mental-math-and-estimation", "Mental Math & Estimation"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(39, "capstone-kickoff-a-mathematical-model-of-asset-prices", "Capstone Kickoff: A Mathematical Model of Asset Prices"),
      L(40, "capstone-build-it", "Capstone: Build It"),
      L(41, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
