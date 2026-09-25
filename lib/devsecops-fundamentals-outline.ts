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
      L(1, "shift-left-security", "Shift-Left Security"),
      L(2, "threat-modeling-basics", "Threat Modeling Basics"),
      L(3, "the-owasp-top-10-for-devops-teams", "The OWASP Top 10 for DevOps Teams"),
      L(4, "security-in-the-software-lifecycle", "Security in the Software Lifecycle"),
    ],
  },
  {
    n: 2,
    title: "Identity, IAM & RBAC",
    lessons: [
      L(5, "iam-principles-least-privilege", "IAM Principles: Least Privilege"),
      L(6, "azure-entra-id-and-rbac", "Azure Entra ID & RBAC"),
      L(7, "aws-iam-roles-and-policies", "AWS IAM Roles & Policies"),
      L(8, "kubernetes-rbac", "Kubernetes RBAC"),
      L(9, "workload-identity", "Workload Identity"),
    ],
  },
  {
    n: 3,
    title: "Secrets Management",
    lessons: [
      L(10, "why-secrets-leak", "Why Secrets Leak"),
      L(11, "azure-key-vault", "Azure Key Vault"),
      L(12, "aws-secrets-manager", "AWS Secrets Manager"),
      L(13, "hashicorp-vault-overview", "HashiCorp Vault Overview"),
      L(14, "secrets-in-pipelines-and-kubernetes", "Secrets in Pipelines & Kubernetes"),
    ],
  },
  {
    n: 4,
    title: "Vulnerability Scanning",
    lessons: [
      L(15, "static-application-security-testing", "Static Application Security Testing"),
      L(16, "dependency-and-composition-scanning", "Dependency & Composition Scanning"),
      L(17, "secrets-detection", "Secrets Detection"),
      L(18, "infrastructure-as-code-scanning", "Infrastructure as Code Scanning"),
      L(19, "software-bills-of-materials-and-supply-chain-risk", "Software Bills of Materials & Supply Chain Risk"),
    ],
  },
  {
    n: 5,
    title: "Container & Pipeline Security",
    lessons: [
      L(20, "image-scanning-and-hardening", "Image Scanning & Hardening"),
      L(21, "kubernetes-security-posture", "Kubernetes Security Posture"),
      L(22, "securing-ci-cd-pipelines", "Securing CI/CD Pipelines"),
      L(23, "runtime-security", "Runtime Security"),
      L(24, "policy-as-code", "Policy as Code"),
    ],
  },
  {
    n: 6,
    title: "Compliance & Response",
    lessons: [
      L(25, "compliance-as-code", "Compliance as Code"),
      L(26, "audit-logging-and-evidence", "Audit Logging & Evidence"),
      L(27, "vulnerability-management-process", "Vulnerability Management Process"),
      L(28, "security-incident-response", "Security Incident Response"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-secure-a-pipeline-end-to-end", "Capstone Kickoff: Secure a Pipeline End to End"),
      L(30, "capstone-build-it", "Capstone: Build It"),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
