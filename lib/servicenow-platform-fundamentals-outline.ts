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
      L(1, "servicenow-as-a-platform-not-just-an-itsm-tool", "ServiceNow as a Platform, Not Just an ITSM Tool"),
      L(2, "instances-and-environments", "Instances & Environments"),
      L(3, "getting-a-personal-developer-instance", "Getting a Personal Developer Instance"),
      L(4, "the-now-platform-architecture-overview", "The Now Platform Architecture: Overview"),
    ],
  },
  {
    n: 2,
    title: "Navigation & Workspaces",
    lessons: [
      L(5, "the-application-navigator", "The Application Navigator"),
      L(6, "the-classic-ui-vs-workspaces", "The Classic UI vs. Workspaces"),
      L(7, "agent-workspace-fundamentals", "Agent Workspace Fundamentals"),
      L(8, "system-settings-and-personal-preferences", "System Settings & Personal Preferences"),
      L(9, "navigation-lab", "Navigation Lab"),
    ],
  },
  {
    n: 3,
    title: "Tables & Relationships",
    lessons: [
      L(10, "what-a-table-actually-is-in-servicenow", "What a Table Actually Is in ServiceNow"),
      L(11, "base-tables-and-table-extension", "Base Tables & Table Extension"),
      L(12, "the-task-table-hierarchy", "The Task Table Hierarchy"),
      L(13, "reference-fields-and-relationships", "Reference Fields & Relationships"),
      L(14, "tables-and-relationships-lab", "Tables & Relationships Lab"),
    ],
  },
  {
    n: 4,
    title: "Dictionary Entries & Field Types",
    lessons: [
      L(15, "the-dictionary-and-what-it-controls", "The Dictionary & What It Controls"),
      L(16, "common-field-types", "Common Field Types"),
      L(17, "choice-lists-and-their-configuration", "Choice Lists & Their Configuration"),
      L(18, "dictionary-lab", "Dictionary Lab"),
    ],
  },
  {
    n: 5,
    title: "Forms & Lists",
    lessons: [
      L(19, "form-layout-and-form-design", "Form Layout & Form Design"),
      L(20, "list-views-and-list-layout", "List Views & List Layout"),
      L(21, "filters-and-breadcrumbs", "Filters & Breadcrumbs"),
      L(22, "related-lists", "Related Lists"),
      L(23, "forms-and-lists-lab", "Forms & Lists Lab"),
    ],
  },
  {
    n: 6,
    title: "Import Sets & Transform Maps",
    lessons: [
      L(24, "import-sets-overview", "Import Sets: Overview"),
      L(25, "data-sources-and-loading-data", "Data Sources & Loading Data"),
      L(26, "transform-maps-and-field-mapping", "Transform Maps & Field Mapping"),
      L(27, "import-transform-lab", "Import/Transform Lab"),
    ],
  },
  {
    n: 7,
    title: "Reporting & Dashboards",
    lessons: [
      L(28, "building-a-report", "Building a Report"),
      L(29, "performance-analytics-overview", "Performance Analytics: Overview"),
      L(30, "building-a-dashboard", "Building a Dashboard"),
      L(31, "reporting-lab", "Reporting Lab"),
    ],
  },
  {
    n: 8,
    title: "Capstone: Platform Fundamentals in Practice",
    lessons: [
      L(32, "capstone-kickoff-explore-a-real-instance", "Capstone Kickoff: Explore a Real Instance"),
      L(33, "capstone-document-the-instances-table-structure", "Capstone: Document the Instance's Table Structure"),
      L(34, "capstone-wrap-up-and-platform-orientation-summary", "Capstone Wrap-Up & Platform Orientation Summary"),
    ],
  },
];
