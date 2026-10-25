// The Data Governance Career & Capstone course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance-career-and-capstone/
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

export const GOV_DATA_GOVERNANCE_CAREER_AND_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone: LTV Global Data Governance Program",
    lessons: [
      L(1, "capstone-kickoff-the-ltv-global-scenario", "Capstone Kickoff: The LTV Global Scenario", { contentDir: "ch01/01-capstone-kickoff-the-ltv-global-scenario", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414660/ltv-data-governance-career-and-capstone/capstone-kickoff-the-ltv-global-scenario.mp4", durationLabel: "1 min 46 s" }),
      L(2, "reviewing-the-data-landscape", "Reviewing the Data Landscape", { contentDir: "ch01/02-reviewing-the-data-landscape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414809/ltv-data-governance-career-and-capstone/reviewing-the-data-landscape.mp4", durationLabel: "1 min 17 s" }),
      L(3, "identifying-critical-data-elements", "Identifying Critical Data Elements", { contentDir: "ch01/03-identifying-critical-data-elements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414931/ltv-data-governance-career-and-capstone/identifying-critical-data-elements.mp4", durationLabel: "1 min 14 s" }),
      L(4, "assigning-data-owners-and-data-stewards", "Assigning Data Owners and Data Stewards", { contentDir: "ch01/04-assigning-data-owners-and-data-stewards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415088/ltv-data-governance-career-and-capstone/assigning-data-owners-and-data-stewards.mp4", durationLabel: "1 min 21 s" }),
      L(5, "building-the-business-glossary-and-data-dictionary", "Building the Business Glossary and Data Dictionary", { contentDir: "ch01/05-building-the-business-glossary-and-data-dictionary", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415323/ltv-data-governance-career-and-capstone/building-the-business-glossary-and-data-dictionary.mp4", durationLabel: "1 min 31 s" }),
      L(6, "classifying-sensitive-data", "Classifying Sensitive Data", { contentDir: "ch01/06-classifying-sensitive-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415532/ltv-data-governance-career-and-capstone/classifying-sensitive-data.mp4", durationLabel: "1 min 6 s" }),
      L(7, "creating-data-quality-rules-and-sql-checks", "Creating Data Quality Rules and SQL Checks", { contentDir: "ch01/07-creating-data-quality-rules-and-sql-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415818/ltv-data-governance-career-and-capstone/creating-data-quality-rules-and-sql-checks.mp4", durationLabel: "1 min 52 s" }),
      L(8, "documenting-data-lineage", "Documenting Data Lineage", { contentDir: "ch01/08-documenting-data-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416029/ltv-data-governance-career-and-capstone/documenting-data-lineage.mp4", durationLabel: "1 min 12 s" }),
      L(9, "identifying-authoritative-data-sources", "Identifying Authoritative Data Sources", { contentDir: "ch01/09-identifying-authoritative-data-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416202/ltv-data-governance-career-and-capstone/identifying-authoritative-data-sources.mp4", durationLabel: "1 min 8 s" }),
      L(10, "designing-access-and-retention-policies", "Designing Access and Retention Policies", { contentDir: "ch01/10-designing-access-and-retention-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416378/ltv-data-governance-career-and-capstone/designing-access-and-retention-policies.mp4", durationLabel: "1 min 14 s" }),
      L(11, "developing-governance-kpis-and-workflows", "Developing Governance KPIs and Workflows", { contentDir: "ch01/11-developing-governance-kpis-and-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416574/ltv-data-governance-career-and-capstone/developing-governance-kpis-and-workflows.mp4", durationLabel: "1 min 12 s" }),
      L(12, "creating-the-governance-operating-model", "Creating the Governance Operating Model", { contentDir: "ch01/12-creating-the-governance-operating-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416802/ltv-data-governance-career-and-capstone/creating-the-governance-operating-model.mp4", durationLabel: "1 min 17 s" }),
      L(13, "developing-the-ai-governance-strategy", "Developing the AI Governance Strategy", { contentDir: "ch01/13-developing-the-ai-governance-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417040/ltv-data-governance-career-and-capstone/developing-the-ai-governance-strategy.mp4", durationLabel: "1 min 33 s" }),
      L(14, "designing-the-governance-architecture", "Designing the Governance Architecture", { contentDir: "ch01/14-designing-the-governance-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417282/ltv-data-governance-career-and-capstone/designing-the-governance-architecture.mp4", durationLabel: "1 min 46 s" }),
      L(15, "assembling-the-deliverables", "Assembling the Deliverables", { contentDir: "ch01/15-assembling-the-deliverables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417515/ltv-data-governance-career-and-capstone/assembling-the-deliverables.mp4", durationLabel: "1 min 32 s" }),
      L(16, "writing-the-enterprise-data-governance-strategy", "Writing the Enterprise Data Governance Strategy", { contentDir: "ch01/16-writing-the-enterprise-data-governance-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417830/ltv-data-governance-career-and-capstone/writing-the-enterprise-data-governance-strategy.mp4", durationLabel: "1 min 42 s" }),
      L(17, "building-the-executive-presentation", "Building the Executive Presentation", { contentDir: "ch01/17-building-the-executive-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418081/ltv-data-governance-career-and-capstone/building-the-executive-presentation.mp4", durationLabel: "1 min 41 s" }),
      L(18, "final-review-and-retrospective", "Final Review and Retrospective", { contentDir: "ch01/18-final-review-and-retrospective", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418326/ltv-data-governance-career-and-capstone/final-review-and-retrospective.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Career Preparation",
    lessons: [
      L(19, "data-governance-career-paths-and-roles", "Data Governance Career Paths and Roles", { contentDir: "ch02/19-data-governance-career-paths-and-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418676/ltv-data-governance-career-and-capstone/data-governance-career-paths-and-roles.mp4", durationLabel: "2 min 2 s" }),
      L(20, "resume-preparation-for-governance-roles", "Resume Preparation for Governance Roles", { contentDir: "ch02/20-resume-preparation-for-governance-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418888/ltv-data-governance-career-and-capstone/resume-preparation-for-governance-roles.mp4", durationLabel: "1 min 32 s" }),
      L(21, "linkedin-and-portfolio-development", "LinkedIn and Portfolio Development", { contentDir: "ch02/21-linkedin-and-portfolio-development", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419128/ltv-data-governance-career-and-capstone/linkedin-and-portfolio-development.mp4", durationLabel: "1 min 30 s" }),
      L(22, "governance-portfolio-review", "Governance Portfolio Review", { contentDir: "ch02/22-governance-portfolio-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419301/ltv-data-governance-career-and-capstone/governance-portfolio-review.mp4", durationLabel: "1 min 19 s" }),
      L(23, "explaining-your-capstone-in-interviews", "Explaining Your Capstone in Interviews", { contentDir: "ch02/23-explaining-your-capstone-in-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419537/ltv-data-governance-career-and-capstone/explaining-your-capstone-in-interviews.mp4", durationLabel: "1 min 26 s" }),
      L(24, "the-governance-interview-landscape", "The Governance Interview Landscape", { contentDir: "ch02/24-the-governance-interview-landscape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419785/ltv-data-governance-career-and-capstone/the-governance-interview-landscape.mp4", durationLabel: "1 min 36 s" }),
      L(25, "scenario-based-governance-questions", "Scenario-Based Governance Questions", { contentDir: "ch02/25-scenario-based-governance-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420056/ltv-data-governance-career-and-capstone/scenario-based-governance-questions.mp4", durationLabel: "1 min 28 s" }),
      L(26, "data-quality-and-sql-interview-practice", "Data Quality and SQL Interview Practice", { contentDir: "ch02/26-data-quality-and-sql-interview-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420394/ltv-data-governance-career-and-capstone/data-quality-and-sql-interview-practice.mp4", durationLabel: "1 min 45 s" }),
      L(27, "metadata-and-lineage-interview-questions", "Metadata and Lineage Interview Questions", { contentDir: "ch02/27-metadata-and-lineage-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420600/ltv-data-governance-career-and-capstone/metadata-and-lineage-interview-questions.mp4", durationLabel: "1 min 33 s" }),
      L(28, "security-privacy-and-ai-governance-questions", "Security, Privacy and AI Governance Questions", { contentDir: "ch02/28-security-privacy-and-ai-governance-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420807/ltv-data-governance-career-and-capstone/security-privacy-and-ai-governance-questions.mp4", durationLabel: "1 min 39 s" }),
      L(29, "stakeholder-presentations-and-communication", "Stakeholder Presentations and Communication", { contentDir: "ch02/29-stakeholder-presentations-and-communication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420976/ltv-data-governance-career-and-capstone/stakeholder-presentations-and-communication.mp4", durationLabel: "1 min 22 s" }),
      L(30, "governance-certifications-overview", "Governance Certifications Overview", { contentDir: "ch02/30-governance-certifications-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421157/ltv-data-governance-career-and-capstone/governance-certifications-overview.mp4", durationLabel: "1 min 22 s" }),
      L(31, "working-with-data-teams-as-a-governance-analyst", "Working With Data Teams as a Governance Analyst", { contentDir: "ch02/31-working-with-data-teams-as-a-governance-analyst", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421325/ltv-data-governance-career-and-capstone/working-with-data-teams-as-a-governance-analyst.mp4", durationLabel: "1 min 15 s" }),
      L(32, "salary-and-offer-basics", "Salary and Offer Basics", { contentDir: "ch02/32-salary-and-offer-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421594/ltv-data-governance-career-and-capstone/salary-and-offer-basics.mp4", durationLabel: "1 min 14 s" }),
      L(33, "your-first-90-days-in-a-governance-role", "Your First 90 Days in a Governance Role", { contentDir: "ch02/33-your-first-90-days-in-a-governance-role", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421767/ltv-data-governance-career-and-capstone/your-first-90-days-in-a-governance-role.mp4", durationLabel: "1 min 6 s" }),
      L(34, "the-long-path-to-data-governance-architect", "The Long Path to Data Governance Architect", { contentDir: "ch02/34-the-long-path-to-data-governance-architect", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421922/ltv-data-governance-career-and-capstone/the-long-path-to-data-governance-architect.mp4", durationLabel: "1 min 18 s" }),
      L(35, "path-complete-next-steps", "Path Complete: Next Steps", { contentDir: "ch02/35-path-complete-next-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422090/ltv-data-governance-career-and-capstone/path-complete-next-steps.mp4", durationLabel: "1 min 22 s" }),
    ],
  },
];
