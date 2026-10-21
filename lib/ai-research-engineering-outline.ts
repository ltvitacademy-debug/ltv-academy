// The AI Research Engineering course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Fifth course of the AI/ML Research Engineer & Alignment Engineer
// destination. Assumes AI Safety, Alignment & Interpretability. Covers the craft of
// research engineering itself — reading and reproducing papers, research codebases,
// experiment infrastructure and research collaboration — distinct from any one
// research subfield.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-research-engineering/
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

export const AI_RESEARCH_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Research Engineer Role",
    lessons: [
      L(1, "research-engineer-vs-research-scientist", "Research Engineer vs. Research Scientist", { contentDir: "ch01/01-research-engineer-vs-research-scientist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617196/ltv-ai-research-engineering/research-engineer-vs-research-scientist.mp4", durationLabel: "1 min 55 s" }),
      L(2, "research-engineer-vs-product-engineer", "Research Engineer vs. Product Engineer", { contentDir: "ch01/02-research-engineer-vs-product-engineer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617341/ltv-ai-research-engineering/research-engineer-vs-product-engineer.mp4", durationLabel: "2 min 18 s" }),
      L(3, "a-day-in-the-life-of-a-research-engineer", "A Day in the Life of a Research Engineer", { contentDir: "ch01/03-a-day-in-the-life-of-a-research-engineer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617469/ltv-ai-research-engineering/a-day-in-the-life-of-a-research-engineer.mp4", durationLabel: "2 min 2 s" }),
      L(4, "what-makes-research-code-different", "What Makes Research Code Different", { contentDir: "ch01/04-what-makes-research-code-different", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617604/ltv-ai-research-engineering/what-makes-research-code-different.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 2,
    title: "Reading & Reproducing Papers",
    lessons: [
      L(5, "how-to-read-an-ml-paper", "How to Read an ML Paper", { contentDir: "ch02/05-how-to-read-an-ml-paper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617709/ltv-ai-research-engineering/how-to-read-an-ml-paper.mp4", durationLabel: "1 min 49 s" }),
      L(6, "identifying-the-load-bearing-claim", "Identifying the Load-Bearing Claim", { contentDir: "ch02/06-identifying-the-load-bearing-claim", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617820/ltv-ai-research-engineering/identifying-the-load-bearing-claim.mp4", durationLabel: "1 min 49 s" }),
      L(7, "reproducing-a-published-result", "Reproducing a Published Result", { contentDir: "ch02/07-reproducing-a-published-result", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617921/ltv-ai-research-engineering/reproducing-a-published-result.mp4", durationLabel: "1 min 48 s" }),
      L(8, "common-reproducibility-pitfalls", "Common Reproducibility Pitfalls", { contentDir: "ch02/08-common-reproducibility-pitfalls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618019/ltv-ai-research-engineering/common-reproducibility-pitfalls.mp4", durationLabel: "1 min 53 s" }),
      L(9, "when-a-paper-doesnt-reproduce", "When a Paper Doesn't Reproduce", { contentDir: "ch02/09-when-a-paper-doesnt-reproduce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618119/ltv-ai-research-engineering/when-a-paper-doesnt-reproduce.mp4", durationLabel: "1 min 55 s" }),
      L(10, "building-a-personal-paper-reading-practice", "Building a Personal Paper-Reading Practice", { contentDir: "ch02/10-building-a-personal-paper-reading-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618205/ltv-ai-research-engineering/building-a-personal-paper-reading-practice.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 3,
    title: "Research Codebases",
    lessons: [
      L(11, "structuring-a-research-codebase", "Structuring a Research Codebase", { contentDir: "ch03/11-structuring-a-research-codebase", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618307/ltv-ai-research-engineering/structuring-a-research-codebase.mp4", durationLabel: "1 min 56 s" }),
      L(12, "config-systems-for-experiments", "Config Systems for Experiments", { contentDir: "ch03/12-config-systems-for-experiments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618417/ltv-ai-research-engineering/config-systems-for-experiments.mp4", durationLabel: "2 min 6 s" }),
      L(13, "research-code-vs-production-code-tradeoffs", "Research Code vs. Production Code Trade-offs", { contentDir: "ch03/13-research-code-vs-production-code-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618513/ltv-ai-research-engineering/research-code-vs-production-code-tradeoffs.mp4", durationLabel: "1 min 50 s" }),
      L(14, "testing-strategies-for-research-code", "Testing Strategies for Research Code", { contentDir: "ch03/14-testing-strategies-for-research-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621089/ltv-ai-research-engineering/testing-strategies-for-research-code.mp4", durationLabel: "1 min 50 s" }),
      L(15, "code-review-norms-for-research-teams", "Code Review Norms for Research Teams", { contentDir: "ch03/15-code-review-norms-for-research-teams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618690/ltv-ai-research-engineering/code-review-norms-for-research-teams.mp4", durationLabel: "1 min 53 s" }),
      L(16, "version-control-for-experiments", "Version Control for Experiments", { contentDir: "ch03/16-version-control-for-experiments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618792/ltv-ai-research-engineering/version-control-for-experiments.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 4,
    title: "Experiment Management at Scale",
    lessons: [
      L(17, "designing-a-hyperparameter-sweep", "Designing a Hyperparameter Sweep", { contentDir: "ch04/17-designing-a-hyperparameter-sweep", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618882/ltv-ai-research-engineering/designing-a-hyperparameter-sweep.mp4", durationLabel: "1 min 50 s" }),
      L(18, "random-grid-and-bayesian-search", "Random, Grid & Bayesian Search", { contentDir: "ch04/18-random-grid-and-bayesian-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618969/ltv-ai-research-engineering/random-grid-and-bayesian-search.mp4", durationLabel: "1 min 47 s" }),
      L(19, "experiment-tracking-infrastructure", "Experiment Tracking Infrastructure", { contentDir: "ch04/19-experiment-tracking-infrastructure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619071/ltv-ai-research-engineering/experiment-tracking-infrastructure.mp4", durationLabel: "1 min 42 s" }),
      L(20, "compute-scheduling-across-a-team", "Compute Scheduling Across a Team", { contentDir: "ch04/20-compute-scheduling-across-a-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619148/ltv-ai-research-engineering/compute-scheduling-across-a-team.mp4", durationLabel: "1 min 25 s" }),
      L(21, "prioritizing-experiments-under-compute-constraints", "Prioritizing Experiments Under Compute Constraints", { contentDir: "ch04/21-prioritizing-experiments-under-compute-constraints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619236/ltv-ai-research-engineering/prioritizing-experiments-under-compute-constraints.mp4", durationLabel: "1 min 31 s" }),
      L(22, "ablation-study-design", "Ablation Study Design", { contentDir: "ch04/22-ablation-study-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619320/ltv-ai-research-engineering/ablation-study-design.mp4", durationLabel: "1 min 33 s" }),
    ],
  },
  {
    n: 5,
    title: "Research Infrastructure",
    lessons: [
      L(23, "job-queues-and-cluster-basics", "Job Queues & Cluster Basics", { contentDir: "ch05/23-job-queues-and-cluster-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619384/ltv-ai-research-engineering/job-queues-and-cluster-basics.mp4", durationLabel: "1 min 18 s" }),
      L(24, "slurm-for-research-workloads", "Slurm for Research Workloads", { contentDir: "ch05/24-slurm-for-research-workloads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619468/ltv-ai-research-engineering/slurm-for-research-workloads.mp4", durationLabel: "1 min 40 s" }),
      L(25, "kubernetes-for-research-jobs", "Kubernetes for Research Jobs", { contentDir: "ch05/25-kubernetes-for-research-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619547/ltv-ai-research-engineering/kubernetes-for-research-jobs.mp4", durationLabel: "1 min 42 s" }),
      L(26, "data-versioning-for-experiments", "Data Versioning for Experiments", { contentDir: "ch05/26-data-versioning-for-experiments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619631/ltv-ai-research-engineering/data-versioning-for-experiments.mp4", durationLabel: "1 min 41 s" }),
      L(27, "shared-infrastructure-across-a-research-team", "Shared Infrastructure Across a Research Team", { contentDir: "ch05/27-shared-infrastructure-across-a-research-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619709/ltv-ai-research-engineering/shared-infrastructure-across-a-research-team.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 6,
    title: "Debugging Research Code",
    lessons: [
      L(28, "silent-bugs-vs-loud-bugs", "Silent Bugs vs. Loud Bugs", { contentDir: "ch06/28-silent-bugs-vs-loud-bugs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619813/ltv-ai-research-engineering/silent-bugs-vs-loud-bugs.mp4", durationLabel: "2 min 8 s" }),
      L(29, "numerical-issues-in-training-code", "Numerical Issues in Training Code", { contentDir: "ch06/29-numerical-issues-in-training-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619892/ltv-ai-research-engineering/numerical-issues-in-training-code.mp4", durationLabel: "2 min" }),
      L(30, "verifying-correctness-without-ground-truth", "Verifying Correctness Without Ground Truth", { contentDir: "ch06/30-verifying-correctness-without-ground-truth", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619960/ltv-ai-research-engineering/verifying-correctness-without-ground-truth.mp4", durationLabel: "2 min 2 s" }),
      L(31, "sanity-checks-every-researcher-should-run", "Sanity Checks Every Researcher Should Run", { contentDir: "ch06/31-sanity-checks-every-researcher-should-run", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620027/ltv-ai-research-engineering/sanity-checks-every-researcher-should-run.mp4", durationLabel: "1 min 59 s" }),
      L(32, "debugging-a-run-that-wont-improve", "Debugging a Run That Won't Improve", { contentDir: "ch06/32-debugging-a-run-that-wont-improve", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620096/ltv-ai-research-engineering/debugging-a-run-that-wont-improve.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
  {
    n: 7,
    title: "Collaborating on Research",
    lessons: [
      L(33, "writing-a-technical-research-report", "Writing a Technical Research Report", { contentDir: "ch07/33-writing-a-technical-research-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620153/ltv-ai-research-engineering/writing-a-technical-research-report.mp4", durationLabel: "1 min 45 s" }),
      L(34, "presenting-negative-results", "Presenting Negative Results", { contentDir: "ch07/34-presenting-negative-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620217/ltv-ai-research-engineering/presenting-negative-results.mp4", durationLabel: "1 min 53 s" }),
      L(35, "research-project-management", "Research Project Management", { contentDir: "ch07/35-research-project-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620282/ltv-ai-research-engineering/research-project-management.mp4", durationLabel: "2 min 3 s" }),
      L(36, "working-with-research-scientists-as-an-engineer", "Working With Research Scientists as an Engineer", { contentDir: "ch07/36-working-with-research-scientists-as-an-engineer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620344/ltv-ai-research-engineering/working-with-research-scientists-as-an-engineer.mp4", durationLabel: "1 min 51 s" }),
      L(37, "giving-and-receiving-research-feedback", "Giving & Receiving Research Feedback", { contentDir: "ch07/37-giving-and-receiving-research-feedback", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620406/ltv-ai-research-engineering/giving-and-receiving-research-feedback.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 8,
    title: "From Research to Production",
    lessons: [
      L(38, "handing-off-a-research-model", "Handing Off a Research Model", { contentDir: "ch08/38-handing-off-a-research-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620471/ltv-ai-research-engineering/handing-off-a-research-model.mp4", durationLabel: "1 min 59 s" }),
      L(39, "productionization-tradeoffs", "Productionization Trade-offs", { contentDir: "ch08/39-productionization-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620535/ltv-ai-research-engineering/productionization-tradeoffs.mp4", durationLabel: "2 min" }),
      L(40, "what-survives-the-transition-to-production", "What Survives the Transition to Production", { contentDir: "ch08/40-what-survives-the-transition-to-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620600/ltv-ai-research-engineering/what-survives-the-transition-to-production.mp4", durationLabel: "1 min 57 s" }),
      L(41, "closing-the-loop-production-feedback-into-research", "Closing the Loop: Production Feedback Into Research", { contentDir: "ch08/41-closing-the-loop-production-feedback-into-research", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620667/ltv-ai-research-engineering/closing-the-loop-production-feedback-into-research.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Reproduce and Extend a Published Result",
    lessons: [
      L(42, "capstone-kickoff-and-paper-selection", "Capstone Kickoff & Paper Selection", { contentDir: "ch09/42-capstone-kickoff-and-paper-selection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620734/ltv-ai-research-engineering/capstone-kickoff-and-paper-selection.mp4", durationLabel: "2 min 6 s" }),
      L(43, "capstone-reproducing-the-core-result", "Capstone: Reproducing the Core Result", { contentDir: "ch09/43-capstone-reproducing-the-core-result", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620799/ltv-ai-research-engineering/capstone-reproducing-the-core-result.mp4", durationLabel: "2 min" }),
      L(44, "capstone-extending-the-result", "Capstone: Extending the Result", { contentDir: "ch09/44-capstone-extending-the-result", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620864/ltv-ai-research-engineering/capstone-extending-the-result.mp4", durationLabel: "2 min" }),
      L(45, "capstone-writeup-and-presentation", "Capstone: Write-Up & Presentation", { contentDir: "ch09/45-capstone-writeup-and-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792620926/ltv-ai-research-engineering/capstone-writeup-and-presentation.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
];
