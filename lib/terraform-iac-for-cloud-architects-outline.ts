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
      L(1, "installing-terraform-and-the-provider-model", "Installing Terraform and the Provider Model", { contentDir: "ch01/01-installing-terraform-and-the-provider-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/installing-terraform-and-the-provider-model.mp4", durationLabel: "2 min 53 s" }),
      L(2, "terraform-init-plan-and-apply-in-depth", "terraform init, plan, and apply in Depth", { contentDir: "ch01/02-terraform-init-plan-and-apply-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/terraform-init-plan-and-apply-in-depth.mp4", durationLabel: "2 min 51 s" }),
      L(3, "resources-data-sources-and-the-terraform-state-file", "Resources, Data Sources, and the Terraform State File", { contentDir: "ch01/03-resources-data-sources-and-the-terraform-state-file", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/resources-data-sources-and-the-terraform-state-file.mp4", durationLabel: "2 min 44 s" }),
      L(4, "hcl-syntax-variables-outputs-and-locals", "HCL Syntax: Variables, Outputs, and Locals", { contentDir: "ch01/04-hcl-syntax-variables-outputs-and-locals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/hcl-syntax-variables-outputs-and-locals.mp4", durationLabel: "2 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Provisioning Real Infrastructure",
    lessons: [
      L(5, "provisioning-an-azure-resource-group-and-vnet-with-terraform", "Provisioning an Azure Resource Group and VNet with Terraform", { contentDir: "ch02/05-provisioning-an-azure-resource-group-and-vnet-with-terraform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/provisioning-an-azure-resource-group-and-vnet-with-terraform.mp4", durationLabel: "2 min 45 s" }),
      L(6, "provisioning-an-aws-vpc-with-terraform", "Provisioning an AWS VPC with Terraform", { contentDir: "ch02/06-provisioning-an-aws-vpc-with-terraform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/provisioning-an-aws-vpc-with-terraform.mp4", durationLabel: "2 min 48 s" }),
      L(7, "provisioning-compute-across-both-providers", "Provisioning Compute Across Both Providers", { contentDir: "ch02/07-provisioning-compute-across-both-providers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/provisioning-compute-across-both-providers.mp4", durationLabel: "2 min 54 s" }),
      L(8, "the-multi-provider-configuration-pattern", "The Multi-Provider Configuration Pattern", { contentDir: "ch02/08-the-multi-provider-configuration-pattern", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/the-multi-provider-configuration-pattern.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 3,
    title: "State Management",
    lessons: [
      L(9, "why-local-state-doesnt-scale-to-a-team", "Why Local State Doesn't Scale to a Team", { contentDir: "ch03/09-why-local-state-doesnt-scale-to-a-team", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/why-local-state-doesnt-scale-to-a-team.mp4", durationLabel: "2 min 19 s" }),
      L(10, "remote-state-backends-azure-storage-and-s3", "Remote State Backends: Azure Storage and S3", { contentDir: "ch03/10-remote-state-backends-azure-storage-and-s3", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/remote-state-backends-azure-storage-and-s3.mp4", durationLabel: "2 min 20 s" }),
      L(11, "state-locking-and-preventing-concurrent-apply-conflicts", "State Locking and Preventing Concurrent Apply Conflicts", { contentDir: "ch03/11-state-locking-and-preventing-concurrent-apply-conflicts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/state-locking-and-preventing-concurrent-apply-conflicts.mp4", durationLabel: "2 min 20 s" }),
      L(12, "importing-existing-infrastructure-into-terraform-state", "Importing Existing Infrastructure into Terraform State", { contentDir: "ch03/12-importing-existing-infrastructure-into-terraform-state", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/importing-existing-infrastructure-into-terraform-state.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 4,
    title: "Modules & Reusability",
    lessons: [
      L(13, "why-modules-exist-and-when-to-write-one", "Why Modules Exist and When to Write One", { contentDir: "ch04/13-why-modules-exist-and-when-to-write-one", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/why-modules-exist-and-when-to-write-one.mp4", durationLabel: "2 min 22 s" }),
      L(14, "writing-your-first-reusable-terraform-module", "Writing Your First Reusable Terraform Module", { contentDir: "ch04/14-writing-your-first-reusable-terraform-module", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/writing-your-first-reusable-terraform-module.mp4", durationLabel: "2 min 26 s" }),
      L(15, "module-versioning-and-a-private-module-registry", "Module Versioning and a Private Module Registry", { contentDir: "ch04/15-module-versioning-and-a-private-module-registry", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/module-versioning-and-a-private-module-registry.mp4", durationLabel: "2 min 26 s" }),
      L(16, "composing-multiple-modules-into-an-environment", "Composing Multiple Modules into an Environment", { contentDir: "ch04/16-composing-multiple-modules-into-an-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/composing-multiple-modules-into-an-environment.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 5,
    title: "Terraform Workspaces & Environments",
    lessons: [
      L(17, "managing-dev-staging-and-prod-with-workspaces", "Managing Dev, Staging, and Prod with Workspaces", { contentDir: "ch05/17-managing-dev-staging-and-prod-with-workspaces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/managing-dev-staging-and-prod-with-workspaces.mp4", durationLabel: "2 min 34 s" }),
      L(18, "workspaces-vs-separate-state-files-the-real-tradeoff", "Workspaces vs. Separate State Files: The Real Tradeoff", { contentDir: "ch05/18-workspaces-vs-separate-state-files-the-real-tradeoff", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/workspaces-vs-separate-state-files-the-real-tradeoff.mp4", durationLabel: "2 min 23 s" }),
      L(19, "variable-files-per-environment", "Variable Files Per Environment", { contentDir: "ch05/19-variable-files-per-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/variable-files-per-environment.mp4", durationLabel: "2 min 42 s" }),
      L(20, "terraform-cloud-and-terraform-enterprise-concepts", "Terraform Cloud and Terraform Enterprise Concepts", { contentDir: "ch05/20-terraform-cloud-and-terraform-enterprise-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/terraform-cloud-and-terraform-enterprise-concepts.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 6,
    title: "Bicep Deep Dive",
    lessons: [
      L(21, "bicep-syntax-beyond-the-first-look", "Bicep Syntax Beyond the First Look", { contentDir: "ch06/21-bicep-syntax-beyond-the-first-look", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/bicep-syntax-beyond-the-first-look.mp4", durationLabel: "2 min 51 s" }),
      L(22, "bicep-modules-and-parameter-files", "Bicep Modules and Parameter Files", { contentDir: "ch06/22-bicep-modules-and-parameter-files", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/bicep-modules-and-parameter-files.mp4", durationLabel: "2 min 50 s" }),
      L(23, "what-if-deployments-and-deployment-stacks", "What-If Deployments and Deployment Stacks", { contentDir: "ch06/23-what-if-deployments-and-deployment-stacks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/what-if-deployments-and-deployment-stacks.mp4", durationLabel: "2 min 43 s" }),
      L(24, "terraform-vs-bicep-choosing-for-a-real-project", "Terraform vs. Bicep: Choosing for a Real Project", { contentDir: "ch06/24-terraform-vs-bicep-choosing-for-a-real-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/terraform-vs-bicep-choosing-for-a-real-project.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 7,
    title: "Terraform in CI/CD",
    lessons: [
      L(25, "running-terraform-plan-in-a-pull-request", "Running terraform plan in a Pull Request", { contentDir: "ch07/25-running-terraform-plan-in-a-pull-request", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/running-terraform-plan-in-a-pull-request.mp4", durationLabel: "2 min 48 s" }),
      L(26, "requiring-approval-before-terraform-apply", "Requiring Approval Before terraform apply", { contentDir: "ch07/26-requiring-approval-before-terraform-apply", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/requiring-approval-before-terraform-apply.mp4", durationLabel: "2 min 27 s" }),
      L(27, "terraform-and-secrets-in-a-pipeline", "Terraform and Secrets in a Pipeline", { contentDir: "ch07/27-terraform-and-secrets-in-a-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/terraform-and-secrets-in-a-pipeline.mp4", durationLabel: "2 min 35 s" }),
      L(28, "drift-detection-and-keeping-state-honest", "Drift Detection and Keeping State Honest", { contentDir: "ch07/28-drift-detection-and-keeping-state-honest", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/drift-detection-and-keeping-state-honest.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: A Real Multi-Environment Terraform Project",
    lessons: [
      L(29, "lab-building-a-reusable-network-module", "Lab: Building a Reusable Network Module", { contentDir: "ch08/29-lab-building-a-reusable-network-module", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/lab-building-a-reusable-network-module.mp4", durationLabel: "2 min 44 s" }),
      L(30, "lab-deploying-dev-and-prod-from-the-same-modules", "Lab: Deploying Dev and Prod from the Same Modules", { contentDir: "ch08/30-lab-deploying-dev-and-prod-from-the-same-modules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/lab-deploying-dev-and-prod-from-the-same-modules.mp4", durationLabel: "2 min 26 s" }),
      L(31, "case-study-recovering-from-a-corrupted-state-file", "Case Study: Recovering from a Corrupted State File", { contentDir: "ch08/31-case-study-recovering-from-a-corrupted-state-file", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/case-study-recovering-from-a-corrupted-state-file.mp4", durationLabel: "2 min 28 s" }),
      L(32, "chapter-capstone-infrastructure-as-code-review", "Chapter Capstone: Infrastructure as Code Review", { contentDir: "ch08/32-chapter-capstone-infrastructure-as-code-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-terraform-iac-for-cloud-architects/chapter-capstone-infrastructure-as-code-review.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
];
