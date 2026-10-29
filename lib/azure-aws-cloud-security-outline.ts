// Azure & AWS Cloud Security Engineering course outline. Lessons without a contentDir render
// as "in production". Course 9 of the Cybersecurity Analyst → Security Engineer path — the
// second course of the Advanced Specialization stage: dual-cloud security engineering across
// Azure and AWS, building on the Job-Ready Foundation's cloud security basics (identity,
// networking, SIEM, Sentinel/Defender) rather than re-teaching what a cloud or an IAM role is.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-aws-cloud-security/
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

export const AZURE_AWS_CLOUD_SECURITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Cloud Security Posture at Scale",
    lessons: [
      L(1, "the-shared-responsibility-model-in-practice-not-in-theory", "The Shared Responsibility Model in Practice, Not in Theory", { contentDir: "ch01/01-the-shared-responsibility-model-in-practice-not-in-theory" }),
      L(2, "why-securing-two-clouds-is-not-twice-the-work-of-securing-one", "Why Securing Two Clouds Is Not Twice the Work of Securing One", { contentDir: "ch01/02-why-securing-two-clouds-is-not-twice-the-work-of-securing-one" }),
      L(3, "building-a-cloud-security-baseline-from-cis-benchmarks", "Building a Cloud Security Baseline from CIS Benchmarks", { contentDir: "ch01/03-building-a-cloud-security-baseline-from-cis-benchmarks" }),
      L(4, "cloud-security-posture-management-what-csmp-actually-measures", "Cloud Security Posture Management: What CSPM Actually Measures", { contentDir: "ch01/04-cloud-security-posture-management-what-csmp-actually-measures" }),
    ],
  },
  {
    n: 2,
    title: "Azure Identity & Access Security",
    lessons: [
      L(5, "entra-id-conditional-access-policies-that-hold-up", "Entra ID Conditional Access Policies That Hold Up", { contentDir: "ch02/05-entra-id-conditional-access-policies-that-hold-up" }),
      L(6, "privileged-identity-management-pim-for-azure-roles", "Privileged Identity Management (PIM) for Azure Roles", { contentDir: "ch02/06-privileged-identity-management-pim-for-azure-roles" }),
      L(7, "azure-rbac-vs-azure-policy-when-each-one-is-the-right-tool", "Azure RBAC vs. Azure Policy: When Each One Is the Right Tool", { contentDir: "ch02/07-azure-rbac-vs-azure-policy-when-each-one-is-the-right-tool" }),
      L(8, "securing-service-principals-and-managed-identities", "Securing Service Principals and Managed Identities", { contentDir: "ch02/08-securing-service-principals-and-managed-identities" }),
    ],
  },
  {
    n: 3,
    title: "AWS Identity & Access Security",
    lessons: [
      L(9, "iam-policies-that-dont-grant-more-than-they-mean-to", "IAM Policies That Don't Grant More Than They Mean To", { contentDir: "ch03/09-iam-policies-that-dont-grant-more-than-they-mean-to" }),
      L(10, "aws-organizations-and-service-control-policies", "AWS Organizations and Service Control Policies", { contentDir: "ch03/10-aws-organizations-and-service-control-policies" }),
      L(11, "iam-roles-vs-users-and-the-case-against-long-lived-keys", "IAM Roles vs. Users, and the Case Against Long-Lived Keys", { contentDir: "ch03/11-iam-roles-vs-users-and-the-case-against-long-lived-keys" }),
      L(12, "aws-iam-access-analyzer-finding-unintended-access", "AWS IAM Access Analyzer: Finding Unintended Access", { contentDir: "ch03/12-aws-iam-access-analyzer-finding-unintended-access" }),
    ],
  },
  {
    n: 4,
    title: "Network Security Across Both Clouds",
    lessons: [
      L(13, "nsgs-and-security-groups-the-same-idea-two-syntaxes", "NSGs and Security Groups: The Same Idea, Two Syntaxes", { contentDir: "ch04/13-nsgs-and-security-groups-the-same-idea-two-syntaxes" }),
      L(14, "azure-firewall-and-aws-network-firewall-compared", "Azure Firewall and AWS Network Firewall Compared", { contentDir: "ch04/14-azure-firewall-and-aws-network-firewall-compared" }),
      L(15, "private-endpoints-and-privatelink-keeping-traffic-off-the-public-internet", "Private Endpoints and PrivateLink: Keeping Traffic Off the Public Internet", { contentDir: "ch04/15-private-endpoints-and-privatelink-keeping-traffic-off-the-public-internet" }),
      L(16, "segmenting-a-network-so-a-breach-doesnt-become-a-takeover", "Segmenting a Network So a Breach Doesn't Become a Takeover", { contentDir: "ch04/16-segmenting-a-network-so-a-breach-doesnt-become-a-takeover" }),
    ],
  },
  {
    n: 5,
    title: "Cloud-Native Security Tooling",
    lessons: [
      L(17, "microsoft-defender-for-cloud-coverage-and-alerts", "Microsoft Defender for Cloud: Coverage and Alerts", { contentDir: "ch05/17-microsoft-defender-for-cloud-coverage-and-alerts" }),
      L(18, "aws-security-hub-and-guardduty-in-practice", "AWS Security Hub and GuardDuty in Practice", { contentDir: "ch05/18-aws-security-hub-and-guardduty-in-practice" }),
      L(19, "cloud-workload-protection-for-vms-containers-and-serverless", "Cloud Workload Protection for VMs, Containers, and Serverless", { contentDir: "ch05/19-cloud-workload-protection-for-vms-containers-and-serverless" }),
      L(20, "triaging-a-cloud-security-alert-without-drowning-in-noise", "Triaging a Cloud Security Alert Without Drowning in Noise", { contentDir: "ch05/20-triaging-a-cloud-security-alert-without-drowning-in-noise" }),
    ],
  },
  {
    n: 6,
    title: "Data Protection in the Cloud",
    lessons: [
      L(21, "encryption-at-rest-and-in-transit-who-holds-the-key", "Encryption at Rest and in Transit: Who Holds the Key", { contentDir: "ch06/21-encryption-at-rest-and-in-transit-who-holds-the-key" }),
      L(22, "azure-key-vault-and-aws-kms-managing-secrets-and-keys", "Azure Key Vault and AWS KMS: Managing Secrets and Keys", { contentDir: "ch06/22-azure-key-vault-and-aws-kms-managing-secrets-and-keys" }),
      L(23, "the-public-storage-bucket-problem-and-how-to-actually-prevent-it", "The Public Storage Bucket Problem, and How to Actually Prevent It", { contentDir: "ch06/23-the-public-storage-bucket-problem-and-how-to-actually-prevent-it" }),
      L(24, "data-classification-and-why-it-comes-before-a-dlp-tool", "Data Classification, and Why It Comes Before a DLP Tool", { contentDir: "ch06/24-data-classification-and-why-it-comes-before-a-dlp-tool" }),
    ],
  },
  {
    n: 7,
    title: "Detecting and Responding to Cloud Attacks",
    lessons: [
      L(25, "how-a-leaked-cloud-credential-actually-gets-abused", "How a Leaked Cloud Credential Actually Gets Abused", { contentDir: "ch07/25-how-a-leaked-cloud-credential-actually-gets-abused" }),
      L(26, "detecting-privilege-escalation-inside-azure-and-aws", "Detecting Privilege Escalation Inside Azure and AWS", { contentDir: "ch07/26-detecting-privilege-escalation-inside-azure-and-aws" }),
      L(27, "cloudtrail-and-azure-activity-log-as-your-investigation-source-of-truth", "CloudTrail and Azure Activity Log as Your Investigation Source of Truth", { contentDir: "ch07/27-cloudtrail-and-azure-activity-log-as-your-investigation-source-of-truth" }),
      L(28, "containing-an-incident-in-a-cloud-account-without-cloud-wide-downtime", "Containing an Incident in a Cloud Account Without Cloud-Wide Downtime", { contentDir: "ch07/28-containing-an-incident-in-a-cloud-account-without-cloud-wide-downtime" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Securing a Multi-Cloud Environment",
    lessons: [
      L(29, "lab-hardening-identity-and-network-across-azure-and-aws", "Lab: Hardening Identity and Network Across Azure and AWS", { contentDir: "ch08/29-lab-hardening-identity-and-network-across-azure-and-aws" }),
      L(30, "lab-responding-to-a-simulated-cloud-credential-compromise", "Lab: Responding to a Simulated Cloud Credential Compromise", { contentDir: "ch08/30-lab-responding-to-a-simulated-cloud-credential-compromise" }),
      L(31, "case-study-a-misconfigured-role-that-exposed-a-whole-subscription", "Case Study: A Misconfigured Role That Exposed a Whole Subscription", { contentDir: "ch08/31-case-study-a-misconfigured-role-that-exposed-a-whole-subscription" }),
      L(32, "chapter-capstone-cloud-security-engineering-review", "Chapter Capstone: Cloud Security Engineering Review", { contentDir: "ch08/32-chapter-capstone-cloud-security-engineering-review" }),
    ],
  },
];
