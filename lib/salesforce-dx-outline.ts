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
      L(1, "what-salesforce-dx-is", "What Salesforce DX Is"),
      L(2, "installing-the-salesforce-cli", "Installing the Salesforce CLI"),
      L(3, "source-driven-development", "Source-Driven Development"),
      L(4, "dev-hub", "Dev Hub"),
      L(5, "scratch-orgs", "Scratch Orgs"),
      L(6, "scratch-org-definition-files", "Scratch Org Definition Files"),
    ],
  },
  {
    n: 2,
    title: "Projects and Metadata",
    lessons: [
      L(7, "project-structure", "Project Structure"),
      L(8, "sfdx-project-json", "sfdx-project.json"),
      L(9, "metadata-api-and-metadata-types", "Metadata API and Metadata Types"),
      L(10, "retrieving-and-deploying-source", "Retrieving and Deploying Source"),
      L(11, "working-in-vs-code-and-salesforce-extensions", "Working in VS Code and Salesforce Extensions"),
      L(12, "source-tracking", "Source Tracking"),
    ],
  },
  {
    n: 3,
    title: "Packaging and Workflows",
    lessons: [
      L(13, "unlocked-packages", "Unlocked Packages"),
      L(14, "second-generation-managed-packages-overview", "Second-Generation Managed Packages Overview"),
      L(15, "package-versioning", "Package Versioning"),
      L(16, "namespaces", "Namespaces"),
      L(17, "org-shapes-and-org-snapshots-overview", "Org Shapes and Org Snapshots Overview"),
      L(18, "managing-scratch-org-data", "Managing Scratch Org Data"),
    ],
  },
  {
    n: 4,
    title: "Practice",
    lessons: [
      L(19, "dx-practice-lab-create-a-project", "DX Practice Lab: Create a Project"),
      L(20, "dx-practice-lab-deploy-to-a-scratch-org", "DX Practice Lab: Deploy to a Scratch Org"),
      L(21, "dx-troubleshooting", "DX Troubleshooting"),
      L(22, "dx-best-practices", "DX Best Practices"),
    ],
  },
];
