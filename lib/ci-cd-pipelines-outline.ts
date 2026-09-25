// The CI/CD course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 10 of the DevOps Engineer path. Assumes Git & GitHub for Software Engineers. General software CI/CD, distinct from the data-flavored Git/GitHub/CI-CD course.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ci-cd-pipelines/
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

export const CI_CD_PIPELINES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "DevOps Principles & the Delivery Lifecycle",
    lessons: [
      L(1, "what-devops-is-and-isnt", "What DevOps Is (and Isn't)"),
      L(2, "the-software-delivery-lifecycle", "The Software Delivery Lifecycle"),
      L(3, "continuous-integration-delivery-and-deployment", "Continuous Integration, Delivery & Deployment"),
      L(4, "devops-metrics-dora", "DevOps Metrics: DORA"),
    ],
  },
  {
    n: 2,
    title: "GitHub Actions",
    lessons: [
      L(5, "workflow-basics", "Workflow Basics"),
      L(6, "triggers-and-events", "Triggers & Events"),
      L(7, "jobs-steps-and-runners", "Jobs, Steps & Runners"),
      L(8, "secrets-and-variables", "Secrets & Variables"),
      L(9, "caching-and-artifacts", "Caching & Artifacts"),
      L(10, "reusable-workflows-and-matrix-builds", "Reusable Workflows & Matrix Builds"),
    ],
  },
  {
    n: 3,
    title: "Azure DevOps Pipelines",
    lessons: [
      L(11, "azure-devops-overview", "Azure DevOps Overview"),
      L(12, "build-pipelines-in-yaml", "Build Pipelines in YAML"),
      L(13, "release-pipelines-and-stages", "Release Pipelines & Stages"),
      L(14, "service-connections-and-variable-groups", "Service Connections & Variable Groups"),
      L(15, "azure-repos-boards-and-artifacts", "Azure Repos, Boards & Artifacts"),
    ],
  },
  {
    n: 4,
    title: "Build, Test & Quality Gates",
    lessons: [
      L(16, "automated-testing-in-pipelines", "Automated Testing in Pipelines"),
      L(17, "static-analysis-and-linting", "Static Analysis & Linting"),
      L(18, "code-coverage-and-quality-gates", "Code Coverage & Quality Gates"),
      L(19, "building-container-images-in-ci", "Building Container Images in CI"),
      L(20, "artifact-repositories", "Artifact Repositories"),
    ],
  },
  {
    n: 5,
    title: "Deploying & Promoting",
    lessons: [
      L(21, "deployment-environments", "Deployment Environments"),
      L(22, "environment-promotion-and-approvals", "Environment Promotion & Approvals"),
      L(23, "rolling-blue-green-and-canary-deployments", "Rolling, Blue-Green & Canary Deployments"),
      L(24, "feature-flags", "Feature Flags"),
      L(25, "rollbacks-and-recovery", "Rollbacks & Recovery"),
    ],
  },
  {
    n: 6,
    title: "Pipelines for Infrastructure & Kubernetes",
    lessons: [
      L(26, "running-terraform-in-pipelines", "Running Terraform in Pipelines"),
      L(27, "deploying-to-kubernetes-from-ci-cd", "Deploying to Kubernetes From CI/CD"),
      L(28, "gitops-with-argo-cd-or-flux", "GitOps With Argo CD or Flux"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-build-a-full-ci-cd-pipeline", "Capstone Kickoff: Build a Full CI/CD Pipeline"),
      L(30, "capstone-build-it", "Capstone: Build It"),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
