// Terraform, Bicep & Infrastructure as Code course outline. Lessons without a contentDir render
// as "in production". Course 8 of the Cloud Engineer → Cloud Architect path — the first course of
// the Advanced Specialization stage: real, hands-on Terraform (the industry-standard multi-cloud
// IaC tool previewed in course 6) plus a deeper Bicep pass, building on the ARM/CloudFormation
// preview already taught rather than re-explaining what IaC is.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/terraform-iac-for-cloud-architects/
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

export const TERRAFORM_IAC_FOR_CLOUD_ARCHITECTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Terraform Fundamentals",
    lessons: [
      L(1, "installing-terraform-and-the-provider-model", "Installing Terraform and the Provider Model", { contentDir: "ch01/01-installing-terraform-and-the-provider-model" }),
      L(2, "terraform-init-plan-and-apply-in-depth", "terraform init, plan, and apply in Depth", { contentDir: "ch01/02-terraform-init-plan-and-apply-in-depth" }),
      L(3, "resources-data-sources-and-the-terraform-state-file", "Resources, Data Sources, and the Terraform State File", { contentDir: "ch01/03-resources-data-sources-and-the-terraform-state-file" }),
      L(4, "hcl-syntax-variables-outputs-and-locals", "HCL Syntax: Variables, Outputs, and Locals", { contentDir: "ch01/04-hcl-syntax-variables-outputs-and-locals" }),
    ],
  },
  {
    n: 2,
    title: "Provisioning Real Infrastructure",
    lessons: [
      L(5, "provisioning-an-azure-resource-group-and-vnet-with-terraform", "Provisioning an Azure Resource Group and VNet with Terraform", { contentDir: "ch02/05-provisioning-an-azure-resource-group-and-vnet-with-terraform" }),
      L(6, "provisioning-an-aws-vpc-with-terraform", "Provisioning an AWS VPC with Terraform", { contentDir: "ch02/06-provisioning-an-aws-vpc-with-terraform" }),
      L(7, "provisioning-compute-across-both-providers", "Provisioning Compute Across Both Providers", { contentDir: "ch02/07-provisioning-compute-across-both-providers" }),
      L(8, "the-multi-provider-configuration-pattern", "The Multi-Provider Configuration Pattern", { contentDir: "ch02/08-the-multi-provider-configuration-pattern" }),
    ],
  },
  {
    n: 3,
    title: "State Management",
    lessons: [
      L(9, "why-local-state-doesnt-scale-to-a-team", "Why Local State Doesn't Scale to a Team", { contentDir: "ch03/09-why-local-state-doesnt-scale-to-a-team" }),
      L(10, "remote-state-backends-azure-storage-and-s3", "Remote State Backends: Azure Storage and S3", { contentDir: "ch03/10-remote-state-backends-azure-storage-and-s3" }),
      L(11, "state-locking-and-preventing-concurrent-apply-conflicts", "State Locking and Preventing Concurrent Apply Conflicts", { contentDir: "ch03/11-state-locking-and-preventing-concurrent-apply-conflicts" }),
      L(12, "importing-existing-infrastructure-into-terraform-state", "Importing Existing Infrastructure into Terraform State", { contentDir: "ch03/12-importing-existing-infrastructure-into-terraform-state" }),
    ],
  },
  {
    n: 4,
    title: "Modules & Reusability",
    lessons: [
      L(13, "why-modules-exist-and-when-to-write-one", "Why Modules Exist and When to Write One", { contentDir: "ch04/13-why-modules-exist-and-when-to-write-one" }),
      L(14, "writing-your-first-reusable-terraform-module", "Writing Your First Reusable Terraform Module", { contentDir: "ch04/14-writing-your-first-reusable-terraform-module" }),
      L(15, "module-versioning-and-a-private-module-registry", "Module Versioning and a Private Module Registry", { contentDir: "ch04/15-module-versioning-and-a-private-module-registry" }),
      L(16, "composing-multiple-modules-into-an-environment", "Composing Multiple Modules into an Environment", { contentDir: "ch04/16-composing-multiple-modules-into-an-environment" }),
    ],
  },
  {
    n: 5,
    title: "Terraform Workspaces & Environments",
    lessons: [
      L(17, "managing-dev-staging-and-prod-with-workspaces", "Managing Dev, Staging, and Prod with Workspaces", { contentDir: "ch05/17-managing-dev-staging-and-prod-with-workspaces" }),
      L(18, "workspaces-vs-separate-state-files-the-real-tradeoff", "Workspaces vs. Separate State Files: The Real Tradeoff", { contentDir: "ch05/18-workspaces-vs-separate-state-files-the-real-tradeoff" }),
      L(19, "variable-files-per-environment", "Variable Files Per Environment", { contentDir: "ch05/19-variable-files-per-environment" }),
      L(20, "terraform-cloud-and-terraform-enterprise-concepts", "Terraform Cloud and Terraform Enterprise Concepts", { contentDir: "ch05/20-terraform-cloud-and-terraform-enterprise-concepts" }),
    ],
  },
  {
    n: 6,
    title: "Bicep Deep Dive",
    lessons: [
      L(21, "bicep-syntax-beyond-the-first-look", "Bicep Syntax Beyond the First Look", { contentDir: "ch06/21-bicep-syntax-beyond-the-first-look" }),
      L(22, "bicep-modules-and-parameter-files", "Bicep Modules and Parameter Files", { contentDir: "ch06/22-bicep-modules-and-parameter-files" }),
      L(23, "what-if-deployments-and-deployment-stacks", "What-If Deployments and Deployment Stacks", { contentDir: "ch06/23-what-if-deployments-and-deployment-stacks" }),
      L(24, "terraform-vs-bicep-choosing-for-a-real-project", "Terraform vs. Bicep: Choosing for a Real Project", { contentDir: "ch06/24-terraform-vs-bicep-choosing-for-a-real-project" }),
    ],
  },
  {
    n: 7,
    title: "Terraform in CI/CD",
    lessons: [
      L(25, "running-terraform-plan-in-a-pull-request", "Running terraform plan in a Pull Request", { contentDir: "ch07/25-running-terraform-plan-in-a-pull-request" }),
      L(26, "requiring-approval-before-terraform-apply", "Requiring Approval Before terraform apply", { contentDir: "ch07/26-requiring-approval-before-terraform-apply" }),
      L(27, "terraform-and-secrets-in-a-pipeline", "Terraform and Secrets in a Pipeline", { contentDir: "ch07/27-terraform-and-secrets-in-a-pipeline" }),
      L(28, "drift-detection-and-keeping-state-honest", "Drift Detection and Keeping State Honest", { contentDir: "ch07/28-drift-detection-and-keeping-state-honest" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: A Real Multi-Environment Terraform Project",
    lessons: [
      L(29, "lab-building-a-reusable-network-module", "Lab: Building a Reusable Network Module", { contentDir: "ch08/29-lab-building-a-reusable-network-module" }),
      L(30, "lab-deploying-dev-and-prod-from-the-same-modules", "Lab: Deploying Dev and Prod from the Same Modules", { contentDir: "ch08/30-lab-deploying-dev-and-prod-from-the-same-modules" }),
      L(31, "case-study-recovering-from-a-corrupted-state-file", "Case Study: Recovering from a Corrupted State File", { contentDir: "ch08/31-case-study-recovering-from-a-corrupted-state-file" }),
      L(32, "chapter-capstone-infrastructure-as-code-review", "Chapter Capstone: Infrastructure as Code Review", { contentDir: "ch08/32-chapter-capstone-infrastructure-as-code-review" }),
    ],
  },
];
