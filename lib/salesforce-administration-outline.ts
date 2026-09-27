// The Salesforce Administration course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-administration/
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

export const SFTA_SALESFORCE_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Users and Access",
    lessons: [
      L(1, "users-and-user-management", "Users and User Management"),
      L(2, "licenses", "Licenses"),
      L(3, "profiles", "Profiles"),
      L(4, "permission-sets-and-permission-set-groups", "Permission Sets and Permission Set Groups"),
      L(5, "login-access-and-password-policies", "Login Access and Password Policies"),
    ],
  },
  {
    n: 2,
    title: "Configuring the Organization",
    lessons: [
      L(6, "organization-settings", "Organization Settings"),
      L(7, "apps-and-app-manager", "Apps and App Manager"),
      L(8, "tabs-and-navigation", "Tabs and Navigation"),
      L(9, "page-layouts", "Page Layouts"),
      L(10, "record-types-and-business-processes", "Record Types and Business Processes"),
      L(11, "picklists-and-dependent-picklists", "Picklists and Dependent Picklists"),
    ],
  },
  {
    n: 3,
    title: "Day-to-Day Administration",
    lessons: [
      L(12, "list-views-and-search-layouts", "List Views and Search Layouts"),
      L(13, "email-templates-and-letterheads", "Email Templates and Letterheads"),
      L(14, "administration-best-practices-and-change-management", "Administration Best Practices and Change Management"),
    ],
  },
];
