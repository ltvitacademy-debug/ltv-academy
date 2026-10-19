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
      L(1, "why-infrastructure-as-code", "Why Infrastructure as Code", { contentDir: "ch01/01-why-infrastructure-as-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451154/ltv-infrastructure-as-code-with-terraform/why-infrastructure-as-code.mp4", durationLabel: "1 min 33 s" }),
      L(2, "declarative-vs-imperative", "Declarative vs. Imperative", { contentDir: "ch01/02-declarative-vs-imperative", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451225/ltv-infrastructure-as-code-with-terraform/declarative-vs-imperative.mp4", durationLabel: "1 min 18 s" }),
      L(3, "the-iac-tool-landscape", "The IaC Tool Landscape", { contentDir: "ch01/03-the-iac-tool-landscape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451313/ltv-infrastructure-as-code-with-terraform/the-iac-tool-landscape.mp4", durationLabel: "1 min 37 s" }),
      L(4, "terraform-architecture", "Terraform Architecture", { contentDir: "ch01/04-terraform-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451388/ltv-infrastructure-as-code-with-terraform/terraform-architecture.mp4", durationLabel: "1 min 24 s" }),
      L(5, "installing-terraform-and-configuring-providers", "Installing Terraform & Configuring Providers", { contentDir: "ch01/05-installing-terraform-and-configuring-providers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451462/ltv-infrastructure-as-code-with-terraform/installing-terraform-and-configuring-providers.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 2,
    title: "Terraform Fundamentals",
    lessons: [
      L(6, "hcl-syntax", "HCL Syntax", { contentDir: "ch02/06-hcl-syntax", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451573/ltv-infrastructure-as-code-with-terraform/hcl-syntax.mp4", durationLabel: "2 min 1 s" }),
      L(7, "resources-and-providers", "Resources & Providers", { contentDir: "ch02/07-resources-and-providers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451693/ltv-infrastructure-as-code-with-terraform/resources-and-providers.mp4", durationLabel: "2 min 9 s" }),
      L(8, "variables-and-outputs", "Variables & Outputs", { contentDir: "ch02/08-variables-and-outputs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451806/ltv-infrastructure-as-code-with-terraform/variables-and-outputs.mp4", durationLabel: "2 min 1 s" }),
      L(9, "data-sources", "Data Sources", { contentDir: "ch02/09-data-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451921/ltv-infrastructure-as-code-with-terraform/data-sources.mp4", durationLabel: "1 min 53 s" }),
      L(10, "expressions-and-functions", "Expressions & Functions", { contentDir: "ch02/10-expressions-and-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452039/ltv-infrastructure-as-code-with-terraform/expressions-and-functions.mp4", durationLabel: "2 min 3 s" }),
      L(11, "the-plan-and-apply-workflow", "The Plan and Apply Workflow", { contentDir: "ch02/11-the-plan-and-apply-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452154/ltv-infrastructure-as-code-with-terraform/the-plan-and-apply-workflow.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 3,
    title: "State",
    lessons: [
      L(12, "what-state-is", "What State Is", { contentDir: "ch03/12-what-state-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452263/ltv-infrastructure-as-code-with-terraform/what-state-is.mp4", durationLabel: "2 min 8 s" }),
      L(13, "remote-state-and-backends", "Remote State & Backends", { contentDir: "ch03/13-remote-state-and-backends", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452385/ltv-infrastructure-as-code-with-terraform/remote-state-and-backends.mp4", durationLabel: "2 min 1 s" }),
      L(14, "state-locking", "State Locking", { contentDir: "ch03/14-state-locking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452500/ltv-infrastructure-as-code-with-terraform/state-locking.mp4", durationLabel: "1 min 59 s" }),
      L(15, "importing-existing-resources", "Importing Existing Resources", { contentDir: "ch03/15-importing-existing-resources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452614/ltv-infrastructure-as-code-with-terraform/importing-existing-resources.mp4", durationLabel: "2 min 9 s" }),
      L(16, "state-commands-and-recovery", "State Commands & Recovery", { contentDir: "ch03/16-state-commands-and-recovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452719/ltv-infrastructure-as-code-with-terraform/state-commands-and-recovery.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 4,
    title: "Modules & Reuse",
    lessons: [
      L(17, "writing-modules", "Writing Modules", { contentDir: "ch04/17-writing-modules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452840/ltv-infrastructure-as-code-with-terraform/writing-modules.mp4", durationLabel: "2 min 8 s" }),
      L(18, "module-inputs-and-outputs", "Module Inputs & Outputs", { contentDir: "ch04/18-module-inputs-and-outputs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452951/ltv-infrastructure-as-code-with-terraform/module-inputs-and-outputs.mp4", durationLabel: "1 min 54 s" }),
      L(19, "using-registry-modules", "Using Registry Modules", { contentDir: "ch04/19-using-registry-modules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453070/ltv-infrastructure-as-code-with-terraform/using-registry-modules.mp4", durationLabel: "2 min 5 s" }),
      L(20, "module-versioning-and-structure", "Module Versioning & Structure", { contentDir: "ch04/20-module-versioning-and-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453184/ltv-infrastructure-as-code-with-terraform/module-versioning-and-structure.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 5,
    title: "Deploying on Azure",
    lessons: [
      L(21, "the-azurerm-provider", "The azurerm Provider", { contentDir: "ch05/21-the-azurerm-provider", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453283/ltv-infrastructure-as-code-with-terraform/the-azurerm-provider.mp4", durationLabel: "2 min 12 s" }),
      L(22, "networking-and-virtual-machines-on-azure", "Networking & Virtual Machines on Azure", { contentDir: "ch05/22-networking-and-virtual-machines-on-azure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453401/ltv-infrastructure-as-code-with-terraform/networking-and-virtual-machines-on-azure.mp4", durationLabel: "2 min 9 s" }),
      L(23, "app-services-storage-and-key-vault-on-azure", "App Services, Storage & Key Vault on Azure", { contentDir: "ch05/23-app-services-storage-and-key-vault-on-azure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453506/ltv-infrastructure-as-code-with-terraform/app-services-storage-and-key-vault-on-azure.mp4", durationLabel: "1 min 59 s" }),
      L(24, "aks-with-terraform", "AKS With Terraform", { contentDir: "ch05/24-aks-with-terraform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453597/ltv-infrastructure-as-code-with-terraform/aks-with-terraform.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 6,
    title: "Deploying on AWS",
    lessons: [
      L(25, "the-aws-provider", "The AWS Provider", { contentDir: "ch06/25-the-aws-provider", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453685/ltv-infrastructure-as-code-with-terraform/the-aws-provider.mp4", durationLabel: "2 min 4 s" }),
      L(26, "vpc-and-ec2-on-aws", "VPC & EC2 on AWS", { contentDir: "ch06/26-vpc-and-ec2-on-aws", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453773/ltv-infrastructure-as-code-with-terraform/vpc-and-ec2-on-aws.mp4", durationLabel: "2 min 5 s" }),
      L(27, "s3-iam-and-lambda-on-aws", "S3, IAM & Lambda on AWS", { contentDir: "ch06/27-s3-iam-and-lambda-on-aws", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453873/ltv-infrastructure-as-code-with-terraform/s3-iam-and-lambda-on-aws.mp4", durationLabel: "2 min 13 s" }),
      L(28, "eks-with-terraform", "EKS With Terraform", { contentDir: "ch06/28-eks-with-terraform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453946/ltv-infrastructure-as-code-with-terraform/eks-with-terraform.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 7,
    title: "Terraform in Teams",
    lessons: [
      L(29, "workspaces-and-environments", "Workspaces & Environments", { contentDir: "ch07/29-workspaces-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453988/ltv-infrastructure-as-code-with-terraform/workspaces-and-environments.mp4", durationLabel: "1 min 29 s" }),
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
