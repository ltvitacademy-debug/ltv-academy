// Intermediate-tier capstone for the AWS Data Engineer path. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-capstone-intermediate/
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

export const AWS_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: A Repeatable Curated Dataset",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Finance Wants a Repeatable Dataset", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 44 s" }),
      L(2, "planning-the-etl-and-warehouse-layer", "Planning the ETL and Warehouse Layer", { contentDir: "ch01/02-planning-the-etl-and-warehouse-layer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/planning-the-etl-and-warehouse-layer.mp4", durationLabel: "1 min 46 s" }),
      L(3, "writing-the-glue-etl-job", "Writing the Glue ETL Job", { contentDir: "ch01/03-writing-the-glue-etl-job", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/writing-the-glue-etl-job.mp4", durationLabel: "1 min 42 s" }),
      L(4, "designing-the-redshift-tables", "Designing the Redshift Tables", { contentDir: "ch01/04-designing-the-redshift-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/designing-the-redshift-tables.mp4", durationLabel: "2 min 22 s" }),
      L(5, "loading-redshift-with-copy", "Loading Redshift With COPY", { contentDir: "ch01/05-loading-redshift-with-copy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/loading-redshift-with-copy.mp4", durationLabel: "2 min 8 s" }),
      L(6, "validating-the-load", "Validating the Load", { contentDir: "ch01/06-validating-the-load", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/validating-the-load.mp4", durationLabel: "1 min 42 s" }),
      L(7, "connecting-athena-as-a-secondary-path", "Connecting Athena as a Secondary Query Path", { contentDir: "ch01/07-connecting-athena-as-a-secondary-path", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/connecting-athena-as-a-secondary-path.mp4", durationLabel: "1 min 49 s" }),
      L(8, "building-a-scheduled-refresh", "Building a Scheduled Refresh", { contentDir: "ch01/08-building-a-scheduled-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/building-a-scheduled-refresh.mp4", durationLabel: "1 min 39 s" }),
      L(9, "building-the-finance-report", "Building the Finance Report", { contentDir: "ch01/09-building-the-finance-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/building-the-finance-report.mp4", durationLabel: "2 min 16 s" }),
      L(10, "building-the-ops-report", "Building the Ops Report", { contentDir: "ch01/10-building-the-ops-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/building-the-ops-report.mp4", durationLabel: "2 min 11 s" }),
      L(11, "a-load-fails-now-what", "A Load Fails — Now What?", { contentDir: "ch01/11-a-load-fails-now-what", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/a-load-fails-now-what.mp4", durationLabel: "2 min 10 s" }),
      L(12, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/12-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "2 min 24 s" }),
      L(13, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/13-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 51 s" }),
      L(14, "a-second-bug-the-crawler", "A Second Bug: The Crawler Misreads a Schema Change", { contentDir: "ch01/14-a-second-bug-the-crawler", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/a-second-bug-the-crawler.mp4", durationLabel: "1 min 47 s" }),
      L(15, "fixing-and-revalidating", "Fixing and Re-Validating", { contentDir: "ch01/15-fixing-and-revalidating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/fixing-and-revalidating.mp4", durationLabel: "1 min 42 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
];
