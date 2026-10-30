// Capstone tier outline for cloud-engineer-capstone-beginner. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-engineer-capstone-beginner/
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

export const CLOUD_ENGINEER_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: Migrating the First Workload to Azure",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One App, One Deadline", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 0 s" }),
      L(2, "scoping-the-first-migration", "Scoping the First Migration", { contentDir: "ch01/02-scoping-the-first-migration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/scoping-the-first-migration.mp4", durationLabel: "2 min 6 s" }),
      L(3, "provisioning-the-azure-resources", "Provisioning the Azure Resources", { contentDir: "ch01/03-provisioning-the-azure-resources", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/provisioning-the-azure-resources.mp4", durationLabel: "1 min 47 s" }),
      L(4, "migrating-the-static-assets", "Migrating the Static Assets to Blob Storage", { contentDir: "ch01/04-migrating-the-static-assets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/migrating-the-static-assets.mp4", durationLabel: "1 min 54 s" }),
      L(5, "migrating-the-vm-workload", "Migrating the VM Workload", { contentDir: "ch01/05-migrating-the-vm-workload", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/migrating-the-vm-workload.mp4", durationLabel: "1 min 54 s" }),
      L(6, "configuring-basic-monitoring", "Configuring Basic Monitoring and Alerts", { contentDir: "ch01/06-configuring-basic-monitoring", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/configuring-basic-monitoring.mp4", durationLabel: "1 min 46 s" }),
      L(7, "testing-the-migrated-app", "Testing the Migrated App End to End", { contentDir: "ch01/07-testing-the-migrated-app", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/testing-the-migrated-app.mp4", durationLabel: "1 min 42 s" }),
      L(8, "documenting-the-migration", "Documenting the Migration for the Team", { contentDir: "ch01/08-documenting-the-migration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/documenting-the-migration.mp4", durationLabel: "1 min 32 s" }),
      L(9, "presenting-the-cutover-plan", "Presenting the Cutover Plan", { contentDir: "ch01/09-presenting-the-cutover-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/presenting-the-cutover-plan.mp4", durationLabel: "1 min 50 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Migrated, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-engineer-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
];
