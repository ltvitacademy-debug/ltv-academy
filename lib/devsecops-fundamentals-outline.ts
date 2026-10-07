// The DevSecOps course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 12 of the DevOps Engineer path: building security into pipelines and platforms rather than bolting it on afterward.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/devsecops-fundamentals/
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

export const DEVSECOPS_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Security Foundations for DevOps",
    lessons: [
      L(1, "shift-left-security", "Shift-Left Security", { contentDir: "ch01/01-shift-left-security" }),
      L(2, "threat-modeling-basics", "Threat Modeling Basics", { contentDir: "ch01/02-threat-modeling-basics" }),
      L(3, "the-owasp-top-10-for-devops-teams", "The OWASP Top 10 for DevOps Teams", { contentDir: "ch01/03-the-owasp-top-10-for-devops-teams" }),
      L(4, "security-in-the-software-lifecycle", "Security in the Software Lifecycle", { contentDir: "ch01/04-security-in-the-software-lifecycle" }),
    ],
  },
  {
    n: 2,
    title: "Identity, IAM & RBAC",
    lessons: [
      L(5, "iam-principles-least-privilege", "IAM Principles: Least Privilege", { contentDir: "ch02/05-iam-principles-least-privilege" }),
      L(6, "azure-entra-id-and-rbac", "Azure Entra ID & RBAC", { contentDir: "ch02/06-azure-entra-id-and-rbac" }),
      L(7, "aws-iam-roles-and-policies", "AWS IAM Roles & Policies", { contentDir: "ch02/07-aws-iam-roles-and-policies" }),
      L(8, "kubernetes-rbac", "Kubernetes RBAC", { contentDir: "ch02/08-kubernetes-rbac" }),
      L(9, "workload-identity", "Workload Identity", { contentDir: "ch02/09-workload-identity" }),
    ],
  },
  {
    n: 3,
    title: "Secrets Management",
    lessons: [
      L(10, "why-secrets-leak", "Why Secrets Leak", { contentDir: "ch03/10-why-secrets-leak" }),
      L(11, "azure-key-vault", "Azure Key Vault", { contentDir: "ch03/11-azure-key-vault" }),
      L(12, "aws-secrets-manager", "AWS Secrets Manager", { contentDir: "ch03/12-aws-secrets-manager" }),
      L(13, "hashicorp-vault-overview", "HashiCorp Vault Overview", { contentDir: "ch03/13-hashicorp-vault-overview" }),
      L(14, "secrets-in-pipelines-and-kubernetes", "Secrets in Pipelines & Kubernetes", { contentDir: "ch03/14-secrets-in-pipelines-and-kubernetes" }),
    ],
  },
  {
    n: 4,
    title: "Vulnerability Scanning",
    lessons: [
      L(15, "static-application-security-testing", "Static Application Security Testing", { contentDir: "ch04/15-static-application-security-testing" }),
      L(16, "dependency-and-composition-scanning", "Dependency & Composition Scanning", { contentDir: "ch04/16-dependency-and-composition-scanning" }),
      L(17, "secrets-detection", "Secrets Detection", { contentDir: "ch04/17-secrets-detection" }),
      L(18, "infrastructure-as-code-scanning", "Infrastructure as Code Scanning", { contentDir: "ch04/18-infrastructure-as-code-scanning" }),
      L(19, "software-bills-of-materials-and-supply-chain-risk", "Software Bills of Materials & Supply Chain Risk", { contentDir: "ch04/19-software-bills-of-materials-and-supply-chain-risk" }),
    ],
  },
  {
    n: 5,
    title: "Container & Pipeline Security",
    lessons: [
      L(20, "image-scanning-and-hardening", "Image Scanning & Hardening", { contentDir: "ch05/20-image-scanning-and-hardening" }),
      L(21, "kubernetes-security-posture", "Kubernetes Security Posture", { contentDir: "ch05/21-kubernetes-security-posture" }),
      L(22, "securing-ci-cd-pipelines", "Securing CI/CD Pipelines", { contentDir: "ch05/22-securing-ci-cd-pipelines" }),
      L(23, "runtime-security", "Runtime Security", { contentDir: "ch05/23-runtime-security" }),
      L(24, "policy-as-code", "Policy as Code", { contentDir: "ch05/24-policy-as-code" }),
    ],
  },
  {
    n: 6,
    title: "Compliance & Response",
    lessons: [
      L(25, "compliance-as-code", "Compliance as Code", { contentDir: "ch06/25-compliance-as-code" }),
      L(26, "audit-logging-and-evidence", "Audit Logging & Evidence", { contentDir: "ch06/26-audit-logging-and-evidence" }),
      L(27, "vulnerability-management-process", "Vulnerability Management Process", { contentDir: "ch06/27-vulnerability-management-process" }),
      L(28, "security-incident-response", "Security Incident Response", { contentDir: "ch06/28-security-incident-response" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-secure-a-pipeline-end-to-end", "Capstone Kickoff: Secure a Pipeline End to End", { contentDir: "ch07/29-capstone-kickoff-secure-a-pipeline-end-to-end" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
