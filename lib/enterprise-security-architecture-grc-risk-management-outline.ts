// Enterprise Security Architecture, GRC & Risk Management course outline. Lessons without a
// contentDir render as "in production". Course 15 of the Cybersecurity Analyst → Security
// Engineer path — the fourth and final Expert Specialization course, closing the entire
// 15-course path. Builds on the whole path: security engineering, cloud security, zero trust,
// and the three other Expert courses.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-security-architecture-grc-risk-management/
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

export const ENTERPRISE_SECURITY_ARCHITECTURE_GRC_RISK_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Enterprise Security Architecture Principles",
    lessons: [
      L(1, "what-a-security-architect-actually-does-that-an-engineer-doesnt", "What a Security Architect Actually Does That an Engineer Doesn't", { contentDir: "ch01/01-what-a-security-architect-actually-does-that-an-engineer-doesnt", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/what-a-security-architect-actually-does-that-an-engineer-doesnt.mp4", durationLabel: "2 min 37 s" }),
      L(2, "security-architecture-as-a-set-of-tradeoffs-not-a-checklist", "Security Architecture as a Set of Tradeoffs, Not a Checklist", { contentDir: "ch01/02-security-architecture-as-a-set-of-tradeoffs-not-a-checklist", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/security-architecture-as-a-set-of-tradeoffs-not-a-checklist.mp4", durationLabel: "2 min 39 s" }),
      L(3, "defense-in-depth-at-enterprise-scale-revisited", "Defense in Depth at Enterprise Scale, Revisited", { contentDir: "ch01/03-defense-in-depth-at-enterprise-scale-revisited", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/defense-in-depth-at-enterprise-scale-revisited.mp4", durationLabel: "2 min 39 s" }),
      L(4, "aligning-security-architecture-with-business-strategy", "Aligning Security Architecture with Business Strategy", { contentDir: "ch01/04-aligning-security-architecture-with-business-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/aligning-security-architecture-with-business-strategy.mp4", durationLabel: "2 min 48 s" }),
    ],
  },
  {
    n: 2,
    title: "Security Architecture Frameworks",
    lessons: [
      L(5, "the-sabsa-framework-business-driven-security-architecture", "The SABSA Framework: Business-Driven Security Architecture", { contentDir: "ch02/05-the-sabsa-framework-business-driven-security-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/the-sabsa-framework-business-driven-security-architecture.mp4", durationLabel: "2 min 48 s" }),
      L(6, "togaf-and-where-security-fits-into-enterprise-architecture", "TOGAF, and Where Security Fits into Enterprise Architecture", { contentDir: "ch02/06-togaf-and-where-security-fits-into-enterprise-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/togaf-and-where-security-fits-into-enterprise-architecture.mp4", durationLabel: "3 min 0 s" }),
      L(7, "the-zero-trust-maturity-model-as-an-architecture-input", "The Zero Trust Maturity Model as an Architecture Input", { contentDir: "ch02/07-the-zero-trust-maturity-model-as-an-architecture-input", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/the-zero-trust-maturity-model-as-an-architecture-input.mp4", durationLabel: "2 min 38 s" }),
      L(8, "choosing-and-adapting-a-framework-for-a-real-organization", "Choosing and Adapting a Framework for a Real Organization", { contentDir: "ch02/08-choosing-and-adapting-a-framework-for-a-real-organization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/choosing-and-adapting-a-framework-for-a-real-organization.mp4", durationLabel: "2 min 59 s" }),
    ],
  },
  {
    n: 3,
    title: "Risk Management Fundamentals",
    lessons: [
      L(9, "the-real-risk-equation-likelihood-impact-and-what-they-miss", "The Real Risk Equation: Likelihood, Impact, and What They Miss", { contentDir: "ch03/09-the-real-risk-equation-likelihood-impact-and-what-they-miss", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/the-real-risk-equation-likelihood-impact-and-what-they-miss.mp4", durationLabel: "2 min 40 s" }),
      L(10, "qualitative-vs-quantitative-risk-assessment", "Qualitative vs. Quantitative Risk Assessment", { contentDir: "ch03/10-qualitative-vs-quantitative-risk-assessment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/qualitative-vs-quantitative-risk-assessment.mp4", durationLabel: "2 min 19 s" }),
      L(11, "fair-factor-analysis-of-information-risk-in-practice", "FAIR (Factor Analysis of Information Risk) in Practice", { contentDir: "ch03/11-fair-factor-analysis-of-information-risk-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/fair-factor-analysis-of-information-risk-in-practice.mp4", durationLabel: "2 min 28 s" }),
      L(12, "risk-registers-and-treatment-accept-mitigate-transfer-avoid", "Risk Registers and Treatment: Accept, Mitigate, Transfer, Avoid", { contentDir: "ch03/12-risk-registers-and-treatment-accept-mitigate-transfer-avoid", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/risk-registers-and-treatment-accept-mitigate-transfer-avoid.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 4,
    title: "Governance, Risk, and Compliance Programs",
    lessons: [
      L(13, "what-a-real-grc-program-actually-coordinates", "What a Real GRC Program Actually Coordinates", { contentDir: "ch04/13-what-a-real-grc-program-actually-coordinates", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/what-a-real-grc-program-actually-coordinates.mp4", durationLabel: "2 min 17 s" }),
      L(14, "security-policy-standards-and-procedures-the-real-hierarchy", "Security Policy, Standards, and Procedures: The Real Hierarchy", { contentDir: "ch04/14-security-policy-standards-and-procedures-the-real-hierarchy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/security-policy-standards-and-procedures-the-real-hierarchy.mp4", durationLabel: "2 min 13 s" }),
      L(15, "grc-tooling-and-what-it-actually-automates", "GRC Tooling and What It Actually Automates", { contentDir: "ch04/15-grc-tooling-and-what-it-actually-automates", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/grc-tooling-and-what-it-actually-automates.mp4", durationLabel: "2 min 20 s" }),
      L(16, "building-a-culture-where-grc-isnt-just-a-checkbox", "Building a Culture Where GRC Isn't Just a Checkbox", { contentDir: "ch04/16-building-a-culture-where-grc-isnt-just-a-checkbox", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/building-a-culture-where-grc-isnt-just-a-checkbox.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
  {
    n: 5,
    title: "Regulatory Compliance Frameworks",
    lessons: [
      L(17, "soc-2-and-what-an-auditor-actually-tests", "SOC 2, and What an Auditor Actually Tests", { contentDir: "ch05/17-soc-2-and-what-an-auditor-actually-tests", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/soc-2-and-what-an-auditor-actually-tests.mp4", durationLabel: "2 min 30 s" }),
      L(18, "iso-27001-the-isms-and-the-statement-of-applicability", "ISO 27001: The ISMS and the Statement of Applicability", { contentDir: "ch05/18-iso-27001-the-isms-and-the-statement-of-applicability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/iso-27001-the-isms-and-the-statement-of-applicability.mp4", durationLabel: "2 min 58 s" }),
      L(19, "pci-dss-and-hipaa-when-industry-specific-regulation-applies", "PCI DSS and HIPAA: When Industry-Specific Regulation Applies", { contentDir: "ch05/19-pci-dss-and-hipaa-when-industry-specific-regulation-applies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/pci-dss-and-hipaa-when-industry-specific-regulation-applies.mp4", durationLabel: "2 min 40 s" }),
      L(20, "mapping-one-control-to-multiple-frameworks", "Mapping One Control to Multiple Frameworks", { contentDir: "ch05/20-mapping-one-control-to-multiple-frameworks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/mapping-one-control-to-multiple-frameworks.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 6,
    title: "Third-Party and Vendor Risk Management",
    lessons: [
      L(21, "why-your-vendors-risk-is-your-risk", "Why Your Vendor's Risk Is Your Risk", { contentDir: "ch06/21-why-your-vendors-risk-is-your-risk", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/why-your-vendors-risk-is-your-risk.mp4", durationLabel: "2 min 49 s" }),
      L(22, "vendor-security-assessments-and-questionnaires-that-work", "Vendor Security Assessments and Questionnaires That Work", { contentDir: "ch06/22-vendor-security-assessments-and-questionnaires-that-work", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/vendor-security-assessments-and-questionnaires-that-work.mp4", durationLabel: "2 min 43 s" }),
      L(23, "contractual-security-requirements-and-right-to-audit-clauses", "Contractual Security Requirements and Right-to-Audit Clauses", { contentDir: "ch06/23-contractual-security-requirements-and-right-to-audit-clauses", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/contractual-security-requirements-and-right-to-audit-clauses.mp4", durationLabel: "2 min 20 s" }),
      L(24, "ongoing-vendor-monitoring-not-just-a-one-time-review", "Ongoing Vendor Monitoring, Not Just a One-Time Review", { contentDir: "ch06/24-ongoing-vendor-monitoring-not-just-a-one-time-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/ongoing-vendor-monitoring-not-just-a-one-time-review.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 7,
    title: "Security Metrics and Board Reporting",
    lessons: [
      L(25, "metrics-that-mean-something-to-a-board-not-just-engineers", "Metrics That Mean Something to a Board, Not Just Engineers", { contentDir: "ch07/25-metrics-that-mean-something-to-a-board-not-just-engineers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/metrics-that-mean-something-to-a-board-not-just-engineers.mp4", durationLabel: "2 min 36 s" }),
      L(26, "translating-technical-risk-into-business-risk-language", "Translating Technical Risk into Business Risk Language", { contentDir: "ch07/26-translating-technical-risk-into-business-risk-language", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-security-architecture-grc-risk-management/translating-technical-risk-into-business-risk-language.mp4", durationLabel: "2 min 32 s" }),
      L(27, "building-a-real-board-level-security-report", "Building a Real Board-Level Security Report", { contentDir: "ch07/27-building-a-real-board-level-security-report" }),
      L(28, "when-and-how-to-report-a-significant-security-incident-upward", "When and How to Report a Significant Security Incident Upward", { contentDir: "ch07/28-when-and-how-to-report-a-significant-security-incident-upward" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Designing a Security Architecture and GRC Program",
    lessons: [
      L(29, "lab-designing-a-security-architecture-for-a-regulated-enterprise", "Lab: Designing a Security Architecture for a Regulated Enterprise", { contentDir: "ch08/29-lab-designing-a-security-architecture-for-a-regulated-enterprise" }),
      L(30, "lab-building-a-risk-register-and-compliance-mapping", "Lab: Building a Risk Register and Compliance Mapping", { contentDir: "ch08/30-lab-building-a-risk-register-and-compliance-mapping" }),
      L(31, "case-study-a-compliant-organization-that-still-got-breached", "Case Study: A Compliant Organization That Still Got Breached", { contentDir: "ch08/31-case-study-a-compliant-organization-that-still-got-breached" }),
      L(32, "chapter-capstone-the-whole-path-from-soc-analyst-to-security-architect", "Chapter Capstone: The Whole Path, from SOC Analyst to Security Architect", { contentDir: "ch08/32-chapter-capstone-the-whole-path-from-soc-analyst-to-security-architect" }),
    ],
  },
];
