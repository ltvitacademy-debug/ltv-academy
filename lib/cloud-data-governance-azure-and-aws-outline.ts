// The Cloud Data Governance: Azure & AWS course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-data-governance-azure-and-aws/
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

export const GOV_CLOUD_DATA_GOVERNANCE_AZURE_AND_AWS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Cloud Governance Architecture",
    lessons: [
      L(1, "cloud-data-governance-overview", "Cloud Data Governance Overview", { contentDir: "ch01/01-cloud-data-governance-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413299/ltv-cloud-data-governance-azure-and-aws/cloud-data-governance-overview.mp4", durationLabel: "1 min 47 s" }),
      L(2, "the-shared-responsibility-model-for-data", "The Shared Responsibility Model for Data", { contentDir: "ch01/02-the-shared-responsibility-model-for-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413458/ltv-cloud-data-governance-azure-and-aws/the-shared-responsibility-model-for-data.mp4", durationLabel: "1 min 33 s" }),
      L(3, "cloud-governance-architecture", "Cloud Governance Architecture", { contentDir: "ch01/03-cloud-governance-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413631/ltv-cloud-data-governance-azure-and-aws/cloud-governance-architecture.mp4", durationLabel: "1 min 33 s" }),
      L(4, "landing-zones-and-data-governance", "Landing Zones and Data Governance", { contentDir: "ch01/04-landing-zones-and-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413802/ltv-cloud-data-governance-azure-and-aws/landing-zones-and-data-governance.mp4", durationLabel: "1 min 33 s" }),
      L(5, "governance-across-environments", "Governance Across Environments", { contentDir: "ch01/05-governance-across-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413966/ltv-cloud-data-governance-azure-and-aws/governance-across-environments.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Identity and Access",
    lessons: [
      L(6, "identity-and-access-management-in-the-cloud", "Identity and Access Management in the Cloud", { contentDir: "ch02/06-identity-and-access-management-in-the-cloud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414146/ltv-cloud-data-governance-azure-and-aws/identity-and-access-management-in-the-cloud.mp4", durationLabel: "1 min 34 s" }),
      L(7, "microsoft-entra-id-for-data-governance", "Microsoft Entra ID for Data Governance", { contentDir: "ch02/07-microsoft-entra-id-for-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414345/ltv-cloud-data-governance-azure-and-aws/microsoft-entra-id-for-data-governance.mp4", durationLabel: "1 min 47 s" }),
      L(8, "azure-role-based-access-control", "Azure Role-Based Access Control", { contentDir: "ch02/08-azure-role-based-access-control", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414520/ltv-cloud-data-governance-azure-and-aws/azure-role-based-access-control.mp4", durationLabel: "1 min 39 s" }),
      L(9, "aws-iam-fundamentals-for-governance", "AWS IAM Fundamentals for Governance", { contentDir: "ch02/09-aws-iam-fundamentals-for-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414792/ltv-cloud-data-governance-azure-and-aws/aws-iam-fundamentals-for-governance.mp4", durationLabel: "2 min 32 s" }),
      L(10, "access-governance-patterns", "Access Governance Patterns", { contentDir: "ch02/10-access-governance-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415021/ltv-cloud-data-governance-azure-and-aws/access-governance-patterns.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 3,
    title: "Storage and Catalogs",
    lessons: [
      L(11, "azure-data-lake-storage-governance", "Azure Data Lake Storage Governance", { contentDir: "ch03/11-azure-data-lake-storage-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415205/ltv-cloud-data-governance-azure-and-aws/azure-data-lake-storage-governance.mp4", durationLabel: "1 min 19 s" }),
      L(12, "amazon-s3-governance", "Amazon S3 Governance", { contentDir: "ch03/12-amazon-s3-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415430/ltv-cloud-data-governance-azure-and-aws/amazon-s3-governance.mp4", durationLabel: "1 min 12 s" }),
      L(13, "cloud-data-catalogs", "Cloud Data Catalogs", { contentDir: "ch03/13-cloud-data-catalogs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415603/ltv-cloud-data-governance-azure-and-aws/cloud-data-catalogs.mp4", durationLabel: "59 s" }),
      L(14, "the-aws-glue-data-catalog", "The AWS Glue Data Catalog", { contentDir: "ch03/14-the-aws-glue-data-catalog", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415770/ltv-cloud-data-governance-azure-and-aws/the-aws-glue-data-catalog.mp4", durationLabel: "1 min 2 s" }),
      L(15, "aws-lake-formation", "AWS Lake Formation", { contentDir: "ch03/15-aws-lake-formation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415945/ltv-cloud-data-governance-azure-and-aws/aws-lake-formation.mp4", durationLabel: "1 min 5 s" }),
    ],
  },
  {
    n: 4,
    title: "Security and Compliance",
    lessons: [
      L(16, "encryption-and-key-management-in-azure-and-aws", "Encryption and Key Management in Azure and AWS", { contentDir: "ch04/16-encryption-and-key-management-in-azure-and-aws", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416148/ltv-cloud-data-governance-azure-and-aws/encryption-and-key-management-in-azure-and-aws.mp4", durationLabel: "1 min 13 s" }),
      L(17, "cloud-security-and-compliance-frameworks", "Cloud Security and Compliance Frameworks", { contentDir: "ch04/17-cloud-security-and-compliance-frameworks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416300/ltv-cloud-data-governance-azure-and-aws/cloud-security-and-compliance-frameworks.mp4", durationLabel: "1 min 0 s" }),
      L(18, "azure-policy-and-governance-controls", "Azure Policy and Governance Controls", { contentDir: "ch04/18-azure-policy-and-governance-controls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416491/ltv-cloud-data-governance-azure-and-aws/azure-policy-and-governance-controls.mp4", durationLabel: "1 min 7 s" }),
      L(19, "aws-organizations-and-service-controls", "AWS Organizations and Service Controls", { contentDir: "ch04/19-aws-organizations-and-service-controls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416653/ltv-cloud-data-governance-azure-and-aws/aws-organizations-and-service-controls.mp4", durationLabel: "55 s" }),
      L(20, "auditing-and-logging-in-the-cloud", "Auditing and Logging in the Cloud", { contentDir: "ch04/20-auditing-and-logging-in-the-cloud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416826/ltv-cloud-data-governance-azure-and-aws/auditing-and-logging-in-the-cloud.mp4", durationLabel: "56 s" }),
    ],
  },
  {
    n: 5,
    title: "Multi-Cloud Governance",
    lessons: [
      L(21, "multi-cloud-governance-challenges", "Multi-Cloud Governance Challenges", { contentDir: "ch05/21-multi-cloud-governance-challenges", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417166/ltv-cloud-data-governance-azure-and-aws/multi-cloud-governance-challenges.mp4", durationLabel: "2 min 17 s" }),
      L(22, "cross-cloud-cataloging-and-lineage", "Cross-Cloud Cataloging and Lineage", { contentDir: "ch05/22-cross-cloud-cataloging-and-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417485/ltv-cloud-data-governance-azure-and-aws/cross-cloud-cataloging-and-lineage.mp4", durationLabel: "2 min 11 s" }),
      L(23, "multi-cloud-governance-case-study", "Multi-Cloud Governance Case Study", { contentDir: "ch05/23-multi-cloud-governance-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417868/ltv-cloud-data-governance-azure-and-aws/multi-cloud-governance-case-study.mp4", durationLabel: "2 min 18 s" }),
      L(24, "cloud-governance-practice-lab", "Cloud Governance Practice Lab", { contentDir: "ch05/24-cloud-governance-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418150/ltv-cloud-data-governance-azure-and-aws/cloud-governance-practice-lab.mp4", durationLabel: "1 min 55 s" }),
      L(25, "cloud-governance-review-checklist", "Cloud Governance Review Checklist", { contentDir: "ch05/25-cloud-governance-review-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418439/ltv-cloud-data-governance-azure-and-aws/cloud-governance-review-checklist.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
];
