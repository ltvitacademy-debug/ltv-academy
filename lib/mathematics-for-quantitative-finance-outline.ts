// The Mathematics for Quantitative Finance course outline. All lessons
// have real guide.md content (the header here previously, incorrectly,
// called this "framework only" — fixed 2026-10-18). Lessons without a
// contentDir render as "in production". Step 1 of the Quantitative
// Developer / Researcher destination path. Assumes the Data Scientist
// path (basic statistics and Python); this course goes to the depth
// quant interviews and research actually require.
//
// Chapter 9 (lessons 42-43) is a deliberate exception added 2026-10-18:
// a 5-parallel-agent audit against an external 15-lesson upgrade
// proposal found 7 of 9 proposed topics already at genuine interview
// depth — game theory was the one real gap (zero coverage anywhere),
// and the other real gap was pedagogical: every "problem" in Chapter 7
// is a narrated worked example, never one the student solves themselves.
// Chapter 9 closes both with 2 lessons instead of 15.

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
      L(1, "limits-derivatives-and-rates-of-change", "Limits, Derivatives & Rates of Change", { contentDir: "ch01/01-limits-derivatives-and-rates-of-change", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506715/ltv-mathematics-for-quantitative-finance/limits-derivatives-and-rates-of-change.mp4", durationLabel: "1 min 49 s" }),
      L(2, "multivariable-calculus-and-gradients", "Multivariable Calculus & Gradients", { contentDir: "ch01/02-multivariable-calculus-and-gradients", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507501/ltv-mathematics-for-quantitative-finance/multivariable-calculus-and-gradients.mp4", durationLabel: "1 min 43 s" }),
      L(3, "integration-and-expectation", "Integration & Expectation", { contentDir: "ch01/03-integration-and-expectation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508202/ltv-mathematics-for-quantitative-finance/integration-and-expectation.mp4", durationLabel: "1 min 43 s" }),
      L(4, "taylor-series-and-approximation", "Taylor Series & Approximation", { contentDir: "ch01/04-taylor-series-and-approximation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508986/ltv-mathematics-for-quantitative-finance/taylor-series-and-approximation.mp4", durationLabel: "1 min 51 s" }),
      L(5, "ordinary-differential-equations-basics", "Ordinary Differential Equations Basics", { contentDir: "ch01/05-ordinary-differential-equations-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509770/ltv-mathematics-for-quantitative-finance/ordinary-differential-equations-basics.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 2,
    title: "Linear Algebra",
    lessons: [
      L(6, "vectors-matrices-and-linear-maps", "Vectors, Matrices & Linear Maps", { contentDir: "ch02/06-vectors-matrices-and-linear-maps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510646/ltv-mathematics-for-quantitative-finance/vectors-matrices-and-linear-maps.mp4", durationLabel: "1 min 57 s" }),
      L(7, "systems-of-equations-and-matrix-decompositions", "Systems of Equations & Matrix Decompositions", { contentDir: "ch02/07-systems-of-equations-and-matrix-decompositions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511481/ltv-mathematics-for-quantitative-finance/systems-of-equations-and-matrix-decompositions.mp4", durationLabel: "2 min 0 s" }),
      L(8, "eigenvalues-and-eigenvectors", "Eigenvalues & Eigenvectors", { contentDir: "ch02/08-eigenvalues-and-eigenvectors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512294/ltv-mathematics-for-quantitative-finance/eigenvalues-and-eigenvectors.mp4", durationLabel: "1 min 53 s" }),
      L(9, "singular-value-decomposition", "Singular Value Decomposition", { contentDir: "ch02/09-singular-value-decomposition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513121/ltv-mathematics-for-quantitative-finance/singular-value-decomposition.mp4", durationLabel: "1 min 57 s" }),
      L(10, "covariance-matrices-and-principal-components", "Covariance Matrices & Principal Components", { contentDir: "ch02/10-covariance-matrices-and-principal-components", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514010/ltv-mathematics-for-quantitative-finance/covariance-matrices-and-principal-components.mp4", durationLabel: "2 min 5 s" }),
      L(11, "linear-algebra-in-numpy", "Linear Algebra in NumPy", { contentDir: "ch02/11-linear-algebra-in-numpy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514950/ltv-mathematics-for-quantitative-finance/linear-algebra-in-numpy.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 3,
    title: "Probability Theory",
    lessons: [
      L(12, "probability-spaces-and-random-variables", "Probability Spaces & Random Variables", { contentDir: "ch03/12-probability-spaces-and-random-variables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515944/ltv-mathematics-for-quantitative-finance/probability-spaces-and-random-variables.mp4", durationLabel: "2 min 7 s" }),
      L(13, "expectation-variance-and-moments", "Expectation, Variance & Moments", { contentDir: "ch03/13-expectation-variance-and-moments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516870/ltv-mathematics-for-quantitative-finance/expectation-variance-and-moments.mp4", durationLabel: "2 min 9 s" }),
      L(14, "joint-distributions-and-conditioning", "Joint Distributions & Conditioning", { contentDir: "ch03/14-joint-distributions-and-conditioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517796/ltv-mathematics-for-quantitative-finance/joint-distributions-and-conditioning.mp4", durationLabel: "2 min 11 s" }),
      L(15, "law-of-large-numbers-and-central-limit-theorem", "Law of Large Numbers & Central Limit Theorem", { contentDir: "ch03/15-law-of-large-numbers-and-central-limit-theorem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518868/ltv-mathematics-for-quantitative-finance/law-of-large-numbers-and-central-limit-theorem.mp4", durationLabel: "2 min 22 s" }),
      L(16, "characteristic-and-moment-generating-functions", "Characteristic & Moment-Generating Functions", { contentDir: "ch03/16-characteristic-and-moment-generating-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519868/ltv-mathematics-for-quantitative-finance/characteristic-and-moment-generating-functions.mp4", durationLabel: "2 min 12 s" }),
      L(17, "common-distributions-in-finance", "Common Distributions in Finance", { contentDir: "ch03/17-common-distributions-in-finance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520903/ltv-mathematics-for-quantitative-finance/common-distributions-in-finance.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Advanced Statistics",
    lessons: [
      L(18, "estimation-maximum-likelihood-and-method-of-moments", "Estimation: Maximum Likelihood & Method of Moments", { contentDir: "ch04/18-estimation-maximum-likelihood-and-method-of-moments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522014/ltv-mathematics-for-quantitative-finance/estimation-maximum-likelihood-and-method-of-moments.mp4", durationLabel: "2 min 23 s" }),
      L(19, "bayesian-inference", "Bayesian Inference", { contentDir: "ch04/19-bayesian-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522992/ltv-mathematics-for-quantitative-finance/bayesian-inference.mp4", durationLabel: "2 min 16 s" }),
      L(20, "hypothesis-testing-revisited", "Hypothesis Testing Revisited", { contentDir: "ch04/20-hypothesis-testing-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524889/ltv-mathematics-for-quantitative-finance/hypothesis-testing-revisited.mp4", durationLabel: "2 min 19 s" }),
      L(21, "regression-theory-and-the-gauss-markov-assumptions", "Regression Theory & the Gauss-Markov Assumptions", { contentDir: "ch04/21-regression-theory-and-the-gauss-markov-assumptions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525935/ltv-mathematics-for-quantitative-finance/regression-theory-and-the-gauss-markov-assumptions.mp4", durationLabel: "2 min 20 s" }),
      L(22, "multiple-testing-and-false-discovery", "Multiple Testing & False Discovery", { contentDir: "ch04/22-multiple-testing-and-false-discovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526898/ltv-mathematics-for-quantitative-finance/multiple-testing-and-false-discovery.mp4", durationLabel: "2 min 10 s" }),
      L(23, "bootstrap-and-resampling-methods", "Bootstrap & Resampling Methods", { contentDir: "ch04/23-bootstrap-and-resampling-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528015/ltv-mathematics-for-quantitative-finance/bootstrap-and-resampling-methods.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 5,
    title: "Optimization",
    lessons: [
      L(24, "unconstrained-optimization-and-gradient-methods", "Unconstrained Optimization & Gradient Methods", { contentDir: "ch05/24-unconstrained-optimization-and-gradient-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529008/ltv-mathematics-for-quantitative-finance/unconstrained-optimization-and-gradient-methods.mp4", durationLabel: "2 min 15 s" }),
      L(25, "constrained-optimization-and-lagrange-multipliers", "Constrained Optimization & Lagrange Multipliers", { contentDir: "ch05/25-constrained-optimization-and-lagrange-multipliers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530150/ltv-mathematics-for-quantitative-finance/constrained-optimization-and-lagrange-multipliers.mp4", durationLabel: "2 min 22 s" }),
      L(26, "convex-optimization", "Convex Optimization", { contentDir: "ch05/26-convex-optimization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531097/ltv-mathematics-for-quantitative-finance/convex-optimization.mp4", durationLabel: "2 min 12 s" }),
      L(27, "quadratic-and-linear-programming", "Quadratic & Linear Programming", { contentDir: "ch05/27-quadratic-and-linear-programming", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532297/ltv-mathematics-for-quantitative-finance/quadratic-and-linear-programming.mp4", durationLabel: "2 min 28 s" }),
      L(28, "numerical-optimization-in-python", "Numerical Optimization in Python", { contentDir: "ch05/28-numerical-optimization-in-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600319/ltv-mathematics-for-quantitative-finance/numerical-optimization-in-python.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 6,
    title: "Stochastic Processes",
    lessons: [
      L(29, "random-walks", "Random Walks", { contentDir: "ch06/29-random-walks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601008/ltv-mathematics-for-quantitative-finance/random-walks.mp4", durationLabel: "2 min 4 s" }),
      L(30, "markov-chains", "Markov Chains", { contentDir: "ch06/30-markov-chains", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601690/ltv-mathematics-for-quantitative-finance/markov-chains.mp4", durationLabel: "2 min 15 s" }),
      L(31, "brownian-motion", "Brownian Motion", { contentDir: "ch06/31-brownian-motion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602366/ltv-mathematics-for-quantitative-finance/brownian-motion.mp4", durationLabel: "2 min 17 s" }),
      L(32, "martingales", "Martingales", { contentDir: "ch06/32-martingales", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603061/ltv-mathematics-for-quantitative-finance/martingales.mp4", durationLabel: "2 min 14 s" }),
      L(33, "introduction-to-stochastic-calculus-and-it-s-lemma", "Introduction to Stochastic Calculus & Itô's Lemma", { contentDir: "ch06/33-introduction-to-stochastic-calculus-and-it-s-lemma", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603770/ltv-mathematics-for-quantitative-finance/introduction-to-stochastic-calculus-and-it-s-lemma.mp4", durationLabel: "2 min 17 s" }),
      L(34, "monte-carlo-simulation", "Monte Carlo Simulation", { contentDir: "ch06/34-monte-carlo-simulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604500/ltv-mathematics-for-quantitative-finance/monte-carlo-simulation.mp4", durationLabel: "2 min 16 s" }),
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
  {
    n: 9,
    title: "Game Theory & Problem-Solving Practice",
    lessons: [
      L(42, "game-theory-for-quant-interviews", "Game Theory for Quant Interviews", {
        contentDir: "ch09/42-game-theory-for-quant-interviews",
      }),
      L(43, "interview-problem-set-solve-it-yourself", "Interview Problem Set: Solve It Yourself", {
        contentDir: "ch09/43-interview-problem-set-solve-it-yourself",
      }),
    ],
  },
];
