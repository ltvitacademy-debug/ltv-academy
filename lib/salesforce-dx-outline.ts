// The Salesforce DX course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-dx/
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

export const SFTA_SALESFORCE_DX_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Salesforce DX Basics",
    lessons: [
      L(1, "what-salesforce-dx-is", "What Salesforce DX Is", { contentDir: "ch01/01-what-salesforce-dx-is" }),
      L(2, "installing-the-salesforce-cli", "Installing the Salesforce CLI", { contentDir: "ch01/02-installing-the-salesforce-cli" }),
      L(3, "source-driven-development", "Source-Driven Development", { contentDir: "ch01/03-source-driven-development" }),
      L(4, "dev-hub", "Dev Hub", { contentDir: "ch01/04-dev-hub" }),
      L(5, "scratch-orgs", "Scratch Orgs", { contentDir: "ch01/05-scratch-orgs" }),
      L(6, "scratch-org-definition-files", "Scratch Org Definition Files", { contentDir: "ch01/06-scratch-org-definition-files" }),
    ],
  },
  {
    n: 2,
    title: "Projects and Metadata",
    lessons: [
      L(7, "project-structure", "Project Structure", { contentDir: "ch02/07-project-structure" }),
      L(8, "sfdx-project-json", "sfdx-project.json", { contentDir: "ch02/08-sfdx-project-json" }),
      L(9, "metadata-api-and-metadata-types", "Metadata API and Metadata Types", { contentDir: "ch02/09-metadata-api-and-metadata-types" }),
      L(10, "retrieving-and-deploying-source", "Retrieving and Deploying Source", { contentDir: "ch02/10-retrieving-and-deploying-source" }),
      L(11, "working-in-vs-code-and-salesforce-extensions", "Working in VS Code and Salesforce Extensions", { contentDir: "ch02/11-working-in-vs-code-and-salesforce-extensions" }),
      L(12, "source-tracking", "Source Tracking", { contentDir: "ch02/12-source-tracking" }),
    ],
  },
  {
    n: 3,
    title: "Packaging and Workflows",
    lessons: [
      L(13, "unlocked-packages", "Unlocked Packages", { contentDir: "ch03/13-unlocked-packages" }),
      L(14, "second-generation-managed-packages-overview", "Second-Generation Managed Packages Overview", { contentDir: "ch03/14-second-generation-managed-packages-overview" }),
      L(15, "package-versioning", "Package Versioning", { contentDir: "ch03/15-package-versioning" }),
      L(16, "namespaces", "Namespaces", { contentDir: "ch03/16-namespaces" }),
      L(17, "org-shapes-and-org-snapshots-overview", "Org Shapes and Org Snapshots Overview", { contentDir: "ch03/17-org-shapes-and-org-snapshots-overview" }),
      L(18, "managing-scratch-org-data", "Managing Scratch Org Data", { contentDir: "ch03/18-managing-scratch-org-data" }),
    ],
  },
  {
    n: 4,
    title: "Practice",
    lessons: [
      L(19, "dx-practice-lab-create-a-project", "DX Practice Lab: Create a Project", { contentDir: "ch04/19-dx-practice-lab-create-a-project" }),
      L(20, "dx-practice-lab-deploy-to-a-scratch-org", "DX Practice Lab: Deploy to a Scratch Org", { contentDir: "ch04/20-dx-practice-lab-deploy-to-a-scratch-org" }),
      L(21, "dx-troubleshooting", "DX Troubleshooting", { contentDir: "ch04/21-dx-troubleshooting" }),
      L(22, "dx-best-practices", "DX Best Practices", { contentDir: "ch04/22-dx-best-practices" }),
    ],
  },
];
