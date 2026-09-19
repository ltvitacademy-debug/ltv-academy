// The full AWS Fundamentals for Data Engineers course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". A short primer on cloud and AWS concepts,
// mirroring Azure Fundamentals in scope — meant to sit before AWS Data
// Engineering for students who haven't touched AWS at all yet.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-fundamentals/
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

export const AWS_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Cloud & AWS Concepts",
    lessons: [
      L(1, "what-is-aws", "What Is AWS?", {
        contentDir: "ch01/01-what-is-aws",
        // videoUrl/durationLabel pending
      }),
      L(2, "aws-global-infrastructure", "AWS Global Infrastructure: Regions & Availability Zones", {
        contentDir: "ch01/02-aws-global-infrastructure",
      }),
      L(3, "the-aws-console-tour", "The AWS Console, Tour", {
        contentDir: "ch01/03-the-aws-console-tour",
      }),
      L(4, "aws-accounts-and-organizations", "AWS Accounts & Organizations, Basics", {
        contentDir: "ch01/04-aws-accounts-and-organizations",
      }),
      L(5, "the-shared-responsibility-model", "The Shared Responsibility Model", {
        contentDir: "ch01/05-the-shared-responsibility-model",
      }),
    ],
  },
  {
    n: 2,
    title: "Core AWS Services Overview",
    lessons: [
      L(6, "iam-basics", "IAM Basics", {
        contentDir: "ch02/06-iam-basics",
      }),
      L(7, "compute-overview", "Compute Overview: EC2 & Lambda", {
        contentDir: "ch02/07-compute-overview",
      }),
      L(8, "storage-overview", "Storage Overview: S3 & EBS", {
        contentDir: "ch02/08-storage-overview",
      }),
      L(9, "networking-basics", "Networking Basics: VPC", {
        contentDir: "ch02/09-networking-basics",
      }),
      L(10, "aws-pricing-and-cost-management", "AWS Pricing & Cost Management", {
        contentDir: "ch02/10-aws-pricing-and-cost-management",
      }),
    ],
  },
  {
    n: 3,
    title: "IAM Deep Dive for Data Engineers",
    lessons: [
      L(11, "users-groups-and-roles", "Users, Groups & Roles", {
        contentDir: "ch03/11-users-groups-and-roles",
      }),
      L(12, "policies-and-permissions", "Policies & Permissions", {
        contentDir: "ch03/12-policies-and-permissions",
      }),
      L(13, "least-privilege-for-data-pipelines", "Least Privilege for Data Pipelines", {
        contentDir: "ch03/13-least-privilege-for-data-pipelines",
      }),
      L(14, "cross-service-access-patterns", "Cross-Service Access Patterns", {
        contentDir: "ch03/14-cross-service-access-patterns",
      }),
    ],
  },
  {
    n: 4,
    title: "Working in AWS",
    lessons: [
      L(15, "aws-cli-basics", "AWS CLI Basics", {
        contentDir: "ch04/15-aws-cli-basics",
      }),
      L(16, "aws-sdk-overview", "AWS SDK, Overview", {
        contentDir: "ch04/16-aws-sdk-overview",
      }),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource", {
        contentDir: "ch04/17-deploying-your-first-resource",
      }),
      L(18, "aws-certification-landscape", "The AWS Certification Landscape, Overview", {
        contentDir: "ch04/18-aws-certification-landscape",
      }),
    ],
  },
];
