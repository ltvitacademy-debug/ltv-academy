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
      L(1, "the-administrator-role", "The Administrator Role"),
      L(2, "users-and-user-management", "Users and User Management"),
      L(3, "creating-and-deactivating-users", "Creating and Deactivating Users"),
      L(4, "licenses-and-license-types", "Licenses and License Types"),
      L(5, "profiles", "Profiles"),
      L(6, "permission-sets", "Permission Sets"),
      L(7, "permission-set-groups", "Permission Set Groups"),
      L(8, "login-access-login-hours-and-ip-restrictions", "Login Access, Login Hours and IP Restrictions"),
      L(9, "password-policies-and-session-settings", "Password Policies and Session Settings"),
      L(10, "delegated-administration", "Delegated Administration"),
    ],
  },
  {
    n: 2,
    title: "Configuring the Organization",
    lessons: [
      L(11, "organization-settings-and-company-information", "Organization Settings and Company Information"),
      L(12, "business-hours-and-holidays", "Business Hours and Holidays"),
      L(13, "fiscal-year-and-currencies", "Fiscal Year and Currencies"),
      L(14, "apps-and-app-manager", "Apps and App Manager"),
      L(15, "tabs-and-navigation", "Tabs and Navigation"),
      L(16, "utility-bar-and-console-apps", "Utility Bar and Console Apps"),
      L(17, "lightning-pages-overview", "Lightning Pages Overview"),
    ],
  },
  {
    n: 3,
    title: "Objects and Layouts",
    lessons: [
      L(18, "page-layouts", "Page Layouts"),
      L(19, "compact-layouts", "Compact Layouts"),
      L(20, "record-types-and-business-processes", "Record Types and Business Processes"),
      L(21, "picklists-and-dependent-picklists", "Picklists and Dependent Picklists"),
      L(22, "global-value-sets", "Global Value Sets"),
      L(23, "field-history-tracking", "Field History Tracking"),
      L(24, "list-views-and-search-layouts", "List Views and Search Layouts"),
      L(25, "related-lists-and-related-list-filters", "Related Lists and Related List Filters"),
    ],
  },
  {
    n: 4,
    title: "Communication and Support Features",
    lessons: [
      L(26, "email-templates-and-letterheads", "Email Templates and Letterheads"),
      L(27, "email-to-case-overview", "Email-to-Case Overview"),
      L(28, "chatter-and-collaboration", "Chatter and Collaboration"),
      L(29, "activity-management-settings", "Activity Management Settings"),
      L(30, "notifications-and-alerts", "Notifications and Alerts"),
    ],
  },
  {
    n: 5,
    title: "Administration in Practice",
    lessons: [
      L(31, "sandboxes-for-administrators", "Sandboxes for Administrators"),
      L(32, "change-sets-overview", "Change Sets Overview"),
      L(33, "release-updates-and-critical-updates", "Release Updates and Critical Updates"),
      L(34, "monitoring-setup-audit-trail-and-login-history", "Monitoring: Setup Audit Trail and Login History"),
      L(35, "administration-best-practices-and-change-management", "Administration Best Practices and Change Management"),
      L(36, "administrator-case-study-onboarding-a-sales-team", "Administrator Case Study: Onboarding a Sales Team"),
    ],
  },
];
