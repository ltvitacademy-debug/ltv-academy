// Security Engineering, IAM & System Hardening course outline. Lessons without a contentDir
// render as "in production". Course 8 of the Cybersecurity Analyst → Security Engineer path —
// the first course of the Advanced Specialization stage, moving from SOC analyst work into the
// engineering side of security: identity architecture, authentication systems, and hardening at
// an enterprise scale, building on the Job-Ready Foundation's AD/IAM basics.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/security-engineering-identity-management/
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

export const SECURITY_ENGINEERING_IDENTITY_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Identity Architecture at Enterprise Scale",
    lessons: [
      L(1, "from-soc-analyst-to-security-engineer-what-changes", "From SOC Analyst to Security Engineer: What Changes", { contentDir: "ch01/01-from-soc-analyst-to-security-engineer-what-changes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/from-soc-analyst-to-security-engineer-what-changes.mp4", durationLabel: "2 min 16 s" }),
      L(2, "identity-providers-and-the-identity-plane", "Identity Providers and the Identity Plane", { contentDir: "ch01/02-identity-providers-and-the-identity-plane", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/identity-providers-and-the-identity-plane.mp4", durationLabel: "2 min 17 s" }),
      L(3, "single-sign-on-and-how-saml-and-oidc-actually-work", "Single Sign-On and How SAML and OIDC Actually Work", { contentDir: "ch01/03-single-sign-on-and-how-saml-and-oidc-actually-work", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/single-sign-on-and-how-saml-and-oidc-actually-work.mp4", durationLabel: "2 min 29 s" }),
      L(4, "designing-an-identity-architecture-for-a-growing-org", "Designing an Identity Architecture for a Growing Org", { contentDir: "ch01/04-designing-an-identity-architecture-for-a-growing-org", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/designing-an-identity-architecture-for-a-growing-org.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 2,
    title: "Authentication Architecture",
    lessons: [
      L(5, "password-policy-engineering-beyond-the-basics", "Password Policy Engineering Beyond the Basics", { contentDir: "ch02/05-password-policy-engineering-beyond-the-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/password-policy-engineering-beyond-the-basics.mp4", durationLabel: "2 min 25 s" }),
      L(6, "designing-a-real-mfa-rollout", "Designing a Real MFA Rollout", { contentDir: "ch02/06-designing-a-real-mfa-rollout", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/designing-a-real-mfa-rollout.mp4", durationLabel: "2 min 23 s" }),
      L(7, "passwordless-authentication-fido2-and-passkeys", "Passwordless Authentication: FIDO2 and Passkeys", { contentDir: "ch02/07-passwordless-authentication-fido2-and-passkeys", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/passwordless-authentication-fido2-and-passkeys.mp4", durationLabel: "2 min 22 s" }),
      L(8, "service-account-and-non-human-identity-authentication", "Service Account and Non-Human Identity Authentication", { contentDir: "ch02/08-service-account-and-non-human-identity-authentication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/service-account-and-non-human-identity-authentication.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 3,
    title: "Authorization Models at Scale",
    lessons: [
      L(9, "rbac-design-for-a-real-organization", "RBAC Design for a Real Organization", { contentDir: "ch03/09-rbac-design-for-a-real-organization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/rbac-design-for-a-real-organization.mp4", durationLabel: "2 min 17 s" }),
      L(10, "attribute-based-access-control-abac", "Attribute-Based Access Control (ABAC)", { contentDir: "ch03/10-attribute-based-access-control-abac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/attribute-based-access-control-abac.mp4", durationLabel: "2 min 27 s" }),
      L(11, "privileged-access-management-pam-concepts", "Privileged Access Management (PAM) Concepts", { contentDir: "ch03/11-privileged-access-management-pam-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/privileged-access-management-pam-concepts.mp4", durationLabel: "2 min 15 s" }),
      L(12, "just-in-time-access-and-access-reviews", "Just-in-Time Access and Access Reviews", { contentDir: "ch03/12-just-in-time-access-and-access-reviews", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/just-in-time-access-and-access-reviews.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Windows System Hardening Engineering",
    lessons: [
      L(13, "building-a-gpo-baseline-from-a-real-benchmark", "Building a GPO Baseline from a Real Benchmark", { contentDir: "ch04/13-building-a-gpo-baseline-from-a-real-benchmark", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/building-a-gpo-baseline-from-a-real-benchmark.mp4", durationLabel: "2 min 31 s" }),
      L(14, "attack-surface-reduction-rules-in-depth", "Attack Surface Reduction Rules in Depth", { contentDir: "ch04/14-attack-surface-reduction-rules-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/attack-surface-reduction-rules-in-depth.mp4", durationLabel: "2 min 45 s" }),
      L(15, "credential-guard-and-lsa-protection", "Credential Guard and LSA Protection", { contentDir: "ch04/15-credential-guard-and-lsa-protection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/credential-guard-and-lsa-protection.mp4", durationLabel: "2 min 32 s" }),
      L(16, "measuring-hardening-effectiveness", "Measuring Hardening Effectiveness", { contentDir: "ch04/16-measuring-hardening-effectiveness", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/measuring-hardening-effectiveness.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 5,
    title: "Linux System Hardening Engineering",
    lessons: [
      L(17, "cis-benchmarks-for-linux-in-practice", "CIS Benchmarks for Linux in Practice", { contentDir: "ch05/17-cis-benchmarks-for-linux-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/cis-benchmarks-for-linux-in-practice.mp4", durationLabel: "2 min 24 s" }),
      L(18, "kernel-hardening-and-sysctl-parameters", "Kernel Hardening and sysctl Parameters", { contentDir: "ch05/18-kernel-hardening-and-sysctl-parameters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/kernel-hardening-and-sysctl-parameters.mp4", durationLabel: "2 min 25 s" }),
      L(19, "automating-linux-hardening-with-a-script-or-playbook", "Automating Linux Hardening with a Script or Playbook", { contentDir: "ch05/19-automating-linux-hardening-with-a-script-or-playbook", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/automating-linux-hardening-with-a-script-or-playbook.mp4", durationLabel: "2 min 13 s" }),
      L(20, "hardening-containers-not-just-hosts", "Hardening Containers, Not Just Hosts", { contentDir: "ch05/20-hardening-containers-not-just-hosts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/hardening-containers-not-just-hosts.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 6,
    title: "Identity Governance",
    lessons: [
      L(21, "identity-lifecycle-management-joiners-movers-leavers", "Identity Lifecycle Management: Joiners, Movers, Leavers", { contentDir: "ch06/21-identity-lifecycle-management-joiners-movers-leavers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/identity-lifecycle-management-joiners-movers-leavers.mp4", durationLabel: "2 min 17 s" }),
      L(22, "access-certification-campaigns", "Access Certification Campaigns", { contentDir: "ch06/22-access-certification-campaigns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/access-certification-campaigns.mp4", durationLabel: "2 min 14 s" }),
      L(23, "separation-of-duties-and-toxic-combinations", "Separation of Duties and Toxic Combinations", { contentDir: "ch06/23-separation-of-duties-and-toxic-combinations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/separation-of-duties-and-toxic-combinations.mp4", durationLabel: "2 min 17 s" }),
      L(24, "identity-governance-tooling-concepts", "Identity Governance Tooling Concepts", { contentDir: "ch06/24-identity-governance-tooling-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/identity-governance-tooling-concepts.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 7,
    title: "Engineering Security Controls, Not Just Operating Them",
    lessons: [
      L(25, "writing-a-security-control-as-code", "Writing a Security Control as Code", { contentDir: "ch07/25-writing-a-security-control-as-code", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/writing-a-security-control-as-code.mp4", durationLabel: "2 min 37 s" }),
      L(26, "testing-a-security-control-before-you-deploy-it", "Testing a Security Control Before You Deploy It", { contentDir: "ch07/26-testing-a-security-control-before-you-deploy-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/testing-a-security-control-before-you-deploy-it.mp4", durationLabel: "2 min 15 s" }),
      L(27, "rolling-out-a-control-without-breaking-the-business", "Rolling Out a Control Without Breaking the Business", { contentDir: "ch07/27-rolling-out-a-control-without-breaking-the-business", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/rolling-out-a-control-without-breaking-the-business.mp4", durationLabel: "2 min 16 s" }),
      L(28, "measuring-whether-a-control-actually-reduced-risk", "Measuring Whether a Control Actually Reduced Risk", { contentDir: "ch07/28-measuring-whether-a-control-actually-reduced-risk", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/measuring-whether-a-control-actually-reduced-risk.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Engineering an Identity & Hardening Program",
    lessons: [
      L(29, "lab-designing-an-identity-architecture-for-a-merger", "Lab: Designing an Identity Architecture for a Merger", { contentDir: "ch08/29-lab-designing-an-identity-architecture-for-a-merger", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/lab-designing-an-identity-architecture-for-a-merger.mp4", durationLabel: "2 min 35 s" }),
      L(30, "lab-building-and-rolling-out-a-hardening-baseline", "Lab: Building and Rolling Out a Hardening Baseline", { contentDir: "ch08/30-lab-building-and-rolling-out-a-hardening-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/lab-building-and-rolling-out-a-hardening-baseline.mp4", durationLabel: "2 min 29 s" }),
      L(31, "case-study-a-toxic-combination-nobody-caught", "Case Study: A Toxic Combination Nobody Caught", { contentDir: "ch08/31-case-study-a-toxic-combination-nobody-caught", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/case-study-a-toxic-combination-nobody-caught.mp4", durationLabel: "2 min 18 s" }),
      L(32, "chapter-capstone-security-engineering-review", "Chapter Capstone: Security Engineering Review", { contentDir: "ch08/32-chapter-capstone-security-engineering-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-security-engineering-identity-management/chapter-capstone-security-engineering-review.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
];
