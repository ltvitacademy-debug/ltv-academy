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
      L(1, "what-is-iac-and-why", "What Is Infrastructure as Code, and Why?"),
      L(2, "terraform-vs-bicep", "Terraform vs. Bicep"),
      L(3, "installing-the-tools", "Installing the Tools"),
      L(4, "providers", "Providers"),
      L(5, "understanding-state", "Understanding State"),
    ],
  },
  {
    n: 2,
    title: "Terraform for Azure Data Resources",
    lessons: [
      L(6, "resource-blocks", "Resource Blocks"),
      L(7, "variables-and-outputs", "Variables & Outputs"),
      L(8, "provisioning-a-storage-account", "Provisioning a Storage Account"),
      L(9, "provisioning-a-fabric-capacity", "Provisioning a Fabric Capacity"),
      L(10, "provisioning-an-event-hub", "Provisioning an Event Hub"),
      L(11, "terraform-modules", "Terraform Modules"),
    ],
  },
  {
    n: 3,
    title: "Bicep for Azure Data Resources",
    lessons: [
      L(12, "bicep-syntax-basics", "Bicep Syntax Basics"),
      L(13, "bicep-parameters-and-variables", "Parameters & Variables in Bicep"),
      L(14, "deploying-a-resource-group", "Deploying a Resource Group"),
      L(15, "deploying-azure-sql", "Deploying Azure SQL With Bicep"),
      L(16, "arm-vs-bicep", "ARM Templates vs. Bicep"),
    ],
  },
  {
    n: 4,
    title: "IaC in Practice",
    lessons: [
      L(17, "state-management-and-remote-state", "State Management & Remote State"),
      L(18, "the-plan-apply-workflow", "The Plan → Apply Workflow"),
      L(19, "importing-existing-resources", "Importing Existing Resources"),
      L(20, "iac-in-ci-cd", "IaC in CI/CD"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: Provisioning a Data Platform's Infrastructure"),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
