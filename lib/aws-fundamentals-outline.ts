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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153071/ltv-aws-fundamentals/what-is-aws.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(2, "aws-global-infrastructure", "AWS Global Infrastructure: Regions & Availability Zones", {
        contentDir: "ch01/02-aws-global-infrastructure",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153107/ltv-aws-fundamentals/aws-global-infrastructure.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(3, "the-aws-console-tour", "The AWS Console, Tour", {
        contentDir: "ch01/03-the-aws-console-tour",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153141/ltv-aws-fundamentals/the-aws-console-tour.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(4, "aws-accounts-and-organizations", "AWS Accounts & Organizations, Basics", {
        contentDir: "ch01/04-aws-accounts-and-organizations",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153172/ltv-aws-fundamentals/aws-accounts-and-organizations.mp4",
        durationLabel: "59 s",
      }),
      L(5, "the-shared-responsibility-model", "The Shared Responsibility Model", {
        contentDir: "ch01/05-the-shared-responsibility-model",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153213/ltv-aws-fundamentals/the-shared-responsibility-model.mp4",
        durationLabel: "1 min 14 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Core AWS Services Overview",
    lessons: [
      L(6, "iam-basics", "IAM Basics", {
        contentDir: "ch02/06-iam-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153251/ltv-aws-fundamentals/iam-basics.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(7, "compute-overview", "Compute Overview: EC2 & Lambda", {
        contentDir: "ch02/07-compute-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153285/ltv-aws-fundamentals/compute-overview.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(8, "storage-overview", "Storage Overview: S3 & EBS", {
        contentDir: "ch02/08-storage-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153320/ltv-aws-fundamentals/storage-overview.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(9, "networking-basics", "Networking Basics: VPC", {
        contentDir: "ch02/09-networking-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153352/ltv-aws-fundamentals/networking-basics.mp4",
        durationLabel: "59 s",
      }),
      L(10, "aws-pricing-and-cost-management", "AWS Pricing & Cost Management", {
        contentDir: "ch02/10-aws-pricing-and-cost-management",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153388/ltv-aws-fundamentals/aws-pricing-and-cost-management.mp4",
        durationLabel: "1 min 8 s",
      }),
    ],
  },
  {
    n: 3,
    title: "IAM Deep Dive for Data Engineers",
    lessons: [
      L(11, "users-groups-and-roles", "Users, Groups & Roles", {
        contentDir: "ch03/11-users-groups-and-roles",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153430/ltv-aws-fundamentals/users-groups-and-roles.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(12, "policies-and-permissions", "Policies & Permissions", {
        contentDir: "ch03/12-policies-and-permissions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153486/ltv-aws-fundamentals/policies-and-permissions.mp4",
        durationLabel: "1 min 54 s",
      }),
      L(13, "least-privilege-for-data-pipelines", "Least Privilege for Data Pipelines", {
        contentDir: "ch03/13-least-privilege-for-data-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153540/ltv-aws-fundamentals/least-privilege-for-data-pipelines.mp4",
        durationLabel: "1 min 48 s",
      }),
      L(14, "cross-service-access-patterns", "Cross-Service Access Patterns", {
        contentDir: "ch03/14-cross-service-access-patterns",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153591/ltv-aws-fundamentals/cross-service-access-patterns.mp4",
        durationLabel: "1 min 36 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Working in AWS",
    lessons: [
      L(15, "aws-cli-basics", "AWS CLI Basics", {
        contentDir: "ch04/15-aws-cli-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153643/ltv-aws-fundamentals/aws-cli-basics.mp4",
        durationLabel: "1 min 35 s",
      }),
      L(16, "aws-sdk-overview", "AWS SDK, Overview", {
        contentDir: "ch04/16-aws-sdk-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153703/ltv-aws-fundamentals/aws-sdk-overview.mp4",
        durationLabel: "1 min 53 s",
      }),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource", {
        contentDir: "ch04/17-deploying-your-first-resource",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153760/ltv-aws-fundamentals/deploying-your-first-resource.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(18, "aws-certification-landscape", "The AWS Certification Landscape, Overview", {
        contentDir: "ch04/18-aws-certification-landscape",
      }),
    ],
  },
];
