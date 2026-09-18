// The full Terraform/Bicep for Data Engineers course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes familiarity with Azure resources from earlier
// courses (Fabric, Databricks, Azure SQL) — this course teaches provisioning
// them as code, not what the resources themselves are.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/terraform-bicep/
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

export const TERRAFORM_BICEP_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Infrastructure as Code Fundamentals",
    lessons: [
      L(1, "what-is-iac-and-why", "What Is Infrastructure as Code, and Why?", {
        contentDir: "ch01/01-what-is-iac-and-why",
        // videoUrl/durationLabel pending
      }),
      L(2, "terraform-vs-bicep", "Terraform vs. Bicep", {
        contentDir: "ch01/02-terraform-vs-bicep",
        // videoUrl/durationLabel pending
      }),
      L(3, "installing-the-tools", "Installing the Tools", {
        contentDir: "ch01/03-installing-the-tools",
        // videoUrl/durationLabel pending
      }),
      L(4, "providers", "Providers", {
        contentDir: "ch01/04-providers",
        // videoUrl/durationLabel pending
      }),
      L(5, "understanding-state", "Understanding State", {
        contentDir: "ch01/05-understanding-state",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "Terraform for Azure Data Resources",
    lessons: [
      L(6, "resource-blocks", "Resource Blocks", {
        contentDir: "ch02/06-resource-blocks",
        // videoUrl/durationLabel pending
      }),
      L(7, "variables-and-outputs", "Variables & Outputs", {
        contentDir: "ch02/07-variables-and-outputs",
        // videoUrl/durationLabel pending
      }),
      L(8, "provisioning-a-storage-account", "Provisioning a Storage Account", {
        contentDir: "ch02/08-provisioning-a-storage-account",
        // videoUrl/durationLabel pending
      }),
      L(9, "provisioning-a-fabric-capacity", "Provisioning a Fabric Capacity", {
        contentDir: "ch02/09-provisioning-a-fabric-capacity",
        // videoUrl/durationLabel pending
      }),
      L(10, "provisioning-an-event-hub", "Provisioning an Event Hub", {
        contentDir: "ch02/10-provisioning-an-event-hub",
        // videoUrl/durationLabel pending
      }),
      L(11, "terraform-modules", "Terraform Modules", {
        contentDir: "ch02/11-terraform-modules",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "Bicep for Azure Data Resources",
    lessons: [
      L(12, "bicep-syntax-basics", "Bicep Syntax Basics", {
        contentDir: "ch03/12-bicep-syntax-basics",
        // videoUrl/durationLabel pending
      }),
      L(13, "bicep-parameters-and-variables", "Parameters & Variables in Bicep", {
        contentDir: "ch03/13-bicep-parameters-and-variables",
        // videoUrl/durationLabel pending
      }),
      L(14, "deploying-a-resource-group", "Deploying a Resource Group", {
        contentDir: "ch03/14-deploying-a-resource-group",
        // videoUrl/durationLabel pending
      }),
      L(15, "deploying-azure-sql", "Deploying Azure SQL With Bicep", {
        contentDir: "ch03/15-deploying-azure-sql",
        // videoUrl/durationLabel pending
      }),
      L(16, "arm-vs-bicep", "ARM Templates vs. Bicep", {
        contentDir: "ch03/16-arm-vs-bicep",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "IaC in Practice",
    lessons: [
      L(17, "state-management-and-remote-state", "State Management & Remote State", {
        contentDir: "ch04/17-state-management-and-remote-state",
        // videoUrl/durationLabel pending
      }),
      L(18, "the-plan-apply-workflow", "The Plan → Apply Workflow", {
        contentDir: "ch04/18-the-plan-apply-workflow",
        // videoUrl/durationLabel pending
      }),
      L(19, "importing-existing-resources", "Importing Existing Resources", {
        contentDir: "ch04/19-importing-existing-resources",
        // videoUrl/durationLabel pending
      }),
      L(20, "iac-in-ci-cd", "IaC in CI/CD", {
        contentDir: "ch04/20-iac-in-ci-cd",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: Provisioning a Data Platform's Infrastructure", {
        contentDir: "ch05/21-capstone-project",
        // videoUrl/durationLabel pending
      }),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch05/22-capstone-wrap-up",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
