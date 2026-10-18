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
      L(1, "csa-cad-cis-and-cta-how-they-actually-relate", "CSA, CAD, CIS & CTA: How They Actually Relate"),
      L(2, "choosing-a-cis-specialization", "Choosing a CIS Specialization"),
      L(3, "certification-exam-preparation-strategy", "Certification Exam Preparation Strategy"),
      L(4, "what-certification-does-and-doesnt-guarantee", "What Certification Does & Doesn't Guarantee"),
    ],
  },
  {
    n: 2,
    title: "The Real ServiceNow Job Market",
    lessons: [
      L(5, "servicenow-administrator-roles-in-practice", "ServiceNow Administrator Roles in Practice"),
      L(6, "servicenow-developer-roles-in-practice", "ServiceNow Developer Roles in Practice"),
      L(7, "the-path-to-technical-architect-real-experience-required", "The Path to Technical Architect: Real Experience Required"),
      L(8, "consulting-vs-in-house-servicenow-careers", "Consulting vs. In-House ServiceNow Careers"),
    ],
  },
  {
    n: 3,
    title: "Building a ServiceNow Portfolio",
    lessons: [
      L(9, "what-to-showcase-from-this-paths-projects", "What to Showcase From This Path's Projects"),
      L(10, "writing-a-servicenow-resume", "Writing a ServiceNow Resume"),
      L(11, "documenting-a-project-for-a-portfolio", "Documenting a Project for a Portfolio"),
    ],
  },
  {
    n: 4,
    title: "Capstone Kickoff",
    lessons: [
      L(12, "capstone-overview-the-5-000-employee-organization", "Capstone Overview: the 5,000-Employee Organization"),
      L(13, "capstone-requirements-gathering", "Capstone: Requirements Gathering"),
      L(14, "capstone-scoping-the-implementation", "Capstone: Scoping the Implementation"),
    ],
  },
  {
    n: 5,
    title: "Capstone: Build It",
    lessons: [
      L(15, "capstone-build-the-service-workflows", "Capstone: Build the Service Workflows"),
      L(16, "capstone-build-the-platform-integrations", "Capstone: Build the Platform Integrations"),
      L(17, "capstone-build-test-plans-and-run-them", "Capstone: Build Test Plans & Run Them"),
      L(18, "capstone-produce-deployment-documentation", "Capstone: Produce Deployment Documentation"),
    ],
  },
  {
    n: 6,
    title: "Capstone: Wrap-Up & Presentation",
    lessons: [
      L(19, "capstone-presenting-architecture-decisions", "Capstone: Presenting Architecture Decisions"),
      L(20, "capstone-defending-technical-design-choices", "Capstone: Defending Technical Design Choices"),
      L(21, "capstone-peer-review-and-revision", "Capstone: Peer Review & Revision"),
      L(22, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging"),
    ],
  },
  {
    n: 7,
    title: "Interview & Job Search Preparation",
    lessons: [
      L(23, "common-servicenow-interview-formats", "Common ServiceNow Interview Formats"),
      L(24, "technical-screening-what-to-expect", "Technical Screening: What to Expect"),
      L(25, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps"),
      L(26, "final-wrap-up-and-continued-learning-path", "Final Wrap-Up & Continued Learning Path"),
    ],
  },
];
