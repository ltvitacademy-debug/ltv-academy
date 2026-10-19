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
      L(1, "what-devops-is-and-isnt", "What DevOps Is (and Isn't)", { contentDir: "ch01/01-what-devops-is-and-isnt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447062/ltv-ci-cd-pipelines/what-devops-is-and-isnt.mp4", durationLabel: "2 min 14 s" }),
      L(2, "the-software-delivery-lifecycle", "The Software Delivery Lifecycle", { contentDir: "ch01/02-the-software-delivery-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447190/ltv-ci-cd-pipelines/the-software-delivery-lifecycle.mp4", durationLabel: "1 min 58 s" }),
      L(3, "continuous-integration-delivery-and-deployment", "Continuous Integration, Delivery & Deployment", { contentDir: "ch01/03-continuous-integration-delivery-and-deployment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447285/ltv-ci-cd-pipelines/continuous-integration-delivery-and-deployment.mp4", durationLabel: "1 min 59 s" }),
      L(4, "devops-metrics-dora", "DevOps Metrics: DORA", { contentDir: "ch01/04-devops-metrics-dora", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447398/ltv-ci-cd-pipelines/devops-metrics-dora.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 2,
    title: "GitHub Actions",
    lessons: [
      L(5, "workflow-basics", "Workflow Basics", { contentDir: "ch02/05-workflow-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447519/ltv-ci-cd-pipelines/workflow-basics.mp4", durationLabel: "2 min 2 s" }),
      L(6, "triggers-and-events", "Triggers & Events", { contentDir: "ch02/06-triggers-and-events", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447642/ltv-ci-cd-pipelines/triggers-and-events.mp4", durationLabel: "2 min 0 s" }),
      L(7, "jobs-steps-and-runners", "Jobs, Steps & Runners", { contentDir: "ch02/07-jobs-steps-and-runners", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447758/ltv-ci-cd-pipelines/jobs-steps-and-runners.mp4", durationLabel: "1 min 54 s" }),
      L(8, "secrets-and-variables", "Secrets & Variables", { contentDir: "ch02/08-secrets-and-variables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447888/ltv-ci-cd-pipelines/secrets-and-variables.mp4", durationLabel: "2 min 4 s" }),
      L(9, "caching-and-artifacts", "Caching & Artifacts", { contentDir: "ch02/09-caching-and-artifacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448020/ltv-ci-cd-pipelines/caching-and-artifacts.mp4", durationLabel: "1 min 57 s" }),
      L(10, "reusable-workflows-and-matrix-builds", "Reusable Workflows & Matrix Builds", { contentDir: "ch02/10-reusable-workflows-and-matrix-builds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448172/ltv-ci-cd-pipelines/reusable-workflows-and-matrix-builds.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
  {
    n: 3,
    title: "Azure DevOps Pipelines",
    lessons: [
      L(11, "azure-devops-overview", "Azure DevOps Overview", { contentDir: "ch03/11-azure-devops-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448304/ltv-ci-cd-pipelines/azure-devops-overview.mp4", durationLabel: "2 min 10 s" }),
      L(12, "build-pipelines-in-yaml", "Build Pipelines in YAML", { contentDir: "ch03/12-build-pipelines-in-yaml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448437/ltv-ci-cd-pipelines/build-pipelines-in-yaml.mp4", durationLabel: "2 min 9 s" }),
      L(13, "release-pipelines-and-stages", "Release Pipelines & Stages", { contentDir: "ch03/13-release-pipelines-and-stages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448573/ltv-ci-cd-pipelines/release-pipelines-and-stages.mp4", durationLabel: "2 min 8 s" }),
      L(14, "service-connections-and-variable-groups", "Service Connections & Variable Groups", { contentDir: "ch03/14-service-connections-and-variable-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448691/ltv-ci-cd-pipelines/service-connections-and-variable-groups.mp4", durationLabel: "2 min 4 s" }),
      L(15, "azure-repos-boards-and-artifacts", "Azure Repos, Boards & Artifacts", { contentDir: "ch03/15-azure-repos-boards-and-artifacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448812/ltv-ci-cd-pipelines/azure-repos-boards-and-artifacts.mp4", durationLabel: "2 min 11 s" }),
    ],
  },
  {
    n: 4,
    title: "Build, Test & Quality Gates",
    lessons: [
      L(16, "automated-testing-in-pipelines", "Automated Testing in Pipelines", { contentDir: "ch04/16-automated-testing-in-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448920/ltv-ci-cd-pipelines/automated-testing-in-pipelines.mp4", durationLabel: "1 min 55 s" }),
      L(17, "static-analysis-and-linting", "Static Analysis & Linting", { contentDir: "ch04/17-static-analysis-and-linting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449020/ltv-ci-cd-pipelines/static-analysis-and-linting.mp4", durationLabel: "1 min 51 s" }),
      L(18, "code-coverage-and-quality-gates", "Code Coverage & Quality Gates", { contentDir: "ch04/18-code-coverage-and-quality-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449121/ltv-ci-cd-pipelines/code-coverage-and-quality-gates.mp4", durationLabel: "1 min 50 s" }),
      L(19, "building-container-images-in-ci", "Building Container Images in CI", { contentDir: "ch04/19-building-container-images-in-ci", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449230/ltv-ci-cd-pipelines/building-container-images-in-ci.mp4", durationLabel: "1 min 55 s" }),
      L(20, "artifact-repositories", "Artifact Repositories", { contentDir: "ch04/20-artifact-repositories", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449336/ltv-ci-cd-pipelines/artifact-repositories.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 5,
    title: "Deploying & Promoting",
    lessons: [
      L(21, "deployment-environments", "Deployment Environments", { contentDir: "ch05/21-deployment-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449439/ltv-ci-cd-pipelines/deployment-environments.mp4", durationLabel: "1 min 58 s" }),
      L(22, "environment-promotion-and-approvals", "Environment Promotion & Approvals", { contentDir: "ch05/22-environment-promotion-and-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449538/ltv-ci-cd-pipelines/environment-promotion-and-approvals.mp4", durationLabel: "1 min 57 s" }),
      L(23, "rolling-blue-green-and-canary-deployments", "Rolling, Blue-Green & Canary Deployments", { contentDir: "ch05/23-rolling-blue-green-and-canary-deployments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449645/ltv-ci-cd-pipelines/rolling-blue-green-and-canary-deployments.mp4", durationLabel: "1 min 56 s" }),
      L(24, "feature-flags", "Feature Flags", { contentDir: "ch05/24-feature-flags", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449750/ltv-ci-cd-pipelines/feature-flags.mp4", durationLabel: "1 min 57 s" }),
      L(25, "rollbacks-and-recovery", "Rollbacks & Recovery", { contentDir: "ch05/25-rollbacks-and-recovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449858/ltv-ci-cd-pipelines/rollbacks-and-recovery.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
  {
    n: 6,
    title: "Pipelines for Infrastructure & Kubernetes",
    lessons: [
      L(26, "running-terraform-in-pipelines", "Running Terraform in Pipelines", { contentDir: "ch06/26-running-terraform-in-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449973/ltv-ci-cd-pipelines/running-terraform-in-pipelines.mp4", durationLabel: "2 min 1 s" }),
      L(27, "deploying-to-kubernetes-from-ci-cd", "Deploying to Kubernetes From CI/CD", { contentDir: "ch06/27-deploying-to-kubernetes-from-ci-cd", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450059/ltv-ci-cd-pipelines/deploying-to-kubernetes-from-ci-cd.mp4", durationLabel: "2 min 2 s" }),
      L(28, "gitops-with-argo-cd-or-flux", "GitOps With Argo CD or Flux", { contentDir: "ch06/28-gitops-with-argo-cd-or-flux", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453804/ltv-ci-cd-pipelines/gitops-with-argo-cd-or-flux.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-build-a-full-ci-cd-pipeline", "Capstone Kickoff: Build a Full CI/CD Pipeline", { contentDir: "ch07/29-capstone-kickoff-build-a-full-ci-cd-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450289/ltv-ci-cd-pipelines/capstone-kickoff-build-a-full-ci-cd-pipeline.mp4", durationLabel: "1 min 56 s" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450397/ltv-ci-cd-pipelines/capstone-build-it.mp4", durationLabel: "1 min 49 s" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450495/ltv-ci-cd-pipelines/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
];
