// The Oracle Fusion Cloud & ERP Foundations course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 01 of the Oracle Fusion Financials Consultant path. Includes the lesson that tells students when to activate their separately purchased practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-cloud-and-erp-foundations/
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

export const ORACLE_FUSION_CLOUD_AND_ERP_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "ERP Fundamentals",
    lessons: [
      L(1, "what-erp-is-and-why-companies-use-it", "What ERP Is and Why Companies Use It", { contentDir: "ch01/01-what-erp-is-and-why-companies-use-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505896/ltv-oracle-fusion-cloud-and-erp-foundations/what-erp-is-and-why-companies-use-it.mp4", durationLabel: "1 min 43 s" }),
      L(2, "how-business-processes-flow-through-an-erp", "How Business Processes Flow Through an ERP", { contentDir: "ch01/02-how-business-processes-flow-through-an-erp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506410/ltv-oracle-fusion-cloud-and-erp-foundations/how-business-processes-flow-through-an-erp.mp4", durationLabel: "1 min 21 s" }),
      L(3, "modules-and-integration-finance-procurement-supply-chain-hr", "Modules and Integration: Finance, Procurement, Supply Chain, HR", { contentDir: "ch01/03-modules-and-integration-finance-procurement-supply-chain-hr", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506945/ltv-oracle-fusion-cloud-and-erp-foundations/modules-and-integration-finance-procurement-supply-chain-hr.mp4", durationLabel: "1 min 31 s" }),
      L(4, "on-premises-erp-vs-cloud-erp", "On-Premises ERP vs. Cloud ERP", { contentDir: "ch01/04-on-premises-erp-vs-cloud-erp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507542/ltv-oracle-fusion-cloud-and-erp-foundations/on-premises-erp-vs-cloud-erp.mp4", durationLabel: "1 min 26 s" }),
      L(5, "the-finance-department-and-who-uses-the-system", "The Finance Department and Who Uses the System", { contentDir: "ch01/05-the-finance-department-and-who-uses-the-system", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508057/ltv-oracle-fusion-cloud-and-erp-foundations/the-finance-department-and-who-uses-the-system.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 2,
    title: "Oracle Fusion Cloud Applications",
    lessons: [
      L(6, "what-oracle-fusion-cloud-applications-are", "What Oracle Fusion Cloud Applications Are", { contentDir: "ch02/06-what-oracle-fusion-cloud-applications-are", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508619/ltv-oracle-fusion-cloud-and-erp-foundations/what-oracle-fusion-cloud-applications-are.mp4", durationLabel: "1 min 26 s" }),
      L(7, "the-saas-model-and-what-oracle-manages-for-you", "The SaaS Model and What Oracle Manages for You", { contentDir: "ch02/07-the-saas-model-and-what-oracle-manages-for-you", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517455/ltv-oracle-fusion-cloud-and-erp-foundations/the-saas-model-and-what-oracle-manages-for-you.mp4", durationLabel: "1 min 20 s" }),
      L(8, "oracle-fusion-cloud-erp-vs-oracle-e-business-suite", "Oracle Fusion Cloud ERP vs. Oracle E-Business Suite", { contentDir: "ch02/08-oracle-fusion-cloud-erp-vs-oracle-e-business-suite", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509827/ltv-oracle-fusion-cloud-and-erp-foundations/oracle-fusion-cloud-erp-vs-oracle-e-business-suite.mp4", durationLabel: "1 min 36 s" }),
      L(9, "oracle-fusion-cloud-architecture-overview", "Oracle Fusion Cloud Architecture Overview", { contentDir: "ch02/09-oracle-fusion-cloud-architecture-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510466/ltv-oracle-fusion-cloud-and-erp-foundations/oracle-fusion-cloud-architecture-overview.mp4", durationLabel: "1 min 35 s" }),
      L(10, "quarterly-updates-and-release-management", "Quarterly Updates and Release Management", { contentDir: "ch02/10-quarterly-updates-and-release-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511053/ltv-oracle-fusion-cloud-and-erp-foundations/quarterly-updates-and-release-management.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Working in Oracle Fusion",
    lessons: [
      L(11, "signing-in-and-the-home-page", "Signing In and the Home Page", { contentDir: "ch03/11-signing-in-and-the-home-page", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511543/ltv-oracle-fusion-cloud-and-erp-foundations/signing-in-and-the-home-page.mp4", durationLabel: "1 min 19 s" }),
      L(12, "navigating-oracle-fusion-cloud", "Navigating Oracle Fusion Cloud", { contentDir: "ch03/12-navigating-oracle-fusion-cloud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512098/ltv-oracle-fusion-cloud-and-erp-foundations/navigating-oracle-fusion-cloud.mp4", durationLabel: "1 min 26 s" }),
      L(13, "tasks-work-areas-and-the-navigator", "Tasks, Work Areas and the Navigator", { contentDir: "ch03/13-tasks-work-areas-and-the-navigator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512585/ltv-oracle-fusion-cloud-and-erp-foundations/tasks-work-areas-and-the-navigator.mp4", durationLabel: "1 min 17 s" }),
      L(14, "searching-favorites-and-saved-searches", "Searching, Favorites and Saved Searches", { contentDir: "ch03/14-searching-favorites-and-saved-searches", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513069/ltv-oracle-fusion-cloud-and-erp-foundations/searching-favorites-and-saved-searches.mp4", durationLabel: "1 min 18 s" }),
      L(15, "scheduled-processes-and-job-monitoring", "Scheduled Processes and Job Monitoring", { contentDir: "ch03/15-scheduled-processes-and-job-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513576/ltv-oracle-fusion-cloud-and-erp-foundations/scheduled-processes-and-job-monitoring.mp4", durationLabel: "1 min 21 s" }),
      L(16, "environments-dev-test-and-prod", "Environments: DEV, TEST and PROD", { contentDir: "ch03/16-environments-dev-test-and-prod", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514137/ltv-oracle-fusion-cloud-and-erp-foundations/environments-dev-test-and-prod.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 4,
    title: "Implementation Basics and Careers",
    lessons: [
      L(17, "implementation-terminology-you-will-hear", "Implementation Terminology You Will Hear", { contentDir: "ch04/17-implementation-terminology-you-will-hear", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514744/ltv-oracle-fusion-cloud-and-erp-foundations/implementation-terminology-you-will-hear.mp4", durationLabel: "1 min 34 s" }),
      L(18, "offerings-functional-areas-and-setup-and-maintenance", "Offerings, Functional Areas and Setup and Maintenance", { contentDir: "ch04/18-offerings-functional-areas-and-setup-and-maintenance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515284/ltv-oracle-fusion-cloud-and-erp-foundations/offerings-functional-areas-and-setup-and-maintenance.mp4", durationLabel: "1 min 19 s" }),
      L(19, "functional-vs-technical-oracle-careers", "Functional vs. Technical Oracle Careers", { contentDir: "ch04/19-functional-vs-technical-oracle-careers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515970/ltv-oracle-fusion-cloud-and-erp-foundations/functional-vs-technical-oracle-careers.mp4", durationLabel: "1 min 35 s" }),
      L(20, "your-practice-environment-what-it-is-and-when-to-activate-it", "Your Practice Environment: What It Is and When to Activate It", { contentDir: "ch04/20-your-practice-environment-what-it-is-and-when-to-activate-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516619/ltv-oracle-fusion-cloud-and-erp-foundations/your-practice-environment-what-it-is-and-when-to-activate-it.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
