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
      L(1, "the-servicenow-release-cycle", "The ServiceNow Release Cycle", { contentDir: "ch01/01-the-servicenow-release-cycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792725947/ltv-servicenow-devops-testing-deployment/the-servicenow-release-cycle.mp4", durationLabel: "2 min 21 s" }),
      L(2, "dev-test-prod-instance-strategy", "Dev/Test/Prod Instance Strategy", { contentDir: "ch01/02-dev-test-prod-instance-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726022/ltv-servicenow-devops-testing-deployment/dev-test-prod-instance-strategy.mp4", durationLabel: "2 min 35 s" }),
      L(3, "application-repository-and-version-management", "Application Repository & Version Management", { contentDir: "ch01/03-application-repository-and-version-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726092/ltv-servicenow-devops-testing-deployment/application-repository-and-version-management.mp4", durationLabel: "2 min 22 s" }),
      L(4, "alm-lab", "ALM Lab", { contentDir: "ch01/04-alm-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726177/ltv-servicenow-devops-testing-deployment/alm-lab.mp4", durationLabel: "2 min 57 s" }),
    ],
  },
  {
    n: 2,
    title: "Update Sets at Scale",
    lessons: [
      L(5, "update-set-batching-strategies", "Update Set Batching Strategies", { contentDir: "ch02/05-update-set-batching-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726250/ltv-servicenow-devops-testing-deployment/update-set-batching-strategies.mp4", durationLabel: "2 min 25 s" }),
      L(6, "resolving-update-set-collisions", "Resolving Update Set Collisions", { contentDir: "ch02/06-resolving-update-set-collisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726317/ltv-servicenow-devops-testing-deployment/resolving-update-set-collisions.mp4", durationLabel: "2 min 18 s" }),
      L(7, "update-set-preview-and-commit-problems", "Update Set Preview & Commit Problems", { contentDir: "ch02/07-update-set-preview-and-commit-problems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726390/ltv-servicenow-devops-testing-deployment/update-set-preview-and-commit-problems.mp4", durationLabel: "2 min 31 s" }),
      L(8, "update-set-lab-at-scale", "Update Set Lab at Scale", { contentDir: "ch02/08-update-set-lab-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726464/ltv-servicenow-devops-testing-deployment/update-set-lab-at-scale.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 3,
    title: "Source Control Integration",
    lessons: [
      L(9, "source-control-support-on-servicenow", "Source Control Support on ServiceNow", { contentDir: "ch03/09-source-control-support-on-servicenow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726532/ltv-servicenow-devops-testing-deployment/source-control-support-on-servicenow.mp4", durationLabel: "2 min 19 s" }),
      L(10, "connecting-an-application-to-a-git-repository", "Connecting an Application to a Git Repository", { contentDir: "ch03/10-connecting-an-application-to-a-git-repository", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726597/ltv-servicenow-devops-testing-deployment/connecting-an-application-to-a-git-repository.mp4", durationLabel: "2 min 19 s" }),
      L(11, "source-control-workflow-lab", "Source Control Workflow Lab", { contentDir: "ch03/11-source-control-workflow-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726672/ltv-servicenow-devops-testing-deployment/source-control-workflow-lab.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 4,
    title: "Automated Test Framework (ATF)",
    lessons: [
      L(12, "what-atf-actually-tests", "What ATF Actually Tests", { contentDir: "ch04/12-what-atf-actually-tests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726730/ltv-servicenow-devops-testing-deployment/what-atf-actually-tests.mp4", durationLabel: "2 min 1 s" }),
      L(13, "building-a-ui-test", "Building a UI Test", { contentDir: "ch04/13-building-a-ui-test", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726786/ltv-servicenow-devops-testing-deployment/building-a-ui-test.mp4", durationLabel: "1 min 56 s" }),
      L(14, "building-a-server-side-test", "Building a Server-Side Test", { contentDir: "ch04/14-building-a-server-side-test", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726844/ltv-servicenow-devops-testing-deployment/building-a-server-side-test.mp4", durationLabel: "1 min 60 s" }),
      L(15, "test-suites-and-scheduled-test-runs", "Test Suites & Scheduled Test Runs", { contentDir: "ch04/15-test-suites-and-scheduled-test-runs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726901/ltv-servicenow-devops-testing-deployment/test-suites-and-scheduled-test-runs.mp4", durationLabel: "1 min 58 s" }),
      L(16, "atf-lab", "ATF Lab", { contentDir: "ch04/16-atf-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792726962/ltv-servicenow-devops-testing-deployment/atf-lab.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 5,
    title: "ServiceNow DevOps & CI/CD Concepts",
    lessons: [
      L(17, "the-servicenow-devops-app", "The ServiceNow DevOps App", { contentDir: "ch05/17-the-servicenow-devops-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727030/ltv-servicenow-devops-testing-deployment/the-servicenow-devops-app.mp4", durationLabel: "2 min 22 s" }),
      L(18, "integrating-with-external-ci-cd-pipelines", "Integrating With External CI/CD Pipelines", { contentDir: "ch05/18-integrating-with-external-ci-cd-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727104/ltv-servicenow-devops-testing-deployment/integrating-with-external-ci-cd-pipelines.mp4", durationLabel: "2 min 38 s" }),
      L(19, "change-velocity-vs-change-control-the-real-tension", "Change Velocity vs. Change Control: the Real Tension", { contentDir: "ch05/19-change-velocity-vs-change-control-the-real-tension", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727185/ltv-servicenow-devops-testing-deployment/change-velocity-vs-change-control-the-real-tension.mp4", durationLabel: "2 min 50 s" }),
      L(20, "cicd-lab", "CI/CD Lab", { contentDir: "ch05/20-cicd-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727270/ltv-servicenow-devops-testing-deployment/cicd-lab.mp4", durationLabel: "3 min 4 s" }),
    ],
  },
  {
    n: 6,
    title: "Deployment Planning & Rollback",
    lessons: [
      L(21, "deployment-planning-for-a-scoped-application", "Deployment Planning for a Scoped Application", { contentDir: "ch06/21-deployment-planning-for-a-scoped-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727345/ltv-servicenow-devops-testing-deployment/deployment-planning-for-a-scoped-application.mp4", durationLabel: "2 min 45 s" }),
      L(22, "rollback-strategies-when-a-deployment-goes-wrong", "Rollback Strategies When a Deployment Goes Wrong", { contentDir: "ch06/22-rollback-strategies-when-a-deployment-goes-wrong", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727404/ltv-servicenow-devops-testing-deployment/rollback-strategies-when-a-deployment-goes-wrong.mp4", durationLabel: "2 min 13 s" }),
      L(23, "deployment-lab", "Deployment Lab", { contentDir: "ch06/23-deployment-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727468/ltv-servicenow-devops-testing-deployment/deployment-lab.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: a Tested, Deployable Application Pipeline",
    lessons: [
      L(24, "capstone-kickoff-pipeline-requirements", "Capstone Kickoff: Pipeline Requirements", { contentDir: "ch07/24-capstone-kickoff-pipeline-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727551/ltv-servicenow-devops-testing-deployment/capstone-kickoff-pipeline-requirements.mp4", durationLabel: "3 min 15 s" }),
      L(25, "capstone-build-atf-coverage-for-a-real-application", "Capstone: Build ATF Coverage for a Real Application", { contentDir: "ch07/25-capstone-build-atf-coverage-for-a-real-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727624/ltv-servicenow-devops-testing-deployment/capstone-build-atf-coverage-for-a-real-application.mp4", durationLabel: "2 min 51 s" }),
      L(26, "capstone-wrap-up-and-deployment-runbook", "Capstone Wrap-Up & Deployment Runbook", { contentDir: "ch07/26-capstone-wrap-up-and-deployment-runbook", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792727707/ltv-servicenow-devops-testing-deployment/capstone-wrap-up-and-deployment-runbook.mp4", durationLabel: "3 min 17 s" }),
    ],
  },
];
