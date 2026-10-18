// ServiceNow Platform Fundamentals course outline. Lessons without a contentDir render as
// "in production". Course 2 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: navigation, data model, and the platform concepts every later course assumes.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-platform-fundamentals/
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

export const SERVICENOW_PLATFORM_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What ServiceNow Actually Is",
    lessons: [
      L(1, "servicenow-as-a-platform-not-just-an-itsm-tool", "ServiceNow as a Platform, Not Just an ITSM Tool", { contentDir: "ch01/01-servicenow-as-a-platform-not-just-an-itsm-tool" }),
      L(2, "instances-and-environments", "Instances & Environments", { contentDir: "ch01/02-instances-and-environments" }),
      L(3, "getting-a-personal-developer-instance", "Getting a Personal Developer Instance", { contentDir: "ch01/03-getting-a-personal-developer-instance" }),
      L(4, "the-now-platform-architecture-overview", "The Now Platform Architecture: Overview", { contentDir: "ch01/04-the-now-platform-architecture-overview" }),
    ],
  },
  {
    n: 2,
    title: "Navigation & Workspaces",
    lessons: [
      L(5, "the-application-navigator", "The Application Navigator", { contentDir: "ch02/05-the-application-navigator" }),
      L(6, "the-classic-ui-vs-workspaces", "The Classic UI vs. Workspaces", { contentDir: "ch02/06-the-classic-ui-vs-workspaces" }),
      L(7, "agent-workspace-fundamentals", "Agent Workspace Fundamentals", { contentDir: "ch02/07-agent-workspace-fundamentals" }),
      L(8, "system-settings-and-personal-preferences", "System Settings & Personal Preferences", { contentDir: "ch02/08-system-settings-and-personal-preferences" }),
      L(9, "navigation-lab", "Navigation Lab", { contentDir: "ch02/09-navigation-lab" }),
    ],
  },
  {
    n: 3,
    title: "Tables & Relationships",
    lessons: [
      L(10, "what-a-table-actually-is-in-servicenow", "What a Table Actually Is in ServiceNow", { contentDir: "ch03/10-what-a-table-actually-is-in-servicenow" }),
      L(11, "base-tables-and-table-extension", "Base Tables & Table Extension", { contentDir: "ch03/11-base-tables-and-table-extension" }),
      L(12, "the-task-table-hierarchy", "The Task Table Hierarchy", { contentDir: "ch03/12-the-task-table-hierarchy" }),
      L(13, "reference-fields-and-relationships", "Reference Fields & Relationships", { contentDir: "ch03/13-reference-fields-and-relationships" }),
      L(14, "tables-and-relationships-lab", "Tables & Relationships Lab", { contentDir: "ch03/14-tables-and-relationships-lab" }),
    ],
  },
  {
    n: 4,
    title: "Dictionary Entries & Field Types",
    lessons: [
      L(15, "the-dictionary-and-what-it-controls", "The Dictionary & What It Controls", { contentDir: "ch04/15-the-dictionary-and-what-it-controls" }),
      L(16, "common-field-types", "Common Field Types", { contentDir: "ch04/16-common-field-types" }),
      L(17, "choice-lists-and-their-configuration", "Choice Lists & Their Configuration", { contentDir: "ch04/17-choice-lists-and-their-configuration" }),
      L(18, "dictionary-lab", "Dictionary Lab", { contentDir: "ch04/18-dictionary-lab" }),
    ],
  },
  {
    n: 5,
    title: "Forms & Lists",
    lessons: [
      L(19, "form-layout-and-form-design", "Form Layout & Form Design", { contentDir: "ch05/19-form-layout-and-form-design" }),
      L(20, "list-views-and-list-layout", "List Views & List Layout", { contentDir: "ch05/20-list-views-and-list-layout" }),
      L(21, "filters-and-breadcrumbs", "Filters & Breadcrumbs", { contentDir: "ch05/21-filters-and-breadcrumbs" }),
      L(22, "related-lists", "Related Lists", { contentDir: "ch05/22-related-lists" }),
      L(23, "forms-and-lists-lab", "Forms & Lists Lab", { contentDir: "ch05/23-forms-and-lists-lab" }),
    ],
  },
  {
    n: 6,
    title: "Import Sets & Transform Maps",
    lessons: [
      L(24, "import-sets-overview", "Import Sets: Overview", { contentDir: "ch06/24-import-sets-overview" }),
      L(25, "data-sources-and-loading-data", "Data Sources & Loading Data", { contentDir: "ch06/25-data-sources-and-loading-data" }),
      L(26, "transform-maps-and-field-mapping", "Transform Maps & Field Mapping", { contentDir: "ch06/26-transform-maps-and-field-mapping" }),
      L(27, "import-transform-lab", "Import/Transform Lab", { contentDir: "ch06/27-import-transform-lab" }),
    ],
  },
  {
    n: 7,
    title: "Reporting & Dashboards",
    lessons: [
      L(28, "building-a-report", "Building a Report", { contentDir: "ch07/28-building-a-report" }),
      L(29, "performance-analytics-overview", "Performance Analytics: Overview", { contentDir: "ch07/29-performance-analytics-overview" }),
      L(30, "building-a-dashboard", "Building a Dashboard", { contentDir: "ch07/30-building-a-dashboard" }),
      L(31, "reporting-lab", "Reporting Lab", { contentDir: "ch07/31-reporting-lab" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Platform Fundamentals in Practice",
    lessons: [
      L(32, "capstone-kickoff-explore-a-real-instance", "Capstone Kickoff: Explore a Real Instance", { contentDir: "ch08/32-capstone-kickoff-explore-a-real-instance" }),
      L(33, "capstone-document-the-instances-table-structure", "Capstone: Document the Instance's Table Structure", { contentDir: "ch08/33-capstone-document-the-instances-table-structure" }),
      L(34, "capstone-wrap-up-and-platform-orientation-summary", "Capstone Wrap-Up & Platform Orientation Summary", { contentDir: "ch08/34-capstone-wrap-up-and-platform-orientation-summary" }),
    ],
  },
];
