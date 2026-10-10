// The Technical Architecture Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/technical-architecture-fundamentals/
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

export const SFTA_TECHNICAL_ARCHITECTURE_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Thinking Like a Technical Architect",
    lessons: [
      L(1, "the-technical-architect-role", "The Technical Architect Role", { contentDir: "ch01/01-the-technical-architect-role" }),
      L(2, "translating-business-requirements", "Translating Business Requirements", { contentDir: "ch01/02-translating-business-requirements" }),
      L(3, "the-solution-design-process", "The Solution Design Process", { contentDir: "ch01/03-the-solution-design-process" }),
      L(4, "architecture-domains-overview", "Architecture Domains Overview", { contentDir: "ch01/04-architecture-domains-overview" }),
      L(5, "architect-mindset-and-habits", "Architect Mindset and Habits", { contentDir: "ch01/05-architect-mindset-and-habits" }),
      L(6, "working-with-stakeholders", "Working With Stakeholders", { contentDir: "ch01/06-working-with-stakeholders" }),
    ],
  },
  {
    n: 2,
    title: "From Requirements to Blueprint",
    lessons: [
      L(7, "assumptions-and-constraints", "Assumptions and Constraints", { contentDir: "ch02/07-assumptions-and-constraints" }),
      L(8, "risk-identification", "Risk Identification", { contentDir: "ch02/08-risk-identification" }),
      L(9, "communicating-architecture", "Communicating Architecture", { contentDir: "ch02/09-communicating-architecture" }),
      L(10, "from-requirements-to-an-architecture-blueprint", "From Requirements to an Architecture Blueprint", { contentDir: "ch02/10-from-requirements-to-an-architecture-blueprint" }),
      L(11, "prioritizing-requirements", "Prioritizing Requirements", { contentDir: "ch02/11-prioritizing-requirements" }),
    ],
  },
  {
    n: 3,
    title: "Architecture Domains",
    lessons: [
      L(12, "system-architecture", "System Architecture", { contentDir: "ch03/12-system-architecture" }),
      L(13, "identity-and-access-management", "Identity and Access Management", { contentDir: "ch03/13-identity-and-access-management" }),
      L(14, "security-and-sharing", "Security and Sharing", { contentDir: "ch03/14-security-and-sharing" }),
      L(15, "data-architecture", "Data Architecture", { contentDir: "ch03/15-data-architecture" }),
      L(16, "integration-architecture", "Integration Architecture", { contentDir: "ch03/16-integration-architecture" }),
    ],
  },
  {
    n: 4,
    title: "Delivery Domains",
    lessons: [
      L(17, "solution-architecture", "Solution Architecture", { contentDir: "ch04/17-solution-architecture" }),
      L(18, "development-lifecycle-and-deployment", "Development Lifecycle and Deployment", { contentDir: "ch04/18-development-lifecycle-and-deployment" }),
      L(19, "communication-as-an-architect", "Communication as an Architect", { contentDir: "ch04/19-communication-as-an-architect" }),
    ],
  },
];
