// Hybrid Quantum-Classical Computing course outline. Lessons without a contentDir render as
// "in production". Course 12 of 14 in the Quantum Computing Software Engineer path: the real
// engineering of orchestrating quantum and classical compute together in production-shaped workflows.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/hybrid-quantum-classical-computing/
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

export const HYBRID_QUANTUM_CLASSICAL_COMPUTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Hybrid Computing Architecture Patterns",
    lessons: [
      L(1, "why-almost-every-real-quantum-application-is-hybrid", "Why Almost Every Real Quantum Application Is Hybrid", { contentDir: "ch01/01-why-almost-every-real-quantum-application-is-hybrid" }),
      L(2, "the-variational-hybrid-loop-pattern", "The Variational Hybrid Loop Pattern", { contentDir: "ch01/02-the-variational-hybrid-loop-pattern" }),
      L(3, "quantum-as-a-coprocessor-vs-quantum-as-the-whole-program", "Quantum as a Coprocessor vs. Quantum as the Whole Program", { contentDir: "ch01/03-quantum-as-a-coprocessor-vs-quantum-as-the-whole-program" }),
      L(4, "architecture-patterns-problem-solving-lab", "Architecture Patterns Problem-Solving Lab", { contentDir: "ch01/04-architecture-patterns-problem-solving-lab" }),
      L(5, "common-hybrid-architecture-mistakes", "Common Hybrid Architecture Mistakes", { contentDir: "ch01/05-common-hybrid-architecture-mistakes" }),
    ],
  },
  {
    n: 2,
    title: "Classical Pre/Post-Processing for Quantum Workflows",
    lessons: [
      L(6, "data-preparation-for-quantum-circuits", "Data Preparation for Quantum Circuits", { contentDir: "ch02/06-data-preparation-for-quantum-circuits" }),
      L(7, "classical-optimizers-driving-quantum-circuits", "Classical Optimizers Driving Quantum Circuits", { contentDir: "ch02/07-classical-optimizers-driving-quantum-circuits" }),
      L(8, "post-processing-and-result-aggregation", "Post-Processing & Result Aggregation", { contentDir: "ch02/08-post-processing-and-result-aggregation" }),
      L(9, "pre-post-processing-lab", "Pre/Post-Processing Lab", { contentDir: "ch02/09-pre-post-processing-lab" }),
    ],
  },
  {
    n: 3,
    title: "Orchestrating Hybrid Pipelines",
    lessons: [
      L(10, "cloud-quantum-provider-apis-overview", "Cloud Quantum Provider APIs: Overview", { contentDir: "ch03/10-cloud-quantum-provider-apis-overview" }),
      L(11, "orchestrating-a-pipeline-across-classical-and-quantum-compute", "Orchestrating a Pipeline Across Classical & Quantum Compute", { contentDir: "ch03/11-orchestrating-a-pipeline-across-classical-and-quantum-compute" }),
      L(12, "error-handling-for-remote-quantum-jobs", "Error Handling for Remote Quantum Jobs", { contentDir: "ch03/12-error-handling-for-remote-quantum-jobs" }),
      L(13, "retry-and-fallback-strategies-for-queued-hardware", "Retry & Fallback Strategies for Queued Hardware", { contentDir: "ch03/13-retry-and-fallback-strategies-for-queued-hardware" }),
      L(14, "orchestration-lab", "Orchestration Lab", { contentDir: "ch03/14-orchestration-lab" }),
    ],
  },
  {
    n: 4,
    title: "Cost, Latency & Resource Management",
    lessons: [
      L(15, "understanding-quantum-cloud-pricing-models", "Understanding Quantum Cloud Pricing Models", { contentDir: "ch04/15-understanding-quantum-cloud-pricing-models" }),
      L(16, "latency-budgets-for-hybrid-workflows", "Latency Budgets for Hybrid Workflows", { contentDir: "ch04/16-latency-budgets-for-hybrid-workflows" }),
      L(17, "shot-budgets-and-their-cost-and-accuracy-tradeoff", "Shot Budgets & Their Cost-vs-Accuracy Tradeoff", { contentDir: "ch04/17-shot-budgets-and-their-cost-and-accuracy-tradeoff" }),
      L(18, "resource-management-lab", "Resource-Management Lab", { contentDir: "ch04/18-resource-management-lab" }),
    ],
  },
  {
    n: 5,
    title: "Hybrid Workflow Project",
    lessons: [
      L(19, "project-kickoff-define-the-hybrid-workflow", "Project Kickoff: Define the Hybrid Workflow", { contentDir: "ch05/19-project-kickoff-define-the-hybrid-workflow" }),
      L(20, "project-build-the-orchestration-layer", "Project: Build the Orchestration Layer", { contentDir: "ch05/20-project-build-the-orchestration-layer" }),
      L(21, "project-add-error-handling-and-cost-tracking", "Project: Add Error Handling & Cost Tracking", { contentDir: "ch05/21-project-add-error-handling-and-cost-tracking" }),
      L(22, "project-wrap-up-and-architecture-review", "Project Wrap-Up & Architecture Review", { contentDir: "ch05/22-project-wrap-up-and-architecture-review" }),
    ],
  },
];
