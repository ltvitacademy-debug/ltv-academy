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
      L(1, "servicenow-as-a-platform-not-just-an-itsm-tool", "ServiceNow as a Platform, Not Just an ITSM Tool", { contentDir: "ch01/01-servicenow-as-a-platform-not-just-an-itsm-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700010/ltv-servicenow-platform-fundamentals/servicenow-as-a-platform-not-just-an-itsm-tool.mp4", durationLabel: "2 min 36 s" }),
      L(2, "instances-and-environments", "Instances & Environments", { contentDir: "ch01/02-instances-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700107/ltv-servicenow-platform-fundamentals/instances-and-environments.mp4", durationLabel: "2 min 51 s" }),
      L(3, "getting-a-personal-developer-instance", "Getting a Personal Developer Instance", { contentDir: "ch01/03-getting-a-personal-developer-instance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700219/ltv-servicenow-platform-fundamentals/getting-a-personal-developer-instance.mp4", durationLabel: "2 min 39 s" }),
      L(4, "the-now-platform-architecture-overview", "The Now Platform Architecture: Overview", { contentDir: "ch01/04-the-now-platform-architecture-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700350/ltv-servicenow-platform-fundamentals/the-now-platform-architecture-overview.mp4", durationLabel: "2 min 51 s" }),
    ],
  },
  {
    n: 2,
    title: "Navigation & Workspaces",
    lessons: [
      L(5, "the-application-navigator", "The Application Navigator", { contentDir: "ch02/05-the-application-navigator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700427/ltv-servicenow-platform-fundamentals/the-application-navigator.mp4", durationLabel: "2 min 13 s" }),
      L(6, "the-classic-ui-vs-workspaces", "The Classic UI vs. Workspaces", { contentDir: "ch02/06-the-classic-ui-vs-workspaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700496/ltv-servicenow-platform-fundamentals/the-classic-ui-vs-workspaces.mp4", durationLabel: "2 min 4 s" }),
      L(7, "agent-workspace-fundamentals", "Agent Workspace Fundamentals", { contentDir: "ch02/07-agent-workspace-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700567/ltv-servicenow-platform-fundamentals/agent-workspace-fundamentals.mp4", durationLabel: "2 min 4 s" }),
      L(8, "system-settings-and-personal-preferences", "System Settings & Personal Preferences", { contentDir: "ch02/08-system-settings-and-personal-preferences", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700636/ltv-servicenow-platform-fundamentals/system-settings-and-personal-preferences.mp4", durationLabel: "2 min 5 s" }),
      L(9, "navigation-lab", "Navigation Lab", { contentDir: "ch02/09-navigation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700696/ltv-servicenow-platform-fundamentals/navigation-lab.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 3,
    title: "Tables & Relationships",
    lessons: [
      L(10, "what-a-table-actually-is-in-servicenow", "What a Table Actually Is in ServiceNow", { contentDir: "ch03/10-what-a-table-actually-is-in-servicenow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700789/ltv-servicenow-platform-fundamentals/what-a-table-actually-is-in-servicenow.mp4", durationLabel: "2 min 47 s" }),
      L(11, "base-tables-and-table-extension", "Base Tables & Table Extension", { contentDir: "ch03/11-base-tables-and-table-extension", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700878/ltv-servicenow-platform-fundamentals/base-tables-and-table-extension.mp4", durationLabel: "2 min 48 s" }),
      L(12, "the-task-table-hierarchy", "The Task Table Hierarchy", { contentDir: "ch03/12-the-task-table-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792700959/ltv-servicenow-platform-fundamentals/the-task-table-hierarchy.mp4", durationLabel: "2 min 33 s" }),
      L(13, "reference-fields-and-relationships", "Reference Fields & Relationships", { contentDir: "ch03/13-reference-fields-and-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701042/ltv-servicenow-platform-fundamentals/reference-fields-and-relationships.mp4", durationLabel: "2 min 38 s" }),
      L(14, "tables-and-relationships-lab", "Tables & Relationships Lab", { contentDir: "ch03/14-tables-and-relationships-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701123/ltv-servicenow-platform-fundamentals/tables-and-relationships-lab.mp4", durationLabel: "2 min 39 s" }),
    ],
  },
  {
    n: 4,
    title: "Dictionary Entries & Field Types",
    lessons: [
      L(15, "the-dictionary-and-what-it-controls", "The Dictionary & What It Controls", { contentDir: "ch04/15-the-dictionary-and-what-it-controls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701212/ltv-servicenow-platform-fundamentals/the-dictionary-and-what-it-controls.mp4", durationLabel: "2 min 50 s" }),
      L(16, "common-field-types", "Common Field Types", { contentDir: "ch04/16-common-field-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701304/ltv-servicenow-platform-fundamentals/common-field-types.mp4", durationLabel: "2 min 55 s" }),
      L(17, "choice-lists-and-their-configuration", "Choice Lists & Their Configuration", { contentDir: "ch04/17-choice-lists-and-their-configuration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701406/ltv-servicenow-platform-fundamentals/choice-lists-and-their-configuration.mp4", durationLabel: "2 min 54 s" }),
      L(18, "dictionary-lab", "Dictionary Lab", { contentDir: "ch04/18-dictionary-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701499/ltv-servicenow-platform-fundamentals/dictionary-lab.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "Forms & Lists",
    lessons: [
      L(19, "form-layout-and-form-design", "Form Layout & Form Design", { contentDir: "ch05/19-form-layout-and-form-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701600/ltv-servicenow-platform-fundamentals/form-layout-and-form-design.mp4", durationLabel: "2 min 54 s" }),
      L(20, "list-views-and-list-layout", "List Views & List Layout", { contentDir: "ch05/20-list-views-and-list-layout", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701675/ltv-servicenow-platform-fundamentals/list-views-and-list-layout.mp4", durationLabel: "2 min 20 s" }),
      L(21, "filters-and-breadcrumbs", "Filters & Breadcrumbs", { contentDir: "ch05/21-filters-and-breadcrumbs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702706/ltv-servicenow-platform-fundamentals/filters-and-breadcrumbs.mp4", durationLabel: "2 min 11 s" }),
      L(22, "related-lists", "Related Lists", { contentDir: "ch05/22-related-lists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702785/ltv-servicenow-platform-fundamentals/related-lists.mp4", durationLabel: "2 min 22 s" }),
      L(23, "forms-and-lists-lab", "Forms & Lists Lab", { contentDir: "ch05/23-forms-and-lists-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701783/ltv-servicenow-platform-fundamentals/forms-and-lists-lab.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 6,
    title: "Import Sets & Transform Maps",
    lessons: [
      L(24, "import-sets-overview", "Import Sets: Overview", { contentDir: "ch06/24-import-sets-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701853/ltv-servicenow-platform-fundamentals/import-sets-overview.mp4", durationLabel: "2 min 9 s" }),
      L(25, "data-sources-and-loading-data", "Data Sources & Loading Data", { contentDir: "ch06/25-data-sources-and-loading-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701920/ltv-servicenow-platform-fundamentals/data-sources-and-loading-data.mp4", durationLabel: "2 min 5 s" }),
      L(26, "transform-maps-and-field-mapping", "Transform Maps & Field Mapping", { contentDir: "ch06/26-transform-maps-and-field-mapping", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792701996/ltv-servicenow-platform-fundamentals/transform-maps-and-field-mapping.mp4", durationLabel: "2 min 20 s" }),
      L(27, "import-transform-lab", "Import/Transform Lab", { contentDir: "ch06/27-import-transform-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702083/ltv-servicenow-platform-fundamentals/import-transform-lab.mp4", durationLabel: "2 min 35 s" }),
    ],
  },
  {
    n: 7,
    title: "Reporting & Dashboards",
    lessons: [
      L(28, "building-a-report", "Building a Report", { contentDir: "ch07/28-building-a-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702157/ltv-servicenow-platform-fundamentals/building-a-report.mp4", durationLabel: "2 min 9 s" }),
      L(29, "performance-analytics-overview", "Performance Analytics: Overview", { contentDir: "ch07/29-performance-analytics-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702233/ltv-servicenow-platform-fundamentals/performance-analytics-overview.mp4", durationLabel: "2 min 10 s" }),
      L(30, "building-a-dashboard", "Building a Dashboard", { contentDir: "ch07/30-building-a-dashboard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702308/ltv-servicenow-platform-fundamentals/building-a-dashboard.mp4", durationLabel: "2 min 10 s" }),
      L(31, "reporting-lab", "Reporting Lab", { contentDir: "ch07/31-reporting-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702386/ltv-servicenow-platform-fundamentals/reporting-lab.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Platform Fundamentals in Practice",
    lessons: [
      L(32, "capstone-kickoff-explore-a-real-instance", "Capstone Kickoff: Explore a Real Instance", { contentDir: "ch08/32-capstone-kickoff-explore-a-real-instance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702467/ltv-servicenow-platform-fundamentals/capstone-kickoff-explore-a-real-instance.mp4", durationLabel: "2 min 19 s" }),
      L(33, "capstone-document-the-instances-table-structure", "Capstone: Document the Instance's Table Structure", { contentDir: "ch08/33-capstone-document-the-instances-table-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702542/ltv-servicenow-platform-fundamentals/capstone-document-the-instances-table-structure.mp4", durationLabel: "2 min 6 s" }),
      L(34, "capstone-wrap-up-and-platform-orientation-summary", "Capstone Wrap-Up & Platform Orientation Summary", { contentDir: "ch08/34-capstone-wrap-up-and-platform-orientation-summary", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792702612/ltv-servicenow-platform-fundamentals/capstone-wrap-up-and-platform-orientation-summary.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
];
