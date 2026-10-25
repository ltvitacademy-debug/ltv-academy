// The AI Engineering Leadership & Architecture course outline. Lessons without a contentDir
// render as "in production". Built for the Principal/Staff AI Engineer destination: system
// design at scale, architecture decision-making, technical leadership, and production/strategy
// ownership for AI systems specifically — the one real gap the destination's own competencies
// list named but had no lessons behind, once the AI Engineer path's security/eval/monitoring
// course and the AI/ML Research & Alignment Engineer destination already covered the rest.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-engineering-leadership-and-architecture/
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

export const AI_ENGINEERING_LEADERSHIP_AND_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "System Design at Scale for AI Systems",
    lessons: [
      L(1, "from-single-model-to-platform-what-actually-changes-at-scale", "From Single Model to Platform: What Actually Changes at Scale", { contentDir: "ch01/01-from-single-model-to-platform-what-actually-changes-at-scale", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/from-single-model-to-platform-what-actually-changes-at-scale.mp4", durationLabel: "3 min 13 s" }),
      L(2, "designing-for-millions-of-requests-latency-load-and-cost-budgets", "Designing for Millions of Requests: Latency, Load & Cost Budgets", { contentDir: "ch01/02-designing-for-millions-of-requests-latency-load-and-cost-budgets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/designing-for-millions-of-requests-latency-load-and-cost-budgets.mp4", durationLabel: "2 min 41 s" }),
      L(3, "capacity-planning-and-forecasting-ai-workloads", "Capacity Planning & Forecasting AI Workloads", { contentDir: "ch01/03-capacity-planning-and-forecasting-ai-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/capacity-planning-and-forecasting-ai-workloads.mp4", durationLabel: "2 min 24 s" }),
      L(4, "multi-region-and-high-availability-design-for-ai-systems", "Multi-Region & High-Availability Design for AI Systems", { contentDir: "ch01/04-multi-region-and-high-availability-design-for-ai-systems", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/multi-region-and-high-availability-design-for-ai-systems.mp4", durationLabel: "3 min 9 s" }),
      L(5, "case-study-scaling-a-rag-assistant-from-100-users-to-1-million", "Case Study: Scaling a RAG Assistant From 100 Users to 1 Million", { contentDir: "ch01/05-case-study-scaling-a-rag-assistant-from-100-users-to-1-million", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/case-study-scaling-a-rag-assistant-from-100-users-to-1-million.mp4", durationLabel: "3 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Architecture Decision-Making",
    lessons: [
      L(6, "architecture-decision-records-writing-decisions-down", "Architecture Decision Records: Writing Decisions Down", { contentDir: "ch02/06-architecture-decision-records-writing-decisions-down", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/architecture-decision-records-writing-decisions-down.mp4", durationLabel: "2 min 33 s" }),
      L(7, "build-vs-buy-a-real-framework-for-ai-components", "Build vs. Buy: A Real Framework for AI Components", { contentDir: "ch02/07-build-vs-buy-a-real-framework-for-ai-components", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/build-vs-buy-a-real-framework-for-ai-components.mp4", durationLabel: "2 min 54 s" }),
      L(8, "weighing-trade-offs-cost-latency-quality-and-maintainability", "Weighing Trade-offs: Cost, Latency, Quality & Maintainability", { contentDir: "ch02/08-weighing-trade-offs-cost-latency-quality-and-maintainability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/weighing-trade-offs-cost-latency-quality-and-maintainability.mp4", durationLabel: "2 min 43 s" }),
      L(9, "writing-a-design-document-that-actually-gets-approved", "Writing a Design Document That Actually Gets Approved", { contentDir: "ch02/09-writing-a-design-document-that-actually-gets-approved", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/writing-a-design-document-that-actually-gets-approved.mp4", durationLabel: "2 min 54 s" }),
      L(10, "case-study-choosing-between-three-real-vector-database-options", "Case Study: Choosing Between Three Real Vector Database Options", { contentDir: "ch02/10-case-study-choosing-between-three-real-vector-database-options", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/case-study-choosing-between-three-real-vector-database-options.mp4", durationLabel: "2 min 49 s" }),
    ],
  },
  {
    n: 3,
    title: "Technical Leadership & Influence",
    lessons: [
      L(11, "what-changes-when-youre-the-senior-engineer-in-the-room", "What Changes When You're the Senior Engineer in the Room", { contentDir: "ch03/11-what-changes-when-youre-the-senior-engineer-in-the-room", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/what-changes-when-youre-the-senior-engineer-in-the-room.mp4", durationLabel: "2 min 11 s" }),
      L(12, "running-an-architecture-review", "Running an Architecture Review", { contentDir: "ch03/12-running-an-architecture-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/running-an-architecture-review.mp4", durationLabel: "2 min 9 s" }),
      L(13, "mentoring-through-a-hard-technical-problem", "Mentoring Through a Hard Technical Problem", { contentDir: "ch03/13-mentoring-through-a-hard-technical-problem", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/mentoring-through-a-hard-technical-problem.mp4", durationLabel: "2 min 18 s" }),
      L(14, "disagree-and-commit-handling-technical-conflict", "Disagree and Commit: Handling Technical Conflict", { contentDir: "ch03/14-disagree-and-commit-handling-technical-conflict", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/disagree-and-commit-handling-technical-conflict.mp4", durationLabel: "2 min 22 s" }),
      L(15, "communicating-technical-risk-to-non-technical-stakeholders", "Communicating Technical Risk to Non-Technical Stakeholders", { contentDir: "ch03/15-communicating-technical-risk-to-non-technical-stakeholders", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/communicating-technical-risk-to-non-technical-stakeholders.mp4", durationLabel: "2 min 52 s" }),
    ],
  },
  {
    n: 4,
    title: "Owning Production, Standards & Strategy",
    lessons: [
      L(16, "incident-ownership-leading-a-postmortem-that-prevents-recurrence", "Incident Ownership: Leading a Postmortem That Prevents Recurrence", { contentDir: "ch04/16-incident-ownership-leading-a-postmortem-that-prevents-recurrence", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/incident-ownership-leading-a-postmortem-that-prevents-recurrence.mp4", durationLabel: "2 min 25 s" }),
      L(17, "setting-engineering-standards-across-a-team", "Setting Engineering Standards Across a Team", { contentDir: "ch04/17-setting-engineering-standards-across-a-team", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/setting-engineering-standards-across-a-team.mp4", durationLabel: "2 min 33 s" }),
      L(18, "technical-debt-when-to-pay-it-down-vs-ship-around-it", "Technical Debt: When to Pay It Down vs. Ship Around It", { contentDir: "ch04/18-technical-debt-when-to-pay-it-down-vs-ship-around-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/technical-debt-when-to-pay-it-down-vs-ship-around-it.mp4", durationLabel: "2 min 29 s" }),
      L(19, "roadmapping-turning-business-goals-into-a-technical-plan", "Roadmapping: Turning Business Goals Into a Technical Plan", { contentDir: "ch04/19-roadmapping-turning-business-goals-into-a-technical-plan", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/roadmapping-turning-business-goals-into-a-technical-plan.mp4", durationLabel: "2 min 40 s" }),
      L(20, "capstone-write-a-real-architecture-decision-record", "Capstone: Write a Real Architecture Decision Record", { contentDir: "ch04/20-capstone-write-a-real-architecture-decision-record", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-engineering-leadership-and-architecture/capstone-write-a-real-architecture-decision-record.mp4", durationLabel: "3 min 42 s" }),
    ],
  },
];
