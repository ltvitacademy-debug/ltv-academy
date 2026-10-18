// ServiceNow DevOps, Testing & Deployment course outline. Lessons without a contentDir render as
// "in production". Course 11 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: application lifecycle management, ATF, and real CI/CD-style delivery.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-devops-testing-deployment/
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

export const SERVICENOW_DEVOPS_TESTING_DEPLOYMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Application Lifecycle Management",
    lessons: [
      L(1, "the-servicenow-release-cycle", "The ServiceNow Release Cycle", { contentDir: "ch01/01-the-servicenow-release-cycle" }),
      L(2, "dev-test-prod-instance-strategy", "Dev/Test/Prod Instance Strategy", { contentDir: "ch01/02-dev-test-prod-instance-strategy" }),
      L(3, "application-repository-and-version-management", "Application Repository & Version Management", { contentDir: "ch01/03-application-repository-and-version-management" }),
      L(4, "alm-lab", "ALM Lab", { contentDir: "ch01/04-alm-lab" }),
    ],
  },
  {
    n: 2,
    title: "Update Sets at Scale",
    lessons: [
      L(5, "update-set-batching-strategies", "Update Set Batching Strategies", { contentDir: "ch02/05-update-set-batching-strategies" }),
      L(6, "resolving-update-set-collisions", "Resolving Update Set Collisions", { contentDir: "ch02/06-resolving-update-set-collisions" }),
      L(7, "update-set-preview-and-commit-problems", "Update Set Preview & Commit Problems", { contentDir: "ch02/07-update-set-preview-and-commit-problems" }),
      L(8, "update-set-lab-at-scale", "Update Set Lab at Scale", { contentDir: "ch02/08-update-set-lab-at-scale" }),
    ],
  },
  {
    n: 3,
    title: "Source Control Integration",
    lessons: [
      L(9, "source-control-support-on-servicenow", "Source Control Support on ServiceNow", { contentDir: "ch03/09-source-control-support-on-servicenow" }),
      L(10, "connecting-an-application-to-a-git-repository", "Connecting an Application to a Git Repository", { contentDir: "ch03/10-connecting-an-application-to-a-git-repository" }),
      L(11, "source-control-workflow-lab", "Source Control Workflow Lab", { contentDir: "ch03/11-source-control-workflow-lab" }),
    ],
  },
  {
    n: 4,
    title: "Automated Test Framework (ATF)",
    lessons: [
      L(12, "what-atf-actually-tests", "What ATF Actually Tests", { contentDir: "ch04/12-what-atf-actually-tests" }),
      L(13, "building-a-ui-test", "Building a UI Test", { contentDir: "ch04/13-building-a-ui-test" }),
      L(14, "building-a-server-side-test", "Building a Server-Side Test", { contentDir: "ch04/14-building-a-server-side-test" }),
      L(15, "test-suites-and-scheduled-test-runs", "Test Suites & Scheduled Test Runs", { contentDir: "ch04/15-test-suites-and-scheduled-test-runs" }),
      L(16, "atf-lab", "ATF Lab", { contentDir: "ch04/16-atf-lab" }),
    ],
  },
  {
    n: 5,
    title: "ServiceNow DevOps & CI/CD Concepts",
    lessons: [
      L(17, "the-servicenow-devops-app", "The ServiceNow DevOps App", { contentDir: "ch05/17-the-servicenow-devops-app" }),
      L(18, "integrating-with-external-ci-cd-pipelines", "Integrating With External CI/CD Pipelines", { contentDir: "ch05/18-integrating-with-external-ci-cd-pipelines" }),
      L(19, "change-velocity-vs-change-control-the-real-tension", "Change Velocity vs. Change Control: the Real Tension", { contentDir: "ch05/19-change-velocity-vs-change-control-the-real-tension" }),
      L(20, "cicd-lab", "CI/CD Lab", { contentDir: "ch05/20-cicd-lab" }),
    ],
  },
  {
    n: 6,
    title: "Deployment Planning & Rollback",
    lessons: [
      L(21, "deployment-planning-for-a-scoped-application", "Deployment Planning for a Scoped Application", { contentDir: "ch06/21-deployment-planning-for-a-scoped-application" }),
      L(22, "rollback-strategies-when-a-deployment-goes-wrong", "Rollback Strategies When a Deployment Goes Wrong", { contentDir: "ch06/22-rollback-strategies-when-a-deployment-goes-wrong" }),
      L(23, "deployment-lab", "Deployment Lab", { contentDir: "ch06/23-deployment-lab" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: a Tested, Deployable Application Pipeline",
    lessons: [
      L(24, "capstone-kickoff-pipeline-requirements", "Capstone Kickoff: Pipeline Requirements", { contentDir: "ch07/24-capstone-kickoff-pipeline-requirements" }),
      L(25, "capstone-build-atf-coverage-for-a-real-application", "Capstone: Build ATF Coverage for a Real Application", { contentDir: "ch07/25-capstone-build-atf-coverage-for-a-real-application" }),
      L(26, "capstone-wrap-up-and-deployment-runbook", "Capstone Wrap-Up & Deployment Runbook", { contentDir: "ch07/26-capstone-wrap-up-and-deployment-runbook" }),
    ],
  },
];
