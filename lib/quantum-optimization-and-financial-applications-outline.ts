// Quantum Optimization & Financial Applications course outline. Lessons without a contentDir
// render as "in production". Course 11 of 14 in the Quantum Computing Software Engineer path:
// QAOA, VQE, and real-world-shaped optimization problems, benchmarked honestly against classical solvers.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-optimization-and-financial-applications/
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

export const QUANTUM_OPTIMIZATION_AND_FINANCIAL_APPLICATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Combinatorial Optimization & QUBO Formulation",
    lessons: [
      L(1, "what-combinatorial-optimization-problems-look-like", "What Combinatorial Optimization Problems Look Like"),
      L(2, "the-qubo-formulation", "The QUBO Formulation"),
      L(3, "the-ising-model-connection", "The Ising Model Connection"),
      L(4, "formulating-max-cut-as-a-qubo", "Formulating Max-Cut as a QUBO"),
      L(5, "qubo-formulation-lab", "QUBO Formulation Lab"),
    ],
  },
  {
    n: 2,
    title: "Quantum Approximate Optimization Algorithm (QAOA)",
    lessons: [
      L(6, "the-qaoa-circuit-structure", "The QAOA Circuit Structure"),
      L(7, "the-cost-and-mixer-hamiltonians", "The Cost & Mixer Hamiltonians"),
      L(8, "classical-parameter-optimization-in-qaoa", "Classical Parameter Optimization in QAOA"),
      L(9, "qaoa-depth-and-approximation-quality", "QAOA Depth & Approximation Quality"),
      L(10, "qaoa-implementation-lab", "QAOA Implementation Lab"),
    ],
  },
  {
    n: 3,
    title: "Variational Quantum Eigensolver (VQE)",
    lessons: [
      L(11, "what-vqe-is-solving-for", "What VQE Is Solving For"),
      L(12, "vqe-circuit-ansatz-design", "VQE Circuit Ansatz Design"),
      L(13, "vqe-for-molecular-ground-state-energy", "VQE for Molecular Ground-State Energy"),
      L(14, "vqe-implementation-lab", "VQE Implementation Lab"),
    ],
  },
  {
    n: 4,
    title: "Quantum Finance Applications",
    lessons: [
      L(15, "portfolio-optimization-as-a-qubo-problem", "Portfolio Optimization as a QUBO Problem"),
      L(16, "quantum-amplitude-estimation-for-risk-analysis", "Quantum Amplitude Estimation for Risk Analysis"),
      L(17, "quantum-monte-carlo-methods-overview", "Quantum Monte Carlo Methods: Overview"),
      L(18, "honest-limits-of-quantum-finance-today", "Honest Limits of Quantum Finance Today"),
      L(19, "quantum-finance-lab", "Quantum Finance Lab"),
    ],
  },
  {
    n: 5,
    title: "Benchmarking Quantum Optimization vs. Classical Solvers",
    lessons: [
      L(20, "classical-optimization-baselines-simulated-annealing-and-cplex-style-solvers", "Classical Optimization Baselines: Simulated Annealing & Solver-Style Methods"),
      L(21, "designing-a-fair-benchmark", "Designing a Fair Benchmark"),
      L(22, "where-quantum-optimization-currently-stands", "Where Quantum Optimization Currently Stands"),
      L(23, "benchmarking-lab", "Benchmarking Lab"),
    ],
  },
  {
    n: 6,
    title: "Optimization Capstone Lab",
    lessons: [
      L(24, "capstone-kickoff-choose-a-real-optimization-problem", "Capstone Kickoff: Choose a Real Optimization Problem"),
      L(25, "capstone-build-the-hybrid-optimization-workflow", "Capstone: Build the Hybrid Optimization Workflow"),
      L(26, "capstone-compare-against-a-classical-baseline", "Capstone: Compare Against a Classical Baseline"),
      L(27, "capstone-wrap-up-document-limitations-and-costs", "Capstone Wrap-Up: Document Limitations & Costs"),
    ],
  },
];
