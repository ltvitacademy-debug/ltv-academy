// Zero Trust Implementation & Security Engineering Capstone course outline. Lessons without a
// contentDir render as "in production". Course 11 of the Cybersecurity Analyst → Security
// Engineer path — the fourth and final course of the Advanced Specialization stage: a zero-trust
// architecture synthesis that pulls together identity (course 8), dual-cloud security (course 9),
// and security automation/DevSecOps (course 10) into one enterprise design-and-defend capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/zero-trust-enterprise-security-capstone/
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

export const ZERO_TRUST_ENTERPRISE_SECURITY_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Zero Trust Principles",
    lessons: [
      L(1, "why-the-perimeter-model-stopped-working", "Why the Perimeter Model Stopped Working", { contentDir: "ch01/01-why-the-perimeter-model-stopped-working", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/why-the-perimeter-model-stopped-working.mp4", durationLabel: "2 min 29 s" }),
      L(2, "the-nist-zero-trust-architecture-tenets", "The NIST Zero Trust Architecture Tenets", { contentDir: "ch01/02-the-nist-zero-trust-architecture-tenets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/the-nist-zero-trust-architecture-tenets.mp4", durationLabel: "2 min 30 s" }),
      L(3, "the-policy-engine-policy-administrator-and-policy-enforcement-point", "The Policy Engine, Policy Administrator, and Policy Enforcement Point", { contentDir: "ch01/03-the-policy-engine-policy-administrator-and-policy-enforcement-point", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/the-policy-engine-policy-administrator-and-policy-enforcement-point.mp4", durationLabel: "2 min 24 s" }),
      L(4, "a-zero-trust-glossary-for-people-who-already-know-the-pieces", "A Zero Trust Glossary for People Who Already Know the Pieces", { contentDir: "ch01/04-a-zero-trust-glossary-for-people-who-already-know-the-pieces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/a-zero-trust-glossary-for-people-who-already-know-the-pieces.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 2,
    title: "Verifying Identity Explicitly",
    lessons: [
      L(5, "why-identity-is-the-new-perimeter", "Why Identity Is the New Perimeter", { contentDir: "ch02/05-why-identity-is-the-new-perimeter", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/why-identity-is-the-new-perimeter.mp4", durationLabel: "2 min 46 s" }),
      L(6, "continuous-access-evaluation-not-just-login-time-checks", "Continuous Access Evaluation, Not Just Login-Time Checks", { contentDir: "ch02/06-continuous-access-evaluation-not-just-login-time-checks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/continuous-access-evaluation-not-just-login-time-checks.mp4", durationLabel: "2 min 53 s" }),
      L(7, "device-compliance-as-a-signal-in-the-access-decision", "Device Compliance as a Signal in the Access Decision", { contentDir: "ch02/07-device-compliance-as-a-signal-in-the-access-decision", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/device-compliance-as-a-signal-in-the-access-decision.mp4", durationLabel: "2 min 43 s" }),
      L(8, "putting-pim-conditional-access-and-iam-roles-into-one-identity-fabric", "Putting PIM, Conditional Access, and IAM Roles into One Identity Fabric", { contentDir: "ch02/08-putting-pim-conditional-access-and-iam-roles-into-one-identity-fabric", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/putting-pim-conditional-access-and-iam-roles-into-one-identity-fabric.mp4", durationLabel: "3 min 5 s" }),
    ],
  },
  {
    n: 3,
    title: "Least-Privilege Access and Micro-Segmentation",
    lessons: [
      L(9, "from-flat-networks-to-micro-segments", "From Flat Networks to Micro-Segments", { contentDir: "ch03/09-from-flat-networks-to-micro-segments", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/from-flat-networks-to-micro-segments.mp4", durationLabel: "2 min 47 s" }),
      L(10, "software-defined-perimeters-and-private-access-without-a-vpn", "Software-Defined Perimeters and Private Access Without a VPN", { contentDir: "ch03/10-software-defined-perimeters-and-private-access-without-a-vpn", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/software-defined-perimeters-and-private-access-without-a-vpn.mp4", durationLabel: "2 min 27 s" }),
      L(11, "just-enough-access-applying-jit-pam-at-enterprise-scale", "Just-Enough Access: Applying JIT/PAM at Enterprise Scale", { contentDir: "ch03/11-just-enough-access-applying-jit-pam-at-enterprise-scale", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/just-enough-access-applying-jit-pam-at-enterprise-scale.mp4", durationLabel: "2 min 28 s" }),
      L(12, "segmenting-a-hybrid-environment-cloud-and-on-prem-together", "Segmenting a Hybrid Environment: Cloud and On-Prem Together", { contentDir: "ch03/12-segmenting-a-hybrid-environment-cloud-and-on-prem-together", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/segmenting-a-hybrid-environment-cloud-and-on-prem-together.mp4", durationLabel: "2 min 41 s" }),
    ],
  },
  {
    n: 4,
    title: "Assume Breach: Designing for Containment",
    lessons: [
      L(13, "assume-breach-as-a-design-principle-not-a-slogan", "Assume Breach as a Design Principle, Not a Slogan", { contentDir: "ch04/13-assume-breach-as-a-design-principle-not-a-slogan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/assume-breach-as-a-design-principle-not-a-slogan.mp4", durationLabel: "2 min 46 s" }),
      L(14, "blast-radius-thinking-in-architecture-reviews", "Blast-Radius Thinking in Architecture Reviews", { contentDir: "ch04/14-blast-radius-thinking-in-architecture-reviews", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/blast-radius-thinking-in-architecture-reviews.mp4", durationLabel: "2 min 41 s" }),
      L(15, "lateral-movement-and-the-controls-that-actually-stop-it", "Lateral Movement, and the Controls That Actually Stop It", { contentDir: "ch04/15-lateral-movement-and-the-controls-that-actually-stop-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/lateral-movement-and-the-controls-that-actually-stop-it.mp4", durationLabel: "2 min 45 s" }),
      L(16, "automated-isolation-as-the-last-line-not-the-first-response", "Automated Isolation as the Last Line, Not the First Response", { contentDir: "ch04/16-automated-isolation-as-the-last-line-not-the-first-response", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/automated-isolation-as-the-last-line-not-the-first-response.mp4", durationLabel: "2 min 37 s" }),
    ],
  },
  {
    n: 5,
    title: "Zero Trust for Data and Applications",
    lessons: [
      L(17, "data-centric-security-protecting-the-asset-not-just-the-perimeter-around-it", "Data-Centric Security: Protecting the Asset, Not Just the Perimeter Around It", { contentDir: "ch05/17-data-centric-security-protecting-the-asset-not-just-the-perimeter-around-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/data-centric-security-protecting-the-asset-not-just-the-perimeter-around-it.mp4", durationLabel: "2 min 25 s" }),
      L(18, "zero-trust-for-apis-and-service-to-service-calls", "Zero Trust for APIs and Service-to-Service Calls", { contentDir: "ch05/18-zero-trust-for-apis-and-service-to-service-calls", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/zero-trust-for-apis-and-service-to-service-calls.mp4", durationLabel: "2 min 22 s" }),
      L(19, "workload-identity-for-cicd-and-automation-not-just-humans", "Workload Identity for CI/CD and Automation, Not Just Humans", { contentDir: "ch05/19-workload-identity-for-cicd-and-automation-not-just-humans", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/workload-identity-for-cicd-and-automation-not-just-humans.mp4", durationLabel: "2 min 26 s" }),
      L(20, "securing-saas-applications-outside-your-own-infrastructure", "Securing SaaS Applications Outside Your Own Infrastructure", { contentDir: "ch05/20-securing-saas-applications-outside-your-own-infrastructure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/securing-saas-applications-outside-your-own-infrastructure.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 6,
    title: "Measuring Zero Trust Maturity",
    lessons: [
      L(21, "the-cisa-zero-trust-maturity-model", "The CISA Zero Trust Maturity Model", { contentDir: "ch06/21-the-cisa-zero-trust-maturity-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/the-cisa-zero-trust-maturity-model.mp4", durationLabel: "3 min 17 s" }),
      L(22, "scoring-your-own-environment-against-a-maturity-model", "Scoring Your Own Environment Against a Maturity Model", { contentDir: "ch06/22-scoring-your-own-environment-against-a-maturity-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/scoring-your-own-environment-against-a-maturity-model.mp4", durationLabel: "2 min 46 s" }),
      L(23, "metrics-that-prove-zero-trust-is-working-not-just-implemented", "Metrics That Prove Zero Trust Is Working, Not Just Implemented", { contentDir: "ch06/23-metrics-that-prove-zero-trust-is-working-not-just-implemented", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/metrics-that-prove-zero-trust-is-working-not-just-implemented.mp4", durationLabel: "2 min 45 s" }),
      L(24, "reporting-zero-trust-progress-to-people-who-arent-engineers", "Reporting Zero Trust Progress to People Who Aren't Engineers", { contentDir: "ch06/24-reporting-zero-trust-progress-to-people-who-arent-engineers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/reporting-zero-trust-progress-to-people-who-arent-engineers.mp4", durationLabel: "2 min 52 s" }),
    ],
  },
  {
    n: 7,
    title: "Building a Zero Trust Roadmap",
    lessons: [
      L(25, "sequencing-a-multi-year-zero-trust-rollout", "Sequencing a Multi-Year Zero Trust Rollout", { contentDir: "ch07/25-sequencing-a-multi-year-zero-trust-rollout" }),
      L(26, "what-to-fix-first-when-you-cant-fix-everything-at-once", "What to Fix First When You Can't Fix Everything at Once", { contentDir: "ch07/26-what-to-fix-first-when-you-cant-fix-everything-at-once", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/what-to-fix-first-when-you-cant-fix-everything-at-once.mp4", durationLabel: "2 min 22 s" }),
      L(27, "getting-budget-and-buy-in-for-a-zero-trust-program", "Getting Budget and Buy-In for a Zero Trust Program", { contentDir: "ch07/27-getting-budget-and-buy-in-for-a-zero-trust-program", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/getting-budget-and-buy-in-for-a-zero-trust-program.mp4", durationLabel: "2 min 18 s" }),
      L(28, "avoiding-zero-trust-theater-implementation-that-doesnt-change-outcomes", "Avoiding \"Zero Trust Theater\": Implementation That Doesn't Change Outcomes", { contentDir: "ch07/28-avoiding-zero-trust-theater-implementation-that-doesnt-change-outcomes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-zero-trust-enterprise-security-capstone/avoiding-zero-trust-theater-implementation-that-doesnt-change-outcomes.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Designing and Defending an Enterprise Zero Trust Architecture",
    lessons: [
      L(29, "lab-designing-a-zero-trust-architecture-for-a-hybrid-enterprise", "Lab: Designing a Zero Trust Architecture for a Hybrid Enterprise", { contentDir: "ch08/29-lab-designing-a-zero-trust-architecture-for-a-hybrid-enterprise" }),
      L(30, "lab-building-the-maturity-scorecard-and-rollout-roadmap", "Lab: Building the Maturity Scorecard and Rollout Roadmap", { contentDir: "ch08/30-lab-building-the-maturity-scorecard-and-rollout-roadmap" }),
      L(31, "case-study-a-zero-trust-rollout-that-looked-complete-on-paper", "Case Study: A Zero Trust Rollout That Looked Complete on Paper", { contentDir: "ch08/31-case-study-a-zero-trust-rollout-that-looked-complete-on-paper" }),
      L(32, "chapter-capstone-advanced-specialization-review-and-whats-next", "Chapter Capstone: Advanced Specialization Review and What's Next", { contentDir: "ch08/32-chapter-capstone-advanced-specialization-review-and-whats-next" }),
    ],
  },
];
