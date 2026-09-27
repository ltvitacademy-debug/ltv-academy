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
      L(1, "the-technical-architect-role", "The Technical Architect Role"),
      L(2, "translating-business-requirements", "Translating Business Requirements"),
      L(3, "the-solution-design-process", "The Solution Design Process"),
      L(4, "architecture-domains-overview", "Architecture Domains Overview"),
      L(5, "architect-mindset-and-habits", "Architect Mindset and Habits"),
      L(6, "working-with-stakeholders", "Working With Stakeholders"),
    ],
  },
  {
    n: 2,
    title: "From Requirements to Blueprint",
    lessons: [
      L(7, "assumptions-and-constraints", "Assumptions and Constraints"),
      L(8, "risk-identification", "Risk Identification"),
      L(9, "communicating-architecture", "Communicating Architecture"),
      L(10, "from-requirements-to-an-architecture-blueprint", "From Requirements to an Architecture Blueprint"),
      L(11, "prioritizing-requirements", "Prioritizing Requirements"),
    ],
  },
  {
    n: 3,
    title: "Architecture Domains",
    lessons: [
      L(12, "system-architecture", "System Architecture"),
      L(13, "identity-and-access-management", "Identity and Access Management"),
      L(14, "security-and-sharing", "Security and Sharing"),
      L(15, "data-architecture", "Data Architecture"),
      L(16, "integration-architecture", "Integration Architecture"),
    ],
  },
  {
    n: 4,
    title: "Delivery Domains",
    lessons: [
      L(17, "solution-architecture", "Solution Architecture"),
      L(18, "development-lifecycle-and-deployment", "Development Lifecycle and Deployment"),
      L(19, "communication-as-an-architect", "Communication as an Architect"),
    ],
  },
];
