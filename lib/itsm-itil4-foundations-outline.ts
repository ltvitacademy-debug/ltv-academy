// ITSM & ITIL 4 Foundations course outline. Lessons without a contentDir render as
// "in production". Course 1 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: the service-management concepts every ServiceNow process module implements.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/itsm-itil4-foundations/
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

export const ITSM_ITIL4_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "IT Service Management Foundations",
    lessons: [
      L(1, "what-it-service-management-actually-is", "What IT Service Management Actually Is", { contentDir: "ch01/01-what-it-service-management-actually-is" }),
      L(2, "why-organizations-adopt-a-formal-itsm-framework", "Why Organizations Adopt a Formal ITSM Framework", { contentDir: "ch01/02-why-organizations-adopt-a-formal-itsm-framework" }),
      L(3, "itil-4-vs-earlier-itil-versions", "ITIL 4 vs. Earlier ITIL Versions", { contentDir: "ch01/03-itil-4-vs-earlier-itil-versions" }),
      L(4, "the-service-value-system-overview", "The Service Value System: Overview", { contentDir: "ch01/04-the-service-value-system-overview" }),
    ],
  },
  {
    n: 2,
    title: "The ITIL 4 Guiding Principles",
    lessons: [
      L(5, "focus-on-value", "Focus on Value", { contentDir: "ch02/05-focus-on-value" }),
      L(6, "start-where-you-are", "Start Where You Are", { contentDir: "ch02/06-start-where-you-are" }),
      L(7, "progress-iteratively-with-feedback", "Progress Iteratively With Feedback", { contentDir: "ch02/07-progress-iteratively-with-feedback" }),
      L(8, "collaborate-and-promote-visibility", "Collaborate & Promote Visibility", { contentDir: "ch02/08-collaborate-and-promote-visibility" }),
      L(9, "think-and-work-holistically-keep-it-simple-optimize-and-automate", "Think Holistically, Keep It Simple, Optimize & Automate", { contentDir: "ch02/09-think-and-work-holistically-keep-it-simple-optimize-and-automate" }),
    ],
  },
  {
    n: 3,
    title: "The Service Value Chain",
    lessons: [
      L(10, "plan-improve-and-engage-activities", "Plan, Improve & Engage Activities", { contentDir: "ch03/10-plan-improve-and-engage-activities" }),
      L(11, "design-and-transition-activities", "Design & Transition Activities", { contentDir: "ch03/11-design-and-transition-activities" }),
      L(12, "obtain-build-and-deliver-and-support-activities", "Obtain/Build, Deliver & Support Activities", { contentDir: "ch03/12-obtain-build-and-deliver-and-support-activities" }),
      L(13, "how-the-value-chain-activities-connect-in-practice", "How the Value-Chain Activities Connect in Practice", { contentDir: "ch03/13-how-the-value-chain-activities-connect-in-practice" }),
    ],
  },
  {
    n: 4,
    title: "Core ITIL 4 Practices: Incident, Problem & Change",
    lessons: [
      L(14, "incident-management-practice", "Incident Management Practice", { contentDir: "ch04/14-incident-management-practice" }),
      L(15, "problem-management-practice", "Problem Management Practice", { contentDir: "ch04/15-problem-management-practice" }),
      L(16, "change-enablement-practice", "Change Enablement Practice", { contentDir: "ch04/16-change-enablement-practice" }),
      L(17, "how-incident-problem-and-change-relate", "How Incident, Problem & Change Relate", { contentDir: "ch04/17-how-incident-problem-and-change-relate" }),
      L(18, "incident-problem-change-lab", "Incident/Problem/Change Lab", { contentDir: "ch04/18-incident-problem-change-lab" }),
    ],
  },
  {
    n: 5,
    title: "Core ITIL 4 Practices: Request, Knowledge & Service Level",
    lessons: [
      L(19, "service-request-management-practice", "Service Request Management Practice", { contentDir: "ch05/19-service-request-management-practice" }),
      L(20, "knowledge-management-practice", "Knowledge Management Practice", { contentDir: "ch05/20-knowledge-management-practice" }),
      L(21, "service-level-management-practice", "Service Level Management Practice", { contentDir: "ch05/21-service-level-management-practice" }),
      L(22, "service-desk-practice", "Service Desk Practice", { contentDir: "ch05/22-service-desk-practice" }),
    ],
  },
  {
    n: 6,
    title: "Service Configuration & Asset Practices",
    lessons: [
      L(23, "service-configuration-management-practice", "Service Configuration Management Practice", { contentDir: "ch06/23-service-configuration-management-practice" }),
      L(24, "it-asset-management-practice", "IT Asset Management Practice", { contentDir: "ch06/24-it-asset-management-practice" }),
      L(25, "continual-improvement-practice", "Continual Improvement Practice", { contentDir: "ch06/25-continual-improvement-practice" }),
    ],
  },
  {
    n: 7,
    title: "Applying ITIL 4 on a Real Platform",
    lessons: [
      L(26, "how-a-platform-like-servicenow-implements-these-practices", "How a Platform Like ServiceNow Implements These Practices", { contentDir: "ch07/26-how-a-platform-like-servicenow-implements-these-practices" }),
      L(27, "itil-certification-pathway-overview", "ITIL Certification Pathway: Overview", { contentDir: "ch07/27-itil-certification-pathway-overview" }),
      L(28, "capstone-map-itil-4-practices-to-a-real-organization", "Capstone: Map ITIL 4 Practices to a Real Organization", { contentDir: "ch07/28-capstone-map-itil-4-practices-to-a-real-organization" }),
    ],
  },
];
