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
      L(1, "the-administrator-role", "The Administrator Role", { contentDir: "ch01/01-the-administrator-role" }),
      L(2, "users-and-user-management", "Users and User Management", { contentDir: "ch01/02-users-and-user-management" }),
      L(3, "creating-and-deactivating-users", "Creating and Deactivating Users", { contentDir: "ch01/03-creating-and-deactivating-users" }),
      L(4, "licenses-and-license-types", "Licenses and License Types", { contentDir: "ch01/04-licenses-and-license-types" }),
      L(5, "profiles", "Profiles", { contentDir: "ch01/05-profiles" }),
      L(6, "permission-sets", "Permission Sets", { contentDir: "ch01/06-permission-sets" }),
      L(7, "permission-set-groups", "Permission Set Groups", { contentDir: "ch01/07-permission-set-groups" }),
      L(8, "login-access-login-hours-and-ip-restrictions", "Login Access, Login Hours and IP Restrictions", { contentDir: "ch01/08-login-access-login-hours-and-ip-restrictions" }),
      L(9, "password-policies-and-session-settings", "Password Policies and Session Settings", { contentDir: "ch01/09-password-policies-and-session-settings" }),
      L(10, "delegated-administration", "Delegated Administration", { contentDir: "ch01/10-delegated-administration" }),
    ],
  },
  {
    n: 2,
    title: "Configuring the Organization",
    lessons: [
      L(11, "organization-settings-and-company-information", "Organization Settings and Company Information", { contentDir: "ch02/11-organization-settings-and-company-information" }),
      L(12, "business-hours-and-holidays", "Business Hours and Holidays", { contentDir: "ch02/12-business-hours-and-holidays" }),
      L(13, "fiscal-year-and-currencies", "Fiscal Year and Currencies", { contentDir: "ch02/13-fiscal-year-and-currencies" }),
      L(14, "apps-and-app-manager", "Apps and App Manager", { contentDir: "ch02/14-apps-and-app-manager" }),
      L(15, "tabs-and-navigation", "Tabs and Navigation", { contentDir: "ch02/15-tabs-and-navigation" }),
      L(16, "utility-bar-and-console-apps", "Utility Bar and Console Apps", { contentDir: "ch02/16-utility-bar-and-console-apps" }),
      L(17, "lightning-pages-overview", "Lightning Pages Overview", { contentDir: "ch02/17-lightning-pages-overview" }),
    ],
  },
  {
    n: 3,
    title: "Objects and Layouts",
    lessons: [
      L(18, "page-layouts", "Page Layouts", { contentDir: "ch03/18-page-layouts" }),
      L(19, "compact-layouts", "Compact Layouts", { contentDir: "ch03/19-compact-layouts" }),
      L(20, "record-types-and-business-processes", "Record Types and Business Processes", { contentDir: "ch03/20-record-types-and-business-processes" }),
      L(21, "picklists-and-dependent-picklists", "Picklists and Dependent Picklists", { contentDir: "ch03/21-picklists-and-dependent-picklists" }),
      L(22, "global-value-sets", "Global Value Sets", { contentDir: "ch03/22-global-value-sets" }),
      L(23, "field-history-tracking", "Field History Tracking", { contentDir: "ch03/23-field-history-tracking" }),
      L(24, "list-views-and-search-layouts", "List Views and Search Layouts", { contentDir: "ch03/24-list-views-and-search-layouts" }),
      L(25, "related-lists-and-related-list-filters", "Related Lists and Related List Filters", { contentDir: "ch03/25-related-lists-and-related-list-filters" }),
    ],
  },
  {
    n: 4,
    title: "Communication and Support Features",
    lessons: [
      L(26, "email-templates-and-letterheads", "Email Templates and Letterheads", { contentDir: "ch04/26-email-templates-and-letterheads" }),
      L(27, "email-to-case-overview", "Email-to-Case Overview", { contentDir: "ch04/27-email-to-case-overview" }),
      L(28, "chatter-and-collaboration", "Chatter and Collaboration", { contentDir: "ch04/28-chatter-and-collaboration" }),
      L(29, "activity-management-settings", "Activity Management Settings", { contentDir: "ch04/29-activity-management-settings" }),
      L(30, "notifications-and-alerts", "Notifications and Alerts", { contentDir: "ch04/30-notifications-and-alerts" }),
    ],
  },
  {
    n: 5,
    title: "Administration in Practice",
    lessons: [
      L(31, "sandboxes-for-administrators", "Sandboxes for Administrators", { contentDir: "ch05/31-sandboxes-for-administrators" }),
      L(32, "change-sets-overview", "Change Sets Overview", { contentDir: "ch05/32-change-sets-overview" }),
      L(33, "release-updates-and-critical-updates", "Release Updates and Critical Updates", { contentDir: "ch05/33-release-updates-and-critical-updates" }),
      L(34, "monitoring-setup-audit-trail-and-login-history", "Monitoring: Setup Audit Trail and Login History", { contentDir: "ch05/34-monitoring-setup-audit-trail-and-login-history" }),
      L(35, "administration-best-practices-and-change-management", "Administration Best Practices and Change Management", { contentDir: "ch05/35-administration-best-practices-and-change-management" }),
      L(36, "administrator-case-study-onboarding-a-sales-team", "Administrator Case Study: Onboarding a Sales Team", { contentDir: "ch05/36-administrator-case-study-onboarding-a-sales-team" }),
    ],
  },
];
