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
      L(1, "capstone-kickoff-and-business-scenario", "Capstone Kickoff & Business Scenario"),
      L(2, "architecture-planning", "Architecture Planning"),
    ],
  },
  {
    n: 2,
    title: "Building the Pipeline",
    lessons: [
      L(3, "ingesting-data-into-s3", "Ingesting Data Into S3"),
      L(4, "cataloging-with-glue", "Cataloging With Glue"),
      L(5, "transforming-with-glue-etl", "Transforming With Glue ETL"),
      L(6, "loading-into-redshift", "Loading Into Redshift"),
      L(7, "querying-with-athena", "Querying With Athena"),
      L(8, "orchestrating-with-step-functions", "Orchestrating With Step Functions"),
    ],
  },
  {
    n: 3,
    title: "Adding Production Practices",
    lessons: [
      L(9, "monitoring-with-cloudwatch", "Monitoring With CloudWatch"),
      L(10, "securing-with-iam-least-privilege", "Securing With IAM Least Privilege"),
      L(11, "ci-cd-for-the-pipeline", "CI/CD for the Pipeline"),
      L(12, "a-cost-optimization-pass", "A Cost Optimization Pass"),
      L(13, "disaster-recovery-considerations", "Disaster Recovery Considerations"),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(14, "presenting-your-aws-data-platform", "Presenting Your AWS Data Platform"),
      L(15, "portfolio-and-interview-prep", "Portfolio & Interview Prep"),
    ],
  },
];
