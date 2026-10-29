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
      L(1, "why-the-perimeter-model-stopped-working", "Why the Perimeter Model Stopped Working", { contentDir: "ch01/01-why-the-perimeter-model-stopped-working" }),
      L(2, "the-nist-zero-trust-architecture-tenets", "The NIST Zero Trust Architecture Tenets", { contentDir: "ch01/02-the-nist-zero-trust-architecture-tenets" }),
      L(3, "the-policy-engine-policy-administrator-and-policy-enforcement-point", "The Policy Engine, Policy Administrator, and Policy Enforcement Point", { contentDir: "ch01/03-the-policy-engine-policy-administrator-and-policy-enforcement-point" }),
      L(4, "a-zero-trust-glossary-for-people-who-already-know-the-pieces", "A Zero Trust Glossary for People Who Already Know the Pieces", { contentDir: "ch01/04-a-zero-trust-glossary-for-people-who-already-know-the-pieces" }),
    ],
  },
  {
    n: 2,
    title: "Verifying Identity Explicitly",
    lessons: [
      L(5, "why-identity-is-the-new-perimeter", "Why Identity Is the New Perimeter", { contentDir: "ch02/05-why-identity-is-the-new-perimeter" }),
      L(6, "continuous-access-evaluation-not-just-login-time-checks", "Continuous Access Evaluation, Not Just Login-Time Checks", { contentDir: "ch02/06-continuous-access-evaluation-not-just-login-time-checks" }),
      L(7, "device-compliance-as-a-signal-in-the-access-decision", "Device Compliance as a Signal in the Access Decision", { contentDir: "ch02/07-device-compliance-as-a-signal-in-the-access-decision" }),
      L(8, "putting-pim-conditional-access-and-iam-roles-into-one-identity-fabric", "Putting PIM, Conditional Access, and IAM Roles into One Identity Fabric", { contentDir: "ch02/08-putting-pim-conditional-access-and-iam-roles-into-one-identity-fabric" }),
    ],
  },
  {
    n: 3,
    title: "Least-Privilege Access and Micro-Segmentation",
    lessons: [
      L(9, "from-flat-networks-to-micro-segments", "From Flat Networks to Micro-Segments", { contentDir: "ch03/09-from-flat-networks-to-micro-segments" }),
      L(10, "software-defined-perimeters-and-private-access-without-a-vpn", "Software-Defined Perimeters and Private Access Without a VPN", { contentDir: "ch03/10-software-defined-perimeters-and-private-access-without-a-vpn" }),
      L(11, "just-enough-access-applying-jit-pam-at-enterprise-scale", "Just-Enough Access: Applying JIT/PAM at Enterprise Scale", { contentDir: "ch03/11-just-enough-access-applying-jit-pam-at-enterprise-scale" }),
      L(12, "segmenting-a-hybrid-environment-cloud-and-on-prem-together", "Segmenting a Hybrid Environment: Cloud and On-Prem Together", { contentDir: "ch03/12-segmenting-a-hybrid-environment-cloud-and-on-prem-together" }),
    ],
  },
  {
    n: 4,
    title: "Assume Breach: Designing for Containment",
    lessons: [
      L(13, "assume-breach-as-a-design-principle-not-a-slogan", "Assume Breach as a Design Principle, Not a Slogan", { contentDir: "ch04/13-assume-breach-as-a-design-principle-not-a-slogan" }),
      L(14, "blast-radius-thinking-in-architecture-reviews", "Blast-Radius Thinking in Architecture Reviews", { contentDir: "ch04/14-blast-radius-thinking-in-architecture-reviews" }),
      L(15, "lateral-movement-and-the-controls-that-actually-stop-it", "Lateral Movement, and the Controls That Actually Stop It", { contentDir: "ch04/15-lateral-movement-and-the-controls-that-actually-stop-it" }),
      L(16, "automated-isolation-as-the-last-line-not-the-first-response", "Automated Isolation as the Last Line, Not the First Response", { contentDir: "ch04/16-automated-isolation-as-the-last-line-not-the-first-response" }),
    ],
  },
  {
    n: 5,
    title: "Zero Trust for Data and Applications",
    lessons: [
      L(17, "data-centric-security-protecting-the-asset-not-just-the-perimeter-around-it", "Data-Centric Security: Protecting the Asset, Not Just the Perimeter Around It", { contentDir: "ch05/17-data-centric-security-protecting-the-asset-not-just-the-perimeter-around-it" }),
      L(18, "zero-trust-for-apis-and-service-to-service-calls", "Zero Trust for APIs and Service-to-Service Calls", { contentDir: "ch05/18-zero-trust-for-apis-and-service-to-service-calls" }),
      L(19, "workload-identity-for-cicd-and-automation-not-just-humans", "Workload Identity for CI/CD and Automation, Not Just Humans", { contentDir: "ch05/19-workload-identity-for-cicd-and-automation-not-just-humans" }),
      L(20, "securing-saas-applications-outside-your-own-infrastructure", "Securing SaaS Applications Outside Your Own Infrastructure", { contentDir: "ch05/20-securing-saas-applications-outside-your-own-infrastructure" }),
    ],
  },
  {
    n: 6,
    title: "Measuring Zero Trust Maturity",
    lessons: [
      L(21, "the-cisa-zero-trust-maturity-model", "The CISA Zero Trust Maturity Model", { contentDir: "ch06/21-the-cisa-zero-trust-maturity-model" }),
      L(22, "scoring-your-own-environment-against-a-maturity-model", "Scoring Your Own Environment Against a Maturity Model", { contentDir: "ch06/22-scoring-your-own-environment-against-a-maturity-model" }),
      L(23, "metrics-that-prove-zero-trust-is-working-not-just-implemented", "Metrics That Prove Zero Trust Is Working, Not Just Implemented", { contentDir: "ch06/23-metrics-that-prove-zero-trust-is-working-not-just-implemented" }),
      L(24, "reporting-zero-trust-progress-to-people-who-arent-engineers", "Reporting Zero Trust Progress to People Who Aren't Engineers", { contentDir: "ch06/24-reporting-zero-trust-progress-to-people-who-arent-engineers" }),
    ],
  },
  {
    n: 7,
    title: "Building a Zero Trust Roadmap",
    lessons: [
      L(25, "sequencing-a-multi-year-zero-trust-rollout", "Sequencing a Multi-Year Zero Trust Rollout", { contentDir: "ch07/25-sequencing-a-multi-year-zero-trust-rollout" }),
      L(26, "what-to-fix-first-when-you-cant-fix-everything-at-once", "What to Fix First When You Can't Fix Everything at Once", { contentDir: "ch07/26-what-to-fix-first-when-you-cant-fix-everything-at-once" }),
      L(27, "getting-budget-and-buy-in-for-a-zero-trust-program", "Getting Budget and Buy-In for a Zero Trust Program", { contentDir: "ch07/27-getting-budget-and-buy-in-for-a-zero-trust-program" }),
      L(28, "avoiding-zero-trust-theater-implementation-that-doesnt-change-outcomes", "Avoiding \"Zero Trust Theater\": Implementation That Doesn't Change Outcomes", { contentDir: "ch07/28-avoiding-zero-trust-theater-implementation-that-doesnt-change-outcomes" }),
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
