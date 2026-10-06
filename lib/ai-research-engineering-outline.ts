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
      L(1, "research-engineer-vs-research-scientist", "Research Engineer vs. Research Scientist"),
      L(2, "research-engineer-vs-product-engineer", "Research Engineer vs. Product Engineer"),
      L(3, "a-day-in-the-life-of-a-research-engineer", "A Day in the Life of a Research Engineer"),
      L(4, "what-makes-research-code-different", "What Makes Research Code Different"),
    ],
  },
  {
    n: 2,
    title: "Reading & Reproducing Papers",
    lessons: [
      L(5, "how-to-read-an-ml-paper", "How to Read an ML Paper"),
      L(6, "identifying-the-load-bearing-claim", "Identifying the Load-Bearing Claim"),
      L(7, "reproducing-a-published-result", "Reproducing a Published Result"),
      L(8, "common-reproducibility-pitfalls", "Common Reproducibility Pitfalls"),
      L(9, "when-a-paper-doesnt-reproduce", "When a Paper Doesn't Reproduce"),
      L(10, "building-a-personal-paper-reading-practice", "Building a Personal Paper-Reading Practice"),
    ],
  },
  {
    n: 3,
    title: "Research Codebases",
    lessons: [
      L(11, "structuring-a-research-codebase", "Structuring a Research Codebase"),
      L(12, "config-systems-for-experiments", "Config Systems for Experiments"),
      L(13, "research-code-vs-production-code-tradeoffs", "Research Code vs. Production Code Trade-offs"),
      L(14, "testing-strategies-for-research-code", "Testing Strategies for Research Code"),
      L(15, "code-review-norms-for-research-teams", "Code Review Norms for Research Teams"),
      L(16, "version-control-for-experiments", "Version Control for Experiments"),
    ],
  },
  {
    n: 4,
    title: "Experiment Management at Scale",
    lessons: [
      L(17, "designing-a-hyperparameter-sweep", "Designing a Hyperparameter Sweep"),
      L(18, "random-grid-and-bayesian-search", "Random, Grid & Bayesian Search"),
      L(19, "experiment-tracking-infrastructure", "Experiment Tracking Infrastructure"),
      L(20, "compute-scheduling-across-a-team", "Compute Scheduling Across a Team"),
      L(21, "prioritizing-experiments-under-compute-constraints", "Prioritizing Experiments Under Compute Constraints"),
      L(22, "ablation-study-design", "Ablation Study Design"),
    ],
  },
  {
    n: 5,
    title: "Research Infrastructure",
    lessons: [
      L(23, "job-queues-and-cluster-basics", "Job Queues & Cluster Basics"),
      L(24, "slurm-for-research-workloads", "Slurm for Research Workloads"),
      L(25, "kubernetes-for-research-jobs", "Kubernetes for Research Jobs"),
      L(26, "data-versioning-for-experiments", "Data Versioning for Experiments"),
      L(27, "shared-infrastructure-across-a-research-team", "Shared Infrastructure Across a Research Team"),
    ],
  },
  {
    n: 6,
    title: "Debugging Research Code",
    lessons: [
      L(28, "silent-bugs-vs-loud-bugs", "Silent Bugs vs. Loud Bugs"),
      L(29, "numerical-issues-in-training-code", "Numerical Issues in Training Code"),
      L(30, "verifying-correctness-without-ground-truth", "Verifying Correctness Without Ground Truth"),
      L(31, "sanity-checks-every-researcher-should-run", "Sanity Checks Every Researcher Should Run"),
      L(32, "debugging-a-run-that-wont-improve", "Debugging a Run That Won't Improve"),
    ],
  },
  {
    n: 7,
    title: "Collaborating on Research",
    lessons: [
      L(33, "writing-a-technical-research-report", "Writing a Technical Research Report"),
      L(34, "presenting-negative-results", "Presenting Negative Results"),
      L(35, "research-project-management", "Research Project Management"),
      L(36, "working-with-research-scientists-as-an-engineer", "Working With Research Scientists as an Engineer"),
      L(37, "giving-and-receiving-research-feedback", "Giving & Receiving Research Feedback"),
    ],
  },
  {
    n: 8,
    title: "From Research to Production",
    lessons: [
      L(38, "handing-off-a-research-model", "Handing Off a Research Model"),
      L(39, "productionization-tradeoffs", "Productionization Trade-offs"),
      L(40, "what-survives-the-transition-to-production", "What Survives the Transition to Production"),
      L(41, "closing-the-loop-production-feedback-into-research", "Closing the Loop: Production Feedback Into Research"),
    ],
  },
  {
    n: 9,
    title: "Capstone: Reproduce and Extend a Published Result",
    lessons: [
      L(42, "capstone-kickoff-and-paper-selection", "Capstone Kickoff & Paper Selection"),
      L(43, "capstone-reproducing-the-core-result", "Capstone: Reproducing the Core Result"),
      L(44, "capstone-extending-the-result", "Capstone: Extending the Result"),
      L(45, "capstone-writeup-and-presentation", "Capstone: Write-Up & Presentation"),
    ],
  },
];
