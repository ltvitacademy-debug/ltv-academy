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
      L(1, "what-is-aws", "What Is AWS?"),
      L(2, "aws-global-infrastructure", "AWS Global Infrastructure: Regions & Availability Zones"),
      L(3, "the-aws-console-tour", "The AWS Console, Tour"),
      L(4, "aws-accounts-and-organizations", "AWS Accounts & Organizations, Basics"),
      L(5, "the-shared-responsibility-model", "The Shared Responsibility Model"),
    ],
  },
  {
    n: 2,
    title: "Core AWS Services Overview",
    lessons: [
      L(6, "iam-basics", "IAM Basics"),
      L(7, "compute-overview", "Compute Overview: EC2 & Lambda"),
      L(8, "storage-overview", "Storage Overview: S3 & EBS"),
      L(9, "networking-basics", "Networking Basics: VPC"),
      L(10, "aws-pricing-and-cost-management", "AWS Pricing & Cost Management"),
    ],
  },
  {
    n: 3,
    title: "IAM Deep Dive for Data Engineers",
    lessons: [
      L(11, "users-groups-and-roles", "Users, Groups & Roles"),
      L(12, "policies-and-permissions", "Policies & Permissions"),
      L(13, "least-privilege-for-data-pipelines", "Least Privilege for Data Pipelines"),
      L(14, "cross-service-access-patterns", "Cross-Service Access Patterns"),
    ],
  },
  {
    n: 4,
    title: "Working in AWS",
    lessons: [
      L(15, "aws-cli-basics", "AWS CLI Basics"),
      L(16, "aws-sdk-overview", "AWS SDK, Overview"),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource"),
      L(18, "aws-certification-landscape", "The AWS Certification Landscape, Overview"),
    ],
  },
];
