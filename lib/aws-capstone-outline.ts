// The full AWS Capstone course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Ties together every AWS service from AWS Data Engineering into one
// working platform, then layers on the production practices (monitoring,
// security, CI/CD, cost) that separate a demo from a job-ready project.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-capstone/
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

export const AWS_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "capstone-kickoff-and-business-scenario", "Capstone Kickoff & Business Scenario", {
        contentDir: "ch01/01-capstone-kickoff-and-business-scenario",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156669/ltv-aws-capstone/capstone-kickoff-and-business-scenario.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(2, "architecture-planning", "Architecture Planning", {
        contentDir: "ch01/02-architecture-planning",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156717/ltv-aws-capstone/architecture-planning.mp4",
        durationLabel: "1 min 30 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Building the Pipeline",
    lessons: [
      L(3, "ingesting-data-into-s3", "Ingesting Data Into S3", {
        contentDir: "ch02/03-ingesting-data-into-s3",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156768/ltv-aws-capstone/ingesting-data-into-s3.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(4, "cataloging-with-glue", "Cataloging With Glue", {
        contentDir: "ch02/04-cataloging-with-glue",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156825/ltv-aws-capstone/cataloging-with-glue.mp4",
        durationLabel: "1 min 44 s",
      }),
      L(5, "transforming-with-glue-etl", "Transforming With Glue ETL", {
        contentDir: "ch02/05-transforming-with-glue-etl",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156880/ltv-aws-capstone/transforming-with-glue-etl.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(6, "loading-into-redshift", "Loading Into Redshift", {
        contentDir: "ch02/06-loading-into-redshift",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156932/ltv-aws-capstone/loading-into-redshift.mp4",
        durationLabel: "1 min 35 s",
      }),
      L(7, "querying-with-athena", "Querying With Athena", {
        contentDir: "ch02/07-querying-with-athena",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156986/ltv-aws-capstone/querying-with-athena.mp4",
        durationLabel: "1 min 45 s",
      }),
      L(8, "orchestrating-with-step-functions", "Orchestrating With Step Functions", {
        contentDir: "ch02/08-orchestrating-with-step-functions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157038/ltv-aws-capstone/orchestrating-with-step-functions.mp4",
        durationLabel: "1 min 38 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Adding Production Practices",
    lessons: [
      L(9, "monitoring-with-cloudwatch", "Monitoring With CloudWatch", {
        contentDir: "ch03/09-monitoring-with-cloudwatch",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157086/ltv-aws-capstone/monitoring-with-cloudwatch.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(10, "securing-with-iam-least-privilege", "Securing With IAM Least Privilege", {
        contentDir: "ch03/10-securing-with-iam-least-privilege",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157135/ltv-aws-capstone/securing-with-iam-least-privilege.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(11, "ci-cd-for-the-pipeline", "CI/CD for the Pipeline", {
        contentDir: "ch03/11-ci-cd-for-the-pipeline",
      }),
      L(12, "a-cost-optimization-pass", "A Cost Optimization Pass", {
        contentDir: "ch03/12-a-cost-optimization-pass",
      }),
      L(13, "disaster-recovery-considerations", "Disaster Recovery Considerations", {
        contentDir: "ch03/13-disaster-recovery-considerations",
      }),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(14, "presenting-your-aws-data-platform", "Presenting Your AWS Data Platform", {
        contentDir: "ch04/14-presenting-your-aws-data-platform",
      }),
      L(15, "portfolio-and-interview-prep", "Portfolio & Interview Prep", {
        contentDir: "ch04/15-portfolio-and-interview-prep",
      }),
    ],
  },
];
