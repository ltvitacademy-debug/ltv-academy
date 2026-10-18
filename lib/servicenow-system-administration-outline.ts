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
      L(1, "creating-and-managing-users", "Creating & Managing Users"),
      L(2, "groups-and-group-membership", "Groups & Group Membership"),
      L(3, "roles-and-role-inheritance", "Roles & Role Inheritance"),
      L(4, "delegated-administration", "Delegated Administration"),
      L(5, "users-groups-roles-lab", "Users, Groups & Roles Lab"),
    ],
  },
  {
    n: 2,
    title: "Access Control Lists (ACLs)",
    lessons: [
      L(6, "how-acls-actually-evaluate-access", "How ACLs Actually Evaluate Access"),
      L(7, "table-level-and-field-level-acls", "Table-Level & Field-Level ACLs"),
      L(8, "acl-conditions-and-scripts", "ACL Conditions & Scripts"),
      L(9, "troubleshooting-an-access-denied-issue", "Troubleshooting an Access-Denied Issue"),
      L(10, "acl-lab", "ACL Lab"),
    ],
  },
  {
    n: 3,
    title: "Service Catalog Administration",
    lessons: [
      L(11, "catalog-items-and-categories", "Catalog Items & Categories"),
      L(12, "variables-and-variable-sets", "Variables & Variable Sets"),
      L(13, "catalog-ui-policies", "Catalog UI Policies"),
      L(14, "record-producers", "Record Producers"),
      L(15, "service-catalog-lab", "Service Catalog Lab"),
    ],
  },
  {
    n: 4,
    title: "Notifications & Email",
    lessons: [
      L(16, "notification-records-and-triggers", "Notification Records & Triggers"),
      L(17, "email-templates", "Email Templates"),
      L(18, "inbound-email-actions", "Inbound Email Actions"),
      L(19, "notifications-lab", "Notifications Lab"),
    ],
  },
  {
    n: 5,
    title: "UI Policies, Data Policies & Business Rules (Admin View)",
    lessons: [
      L(20, "ui-policies-for-form-behavior", "UI Policies for Form Behavior"),
      L(21, "data-policies-for-server-side-field-enforcement", "Data Policies for Server-Side Field Enforcement"),
      L(22, "ui-policy-vs-data-policy-when-to-use-each", "UI Policy vs. Data Policy: When to Use Each"),
      L(23, "business-rules-an-administrators-view", "Business Rules: an Administrator's View"),
      L(24, "ui-and-data-policy-lab", "UI & Data Policy Lab"),
    ],
  },
  {
    n: 6,
    title: "System Properties, Scheduled Jobs & Logs",
    lessons: [
      L(25, "system-properties", "System Properties"),
      L(26, "scheduled-jobs", "Scheduled Jobs"),
      L(27, "system-logs-and-the-system-log-application", "System Logs & the System Log Application"),
      L(28, "scheduled-jobs-and-logs-lab", "Scheduled Jobs & Logs Lab"),
    ],
  },
  {
    n: 7,
    title: "Update Sets & Change Management (Admin View)",
    lessons: [
      L(29, "what-an-update-set-actually-captures", "What an Update Set Actually Captures"),
      L(30, "creating-and-completing-an-update-set", "Creating & Completing an Update Set"),
      L(31, "moving-update-sets-between-instances", "Moving Update Sets Between Instances"),
      L(32, "common-update-set-problems-and-fixes", "Common Update Set Problems & Fixes"),
      L(33, "update-set-lab", "Update Set Lab"),
    ],
  },
  {
    n: 8,
    title: "CSA Exam Preparation & Capstone",
    lessons: [
      L(34, "csa-exam-domain-review", "CSA Exam Domain Review"),
      L(35, "capstone-configure-a-small-department-instance", "Capstone: Configure a Small-Department Instance"),
      L(36, "capstone-wrap-up-and-administration-checklist", "Capstone Wrap-Up & Administration Checklist"),
    ],
  },
];
