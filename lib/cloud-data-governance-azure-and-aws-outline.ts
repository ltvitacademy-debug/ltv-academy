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
      L(1, "cloud-data-governance-overview", "Cloud Data Governance Overview", { contentDir: "ch01/01-cloud-data-governance-overview" }),
      L(2, "the-shared-responsibility-model-for-data", "The Shared Responsibility Model for Data", { contentDir: "ch01/02-the-shared-responsibility-model-for-data" }),
      L(3, "cloud-governance-architecture", "Cloud Governance Architecture", { contentDir: "ch01/03-cloud-governance-architecture" }),
      L(4, "landing-zones-and-data-governance", "Landing Zones and Data Governance", { contentDir: "ch01/04-landing-zones-and-data-governance" }),
      L(5, "governance-across-environments", "Governance Across Environments", { contentDir: "ch01/05-governance-across-environments" }),
    ],
  },
  {
    n: 2,
    title: "Identity and Access",
    lessons: [
      L(6, "identity-and-access-management-in-the-cloud", "Identity and Access Management in the Cloud", { contentDir: "ch02/06-identity-and-access-management-in-the-cloud" }),
      L(7, "microsoft-entra-id-for-data-governance", "Microsoft Entra ID for Data Governance", { contentDir: "ch02/07-microsoft-entra-id-for-data-governance" }),
      L(8, "azure-role-based-access-control", "Azure Role-Based Access Control", { contentDir: "ch02/08-azure-role-based-access-control" }),
      L(9, "aws-iam-fundamentals-for-governance", "AWS IAM Fundamentals for Governance", { contentDir: "ch02/09-aws-iam-fundamentals-for-governance" }),
      L(10, "access-governance-patterns", "Access Governance Patterns", { contentDir: "ch02/10-access-governance-patterns" }),
    ],
  },
  {
    n: 3,
    title: "Storage and Catalogs",
    lessons: [
      L(11, "azure-data-lake-storage-governance", "Azure Data Lake Storage Governance", { contentDir: "ch03/11-azure-data-lake-storage-governance" }),
      L(12, "amazon-s3-governance", "Amazon S3 Governance", { contentDir: "ch03/12-amazon-s3-governance" }),
      L(13, "cloud-data-catalogs", "Cloud Data Catalogs", { contentDir: "ch03/13-cloud-data-catalogs" }),
      L(14, "the-aws-glue-data-catalog", "The AWS Glue Data Catalog", { contentDir: "ch03/14-the-aws-glue-data-catalog" }),
      L(15, "aws-lake-formation", "AWS Lake Formation", { contentDir: "ch03/15-aws-lake-formation" }),
    ],
  },
  {
    n: 4,
    title: "Security and Compliance",
    lessons: [
      L(16, "encryption-and-key-management-in-azure-and-aws", "Encryption and Key Management in Azure and AWS", { contentDir: "ch04/16-encryption-and-key-management-in-azure-and-aws" }),
      L(17, "cloud-security-and-compliance-frameworks", "Cloud Security and Compliance Frameworks", { contentDir: "ch04/17-cloud-security-and-compliance-frameworks" }),
      L(18, "azure-policy-and-governance-controls", "Azure Policy and Governance Controls", { contentDir: "ch04/18-azure-policy-and-governance-controls" }),
      L(19, "aws-organizations-and-service-controls", "AWS Organizations and Service Controls", { contentDir: "ch04/19-aws-organizations-and-service-controls" }),
      L(20, "auditing-and-logging-in-the-cloud", "Auditing and Logging in the Cloud", { contentDir: "ch04/20-auditing-and-logging-in-the-cloud" }),
    ],
  },
  {
    n: 5,
    title: "Multi-Cloud Governance",
    lessons: [
      L(21, "multi-cloud-governance-challenges", "Multi-Cloud Governance Challenges", { contentDir: "ch05/21-multi-cloud-governance-challenges" }),
      L(22, "cross-cloud-cataloging-and-lineage", "Cross-Cloud Cataloging and Lineage", { contentDir: "ch05/22-cross-cloud-cataloging-and-lineage" }),
      L(23, "multi-cloud-governance-case-study", "Multi-Cloud Governance Case Study", { contentDir: "ch05/23-multi-cloud-governance-case-study" }),
      L(24, "cloud-governance-practice-lab", "Cloud Governance Practice Lab", { contentDir: "ch05/24-cloud-governance-practice-lab" }),
      L(25, "cloud-governance-review-checklist", "Cloud Governance Review Checklist", { contentDir: "ch05/25-cloud-governance-review-checklist" }),
    ],
  },
];
