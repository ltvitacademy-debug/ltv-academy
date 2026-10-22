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
      L(1, "the-administrator-role", "The Administrator Role", { contentDir: "ch01/01-the-administrator-role", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600493/ltv-salesforce-administration/the-administrator-role.mp4", durationLabel: "2 min 8 s" }),
      L(2, "users-and-user-management", "Users and User Management", { contentDir: "ch01/02-users-and-user-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601019/ltv-salesforce-administration/users-and-user-management.mp4", durationLabel: "1 min 54 s" }),
      L(3, "creating-and-deactivating-users", "Creating and Deactivating Users", { contentDir: "ch01/03-creating-and-deactivating-users", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601581/ltv-salesforce-administration/creating-and-deactivating-users.mp4", durationLabel: "1 min 59 s" }),
      L(4, "licenses-and-license-types", "Licenses and License Types", { contentDir: "ch01/04-licenses-and-license-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602063/ltv-salesforce-administration/licenses-and-license-types.mp4", durationLabel: "1 min 53 s" }),
      L(5, "profiles", "Profiles", { contentDir: "ch01/05-profiles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602539/ltv-salesforce-administration/profiles.mp4", durationLabel: "1 min 51 s" }),
      L(6, "permission-sets", "Permission Sets", { contentDir: "ch01/06-permission-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603158/ltv-salesforce-administration/permission-sets.mp4", durationLabel: "2 min 7 s" }),
      L(7, "permission-set-groups", "Permission Set Groups", { contentDir: "ch01/07-permission-set-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603729/ltv-salesforce-administration/permission-set-groups.mp4", durationLabel: "2 min 2 s" }),
      L(8, "login-access-login-hours-and-ip-restrictions", "Login Access, Login Hours and IP Restrictions", { contentDir: "ch01/08-login-access-login-hours-and-ip-restrictions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604350/ltv-salesforce-administration/login-access-login-hours-and-ip-restrictions.mp4", durationLabel: "2 min 11 s" }),
      L(9, "password-policies-and-session-settings", "Password Policies and Session Settings", { contentDir: "ch01/09-password-policies-and-session-settings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604907/ltv-salesforce-administration/password-policies-and-session-settings.mp4", durationLabel: "2 min 2 s" }),
      L(10, "delegated-administration", "Delegated Administration", { contentDir: "ch01/10-delegated-administration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605376/ltv-salesforce-administration/delegated-administration.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Configuring the Organization",
    lessons: [
      L(11, "organization-settings-and-company-information", "Organization Settings and Company Information", { contentDir: "ch02/11-organization-settings-and-company-information", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605894/ltv-salesforce-administration/organization-settings-and-company-information.mp4", durationLabel: "1 min 44 s" }),
      L(12, "business-hours-and-holidays", "Business Hours and Holidays", { contentDir: "ch02/12-business-hours-and-holidays", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606333/ltv-salesforce-administration/business-hours-and-holidays.mp4", durationLabel: "1 min 41 s" }),
      L(13, "fiscal-year-and-currencies", "Fiscal Year and Currencies", { contentDir: "ch02/13-fiscal-year-and-currencies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606741/ltv-salesforce-administration/fiscal-year-and-currencies.mp4", durationLabel: "1 min 33 s" }),
      L(14, "apps-and-app-manager", "Apps and App Manager", { contentDir: "ch02/14-apps-and-app-manager", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607190/ltv-salesforce-administration/apps-and-app-manager.mp4", durationLabel: "1 min 36 s" }),
      L(15, "tabs-and-navigation", "Tabs and Navigation", { contentDir: "ch02/15-tabs-and-navigation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607627/ltv-salesforce-administration/tabs-and-navigation.mp4", durationLabel: "1 min 35 s" }),
      L(16, "utility-bar-and-console-apps", "Utility Bar and Console Apps", { contentDir: "ch02/16-utility-bar-and-console-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608043/ltv-salesforce-administration/utility-bar-and-console-apps.mp4", durationLabel: "1 min 36 s" }),
      L(17, "lightning-pages-overview", "Lightning Pages Overview", { contentDir: "ch02/17-lightning-pages-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608405/ltv-salesforce-administration/lightning-pages-overview.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Objects and Layouts",
    lessons: [
      L(18, "page-layouts", "Page Layouts", { contentDir: "ch03/18-page-layouts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608856/ltv-salesforce-administration/page-layouts.mp4", durationLabel: "1 min 36 s" }),
      L(19, "compact-layouts", "Compact Layouts", { contentDir: "ch03/19-compact-layouts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609295/ltv-salesforce-administration/compact-layouts.mp4", durationLabel: "1 min 33 s" }),
      L(20, "record-types-and-business-processes", "Record Types and Business Processes", { contentDir: "ch03/20-record-types-and-business-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609734/ltv-salesforce-administration/record-types-and-business-processes.mp4", durationLabel: "1 min 36 s" }),
      L(21, "picklists-and-dependent-picklists", "Picklists and Dependent Picklists", { contentDir: "ch03/21-picklists-and-dependent-picklists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610209/ltv-salesforce-administration/picklists-and-dependent-picklists.mp4", durationLabel: "1 min 38 s" }),
      L(22, "global-value-sets", "Global Value Sets", { contentDir: "ch03/22-global-value-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610603/ltv-salesforce-administration/global-value-sets.mp4", durationLabel: "1 min 39 s" }),
      L(23, "field-history-tracking", "Field History Tracking", { contentDir: "ch03/23-field-history-tracking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611062/ltv-salesforce-administration/field-history-tracking.mp4", durationLabel: "1 min 29 s" }),
      L(24, "list-views-and-search-layouts", "List Views and Search Layouts", { contentDir: "ch03/24-list-views-and-search-layouts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611691/ltv-salesforce-administration/list-views-and-search-layouts.mp4", durationLabel: "1 min 37 s" }),
      L(25, "related-lists-and-related-list-filters", "Related Lists and Related List Filters", { contentDir: "ch03/25-related-lists-and-related-list-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612235/ltv-salesforce-administration/related-lists-and-related-list-filters.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 4,
    title: "Communication and Support Features",
    lessons: [
      L(26, "email-templates-and-letterheads", "Email Templates and Letterheads", { contentDir: "ch04/26-email-templates-and-letterheads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636575/ltv-salesforce-administration/email-templates-and-letterheads.mp4", durationLabel: "1 min 38 s" }),
      L(27, "email-to-case-overview", "Email-to-Case Overview", { contentDir: "ch04/27-email-to-case-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636641/ltv-salesforce-administration/email-to-case-overview.mp4", durationLabel: "1 min 44 s" }),
      L(28, "chatter-and-collaboration", "Chatter and Collaboration", { contentDir: "ch04/28-chatter-and-collaboration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636714/ltv-salesforce-administration/chatter-and-collaboration.mp4", durationLabel: "1 min 47 s" }),
      L(29, "activity-management-settings", "Activity Management Settings", { contentDir: "ch04/29-activity-management-settings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636781/ltv-salesforce-administration/activity-management-settings.mp4", durationLabel: "1 min 48 s" }),
      L(30, "notifications-and-alerts", "Notifications and Alerts", { contentDir: "ch04/30-notifications-and-alerts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636845/ltv-salesforce-administration/notifications-and-alerts.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 5,
    title: "Administration in Practice",
    lessons: [
      L(31, "sandboxes-for-administrators", "Sandboxes for Administrators", { contentDir: "ch05/31-sandboxes-for-administrators", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636920/ltv-salesforce-administration/sandboxes-for-administrators.mp4", durationLabel: "2 min 11 s" }),
      L(32, "change-sets-overview", "Change Sets Overview", { contentDir: "ch05/32-change-sets-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792636983/ltv-salesforce-administration/change-sets-overview.mp4", durationLabel: "1 min 40 s" }),
      L(33, "release-updates-and-critical-updates", "Release Updates and Critical Updates", { contentDir: "ch05/33-release-updates-and-critical-updates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612703/ltv-salesforce-administration/release-updates-and-critical-updates.mp4", durationLabel: "1 min 11 s" }),
      L(34, "monitoring-setup-audit-trail-and-login-history", "Monitoring: Setup Audit Trail and Login History", { contentDir: "ch05/34-monitoring-setup-audit-trail-and-login-history", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613150/ltv-salesforce-administration/monitoring-setup-audit-trail-and-login-history.mp4", durationLabel: "1 min 31 s" }),
      L(35, "administration-best-practices-and-change-management", "Administration Best Practices and Change Management", { contentDir: "ch05/35-administration-best-practices-and-change-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613569/ltv-salesforce-administration/administration-best-practices-and-change-management.mp4", durationLabel: "1 min 29 s" }),
      L(36, "administrator-case-study-onboarding-a-sales-team", "Administrator Case Study: Onboarding a Sales Team", { contentDir: "ch05/36-administrator-case-study-onboarding-a-sales-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613982/ltv-salesforce-administration/administrator-case-study-onboarding-a-sales-team.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
