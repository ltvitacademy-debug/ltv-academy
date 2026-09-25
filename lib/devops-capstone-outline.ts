// The DevOps Capstone course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 13 of the DevOps Engineer path. Students build one real system end to end: a code change pushed to GitHub is automatically built, tested, packaged, and deployed. Closes with resume, portfolio, certification, and interview preparation.

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
      L(1, "the-capstone-brief-and-architecture", "The Capstone Brief & Architecture"),
      L(2, "repository-structure-and-branching-plan", "Repository Structure & Branching Plan"),
      L(3, "success-criteria-and-project-plan", "Success Criteria & Project Plan"),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Application & Containers",
    lessons: [
      L(4, "the-sample-application", "The Sample Application"),
      L(5, "containerizing-the-application", "Containerizing the Application"),
      L(6, "local-multi-service-environment-with-compose", "Local Multi-Service Environment With Compose"),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Infrastructure",
    lessons: [
      L(7, "provisioning-cloud-infrastructure-with-terraform", "Provisioning Cloud Infrastructure With Terraform"),
      L(8, "provisioning-the-kubernetes-cluster", "Provisioning the Kubernetes Cluster"),
      L(9, "configuring-networking-identity-and-secrets", "Configuring Networking, Identity & Secrets"),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Pipeline & Deployment",
    lessons: [
      L(10, "building-the-ci-pipeline", "Building the CI Pipeline"),
      L(11, "deploying-to-kubernetes-automatically", "Deploying to Kubernetes Automatically"),
      L(12, "environment-promotion-and-approvals", "Environment Promotion & Approvals"),
      L(13, "the-push-to-production-demo", "The Push-to-Production Demo"),
    ],
  },
  {
    n: 5,
    title: "Phase 4: Monitoring & Security",
    lessons: [
      L(14, "adding-monitoring-and-alerting", "Adding Monitoring & Alerting"),
      L(15, "adding-security-scanning-and-secrets-management", "Adding Security Scanning & Secrets Management"),
      L(16, "incident-drill-and-postmortem", "Incident Drill & Postmortem"),
      L(17, "documentation-and-presentation", "Documentation & Presentation"),
    ],
  },
  {
    n: 6,
    title: "Career Preparation",
    lessons: [
      L(18, "resume-and-linkedin-for-devops-engineers", "Resume & LinkedIn for DevOps Engineers"),
      L(19, "building-a-github-portfolio", "Building a GitHub Portfolio"),
      L(20, "the-devops-interview-landscape", "The DevOps Interview Landscape"),
      L(21, "linux-and-networking-interview-questions", "Linux & Networking Interview Questions"),
      L(22, "ci-cd-and-cloud-interview-questions", "CI/CD & Cloud Interview Questions"),
      L(23, "kubernetes-and-terraform-interview-questions", "Kubernetes & Terraform Interview Questions"),
      L(24, "behavioral-and-incident-interview-questions", "Behavioral & Incident Interview Questions"),
      L(25, "certifications-az-400-aws-devops-cka-and-terraform-associate", "Certifications: AZ-400, AWS DevOps, CKA & Terraform Associate"),
    ],
  },
];
