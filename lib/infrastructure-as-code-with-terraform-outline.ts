// The Infrastructure as Code course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 9 of the DevOps Engineer path. General Terraform for Azure and AWS; distinct from Terraform & Bicep for Data Engineers, which is scoped to data platforms.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/infrastructure-as-code-with-terraform/
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

export const INFRASTRUCTURE_AS_CODE_WITH_TERRAFORM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Infrastructure as Code Concepts",
    lessons: [
      L(1, "why-infrastructure-as-code", "Why Infrastructure as Code"),
      L(2, "declarative-vs-imperative", "Declarative vs. Imperative"),
      L(3, "the-iac-tool-landscape", "The IaC Tool Landscape"),
      L(4, "terraform-architecture", "Terraform Architecture"),
      L(5, "installing-terraform-and-configuring-providers", "Installing Terraform & Configuring Providers"),
    ],
  },
  {
    n: 2,
    title: "Terraform Fundamentals",
    lessons: [
      L(6, "hcl-syntax", "HCL Syntax"),
      L(7, "resources-and-providers", "Resources & Providers"),
      L(8, "variables-and-outputs", "Variables & Outputs"),
      L(9, "data-sources", "Data Sources"),
      L(10, "expressions-and-functions", "Expressions & Functions"),
      L(11, "the-plan-and-apply-workflow", "The Plan and Apply Workflow"),
    ],
  },
  {
    n: 3,
    title: "State",
    lessons: [
      L(12, "what-state-is", "What State Is"),
      L(13, "remote-state-and-backends", "Remote State & Backends"),
      L(14, "state-locking", "State Locking"),
      L(15, "importing-existing-resources", "Importing Existing Resources"),
      L(16, "state-commands-and-recovery", "State Commands & Recovery"),
    ],
  },
  {
    n: 4,
    title: "Modules & Reuse",
    lessons: [
      L(17, "writing-modules", "Writing Modules"),
      L(18, "module-inputs-and-outputs", "Module Inputs & Outputs"),
      L(19, "using-registry-modules", "Using Registry Modules"),
      L(20, "module-versioning-and-structure", "Module Versioning & Structure"),
    ],
  },
  {
    n: 5,
    title: "Deploying on Azure",
    lessons: [
      L(21, "the-azurerm-provider", "The azurerm Provider"),
      L(22, "networking-and-virtual-machines-on-azure", "Networking & Virtual Machines on Azure"),
      L(23, "app-services-storage-and-key-vault-on-azure", "App Services, Storage & Key Vault on Azure"),
      L(24, "aks-with-terraform", "AKS With Terraform"),
    ],
  },
  {
    n: 6,
    title: "Deploying on AWS",
    lessons: [
      L(25, "the-aws-provider", "The AWS Provider"),
      L(26, "vpc-and-ec2-on-aws", "VPC & EC2 on AWS"),
      L(27, "s3-iam-and-lambda-on-aws", "S3, IAM & Lambda on AWS"),
      L(28, "eks-with-terraform", "EKS With Terraform"),
    ],
  },
  {
    n: 7,
    title: "Terraform in Teams",
    lessons: [
      L(29, "workspaces-and-environments", "Workspaces & Environments"),
      L(30, "terraform-in-ci-cd", "Terraform in CI/CD"),
      L(31, "policy-as-code", "Policy as Code"),
      L(32, "drift-detection", "Drift Detection"),
      L(33, "secrets-handling", "Secrets Handling"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(34, "capstone-kickoff-provision-a-production-style-environment", "Capstone Kickoff: Provision a Production-Style Environment"),
      L(35, "capstone-build-it", "Capstone: Build It"),
      L(36, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
