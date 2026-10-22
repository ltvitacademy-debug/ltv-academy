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
      L(1, "creating-and-managing-users", "Creating & Managing Users", { contentDir: "ch01/01-creating-and-managing-users", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703532/ltv-servicenow-system-administration/creating-and-managing-users.mp4", durationLabel: "2 min 42 s" }),
      L(2, "groups-and-group-membership", "Groups & Group Membership", { contentDir: "ch01/02-groups-and-group-membership", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703592/ltv-servicenow-system-administration/groups-and-group-membership.mp4", durationLabel: "1 min 50 s" }),
      L(3, "roles-and-role-inheritance", "Roles & Role Inheritance", { contentDir: "ch01/03-roles-and-role-inheritance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703656/ltv-servicenow-system-administration/roles-and-role-inheritance.mp4", durationLabel: "1 min 57 s" }),
      L(4, "delegated-administration", "Delegated Administration", { contentDir: "ch01/04-delegated-administration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703745/ltv-servicenow-system-administration/delegated-administration.mp4", durationLabel: "2 min 46 s" }),
      L(5, "users-groups-roles-lab", "Users, Groups & Roles Lab", { contentDir: "ch01/05-users-groups-roles-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703835/ltv-servicenow-system-administration/users-groups-roles-lab.mp4", durationLabel: "2 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Access Control Lists (ACLs)",
    lessons: [
      L(6, "how-acls-actually-evaluate-access", "How ACLs Actually Evaluate Access", { contentDir: "ch02/06-how-acls-actually-evaluate-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703909/ltv-servicenow-system-administration/how-acls-actually-evaluate-access.mp4", durationLabel: "2 min 18 s" }),
      L(7, "table-level-and-field-level-acls", "Table-Level & Field-Level ACLs", { contentDir: "ch02/07-table-level-and-field-level-acls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792703985/ltv-servicenow-system-administration/table-level-and-field-level-acls.mp4", durationLabel: "2 min 19 s" }),
      L(8, "acl-conditions-and-scripts", "ACL Conditions & Scripts", { contentDir: "ch02/08-acl-conditions-and-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704059/ltv-servicenow-system-administration/acl-conditions-and-scripts.mp4", durationLabel: "2 min 19 s" }),
      L(9, "troubleshooting-an-access-denied-issue", "Troubleshooting an Access-Denied Issue", { contentDir: "ch02/09-troubleshooting-an-access-denied-issue", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704136/ltv-servicenow-system-administration/troubleshooting-an-access-denied-issue.mp4", durationLabel: "2 min 20 s" }),
      L(10, "acl-lab", "ACL Lab", { contentDir: "ch02/10-acl-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704209/ltv-servicenow-system-administration/acl-lab.mp4", durationLabel: "2 min 18 s" }),
    ],
  },
  {
    n: 3,
    title: "Service Catalog Administration",
    lessons: [
      L(11, "catalog-items-and-categories", "Catalog Items & Categories", { contentDir: "ch03/11-catalog-items-and-categories", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704296/ltv-servicenow-system-administration/catalog-items-and-categories.mp4", durationLabel: "2 min 42 s" }),
      L(12, "variables-and-variable-sets", "Variables & Variable Sets", { contentDir: "ch03/12-variables-and-variable-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704383/ltv-servicenow-system-administration/variables-and-variable-sets.mp4", durationLabel: "2 min 42 s" }),
      L(13, "catalog-ui-policies", "Catalog UI Policies", { contentDir: "ch03/13-catalog-ui-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704468/ltv-servicenow-system-administration/catalog-ui-policies.mp4", durationLabel: "2 min 40 s" }),
      L(14, "record-producers", "Record Producers", { contentDir: "ch03/14-record-producers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704549/ltv-servicenow-system-administration/record-producers.mp4", durationLabel: "2 min 26 s" }),
      L(15, "service-catalog-lab", "Service Catalog Lab", { contentDir: "ch03/15-service-catalog-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704625/ltv-servicenow-system-administration/service-catalog-lab.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 4,
    title: "Notifications & Email",
    lessons: [
      L(16, "notification-records-and-triggers", "Notification Records & Triggers", { contentDir: "ch04/16-notification-records-and-triggers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704711/ltv-servicenow-system-administration/notification-records-and-triggers.mp4", durationLabel: "2 min 50 s" }),
      L(17, "email-templates", "Email Templates", { contentDir: "ch04/17-email-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704790/ltv-servicenow-system-administration/email-templates.mp4", durationLabel: "2 min 34 s" }),
      L(18, "inbound-email-actions", "Inbound Email Actions", { contentDir: "ch04/18-inbound-email-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704872/ltv-servicenow-system-administration/inbound-email-actions.mp4", durationLabel: "2 min 40 s" }),
      L(19, "notifications-lab", "Notifications Lab", { contentDir: "ch04/19-notifications-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792704970/ltv-servicenow-system-administration/notifications-lab.mp4", durationLabel: "3 min 10 s" }),
    ],
  },
  {
    n: 5,
    title: "UI Policies, Data Policies & Business Rules (Admin View)",
    lessons: [
      L(20, "ui-policies-for-form-behavior", "UI Policies for Form Behavior", { contentDir: "ch05/20-ui-policies-for-form-behavior", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705066/ltv-servicenow-system-administration/ui-policies-for-form-behavior.mp4", durationLabel: "3 min 10 s" }),
      L(21, "data-policies-for-server-side-field-enforcement", "Data Policies for Server-Side Field Enforcement", { contentDir: "ch05/21-data-policies-for-server-side-field-enforcement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705156/ltv-servicenow-system-administration/data-policies-for-server-side-field-enforcement.mp4", durationLabel: "2 min 60 s" }),
      L(22, "ui-policy-vs-data-policy-when-to-use-each", "UI Policy vs. Data Policy: When to Use Each", { contentDir: "ch05/22-ui-policy-vs-data-policy-when-to-use-each", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705244/ltv-servicenow-system-administration/ui-policy-vs-data-policy-when-to-use-each.mp4", durationLabel: "2 min 55 s" }),
      L(23, "business-rules-an-administrators-view", "Business Rules: an Administrator's View", { contentDir: "ch05/23-business-rules-an-administrators-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705335/ltv-servicenow-system-administration/business-rules-an-administrators-view.mp4", durationLabel: "2 min 60 s" }),
      L(24, "ui-and-data-policy-lab", "UI & Data Policy Lab", { contentDir: "ch05/24-ui-and-data-policy-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705418/ltv-servicenow-system-administration/ui-and-data-policy-lab.mp4", durationLabel: "2 min 48 s" }),
    ],
  },
  {
    n: 6,
    title: "System Properties, Scheduled Jobs & Logs",
    lessons: [
      L(25, "system-properties", "System Properties", { contentDir: "ch06/25-system-properties", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705490/ltv-servicenow-system-administration/system-properties.mp4", durationLabel: "2 min 20 s" }),
      L(26, "scheduled-jobs", "Scheduled Jobs", { contentDir: "ch06/26-scheduled-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705556/ltv-servicenow-system-administration/scheduled-jobs.mp4", durationLabel: "2 min 8 s" }),
      L(27, "system-logs-and-the-system-log-application", "System Logs & the System Log Application", { contentDir: "ch06/27-system-logs-and-the-system-log-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705627/ltv-servicenow-system-administration/system-logs-and-the-system-log-application.mp4", durationLabel: "2 min 14 s" }),
      L(28, "scheduled-jobs-and-logs-lab", "Scheduled Jobs & Logs Lab", { contentDir: "ch06/28-scheduled-jobs-and-logs-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705712/ltv-servicenow-system-administration/scheduled-jobs-and-logs-lab.mp4", durationLabel: "2 min 56 s" }),
    ],
  },
  {
    n: 7,
    title: "Update Sets & Change Management (Admin View)",
    lessons: [
      L(29, "what-an-update-set-actually-captures", "What an Update Set Actually Captures", { contentDir: "ch07/29-what-an-update-set-actually-captures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705776/ltv-servicenow-system-administration/what-an-update-set-actually-captures.mp4", durationLabel: "2 min 7 s" }),
      L(30, "creating-and-completing-an-update-set", "Creating & Completing an Update Set", { contentDir: "ch07/30-creating-and-completing-an-update-set", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705840/ltv-servicenow-system-administration/creating-and-completing-an-update-set.mp4", durationLabel: "2 min 9 s" }),
      L(31, "moving-update-sets-between-instances", "Moving Update Sets Between Instances", { contentDir: "ch07/31-moving-update-sets-between-instances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705907/ltv-servicenow-system-administration/moving-update-sets-between-instances.mp4", durationLabel: "2 min 15 s" }),
      L(32, "common-update-set-problems-and-fixes", "Common Update Set Problems & Fixes", { contentDir: "ch07/32-common-update-set-problems-and-fixes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792705973/ltv-servicenow-system-administration/common-update-set-problems-and-fixes.mp4", durationLabel: "2 min 17 s" }),
      L(33, "update-set-lab", "Update Set Lab", { contentDir: "ch07/33-update-set-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792706029/ltv-servicenow-system-administration/update-set-lab.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 8,
    title: "CSA Exam Preparation & Capstone",
    lessons: [
      L(34, "csa-exam-domain-review", "CSA Exam Domain Review", { contentDir: "ch08/34-csa-exam-domain-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792706105/ltv-servicenow-system-administration/csa-exam-domain-review.mp4", durationLabel: "2 min 47 s" }),
      L(35, "capstone-configure-a-small-department-instance", "Capstone: Configure a Small-Department Instance", { contentDir: "ch08/35-capstone-configure-a-small-department-instance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792706171/ltv-servicenow-system-administration/capstone-configure-a-small-department-instance.mp4", durationLabel: "2 min 21 s" }),
      L(36, "capstone-wrap-up-and-administration-checklist", "Capstone Wrap-Up & Administration Checklist", { contentDir: "ch08/36-capstone-wrap-up-and-administration-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792706247/ltv-servicenow-system-administration/capstone-wrap-up-and-administration-checklist.mp4", durationLabel: "2 min 46 s" }),
    ],
  },
];
