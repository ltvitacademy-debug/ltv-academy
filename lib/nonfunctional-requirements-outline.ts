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
      L(1, "what-nonfunctional-requirements-are", "What Nonfunctional Requirements Are", { contentDir: "ch01/01-what-nonfunctional-requirements-are" }),
      L(2, "performance", "Performance", { contentDir: "ch01/02-performance" }),
      L(3, "security", "Security", { contentDir: "ch01/03-security" }),
      L(4, "scalability", "Scalability", { contentDir: "ch01/04-scalability" }),
      L(5, "reliability", "Reliability", { contentDir: "ch01/05-reliability" }),
      L(6, "maintainability-and-recoverability", "Maintainability and Recoverability", { contentDir: "ch01/06-maintainability-and-recoverability" }),
      L(7, "compliance", "Compliance", { contentDir: "ch01/07-compliance" }),
    ],
  },
  {
    n: 2,
    title: "Applying Nonfunctional Requirements",
    lessons: [
      L(8, "eliciting-nonfunctional-requirements", "Eliciting Nonfunctional Requirements", { contentDir: "ch02/08-eliciting-nonfunctional-requirements" }),
      L(9, "turning-nfrs-into-design-decisions", "Turning NFRs Into Design Decisions", { contentDir: "ch02/09-turning-nfrs-into-design-decisions" }),
      L(10, "measuring-and-testing-nfrs", "Measuring and Testing NFRs", { contentDir: "ch02/10-measuring-and-testing-nfrs" }),
      L(11, "nfr-conflicts-and-prioritization", "NFR Conflicts and Prioritization", { contentDir: "ch02/11-nfr-conflicts-and-prioritization" }),
      L(12, "availability-and-disaster-recovery-design", "Availability and Disaster Recovery Design", { contentDir: "ch02/12-availability-and-disaster-recovery-design" }),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(13, "nfr-case-study-high-volume-service-org", "NFR Case Study: High-Volume Service Org", { contentDir: "ch03/13-nfr-case-study-high-volume-service-org" }),
      L(14, "nfr-case-study-regulated-financial-services", "NFR Case Study: Regulated Financial Services", { contentDir: "ch03/14-nfr-case-study-regulated-financial-services" }),
      L(15, "nfr-review-checklist", "NFR Review Checklist", { contentDir: "ch03/15-nfr-review-checklist" }),
      L(16, "documenting-nfrs", "Documenting NFRs", { contentDir: "ch03/16-documenting-nfrs" }),
      L(17, "nfr-board-practice", "NFR Board Practice", { contentDir: "ch03/17-nfr-board-practice" }),
      L(18, "common-nfr-mistakes", "Common NFR Mistakes", { contentDir: "ch03/18-common-nfr-mistakes" }),
    ],
  },
];
