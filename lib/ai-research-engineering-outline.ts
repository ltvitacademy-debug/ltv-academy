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
      L(1, "research-engineer-vs-research-scientist", "Research Engineer vs. Research Scientist", { contentDir: "ch01/01-research-engineer-vs-research-scientist" }),
      L(2, "research-engineer-vs-product-engineer", "Research Engineer vs. Product Engineer", { contentDir: "ch01/02-research-engineer-vs-product-engineer" }),
      L(3, "a-day-in-the-life-of-a-research-engineer", "A Day in the Life of a Research Engineer", { contentDir: "ch01/03-a-day-in-the-life-of-a-research-engineer" }),
      L(4, "what-makes-research-code-different", "What Makes Research Code Different", { contentDir: "ch01/04-what-makes-research-code-different" }),
    ],
  },
  {
    n: 2,
    title: "Reading & Reproducing Papers",
    lessons: [
      L(5, "how-to-read-an-ml-paper", "How to Read an ML Paper", { contentDir: "ch02/05-how-to-read-an-ml-paper" }),
      L(6, "identifying-the-load-bearing-claim", "Identifying the Load-Bearing Claim", { contentDir: "ch02/06-identifying-the-load-bearing-claim" }),
      L(7, "reproducing-a-published-result", "Reproducing a Published Result", { contentDir: "ch02/07-reproducing-a-published-result" }),
      L(8, "common-reproducibility-pitfalls", "Common Reproducibility Pitfalls", { contentDir: "ch02/08-common-reproducibility-pitfalls" }),
      L(9, "when-a-paper-doesnt-reproduce", "When a Paper Doesn't Reproduce", { contentDir: "ch02/09-when-a-paper-doesnt-reproduce" }),
      L(10, "building-a-personal-paper-reading-practice", "Building a Personal Paper-Reading Practice", { contentDir: "ch02/10-building-a-personal-paper-reading-practice" }),
    ],
  },
  {
    n: 3,
    title: "Research Codebases",
    lessons: [
      L(11, "structuring-a-research-codebase", "Structuring a Research Codebase", { contentDir: "ch03/11-structuring-a-research-codebase" }),
      L(12, "config-systems-for-experiments", "Config Systems for Experiments", { contentDir: "ch03/12-config-systems-for-experiments" }),
      L(13, "research-code-vs-production-code-tradeoffs", "Research Code vs. Production Code Trade-offs", { contentDir: "ch03/13-research-code-vs-production-code-tradeoffs" }),
      L(14, "testing-strategies-for-research-code", "Testing Strategies for Research Code", { contentDir: "ch03/14-testing-strategies-for-research-code" }),
      L(15, "code-review-norms-for-research-teams", "Code Review Norms for Research Teams", { contentDir: "ch03/15-code-review-norms-for-research-teams" }),
      L(16, "version-control-for-experiments", "Version Control for Experiments", { contentDir: "ch03/16-version-control-for-experiments" }),
    ],
  },
  {
    n: 4,
    title: "Experiment Management at Scale",
    lessons: [
      L(17, "designing-a-hyperparameter-sweep", "Designing a Hyperparameter Sweep", { contentDir: "ch04/17-designing-a-hyperparameter-sweep" }),
      L(18, "random-grid-and-bayesian-search", "Random, Grid & Bayesian Search", { contentDir: "ch04/18-random-grid-and-bayesian-search" }),
      L(19, "experiment-tracking-infrastructure", "Experiment Tracking Infrastructure", { contentDir: "ch04/19-experiment-tracking-infrastructure" }),
      L(20, "compute-scheduling-across-a-team", "Compute Scheduling Across a Team", { contentDir: "ch04/20-compute-scheduling-across-a-team" }),
      L(21, "prioritizing-experiments-under-compute-constraints", "Prioritizing Experiments Under Compute Constraints", { contentDir: "ch04/21-prioritizing-experiments-under-compute-constraints" }),
      L(22, "ablation-study-design", "Ablation Study Design", { contentDir: "ch04/22-ablation-study-design" }),
    ],
  },
  {
    n: 5,
    title: "Research Infrastructure",
    lessons: [
      L(23, "job-queues-and-cluster-basics", "Job Queues & Cluster Basics", { contentDir: "ch05/23-job-queues-and-cluster-basics" }),
      L(24, "slurm-for-research-workloads", "Slurm for Research Workloads", { contentDir: "ch05/24-slurm-for-research-workloads" }),
      L(25, "kubernetes-for-research-jobs", "Kubernetes for Research Jobs", { contentDir: "ch05/25-kubernetes-for-research-jobs" }),
      L(26, "data-versioning-for-experiments", "Data Versioning for Experiments", { contentDir: "ch05/26-data-versioning-for-experiments" }),
      L(27, "shared-infrastructure-across-a-research-team", "Shared Infrastructure Across a Research Team", { contentDir: "ch05/27-shared-infrastructure-across-a-research-team" }),
    ],
  },
  {
    n: 6,
    title: "Debugging Research Code",
    lessons: [
      L(28, "silent-bugs-vs-loud-bugs", "Silent Bugs vs. Loud Bugs", { contentDir: "ch06/28-silent-bugs-vs-loud-bugs" }),
      L(29, "numerical-issues-in-training-code", "Numerical Issues in Training Code", { contentDir: "ch06/29-numerical-issues-in-training-code" }),
      L(30, "verifying-correctness-without-ground-truth", "Verifying Correctness Without Ground Truth", { contentDir: "ch06/30-verifying-correctness-without-ground-truth" }),
      L(31, "sanity-checks-every-researcher-should-run", "Sanity Checks Every Researcher Should Run", { contentDir: "ch06/31-sanity-checks-every-researcher-should-run" }),
      L(32, "debugging-a-run-that-wont-improve", "Debugging a Run That Won't Improve", { contentDir: "ch06/32-debugging-a-run-that-wont-improve" }),
    ],
  },
  {
    n: 7,
    title: "Collaborating on Research",
    lessons: [
      L(33, "writing-a-technical-research-report", "Writing a Technical Research Report", { contentDir: "ch07/33-writing-a-technical-research-report" }),
      L(34, "presenting-negative-results", "Presenting Negative Results", { contentDir: "ch07/34-presenting-negative-results" }),
      L(35, "research-project-management", "Research Project Management", { contentDir: "ch07/35-research-project-management" }),
      L(36, "working-with-research-scientists-as-an-engineer", "Working With Research Scientists as an Engineer", { contentDir: "ch07/36-working-with-research-scientists-as-an-engineer" }),
      L(37, "giving-and-receiving-research-feedback", "Giving & Receiving Research Feedback", { contentDir: "ch07/37-giving-and-receiving-research-feedback" }),
    ],
  },
  {
    n: 8,
    title: "From Research to Production",
    lessons: [
      L(38, "handing-off-a-research-model", "Handing Off a Research Model", { contentDir: "ch08/38-handing-off-a-research-model" }),
      L(39, "productionization-tradeoffs", "Productionization Trade-offs", { contentDir: "ch08/39-productionization-tradeoffs" }),
      L(40, "what-survives-the-transition-to-production", "What Survives the Transition to Production", { contentDir: "ch08/40-what-survives-the-transition-to-production" }),
      L(41, "closing-the-loop-production-feedback-into-research", "Closing the Loop: Production Feedback Into Research", { contentDir: "ch08/41-closing-the-loop-production-feedback-into-research" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Reproduce and Extend a Published Result",
    lessons: [
      L(42, "capstone-kickoff-and-paper-selection", "Capstone Kickoff & Paper Selection", { contentDir: "ch09/42-capstone-kickoff-and-paper-selection" }),
      L(43, "capstone-reproducing-the-core-result", "Capstone: Reproducing the Core Result", { contentDir: "ch09/43-capstone-reproducing-the-core-result" }),
      L(44, "capstone-extending-the-result", "Capstone: Extending the Result", { contentDir: "ch09/44-capstone-extending-the-result" }),
      L(45, "capstone-writeup-and-presentation", "Capstone: Write-Up & Presentation", { contentDir: "ch09/45-capstone-writeup-and-presentation" }),
    ],
  },
];
