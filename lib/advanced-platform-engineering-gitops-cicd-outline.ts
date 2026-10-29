// Advanced Platform Engineering, GitOps & CI/CD course outline. Lessons without a contentDir
// render as "in production". Course 12 of the Cloud Engineer → Cloud Architect path — the first
// of four Expert Specialization courses (any order), building directly on the Advanced
// Specialization stage's Terraform/Kubernetes/observability foundation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-platform-engineering-gitops-cicd/
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

export const ADVANCED_PLATFORM_ENGINEERING_GITOPS_CICD_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Platform Engineering Fundamentals",
    lessons: [
      L(1, "what-problem-an-internal-developer-platform-actually-solves", "What Problem an Internal Developer Platform Actually Solves", { contentDir: "ch01/01-what-problem-an-internal-developer-platform-actually-solves" }),
      L(2, "platform-as-a-product-treating-developers-as-customers", "Platform as a Product: Treating Developers as Customers", { contentDir: "ch01/02-platform-as-a-product-treating-developers-as-customers" }),
      L(3, "golden-paths-paved-roads-instead-of-infinite-choice", "Golden Paths: Paved Roads Instead of Infinite Choice", { contentDir: "ch01/03-golden-paths-paved-roads-instead-of-infinite-choice" }),
      L(4, "measuring-whether-a-platform-is-actually-helping", "Measuring Whether a Platform Is Actually Helping", { contentDir: "ch01/04-measuring-whether-a-platform-is-actually-helping" }),
    ],
  },
  {
    n: 2,
    title: "Building a Developer Self-Service Portal",
    lessons: [
      L(5, "service-catalogs-and-software-templates", "Service Catalogs and Software Templates", { contentDir: "ch02/05-service-catalogs-and-software-templates" }),
      L(6, "backstage-style-portals-what-they-actually-provide", "Backstage-Style Portals: What They Actually Provide", { contentDir: "ch02/06-backstage-style-portals-what-they-actually-provide" }),
      L(7, "self-service-infrastructure-requests-without-a-ticket-queue", "Self-Service Infrastructure Requests Without a Ticket Queue", { contentDir: "ch02/07-self-service-infrastructure-requests-without-a-ticket-queue" }),
      L(8, "scorecards-and-tech-debt-visibility-across-many-teams", "Scorecards and Tech-Debt Visibility Across Many Teams", { contentDir: "ch02/08-scorecards-and-tech-debt-visibility-across-many-teams" }),
    ],
  },
  {
    n: 3,
    title: "GitOps Principles",
    lessons: [
      L(9, "declarative-state-in-git-as-the-single-source-of-truth", "Declarative State in Git as the Single Source of Truth", { contentDir: "ch03/09-declarative-state-in-git-as-the-single-source-of-truth" }),
      L(10, "push-based-vs-pull-based-deployment-and-why-pull-wins", "Push-Based vs. Pull-Based Deployment, and Why Pull Wins", { contentDir: "ch03/10-push-based-vs-pull-based-deployment-and-why-pull-wins" }),
      L(11, "drift-detection-and-automatic-reconciliation", "Drift Detection and Automatic Reconciliation", { contentDir: "ch03/11-drift-detection-and-automatic-reconciliation" }),
      L(12, "gitops-vs-plain-cicd-what-actually-changes", "GitOps vs. Plain CI/CD: What Actually Changes", { contentDir: "ch03/12-gitops-vs-plain-cicd-what-actually-changes" }),
    ],
  },
  {
    n: 4,
    title: "GitOps in Practice",
    lessons: [
      L(13, "argocd-application-sync-and-health-status", "ArgoCD: Application, Sync, and Health Status", { contentDir: "ch04/13-argocd-application-sync-and-health-status" }),
      L(14, "flux-sources-kustomizations-and-helmreleases", "Flux: Sources, Kustomizations, and HelmReleases", { contentDir: "ch04/14-flux-sources-kustomizations-and-helmreleases" }),
      L(15, "structuring-a-gitops-repo-for-multiple-environments", "Structuring a GitOps Repo for Multiple Environments", { contentDir: "ch04/15-structuring-a-gitops-repo-for-multiple-environments" }),
      L(16, "a-real-promotion-workflow-dev-to-staging-to-prod", "A Real Promotion Workflow: Dev to Staging to Prod", { contentDir: "ch04/16-a-real-promotion-workflow-dev-to-staging-to-prod" }),
    ],
  },
  {
    n: 5,
    title: "Advanced CI/CD Pipeline Design",
    lessons: [
      L(17, "multi-stage-pipelines-build-test-scan-deploy", "Multi-Stage Pipelines: Build, Test, Scan, Deploy", { contentDir: "ch05/17-multi-stage-pipelines-build-test-scan-deploy" }),
      L(18, "canary-and-blue-green-deployments-in-practice", "Canary and Blue-Green Deployments in Practice", { contentDir: "ch05/18-canary-and-blue-green-deployments-in-practice" }),
      L(19, "progressive-delivery-with-automated-rollback-on-a-bad-signal", "Progressive Delivery with Automated Rollback on a Bad Signal", { contentDir: "ch05/19-progressive-delivery-with-automated-rollback-on-a-bad-signal" }),
      L(20, "feature-flags-and-decoupling-deploy-from-release", "Feature Flags and Decoupling Deploy from Release", { contentDir: "ch05/20-feature-flags-and-decoupling-deploy-from-release" }),
    ],
  },
  {
    n: 6,
    title: "Pipeline-as-Code at Scale",
    lessons: [
      L(21, "reusable-pipeline-templates-across-many-repos", "Reusable Pipeline Templates Across Many Repos", { contentDir: "ch06/21-reusable-pipeline-templates-across-many-repos" }),
      L(22, "shared-pipeline-libraries-and-versioning-them-safely", "Shared Pipeline Libraries, and Versioning Them Safely", { contentDir: "ch06/22-shared-pipeline-libraries-and-versioning-them-safely" }),
      L(23, "enforcing-standards-without-blocking-every-team-on-every-change", "Enforcing Standards Without Blocking Every Team on Every Change", { contentDir: "ch06/23-enforcing-standards-without-blocking-every-team-on-every-change" }),
      L(24, "rolling-out-a-pipeline-change-to-hundreds-of-repos", "Rolling Out a Pipeline Change to Hundreds of Repos", { contentDir: "ch06/24-rolling-out-a-pipeline-change-to-hundreds-of-repos" }),
    ],
  },
  {
    n: 7,
    title: "Platform Observability and Developer Experience",
    lessons: [
      L(25, "deployment-frequency-lead-time-and-the-dora-metrics", "Deployment Frequency, Lead Time, and the DORA Metrics", { contentDir: "ch07/25-deployment-frequency-lead-time-and-the-dora-metrics" }),
      L(26, "measuring-developer-experience-not-just-system-uptime", "Measuring Developer Experience, Not Just System Uptime", { contentDir: "ch07/26-measuring-developer-experience-not-just-system-uptime" }),
      L(27, "instrumenting-the-platform-itself-not-just-what-runs-on-it", "Instrumenting the Platform Itself, Not Just What Runs on It", { contentDir: "ch07/27-instrumenting-the-platform-itself-not-just-what-runs-on-it" }),
      L(28, "using-platform-metrics-to-decide-what-to-build-next", "Using Platform Metrics to Decide What to Build Next", { contentDir: "ch07/28-using-platform-metrics-to-decide-what-to-build-next" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building an Internal Developer Platform",
    lessons: [
      L(29, "lab-building-a-golden-path-template-and-service-catalog-entry", "Lab: Building a Golden Path Template and Service Catalog Entry", { contentDir: "ch08/29-lab-building-a-golden-path-template-and-service-catalog-entry" }),
      L(30, "lab-wiring-gitops-driven-progressive-delivery-for-a-real-app", "Lab: Wiring GitOps-Driven Progressive Delivery for a Real App", { contentDir: "ch08/30-lab-wiring-gitops-driven-progressive-delivery-for-a-real-app" }),
      L(31, "case-study-a-platform-nobody-adopted", "Case Study: A Platform Nobody Adopted", { contentDir: "ch08/31-case-study-a-platform-nobody-adopted" }),
      L(32, "chapter-capstone-platform-engineering-and-gitops-review", "Chapter Capstone: Platform Engineering and GitOps Review", { contentDir: "ch08/32-chapter-capstone-platform-engineering-and-gitops-review" }),
    ],
  },
];
