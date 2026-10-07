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
      L(1, "why-infrastructure-as-code", "Why Infrastructure as Code", { contentDir: "ch01/01-why-infrastructure-as-code" }),
      L(2, "declarative-vs-imperative", "Declarative vs. Imperative", { contentDir: "ch01/02-declarative-vs-imperative" }),
      L(3, "the-iac-tool-landscape", "The IaC Tool Landscape", { contentDir: "ch01/03-the-iac-tool-landscape" }),
      L(4, "terraform-architecture", "Terraform Architecture", { contentDir: "ch01/04-terraform-architecture" }),
      L(5, "installing-terraform-and-configuring-providers", "Installing Terraform & Configuring Providers", { contentDir: "ch01/05-installing-terraform-and-configuring-providers" }),
    ],
  },
  {
    n: 2,
    title: "Terraform Fundamentals",
    lessons: [
      L(6, "hcl-syntax", "HCL Syntax", { contentDir: "ch02/06-hcl-syntax" }),
      L(7, "resources-and-providers", "Resources & Providers", { contentDir: "ch02/07-resources-and-providers" }),
      L(8, "variables-and-outputs", "Variables & Outputs", { contentDir: "ch02/08-variables-and-outputs" }),
      L(9, "data-sources", "Data Sources", { contentDir: "ch02/09-data-sources" }),
      L(10, "expressions-and-functions", "Expressions & Functions", { contentDir: "ch02/10-expressions-and-functions" }),
      L(11, "the-plan-and-apply-workflow", "The Plan and Apply Workflow", { contentDir: "ch02/11-the-plan-and-apply-workflow" }),
    ],
  },
  {
    n: 3,
    title: "State",
    lessons: [
      L(12, "what-state-is", "What State Is", { contentDir: "ch03/12-what-state-is" }),
      L(13, "remote-state-and-backends", "Remote State & Backends", { contentDir: "ch03/13-remote-state-and-backends" }),
      L(14, "state-locking", "State Locking", { contentDir: "ch03/14-state-locking" }),
      L(15, "importing-existing-resources", "Importing Existing Resources", { contentDir: "ch03/15-importing-existing-resources" }),
      L(16, "state-commands-and-recovery", "State Commands & Recovery", { contentDir: "ch03/16-state-commands-and-recovery" }),
    ],
  },
  {
    n: 4,
    title: "Modules & Reuse",
    lessons: [
      L(17, "writing-modules", "Writing Modules", { contentDir: "ch04/17-writing-modules" }),
      L(18, "module-inputs-and-outputs", "Module Inputs & Outputs", { contentDir: "ch04/18-module-inputs-and-outputs" }),
      L(19, "using-registry-modules", "Using Registry Modules", { contentDir: "ch04/19-using-registry-modules" }),
      L(20, "module-versioning-and-structure", "Module Versioning & Structure", { contentDir: "ch04/20-module-versioning-and-structure" }),
    ],
  },
  {
    n: 5,
    title: "Deploying on Azure",
    lessons: [
      L(21, "the-azurerm-provider", "The azurerm Provider", { contentDir: "ch05/21-the-azurerm-provider" }),
      L(22, "networking-and-virtual-machines-on-azure", "Networking & Virtual Machines on Azure", { contentDir: "ch05/22-networking-and-virtual-machines-on-azure" }),
      L(23, "app-services-storage-and-key-vault-on-azure", "App Services, Storage & Key Vault on Azure", { contentDir: "ch05/23-app-services-storage-and-key-vault-on-azure" }),
      L(24, "aks-with-terraform", "AKS With Terraform", { contentDir: "ch05/24-aks-with-terraform" }),
    ],
  },
  {
    n: 6,
    title: "Deploying on AWS",
    lessons: [
      L(25, "the-aws-provider", "The AWS Provider", { contentDir: "ch06/25-the-aws-provider" }),
      L(26, "vpc-and-ec2-on-aws", "VPC & EC2 on AWS", { contentDir: "ch06/26-vpc-and-ec2-on-aws" }),
      L(27, "s3-iam-and-lambda-on-aws", "S3, IAM & Lambda on AWS", { contentDir: "ch06/27-s3-iam-and-lambda-on-aws" }),
      L(28, "eks-with-terraform", "EKS With Terraform", { contentDir: "ch06/28-eks-with-terraform" }),
    ],
  },
  {
    n: 7,
    title: "Terraform in Teams",
    lessons: [
      L(29, "workspaces-and-environments", "Workspaces & Environments", { contentDir: "ch07/29-workspaces-and-environments" }),
      L(30, "terraform-in-ci-cd", "Terraform in CI/CD", { contentDir: "ch07/30-terraform-in-ci-cd" }),
      L(31, "policy-as-code", "Policy as Code", { contentDir: "ch07/31-policy-as-code" }),
      L(32, "drift-detection", "Drift Detection", { contentDir: "ch07/32-drift-detection" }),
      L(33, "secrets-handling", "Secrets Handling", { contentDir: "ch07/33-secrets-handling" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(34, "capstone-kickoff-provision-a-production-style-environment", "Capstone Kickoff: Provision a Production-Style Environment", { contentDir: "ch08/34-capstone-kickoff-provision-a-production-style-environment" }),
      L(35, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/35-capstone-build-it" }),
      L(36, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/36-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
