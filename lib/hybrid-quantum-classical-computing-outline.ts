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
      L(1, "why-almost-every-real-quantum-application-is-hybrid", "Why Almost Every Real Quantum Application Is Hybrid"),
      L(2, "the-variational-hybrid-loop-pattern", "The Variational Hybrid Loop Pattern"),
      L(3, "quantum-as-a-coprocessor-vs-quantum-as-the-whole-program", "Quantum as a Coprocessor vs. Quantum as the Whole Program"),
      L(4, "architecture-patterns-problem-solving-lab", "Architecture Patterns Problem-Solving Lab"),
      L(5, "common-hybrid-architecture-mistakes", "Common Hybrid Architecture Mistakes"),
    ],
  },
  {
    n: 2,
    title: "Classical Pre/Post-Processing for Quantum Workflows",
    lessons: [
      L(6, "data-preparation-for-quantum-circuits", "Data Preparation for Quantum Circuits"),
      L(7, "classical-optimizers-driving-quantum-circuits", "Classical Optimizers Driving Quantum Circuits"),
      L(8, "post-processing-and-result-aggregation", "Post-Processing & Result Aggregation"),
      L(9, "pre-post-processing-lab", "Pre/Post-Processing Lab"),
    ],
  },
  {
    n: 3,
    title: "Orchestrating Hybrid Pipelines",
    lessons: [
      L(10, "cloud-quantum-provider-apis-overview", "Cloud Quantum Provider APIs: Overview"),
      L(11, "orchestrating-a-pipeline-across-classical-and-quantum-compute", "Orchestrating a Pipeline Across Classical & Quantum Compute"),
      L(12, "error-handling-for-remote-quantum-jobs", "Error Handling for Remote Quantum Jobs"),
      L(13, "retry-and-fallback-strategies-for-queued-hardware", "Retry & Fallback Strategies for Queued Hardware"),
      L(14, "orchestration-lab", "Orchestration Lab"),
    ],
  },
  {
    n: 4,
    title: "Cost, Latency & Resource Management",
    lessons: [
      L(15, "understanding-quantum-cloud-pricing-models", "Understanding Quantum Cloud Pricing Models"),
      L(16, "latency-budgets-for-hybrid-workflows", "Latency Budgets for Hybrid Workflows"),
      L(17, "shot-budgets-and-their-cost-and-accuracy-tradeoff", "Shot Budgets & Their Cost-vs-Accuracy Tradeoff"),
      L(18, "resource-management-lab", "Resource-Management Lab"),
    ],
  },
  {
    n: 5,
    title: "Hybrid Workflow Project",
    lessons: [
      L(19, "project-kickoff-define-the-hybrid-workflow", "Project Kickoff: Define the Hybrid Workflow"),
      L(20, "project-build-the-orchestration-layer", "Project: Build the Orchestration Layer"),
      L(21, "project-add-error-handling-and-cost-tracking", "Project: Add Error Handling & Cost Tracking"),
      L(22, "project-wrap-up-and-architecture-review", "Project Wrap-Up & Architecture Review"),
    ],
  },
];
