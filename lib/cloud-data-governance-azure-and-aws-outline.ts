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
      L(1, "cloud-data-governance-overview", "Cloud Data Governance Overview"),
      L(2, "the-shared-responsibility-model-for-data", "The Shared Responsibility Model for Data"),
      L(3, "cloud-governance-architecture", "Cloud Governance Architecture"),
      L(4, "landing-zones-and-data-governance", "Landing Zones and Data Governance"),
      L(5, "governance-across-environments", "Governance Across Environments"),
    ],
  },
  {
    n: 2,
    title: "Identity and Access",
    lessons: [
      L(6, "identity-and-access-management-in-the-cloud", "Identity and Access Management in the Cloud"),
      L(7, "microsoft-entra-id-for-data-governance", "Microsoft Entra ID for Data Governance"),
      L(8, "azure-role-based-access-control", "Azure Role-Based Access Control"),
      L(9, "aws-iam-fundamentals-for-governance", "AWS IAM Fundamentals for Governance"),
      L(10, "access-governance-patterns", "Access Governance Patterns"),
    ],
  },
  {
    n: 3,
    title: "Storage and Catalogs",
    lessons: [
      L(11, "azure-data-lake-storage-governance", "Azure Data Lake Storage Governance"),
      L(12, "amazon-s3-governance", "Amazon S3 Governance"),
      L(13, "cloud-data-catalogs", "Cloud Data Catalogs"),
      L(14, "the-aws-glue-data-catalog", "The AWS Glue Data Catalog"),
      L(15, "aws-lake-formation", "AWS Lake Formation"),
    ],
  },
  {
    n: 4,
    title: "Security and Compliance",
    lessons: [
      L(16, "encryption-and-key-management-in-azure-and-aws", "Encryption and Key Management in Azure and AWS"),
      L(17, "cloud-security-and-compliance-frameworks", "Cloud Security and Compliance Frameworks"),
      L(18, "azure-policy-and-governance-controls", "Azure Policy and Governance Controls"),
      L(19, "aws-organizations-and-service-controls", "AWS Organizations and Service Controls"),
      L(20, "auditing-and-logging-in-the-cloud", "Auditing and Logging in the Cloud"),
    ],
  },
  {
    n: 5,
    title: "Multi-Cloud Governance",
    lessons: [
      L(21, "multi-cloud-governance-challenges", "Multi-Cloud Governance Challenges"),
      L(22, "cross-cloud-cataloging-and-lineage", "Cross-Cloud Cataloging and Lineage"),
      L(23, "multi-cloud-governance-case-study", "Multi-Cloud Governance Case Study"),
      L(24, "cloud-governance-practice-lab", "Cloud Governance Practice Lab"),
      L(25, "cloud-governance-review-checklist", "Cloud Governance Review Checklist"),
    ],
  },
];
