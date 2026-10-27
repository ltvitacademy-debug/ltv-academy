// Beginner-tier capstone for the AWS Data Engineer path, complementing the
// existing Advanced "aws-capstone" course. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-capstone-beginner/
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

export const AWS_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: First Look at the Files",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Simple Question About the Files", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 34 s" }),
      L(2, "planning-the-discovery-pipeline", "Planning the Discovery Pipeline", { contentDir: "ch01/02-planning-the-discovery-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/planning-the-discovery-pipeline.mp4", durationLabel: "2 min 11 s" }),
      L(3, "landing-raw-files-in-s3", "Landing Raw Files in S3", { contentDir: "ch01/03-landing-raw-files-in-s3", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/landing-raw-files-in-s3.mp4", durationLabel: "2 min 8 s" }),
      L(4, "cataloging-with-a-glue-crawler", "Cataloging the Data With a Glue Crawler", { contentDir: "ch01/04-cataloging-with-a-glue-crawler", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/cataloging-with-a-glue-crawler.mp4", durationLabel: "2 min 12 s" }),
      L(5, "understanding-what-the-crawler-found", "Understanding What the Crawler Found", { contentDir: "ch01/05-understanding-what-the-crawler-found", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/understanding-what-the-crawler-found.mp4", durationLabel: "2 min 4 s" }),
      L(6, "querying-with-athena", "Querying With Athena", { contentDir: "ch01/06-querying-with-athena", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/querying-with-athena.mp4", durationLabel: "2 min 5 s" }),
      L(7, "writing-the-stakeholders-query", "Writing the Stakeholder's Real Query", { contentDir: "ch01/07-writing-the-stakeholders-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/writing-the-stakeholders-query.mp4", durationLabel: "2 min 2 s" }),
      L(8, "partitioning-for-speed-and-cost", "Partitioning for Faster, Cheaper Queries", { contentDir: "ch01/08-partitioning-for-speed-and-cost", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/partitioning-for-speed-and-cost.mp4", durationLabel: "2 min 20 s" }),
      L(9, "presenting-the-answer", "Presenting the Answer", { contentDir: "ch01/09-presenting-the-answer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/presenting-the-answer.mp4", durationLabel: "2 min 3 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
];
