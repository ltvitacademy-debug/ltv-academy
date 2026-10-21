// The full Salesforce Fundamentals for Data Analysts course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Not a Salesforce Administrator mega-course —
// this teaches exactly what a data analyst needs: what Salesforce data
// means, before analyzing it.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-fundamentals/
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

export const SALESFORCE_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Salesforce Ecosystem",
    lessons: [
      L(1, "what-is-salesforce-and-crm", "What Is Salesforce & CRM?", {
        contentDir: "ch01/01-what-is-salesforce-and-crm",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520408/ltv-salesforce-fundamentals/01-what-is-salesforce-and-crm.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(2, "sales-cloud-vs-service-cloud", "Sales Cloud vs. Service Cloud", {
        contentDir: "ch01/02-sales-cloud-vs-service-cloud",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520910/ltv-salesforce-fundamentals/02-sales-cloud-vs-service-cloud.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(3, "editions-and-the-appexchange", "Editions & the AppExchange", {
        contentDir: "ch01/03-editions-and-the-appexchange",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521463/ltv-salesforce-fundamentals/03-editions-and-the-appexchange.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(4, "navigating-salesforce", "Navigating Salesforce", {
        contentDir: "ch01/04-navigating-salesforce",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521911/ltv-salesforce-fundamentals/04-navigating-salesforce.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(5, "salesforce-terminology-for-analysts", "Salesforce Terminology for Analysts", {
        contentDir: "ch01/05-salesforce-terminology-for-analysts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522383/ltv-salesforce-fundamentals/05-salesforce-terminology-for-analysts.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(6, "why-analysts-need-the-data-model", "Why Analysts Need to Understand the Data, Not Just Query It", {
        contentDir: "ch01/06-why-analysts-need-the-data-model",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522877/ltv-salesforce-fundamentals/06-why-analysts-need-the-data-model.mp4",
        durationLabel: "1 min 15 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Core Sales Cloud Objects",
    lessons: [
      L(7, "leads", "Leads", { contentDir: "ch02/07-leads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523359/ltv-salesforce-fundamentals/07-leads.mp4", durationLabel: "1 min 14 s" }),
      L(8, "accounts", "Accounts", { contentDir: "ch02/08-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523827/ltv-salesforce-fundamentals/08-accounts.mp4", durationLabel: "1 min 13 s" }),
      L(9, "contacts", "Contacts", { contentDir: "ch02/09-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524262/ltv-salesforce-fundamentals/09-contacts.mp4", durationLabel: "1 min 13 s" }),
      L(10, "opportunities", "Opportunities", { contentDir: "ch02/10-opportunities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524782/ltv-salesforce-fundamentals/10-opportunities.mp4", durationLabel: "1 min 11 s" }),
      L(11, "campaigns", "Campaigns", { contentDir: "ch02/11-campaigns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525249/ltv-salesforce-fundamentals/11-campaigns.mp4", durationLabel: "1 min 13 s" }),
      L(12, "activities", "Activities", { contentDir: "ch02/12-activities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525712/ltv-salesforce-fundamentals/12-activities.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 3,
    title: "Core Service Cloud Objects",
    lessons: [
      L(13, "cases", "Cases", { contentDir: "ch03/13-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526115/ltv-salesforce-fundamentals/13-cases.mp4", durationLabel: "1 min 1 s" }),
      L(14, "the-case-lifecycle", "The Case Lifecycle", { contentDir: "ch03/14-the-case-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526560/ltv-salesforce-fundamentals/14-the-case-lifecycle.mp4", durationLabel: "1 min 9 s" }),
      L(15, "service-cloud-reporting-context", "Service Cloud Reporting Context", {
        contentDir: "ch03/15-service-cloud-reporting-context",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527119/ltv-salesforce-fundamentals/15-service-cloud-reporting-context.mp4",
        durationLabel: "1 min 26 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Standard vs. Custom Objects & Fields",
    lessons: [
      L(16, "standard-vs-custom-objects", "Standard vs. Custom Objects", {
        contentDir: "ch04/16-standard-vs-custom-objects",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527617/ltv-salesforce-fundamentals/16-standard-vs-custom-objects.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(17, "field-types", "Field Types", { contentDir: "ch04/17-field-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528093/ltv-salesforce-fundamentals/17-field-types.mp4", durationLabel: "1 min 13 s" }),
      L(18, "record-types", "Record Types", { contentDir: "ch04/18-record-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528501/ltv-salesforce-fundamentals/18-record-types.mp4", durationLabel: "1 min 4 s" }),
      L(19, "page-layouts", "Page Layouts", { contentDir: "ch04/19-page-layouts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528879/ltv-salesforce-fundamentals/19-page-layouts.mp4", durationLabel: "1 min 1 s" }),
      L(20, "custom-fields-for-analysts", "Custom Fields, From an Analyst's Perspective", {
        contentDir: "ch04/20-custom-fields-for-analysts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529453/ltv-salesforce-fundamentals/20-custom-fields-for-analysts.mp4",
        durationLabel: "1 min 29 s",
      }),
    ],
  },
  {
    n: 5,
    title: "The Salesforce Data Model",
    lessons: [
      L(21, "object-relationships", "Object Relationships", {
        contentDir: "ch05/21-object-relationships",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529939/ltv-salesforce-fundamentals/21-object-relationships.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(22, "lookup-vs-master-detail", "Lookup vs. Master-Detail Relationships", {
        contentDir: "ch05/22-lookup-vs-master-detail",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530362/ltv-salesforce-fundamentals/22-lookup-vs-master-detail.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(23, "junction-objects", "Junction Objects", {
        contentDir: "ch05/23-junction-objects",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530725/ltv-salesforce-fundamentals/23-junction-objects.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(24, "schema-builder", "Schema Builder", {
        contentDir: "ch05/24-schema-builder",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531142/ltv-salesforce-fundamentals/24-schema-builder.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(25, "reading-a-real-orgs-data-model", "Reading a Real Org's Data Model", {
        contentDir: "ch05/25-reading-a-real-orgs-data-model",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531529/ltv-salesforce-fundamentals/25-reading-a-real-orgs-data-model.mp4",
        durationLabel: "1 min 0 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Users, Roles, Profiles & Data Security Basics",
    lessons: [
      L(26, "users-and-licenses", "Users & Licenses", {
        contentDir: "ch06/26-users-and-licenses",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531934/ltv-salesforce-fundamentals/26-users-and-licenses.mp4",
        durationLabel: "1 min 1 s",
      }),
      L(27, "roles-and-role-hierarchy", "Roles & the Role Hierarchy", {
        contentDir: "ch06/27-roles-and-role-hierarchy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532278/ltv-salesforce-fundamentals/27-roles-and-role-hierarchy.mp4",
        durationLabel: "1 min 1 s",
      }),
      L(28, "profiles-and-permission-sets", "Profiles & Permission Sets", {
        contentDir: "ch06/28-profiles-and-permission-sets",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532594/ltv-salesforce-fundamentals/28-profiles-and-permission-sets.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(29, "sharing-rules-basics", "Sharing Rules, Basics", {
        contentDir: "ch06/29-sharing-rules-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532854/ltv-salesforce-fundamentals/29-sharing-rules-basics.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(30, "field-level-security-basics", "Field-Level Security, Basics", {
        contentDir: "ch06/30-field-level-security-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533096/ltv-salesforce-fundamentals/30-field-level-security-basics.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(31, "putting-it-together-for-an-analyst", "Putting It Together: What an Analyst Actually Needs", {
        contentDir: "ch06/31-putting-it-together-for-an-analyst",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533381/ltv-salesforce-fundamentals/31-putting-it-together-for-an-analyst.mp4",
        durationLabel: "1 min 22 s",
      }),
    ],
  },
];
