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
      L(1, "what-combinatorial-optimization-problems-look-like", "What Combinatorial Optimization Problems Look Like", { contentDir: "ch01/01-what-combinatorial-optimization-problems-look-like", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368257/ltv-quantum/quantum-optimization-and-financial-applications-ch01-01-what-combinatorial-optimization-problems-look-like.mp4", durationLabel: "2:17" }),
      L(2, "the-qubo-formulation", "The QUBO Formulation", { contentDir: "ch01/02-the-qubo-formulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368365/ltv-quantum/quantum-optimization-and-financial-applications-ch01-02-the-qubo-formulation.mp4", durationLabel: "2:26" }),
      L(3, "the-ising-model-connection", "The Ising Model Connection", { contentDir: "ch01/03-the-ising-model-connection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368487/ltv-quantum/quantum-optimization-and-financial-applications-ch01-03-the-ising-model-connection.mp4", durationLabel: "2:40" }),
      L(4, "formulating-max-cut-as-a-qubo", "Formulating Max-Cut as a QUBO", { contentDir: "ch01/04-formulating-max-cut-as-a-qubo", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368606/ltv-quantum/quantum-optimization-and-financial-applications-ch01-04-formulating-max-cut-as-a-qubo.mp4", durationLabel: "2:21" }),
      L(5, "qubo-formulation-lab", "QUBO Formulation Lab", { contentDir: "ch01/05-qubo-formulation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368733/ltv-quantum/quantum-optimization-and-financial-applications-ch01-05-qubo-formulation-lab.mp4", durationLabel: "2:27" }),
    ],
  },
  {
    n: 2,
    title: "Quantum Approximate Optimization Algorithm (QAOA)",
    lessons: [
      L(6, "the-qaoa-circuit-structure", "The QAOA Circuit Structure", { contentDir: "ch02/06-the-qaoa-circuit-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368861/ltv-quantum/quantum-optimization-and-financial-applications-ch02-06-the-qaoa-circuit-structure.mp4", durationLabel: "2:35" }),
      L(7, "the-cost-and-mixer-hamiltonians", "The Cost & Mixer Hamiltonians", { contentDir: "ch02/07-the-cost-and-mixer-hamiltonians", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368973/ltv-quantum/quantum-optimization-and-financial-applications-ch02-07-the-cost-and-mixer-hamiltonians.mp4", durationLabel: "2:39" }),
      L(8, "classical-parameter-optimization-in-qaoa", "Classical Parameter Optimization in QAOA", { contentDir: "ch02/08-classical-parameter-optimization-in-qaoa", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369107/ltv-quantum/quantum-optimization-and-financial-applications-ch02-08-classical-parameter-optimization-in-qaoa.mp4", durationLabel: "2:38" }),
      L(9, "qaoa-depth-and-approximation-quality", "QAOA Depth & Approximation Quality", { contentDir: "ch02/09-qaoa-depth-and-approximation-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369233/ltv-quantum/quantum-optimization-and-financial-applications-ch02-09-qaoa-depth-and-approximation-quality.mp4", durationLabel: "2:25" }),
      L(10, "qaoa-implementation-lab", "QAOA Implementation Lab", { contentDir: "ch02/10-qaoa-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369362/ltv-quantum/quantum-optimization-and-financial-applications-ch02-10-qaoa-implementation-lab.mp4", durationLabel: "2:30" }),
    ],
  },
  {
    n: 3,
    title: "Variational Quantum Eigensolver (VQE)",
    lessons: [
      L(11, "what-vqe-is-solving-for", "What VQE Is Solving For", { contentDir: "ch03/11-what-vqe-is-solving-for", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369494/ltv-quantum/quantum-optimization-and-financial-applications-ch03-11-what-vqe-is-solving-for.mp4", durationLabel: "2:47" }),
      L(12, "vqe-circuit-ansatz-design", "VQE Circuit Ansatz Design", { contentDir: "ch03/12-vqe-circuit-ansatz-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369605/ltv-quantum/quantum-optimization-and-financial-applications-ch03-12-vqe-circuit-ansatz-design.mp4", durationLabel: "2:40" }),
      L(13, "vqe-for-molecular-ground-state-energy", "VQE for Molecular Ground-State Energy", { contentDir: "ch03/13-vqe-for-molecular-ground-state-energy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369726/ltv-quantum/quantum-optimization-and-financial-applications-ch03-13-vqe-for-molecular-ground-state-energy.mp4", durationLabel: "2:39" }),
      L(14, "vqe-implementation-lab", "VQE Implementation Lab", { contentDir: "ch03/14-vqe-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369848/ltv-quantum/quantum-optimization-and-financial-applications-ch03-14-vqe-implementation-lab.mp4", durationLabel: "2:37" }),
    ],
  },
  {
    n: 4,
    title: "Quantum Finance Applications",
    lessons: [
      L(15, "portfolio-optimization-as-a-qubo-problem", "Portfolio Optimization as a QUBO Problem", { contentDir: "ch04/15-portfolio-optimization-as-a-qubo-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369969/ltv-quantum/quantum-optimization-and-financial-applications-ch04-15-portfolio-optimization-as-a-qubo-problem.mp4", durationLabel: "2:31" }),
      L(16, "quantum-amplitude-estimation-for-risk-analysis", "Quantum Amplitude Estimation for Risk Analysis", { contentDir: "ch04/16-quantum-amplitude-estimation-for-risk-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370076/ltv-quantum/quantum-optimization-and-financial-applications-ch04-16-quantum-amplitude-estimation-for-risk-analysis.mp4", durationLabel: "2:40" }),
      L(17, "quantum-monte-carlo-methods-overview", "Quantum Monte Carlo Methods: Overview", { contentDir: "ch04/17-quantum-monte-carlo-methods-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370195/ltv-quantum/quantum-optimization-and-financial-applications-ch04-17-quantum-monte-carlo-methods-overview.mp4", durationLabel: "2:25" }),
      L(18, "honest-limits-of-quantum-finance-today", "Honest Limits of Quantum Finance Today", { contentDir: "ch04/18-honest-limits-of-quantum-finance-today", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370313/ltv-quantum/quantum-optimization-and-financial-applications-ch04-18-honest-limits-of-quantum-finance-today.mp4", durationLabel: "2:26" }),
      L(19, "quantum-finance-lab", "Quantum Finance Lab", { contentDir: "ch04/19-quantum-finance-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370430/ltv-quantum/quantum-optimization-and-financial-applications-ch04-19-quantum-finance-lab.mp4", durationLabel: "2:29" }),
    ],
  },
  {
    n: 5,
    title: "Benchmarking Quantum Optimization vs. Classical Solvers",
    lessons: [
      L(20, "classical-optimization-baselines-simulated-annealing-and-cplex-style-solvers", "Classical Optimization Baselines: Simulated Annealing & Solver-Style Methods", { contentDir: "ch05/20-classical-optimization-baselines-simulated-annealing-and-cplex-style-solvers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370543/ltv-quantum/quantum-optimization-and-financial-applications-ch05-20-classical-optimization-baselines.mp4", durationLabel: "2:25" }),
      L(21, "designing-a-fair-benchmark", "Designing a Fair Benchmark", { contentDir: "ch05/21-designing-a-fair-benchmark", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370682/ltv-quantum/quantum-optimization-and-financial-applications-ch05-21-designing-a-fair-benchmark.mp4", durationLabel: "2:20" }),
      L(22, "where-quantum-optimization-currently-stands", "Where Quantum Optimization Currently Stands", { contentDir: "ch05/22-where-quantum-optimization-currently-stands", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370788/ltv-quantum/quantum-optimization-and-financial-applications-ch05-22-where-quantum-optimization-currently-stands.mp4", durationLabel: "2:27" }),
      L(23, "benchmarking-lab", "Benchmarking Lab", { contentDir: "ch05/23-benchmarking-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370905/ltv-quantum/quantum-optimization-and-financial-applications-ch05-23-benchmarking-lab.mp4", durationLabel: "2:23" }),
    ],
  },
  {
    n: 6,
    title: "Optimization Capstone Lab",
    lessons: [
      L(24, "capstone-kickoff-choose-a-real-optimization-problem", "Capstone Kickoff: Choose a Real Optimization Problem", { contentDir: "ch06/24-capstone-kickoff-choose-a-real-optimization-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371017/ltv-quantum/quantum-optimization-and-financial-applications-ch06-24-capstone-kickoff.mp4", durationLabel: "2:17" }),
      L(25, "capstone-build-the-hybrid-optimization-workflow", "Capstone: Build the Hybrid Optimization Workflow", { contentDir: "ch06/25-capstone-build-the-hybrid-optimization-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371129/ltv-quantum/quantum-optimization-and-financial-applications-ch06-25-capstone-hybrid-workflow.mp4", durationLabel: "2:10" }),
      L(26, "capstone-compare-against-a-classical-baseline", "Capstone: Compare Against a Classical Baseline", { contentDir: "ch06/26-capstone-compare-against-a-classical-baseline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371243/ltv-quantum/quantum-optimization-and-financial-applications-ch06-26-capstone-classical-baseline.mp4", durationLabel: "2:19" }),
      L(27, "capstone-wrap-up-document-limitations-and-costs", "Capstone Wrap-Up: Document Limitations & Costs", { contentDir: "ch06/27-capstone-wrap-up-document-limitations-and-costs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371363/ltv-quantum/quantum-optimization-and-financial-applications-ch06-27-capstone-wrap-up.mp4", durationLabel: "2:26" }),
    ],
  },
];
