// Beginner-tier capstone for the Azure Database Engineer path. This path
// had no capstone at all before this build. Only lessons with a contentDir
// + videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-dba-capstone-beginner/
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

export const AZURE_DBA_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: The First Backup Plan",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: “What Happens If This Database Disappears?”", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 16 s" }),
      L(2, "planning-the-backup-strategy", "Planning the Backup Strategy", { contentDir: "ch01/02-planning-the-backup-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/planning-the-backup-strategy.mp4", durationLabel: "2 min 16 s" }),
      L(3, "deploying-the-azure-sql-database", "Deploying the Azure SQL Database", { contentDir: "ch01/03-deploying-the-azure-sql-database", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/deploying-the-azure-sql-database.mp4", durationLabel: "2 min 1 s" }),
      L(4, "taking-a-full-backup", "Taking a Full Backup", { contentDir: "ch01/04-taking-a-full-backup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/taking-a-full-backup.mp4", durationLabel: "1 min 45 s" }),
      L(5, "taking-a-differential-backup", "Taking a Differential Backup", { contentDir: "ch01/05-taking-a-differential-backup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/taking-a-differential-backup.mp4", durationLabel: "2 min 0 s" }),
      L(6, "taking-a-log-backup", "Taking a Log Backup", { contentDir: "ch01/06-taking-a-log-backup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/taking-a-log-backup.mp4", durationLabel: "1 min 41 s" }),
      L(7, "restoring-to-a-point-in-time", "Restoring to a Point in Time", { contentDir: "ch01/07-restoring-to-a-point-in-time", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/restoring-to-a-point-in-time.mp4", durationLabel: "2 min 5 s" }),
      L(8, "writing-a-health-check-query", "Writing a Basic Health-Check Query", { contentDir: "ch01/08-writing-a-health-check-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/writing-a-health-check-query.mp4", durationLabel: "1 min 47 s" }),
      L(9, "documenting-the-backup-plan", "Documenting the Backup Plan", { contentDir: "ch01/09-documenting-the-backup-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/documenting-the-backup-plan.mp4", durationLabel: "1 min 55 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
];
