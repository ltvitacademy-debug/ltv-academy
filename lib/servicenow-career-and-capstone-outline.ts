// ServiceNow Career & Capstone course outline. Lessons without a contentDir render as
// "in production". Course 14 of 14, closing the ServiceNow Administrator → Developer →
// Technical Architect path: certification planning, the enterprise capstone, and job search prep.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-career-and-capstone/
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

export const SERVICENOW_CAREER_AND_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Certification Pathway Planning",
    lessons: [
      L(1, "csa-cad-cis-and-cta-how-they-actually-relate", "CSA, CAD, CIS & CTA: How They Actually Relate", { contentDir: "ch01/01-csa-cad-cis-and-cta-how-they-actually-relate" }),
      L(2, "choosing-a-cis-specialization", "Choosing a CIS Specialization", { contentDir: "ch01/02-choosing-a-cis-specialization" }),
      L(3, "certification-exam-preparation-strategy", "Certification Exam Preparation Strategy", { contentDir: "ch01/03-certification-exam-preparation-strategy" }),
      L(4, "what-certification-does-and-doesnt-guarantee", "What Certification Does & Doesn't Guarantee", { contentDir: "ch01/04-what-certification-does-and-doesnt-guarantee" }),
    ],
  },
  {
    n: 2,
    title: "The Real ServiceNow Job Market",
    lessons: [
      L(5, "servicenow-administrator-roles-in-practice", "ServiceNow Administrator Roles in Practice", { contentDir: "ch02/05-servicenow-administrator-roles-in-practice" }),
      L(6, "servicenow-developer-roles-in-practice", "ServiceNow Developer Roles in Practice", { contentDir: "ch02/06-servicenow-developer-roles-in-practice" }),
      L(7, "the-path-to-technical-architect-real-experience-required", "The Path to Technical Architect: Real Experience Required", { contentDir: "ch02/07-the-path-to-technical-architect-real-experience-required" }),
      L(8, "consulting-vs-in-house-servicenow-careers", "Consulting vs. In-House ServiceNow Careers", { contentDir: "ch02/08-consulting-vs-in-house-servicenow-careers" }),
    ],
  },
  {
    n: 3,
    title: "Building a ServiceNow Portfolio",
    lessons: [
      L(9, "what-to-showcase-from-this-paths-projects", "What to Showcase From This Path's Projects", { contentDir: "ch03/09-what-to-showcase-from-this-paths-projects" }),
      L(10, "writing-a-servicenow-resume", "Writing a ServiceNow Resume", { contentDir: "ch03/10-writing-a-servicenow-resume" }),
      L(11, "documenting-a-project-for-a-portfolio", "Documenting a Project for a Portfolio", { contentDir: "ch03/11-documenting-a-project-for-a-portfolio" }),
    ],
  },
  {
    n: 4,
    title: "Capstone Kickoff",
    lessons: [
      L(12, "capstone-overview-the-5-000-employee-organization", "Capstone Overview: the 5,000-Employee Organization", { contentDir: "ch04/12-capstone-overview-the-5-000-employee-organization" }),
      L(13, "capstone-requirements-gathering", "Capstone: Requirements Gathering", { contentDir: "ch04/13-capstone-requirements-gathering" }),
      L(14, "capstone-scoping-the-implementation", "Capstone: Scoping the Implementation", { contentDir: "ch04/14-capstone-scoping-the-implementation" }),
    ],
  },
  {
    n: 5,
    title: "Capstone: Build It",
    lessons: [
      L(15, "capstone-build-the-service-workflows", "Capstone: Build the Service Workflows", { contentDir: "ch05/15-capstone-build-the-service-workflows" }),
      L(16, "capstone-build-the-platform-integrations", "Capstone: Build the Platform Integrations", { contentDir: "ch05/16-capstone-build-the-platform-integrations" }),
      L(17, "capstone-build-test-plans-and-run-them", "Capstone: Build Test Plans & Run Them", { contentDir: "ch05/17-capstone-build-test-plans-and-run-them" }),
      L(18, "capstone-produce-deployment-documentation", "Capstone: Produce Deployment Documentation", { contentDir: "ch05/18-capstone-produce-deployment-documentation" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: Wrap-Up & Presentation",
    lessons: [
      L(19, "capstone-presenting-architecture-decisions", "Capstone: Presenting Architecture Decisions", { contentDir: "ch06/19-capstone-presenting-architecture-decisions" }),
      L(20, "capstone-defending-technical-design-choices", "Capstone: Defending Technical Design Choices", { contentDir: "ch06/20-capstone-defending-technical-design-choices" }),
      L(21, "capstone-peer-review-and-revision", "Capstone: Peer Review & Revision", { contentDir: "ch06/21-capstone-peer-review-and-revision" }),
      L(22, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging", { contentDir: "ch06/22-capstone-wrap-up-and-portfolio-packaging" }),
    ],
  },
  {
    n: 7,
    title: "Interview & Job Search Preparation",
    lessons: [
      L(23, "common-servicenow-interview-formats", "Common ServiceNow Interview Formats", { contentDir: "ch07/23-common-servicenow-interview-formats" }),
      L(24, "technical-screening-what-to-expect", "Technical Screening: What to Expect", { contentDir: "ch07/24-technical-screening-what-to-expect" }),
      L(25, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps", { contentDir: "ch07/25-salary-negotiation-and-next-steps" }),
      L(26, "final-wrap-up-and-continued-learning-path", "Final Wrap-Up & Continued Learning Path", { contentDir: "ch07/26-final-wrap-up-and-continued-learning-path" }),
    ],
  },
];
