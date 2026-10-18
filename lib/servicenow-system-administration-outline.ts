// ServiceNow System Administration course outline. Lessons without a contentDir render as
// "in production". Course 3 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: users, security, catalog, and notifications — the CSA exam's core territory.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-system-administration/
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

export const SERVICENOW_SYSTEM_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Users, Groups & Roles",
    lessons: [
      L(1, "creating-and-managing-users", "Creating & Managing Users", { contentDir: "ch01/01-creating-and-managing-users" }),
      L(2, "groups-and-group-membership", "Groups & Group Membership", { contentDir: "ch01/02-groups-and-group-membership" }),
      L(3, "roles-and-role-inheritance", "Roles & Role Inheritance", { contentDir: "ch01/03-roles-and-role-inheritance" }),
      L(4, "delegated-administration", "Delegated Administration", { contentDir: "ch01/04-delegated-administration" }),
      L(5, "users-groups-roles-lab", "Users, Groups & Roles Lab", { contentDir: "ch01/05-users-groups-roles-lab" }),
    ],
  },
  {
    n: 2,
    title: "Access Control Lists (ACLs)",
    lessons: [
      L(6, "how-acls-actually-evaluate-access", "How ACLs Actually Evaluate Access", { contentDir: "ch02/06-how-acls-actually-evaluate-access" }),
      L(7, "table-level-and-field-level-acls", "Table-Level & Field-Level ACLs", { contentDir: "ch02/07-table-level-and-field-level-acls" }),
      L(8, "acl-conditions-and-scripts", "ACL Conditions & Scripts", { contentDir: "ch02/08-acl-conditions-and-scripts" }),
      L(9, "troubleshooting-an-access-denied-issue", "Troubleshooting an Access-Denied Issue", { contentDir: "ch02/09-troubleshooting-an-access-denied-issue" }),
      L(10, "acl-lab", "ACL Lab", { contentDir: "ch02/10-acl-lab" }),
    ],
  },
  {
    n: 3,
    title: "Service Catalog Administration",
    lessons: [
      L(11, "catalog-items-and-categories", "Catalog Items & Categories", { contentDir: "ch03/11-catalog-items-and-categories" }),
      L(12, "variables-and-variable-sets", "Variables & Variable Sets", { contentDir: "ch03/12-variables-and-variable-sets" }),
      L(13, "catalog-ui-policies", "Catalog UI Policies", { contentDir: "ch03/13-catalog-ui-policies" }),
      L(14, "record-producers", "Record Producers", { contentDir: "ch03/14-record-producers" }),
      L(15, "service-catalog-lab", "Service Catalog Lab", { contentDir: "ch03/15-service-catalog-lab" }),
    ],
  },
  {
    n: 4,
    title: "Notifications & Email",
    lessons: [
      L(16, "notification-records-and-triggers", "Notification Records & Triggers", { contentDir: "ch04/16-notification-records-and-triggers" }),
      L(17, "email-templates", "Email Templates", { contentDir: "ch04/17-email-templates" }),
      L(18, "inbound-email-actions", "Inbound Email Actions", { contentDir: "ch04/18-inbound-email-actions" }),
      L(19, "notifications-lab", "Notifications Lab", { contentDir: "ch04/19-notifications-lab" }),
    ],
  },
  {
    n: 5,
    title: "UI Policies, Data Policies & Business Rules (Admin View)",
    lessons: [
      L(20, "ui-policies-for-form-behavior", "UI Policies for Form Behavior", { contentDir: "ch05/20-ui-policies-for-form-behavior" }),
      L(21, "data-policies-for-server-side-field-enforcement", "Data Policies for Server-Side Field Enforcement", { contentDir: "ch05/21-data-policies-for-server-side-field-enforcement" }),
      L(22, "ui-policy-vs-data-policy-when-to-use-each", "UI Policy vs. Data Policy: When to Use Each", { contentDir: "ch05/22-ui-policy-vs-data-policy-when-to-use-each" }),
      L(23, "business-rules-an-administrators-view", "Business Rules: an Administrator's View", { contentDir: "ch05/23-business-rules-an-administrators-view" }),
      L(24, "ui-and-data-policy-lab", "UI & Data Policy Lab", { contentDir: "ch05/24-ui-and-data-policy-lab" }),
    ],
  },
  {
    n: 6,
    title: "System Properties, Scheduled Jobs & Logs",
    lessons: [
      L(25, "system-properties", "System Properties", { contentDir: "ch06/25-system-properties" }),
      L(26, "scheduled-jobs", "Scheduled Jobs", { contentDir: "ch06/26-scheduled-jobs" }),
      L(27, "system-logs-and-the-system-log-application", "System Logs & the System Log Application", { contentDir: "ch06/27-system-logs-and-the-system-log-application" }),
      L(28, "scheduled-jobs-and-logs-lab", "Scheduled Jobs & Logs Lab", { contentDir: "ch06/28-scheduled-jobs-and-logs-lab" }),
    ],
  },
  {
    n: 7,
    title: "Update Sets & Change Management (Admin View)",
    lessons: [
      L(29, "what-an-update-set-actually-captures", "What an Update Set Actually Captures", { contentDir: "ch07/29-what-an-update-set-actually-captures" }),
      L(30, "creating-and-completing-an-update-set", "Creating & Completing an Update Set", { contentDir: "ch07/30-creating-and-completing-an-update-set" }),
      L(31, "moving-update-sets-between-instances", "Moving Update Sets Between Instances", { contentDir: "ch07/31-moving-update-sets-between-instances" }),
      L(32, "common-update-set-problems-and-fixes", "Common Update Set Problems & Fixes", { contentDir: "ch07/32-common-update-set-problems-and-fixes" }),
      L(33, "update-set-lab", "Update Set Lab", { contentDir: "ch07/33-update-set-lab" }),
    ],
  },
  {
    n: 8,
    title: "CSA Exam Preparation & Capstone",
    lessons: [
      L(34, "csa-exam-domain-review", "CSA Exam Domain Review", { contentDir: "ch08/34-csa-exam-domain-review" }),
      L(35, "capstone-configure-a-small-department-instance", "Capstone: Configure a Small-Department Instance", { contentDir: "ch08/35-capstone-configure-a-small-department-instance" }),
      L(36, "capstone-wrap-up-and-administration-checklist", "Capstone Wrap-Up & Administration Checklist", { contentDir: "ch08/36-capstone-wrap-up-and-administration-checklist" }),
    ],
  },
];
