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
      L(1, "what-devops-is-and-isnt", "What DevOps Is (and Isn't)", { contentDir: "ch01/01-what-devops-is-and-isnt" }),
      L(2, "the-software-delivery-lifecycle", "The Software Delivery Lifecycle", { contentDir: "ch01/02-the-software-delivery-lifecycle" }),
      L(3, "continuous-integration-delivery-and-deployment", "Continuous Integration, Delivery & Deployment", { contentDir: "ch01/03-continuous-integration-delivery-and-deployment" }),
      L(4, "devops-metrics-dora", "DevOps Metrics: DORA", { contentDir: "ch01/04-devops-metrics-dora" }),
    ],
  },
  {
    n: 2,
    title: "GitHub Actions",
    lessons: [
      L(5, "workflow-basics", "Workflow Basics", { contentDir: "ch02/05-workflow-basics" }),
      L(6, "triggers-and-events", "Triggers & Events", { contentDir: "ch02/06-triggers-and-events" }),
      L(7, "jobs-steps-and-runners", "Jobs, Steps & Runners", { contentDir: "ch02/07-jobs-steps-and-runners" }),
      L(8, "secrets-and-variables", "Secrets & Variables", { contentDir: "ch02/08-secrets-and-variables" }),
      L(9, "caching-and-artifacts", "Caching & Artifacts", { contentDir: "ch02/09-caching-and-artifacts" }),
      L(10, "reusable-workflows-and-matrix-builds", "Reusable Workflows & Matrix Builds", { contentDir: "ch02/10-reusable-workflows-and-matrix-builds" }),
    ],
  },
  {
    n: 3,
    title: "Azure DevOps Pipelines",
    lessons: [
      L(11, "azure-devops-overview", "Azure DevOps Overview", { contentDir: "ch03/11-azure-devops-overview" }),
      L(12, "build-pipelines-in-yaml", "Build Pipelines in YAML", { contentDir: "ch03/12-build-pipelines-in-yaml" }),
      L(13, "release-pipelines-and-stages", "Release Pipelines & Stages", { contentDir: "ch03/13-release-pipelines-and-stages" }),
      L(14, "service-connections-and-variable-groups", "Service Connections & Variable Groups", { contentDir: "ch03/14-service-connections-and-variable-groups" }),
      L(15, "azure-repos-boards-and-artifacts", "Azure Repos, Boards & Artifacts", { contentDir: "ch03/15-azure-repos-boards-and-artifacts" }),
    ],
  },
  {
    n: 4,
    title: "Build, Test & Quality Gates",
    lessons: [
      L(16, "automated-testing-in-pipelines", "Automated Testing in Pipelines", { contentDir: "ch04/16-automated-testing-in-pipelines" }),
      L(17, "static-analysis-and-linting", "Static Analysis & Linting", { contentDir: "ch04/17-static-analysis-and-linting" }),
      L(18, "code-coverage-and-quality-gates", "Code Coverage & Quality Gates", { contentDir: "ch04/18-code-coverage-and-quality-gates" }),
      L(19, "building-container-images-in-ci", "Building Container Images in CI", { contentDir: "ch04/19-building-container-images-in-ci" }),
      L(20, "artifact-repositories", "Artifact Repositories", { contentDir: "ch04/20-artifact-repositories" }),
    ],
  },
  {
    n: 5,
    title: "Deploying & Promoting",
    lessons: [
      L(21, "deployment-environments", "Deployment Environments", { contentDir: "ch05/21-deployment-environments" }),
      L(22, "environment-promotion-and-approvals", "Environment Promotion & Approvals", { contentDir: "ch05/22-environment-promotion-and-approvals" }),
      L(23, "rolling-blue-green-and-canary-deployments", "Rolling, Blue-Green & Canary Deployments", { contentDir: "ch05/23-rolling-blue-green-and-canary-deployments" }),
      L(24, "feature-flags", "Feature Flags", { contentDir: "ch05/24-feature-flags" }),
      L(25, "rollbacks-and-recovery", "Rollbacks & Recovery", { contentDir: "ch05/25-rollbacks-and-recovery" }),
    ],
  },
  {
    n: 6,
    title: "Pipelines for Infrastructure & Kubernetes",
    lessons: [
      L(26, "running-terraform-in-pipelines", "Running Terraform in Pipelines", { contentDir: "ch06/26-running-terraform-in-pipelines" }),
      L(27, "deploying-to-kubernetes-from-ci-cd", "Deploying to Kubernetes From CI/CD", { contentDir: "ch06/27-deploying-to-kubernetes-from-ci-cd" }),
      L(28, "gitops-with-argo-cd-or-flux", "GitOps With Argo CD or Flux", { contentDir: "ch06/28-gitops-with-argo-cd-or-flux" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-build-a-full-ci-cd-pipeline", "Capstone Kickoff: Build a Full CI/CD Pipeline", { contentDir: "ch07/29-capstone-kickoff-build-a-full-ci-cd-pipeline" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
