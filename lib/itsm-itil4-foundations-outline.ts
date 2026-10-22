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
      L(1, "what-it-service-management-actually-is", "What IT Service Management Actually Is", { contentDir: "ch01/01-what-it-service-management-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792686807/ltv-itsm-itil4-foundations/what-it-service-management-actually-is.mp4", durationLabel: "2 min 29 s" }),
      L(2, "why-organizations-adopt-a-formal-itsm-framework", "Why Organizations Adopt a Formal ITSM Framework", { contentDir: "ch01/02-why-organizations-adopt-a-formal-itsm-framework", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792686921/ltv-itsm-itil4-foundations/why-organizations-adopt-a-formal-itsm-framework.mp4", durationLabel: "2 min 20 s" }),
      L(3, "itil-4-vs-earlier-itil-versions", "ITIL 4 vs. Earlier ITIL Versions", { contentDir: "ch01/03-itil-4-vs-earlier-itil-versions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687012/ltv-itsm-itil4-foundations/itil-4-vs-earlier-itil-versions.mp4", durationLabel: "2 min 20 s" }),
      L(4, "the-service-value-system-overview", "The Service Value System: Overview", { contentDir: "ch01/04-the-service-value-system-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687099/ltv-itsm-itil4-foundations/the-service-value-system-overview.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 2,
    title: "The ITIL 4 Guiding Principles",
    lessons: [
      L(5, "focus-on-value", "Focus on Value", { contentDir: "ch02/05-focus-on-value", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687209/ltv-itsm-itil4-foundations/focus-on-value.mp4", durationLabel: "2 min 30 s" }),
      L(6, "start-where-you-are", "Start Where You Are", { contentDir: "ch02/06-start-where-you-are", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687317/ltv-itsm-itil4-foundations/start-where-you-are.mp4", durationLabel: "2 min 2 s" }),
      L(7, "progress-iteratively-with-feedback", "Progress Iteratively With Feedback", { contentDir: "ch02/07-progress-iteratively-with-feedback", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687404/ltv-itsm-itil4-foundations/progress-iteratively-with-feedback.mp4", durationLabel: "2 min 4 s" }),
      L(8, "collaborate-and-promote-visibility", "Collaborate & Promote Visibility", { contentDir: "ch02/08-collaborate-and-promote-visibility", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687475/ltv-itsm-itil4-foundations/collaborate-and-promote-visibility.mp4", durationLabel: "1 min 48 s" }),
      L(9, "think-and-work-holistically-keep-it-simple-optimize-and-automate", "Think Holistically, Keep It Simple, Optimize & Automate", { contentDir: "ch02/09-think-and-work-holistically-keep-it-simple-optimize-and-automate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687594/ltv-itsm-itil4-foundations/think-and-work-holistically-keep-it-simple-optimize-and-automate.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 3,
    title: "The Service Value Chain",
    lessons: [
      L(10, "plan-improve-and-engage-activities", "Plan, Improve & Engage Activities", { contentDir: "ch03/10-plan-improve-and-engage-activities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687710/ltv-itsm-itil4-foundations/plan-improve-and-engage-activities.mp4", durationLabel: "2 min 34 s" }),
      L(11, "design-and-transition-activities", "Design & Transition Activities", { contentDir: "ch03/11-design-and-transition-activities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687822/ltv-itsm-itil4-foundations/design-and-transition-activities.mp4", durationLabel: "2 min 10 s" }),
      L(12, "obtain-build-and-deliver-and-support-activities", "Obtain/Build, Deliver & Support Activities", { contentDir: "ch03/12-obtain-build-and-deliver-and-support-activities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792687941/ltv-itsm-itil4-foundations/obtain-build-and-deliver-and-support-activities.mp4", durationLabel: "3 min 32 s" }),
      L(13, "how-the-value-chain-activities-connect-in-practice", "How the Value-Chain Activities Connect in Practice", { contentDir: "ch03/13-how-the-value-chain-activities-connect-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688053/ltv-itsm-itil4-foundations/how-the-value-chain-activities-connect-in-practice.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Core ITIL 4 Practices: Incident, Problem & Change",
    lessons: [
      L(14, "incident-management-practice", "Incident Management Practice", { contentDir: "ch04/14-incident-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688160/ltv-itsm-itil4-foundations/incident-management-practice.mp4", durationLabel: "2 min 34 s" }),
      L(15, "problem-management-practice", "Problem Management Practice", { contentDir: "ch04/15-problem-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688250/ltv-itsm-itil4-foundations/problem-management-practice.mp4", durationLabel: "2 min 25 s" }),
      L(16, "change-enablement-practice", "Change Enablement Practice", { contentDir: "ch04/16-change-enablement-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688346/ltv-itsm-itil4-foundations/change-enablement-practice.mp4", durationLabel: "2 min 43 s" }),
      L(17, "how-incident-problem-and-change-relate", "How Incident, Problem & Change Relate", { contentDir: "ch04/17-how-incident-problem-and-change-relate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688439/ltv-itsm-itil4-foundations/how-incident-problem-and-change-relate.mp4", durationLabel: "2 min 35 s" }),
      L(18, "incident-problem-change-lab", "Incident/Problem/Change Lab", { contentDir: "ch04/18-incident-problem-change-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688542/ltv-itsm-itil4-foundations/incident-problem-change-lab.mp4", durationLabel: "2 min 46 s" }),
    ],
  },
  {
    n: 5,
    title: "Core ITIL 4 Practices: Request, Knowledge & Service Level",
    lessons: [
      L(19, "service-request-management-practice", "Service Request Management Practice", { contentDir: "ch05/19-service-request-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688627/ltv-itsm-itil4-foundations/service-request-management-practice.mp4", durationLabel: "2 min 15 s" }),
      L(20, "knowledge-management-practice", "Knowledge Management Practice", { contentDir: "ch05/20-knowledge-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688715/ltv-itsm-itil4-foundations/knowledge-management-practice.mp4", durationLabel: "2 min 1 s" }),
      L(21, "service-level-management-practice", "Service Level Management Practice", { contentDir: "ch05/21-service-level-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688793/ltv-itsm-itil4-foundations/service-level-management-practice.mp4", durationLabel: "2 min 1 s" }),
      L(22, "service-desk-practice", "Service Desk Practice", { contentDir: "ch05/22-service-desk-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688865/ltv-itsm-itil4-foundations/service-desk-practice.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 6,
    title: "Service Configuration & Asset Practices",
    lessons: [
      L(23, "service-configuration-management-practice", "Service Configuration Management Practice", { contentDir: "ch06/23-service-configuration-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792688958/ltv-itsm-itil4-foundations/service-configuration-management-practice.mp4", durationLabel: "2 min 28 s" }),
      L(24, "it-asset-management-practice", "IT Asset Management Practice", { contentDir: "ch06/24-it-asset-management-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792689066/ltv-itsm-itil4-foundations/it-asset-management-practice.mp4", durationLabel: "2 min 30 s" }),
      L(25, "continual-improvement-practice", "Continual Improvement Practice", { contentDir: "ch06/25-continual-improvement-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792689172/ltv-itsm-itil4-foundations/continual-improvement-practice.mp4", durationLabel: "2 min 18 s" }),
    ],
  },
  {
    n: 7,
    title: "Applying ITIL 4 on a Real Platform",
    lessons: [
      L(26, "how-a-platform-like-servicenow-implements-these-practices", "How a Platform Like ServiceNow Implements These Practices", { contentDir: "ch07/26-how-a-platform-like-servicenow-implements-these-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792689260/ltv-itsm-itil4-foundations/how-a-platform-like-servicenow-implements-these-practices.mp4", durationLabel: "2 min 27 s" }),
      L(27, "itil-certification-pathway-overview", "ITIL Certification Pathway: Overview", { contentDir: "ch07/27-itil-certification-pathway-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792689355/ltv-itsm-itil4-foundations/itil-certification-pathway-overview.mp4", durationLabel: "2 min 29 s" }),
      L(28, "capstone-map-itil-4-practices-to-a-real-organization", "Capstone: Map ITIL 4 Practices to a Real Organization", { contentDir: "ch07/28-capstone-map-itil-4-practices-to-a-real-organization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792689474/ltv-itsm-itil4-foundations/capstone-map-itil-4-practices-to-a-real-organization.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
];
