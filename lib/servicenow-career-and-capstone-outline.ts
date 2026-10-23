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
      L(1, "csa-cad-cis-and-cta-how-they-actually-relate", "CSA, CAD, CIS & CTA: How They Actually Relate", { contentDir: "ch01/01-csa-cad-cis-and-cta-how-they-actually-relate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734347/ltv-servicenow-career-and-capstone/csa-cad-cis-and-cta-how-they-actually-relate.mp4", durationLabel: "2 min 43 s" }),
      L(2, "choosing-a-cis-specialization", "Choosing a CIS Specialization", { contentDir: "ch01/02-choosing-a-cis-specialization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734416/ltv-servicenow-career-and-capstone/choosing-a-cis-specialization.mp4", durationLabel: "2 min 37 s" }),
      L(3, "certification-exam-preparation-strategy", "Certification Exam Preparation Strategy", { contentDir: "ch01/03-certification-exam-preparation-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734486/ltv-servicenow-career-and-capstone/certification-exam-preparation-strategy.mp4", durationLabel: "2 min 33 s" }),
      L(4, "what-certification-does-and-doesnt-guarantee", "What Certification Does & Doesn't Guarantee", { contentDir: "ch01/04-what-certification-does-and-doesnt-guarantee", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734548/ltv-servicenow-career-and-capstone/what-certification-does-and-doesnt-guarantee.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 2,
    title: "The Real ServiceNow Job Market",
    lessons: [
      L(5, "servicenow-administrator-roles-in-practice", "ServiceNow Administrator Roles in Practice", { contentDir: "ch02/05-servicenow-administrator-roles-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734612/ltv-servicenow-career-and-capstone/servicenow-administrator-roles-in-practice.mp4", durationLabel: "2 min 26 s" }),
      L(6, "servicenow-developer-roles-in-practice", "ServiceNow Developer Roles in Practice", { contentDir: "ch02/06-servicenow-developer-roles-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734670/ltv-servicenow-career-and-capstone/servicenow-developer-roles-in-practice.mp4", durationLabel: "2 min 13 s" }),
      L(7, "the-path-to-technical-architect-real-experience-required", "The Path to Technical Architect: Real Experience Required", { contentDir: "ch02/07-the-path-to-technical-architect-real-experience-required", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734730/ltv-servicenow-career-and-capstone/the-path-to-technical-architect-real-experience-required.mp4", durationLabel: "2 min 21 s" }),
      L(8, "consulting-vs-in-house-servicenow-careers", "Consulting vs. In-House ServiceNow Careers", { contentDir: "ch02/08-consulting-vs-in-house-servicenow-careers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734793/ltv-servicenow-career-and-capstone/consulting-vs-in-house-servicenow-careers.mp4", durationLabel: "2 min 31 s" }),
    ],
  },
  {
    n: 3,
    title: "Building a ServiceNow Portfolio",
    lessons: [
      L(9, "what-to-showcase-from-this-paths-projects", "What to Showcase From This Path's Projects", { contentDir: "ch03/09-what-to-showcase-from-this-paths-projects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734854/ltv-servicenow-career-and-capstone/what-to-showcase-from-this-paths-projects.mp4", durationLabel: "2 min 23 s" }),
      L(10, "writing-a-servicenow-resume", "Writing a ServiceNow Resume", { contentDir: "ch03/10-writing-a-servicenow-resume", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734914/ltv-servicenow-career-and-capstone/writing-a-servicenow-resume.mp4", durationLabel: "2 min 17 s" }),
      L(11, "documenting-a-project-for-a-portfolio", "Documenting a Project for a Portfolio", { contentDir: "ch03/11-documenting-a-project-for-a-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792734973/ltv-servicenow-career-and-capstone/documenting-a-project-for-a-portfolio.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 4,
    title: "Capstone Kickoff",
    lessons: [
      L(12, "capstone-overview-the-5-000-employee-organization", "Capstone Overview: the 5,000-Employee Organization", { contentDir: "ch04/12-capstone-overview-the-5-000-employee-organization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735036/ltv-servicenow-career-and-capstone/capstone-overview-the-5-000-employee-organization.mp4", durationLabel: "2 min 26 s" }),
      L(13, "capstone-requirements-gathering", "Capstone: Requirements Gathering", { contentDir: "ch04/13-capstone-requirements-gathering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735101/ltv-servicenow-career-and-capstone/capstone-requirements-gathering.mp4", durationLabel: "2 min 33 s" }),
      L(14, "capstone-scoping-the-implementation", "Capstone: Scoping the Implementation", { contentDir: "ch04/14-capstone-scoping-the-implementation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735164/ltv-servicenow-career-and-capstone/capstone-scoping-the-implementation.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone: Build It",
    lessons: [
      L(15, "capstone-build-the-service-workflows", "Capstone: Build the Service Workflows", { contentDir: "ch05/15-capstone-build-the-service-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735232/ltv-servicenow-career-and-capstone/capstone-build-the-service-workflows.mp4", durationLabel: "2 min 32 s" }),
      L(16, "capstone-build-the-platform-integrations", "Capstone: Build the Platform Integrations", { contentDir: "ch05/16-capstone-build-the-platform-integrations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735295/ltv-servicenow-career-and-capstone/capstone-build-the-platform-integrations.mp4", durationLabel: "2 min 20 s" }),
      L(17, "capstone-build-test-plans-and-run-them", "Capstone: Build Test Plans & Run Them", { contentDir: "ch05/17-capstone-build-test-plans-and-run-them", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735353/ltv-servicenow-career-and-capstone/capstone-build-test-plans-and-run-them.mp4", durationLabel: "2 min 14 s" }),
      L(18, "capstone-produce-deployment-documentation", "Capstone: Produce Deployment Documentation", { contentDir: "ch05/18-capstone-produce-deployment-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735410/ltv-servicenow-career-and-capstone/capstone-produce-deployment-documentation.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: Wrap-Up & Presentation",
    lessons: [
      L(19, "capstone-presenting-architecture-decisions", "Capstone: Presenting Architecture Decisions", { contentDir: "ch06/19-capstone-presenting-architecture-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735474/ltv-servicenow-career-and-capstone/capstone-presenting-architecture-decisions.mp4", durationLabel: "2 min 30 s" }),
      L(20, "capstone-defending-technical-design-choices", "Capstone: Defending Technical Design Choices", { contentDir: "ch06/20-capstone-defending-technical-design-choices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735539/ltv-servicenow-career-and-capstone/capstone-defending-technical-design-choices.mp4", durationLabel: "2 min 31 s" }),
      L(21, "capstone-peer-review-and-revision", "Capstone: Peer Review & Revision", { contentDir: "ch06/21-capstone-peer-review-and-revision", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735603/ltv-servicenow-career-and-capstone/capstone-peer-review-and-revision.mp4", durationLabel: "2 min 30 s" }),
      L(22, "capstone-wrap-up-and-portfolio-packaging", "Capstone Wrap-Up & Portfolio Packaging", { contentDir: "ch06/22-capstone-wrap-up-and-portfolio-packaging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735666/ltv-servicenow-career-and-capstone/capstone-wrap-up-and-portfolio-packaging.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 7,
    title: "Interview & Job Search Preparation",
    lessons: [
      L(23, "common-servicenow-interview-formats", "Common ServiceNow Interview Formats", { contentDir: "ch07/23-common-servicenow-interview-formats", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735725/ltv-servicenow-career-and-capstone/common-servicenow-interview-formats.mp4", durationLabel: "2 min 17 s" }),
      L(24, "technical-screening-what-to-expect", "Technical Screening: What to Expect", { contentDir: "ch07/24-technical-screening-what-to-expect", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735787/ltv-servicenow-career-and-capstone/technical-screening-what-to-expect.mp4", durationLabel: "2 min 27 s" }),
      L(25, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps", { contentDir: "ch07/25-salary-negotiation-and-next-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735844/ltv-servicenow-career-and-capstone/salary-negotiation-and-next-steps.mp4", durationLabel: "2 min 14 s" }),
      L(26, "final-wrap-up-and-continued-learning-path", "Final Wrap-Up & Continued Learning Path", { contentDir: "ch07/26-final-wrap-up-and-continued-learning-path", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792735924/ltv-servicenow-career-and-capstone/final-wrap-up-and-continued-learning-path.mp4", durationLabel: "3 min 13 s" }),
    ],
  },
];
