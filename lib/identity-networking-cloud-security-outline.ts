// Cloud Networking, Identity & Security course outline. Lessons without a contentDir render as
// "in production". Course 5 of the Cloud Engineer → Cloud Architect path's Job-Ready Foundation
// stage — hybrid identity, zero trust, encryption, secrets management, posture management, and
// private connectivity across Azure and AWS, building on courses 3-4's platform-specific
// administration rather than re-teaching basic networking/identity.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/identity-networking-cloud-security/
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

export const IDENTITY_NETWORKING_CLOUD_SECURITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Hybrid Identity: Connecting On-Prem AD to the Cloud",
    lessons: [
      L(1, "why-hybrid-identity-exists", "Why Hybrid Identity Exists", { contentDir: "ch01/01-why-hybrid-identity-exists" }),
      L(2, "microsoft-entra-connect-and-directory-synchronization", "Microsoft Entra Connect and Directory Synchronization", { contentDir: "ch01/02-microsoft-entra-connect-and-directory-synchronization" }),
      L(3, "federation-vs-password-hash-sync", "Federation vs. Password Hash Sync", { contentDir: "ch01/03-federation-vs-password-hash-sync" }),
      L(4, "aws-iam-identity-center-and-external-identity-providers", "AWS IAM Identity Center and External Identity Providers", { contentDir: "ch01/04-aws-iam-identity-center-and-external-identity-providers" }),
    ],
  },
  {
    n: 2,
    title: "Zero Trust Networking Principles",
    lessons: [
      L(5, "never-trust-always-verify-what-zero-trust-actually-means", "Never Trust, Always Verify: What Zero Trust Actually Means", { contentDir: "ch02/05-never-trust-always-verify-what-zero-trust-actually-means" }),
      L(6, "microsegmentation-applied-to-cloud-networks", "Microsegmentation Applied to Cloud Networks", { contentDir: "ch02/06-microsegmentation-applied-to-cloud-networks" }),
      L(7, "identity-as-the-new-perimeter", "Identity as the New Perimeter", { contentDir: "ch02/07-identity-as-the-new-perimeter" }),
      L(8, "continuous-verification-and-conditional-access-policies", "Continuous Verification and Conditional Access Policies", { contentDir: "ch02/08-continuous-verification-and-conditional-access-policies" }),
    ],
  },
  {
    n: 3,
    title: "Cloud Encryption: At Rest and In Transit",
    lessons: [
      L(9, "encryption-at-rest-how-cloud-providers-actually-do-it", "Encryption at Rest: How Cloud Providers Actually Do It", { contentDir: "ch03/09-encryption-at-rest-how-cloud-providers-actually-do-it" }),
      L(10, "azure-key-vault-and-aws-kms-concepts", "Azure Key Vault and AWS KMS Concepts", { contentDir: "ch03/10-azure-key-vault-and-aws-kms-concepts" }),
      L(11, "customer-managed-vs-platform-managed-keys", "Customer-Managed vs. Platform-Managed Keys", { contentDir: "ch03/11-customer-managed-vs-platform-managed-keys" }),
      L(12, "tls-and-encryption-in-transit-for-cloud-services", "TLS and Encryption in Transit for Cloud Services", { contentDir: "ch03/12-tls-and-encryption-in-transit-for-cloud-services" }),
    ],
  },
  {
    n: 4,
    title: "Secrets Management in the Cloud",
    lessons: [
      L(13, "why-you-never-hardcode-a-secret", "Why You Never Hardcode a Secret", { contentDir: "ch04/13-why-you-never-hardcode-a-secret" }),
      L(14, "azure-key-vault-secrets-in-practice", "Azure Key Vault Secrets in Practice", { contentDir: "ch04/14-azure-key-vault-secrets-in-practice" }),
      L(15, "aws-secrets-manager-and-parameter-store", "AWS Secrets Manager and Parameter Store", { contentDir: "ch04/15-aws-secrets-manager-and-parameter-store" }),
      L(16, "secret-rotation-and-access-policies", "Secret Rotation and Access Policies", { contentDir: "ch04/16-secret-rotation-and-access-policies" }),
    ],
  },
  {
    n: 5,
    title: "Cloud Security Posture Management",
    lessons: [
      L(17, "what-cspm-actually-does", "What CSPM Actually Does", { contentDir: "ch05/17-what-cspm-actually-does" }),
      L(18, "common-cloud-misconfigurations-cspm-catches", "Common Cloud Misconfigurations CSPM Catches", { contentDir: "ch05/18-common-cloud-misconfigurations-cspm-catches" }),
      L(19, "microsoft-defender-for-cloud-and-aws-security-hub-concepts", "Microsoft Defender for Cloud and AWS Security Hub Concepts", { contentDir: "ch05/19-microsoft-defender-for-cloud-and-aws-security-hub-concepts" }),
      L(20, "compliance-scoring-and-remediation-workflows", "Compliance Scoring and Remediation Workflows", { contentDir: "ch05/20-compliance-scoring-and-remediation-workflows" }),
    ],
  },
  {
    n: 6,
    title: "Private Connectivity: VPN & Dedicated Circuits",
    lessons: [
      L(21, "site-to-site-vpn-fundamentals", "Site-to-Site VPN Fundamentals", { contentDir: "ch06/21-site-to-site-vpn-fundamentals" }),
      L(22, "azure-expressroute-and-aws-direct-connect", "Azure ExpressRoute and AWS Direct Connect", { contentDir: "ch06/22-azure-expressroute-and-aws-direct-connect" }),
      L(23, "when-vpn-is-enough-and-when-you-need-a-dedicated-circuit", "When VPN Is Enough and When You Need a Dedicated Circuit", { contentDir: "ch06/23-when-vpn-is-enough-and-when-you-need-a-dedicated-circuit" }),
      L(24, "point-to-site-vpn-for-remote-users", "Point-to-Site VPN for Remote Users", { contentDir: "ch06/24-point-to-site-vpn-for-remote-users" }),
    ],
  },
  {
    n: 7,
    title: "Compliance in the Cloud",
    lessons: [
      L(25, "the-shared-responsibility-model-revisited-for-compliance", "The Shared Responsibility Model, Revisited for Compliance", { contentDir: "ch07/25-the-shared-responsibility-model-revisited-for-compliance" }),
      L(26, "soc-2-and-iso-27001-applied-to-cloud-environments", "SOC 2 and ISO 27001 Applied to Cloud Environments", { contentDir: "ch07/26-soc-2-and-iso-27001-applied-to-cloud-environments" }),
      L(27, "compliance-frameworks-in-azure-and-aws-tooling", "Compliance Frameworks in Azure and AWS Tooling", { contentDir: "ch07/27-compliance-frameworks-in-azure-and-aws-tooling" }),
      L(28, "preparing-for-a-cloud-security-audit", "Preparing for a Cloud Security Audit", { contentDir: "ch07/28-preparing-for-a-cloud-security-audit" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Securing a Hybrid Cloud Environment",
    lessons: [
      L(29, "lab-setting-up-hybrid-identity-sync", "Lab: Setting Up Hybrid Identity Sync", { contentDir: "ch08/29-lab-setting-up-hybrid-identity-sync" }),
      L(30, "lab-encrypting-data-and-managing-secrets-end-to-end", "Lab: Encrypting Data and Managing Secrets End to End", { contentDir: "ch08/30-lab-encrypting-data-and-managing-secrets-end-to-end" }),
      L(31, "case-study-remediating-a-cspm-finding", "Case Study: Remediating a CSPM Finding", { contentDir: "ch08/31-case-study-remediating-a-cspm-finding" }),
      L(32, "chapter-capstone-identity-networking-and-security-review", "Chapter Capstone: Identity, Networking & Security Review", { contentDir: "ch08/32-chapter-capstone-identity-networking-and-security-review" }),
    ],
  },
];
