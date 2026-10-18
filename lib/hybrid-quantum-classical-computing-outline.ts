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
      L(1, "why-almost-every-real-quantum-application-is-hybrid", "Why Almost Every Real Quantum Application Is Hybrid", { contentDir: "ch01/01-why-almost-every-real-quantum-application-is-hybrid", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357083/ltv-quantum/hybrid-quantum-classical-computing-ch01-01-why-almost-every-real-quantum-application-is-hybrid.mp4", durationLabel: "02:53" }),
      L(2, "the-variational-hybrid-loop-pattern", "The Variational Hybrid Loop Pattern", { contentDir: "ch01/02-the-variational-hybrid-loop-pattern", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357187/ltv-quantum/hybrid-quantum-classical-computing-ch01-02-the-variational-hybrid-loop-pattern.mp4", durationLabel: "02:32" }),
      L(3, "quantum-as-a-coprocessor-vs-quantum-as-the-whole-program", "Quantum as a Coprocessor vs. Quantum as the Whole Program", { contentDir: "ch01/03-quantum-as-a-coprocessor-vs-quantum-as-the-whole-program", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357263/ltv-quantum/hybrid-quantum-classical-computing-ch01-03-quantum-as-a-coprocessor-vs-quantum-as-the-whole-program.mp4", durationLabel: "02:32" }),
      L(4, "architecture-patterns-problem-solving-lab", "Architecture Patterns Problem-Solving Lab", { contentDir: "ch01/04-architecture-patterns-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358694/ltv-quantum/hybrid-quantum-classical-computing-ch01-04-architecture-patterns-problem-solving-lab.mp4", durationLabel: "02:28" }),
      L(5, "common-hybrid-architecture-mistakes", "Common Hybrid Architecture Mistakes", { contentDir: "ch01/05-common-hybrid-architecture-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358697/ltv-quantum/hybrid-quantum-classical-computing-ch01-05-common-hybrid-architecture-mistakes.mp4", durationLabel: "02:28" }),
    ],
  },
  {
    n: 2,
    title: "Classical Pre/Post-Processing for Quantum Workflows",
    lessons: [
      L(6, "data-preparation-for-quantum-circuits", "Data Preparation for Quantum Circuits", { contentDir: "ch02/06-data-preparation-for-quantum-circuits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358052/ltv-quantum/hybrid-quantum-classical-computing-ch02-06-data-preparation-for-quantum-circuits.mp4", durationLabel: "01:56" }),
      L(7, "classical-optimizers-driving-quantum-circuits", "Classical Optimizers Driving Quantum Circuits", { contentDir: "ch02/07-classical-optimizers-driving-quantum-circuits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357565/ltv-quantum/hybrid-quantum-classical-computing-ch02-07-classical-optimizers-driving-quantum-circuits.mp4", durationLabel: "02:04" }),
      L(8, "post-processing-and-result-aggregation", "Post-Processing & Result Aggregation", { contentDir: "ch02/08-post-processing-and-result-aggregation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357620/ltv-quantum/hybrid-quantum-classical-computing-ch02-08-post-processing-and-result-aggregation.mp4", durationLabel: "02:07" }),
      L(9, "pre-post-processing-lab", "Pre/Post-Processing Lab", { contentDir: "ch02/09-pre-post-processing-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357677/ltv-quantum/hybrid-quantum-classical-computing-ch02-09-pre-post-processing-lab.mp4", durationLabel: "02:07" }),
    ],
  },
  {
    n: 3,
    title: "Orchestrating Hybrid Pipelines",
    lessons: [
      L(10, "cloud-quantum-provider-apis-overview", "Cloud Quantum Provider APIs: Overview", { contentDir: "ch03/10-cloud-quantum-provider-apis-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357736/ltv-quantum/hybrid-quantum-classical-computing-ch03-10-cloud-quantum-provider-apis-overview.mp4", durationLabel: "01:48" }),
      L(11, "orchestrating-a-pipeline-across-classical-and-quantum-compute", "Orchestrating a Pipeline Across Classical & Quantum Compute", { contentDir: "ch03/11-orchestrating-a-pipeline-across-classical-and-quantum-compute", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357803/ltv-quantum/hybrid-quantum-classical-computing-ch03-11-orchestrating-a-pipeline-across-classical-and-quantum-compute.mp4", durationLabel: "02:14" }),
      L(12, "error-handling-for-remote-quantum-jobs", "Error Handling for Remote Quantum Jobs", { contentDir: "ch03/12-error-handling-for-remote-quantum-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357866/ltv-quantum/hybrid-quantum-classical-computing-ch03-12-error-handling-for-remote-quantum-jobs.mp4", durationLabel: "02:04" }),
      L(13, "retry-and-fallback-strategies-for-queued-hardware", "Retry & Fallback Strategies for Queued Hardware", { contentDir: "ch03/13-retry-and-fallback-strategies-for-queued-hardware", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792357951/ltv-quantum/hybrid-quantum-classical-computing-ch03-13-retry-and-fallback-strategies-for-queued-hardware.mp4", durationLabel: "02:10" }),
      L(14, "orchestration-lab", "Orchestration Lab", { contentDir: "ch03/14-orchestration-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358032/ltv-quantum/hybrid-quantum-classical-computing-ch03-14-orchestration-lab.mp4", durationLabel: "02:04" }),
    ],
  },
  {
    n: 4,
    title: "Cost, Latency & Resource Management",
    lessons: [
      L(15, "understanding-quantum-cloud-pricing-models", "Understanding Quantum Cloud Pricing Models", { contentDir: "ch04/15-understanding-quantum-cloud-pricing-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358092/ltv-quantum/hybrid-quantum-classical-computing-ch04-15-understanding-quantum-cloud-pricing-models.mp4", durationLabel: "02:10" }),
      L(16, "latency-budgets-for-hybrid-workflows", "Latency Budgets for Hybrid Workflows", { contentDir: "ch04/16-latency-budgets-for-hybrid-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358155/ltv-quantum/hybrid-quantum-classical-computing-ch04-16-latency-budgets-for-hybrid-workflows.mp4", durationLabel: "02:15" }),
      L(17, "shot-budgets-and-their-cost-and-accuracy-tradeoff", "Shot Budgets & Their Cost-vs-Accuracy Tradeoff", { contentDir: "ch04/17-shot-budgets-and-their-cost-and-accuracy-tradeoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358210/ltv-quantum/hybrid-quantum-classical-computing-ch04-17-shot-budgets-and-their-cost-and-accuracy-tradeoff.mp4", durationLabel: "01:59" }),
      L(18, "resource-management-lab", "Resource-Management Lab", { contentDir: "ch04/18-resource-management-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358271/ltv-quantum/hybrid-quantum-classical-computing-ch04-18-resource-management-lab.mp4", durationLabel: "02:21" }),
    ],
  },
  {
    n: 5,
    title: "Hybrid Workflow Project",
    lessons: [
      L(19, "project-kickoff-define-the-hybrid-workflow", "Project Kickoff: Define the Hybrid Workflow", { contentDir: "ch05/19-project-kickoff-define-the-hybrid-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358328/ltv-quantum/hybrid-quantum-classical-computing-ch05-19-project-kickoff-define-the-hybrid-workflow.mp4", durationLabel: "02:09" }),
      L(20, "project-build-the-orchestration-layer", "Project: Build the Orchestration Layer", { contentDir: "ch05/20-project-build-the-orchestration-layer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358383/ltv-quantum/hybrid-quantum-classical-computing-ch05-20-project-build-the-orchestration-layer.mp4", durationLabel: "02:06" }),
      L(21, "project-add-error-handling-and-cost-tracking", "Project: Add Error Handling & Cost Tracking", { contentDir: "ch05/21-project-add-error-handling-and-cost-tracking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358443/ltv-quantum/hybrid-quantum-classical-computing-ch05-21-project-add-error-handling-and-cost-tracking.mp4", durationLabel: "02:17" }),
      L(22, "project-wrap-up-and-architecture-review", "Project Wrap-Up & Architecture Review", { contentDir: "ch05/22-project-wrap-up-and-architecture-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792358500/ltv-quantum/hybrid-quantum-classical-computing-ch05-22-project-wrap-up-and-architecture-review.mp4", durationLabel: "02:13" }),
    ],
  },
];
