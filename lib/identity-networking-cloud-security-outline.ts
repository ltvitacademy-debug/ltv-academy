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
      L(1, "why-hybrid-identity-exists", "Why Hybrid Identity Exists", { contentDir: "ch01/01-why-hybrid-identity-exists", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/why-hybrid-identity-exists.mp4", durationLabel: "2 min 10 s" }),
      L(2, "microsoft-entra-connect-and-directory-synchronization", "Microsoft Entra Connect and Directory Synchronization", { contentDir: "ch01/02-microsoft-entra-connect-and-directory-synchronization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/microsoft-entra-connect-and-directory-synchronization.mp4", durationLabel: "2 min 10 s" }),
      L(3, "federation-vs-password-hash-sync", "Federation vs. Password Hash Sync", { contentDir: "ch01/03-federation-vs-password-hash-sync", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/federation-vs-password-hash-sync.mp4", durationLabel: "2 min 13 s" }),
      L(4, "aws-iam-identity-center-and-external-identity-providers", "AWS IAM Identity Center and External Identity Providers", { contentDir: "ch01/04-aws-iam-identity-center-and-external-identity-providers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/aws-iam-identity-center-and-external-identity-providers.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 2,
    title: "Zero Trust Networking Principles",
    lessons: [
      L(5, "never-trust-always-verify-what-zero-trust-actually-means", "Never Trust, Always Verify: What Zero Trust Actually Means", { contentDir: "ch02/05-never-trust-always-verify-what-zero-trust-actually-means", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/never-trust-always-verify-what-zero-trust-actually-means.mp4", durationLabel: "2 min 13 s" }),
      L(6, "microsegmentation-applied-to-cloud-networks", "Microsegmentation Applied to Cloud Networks", { contentDir: "ch02/06-microsegmentation-applied-to-cloud-networks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/microsegmentation-applied-to-cloud-networks.mp4", durationLabel: "2 min 27 s" }),
      L(7, "identity-as-the-new-perimeter", "Identity as the New Perimeter", { contentDir: "ch02/07-identity-as-the-new-perimeter", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/identity-as-the-new-perimeter.mp4", durationLabel: "2 min 3 s" }),
      L(8, "continuous-verification-and-conditional-access-policies", "Continuous Verification and Conditional Access Policies", { contentDir: "ch02/08-continuous-verification-and-conditional-access-policies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/continuous-verification-and-conditional-access-policies.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 3,
    title: "Cloud Encryption: At Rest and In Transit",
    lessons: [
      L(9, "encryption-at-rest-how-cloud-providers-actually-do-it", "Encryption at Rest: How Cloud Providers Actually Do It", { contentDir: "ch03/09-encryption-at-rest-how-cloud-providers-actually-do-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/encryption-at-rest-how-cloud-providers-actually-do-it.mp4", durationLabel: "2 min 16 s" }),
      L(10, "azure-key-vault-and-aws-kms-concepts", "Azure Key Vault and AWS KMS Concepts", { contentDir: "ch03/10-azure-key-vault-and-aws-kms-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/azure-key-vault-and-aws-kms-concepts.mp4", durationLabel: "2 min 32 s" }),
      L(11, "customer-managed-vs-platform-managed-keys", "Customer-Managed vs. Platform-Managed Keys", { contentDir: "ch03/11-customer-managed-vs-platform-managed-keys", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/customer-managed-vs-platform-managed-keys.mp4", durationLabel: "2 min 25 s" }),
      L(12, "tls-and-encryption-in-transit-for-cloud-services", "TLS and Encryption in Transit for Cloud Services", { contentDir: "ch03/12-tls-and-encryption-in-transit-for-cloud-services", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/tls-and-encryption-in-transit-for-cloud-services.mp4", durationLabel: "2 min 37 s" }),
    ],
  },
  {
    n: 4,
    title: "Secrets Management in the Cloud",
    lessons: [
      L(13, "why-you-never-hardcode-a-secret", "Why You Never Hardcode a Secret", { contentDir: "ch04/13-why-you-never-hardcode-a-secret", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/why-you-never-hardcode-a-secret.mp4", durationLabel: "2 min 2 s" }),
      L(14, "azure-key-vault-secrets-in-practice", "Azure Key Vault Secrets in Practice", { contentDir: "ch04/14-azure-key-vault-secrets-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/azure-key-vault-secrets-in-practice.mp4", durationLabel: "2 min 4 s" }),
      L(15, "aws-secrets-manager-and-parameter-store", "AWS Secrets Manager and Parameter Store", { contentDir: "ch04/15-aws-secrets-manager-and-parameter-store", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/aws-secrets-manager-and-parameter-store.mp4", durationLabel: "2 min 11 s" }),
      L(16, "secret-rotation-and-access-policies", "Secret Rotation and Access Policies", { contentDir: "ch04/16-secret-rotation-and-access-policies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/secret-rotation-and-access-policies.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 5,
    title: "Cloud Security Posture Management",
    lessons: [
      L(17, "what-cspm-actually-does", "What CSPM Actually Does", { contentDir: "ch05/17-what-cspm-actually-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/what-cspm-actually-does.mp4", durationLabel: "2 min 40 s" }),
      L(18, "common-cloud-misconfigurations-cspm-catches", "Common Cloud Misconfigurations CSPM Catches", { contentDir: "ch05/18-common-cloud-misconfigurations-cspm-catches", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/common-cloud-misconfigurations-cspm-catches.mp4", durationLabel: "2 min 27 s" }),
      L(19, "microsoft-defender-for-cloud-and-aws-security-hub-concepts", "Microsoft Defender for Cloud and AWS Security Hub Concepts", { contentDir: "ch05/19-microsoft-defender-for-cloud-and-aws-security-hub-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/microsoft-defender-for-cloud-and-aws-security-hub-concepts.mp4", durationLabel: "2 min 26 s" }),
      L(20, "compliance-scoring-and-remediation-workflows", "Compliance Scoring and Remediation Workflows", { contentDir: "ch05/20-compliance-scoring-and-remediation-workflows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/compliance-scoring-and-remediation-workflows.mp4", durationLabel: "2 min 32 s" }),
    ],
  },
  {
    n: 6,
    title: "Private Connectivity: VPN & Dedicated Circuits",
    lessons: [
      L(21, "site-to-site-vpn-fundamentals", "Site-to-Site VPN Fundamentals", { contentDir: "ch06/21-site-to-site-vpn-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/site-to-site-vpn-fundamentals.mp4", durationLabel: "2 min 20 s" }),
      L(22, "azure-expressroute-and-aws-direct-connect", "Azure ExpressRoute and AWS Direct Connect", { contentDir: "ch06/22-azure-expressroute-and-aws-direct-connect", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/azure-expressroute-and-aws-direct-connect.mp4", durationLabel: "2 min 12 s" }),
      L(23, "when-vpn-is-enough-and-when-you-need-a-dedicated-circuit", "When VPN Is Enough and When You Need a Dedicated Circuit", { contentDir: "ch06/23-when-vpn-is-enough-and-when-you-need-a-dedicated-circuit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/when-vpn-is-enough-and-when-you-need-a-dedicated-circuit.mp4", durationLabel: "2 min 11 s" }),
      L(24, "point-to-site-vpn-for-remote-users", "Point-to-Site VPN for Remote Users", { contentDir: "ch06/24-point-to-site-vpn-for-remote-users", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/point-to-site-vpn-for-remote-users.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 7,
    title: "Compliance in the Cloud",
    lessons: [
      L(25, "the-shared-responsibility-model-revisited-for-compliance", "The Shared Responsibility Model, Revisited for Compliance", { contentDir: "ch07/25-the-shared-responsibility-model-revisited-for-compliance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/the-shared-responsibility-model-revisited-for-compliance.mp4", durationLabel: "2 min 26 s" }),
      L(26, "soc-2-and-iso-27001-applied-to-cloud-environments", "SOC 2 and ISO 27001 Applied to Cloud Environments", { contentDir: "ch07/26-soc-2-and-iso-27001-applied-to-cloud-environments", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/soc-2-and-iso-27001-applied-to-cloud-environments.mp4", durationLabel: "2 min 39 s" }),
      L(27, "compliance-frameworks-in-azure-and-aws-tooling", "Compliance Frameworks in Azure and AWS Tooling", { contentDir: "ch07/27-compliance-frameworks-in-azure-and-aws-tooling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/compliance-frameworks-in-azure-and-aws-tooling.mp4", durationLabel: "2 min 27 s" }),
      L(28, "preparing-for-a-cloud-security-audit", "Preparing for a Cloud Security Audit", { contentDir: "ch07/28-preparing-for-a-cloud-security-audit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/preparing-for-a-cloud-security-audit.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Securing a Hybrid Cloud Environment",
    lessons: [
      L(29, "lab-setting-up-hybrid-identity-sync", "Lab: Setting Up Hybrid Identity Sync", { contentDir: "ch08/29-lab-setting-up-hybrid-identity-sync", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/lab-setting-up-hybrid-identity-sync.mp4", durationLabel: "3 min 3 s" }),
      L(30, "lab-encrypting-data-and-managing-secrets-end-to-end", "Lab: Encrypting Data and Managing Secrets End to End", { contentDir: "ch08/30-lab-encrypting-data-and-managing-secrets-end-to-end", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/lab-encrypting-data-and-managing-secrets-end-to-end.mp4", durationLabel: "2 min 43 s" }),
      L(31, "case-study-remediating-a-cspm-finding", "Case Study: Remediating a CSPM Finding", { contentDir: "ch08/31-case-study-remediating-a-cspm-finding", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/case-study-remediating-a-cspm-finding.mp4", durationLabel: "2 min 46 s" }),
      L(32, "chapter-capstone-identity-networking-and-security-review", "Chapter Capstone: Identity, Networking & Security Review", { contentDir: "ch08/32-chapter-capstone-identity-networking-and-security-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-identity-networking-cloud-security/chapter-capstone-identity-networking-and-security-review.mp4", durationLabel: "2 min 52 s" }),
    ],
  },
];
