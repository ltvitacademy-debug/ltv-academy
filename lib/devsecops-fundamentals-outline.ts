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
      L(1, "shift-left-security", "Shift-Left Security", { contentDir: "ch01/01-shift-left-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447256/ltv-devsecops-fundamentals/shift-left-security.mp4", durationLabel: "2 min 40 s" }),
      L(2, "threat-modeling-basics", "Threat Modeling Basics", { contentDir: "ch01/02-threat-modeling-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447463/ltv-devsecops-fundamentals/threat-modeling-basics.mp4", durationLabel: "2 min 23 s" }),
      L(3, "the-owasp-top-10-for-devops-teams", "The OWASP Top 10 for DevOps Teams", { contentDir: "ch01/03-the-owasp-top-10-for-devops-teams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447616/ltv-devsecops-fundamentals/the-owasp-top-10-for-devops-teams.mp4", durationLabel: "2 min 13 s" }),
      L(4, "security-in-the-software-lifecycle", "Security in the Software Lifecycle", { contentDir: "ch01/04-security-in-the-software-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447778/ltv-devsecops-fundamentals/security-in-the-software-lifecycle.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 2,
    title: "Identity, IAM & RBAC",
    lessons: [
      L(5, "iam-principles-least-privilege", "IAM Principles: Least Privilege", { contentDir: "ch02/05-iam-principles-least-privilege", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447916/ltv-devsecops-fundamentals/iam-principles-least-privilege.mp4", durationLabel: "2 min 14 s" }),
      L(6, "azure-entra-id-and-rbac", "Azure Entra ID & RBAC", { contentDir: "ch02/06-azure-entra-id-and-rbac", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448037/ltv-devsecops-fundamentals/azure-entra-id-and-rbac.mp4", durationLabel: "1 min 50 s" }),
      L(7, "aws-iam-roles-and-policies", "AWS IAM Roles & Policies", { contentDir: "ch02/07-aws-iam-roles-and-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448168/ltv-devsecops-fundamentals/aws-iam-roles-and-policies.mp4", durationLabel: "1 min 50 s" }),
      L(8, "kubernetes-rbac", "Kubernetes RBAC", { contentDir: "ch02/08-kubernetes-rbac", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448275/ltv-devsecops-fundamentals/kubernetes-rbac.mp4", durationLabel: "1 min 45 s" }),
      L(9, "workload-identity", "Workload Identity", { contentDir: "ch02/09-workload-identity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448384/ltv-devsecops-fundamentals/workload-identity.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 3,
    title: "Secrets Management",
    lessons: [
      L(10, "why-secrets-leak", "Why Secrets Leak", { contentDir: "ch03/10-why-secrets-leak", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448490/ltv-devsecops-fundamentals/why-secrets-leak.mp4", durationLabel: "1 min 39 s" }),
      L(11, "azure-key-vault", "Azure Key Vault", { contentDir: "ch03/11-azure-key-vault", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448593/ltv-devsecops-fundamentals/azure-key-vault.mp4", durationLabel: "1 min 47 s" }),
      L(12, "aws-secrets-manager", "AWS Secrets Manager", { contentDir: "ch03/12-aws-secrets-manager", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448695/ltv-devsecops-fundamentals/aws-secrets-manager.mp4", durationLabel: "1 min 56 s" }),
      L(13, "hashicorp-vault-overview", "HashiCorp Vault Overview", { contentDir: "ch03/13-hashicorp-vault-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448801/ltv-devsecops-fundamentals/hashicorp-vault-overview.mp4", durationLabel: "1 min 53 s" }),
      L(14, "secrets-in-pipelines-and-kubernetes", "Secrets in Pipelines & Kubernetes", { contentDir: "ch03/14-secrets-in-pipelines-and-kubernetes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448914/ltv-devsecops-fundamentals/secrets-in-pipelines-and-kubernetes.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 4,
    title: "Vulnerability Scanning",
    lessons: [
      L(15, "static-application-security-testing", "Static Application Security Testing", { contentDir: "ch04/15-static-application-security-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449000/ltv-devsecops-fundamentals/static-application-security-testing.mp4", durationLabel: "1 min 26 s" }),
      L(16, "dependency-and-composition-scanning", "Dependency & Composition Scanning", { contentDir: "ch04/16-dependency-and-composition-scanning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449078/ltv-devsecops-fundamentals/dependency-and-composition-scanning.mp4", durationLabel: "1 min 29 s" }),
      L(17, "secrets-detection", "Secrets Detection", { contentDir: "ch04/17-secrets-detection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449152/ltv-devsecops-fundamentals/secrets-detection.mp4", durationLabel: "1 min 23 s" }),
      L(18, "infrastructure-as-code-scanning", "Infrastructure as Code Scanning", { contentDir: "ch04/18-infrastructure-as-code-scanning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449229/ltv-devsecops-fundamentals/infrastructure-as-code-scanning.mp4", durationLabel: "1 min 27 s" }),
      L(19, "software-bills-of-materials-and-supply-chain-risk", "Software Bills of Materials & Supply Chain Risk", { contentDir: "ch04/19-software-bills-of-materials-and-supply-chain-risk", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449310/ltv-devsecops-fundamentals/software-bills-of-materials-and-supply-chain-risk.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 5,
    title: "Container & Pipeline Security",
    lessons: [
      L(20, "image-scanning-and-hardening", "Image Scanning & Hardening", { contentDir: "ch05/20-image-scanning-and-hardening", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449383/ltv-devsecops-fundamentals/image-scanning-and-hardening.mp4", durationLabel: "1 min 27 s" }),
      L(21, "kubernetes-security-posture", "Kubernetes Security Posture", { contentDir: "ch05/21-kubernetes-security-posture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449472/ltv-devsecops-fundamentals/kubernetes-security-posture.mp4", durationLabel: "1 min 41 s" }),
      L(22, "securing-ci-cd-pipelines", "Securing CI/CD Pipelines", { contentDir: "ch05/22-securing-ci-cd-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449572/ltv-devsecops-fundamentals/securing-ci-cd-pipelines.mp4", durationLabel: "1 min 54 s" }),
      L(23, "runtime-security", "Runtime Security", { contentDir: "ch05/23-runtime-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449643/ltv-devsecops-fundamentals/runtime-security.mp4", durationLabel: "1 min 23 s" }),
      L(24, "policy-as-code", "Policy as Code", { contentDir: "ch05/24-policy-as-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449720/ltv-devsecops-fundamentals/policy-as-code.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 6,
    title: "Compliance & Response",
    lessons: [
      L(25, "compliance-as-code", "Compliance as Code", { contentDir: "ch06/25-compliance-as-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449812/ltv-devsecops-fundamentals/compliance-as-code.mp4", durationLabel: "1 min 50 s" }),
      L(26, "audit-logging-and-evidence", "Audit Logging & Evidence", { contentDir: "ch06/26-audit-logging-and-evidence", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449907/ltv-devsecops-fundamentals/audit-logging-and-evidence.mp4", durationLabel: "1 min 46 s" }),
      L(27, "vulnerability-management-process", "Vulnerability Management Process", { contentDir: "ch06/27-vulnerability-management-process", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453192/ltv-devsecops-fundamentals/vulnerability-management-process.mp4", durationLabel: "1 min 53 s" }),
      L(28, "security-incident-response", "Security Incident Response", { contentDir: "ch06/28-security-incident-response", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453205/ltv-devsecops-fundamentals/security-incident-response.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-secure-a-pipeline-end-to-end", "Capstone Kickoff: Secure a Pipeline End to End", { contentDir: "ch07/29-capstone-kickoff-secure-a-pipeline-end-to-end", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450219/ltv-devsecops-fundamentals/capstone-kickoff-secure-a-pipeline-end-to-end.mp4", durationLabel: "1 min 33 s" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453335/ltv-devsecops-fundamentals/capstone-build-it.mp4", durationLabel: "1 min 44 s" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450363/ltv-devsecops-fundamentals/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
];
