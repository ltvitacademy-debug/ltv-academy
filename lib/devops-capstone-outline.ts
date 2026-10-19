// The DevOps Capstone course outline. All 25 lessons have real guide.md
// content (the header here previously, incorrectly, called this
// "framework only" — fixed 2026-10-17). Lessons without a contentDir
// render as "in production". Step 13 of the DevOps Engineer path.
// Students build one real system end to end: a code change pushed to
// GitHub is automatically built, tested, packaged, and deployed. Closes
// with resume, portfolio, certification, and interview preparation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/devops-capstone/
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

export const DEVOPS_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "the-capstone-brief-and-architecture", "The Capstone Brief & Architecture", { contentDir: "ch01/01-the-capstone-brief-and-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450471/ltv-devops-capstone/the-capstone-brief-and-architecture.mp4", durationLabel: "1 min 55 s" }),
      L(2, "repository-structure-and-branching-plan", "Repository Structure & Branching Plan", { contentDir: "ch01/02-repository-structure-and-branching-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450588/ltv-devops-capstone/repository-structure-and-branching-plan.mp4", durationLabel: "2 min 18 s" }),
      L(3, "success-criteria-and-project-plan", "Success Criteria & Project Plan", { contentDir: "ch01/03-success-criteria-and-project-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453219/ltv-devops-capstone/success-criteria-and-project-plan.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Application & Containers",
    lessons: [
      L(4, "the-sample-application", "The Sample Application", { contentDir: "ch02/04-the-sample-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450804/ltv-devops-capstone/the-sample-application.mp4", durationLabel: "2 min 20 s" }),
      L(5, "containerizing-the-application", "Containerizing the Application", { contentDir: "ch02/05-containerizing-the-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453459/ltv-devops-capstone/containerizing-the-application.mp4", durationLabel: "2 min 5 s" }),
      L(6, "local-multi-service-environment-with-compose", "Local Multi-Service Environment With Compose", { contentDir: "ch02/06-local-multi-service-environment-with-compose", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450925/ltv-devops-capstone/local-multi-service-environment-with-compose.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Infrastructure",
    lessons: [
      L(7, "provisioning-cloud-infrastructure-with-terraform", "Provisioning Cloud Infrastructure With Terraform", { contentDir: "ch03/07-provisioning-cloud-infrastructure-with-terraform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451031/ltv-devops-capstone/provisioning-cloud-infrastructure-with-terraform.mp4", durationLabel: "2 min 4 s" }),
      L(8, "provisioning-the-kubernetes-cluster", "Provisioning the Kubernetes Cluster", { contentDir: "ch03/08-provisioning-the-kubernetes-cluster", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451153/ltv-devops-capstone/provisioning-the-kubernetes-cluster.mp4", durationLabel: "2 min 16 s" }),
      L(9, "configuring-networking-identity-and-secrets", "Configuring Networking, Identity & Secrets", { contentDir: "ch03/09-configuring-networking-identity-and-secrets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451275/ltv-devops-capstone/configuring-networking-identity-and-secrets.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Pipeline & Deployment",
    lessons: [
      L(10, "building-the-ci-pipeline", "Building the CI Pipeline", { contentDir: "ch04/10-building-the-ci-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451387/ltv-devops-capstone/building-the-ci-pipeline.mp4", durationLabel: "2 min 1 s" }),
      L(11, "deploying-to-kubernetes-automatically", "Deploying to Kubernetes Automatically", { contentDir: "ch04/11-deploying-to-kubernetes-automatically", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451501/ltv-devops-capstone/deploying-to-kubernetes-automatically.mp4", durationLabel: "2 min 2 s" }),
      L(12, "environment-promotion-and-approvals", "Environment Promotion & Approvals", { contentDir: "ch04/12-environment-promotion-and-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451612/ltv-devops-capstone/environment-promotion-and-approvals.mp4", durationLabel: "2 min 0 s" }),
      L(13, "the-push-to-production-demo", "The Push-to-Production Demo", { contentDir: "ch04/13-the-push-to-production-demo", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451780/ltv-devops-capstone/the-push-to-production-demo.mp4", durationLabel: "3 min 2 s" }),
    ],
  },
  {
    n: 5,
    title: "Phase 4: Monitoring & Security",
    lessons: [
      L(14, "adding-monitoring-and-alerting", "Adding Monitoring & Alerting", { contentDir: "ch05/14-adding-monitoring-and-alerting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451903/ltv-devops-capstone/adding-monitoring-and-alerting.mp4", durationLabel: "2 min 12 s" }),
      L(15, "adding-security-scanning-and-secrets-management", "Adding Security Scanning & Secrets Management", { contentDir: "ch05/15-adding-security-scanning-and-secrets-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452026/ltv-devops-capstone/adding-security-scanning-and-secrets-management.mp4", durationLabel: "2 min 16 s" }),
      L(16, "incident-drill-and-postmortem", "Incident Drill & Postmortem", { contentDir: "ch05/16-incident-drill-and-postmortem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452147/ltv-devops-capstone/incident-drill-and-postmortem.mp4", durationLabel: "2 min 16 s" }),
      L(17, "documentation-and-presentation", "Documentation & Presentation", { contentDir: "ch05/17-documentation-and-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452277/ltv-devops-capstone/documentation-and-presentation.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 6,
    title: "Career Preparation",
    lessons: [
      L(18, "resume-and-linkedin-for-devops-engineers", "Resume & LinkedIn for DevOps Engineers", { contentDir: "ch06/18-resume-and-linkedin-for-devops-engineers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452396/ltv-devops-capstone/resume-and-linkedin-for-devops-engineers.mp4", durationLabel: "2 min 4 s" }),
      L(19, "building-a-github-portfolio", "Building a GitHub Portfolio", { contentDir: "ch06/19-building-a-github-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452499/ltv-devops-capstone/building-a-github-portfolio.mp4", durationLabel: "1 min 47 s" }),
      L(20, "the-devops-interview-landscape", "The DevOps Interview Landscape", { contentDir: "ch06/20-the-devops-interview-landscape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452600/ltv-devops-capstone/the-devops-interview-landscape.mp4", durationLabel: "1 min 48 s" }),
      L(21, "linux-and-networking-interview-questions", "Linux & Networking Interview Questions", { contentDir: "ch06/21-linux-and-networking-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452700/ltv-devops-capstone/linux-and-networking-interview-questions.mp4", durationLabel: "1 min 59 s" }),
      L(22, "ci-cd-and-cloud-interview-questions", "CI/CD & Cloud Interview Questions", { contentDir: "ch06/22-ci-cd-and-cloud-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452805/ltv-devops-capstone/ci-cd-and-cloud-interview-questions.mp4", durationLabel: "1 min 56 s" }),
      L(23, "kubernetes-and-terraform-interview-questions", "Kubernetes & Terraform Interview Questions", { contentDir: "ch06/23-kubernetes-and-terraform-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452912/ltv-devops-capstone/kubernetes-and-terraform-interview-questions.mp4", durationLabel: "2 min 2 s" }),
      L(24, "behavioral-and-incident-interview-questions", "Behavioral & Incident Interview Questions", { contentDir: "ch06/24-behavioral-and-incident-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453021/ltv-devops-capstone/behavioral-and-incident-interview-questions.mp4", durationLabel: "1 min 54 s" }),
      L(25, "certifications-az-400-aws-devops-cka-and-terraform-associate", "Certifications: AZ-400, AWS DevOps, CKA & Terraform Associate", { contentDir: "ch06/25-certifications-az-400-aws-devops-cka-and-terraform-associate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453165/ltv-devops-capstone/certifications-az-400-aws-devops-cka-and-terraform-associate.mp4", durationLabel: "2 min 38 s" }),
    ],
  },
];
