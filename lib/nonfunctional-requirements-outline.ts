// The Nonfunctional Requirements course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/nonfunctional-requirements/
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

export const SFTA_NONFUNCTIONAL_REQUIREMENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Nonfunctional Requirements",
    lessons: [
      L(1, "what-nonfunctional-requirements-are", "What Nonfunctional Requirements Are"),
      L(2, "performance", "Performance"),
      L(3, "security", "Security"),
      L(4, "scalability", "Scalability"),
      L(5, "reliability", "Reliability"),
      L(6, "maintainability-and-recoverability", "Maintainability and Recoverability"),
      L(7, "compliance", "Compliance"),
    ],
  },
  {
    n: 2,
    title: "Applying Nonfunctional Requirements",
    lessons: [
      L(8, "eliciting-nonfunctional-requirements", "Eliciting Nonfunctional Requirements"),
      L(9, "turning-nfrs-into-design-decisions", "Turning NFRs Into Design Decisions"),
      L(10, "measuring-and-testing-nfrs", "Measuring and Testing NFRs"),
      L(11, "nfr-conflicts-and-prioritization", "NFR Conflicts and Prioritization"),
      L(12, "availability-and-disaster-recovery-design", "Availability and Disaster Recovery Design"),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(13, "nfr-case-study-high-volume-service-org", "NFR Case Study: High-Volume Service Org"),
      L(14, "nfr-case-study-regulated-financial-services", "NFR Case Study: Regulated Financial Services"),
      L(15, "nfr-review-checklist", "NFR Review Checklist"),
      L(16, "documenting-nfrs", "Documenting NFRs"),
      L(17, "nfr-board-practice", "NFR Board Practice"),
      L(18, "common-nfr-mistakes", "Common NFR Mistakes"),
    ],
  },
];
